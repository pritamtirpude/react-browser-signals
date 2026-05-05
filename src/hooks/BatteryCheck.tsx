import { useBattery } from "./useBattery";

export const BatteryCheck = () => {
  const {
    dischargingTime,
    level,
    levelPercent,
    levelDisplay,
    supported,
    loading,
    error,
    chargingTime,
    charging,
  } = useBattery();

  return (
    <section>
      <h3>Battery Check</h3>
      <p>supported: {String(supported)}</p>
      <p>loading: {String(loading)}</p>
      <p>error: {error ?? "none"}</p>
      <p>charging: {charging === null ? "n/a" : String(charging)}</p>
      <p>chargingTime: {chargingTime ?? "n/a"}</p>
      <p>dischargingTime: {dischargingTime ?? "n/a"}</p>
      <p>level: {level ?? "n/a"}</p>
      <p>levelPercent: {levelPercent ?? "n/a"}</p>
      <p>levelDisplay: {levelDisplay ?? "n/a"}</p>
    </section>
  );
};
