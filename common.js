/*

개발자 모드 해제

window.removeEventListener('onresize', detectDevTool);
window.removeEventListener('onmousemove', detectDevTool);
window.removeEventListener('onfocus', detectDevTool);
window.removeEventListener('onblur', detectDevTool);
window.removeEventListener('load', detectDevTool);
window.removeEventListener('resize', detectDevTool);
window.removeEventListener('mousemove', detectDevTool);
window.removeEventListener('focus', detectDevTool);
window.removeEventListener('blur', detectDevTool);

*/

/*

데이터 검색

var paramObj = {};
paramObj.insttId = goodsInfo.insttId;  => monthRsrvtStatus.rsrvtGoodsList[0].insttId
paramObj.upperGoodsClsscCd = goodsInfo.upperGoodsClsscCd;  => monthRsrvtStatus.rsrvtGoodsList[0].upperGoodsClsscCd
paramObj.goodsIdList = goodsIdList;  => monthRsrvtStatus.rsrvtGoodsList
paramObj.srchDate = monthRsrvtStatus.srchDate;  => monthRsrvtStatus.srchDate
paramObj.lastDay = monthRsrvtStatus.srchLastDay;  => monthRsrvtStatus.srchLastDay
paramObj.inqurSctin = monthRsrvtStatus.inqurSctin;  => monthRsrvtStatus.inqurSctin

{
	"goodsIdList": [
		"GID020301040100201002001000024",
		"GID020301040100201002001000025",
		"GID020301040100201002001000026"
	],
	"inqurSctin": "01",
	"insttId": "ID02030104",
	"lastDay": "20250624",
	"srchDate": "202506",
	"upperGoodsClsscCd": "01"
}

 url: "/rep/or/selectRsrvtAvailInfoListForMonthRsrvt.do",
type:'post',
dataType:'json',
data: JSON.stringify(paramObj),

*/

/* 분석 결과

monthRsrvtStatus
  - dispGoodsTr: 예약 버튼 그리는 함수
  - goodsList: 검색 결과에 따른 예약 정보 
      {
          rsrvtAvail: "BEFORE_DATE" | "Y" | "OVER_DATE" 등 있다. => 예약 버튼 나오게 하는듯, 예약 가능, 이미예약 등 정보는 다른곳에 있는듯
      }

데이터는 가져오는데 
rsrvtAvail 값이	"OVER_DATE" 인 경우가 있다.

또한 monthRsrvtStatus.hldtInfoList	에 휴관일이 있는 듯하다.

*/

/*

/selectInsttListForMonthRsrvt.do => 시/도 선택 시 이벤트
/selectSthngListForMonthRsrvt.do => 휴양림 선택 시 이벤트
/selectSthngDtlListForMonthRsrvt.do => 숙박시설 1 선택 시 이벤트
/selectRsrvtGoodsListForMonthRsrvt.do => 검색 버튼 시 이벤트1 [휴양림 기본 정보 가져옴]
/selectRsrvtAvailInfoListForMonthRsrvt.do => 검색 버튼 시 이벤트2 [시설 예약 정보 가져옴]


*/

/*

시설 예약 주기?
monthRsrvtStatus.data.rsrvtPolcy.rsrvtCycleTpeCd = "WEEK" | "MON"

인천/경기
  - 청평자연휴양림 "MON", 20250731
  - 용인자연휴양림 "MON", 20250531
  - 강씨봉자연휴양림 "MON", 20250630
  - 유명산자연휴양림 "WEEK", 20250610
  - 양평 백운봉 자연휴양림 "WEEK", 20250527

예약가능기간 + rsrvtCycleTpeCd 주기 해서 예약 버튼 그리기
  : 휴관일 monthRsrvtStatus.hldtInfoList 에서 파악 가능
  : 공사중, 추첨예약, 우선예약, 예약및대기완료, 대기 는 구분 가능할까?

*/

