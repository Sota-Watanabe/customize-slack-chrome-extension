// Listen to messages sent from other parts of the extension.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // onMessage must return "true" if response is async.
  let isResponseAsync = false;

  if (request.popupMounted) {
    console.log("eventPage notified that Popup.tsx has mounted.");
  }

  return isResponseAsync;
});

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
