import ReactDOM from "react-dom/client";
import FavoriteEmojiStampContainer from "./favorite-emoji-stamp-container";

const favoriteEmojiStamp = () => {
  console.log("scrollAutoRead func");

  // 'c-message_kit__actions c-message_kit__actions--inside' の子要素として、
  // 'c-message_actions__container c-message__actions'が追加されたら、特定のお気に入りスタンプインスタンスを追加
  console.log("↓");
  const favoriteStampParents = document.querySelectorAll(
    ".c-message_kit__actions"
  );
  console.log(favoriteStampParents[0]);

  const emptyObs = new MutationObserver((mutationsList) => {
    // 新しいメッセージボタンの自動クリック
    if (
      (mutationsList[0]?.addedNodes[0] as HTMLElement)?.className ===
      "c-message_actions__container c-message__actions"
    ) {
      console.log('↓')
      console.log(mutationsList[0]?.addedNodes[0]);
      // メッセージにお気に入りスタンプコンポーネントを追加
      const actionsContainer = mutationsList[0]?.addedNodes[0].firstChild as HTMLElement;
      if (actionsContainer.querySelector(".dummy")) return;
      const dummy = document.createElement("div");
      dummy.className = "dummy";
      actionsContainer.prepend(dummy);
      const root = ReactDOM.createRoot(
        actionsContainer.querySelector(".dummy")
      );
      root.render(<FavoriteEmojiStampContainer />);
    }
  });
  emptyObs.observe(favoriteStampParents[0], {
    childList: true,
  });
};

export default favoriteEmojiStamp;
