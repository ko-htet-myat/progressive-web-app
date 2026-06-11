// src/components/PWAUpdater.tsx
import React from "react";
import { registerSW } from "virtual:pwa-register";

export function PWAUpdater() {
  const [needRefresh, setNeedRefresh] = React.useState(false);
  const [offlineReady, setOfflineReady] = React.useState(false);

  const updateServiceWorker = registerSW({
    onNeedRefresh() {
      setNeedRefresh(true);
    },
    onOfflineReady() {
      setOfflineReady(true);
      setTimeout(() => setOfflineReady(false), 5000);
    },
  });

  // If nothing needs attention, don't render any DOM footprint
  if (!needRefresh && !offlineReady) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] max-w-md pointer-events-auto">
      {offlineReady && (
        <div className="bg-emerald-600 text-white p-4 rounded-lg shadow-2xl border border-emerald-500 animate-fade-in">
          <p className="font-semibold">✓ Ready to work offline</p>
          <p className="text-xs text-emerald-100 mt-1">
            The POS system cache is optimized and secure.
          </p>
        </div>
      )}

      {needRefresh && (
        <div className="bg-slate-900 text-white p-5 rounded-lg shadow-2xl border border-slate-700 flex flex-col gap-3 max-w-sm">
          <div>
            <p className="font-bold text-amber-400 text-sm tracking-wide uppercase">
              System Update Available
            </p>
            <p className="text-sm text-slate-300 mt-1">
              A new version of the POS platform is ready. Update now to sync
              latest features?
            </p>
          </div>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setNeedRefresh(false)}
              className="text-xs text-slate-400 hover:text-white px-3 py-2 transition"
            >
              Dismiss
            </button>
            <button
              onClick={() => updateServiceWorker(true)}
              className="text-xs bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded transition shadow-md"
            >
              Reload & Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
