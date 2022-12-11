import React from "react";
import ReactDOM from "react-dom/client";

import { ConfigOptions } from "../domains/models/popup";
import Popup from "./Popup";

chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
  return chrome.storage.local.get("config", function (storage) {
    const config = storage.config as ConfigOptions;
    const root = ReactDOM.createRoot(
      document.getElementById("popup") as HTMLElement
    );
    root.render(<Popup defaultConfig={config} />);
  });
});
