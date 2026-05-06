import { useMemory } from "./useMemory";
import { useNetwork } from "./useNetwork";

export const BatteryCheck = () => {
  const { supported, online, effectiveType, downlink, rtt } = useNetwork();
  const { supported: memorySupported, deviceMemory } = useMemory();

  return (
    <section>
      <h3>Network Check</h3>
      <p>supported: {String(supported)}</p>
      <p>online: {String(online)}</p>
      <p>effectiveType: {effectiveType ?? "n/a"}</p>
      <p>downlink: {downlink ?? "n/a"}</p>
      <p>rtt: {rtt ?? "n/a"}</p>
      <h3>Memory Check</h3>
      <p>supported: {String(memorySupported)}</p>
      <p>deviceMemory: {deviceMemory ?? "n/a"}</p>
    </section>
  );
};
