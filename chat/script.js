const chatBox = document.getElementById('chatBox');
const input = document.getElementById('userInput');

function appendMessage(text, isUser = false) {
  const msg = document.createElement('div');
  msg.className = isUser ? 'user-msg' : 'bot-msg';
  msg.innerHTML = `${text}<div class="time-stamp">${new Date().toLocaleTimeString()}</div>`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const userText = input.value.trim();
  if (!userText) return;

  appendMessage(userText, true);
  input.value = "";

  appendMessage("⏳ Typing...");

  const res = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: userText })
  });

  const data = await res.json();
  const botReply = data?.[0]?.generated_text?.replace(userText, "")?.trim() || "⚠️ Failed to reply.";

  // Remove "Typing..."
  chatBox.lastChild.remove();

  appendMessage(botReply, false);
}
