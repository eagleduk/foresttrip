var CHROMETABQUERY = {
  active: true,
  url: ["https://www.foresttrip.go.kr/rep/or/sssn/monthRsrvtStatus.do*"],
  currentWindow: true,
};

document.addEventListener("DOMContentLoaded", (e) => {
  document.getElementById("add").addEventListener("click", async (e) => {
    chrome.tabs.query(CHROMETABQUERY, ([tab]) => {
      if (tab) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["inject_start.js"],
        });
      }
    });
  });

  document.getElementById("succession").addEventListener("click", (e) => {
    chrome.tabs.query(CHROMETABQUERY, ([tab]) => {
      if (tab) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => {
            var mxmmStngDayCntEl = document.getElementById("mxmmStngDayCnt");
            if (mxmmStngDayCntEl) {
              var value = mxmmStngDayCntEl.value;
              var { ables } = mxmmStngDayCntEl.dataset;
              var ablesArray = ables.split(",");

              if (value && parseInt(value)) {
                for (let i = 2; i <= parseInt(value) && i < 7; i++) {
                  if (ablesArray[i - 2] === "0") break;
                  document.getElementById(
                    "popComboSelectUseDt"
                  ).innerHTML += `<div><label for="daysel${i}"><input type="radio" id="daysel${i}" name="daysel" value="${i}"> ${i}박${
                    i + 1
                  }일</label></div>`;
                }
              }
              // document.getElementById(
              //   "popComboSelectUseDt"
              // ).innerHTML += `<span>최대 박수: ${value}, 오늘 이후 가능 날 ables: ${ables}, 추가 최대 index: ${maxIndex}</span>`;
            }
          },
        });
      }
    });
    // chrome.storage.sync.get("monthRsrvtStatus", (v) => {
    //   console.log(v);
    // });
  });
});
