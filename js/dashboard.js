// js/dashboard.js

// Live Clock
function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString('en-GB', { hour12: false });
  document.getElementById("clock").textContent = time;
}
setInterval(updateClock, 1000);
updateClock();

// Profile dropdown toggle
function toggleProfile() {
  const menu = document.getElementById("profileMenu");
  menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

// Knight Name from localStorage
const name = localStorage.getItem('knightName');
document.getElementById("knightNameDisplay").innerText = name ? name.toUpperCase() : "Knight";
