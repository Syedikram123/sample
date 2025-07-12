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

  // Dummy bot reply
  const botMsg = document.createElement('div');
  botMsg.className = 'bot-msg';
  botMsg.innerText = getBotResponse(userText);
  chatBox.appendChild(botMsg);

  input.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Simple reply system (for now)
function getBotResponse(input) {
  const text = input.toLowerCase();
  if (text.includes('motivate')) return '🧠 Keep going! Even warriors rest, but never quit.';
  if (text.includes('goal')) return '🎯 Your goal should scare and excite you at the same time.';
  return "🤖 I'm still learning... Ask me about growth, Islam, or Arkonox!";
}
