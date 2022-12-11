import * as React from "react";
import * as ReactDOM from "react-dom";
import { ConfigOptions } from "../domains/models/popup";
import Popup from "./Popup";

chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
  return chrome.storage.local.get("config", function (storage) {
    const config = storage.config as ConfigOptions;
    ReactDOM.render(
      <Popup defaultConfig={config} />,
      document.getElementById("popup")
    );
  });
});
