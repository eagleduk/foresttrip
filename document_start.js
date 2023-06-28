function injectScript(src) {
  const s = document.createElement("script");
  s.src = chrome.runtime.getURL(src);
  s.type = "module";
  s.onload = function () {
    this.remove();
  };
  console.log(s);
  console.log(document.querySelector("body"));
  document.querySelector("body").appendChild(s);
  console.log("inject function end");
}

console.log("injectScript start");
injectScript("inject_start.js");
console.log("injectScript end");
