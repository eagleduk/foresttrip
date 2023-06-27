// 예약 페이지
function renderRentPage(data) {
  function fn_date_format(yyyymmdd, format) {
    return (
      yyyymmdd.substring(0, 4) +
      format +
      yyyymmdd.substring(4, 6) +
      format +
      yyyymmdd.substring(6, 8)
    );
  }

  //콤마표시
  function commify(n) {
    var reg = /(^[+-]?\d+)(\d{3})/; // 정규식
    n += ""; // 숫자를 문자열로 변환
    while (reg.test(n)) n = n.replace(reg, "$1" + "," + "$2");
    return n;
  }

  function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ",");
  }

  var prefixCdn = "https://image.foresttrip.go.kr/";

  //monthRsrvtStatus.bfrRsrvtDtlVO = data;
  const rsrvtGoodsInfo = document.getElementById("rsrvtGoodsInfo");
  if (!rsrvtGoodsInfo) {
    alert("월별현황조회 페이지에서 수행해 주세요");
  }
  rsrvtGoodsInfo.innerHTML = "";

  var html = '<div class="stay_ti">';

  html += "</div>";

  html += '<div class="stay_info">';
  html +=
    '<div class="st_img"><img src=' +
    prefixCdn +
    data.attchFileId +
    ' alt="' +
    data.goodsNm +
    "\" onerror=\"this.src = '/images/common/no_img.gif'; this.alt = '표시할 이미지 없습니다'; \"></div>";
  html += '<div class="st_con">';
  html += "<ul>";
  html +=
    '<li><div class="st_tit">자연휴양림</div><span class="st_txt">' +
    data.insttNm +
    "</span></li>";
  /*
      html += '<li><div class="st_tit">이용시간</div><span class="st_txt">[숙박시설] 당일 ' + data.entTime.substring(0,2) + ':' + data.entTime.substring(2,4) + ' ~ 익일 ' + data.outTime.substring(0,2) + ':' + data.outTime.substring(2,4) + '</span></li>';
      */
  html +=
    '<li><span class="st_tit">시설</span><span class="st_txt">' +
    data.goodsNm +
    "(" +
    data.area +
    ") 기준:" +
    data.mnmmAccptCnt +
    "인 최대:" +
    data.mxmmAccptCnt +
    "인</span>";
  if (data.upperGoodsClsscCd == "02" && data.cmpngDailyRsrvtYn == "Y") {
    html +=
      '<li><span class="st_tit">숙박기간</span><span class="st_txt">' +
      fn_date_format(data.rsrvtBgDt, ".") +
      " (" +
      data.sthngQnt +
      "일)</span></li>";
  } else {
    html +=
      '<li><span class="st_tit">숙박기간</span><span class="st_txt">' +
      fn_date_format(data.rsrvtBgDt, ".") +
      " ~ " +
      fn_date_format(data.rsrvtEdDt, ".") +
      " (" +
      data.sthngQnt +
      "박" +
      data.dayQnt +
      "일)</span></li>";
  }

  if (data.cvncFcl != "N") {
    html +=
      '<li><span class="st_tit">편의시설</span><span class="st_txt">' +
      data.cvncFcl +
      "</span></li>";
  }

  if (data.prkngAmtFreeStng != "N" || data.prkngAmtFreeCamp != "N") {
    html += '<li><span class="st_tit">주차료</span>';

    if (data.prkngAmtFreeStng != "N") {
      html +=
        '<span class="st_txt">숙박 : 4인실당 ' +
        data.prkngAmtFreeStng +
        "대 무료<br/></span>";
    } else if (data.prkngAmtFreeCamp != "N") {
      html +=
        '<span class="st_txt">캠프 : 1데크당 ' +
        data.prkngAmtFreeCamp +
        "대 무료<br/></span>";
    }

    html += "</li>";
  }
  if (data.cmdogYn == "Y") {
    html +=
      '<p class="important"><span class="red">※ 최근 1년이내에 광견병 예방 접종하신 증빙자료를 지참하시기 바랍니다.(입장시 매표소 확인)</span></p>';
  }

  html += "</ul>";
  html += "</div>";
  html += "</div>";

  if (data.insttTpCd == "04") {
    html +=
      '<div class="agree_wrap care_ful02" id="insttTpCd04" style="display:none;">※ 본 자연휴양림은 민간에서 운영하는 자연휴양림으로, 국&middot;공립 자연휴양림과 운영정책 및 시설 등이 차이가 있을 수 있습니다.\n\n</div>';
  }

  rsrvtGoodsInfo.innerHTML = html;

  document.getElementById("rsrvtDetailInfo").innerHTML = "";

  var html = "";
  html += "<strong>예약선택</strong>";
  html += '<div class="money_wrap mb_40">';
  html += "    <ul>";
  if (data.upperGoodsClsscCd == "02" && data.cmpngDailyRsrvtYn == "Y") {
    html +=
      "        <li><b>이용일</b>" +
      fn_date_format(data.rsrvtBgDt, ".") +
      "(" +
      data.sthngQnt +
      "일)</li>";
  } else {
    html +=
      "        <li><b>이용일</b>" +
      fn_date_format(data.rsrvtBgDt, ".") +
      "~" +
      fn_date_format(data.rsrvtEdDt, ".") +
      "(" +
      data.sthngQnt +
      "박" +
      data.dayQnt +
      "일)</li>";
  }
  html += "        <li><b>기준인원</b>" + data.mnmmAccptCnt + "명</li>";
  if (data.upperGoodsClsscCd == "02" && data.cmpngDailyRsrvtYn == "Y") {
    html +=
      "        <li><b>시설</b>" +
      data.goodsNm +
      "," +
      data.mnmmAccptCnt +
      "인(" +
      data.area +
      ")</li>";
  } else {
    html +=
      "        <li><b>시설</b>" +
      data.goodsNm +
      "," +
      data.mnmmAccptCnt +
      "인실(" +
      data.area +
      ")</li>";
  }
  html += "    </ul>";
  html += "</div>";
  html += "<strong>예약금액</strong>";
  html += '<div class="result_total">';
  var listGoodsUnprcList = data.listGoodsUnprc;
  if (listGoodsUnprcList.length > 0) {
    listGoodsUnprcList.forEach(function (item, idx, arr) {
      html += '    <div class="days_ch">';
      html +=
        '        <span class="d_left">' +
        fn_date_format(item.rsrvtDate, ".") +
        "(" +
        item.ssnTpnm +
        "/" +
        item.dtTpnm +
        ")</span>";
      html +=
        '        <span class="d_right">' +
        commify(item.goodsUnprc) +
        "원</span>";
      html += "    </div>";
    });
  }
  html += "</div>";
  html += '<div class="total">';
  html += '    <span class="all_t">합계</span>';
  html += '    <span class="mn_num">' + commify(data.sumGoodsUnprc) + "</span>";
  html += "</div>";

  if (data.addtnNofpr == "Y" && data.upperGoodsClsscCd == "01") {
    html +=
      '<p class="care_ful02">※ 정원 초과시 1인당 아래의 추가 요금 발생</p>';
    html += '<div id="addNofprUnprc" class="result_total">';
    listGoodsUnprcList.forEach(function (item, idx, arr) {
      html += '<div class="days_ch">';
      html +=
        '    <span class="d_left">' +
        fn_date_format(item.rsrvtDate, ".") +
        "(" +
        item.ssnTpnm +
        " / " +
        item.dtTpnm +
        ")</span>";
      html +=
        '    <span class="d_right">' +
        addComma(item.addNofprUnprc) +
        "원</span>";
      html += "</div>";
    });
    html += "</div>";
  }

  // 이벤트 상품여부 표시
  if (data.eventGoodsYn == "Y") {
    html += '<div id="eventGoodsYn">';
    html += '    <p class="care_ful02">';
    html +=
      "        ※할인 전 1박 평일 금액 : " +
      commify(data.bfrGoodsUnprc) +
      " 원<br>";
    html += "        ※장애인·다자녀 가구 중복할인 불가<br>";
    html += "        ※할인금액 결제 후 장애인·다자녀 가구 차액금액은<br>";
    html += "        &nbsp;&nbsp;&nbsp;&nbsp;현장에서 부분취소 처리함";
    html += "    </p>";
    html += "</div>";
  }

  document.getElementById("rsrvtDetailInfo").innerHTML = html;
  document.getElementById("dataTarget").style.display = "block";

  // 반려견 약관 DISPLAY 여부 판단
  if (document.getElementById("cmDog")) {
    if (data.cmdogYn == "Y") {
      document.getElementById("cmDog").style.display = "block";
      document.getElementById("cmDogRgNo").style.display = "block";
      document.getElementById("cmdogOneRgno").setAttribute("lang", "required");
      document
        .getElementById("cmdogOneOwnerBirth")
        .setAttribute("lang", "required");
      document
        .getElementById("cmdogOneOwnerNm")
        .setAttribute("lang", "required");
      document.getElementById("cmdog1Age").setAttribute("lang", "required");
      document.getElementById("cmdog1Weght").setAttribute("lang", "required");
      document
        .getElementById("cmdog1PrvnnIncltDt")
        .setAttribute("lang", "required");
    } else {
      document.getElementById("cmDog").style.display = "none";
      document.getElementById("cmDogRgNo").style.display = "none";
      document.getElementById("cmdogOneRgno").removeAttribute("lang");
      document.getElementById("cmdogOneOwnerBirth").removeAttribute("lang");
      document.getElementById("cmdogOneOwnerNm").removeAttribute("lang");
      document.getElementById("cmdog1Age").removeAttribute("lang");
      document.getElementById("cmdog1Weght").removeAttribute("lang");
      document.getElementById("cmdog1PrvnnIncltDt").removeAttribute("lang");
    }
  } else {
    document.getElementById("cmdogOneRgno").removeAttribute("lang");
    document.getElementById("cmdogOneOwnerBirth").removeAttribute("lang");
    document.getElementById("cmdogOneOwnerNm").removeAttribute("lang");
    document.getElementById("cmdog1Age").removeAttribute("lang");
    document.getElementById("cmdog1Weght").removeAttribute("lang");
    document.getElementById("cmdog1PrvnnIncltDt").removeAttribute("lang");
  }
  document.getElementById("cmdogOneRgno").value = "";
  document.getElementById("cmdogOneOwnerBirth").value = "";
  document.getElementById("cmdogOneOwnerNm").value = "";
  document.getElementById("cmdogSpcs1Nm").value = "";
  document.getElementById("cmdog1Age").value = "";
  document.getElementById("cmdog1Weght").value = "";
  document.getElementById("cmdog1PrvnnIncltDt").value = "";
  document.getElementById("cmdogTwoRgno").value = "";
  document.getElementById("cmdogTwoOwnerBirth").value = "";
  document.getElementById("cmdogTwoOwnerNm").value = "";
  document.getElementById("cmdogSpcs2Nm").value = "";
  document.getElementById("cmdog2Age").value = "";
  document.getElementById("cmdog2Weght").value = "";
  document.getElementById("cmdog2PrvnnIncltDt").value = "";

  // $("html, body")
  //   .stop()
  //   .animate({ scrollTop: $("#dataTarget").offset().top - 150 });
}

