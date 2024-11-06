// clickLogger.js
console.log("log.js file loaded successfully");

document.addEventListener("click", function (event) {
  // 클릭한 요소의 정보를 객체로 생성
  const logData = {
    tag: event.target.tagName,
    id: event.target.id,
    className: event.target.className,
    textContent: event.target.textContent.trim(),
    timestamp: new Date().toISOString(),
  };

  // console.log("User clicked on element:", logData);

  // 서버로 클릭 정보를 전송
  fetch("http://localhost:3000/log", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(logData),
  }).catch((error) => console.error("Error logging click:", error));
});
