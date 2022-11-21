//コールバック関数
function callback(mutationsList, observer) {
  console.log("----------");
  for (const mutation of mutationsList) {
    // 処理
    if (
      mutation.addedNodes[0] &&
      mutation.addedNodes[0].id.indexOf("unreads_view_spacer-bottom-") === 0
    ) {
      const unreadBottom = mutation.addedNodes[0];
      const unreadId = unreadBottom.id.split("-").slice(-1)[0];
      // onceは一回だけ実行する時用です
      let once = false;

      // スクロール時に非表示になったら既読ボタンクリック
      window.addEventListener(
        "scroll",
        function () {
          const containerTop = unreadBottom.getBoundingClientRect().top;
          if (containerTop === 0) return;

          // TODO: 160 を可変にできるように、
          // ヘッダー + 未読 + 未読ヘッダー + container高さ(unreadBottom.clientHeight) = 160くらい
          if (containerTop < 160 - unreadBottom.clientHeight && !once) {
            once = true;
            const readBtn = document.querySelector(
              `#unreads_view_header-${unreadId} > div > span > button`
            ) as HTMLElement;
            if (readBtn) readBtn.click();
          }
        },
        { capture: true }
      );
    }
  }
  //ターゲット要素の監視を停止
  // obs.disconnect();
}

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
