export interface BatteryInfo {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
}

export interface UseBatteryResult {
  supported: boolean;
  loading: boolean;
  error: string | null;
  charging: boolean | null;
  chargingTime: number | null;
  dischargingTime: number | null;
  level: number | null;
  levelPercent: number | null;
  levelDisplay: string | null;
}

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
