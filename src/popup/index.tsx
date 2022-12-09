import * as React from "react";
import * as ReactDOM from "react-dom";
import { ConfigOptions, ConfigOptionsKey } from "../domains/models/popup";
import Popup from "./Popup";

chrome.tabs.query({ active: true, currentWindow: true }, (tab) =>
  chrome.storage.local.get(ConfigOptionsKey, function (value) {
    const config = value as ConfigOptions;
    ReactDOM.render(
      <Popup defaultConfig={config} />,
      document.getElementById("popup")
    );
  })
);
