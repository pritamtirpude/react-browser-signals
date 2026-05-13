# react-browser-signals

Lightweight React hooks for reading real browser capability signals with TypeScript support.

## Install

```bash
npm i react-browser-signals
```

## Usage

```tsx
import { useNetwork, useGeolocation } from "react-browser-signals";

function Demo() {
  const network = useNetwork();
  const geo = useGeolocation({ enableHighAccuracy: true });

  return (
    <div>
      <p>Online: {String(network.online)}</p>
      <p>
        Location: {geo.latitude ?? "-"}, {geo.longitude ?? "-"}
      </p>
    </div>
  );
}
```

## Included Hooks

- `useBattery`
- `useBluetoothAvailability`
- `useClipboardSupport`
- `useGeolocation`
- `useHardware`
- `useLanguage`
- `useMemory`
- `useNetwork`
- `useShare`
- `useStorageEstimate`
- `useUserAgent`
- `useVibration`
- `useWakeLock`

## Browser API Support

This package wraps native browser APIs. Some of these APIs are not supported in all browsers, devices, or contexts.

- `useBattery`, `useMemory`, `useWakeLock`, `useVibration`, and Bluetooth-related APIs may be unavailable in Safari/iOS or desktop browsers.
- `useGeolocation`, `useClipboardSupport`, and `useShare` can require HTTPS, user gestures, and runtime permissions.
- `useNetwork` and `useUserAgent` can return partial data depending on browser privacy restrictions.

For production usage, always check support and error states before relying on values:

```tsx
const geo = useGeolocation();

if (!geo.supported) return <p>Geolocation is not supported in this browser.</p>;
if (geo.error) return <p>Location error: {geo.error}</p>;
```

Behavior can vary by browser version, OS, and security context.

## License

MIT
