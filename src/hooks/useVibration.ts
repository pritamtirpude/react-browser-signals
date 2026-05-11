import { useMemo } from "react";

import type { UseVibrationResult } from "../types";
import { isBrowser } from "../utils/isBrowser";

type NavigatorWithVibrate = Navigator & {
  vibrate?: (pattern: number | number[]) => boolean;
};

export const useVibration = (): UseVibrationResult => {
  return useMemo(() => {
    const vibrateFn = isBrowser
      ? (navigator as NavigatorWithVibrate).vibrate
      : undefined;
    const supported = typeof vibrateFn === "function";

    const vibrate = (pattern: number | number[]): boolean => {
      if (!supported || !vibrateFn) {
        return false;
      }

      return vibrateFn(pattern);
    };

    const cancel = (): boolean => {
      if (!supported || !vibrateFn) {
        return false;
      }

      return vibrateFn(0);
    };

    return {
      supported,
      vibrate,
      cancel,
    };
  }, []);
};
