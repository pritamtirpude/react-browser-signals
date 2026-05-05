import { useEffect, useState } from "react";

import type { BatteryInfo, UseBatteryResult } from "../types";
import { isBrowser } from "../utils/isBrowser";

type BatteryEventName =
  | "chargingchange"
  | "chargingtimechange"
  | "dischargingtimechange"
  | "levelchange";

interface BatteryManagerLike extends EventTarget {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
}

interface NavigatorWithBattery extends Navigator {
  getBattery?: () => Promise<BatteryManagerLike>;
}

const BATTERY_EVENTS: BatteryEventName[] = [
  "chargingchange",
  "chargingtimechange",
  "dischargingtimechange",
  "levelchange",
];

const readBatteryInfo = (battery: BatteryManagerLike): BatteryInfo => ({
  charging: battery.charging,
  chargingTime: battery.chargingTime,
  dischargingTime: battery.dischargingTime,
  level: battery.level,
});

export const useBattery = (): UseBatteryResult => {
  const [state, setState] = useState<UseBatteryResult>({
    supported: false,
    loading: isBrowser,
    error: null,
    charging: null,
    chargingTime: null,
    dischargingTime: null,
    level: null,
    levelPercent: null,
    levelDisplay: null,
  });

  useEffect(() => {
    if (!isBrowser) {
      setState({
        supported: false,
        loading: false,
        error: null,
        charging: null,
        chargingTime: null,
        dischargingTime: null,
        level: null,
        levelPercent: null,
        levelDisplay: null,
      });
      return;
    }

    const nav = navigator as NavigatorWithBattery;
    if (typeof nav.getBattery !== "function") {
      setState({
        supported: false,
        loading: false,
        error: null,
        charging: null,
        chargingTime: null,
        dischargingTime: null,
        level: null,
        levelPercent: null,
        levelDisplay: null,
      });
      return;
    }

    const controller = new AbortController();
    let batteryManager: BatteryManagerLike | null = null;

    const handleChange = () => {
      if (controller.signal.aborted || !batteryManager) {
        return;
      }

      const info = readBatteryInfo(batteryManager);
      const levelPercent = Math.round(info.level * 100);

      setState({
        supported: true,
        loading: false,
        error: null,
        charging: info.charging,
        chargingTime: info.chargingTime,
        dischargingTime: info.dischargingTime,
        level: info.level,
        levelPercent,
        levelDisplay: `${levelPercent}%`,
      });
    };

    nav
      .getBattery()
      .then((battery) => {
        if (controller.signal.aborted) {
          return;
        }

        batteryManager = battery;
        handleChange();
        BATTERY_EVENTS.forEach((eventName) => {
          battery.addEventListener(eventName, handleChange, {
            signal: controller.signal,
          });
        });
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) {
          return;
        }

        const message =
          error instanceof Error ? error.message : "Unknown error";
        setState({
          supported: true,
          loading: false,
          error: message,
          charging: null,
          chargingTime: null,
          dischargingTime: null,
          level: null,
          levelPercent: null,
          levelDisplay: null,
        });
      });

    return () => {
      controller.abort();
    };
  }, []);

  return state;
};
