const CHROMETABQUERY = {
  // selected: true,
  active: true,
  url: ["https://www.foresttrip.go.kr/*"],
};

const RENTTARGETDAY = 2;

function addRentAnchor() {
  // console.log(window);
  // monthRsrvtStatus.srchLastDay;
  // monthRsrvtStatus.goodsList;

  var addBtn = document.createElement("button");
  addBtn.className = "schBtn";

  var img = document.createElement("img");
  img.src = "https://image.foresttrip.go.kr/images/content/icon_search.png";
  img.alt = "검색";

  addBtn.appendChild(img);

  addBtn.addEventListener("click", (e) => {
    console.log(window);
    detectDevTool();
  });

  //document.getElementById("searchBtn").parentElement.appendChild(addBtn);

  return;
  const tbody = document.getElementById("dayListTbody");
  const trs = tbody.children;
  monthRsrvtStatus.goodsList.forEach((goods, index) => {
    const tr = trs[index];
    const tds = tr.children;
    goods.forEach((good, index) => {
      const useDt = good.useDt;
      if (+useDt < +monthRsrvtStaus.srchLastDay + 6) {
        console.log(useDt, good);
        tds[index].innerHTML = "<span>예</span>";
      } else {
        return false;
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", (e) => {
  document.getElementById("add").addEventListener("click", async (e) => {
    // var port = chrome.extension.connect({
    //   name: "Sample Communication",
    // });
    // port.postMessage("Hi BackGround");
    // port.onMessage.addListener(function (msg) {
    //   console.log("message recieved" + msg);
    // });

    chrome.tabs.query(CHROMETABQUERY, (tabs) => {
      // const gett = chrome.windows.get({
      //   tabId: tabs[0].id,
      // });
      // console.log(gett);

      // chrome.tabs.sendMessage(tabs[0].id, { greeting: "hello" });

      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        //args: [],
        //func: addRentAnchor,
        files: ["document_start.js"],
      });
    });
  });

  return;

  const srchSido = document.getElementById("srchSido");
  const srchInstt = document.getElementById("srchInstt");
  const srchForest = document.getElementById("srchForest");
  const srchForest2 = document.getElementById("srchForest2");
  const srchGoodsId = document.getElementById("srchGoodsId");
  const srchDate = document.getElementById("srchDate");

  // 지역 선택
  srchSido.addEventListener("change", async (e) => {
    const value = e.target.value;
    if (value) {
      chrome.tabs.query(CHROMETABQUERY, (tabs) => {
        chrome.scripting
          .executeScript({
            target: { tabId: tabs[0].id },
            args: [value],
            func: changeSidoHandler,
          })
          .then((injectionResults) => {
            srchInstt.innerHTML = `<option value="">자연휴양림 선택</option>`;
            injectionResults[0].result?.forEach(
              ({ insttId, insttNm, sthngCnt }) => {
                const option = document.createElement("option");
                option.textContent = insttNm;
                option.value = insttId;
                srchInstt.appendChild(option);
              }
            );
          });
      });
    }
  });

  // 휴향림 선택
  srchInstt.addEventListener("change", async (e) => {
    const value = e.target.value;
    if (value) {
      chrome.tabs.query(CHROMETABQUERY, (tabs) => {
        chrome.scripting
          .executeScript({
            target: { tabId: tabs[0].id },
            args: [value],
            func: changeInsttHandler,
          })
          .then((injectionResults) => {
            srchForest.innerHTML = `<option value="">숙박시설 선택</option>`;
            console.log("휴향림 선택", injectionResults);
            injectionResults[0].result?.sthngList?.forEach(
              ({ codeNm, upperGoodsClsscCd }) => {
                const option = document.createElement("option");
                option.textContent = codeNm;
                option.value = upperGoodsClsscCd;
                srchForest.appendChild(option);
              }
            );
          });
      });
    }
  });

  // 숙소1 선택
  srchForest.addEventListener("change", async (e) => {
    const instt = srchInstt.value;
    const goods = e.target.value;
    if (instt && goods) {
      chrome.tabs.query(CHROMETABQUERY, (tabs) => {
        chrome.scripting
          .executeScript({
            target: { tabId: tabs[0].id },
            args: [instt, goods],
            func: changeForestHandler,
          })
          .then((injectionResults) => {
            srchForest2.innerHTML = `<option value="">시설 전체</option>`;
            console.log("숙소 1 선택", injectionResults);
            injectionResults[0].result?.forEach(({ codeNm, goodsClsscCd }) => {
              const option = document.createElement("option");
              option.textContent = codeNm;
              option.value = goodsClsscCd;
              srchForest2.appendChild(option);
            });
          });
      });
    }
  });

  // 검색 버튼
  const searchBtn = document.getElementById("search");

  searchBtn.addEventListener("click", (e) => {
    const insttId = srchInstt.value;
    const upperGoodsClsscCd = srchForest.value;
    const goodsClsscCd = srchForest2.value;
    if (insttId && upperGoodsClsscCd) {
      console.log("params ", insttId, upperGoodsClsscCd, goodsClsscCd);
      chrome.tabs.query(CHROMETABQUERY, async (tabs) => {
        const response = await chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          args: [insttId, upperGoodsClsscCd, goodsClsscCd],
          func: searchButtonHandler,
        });

        console.log("검색 버튼::::::: ", response);

        const [{ result }] = response;

        srchGoodsId.innerHTML = "";

        result?.rsrvtGoodsList?.forEach(
          ({ goodsClsscCd, goodsClsscNm, goodsId, goodsNm }) => {
            const option = document.createElement("option");
            option.textContent = `[${goodsClsscNm}] ${goodsNm}`;
            option.value = goodsId;
            srchGoodsId.appendChild(option);
          }
        );
        return;

        console.log(result);

        // 예약 약관
        // dispRuleInfo(injectionResults[0].result?.usRgltnVO);
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          args: [result.usRgltnVO],
          func: dispRuleInfo,
        });

        // 위약금 정책
        // dispPnltyRfndmPolcy(injectionResults[0].result?.pnltyRfndmPolcyList);
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          args: [result.pnltyRfndmPolcyList],
          func: dispPnltyRfndmPolcy,
        });
        /*
        chrome.scripting
          .executeScript({
            target: { tabId: tabs[0].id },
            args: [insttId, upperGoodsClsscCd, goodsClsscCd],
            func: searchButtonHandler,
          })
          .then((injectionResults) => {
            srchGoodsId.innerHTML = "";

            injectionResults[0].result?.rsrvtGoodsList?.forEach(
              ({ goodsClsscCd, goodsClsscNm, goodsId, goodsNm }) => {
                const option = document.createElement("option");
                option.textContent = `[${goodsClsscNm}] ${goodsNm}`;
                option.value = goodsId;
                srchGoodsId.appendChild(option);
              }
            );

            // 예약 약관
            dispRuleInfo(injectionResults[0].result?.usRgltnVO);

            // 위약금 정책
            dispPnltyRfndmPolcy(
              injectionResults[0].result?.pnltyRfndmPolcyList
            );
          });
          */
      });
    }
  });

  // 날자 계산

  const toDay = new Date();
  const thisYear = toDay.getFullYear();
  const thisMonth = toDay.getMonth();
  const thisDate = toDay.getDate();
  const thisDay = toDay.getDay();

  const startWeekDate = thisDate - thisDay + RENTTARGETDAY;

  const thisMonthWeek = Math.floor(startWeekDate / 7) + 1;
  let temp = 0;
  let nextMonthStartDate = new Date(thisYear, thisMonth + 1, temp++);
  while (nextMonthStartDate.getDay() !== RENTTARGETDAY && temp < 32)
    nextMonthStartDate = new Date(thisYear, thisMonth + 1, temp++);

  const nextRentStartIndex =
    nextMonthStartDate.getDate() + (thisMonthWeek - 1) * 7;
  const nextRentEndIndex = nextMonthStartDate.getDate() + thisMonthWeek * 7 - 1;
  const sourceRentIndex = nextRentStartIndex - 1;

  const rentStart = new Date(thisYear, thisMonth + 1, nextRentStartIndex);
  const rentEnd = new Date(thisYear, thisMonth + 1, nextRentEndIndex);

  srchDate.max = `${rentEnd.getFullYear()}-${String(
    rentEnd.getMonth() + 1
  ).padStart(2, "0")}-${String(rentEnd.getDate()).padStart(2, "0")}`;
  srchDate.min = `${rentStart.getFullYear()}-${String(
    rentStart.getMonth() + 1
  ).padStart(2, "0")}-${String(rentStart.getDate()).padStart(2, "0")}`;
  srchDate.value = `${rentStart.getFullYear()}-${String(
    rentStart.getMonth() + 1
  ).padStart(2, "0")}-${String(rentStart.getDate()).padStart(2, "0")}`;

  // 예약 페이지 이동
  const rent = document.getElementById("rent");
  rent.addEventListener("click", (e) => {
    const a = srchGoodsId.value; // 시설
    const b = srchInstt.value; // 휴향림
    const c = srchDate.value.replaceAll("-", ""); // 날짜
    const d = "1"; // 박 수

    chrome.tabs.query(CHROMETABQUERY, async (tabs) => {
      response = await chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        args: [a, b, c, d],
        func: rentButtonHandler,
      });
      console.log("예약 버튼", response);
      const [{ result }] = response;
      if (result) {
        // 예약 페이지
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          args: [result],
          func: renderRentPage,
        });
      }
    });
  });
});
