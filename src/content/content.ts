import scrollAutoRead from "./scroll-auto-read";

chrome.storage.local.get("config", function (storage) {
  if (storage.config.scrollAutoRead) scrollAutoRead();
});
