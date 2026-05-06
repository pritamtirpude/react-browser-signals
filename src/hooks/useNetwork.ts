import { useEffect, useState } from "react";
import { NetworkData } from "../types";
import { isBrowser } from "../utils/isBrowser";

type ConnectionNavigator = Navigator & {
  connection?: {
    downlink: number;
    effectiveType: string;
    rtt: number;
    saveData: boolean;
    addEventListener?: (
      type: "change",
      listener: EventListener,
      options?: AddEventListenerOptions,
    ) => void;
    removeEventListener?: (type: "change", listener: EventListener) => void;
  };
};

export const useNetwork = () => {
  const [networkData, setNetworkData] = useState<NetworkData>({
    supported: false,
    online: null,
    effectiveType: null,
    downlink: null,
    rtt: null,
  });

  useEffect(() => {
    if (!isBrowser) {
      setNetworkData({
        supported: false,
        online: null,
        effectiveType: null,
        downlink: null,
        rtt: null,
      });
      return;
    }

    const connection = (navigator as ConnectionNavigator).connection;
    const controller = new AbortController();

    const updateNetworkData = () => {
      if (controller.signal.aborted) {
        return;
      }

      setNetworkData({
        supported: !!connection,
        online: navigator.onLine,
        effectiveType: connection ? connection.effectiveType : null,
        downlink: connection ? connection.downlink : null,
        rtt: connection ? connection.rtt : null,
      });
    };

    updateNetworkData();

    window.addEventListener("online", updateNetworkData, {
      signal: controller.signal,
    });
    window.addEventListener("offline", updateNetworkData, {
      signal: controller.signal,
    });
    connection?.addEventListener?.("change", updateNetworkData, {
      signal: controller.signal,
    });

    return () => {
      controller.abort();
    };
  }, []);

  return networkData;
};
