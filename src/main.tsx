import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { App } from "./App";
import { PWAUpdater } from "./components/pwa-updater";

const rootElement = document.getElementById("root")!;

// Use cached root if it exists to prevent double createRoot calls during HMR
let root = (window as any).__reactRoot;
if (!root) {
  root = ReactDOM.createRoot(rootElement);
  (window as any).__reactRoot = root;
}

root.render(
  <StrictMode>
    <App />
    <PWAUpdater />
  </StrictMode>,
);

