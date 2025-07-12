// Load knight name (from localStorage)
const knightCode = localStorage.getItem('knightCode') || 'Knight';

// Greet on load
window.onload = () => {
  const chatBox = document.getElementById('chatBox');
  const welcome = document.createElement('div');
  welcome.className = 'bot-msg';
  welcome.innerText = `🧠 Assalamu Alaikum, ${knightCode}!\nWhat’s in your mind today?`;
  chatBox.appendChild(welcome);
};

function sendMessage() {
  const input = document.getElementById('userInput');
  const chatBox = document.getElementById('chatBox');
  const userText = input.value.trim();
  if (!userText) return;

  // Add user message
  const userMsg = document.createElement('div');
  userMsg.className = 'user-msg';
  userMsg.innerText = userText;
  chatBox.appendChild(userMsg);

  // Add bot reply
  const botMsg = document.createElement('div');
  botMsg.className = 'bot-msg';
  botMsg.innerText = getBotResponse(userText);
  chatBox.appendChild(botMsg);

  input.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotResponse(input) {
  const text = input.toLowerCase();

  if (text.includes("motivate") || text.includes("demotivate")) {
    return "⚔️ Even lions feel tired — but they never quit. You were made for more, stay strong.";
  }

  if (text.includes("islam") || text.includes("prayer")) {
    return "🕌 Don’t forget, the real strength comes from salah and sabr. Reconnect with your Creator.";
  }

  if (text.includes("goal") || text.includes("purpose")) {
    return "🎯 Your goal must scare you a little and excite you a lot. Keep aiming high.";
  }

  if (text.includes("arkonox") || text.includes("knight")) {
    return "🌌 Arkonox awaits your rise. Remember: You are being trained for greatness.";
  }

  return "🤖 I'm still learning from you daily. Share anything and I’ll try to help!";
}
