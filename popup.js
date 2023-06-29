const CHROMETABQUERY = {
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
});
