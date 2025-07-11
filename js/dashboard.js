// dashboard.js
const name = localStorage.getItem("knightName");
const code = localStorage.getItem("knightCode");

// If either is missing, redirect to login page
if (!name || !code) {
  window.location.href = "index.html";
}

function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-GB', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  document.getElementById('time').textContent = timeString;
}
setInterval(updateTime, 1000);
updateTime();
