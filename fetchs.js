async function changeSidoHandler(value) {
  const response = await fetch(
    "https://www.foresttrip.go.kr/rep/or/selectInsttListForMonthRsrvt.do",
    {
      method: "POST",
      body: JSON.stringify({
        srchSido: value, // 지역 정보
      }),
      headers: {
        "X-CSRF-TOKEN": document.getElementsByName("_csrf")[0].value,
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json, text/javascript, */*; q=0.01",
        "X-Requested-With": "XMLHttpRequest",
      },
    }
  );
  if (response.ok) {
    const result = await response.json();
    return result;
  }
  return null;
}

async function changeInsttHandler(value) {
  const response = await fetch(
    "https://www.foresttrip.go.kr/rep/or/selectSthngListForMonthRsrvt.do",
    {
      method: "POST",
      body: JSON.stringify({
        insttId: value, // 숙박 시설
      }),
      headers: {
        "X-CSRF-TOKEN": document.getElementsByName("_csrf")[0].value,
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json, text/javascript, */*; q=0.01",
        "X-Requested-With": "XMLHttpRequest",
        "X-Ajax-call": true,
      },
    }
  );
  if (response.ok) {
    const result = await response.json();
    return result;
  }
  return null;
}

async function changeForestHandler(insttId, upperGoodsClsscCd) {
  const response = await fetch(
    "https://www.foresttrip.go.kr/rep/or/selectSthngDtlListForMonthRsrvt.do",
    {
      method: "POST",
      body: JSON.stringify({
        insttId, // 숙박시설
        upperGoodsClsscCd, // 숙박 형태1
      }),
      headers: {
        "X-CSRF-TOKEN": document.getElementsByName("_csrf")[0].value,
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json, text/javascript, */*; q=0.01",
        "X-Requested-With": "XMLHttpRequest",
        "X-Ajax-call": true,
      },
    }
  );
  if (response.ok) {
    const result = await response.json();
    return result;
  }
  return null;
}

async function searchButtonHandler(insttId, upperGoodsClsscCd, goodsClsscCd) {
  console.log("searchButtonHandler::::fffff ");

  // const response = await fetch(
  //   "https://www.foresttrip.go.kr/rep/or/sssn/selectRsrvtGoodsListForMonthRsrvt.do",
  //   {
  //     method: "POST",
  //     body: JSON.stringify({
  //       insttId, // 숙박시설
  //       upperGoodsClsscCd, // 숙박 형태1
  //       inqurSctin: "01",
  //       goodsClsscCd, // 숙박 형태2
  //     }),
  //     headers: {
  //       "X-CSRF-TOKEN": document.getElementsByName("_csrf")[0].value,
  //       "Content-Type": "application/json; charset=UTF-8",
  //       Accept: "application/json, text/javascript, */*; q=0.01",
  //       "X-Requested-With": "XMLHttpRequest",
  //       "X-Ajax-call": true,
  //     },
  //   }
  // );
  // if (response.ok) {
  //   const result = await response.json();
  //   return result;
  // }
  return null;
}

async function rentButtonHandler(
  srchGoodsId,
  srchInsttId,
  srchRsrvtBgDt,
  srchSthngCnt
) {
  const response = await fetch(
    "https://www.foresttrip.go.kr/rep/or/innerFcfsRsrvtPssblGoodsDtl.do",
    {
      method: "POST",
      body: JSON.stringify({
        srchGoodsId,
        srchInsttId,
        srchRsrvtBgDt,
        srchSthngCnt,
      }),
      headers: {
        "X-CSRF-TOKEN": document.getElementsByName("_csrf")[0].value,
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json, text/javascript, */*; q=0.01",
        "X-Requested-With": "XMLHttpRequest",
        "X-Ajax-call": true,
      },
    }
  );
  if (response.ok) {
    const result = await response.json();
    return result;
  }
  return null;
}
