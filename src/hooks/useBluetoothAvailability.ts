import { useEffect, useState } from "react";

import type { BluetoothAvailabilityData } from "../types";
import { isBrowser } from "../utils/isBrowser";

type BluetoothLike = {
  getAvailability?: () => Promise<boolean>;
  addEventListener?: (
    type: "availabilitychanged",
    listener: EventListener,
  ) => void;
  removeEventListener?: (
    type: "availabilitychanged",
    listener: EventListener,
  ) => void;
};

type NavigatorWithBluetooth = Navigator & {
  bluetooth?: BluetoothLike;
};

const EMPTY_BLUETOOTH_AVAILABILITY: BluetoothAvailabilityData = {
  supported: false,
  available: null,
  error: null,
};

export const useBluetoothAvailability = (): BluetoothAvailabilityData => {
  const [bluetoothAvailability, setBluetoothAvailability] =
    useState<BluetoothAvailabilityData>(EMPTY_BLUETOOTH_AVAILABILITY);

  useEffect(() => {
    if (!isBrowser) {
      setBluetoothAvailability(EMPTY_BLUETOOTH_AVAILABILITY);
      return;
    }

    const bluetooth = (navigator as NavigatorWithBluetooth).bluetooth;
    if (!bluetooth) {
      setBluetoothAvailability(EMPTY_BLUETOOTH_AVAILABILITY);
      return;
    }

    let disposed = false;

    const updateAvailability = async () => {
      if (disposed) {
        return;
      }

      if (typeof bluetooth.getAvailability !== "function") {
        setBluetoothAvailability({
          supported: true,
          available: null,
          error: null,
        });
        return;
      }

      try {
        const available = await bluetooth.getAvailability();

        if (disposed) {
          return;
        }

        setBluetoothAvailability({
          supported: true,
          available,
          error: null,
        });
      } catch (error: unknown) {
        if (disposed) {
          return;
        }

        const message =
          error instanceof Error ? error.message : "Unknown error";
        setBluetoothAvailability({
          supported: true,
          available: null,
          error: message,
        });
      }
    };

    const handleAvailabilityChange: EventListener = () => {
      void updateAvailability();
    };

    void updateAvailability();
    bluetooth.addEventListener?.(
      "availabilitychanged",
      handleAvailabilityChange,
    );

    return () => {
      disposed = true;
      bluetooth.removeEventListener?.(
        "availabilitychanged",
        handleAvailabilityChange,
      );
    };
  }, []);

  return bluetoothAvailability;
};
