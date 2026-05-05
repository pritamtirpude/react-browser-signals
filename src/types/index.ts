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
