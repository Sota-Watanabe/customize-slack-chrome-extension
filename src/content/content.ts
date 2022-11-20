const re = /\/client\/.+?\/unreads.?/;
if (re.test(location.pathname)) {
  const unreadContainers = document.querySelectorAll(
    `.c-virtual_list__sticky_container:has([id^=unreads_view_header-])`
  ) as unknown as HTMLCollectionOf<HTMLElement>;

  const setReadContainer = unreadContainers[0].parentElement
    .lastElementChild as HTMLElement;
  console.log(window.innerHeight as unknown as string);
  setReadContainer.style.paddingBottom = `${
    window.innerHeight as unknown as string
  }px`;

  for (const container of Array.from(unreadContainers)) {
    console.log(container)
    container.style.color = 'red';
  }
}
