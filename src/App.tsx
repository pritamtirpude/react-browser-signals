type HookDoc = {
  name: string;
  purpose: string;
  returns: string;
  example: string;
};

const hookDocs: HookDoc[] = [
  {
    name: "useBattery",
    purpose: "Reads battery state and live battery events.",
    returns:
      "{ supported, loading, error, charging, chargingTime, dischargingTime, level, levelPercent, levelDisplay }",
    example: `const battery = useBattery();\nif (battery.supported && !battery.loading) {\n  console.log(battery.levelDisplay);\n}`,
  },
  {
    name: "useBluetoothAvailability",
    purpose: "Checks Bluetooth API support and adapter availability.",
    returns: "{ supported, available, error }",
    example: `const bluetooth = useBluetoothAvailability();\nconsole.log(bluetooth.available); // true | false | null`,
  },
  {
    name: "useClipboardSupport",
    purpose: "Detects read/write clipboard capabilities and permissions.",
    returns:
      "{ supported, canRead, canWrite, permissionRead, permissionWrite }",
    example: `const clipboard = useClipboardSupport();\nif (clipboard.canWrite) {\n  // Safe to call navigator.clipboard.writeText(...)\n}`,
  },
  {
    name: "useGeolocation",
    purpose: "Gets one-shot geolocation with optional PositionOptions.",
    returns:
      "{ supported, loading, error, latitude, longitude, accuracy, altitude, altitudeAccuracy, heading, speed, timestamp }",
    example: `const geo = useGeolocation({ enableHighAccuracy: true });\nif (geo.latitude && geo.longitude) {\n  console.log(geo.latitude, geo.longitude);\n}`,
  },
  {
    name: "useHardware",
    purpose: "Reads device/browser hardware-related signals.",
    returns:
      "{ supported, hardwareConcurrency, maxTouchPoints, pdfViewerEnabled, platform }",
    example: `const hardware = useHardware();\nconsole.log(hardware.hardwareConcurrency);`,
  },
  {
    name: "useLanguage",
    purpose: "Tracks browser language and languagechange updates.",
    returns: "{ supported, language, languages }",
    example: `const language = useLanguage();\nconsole.log(language.language, language.languages);`,
  },
  {
    name: "useMemory",
    purpose: "Reads navigator.deviceMemory when available.",
    returns: "{ supported, deviceMemory }",
    example: `const memory = useMemory();\nconsole.log(memory.deviceMemory); // e.g. 8`,
  },
  {
    name: "useNetwork",
    purpose: "Tracks online state and network connection metrics.",
    returns: "{ supported, online, effectiveType, downlink, rtt }",
    example: `const network = useNetwork();\nif (network.online === false) {\n  console.log("Offline mode");\n}`,
  },
  {
    name: "useShare",
    purpose: "Detects Web Share support and capabilities.",
    returns: "{ supported, canShareText, canShareFiles, isSecureContext }",
    example: `const share = useShare();\nif (share.supported && share.canShareText) {\n  await navigator.share({ text: "Hello" });\n}`,
  },
  {
    name: "useStorageEstimate",
    purpose: "Reads storage quota/usage and exposes refresh/persist helpers.",
    returns:
      "{ supported, loading, error, quota, usage, usageDetails, persisted, refresh, requestPersistence }",
    example: `const storage = useStorageEstimate();\nawait storage.refresh();\nawait storage.requestPersistence();`,
  },
  {
    name: "useUserAgent",
    purpose: "Returns User-Agent Client Hints when available.",
    returns: "UserAgentClientHints | null",
    example: `const ua = useUserAgent();\nconsole.log(ua?.platform, ua?.mobile);`,
  },
  {
    name: "useVibration",
    purpose: "Provides vibration helpers for supported devices.",
    returns: "{ supported, vibrate, cancel }",
    example: `const vibration = useVibration();\nvibration.vibrate([100, 50, 100]);\nvibration.cancel();`,
  },
  {
    name: "useWakeLock",
    purpose: "Manages screen wake lock lifecycle.",
    returns: "{ supported, active, error, request, release }",
    example: `const wakeLock = useWakeLock();\nawait wakeLock.request();\nawait wakeLock.release();`,
  },
];

const installCode = `npm i react-browser-signals\n\n// or\nyarn add react-browser-signals`;

const importCode = `import {\n  useBattery,\n  useBluetoothAvailability,\n  useClipboardSupport,\n  useGeolocation,\n  useHardware,\n  useLanguage,\n  useMemory,\n  useNetwork,\n  useShare,\n  useStorageEstimate,\n  useUserAgent,\n  useVibration,\n  useWakeLock\n} from "react-browser-signals";`;

