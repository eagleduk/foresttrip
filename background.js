chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  const url = new URL(tab.url);

  if (info.status !== "complete") return;

  if (url.href.startsWith("https://www.foresttrip.go.kr/")) {
  }
});
