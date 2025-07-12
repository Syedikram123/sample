// ✅ Get real Knight Name (you should've saved this earlier)
const knightName = localStorage.getItem('knightName') || 'Knight';

// ✅ Format current time as HH:MM AM/PM
function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// ✅ Add first bot greeting when page loads
window.onload = () => {
  const chatBox = document.getElementById('chatBox');
  const welcome = document.createElement('div');
  welcome.className = 'bot-msg';
  welcome.innerHTML = `
    <strong>🤖</strong> Assalamu Alaikum, <strong>${knightName}</strong>!<br>
    What's in your mind today?
    <div class="time-stamp">${getCurrentTime()}</div>
  `;
  chatBox.appendChild(welcome);
};

function sendMessage() {
  const input = document.getElementById('userInput');
  const chatBox = document.getElementById('chatBox');
  const userText = input.value.trim();
  if (!userText) return;

  // ✅ Add user message
  const userMsg = document.createElement('div');
  userMsg.className = 'user-msg';
  userMsg.innerHTML = `
    ${userText}
    <div class="time-stamp">${getCurrentTime()}</div>
  `;
  chatBox.appendChild(userMsg);

  // ✅ Add bot response
  const botMsg = document.createElement('div');
  botMsg.className = 'bot-msg';
  botMsg.innerHTML = `
    ${getBotResponse(userText)}
    <div class="time-stamp">${getCurrentTime()}</div>
  `;
  chatBox.appendChild(botMsg);

  input.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;
}

// ✅ Smart Response Based on Text
function getBotResponse(input) {
  const text = input.toLowerCase();

  if (text.includes("motivate") || text.includes("demotivate")) {
    return "⚔️ Even lions feel tired — but they never quit. You were made for more.";
  }

  if (text.includes("islam") || text.includes("prayer") || text.includes("quran")) {
    return "🕌 Real power comes from salah and sabr. Allah is always watching.";
  }

  if (text.includes("goal") || text.includes("purpose")) {
    return "🎯 Big goals require big patience. Don't chase speed — chase depth.";
  }

  if (text.includes("arkonox") || text.includes("knight")) {
    return "🌌 Your training isn’t punishment — it's preparation. Arkonox needs you.";
  }

  if (text.includes("sad") || text.includes("lost")) {
    return "🕊️ Darkness is where stars shine the brightest. You're not alone.";
  }

  return "🤖 I'm learning from you every day. Share your thoughts, goals, struggles, and let’s rise together.";
}
