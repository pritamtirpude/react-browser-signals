import { useEffect, useState } from "react";

import type { HardwareData } from "../types";
import { isBrowser } from "../utils/isBrowser";

type NavigatorWithHardware = Navigator & {
  pdfViewerEnabled?: boolean;
};

const EMPTY_HARDWARE_DATA: HardwareData = {
  supported: false,
  hardwareConcurrency: null,
  maxTouchPoints: null,
  pdfViewerEnabled: null,
  platform: null,
};

export const useHardware = (): HardwareData => {
  const [hardwareData, setHardwareData] =
    useState<HardwareData>(EMPTY_HARDWARE_DATA);

  useEffect(() => {
    if (!isBrowser) {
      setHardwareData(EMPTY_HARDWARE_DATA);
      return;
    }

    const hardwareNavigator = navigator as NavigatorWithHardware;

    setHardwareData({
      supported: true,
      hardwareConcurrency: navigator.hardwareConcurrency ?? null,
      maxTouchPoints: navigator.maxTouchPoints ?? null,
      pdfViewerEnabled: hardwareNavigator.pdfViewerEnabled ?? null,
      platform: navigator.platform ?? null,
    });
  }, []);

  return hardwareData;
};
