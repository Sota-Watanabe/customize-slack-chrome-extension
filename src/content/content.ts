import { Exception } from "node-sass";

window.addEventListener("complete", function () {
  const re = /\/client\/.+?\/unreads.?/;
  if (re.test(location.pathname)) {
    console.log("start");
    const a = document.querySelector(`.p-unreads_view`);
    //   const a = document.querySelectorAll(`.c-virtual_list__sticky_container`);
    console.log(a);
    console.log("afsda");
  }
});


// window.addEventListener("load", function () {
//   const re = /\/client\/.+?\/unreads.?/;
//   if (re.test(location.pathname)) {
//     console.log("start");
//     const a = document.querySelector(`.p-unreads_view`);
//     //   const a = document.querySelectorAll(`.c-virtual_list__sticky_container`);
//     console.log(a);
//     console.log("afsda");
//   }
// });
