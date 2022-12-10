import { ConfigOptionsKey } from "../domains/models/popup";
import scrollAutoRead from "./scroll-auto-read";

chrome.storage.local.get(ConfigOptionsKey, function (config) {
  if (config.scrollAutoRead) scrollAutoRead();
});