// 예약 약관
function dispRuleInfo(usRgltnVO) {
  $divRsrvtInfo = document.getElementById("divRsrvtInfo");
  $divRsrvtInfo.querySelector(".member_agree_with")?.remove();
  $divRsrvtInfo.querySelector(".agree_wrap")?.remove();
  $divRsrvtInfo.querySelector(".agree_btc")?.remove();

  if (usRgltnVO != undefined && usRgltnVO.length > 0) {
    usRgltnVO.forEach((item, index) => {
      switch (item.rgltnId) {
        case 1:
          const div1 = document.createElement("div");
          div1.id = "cmDog";
          div1.className = "member_agree_with mr_top";
          if (index == 0) {
            div1.innerHTML =
              '<div class="agree_wrap basic type02 fold_list"><div class="more_ti"><strong class="agree_tit">' +
              item.rgltnSubjc +
              '</strong><a href="#" class="more close"><span class="hide">더보기</span></a></div>' +
              '<div class="agree_txt"><strong class="txt_tit">' +
              item.rgltnSubjc +
              "</strong><p>" +
              item.rgltnCont +
              "</p></div></div>";
          } else {
            div1.style.display = "none";
            div1.innerHTML =
              '<div class="agree_wrap basic type02 fold_list"><div class="more_ti"><strong class="agree_tit">' +
              item.rgltnSubjc +
              '</strong><a href="#" class="more close"><span class="hide">더보기</span></a></div>' +
              '<div class="agree_txt"><strong class="txt_tit">' +
              item.rgltnSubjc +
              "</strong><p>" +
              item.rgltnCont +
              "</p></div></div>";
          }
          $divRsrvtInfo.append(div1);

          break;

        default:
          const div2 = document.createElement("div");
          if (index == 0) {
            div2.className = "member_agree_with mr_top";
            div2.innerHTML =
              '<div class="agree_wrap basic type02 fold_list"><div class="more_ti"><strong class="agree_tit">' +
              item.rgltnSubjc +
              '</strong><a href="#" class="more close"><span class="hide">더보기</span></a></div>' +
              '<div class="agree_txt"><strong class="txt_tit">' +
              item.rgltnSubjc +
              "</strong><p>" +
              item.rgltnCont +
              "</p></div></div>";
          } else {
            div2.className = "agree_wrap basic fold_list";
            div2.innerHTML =
              '<div class="more_ti"><strong class="agree_tit">' +
              item.rgltnSubjc +
              '</strong><a href="#" class="more close"><span class="hide">더보기</span></a></div>' +
              '<div class="agree_txt"><strong class="txt_tit">' +
              item.rgltnSubjc +
              "</strong><p>" +
              item.rgltnCont +
              "</p></div>";
          }

          $divRsrvtInfo.append(div2);

          break;
      }
    });
  }
}

