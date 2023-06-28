브라우저의 객체에 접근하기 위해서는 background 방식을 사용해야 할듯.

참조: https://stackoverflow.com/questions/13546778/how-to-communicate-between-popup-js-and-background-js-in-chrome-extension

---

global 변수에 접근을 할 수가 없다.
추가하는 함수를 만들어
스크립트에 넣고 해당 스크립트를 실행하는 방법 으로.
====> content 가 원본 페이지에 추가되기에는 CSP 에러 발생...
====> 페이지 embed 방식도 고려해야 할듯..

---

====> 최초 실행 시 예약 버튼 활성화...
두 번째 이후에는 inject_start.js 가 실행이 되지 않는다..
처음 최소 실행 시 버튼은 만들어 이벤트를 하는 방법도 생각...

---

최후의 방법으로는 스크립트 조각에 넣고 실행하는 방법.
