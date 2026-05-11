export type BatteryInfo = {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
};

export type UseBatteryResult = {
  supported: boolean;
  loading: boolean;
  error: string | null;
  charging: boolean | null;
  chargingTime: number | null;
  dischargingTime: number | null;
  level: number | null;
  levelPercent: number | null;
  levelDisplay: string | null;
};

export type NetworkData = {
  supported: boolean;
  online: boolean | null;
  effectiveType: string | null;
  downlink: number | null;
  rtt: number | null;
};

export type MemoryData = {
  supported: boolean;
  deviceMemory: number | null;
};

export type UserAgentData = {
  supported: boolean;
  userAgent: string | null;
};

export type UserAgentBrand = {
  brand: string;
  version: string;
};

export type UserAgentClientHints = {
  brands: UserAgentBrand[];
  mobile: boolean;
  platform: string;
};

export type GeolocationData = {
  supported: boolean;
  loading: boolean;
  error: string | null;
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
  timestamp: number | null;
};

export type LanguageData = {
  supported: boolean;
  language: string | null;
  languages: string[];
};

export type ClipboardSupportData = {
  supported: boolean;
  canRead: boolean;
  canWrite: boolean;
  permissionRead: PermissionState | null;
  permissionWrite: PermissionState | null;
};

export type StorageEstimateData = {
  supported: boolean;
  loading: boolean;
  error: string | null;
  quota: number | null;
  usage: number | null;
  usageDetails: Record<string, number> | null;
  persisted: boolean | null;
};

export type UseStorageEstimateResult = StorageEstimateData & {
  refresh: () => Promise<void>;
  requestPersistence: () => Promise<boolean | null>;
};

export type HardwareData = {
  supported: boolean;
  hardwareConcurrency: number | null;
  maxTouchPoints: number | null;
  pdfViewerEnabled: boolean | null;
  platform: string | null;
};

export type WakeLockData = {
  supported: boolean;
  active: boolean;
  error: string | null;
};

export type UseWakeLockResult = WakeLockData & {
  request: () => Promise<boolean>;
  release: () => Promise<boolean>;
};

export type BluetoothAvailabilityData = {
  supported: boolean;
  available: boolean | null;
  error: string | null;
};

export type UseVibrationResult = {
  supported: boolean;
  vibrate: (pattern: number | number[]) => boolean;
  cancel: () => boolean;
};
