import { useBluetoothAvailability } from "./useBluetoothAvailability";
import { useClipboardSupport } from "./useClipboardSupport";
import { useGeolocation } from "./useGeolocation";
import { useHardware } from "./useHardware";
import { useLanguage } from "./useLanguage";
import { useMemory } from "./useMemory";
import { useNetwork } from "./useNetwork";
import { useStorageEstimate } from "./useStorageEstimate";
import { useWakeLock } from "./useWakeLock";

export const BatteryCheck = () => {
  const { supported, online, effectiveType, downlink, rtt } = useNetwork();
  const { supported: memorySupported, deviceMemory } = useMemory();
  const { supported: geolocationSupported } = useGeolocation();
  const { supported: languageSupported, language, languages } = useLanguage();
  const {
    supported: clipboardSupported,
    canRead,
    canWrite,
    permissionRead,
    permissionWrite,
  } = useClipboardSupport();
  const {
    supported: storageSupported,
    quota,
    usage,
    usageDetails,
    persisted,
    refresh,
    requestPersistence,
  } = useStorageEstimate();
  const {
    supported: hardwareSupported,
    hardwareConcurrency,
    maxTouchPoints,
    pdfViewerEnabled,
    platform,
  } = useHardware();
  const {
    supported: wakeLockSupported,
    active: wakeLockActive,
    error: wakeLockError,
    request: requestWakeLock,
    release: releaseWakeLock,
  } = useWakeLock();
  const {
    supported: bluetoothSupported,
    available: bluetoothAvailable,
    error: bluetoothError,
  } = useBluetoothAvailability();

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
      <h3>Clipboard Support Check</h3>
      <p>supported: {String(clipboardSupported)}</p>
      <p>canRead: {String(canRead)}</p>
      <p>canWrite: {String(canWrite)}</p>
      <p>permissionRead: {permissionRead ?? "n/a"}</p>
      <p>permissionWrite: {permissionWrite ?? "n/a"}</p>
      <h3>Storage Estimate Check</h3>
      <p>supported: {String(storageSupported)}</p>
      <p>quota: {quota ?? "n/a"}</p>
      <p>usage: {usage ?? "n/a"}</p>
      <p>usageDetails: {usageDetails ? JSON.stringify(usageDetails) : "n/a"}</p>
      <p>persisted: {String(persisted)}</p>
      <button onClick={refresh}>Refresh Storage Estimate</button>
      <button onClick={requestPersistence}>Request Persistence</button>
      <h3>Hardware Check</h3>
      <p>supported: {String(hardwareSupported)}</p>
      <p>hardwareConcurrency: {hardwareConcurrency ?? "n/a"}</p>
      <p>maxTouchPoints: {maxTouchPoints ?? "n/a"}</p>
      <p>pdfViewerEnabled: {String(pdfViewerEnabled)}</p>
      <p>platform: {platform ?? "n/a"}</p>
      <h3>Wake Lock Check</h3>
      <p>supported: {String(wakeLockSupported)}</p>
      <p>active: {String(wakeLockActive)}</p>
      <p>error: {wakeLockError ?? "n/a"}</p>
      <button onClick={requestWakeLock}>Request Wake Lock</button>
      <button onClick={releaseWakeLock}>Release Wake Lock</button>
      <h3>Bluetooth Availability Check</h3>
      <p>supported: {String(bluetoothSupported)}</p>
      <p>available: {String(bluetoothAvailable)}</p>
      <p>error: {bluetoothError ?? "n/a"}</p>
    </section>
  );
};
