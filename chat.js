const messagesDiv = document.getElementById("messages");
const input = document.getElementById("input");

async function sendMessage(text) {
  appendMessage("你", text);

  const res = await fetch("https://restless-sunset-7c85.15707698064.workers.dev", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
  });

  const data = await res.json();
  appendMessage("AI", data.reply);
}

function appendMessage(sender, text) {
  const div = document.createElement("div");
  div.innerHTML = `<b>${sender}：</b> ${text}`;
  div.style.margin = "6px 0";
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

input.addEventListener("keydown", e => {
  if (e.key === "Enter" && input.value.trim()) {
    sendMessage(input.value.trim());
    input.value = "";
  }
});
