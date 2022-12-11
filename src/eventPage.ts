// Listen to messages sent from other parts of the extension.
// 後にリファクタ
chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
  if (
    info.status === "complete" &&
    tab.url.indexOf("https://app.slack.com") !== -1
  ) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames: true },
      files: ["./js/content.js"],
    });
  }
});

chrome.webRequest.onCompleted.addListener(
  function (details) {
    if (
      details.url.indexOf("https://app.slack.com") !== -1 &&
      details.tabId > 0
    ) {
      chrome.scripting.executeScript({
        target: { tabId: details.tabId, allFrames: true },
        files: ["./js/content.js"],
      });
    }
  },
  { urls: ["https://app.slack.com/*"] }
);

// インストール時にstorageを初期化
chrome.runtime.onInstalled.addListener(({}) => {
  chrome.storage.local.set({ config: { scrollAutoRead: true } });
});
