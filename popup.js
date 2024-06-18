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
            var targetDate =
              document.getElementById("popSelectedUseDt").textContent;

            var mxmmStngDayCntEl = document.getElementById("mxmmStngDayCnt");
            if (mxmmStngDayCntEl) {
              var value = mxmmStngDayCntEl.value;
              var { ables, lastday } = mxmmStngDayCntEl.dataset;

              var targetDates = targetDate.slice(0, 10).split(".");
              var targetTimes = new Date(
                targetDates[0],
                targetDates[1],
                targetDates[2]
              ).getTime();

              var lastdays = [
                lastday.slice(0, 4),
                lastday.slice(4, 6),
                lastday.slice(6, 8),
              ];
              var lastTimes = new Date(
                lastdays[0],
                lastdays[1],
                lastdays[2]
              ).getTime();

              if (lastTimes < targetTimes && ables) {
                var targetTD = document.getElementById("popComboSelectUseDt");

                var targetChildCount = targetTD.childElementCount;
                var ablesArray = ables.split(",");

                if (value && parseInt(value)) {
                  for (
                    let i = targetChildCount + 1;
                    i <= parseInt(value) && i < 7;
                    i++
                  ) {
                    if (
                      !ablesArray[i - (targetChildCount + 1)] ||
                      ablesArray[i - (targetChildCount + 1)] === "0"
                    )
                      break;
                    targetTD.innerHTML += `<div><label for="daysel${i}"><input type="radio" id="daysel${i}" name="daysel" value="${i}"> ${i}박${
                      i + 1
                    }일</label></div>`;
                  }
                }
              }

              mxmmStngDayCntEl.remove();
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
