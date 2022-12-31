import scrollAutoRead from "./scroll-auto-read";
import favoriteEmojiStamp from "./favorite-emoji-stamp";

chrome.storage.local.get("config", function (storage) {
  if (storage.config.scrollAutoRead) scrollAutoRead();
});

setTimeout(favoriteEmojiStamp, 8000);
