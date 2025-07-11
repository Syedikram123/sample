// 🔒 Secure Dashboard Access
const knightName = localStorage.getItem("knightName");
const knightCode = localStorage.getItem("knightCode");

const allowedKnights = {
  apexion: "175025",
  velox: "2275025",
  luminari: "1275025",
  kairos: "1175025",
  spectra: "1975025"
};

if (
  !knightName ||
  !knightCode ||
  !allowedKnights[knightName.toLowerCase()] ||
  allowedKnights[knightName.toLowerCase()] !== knightCode
) {
  localStorage.removeItem("knightName");
  localStorage.removeItem("knightCode");
  window.location.href = "index.html";
}

// ✅ Display Knight Name in Dashboard Header
document.addEventListener("DOMContentLoaded", () => {
  const nameDisplay = document.getElementById("knightNameDisplay");
  if (nameDisplay) {
    nameDisplay.innerText = `Welcome, ${capitalize(knightName)}`;
  }

  // ✅ Load saved progress if exists
  const progressKey = `progress_${knightName}`;
  const savedProgress = localStorage.getItem(progressKey);

  if (savedProgress) {
    const data = JSON.parse(savedProgress);
    console.log("Knight Progress:", data);
    // You can use this data to show XP, tasks, notes etc.
  } else {
    // Create default progress
    const newProgress = {
      currentMoon: "Moon 1 - Awakening",
      totalXP: 0,
      dailyTaskStreak: 0,
      notes: []
    };
    localStorage.setItem(progressKey, JSON.stringify(newProgress));
  }
});

// ✅ Helper: Capitalize name
function capitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}