const App = () => {
  return (
    <main className="page">
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=IBM+Plex+Mono:wght@400;600&display=swap");

        :root {
          --bg: #f8f5ee;
          --panel: rgba(255, 255, 255, 0.72);
          --panel-solid: #fffdf8;
          --text: #202021;
          --muted: #5c5550;
          --accent: #006d77;
          --accent-soft: #83c5be;
          --ring: #ffddd2;
          --shadow: 0 20px 50px rgba(32, 32, 33, 0.1);
        }

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: "Space Grotesk", sans-serif;
          color: var(--text);
          background:
            radial-gradient(circle at 0% 0%, rgba(131, 197, 190, 0.35) 0%, transparent 30%),
            radial-gradient(circle at 100% 20%, rgba(255, 221, 210, 0.6) 0%, transparent 34%),
            radial-gradient(circle at 50% 100%, rgba(0, 109, 119, 0.09) 0%, transparent 36%),
            var(--bg);
          min-height: 100vh;
        }

        .page {
          max-width: 1120px;
          margin: 0 auto;
          padding: 48px 20px 72px;
        }

        .hero {
          display: grid;
          gap: 20px;
          background: var(--panel);
          border: 1px solid rgba(0, 109, 119, 0.14);
          border-radius: 24px;
          padding: 36px;
          backdrop-filter: blur(10px);
          box-shadow: var(--shadow);
          animation: rise 640ms ease-out;
        }

        .eyebrow {
          margin: 0;
          color: var(--accent);
          font-size: 0.84rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 700;
        }

        h1 {
          margin: 0;
          line-height: 1.05;
          font-size: clamp(2rem, 4vw, 3.8rem);
        }

        .lead {
          margin: 0;
          color: var(--muted);
          max-width: 72ch;
          font-size: 1.05rem;
        }

        .hero-grid {
          display: grid;
          gap: 16px;
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .metric {
          border-radius: 14px;
          background: var(--panel-solid);
          border: 1px solid rgba(0, 109, 119, 0.14);
          padding: 14px;
        }

        .metric strong {
          display: block;
          font-size: 1.5rem;
        }

        .section {
          margin-top: 28px;
          background: var(--panel);
          border: 1px solid rgba(0, 109, 119, 0.14);
          border-radius: 20px;
          padding: 26px;
          box-shadow: var(--shadow);
          animation: rise 700ms ease-out;
        }

        .section h2 {
          margin-top: 0;
          margin-bottom: 10px;
          font-size: 1.45rem;
        }

        .cards {
          display: grid;
          gap: 14px;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        }

        .card {
          background: var(--panel-solid);
          border: 1px solid rgba(0, 109, 119, 0.14);
          border-radius: 16px;
          padding: 16px;
          opacity: 0;
          transform: translateY(8px);
          animation: settle 380ms ease-out forwards;
        }

        .card:nth-child(2n) {
          animation-delay: 60ms;
        }

        .card:nth-child(3n) {
          animation-delay: 120ms;
        }

        .card h3 {
          margin: 0 0 8px;
          font-size: 1.06rem;
        }

        .card p {
          margin: 0 0 10px;
          color: var(--muted);
          font-size: 0.95rem;
        }

        .label {
          display: block;
          margin-bottom: 5px;
          color: #3f3a37;
          font-size: 0.75rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-weight: 700;
        }

        pre {
          margin: 0;
          white-space: pre-wrap;
          border-radius: 12px;
          background: #161717;
          color: #f2f5f7;
          border: 1px solid #2c3236;
          padding: 12px;
          font: 0.82rem/1.55 "IBM Plex Mono", monospace;
          overflow: auto;
        }

        .returns {
          margin: 0;
          border-radius: 10px;
          padding: 10px;
          border: 1px solid rgba(0, 109, 119, 0.22);
          background: rgba(131, 197, 190, 0.12);
          font: 0.82rem/1.4 "IBM Plex Mono", monospace;
        }

        .note {
          margin-top: 12px;
          color: var(--muted);
          font-size: 0.9rem;
        }

        @keyframes rise {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes settle {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 860px) {
          .hero {
            padding: 24px;
          }

          .hero-grid {
            grid-template-columns: 1fr;
          }

          .section {
            padding: 20px;
          }
        }
      `}</style>

      <section className="hero">
        <p className="eyebrow">React Browser Signals</p>
        <h1>Browser capability hooks with zero guesswork.</h1>
        <p className="lead">
          A practical hook collection for reading real browser signals like
          battery, network, language, geolocation, wake lock and storage. Use
          these hooks to adapt UX to device reality in seconds.
        </p>
        <div className="hero-grid">
          <div className="metric">
            <strong>13 Hooks</strong>
            Browser APIs wrapped as React-first data.
          </div>
          <div className="metric">
            <strong>SSR Friendly</strong>
            Each hook safely handles non-browser environments.
          </div>
          <div className="metric">
            <strong>Typed Results</strong>
            Clean TypeScript return shapes for production use.
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Quick Start</h2>
        <div className="cards">
          <article className="card">
            <span className="label">Install</span>
            <pre>{installCode}</pre>
          </article>
          <article className="card">
            <span className="label">Import</span>
            <pre>{importCode}</pre>
          </article>
        </div>
      </section>

      <section className="section">
        <h2>All Hooks and How to Use Them</h2>
        <div className="cards">
          {hookDocs.map((hook) => (
            <article key={hook.name} className="card">
              <h3>{hook.name}</h3>
              <p>{hook.purpose}</p>

              <span className="label">Returns</span>
              <p className="returns">{hook.returns}</p>

              <span className="label" style={{ marginTop: 10 }}>
                Example
              </span>
              <pre>{hook.example}</pre>
            </article>
          ))}
        </div>
        <p className="note">
          Tip: some APIs require secure contexts (HTTPS) and/or user permission.
          Always check `supported` and `error` before rendering critical UI.
        </p>
      </section>
    </main>
  );
};

export default App;
