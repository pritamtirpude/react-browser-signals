import { useEffect, useState } from "react";
import { MemoryData } from "../types";
import { isBrowser } from "../utils/isBrowser";

type MemoryNavigator = Navigator & {
  deviceMemory?: number;
};

export const useMemory = () => {
  const [memoryData, setMemoryData] = useState<MemoryData>({
    supported: false,
    deviceMemory: null,
  });

  useEffect(() => {
    if (!isBrowser) {
      setMemoryData({
        supported: false,
        deviceMemory: null,
      });
      return;
    }

    const memoryNavigator = navigator as MemoryNavigator;

    const updateMemoryData = () => {
      const hasDeviceMemory = "deviceMemory" in memoryNavigator;

      setMemoryData({
        supported: hasDeviceMemory,
        deviceMemory: memoryNavigator.deviceMemory ?? null,
      });
    };

    updateMemoryData();
  }, []);

  return memoryData;
};
