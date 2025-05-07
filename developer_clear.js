(() => {
  console.log("개발자 모드 해제");
  window.removeEventListener("onresize", detectDevTool);
  window.removeEventListener("onmousemove", detectDevTool);
  window.removeEventListener("onfocus", detectDevTool);
  window.removeEventListener("onblur", detectDevTool);
  window.removeEventListener("load", detectDevTool);
  window.removeEventListener("resize", detectDevTool);
  window.removeEventListener("mousemove", detectDevTool);
  window.removeEventListener("focus", detectDevTool);
  window.removeEventListener("blur", detectDevTool);
})();
