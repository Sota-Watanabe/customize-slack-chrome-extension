//コールバック関数
function callback(mutationsList, observer) {
  console.log("----------");
  for (const mutation of mutationsList) {
    const addedNode = mutation.addedNodes[0];
    if (!addedNode) continue;
    // console.log(addedNode.id);
    // 処理
    if (addedNode.id.indexOf("unreads_view_spacer-bottom-") === 0) {
      const unreadId = addedNode.id.split("-").slice(-1)[0];
      // onceは一回だけ実行する時用です
      let observing = true;

      // スクロール時に非表示になったら既読ボタンクリック
      document.addEventListener(
        "scroll",
        function () {
          const containerTop = addedNode.getBoundingClientRect().top;
          if (containerTop === 0) return;

          // TODO: 160 を可変にできるように、
          // ヘッダー + 未読 + 未読ヘッダー + container高さ(unreadBottom.clientHeight) = 160くらい
          if (containerTop < 160 - addedNode.clientHeight && observing) {
            observing = false;
            const readBtn = document.querySelector(
              `#unreads_view_header-${unreadId} > div > span > button`
            ) as HTMLElement;
            if (readBtn) readBtn.click();
          }
        },
        { capture: true }
      );
      continue;
    }
    // 「○件の新しいメッセージ」ボタンを自動クリック
    if (addedNode.id.indexOf("unreads_view_show-newer-") === 0) {
      addedNode.firstElementChild.click();
      continue;
    }
    // 最後までスクロールできるようパディング追加
    if (addedNode.id === "unreads_view_footer") {
      addedNode.firstElementChild.style.paddingBottom = `${
        window.innerHeight as unknown as string
      }px`;

      continue;
    }
    // break;
  }
  //ターゲット要素の監視を停止
  // obs.disconnect();
}

// TODO: 何処かでこれを実行
const autoNewMessageShow = () => {
  const showBtn = document.querySelector(
    `.p-unreads_view__empty--show_new > button`
  ) as HTMLElement;
  if (showBtn) showBtn.click();
};

// 未読ページか確認
const re = /\/client\/.+?\/unreads.?/;
if (re.test(location.pathname)) {
  //ターゲット要素をDOMで取得
  const unreadsView = document.querySelector(`#unreads_view > div [role=list]`);

  //インスタンス化
  const obs = new MutationObserver(callback);
  // 監視を開始
  if (unreadsView) {
    console.log("target");
    obs.observe(unreadsView, {
      childList: true,
    });
  }
}

// const bindEvent = () => {
//   console.log("start bindEvent");
//   // スクロールできるように padding 調整
//   const unreadsFooter = document.querySelector(
//     "#unreads_view_footer"
//   ) as HTMLElement;
//   if (unreadsFooter) {
//     unreadsFooter.style.paddingBottom = `${
//       window.innerHeight as unknown as string
//     }px`;
//   }

//   const unreadContainers = document.querySelectorAll(
//     `[id^=unreads_view_spacer-bottom-]`
//   ) as unknown as HTMLCollectionOf<HTMLElement>;

//   for (const container of Array.from(unreadContainers)) {
//     container.style.color = "red";
// };
