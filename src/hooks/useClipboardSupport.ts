import { useEffect, useState } from "react";

import { ClipboardSupportData } from "../types";
import { isBrowser } from "../utils/isBrowser";

type PermissionNavigator = Navigator & {
  permissions?: {
    query: (permissionDesc: PermissionDescriptor) => Promise<PermissionStatus>;
  };
};

type ClipboardNavigator = Navigator & {
  clipboard?: {
    readText?: () => Promise<string>;
    writeText?: (data: string) => Promise<void>;
  };
};

const EMPTY_CLIPBOARD_STATE: ClipboardSupportData = {
  supported: false,
  canRead: false,
  canWrite: false,
  permissionRead: null,
  permissionWrite: null,
};

export const useClipboardSupport = (): ClipboardSupportData => {
  const [clipboardSupport, setClipboardSupport] =
    useState<ClipboardSupportData>(EMPTY_CLIPBOARD_STATE);

  useEffect(() => {
    if (!isBrowser) {
      setClipboardSupport(EMPTY_CLIPBOARD_STATE);
      return;
    }

    const permissionsNavigator = navigator as PermissionNavigator;
    const clipboardNavigator = navigator as ClipboardNavigator;
    const controller = new AbortController();

    const updateClipboardSupport = async () => {
      if (controller.signal.aborted) {
        return;
      }

      const clipboard = clipboardNavigator.clipboard;
      const canRead = typeof clipboard?.readText === "function";
      const canWrite = typeof clipboard?.writeText === "function";

      let permissionRead: PermissionState | null = null;
      let permissionWrite: PermissionState | null = null;

      if (typeof permissionsNavigator.permissions?.query === "function") {
        try {
          const readPermission = await permissionsNavigator.permissions.query({
            name: "clipboard-read" as PermissionName,
          });
          permissionRead = readPermission.state;
        } catch {
          permissionRead = null;
        }

        try {
          const writePermission = await permissionsNavigator.permissions.query({
            name: "clipboard-write" as PermissionName,
          });
          permissionWrite = writePermission.state;
        } catch {
          permissionWrite = null;
        }
      }

      if (controller.signal.aborted) {
        return;
      }

      setClipboardSupport({
        supported: canRead || canWrite,
        canRead,
        canWrite,
        permissionRead,
        permissionWrite,
      });
    };

    void updateClipboardSupport();

    return () => {
      controller.abort();
    };
  }, []);

  return clipboardSupport;
};
