import { useMemo } from "react";

import type { UseShareResult } from "../types";
import { isBrowser } from "../utils/isBrowser";

type NavigatorWithShare = Navigator & {
  share?: (data?: ShareData) => Promise<void>;
  canShare?: (data?: ShareData) => boolean;
};

export const useShare = (): UseShareResult => {
  return useMemo(() => {
    if (!isBrowser) {
      return {
        supported: false,
        canShareText: false,
        canShareFiles: false,
        isSecureContext: false,
      };
    }

    const shareNavigator = navigator as NavigatorWithShare;
    const supported = typeof shareNavigator.share === "function";
    const canShare = shareNavigator.canShare;
    const isSecureContext = window.isSecureContext;

    let canShareText = false;
    let canShareFiles = false;

    if (supported) {
      if (typeof canShare === "function") {
        try {
          canShareText = canShare({ text: "share text" });
        } catch {
          canShareText = false;
        }

        try {
          if (typeof File !== "undefined") {
            const testFile = new File(["a"], "test.txt", {
              type: "text/plain",
            });
            canShareFiles = canShare({ files: [testFile] });
          }
        } catch {
          canShareFiles = false;
        }
      } else {
        canShareText = true;
      }
    }

    return {
      supported,
      canShareText,
      canShareFiles,
      isSecureContext,
    };
  }, []);
};
