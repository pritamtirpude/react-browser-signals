import { useCallback, useEffect, useRef, useState } from "react";

import type { StorageEstimateData, UseStorageEstimateResult } from "../types";
import { isBrowser } from "../utils/isBrowser";

type StorageEstimateLike = {
  quota?: number;
  usage?: number;
  usageDetails?: Record<string, number>;
};

type StorageEstimateWithDetails = StorageEstimate & {
  usageDetails?: Record<string, number>;
};

type NavigatorWithStorage = Navigator & {
  storage?: {
    estimate?: () => Promise<StorageEstimateLike>;
    persisted?: () => Promise<boolean>;
    persist?: () => Promise<boolean>;
  };
};

const EMPTY_STORAGE_ESTIMATE: StorageEstimateData = {
  supported: false,
  loading: false,
  error: null,
  quota: null,
  usage: null,
  usageDetails: null,
  persisted: null,
};

export const useStorageEstimate = (): UseStorageEstimateResult => {
  const [storageEstimate, setStorageEstimate] = useState<StorageEstimateData>(
    EMPTY_STORAGE_ESTIMATE,
  );
  const mountedRef = useRef(true);

  const refresh = useCallback(async () => {
    if (!isBrowser) {
      if (mountedRef.current) {
        setStorageEstimate(EMPTY_STORAGE_ESTIMATE);
      }
      return;
    }

    const storage = (navigator as NavigatorWithStorage).storage;
    const hasEstimate = typeof storage?.estimate === "function";
    const hasPersisted = typeof storage?.persisted === "function";

    if (!hasEstimate) {
      if (mountedRef.current) {
        setStorageEstimate(EMPTY_STORAGE_ESTIMATE);
      }
      return;
    }

    if (mountedRef.current) {
      setStorageEstimate((current) => ({
        ...current,
        supported: true,
        loading: true,
        error: null,
      }));
    }

    try {
      const [estimate, persisted] = await Promise.all([
        storage.estimate(),
        hasPersisted ? storage.persisted() : Promise.resolve(null),
      ]);
      const estimateWithDetails = estimate as StorageEstimateWithDetails;

      if (!mountedRef.current) {
        return;
      }

      setStorageEstimate({
        supported: true,
        loading: false,
        error: null,
        quota: estimate.quota ?? null,
        usage: estimate.usage ?? null,
        usageDetails: estimateWithDetails.usageDetails ?? null,
        persisted,
      });
    } catch (error: unknown) {
      if (!mountedRef.current) {
        return;
      }

      const message = error instanceof Error ? error.message : "Unknown error";

      setStorageEstimate({
        supported: true,
        loading: false,
        error: message,
        quota: null,
        usage: null,
        usageDetails: null,
        persisted: null,
      });
    }
  }, []);

  const requestPersistence = useCallback(async () => {
    if (!isBrowser) {
      return null;
    }

    const storage = (navigator as NavigatorWithStorage).storage;
    if (typeof storage?.persist !== "function") {
      return null;
    }

    try {
      const isPersisted = await storage.persist();
      await refresh();
      return isPersisted;
    } catch {
      return null;
    }
  }, [refresh]);

  useEffect(() => {
    mountedRef.current = true;
    void refresh();

    return () => {
      mountedRef.current = false;
    };
  }, [refresh]);

  return {
    ...storageEstimate,
    refresh,
    requestPersistence,
  };
};
