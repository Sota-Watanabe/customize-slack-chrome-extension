const re = /\/client\/.+?\/unreads.?/;
if (re.test(location.pathname)) {

  // スクロールできるように padding 調整
  const unreadsFooter = document.querySelector(
    "#unreads_view_footer"
  ) as HTMLElement;
  if (unreadsFooter) {
    unreadsFooter.style.paddingBottom = `${
      window.innerHeight as unknown as string
    }px`;
  }


  const unreadContainers = document.querySelectorAll(
    `[id^=unreads_view_spacer-bottom-]`
  ) as unknown as HTMLCollectionOf<HTMLElement>;

  for (const container of Array.from(unreadContainers)) {
    container.style.color = "red";
    const unreadId = container.id.split("-").slice(-1)[0];
    // onceは一回だけ実行する時用です
    let once = false;

    // スクロール時に非表示になったら既読ボタンクリック
    window.addEventListener(
      "scroll",
      function () {
        const containerTop = container.getBoundingClientRect().top;
        // console.log(`container`);
        // console.log(container);
        // console.log(`top=${containerTop}`);
        if (containerTop === 0) return;
        // console.log(`比較対象=${160 - container.clientHeight}`);
        const e = container.clientHeight;

        // TODO: 160 を可変にできるように、
        // ヘッダー + 未読 + 未読ヘッダー + container高さ = 160くらい
        if (containerTop < 160 - container.clientHeight && !once) {
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
