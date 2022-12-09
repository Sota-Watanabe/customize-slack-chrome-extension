import scrollAutoRead from "./scroll-auto-read";

chrome.storage.local.get("scrollAutoRead", function (config) {
  if (config.scrollAutoRead) scrollAutoRead();
});
