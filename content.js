var scriptText = `
function addRentBtn() {
    var tbody = document.getElementById("dayListTbody");
    var trs = tbody.children;
    var classNm = "";
    if (monthRsrvtStatus.inqurSctin == '01') {
        classNm = "apt_mark";
    } else {
        classNm = "apt_mark_2";
    }

    function checkRentableDate(srchLastDay, useDt) {
        var day1 = new Date(+srchLastDay.substring(0, 4),(+srchLastDay.substring(4, 6) - 1),+srchLastDay.substring(6, 8));
        var day2 = new Date(+useDt.substring(0, 4),(+useDt.substring(4, 6) - 1),+useDt.substring(6, 8));
        var day3 = new Date(+srchLastDay.substring(0, 4),(+srchLastDay.substring(4, 6) - 1),(+srchLastDay.substring(6, 8) + 7));
        // console.log(srchLastDay, " => ", day1, " ====== ", useDt, " => ", day2, " +++++++++  ", day3);
        return day1.getTime() < day2.getTime() && day2.getTime() <= day3.getTime();
    }

    monthRsrvtStatus.goodsList.forEach((goods,index)=>{
        var tr = trs[index];
        var tds = tr.children;
        goods.forEach((good,index)=>{
            var useDt = good.useDt;
            var goodsTd = tds[index];

            if (checkRentableDate(monthRsrvtStatus.srchLastDay, useDt)) {
                if (monthRsrvtStatus.chkHldt(good.useDt)) {
                    var dataStr = good.goodsNm + ' ' + good.useDt.substring(0, 4) + '.' + good.useDt.substring(4, 6) + '.' + good.useDt.substring(6, 8);

                    if (good.rsrvtCnt > 0) {
                        if (good.wtngPssblYn == 'Y' && good.wtngCnt < good.goodsMxmmWtngCnt) {

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

                            a.addEventListener("click", function() {

                                var wtngPssblYn = monthRsrvtStatus.selectGoodsWtngPssblYn(good.insttId, good.goodsId, good.useDt);
                                if (!wtngPssblYn) {
                                    return false;
                                }
                                return runParse('/rep/or/popupMonthRsrvtSelect.do?goodsId=' + good.goodsId + '&useDt=' + good.useDt + '&rsrvtWtngSctin=02', '.layer_wrap', [openLayer], this);
                            });

                            a.appendChild(span);

                            goodsTd.appendChild(a);

                        } else {
                            //goodsTd.append('<a href="#payment_1"><span class="' + classNm + ' m_3" title="' + dataStr + '">완</span></a>');

                            var a = document.createElement("a");
                            a.href = "#payment_1";

                            var span = document.createElement("span");
                            span.className = classNm + " m_3";
                            span.title = dataStr;
                            span.textContent = "완";

                            a.appendChild(span);

                            goodsTd.appendChild(a);
                        }
                    } else {

                        var a = document.createElement("a");
                        a.className = "rsrvtSelectBtn";
                        a.dataset.no = good.goodsId;
                        a.dataset.no1 = good.useDt;
                        a.rsrvtWtngSctin = "01";
                        a.href = "#payment_1";

                        var span = document.createElement("span");
                        span.className = classNm + " m_1";
                        span.title = dataStr;
                        span.textContent = "예";

                        a.addEventListener("click", function() {

                            var rsrvtPssblYn = monthRsrvtStatus.selectGoodsRsrvtPssblListYn(good.insttId, good.goodsId, good.useDt, 1);
                            if (!rsrvtPssblYn) {
                                return false;
                            }
                            ;return runParse('/rep/or/popupMonthRsrvtSelect.do?goodsId=' + good.goodsId + '&useDt=' + good.useDt + '&rsrvtWtngSctin=01', '.layer_wrap', [openLayer], this);
                        })

                        a.appendChild(span);

                        goodsTd.appendChild(a);
                    }
                } else {
                    var a = document.createElement("a");
                    a.href = "#payment_1";

                    var span = document.createElement("span");
                    span.className = classNm + " m_5";
                    span.title = dataStr;
                    span.textContent = "휴";

                    a.appendChild(span);

                    goodsTd.appendChild(a);
                }
            } else {
                return false;
            }
        }
        );
    }
    );

}

`;

if (!document.getElementById("addBtnScript") && false) {
  var script = document.createElement("script");
  //script.textContent = scriptText;
  script.type = "text/javascript";
  script.innerHTML = scriptText;
  script.id = "addBtnScript";
  //   script.nonce = "2726c7f26c";

  console.log(document.querySelector("body"));

  var h1 = document.createElement("h1");
  h1.textContent = "TEST";

  document.getElementById("container").appendChild(script);

  // document.querySelector("body").appendChild(script);
}

export function addRentBtn() {
  var tbody = document.getElementById("dayListTbody");
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
    // console.log(srchLastDay, " => ", day1, " ====== ", useDt, " => ", day2, " +++++++++  ", day3);
    return day1.getTime() < day2.getTime() && day2.getTime() <= day3.getTime();
  }

  monthRsrvtStatus.goodsList.forEach((goods, index) => {
    var tr = trs[index];
    var tds = tr.children;
    goods.forEach((good, index) => {
      var useDt = good.useDt;
      var goodsTd = tds[index];

      if (checkRentableDate(monthRsrvtStatus.srchLastDay, useDt)) {
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

              a.addEventListener("click", function () {
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

              goodsTd.appendChild(a);
            } else {
              //goodsTd.append('<a href="#payment_1"><span class="' + classNm + ' m_3" title="' + dataStr + '">완</span></a>');

              var a = document.createElement("a");
              a.href = "#payment_1";

              var span = document.createElement("span");
              span.className = classNm + " m_3";
              span.title = dataStr;
              span.textContent = "완";

              a.appendChild(span);

              goodsTd.appendChild(a);
            }
          } else {
            var a = document.createElement("a");
            a.className = "rsrvtSelectBtn";
            a.dataset.no = good.goodsId;
            a.dataset.no1 = good.useDt;
            a.rsrvtWtngSctin = "01";
            a.href = "#payment_1";

            var span = document.createElement("span");
            span.className = classNm + " m_1";
            span.title = dataStr;
            span.textContent = "예";

            a.addEventListener("click", function () {
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

            goodsTd.appendChild(a);
          }
        } else {
          var a = document.createElement("a");
          a.href = "#payment_1";

          var span = document.createElement("span");
          span.className = classNm + " m_5";
          span.title = dataStr;
          span.textContent = "휴";

          a.appendChild(span);

          goodsTd.appendChild(a);
        }
      } else {
        return false;
      }
    });
  });
}
