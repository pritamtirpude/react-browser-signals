import { useGeolocation } from "./useGeolocation";
import { useLanguage } from "./useLanguage";
import { useMemory } from "./useMemory";
import { useNetwork } from "./useNetwork";

export const BatteryCheck = () => {
  const { supported, online, effectiveType, downlink, rtt } = useNetwork();
  const { supported: memorySupported, deviceMemory } = useMemory();
  const { supported: geolocationSupported } = useGeolocation();
  const { supported: languageSupported, language, languages } = useLanguage();

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
      <h3>Geolocation Check</h3>
      <p>supported: {String(geolocationSupported)}</p>
      <h3>Language Check</h3>
      <p>supported: {String(languageSupported)}</p>
      <p>language: {language ?? "n/a"}</p>
      <p>languages: {languages.length > 0 ? languages.join(", ") : "n/a"}</p>
    </section>
  );
};
