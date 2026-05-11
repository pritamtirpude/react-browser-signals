import { useCallback, useEffect, useRef, useState } from "react";

import type { UseWakeLockResult, WakeLockData } from "../types";
import { isBrowser } from "../utils/isBrowser";

type WakeLockSentinelLike = {
  onrelease: ((this: WakeLockSentinelLike, ev: Event) => unknown) | null;
  released: boolean;
  type: "screen";
  release: () => Promise<void>;
};

type NavigatorWithWakeLock = Navigator & {
  wakeLock?: {
    request: (type?: "screen") => Promise<WakeLockSentinelLike>;
  };
};

const EMPTY_WAKE_LOCK_DATA: WakeLockData = {
  supported: false,
  active: false,
  error: null,
};

export const useWakeLock = (): UseWakeLockResult => {
  const [wakeLockData, setWakeLockData] =
    useState<WakeLockData>(EMPTY_WAKE_LOCK_DATA);
  const sentinelRef = useRef<WakeLockSentinelLike | null>(null);
  const mountedRef = useRef(true);

  const request = useCallback(async () => {
    if (!isBrowser) {
      return false;
    }

    const wakeLock = (navigator as NavigatorWithWakeLock).wakeLock;
    if (typeof wakeLock?.request !== "function") {
      if (mountedRef.current) {
        setWakeLockData(EMPTY_WAKE_LOCK_DATA);
      }
      return false;
    }

    try {
      if (sentinelRef.current && !sentinelRef.current.released) {
        if (mountedRef.current) {
          setWakeLockData({
            supported: true,
            active: true,
            error: null,
          });
        }
        return true;
      }

      const sentinel = await wakeLock.request("screen");

      if (!mountedRef.current) {
        void sentinel.release().catch(() => undefined);
        return false;
      }

      sentinelRef.current = sentinel;
      sentinel.onrelease = () => {
        if (!mountedRef.current) {
          return;
        }

        setWakeLockData({
          supported: true,
          active: false,
          error: null,
        });
      };

      setWakeLockData({
        supported: true,
        active: !sentinel.released,
        error: null,
      });

      return !sentinel.released;
    } catch (error: unknown) {
      if (mountedRef.current) {
        const message =
          error instanceof Error ? error.message : "Unknown error";

        setWakeLockData({
          supported: true,
          active: false,
          error: message,
        });
      }
      return false;
    }
  }, []);

  const release = useCallback(async () => {
    const sentinel = sentinelRef.current;
    if (!sentinel) {
      if (mountedRef.current) {
        setWakeLockData((current) => ({
          ...current,
          active: false,
        }));
      }
      return true;
    }

    try {
      if (!sentinel.released) {
        await sentinel.release();
      }

      sentinel.onrelease = null;
      sentinelRef.current = null;

      if (mountedRef.current) {
        setWakeLockData((current) => ({
          ...current,
          active: false,
          error: null,
        }));
      }
      return true;
    } catch (error: unknown) {
      if (mountedRef.current) {
        const message =
          error instanceof Error ? error.message : "Unknown error";

        setWakeLockData((current) => ({
          ...current,
          active: false,
          error: message,
        }));
      }
      return false;
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;

    if (!isBrowser) {
      setWakeLockData(EMPTY_WAKE_LOCK_DATA);
      return () => {
        mountedRef.current = false;
      };
    }

    const wakeLock = (navigator as NavigatorWithWakeLock).wakeLock;
    setWakeLockData({
      supported: typeof wakeLock?.request === "function",
      active: false,
      error: null,
    });

    return () => {
      mountedRef.current = false;

      const sentinel = sentinelRef.current;
      if (!sentinel) {
        return;
      }

      sentinel.onrelease = null;
      sentinelRef.current = null;

      if (!sentinel.released) {
        void sentinel.release().catch(() => undefined);
      }
    };
  }, []);

  return {
    ...wakeLockData,
    request,
    release,
  };
};
