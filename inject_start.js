(function (src) {
  const s = document.createElement("script");
  s.src = chrome.runtime.getURL(src);
  s.type = "module";
  s.onload = function () {
    this.remove();
  };
  document.querySelector("body").appendChild(s);
})("inject.js");