// 위약금 정책
function dispPnltyRfndmPolcy(pnltyRfndmPolcyList) {
  if (pnltyRfndmPolcyList == null) {
    return false;
  }

  let pnlyHtml = "";
  pnlyHtml += '<div class="agree_wrap basic fold_list">';
  pnlyHtml += '<div class="more_ti">';
  pnlyHtml += '<strong class="agree_tit">위약금 정책</strong>';
  pnlyHtml +=
    '<a href="#" class="more close"><span class="hide">더보기</span></a>';
  pnlyHtml += "</div>";
  pnlyHtml += '<div class="agree_txt">';
  pnlyHtml += '<table class="tbl sm_bt">';
  pnlyHtml += "<caption>";
  pnlyHtml += "<strong>위약금 정책 안내입니다.</strong>";
  pnlyHtml += "</caption>";
  pnlyHtml += "<colgroup>";
  pnlyHtml += '<col style="width:144px;">';
  pnlyHtml += "<col>";
  pnlyHtml += "<col>";
  pnlyHtml += "<col>";
  pnlyHtml += " <col>";
  pnlyHtml += "</colgroup>";
  pnlyHtml += " <thead>";
  pnlyHtml += "  <tr>";
  pnlyHtml += '    <th scope="col" rowspan="2">위약금규정일수</th>';
  pnlyHtml += '    <th scope="col" colspan="2">성수기</th>';
  pnlyHtml += '    <th scope="col" colspan="2">비수기</th>';
  pnlyHtml += " </tr>";
  pnlyHtml += "  <tr>";
  pnlyHtml += '   <th scope="col">평일</th>';
  pnlyHtml += '   <th scope="col">주말</th>';
  pnlyHtml += '    <th scope="col">평일</th>';
  pnlyHtml += '     <th scope="col">주말</th>';
  pnlyHtml += "  </tr>";
  pnlyHtml += "   </thead>";
  pnlyHtml += "  <tbody>";

  pnltyRfndmPolcyList.forEach(({ pnltyRfndmRgltnDcnt, hd, hw, ld, lw }) => {
    pnlyHtml += "<tr>";
    pnlyHtml += "<td>" + pnltyRfndmRgltnDcnt + "</td>";
    pnlyHtml += "<td>" + hd + "</td>";
    pnlyHtml += "<td>" + hw + "</td>";
    pnlyHtml += "<td>" + ld + "</td>";
    pnlyHtml += "<td>" + lw + "</td>";
    pnlyHtml += "</tr>";
  });

  pnlyHtml += "</tbody>";
  pnlyHtml += "</table>";
  pnlyHtml += "</div>";
  pnlyHtml += "</div>";

  document.getElementById("divRsrvtInfo").innerHTML = pnlyHtml;
}
