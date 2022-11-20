import { Exception } from "node-sass";

const re = /\/client\/.+?\/unreads.?/;
if (re.test(location.pathname)) {
  const unreadContainers = document.querySelectorAll(
    `.c-virtual_list__sticky_container:has([id^=unreads_view_header-])`
  ) as unknown as HTMLCollectionOf<HTMLElement>;

  for (const container of Array.from(unreadContainers)) {
    console.log(container)
    container.style.color = 'red';
  }
}