function addRentBtn() {
  var tbody = document.getElementById("dayListTbody");
  if (!tbody) {
    alert("숙박시설 검색 후 실행해 주세요.");
  }
  var trs = tbody.children;
  var classNm = "";
  if (monthRsrvtStatus.inqurSctin == "01") {
    classNm = "apt_mark";
  } else {
    classNm = "apt_mark_2";
  }

  function checkRentableDate(srchLastDay, useDt) {
    var day1 = new Date(
      +srchLastDay.substring(0, 4),
      +srchLastDay.substring(4, 6) - 1,
      +srchLastDay.substring(6, 8)
    );
    var day2 = new Date(
      +useDt.substring(0, 4),
      +useDt.substring(4, 6) - 1,
      +useDt.substring(6, 8)
    );
    var day3 = new Date(
      +srchLastDay.substring(0, 4),
      +srchLastDay.substring(4, 6) - 1,
      +srchLastDay.substring(6, 8) + 7
    );

    return day1.getTime() < day2.getTime() && day2.getTime() <= day3.getTime();
  }

  monthRsrvtStatus.goodsList.forEach((goods, index) => {
    var tr = trs[index];
    var tds = tr.children;

    goods.forEach((good, index) => {
      var useDt = good.useDt;
      var goodsTd = tds[index];

      if (goodsTd && checkRentableDate(monthRsrvtStatus.srchLastDay, useDt)) {
        if (monthRsrvtStatus.chkHldt(good.useDt)) {
          var dataStr =
            good.goodsNm +
            " " +
            good.useDt.substring(0, 4) +
            "." +
            good.useDt.substring(4, 6) +
            "." +
            good.useDt.substring(6, 8);

          if (good.rsrvtCnt > 0) {
            if (
              good.wtngPssblYn == "Y" &&
              good.wtngCnt < good.goodsMxmmWtngCnt
            ) {
              var a = document.createElement("a");
              a.className = "rsrvtSelectBtn";
              a.dataset.no = good.goodsId;
              a.dataset.no1 = good.useDt;
              a.rsrvtWtngSctin = "02";
              a.href = "#payment_1";

              var span = document.createElement("span");
              span.className = classNm + " m_2";
              span.title = dataStr;
              span.textContent = "대" + (Number(good.wtngCnt) + 1);

              a.addEventListener("click", function (e) {
                e.preventDefault();
                var wtngPssblYn = monthRsrvtStatus.selectGoodsWtngPssblYn(
                  good.insttId,
                  good.goodsId,
                  good.useDt
                );
                if (!wtngPssblYn) {
                  return false;
                }
                return runParse(
                  "/rep/or/popupMonthRsrvtSelect.do?goodsId=" +
                    good.goodsId +
                    "&useDt=" +
                    good.useDt +
                    "&rsrvtWtngSctin=02",
                  ".layer_wrap",
                  [openLayer],
                  this
                );
              });

              a.appendChild(span);

              goodsTd.innerHTML = "";
              goodsTd.appendChild(a);
            } else {
              var a = document.createElement("a");
              a.href = "#payment_1";
              a.addEventListener("click", function (e) {
                e.preventDefault();
              });

              var span = document.createElement("span");
              span.className = classNm + " m_3";
              span.title = dataStr;
              span.textContent = "완";

              a.appendChild(span);

              goodsTd.innerHTML = "";
              goodsTd.appendChild(a);
            }
          } else {
            var a = document.createElement("a");
            a.className = "rsrvtSelectBtn";
            a.dataset.no = good.goodsId;
            a.dataset.no1 = good.useDt;
            a.rsrvtWtngSctin = "01";
            a.dataset.able = 1;
            a.href = "#payment_1";

            var span = document.createElement("span");
            span.className = classNm + " m_1";
            span.title = dataStr;
            span.textContent = "예";

            a.addEventListener("click", function (e) {
              e.preventDefault();

              function nextAbles(el) {
                var parentTD = el;
                var breaker = 0;
                while (
                  parentTD.tagName.toUpperCase() !== "TD" &&
                  breaker < 10
                ) {
                  parentTD = parentTD.parentElement;
                  breaker++;
                }

                var result = [];
                var nextTD = parentTD;
                for (var i = 0; i < 7; i++) {
                  if (!nextTD.nextSibling) break;
                  nextTD = nextTD.nextSibling;
                  if (
                    nextTD &&
                    nextTD.tagName.toUpperCase() === "TD" &&
                    nextTD.firstChild &&
                    nextTD.firstChild.tagName.toUpperCase() === "A"
                  ) {
                    var nextA = nextTD.firstChild;

                    if (nextA.dataset.able === undefined) {
                      result.push("0");
                    } else {
                      result.push("1");
                    }
                  }
                }
                return result.join(",");
              }

              var ables = nextAbles(e.currentTarget);

              var mxmmStngDayCntEl = document.getElementById("mxmmStngDayCnt");
              if (!mxmmStngDayCntEl)
                mxmmStngDayCntEl = document.createElement("input");

              mxmmStngDayCntEl.id = "mxmmStngDayCnt";
              mxmmStngDayCntEl.dataset.ables = ables;
              mxmmStngDayCntEl.dataset.lastday = monthRsrvtStatus.srchLastDay;
              mxmmStngDayCntEl.value = good.mxmmStngDayCnt;
              mxmmStngDayCntEl.type = "hidden";

              document.body.appendChild(mxmmStngDayCntEl);

              var rsrvtPssblYn = monthRsrvtStatus.selectGoodsRsrvtPssblListYn(
                good.insttId,
                good.goodsId,
                good.useDt,
                1
              );
              if (!rsrvtPssblYn) {
                return false;
              }
              return runParse(
                "/rep/or/popupMonthRsrvtSelect.do?goodsId=" +
                  good.goodsId +
                  "&useDt=" +
                  good.useDt +
                  "&rsrvtWtngSctin=01",
                ".layer_wrap",
                [openLayer],
                this
              );
            });

            a.appendChild(span);

            goodsTd.innerHTML = "";
            goodsTd.appendChild(a);
          }
        } else {
          var a = document.createElement("a");
          a.href = "#payment_1";
          a.addEventListener("click", function (e) {
            e.preventDefault();
          });

          var span = document.createElement("span");
          span.className = classNm + " m_5";
          span.title = dataStr;
          span.textContent = "휴";

          a.appendChild(span);

          goodsTd.innerHTML = "";
          goodsTd.appendChild(a);
        }
      } else {
        return false;
      }
    });
  });
}

function earlyBtnEventHandler(event) {
  var tbody = document.getElementById("dayListTbody");
  if (!tbody) {
    alert("숙박시설 검색 후 실행해 주세요.");
  }
}

function appendSearchButton() {
  const searchBtn = document.getElementById("searchBtn");

  if (searchBtn) {
    const searchContainer = searchBtn.parentElement;

    const earlyBtn = document.createElement("button");
    earlyBtn.type = "button";
    earlyBtn.className = "schBtn";
    earlyBtn.style.backgroundColor = "red";
    earlyBtn.id = "earlyBtn";
    earlyBtn.addEventListener("click", earlyBtnEventHandler);

    const img = document.createElement("img");
    img.src = "https://image.foresttrip.go.kr/images/content/icon_search.png";
    img.alt = "검색";

    earlyBtn.appendChild(img);

    if (!document.getElementById("earlyBtn")) {
      searchContainer.appendChild(earlyBtn);
    }
  }
}

export { appendSearchButton };
