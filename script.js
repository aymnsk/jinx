async function sendMessage() {
  const input = document.getElementById("userInput").value;
  const chatDiv = document.getElementById("chat");

  chatDiv.innerHTML += `<p><b>You:</b> ${input}</p>`;

  const res = await fetch("https://your-replit-url.jinx.repl.co/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: input })
  });

  const data = await res.json();
  chatDiv.innerHTML += `<p><b>Jinx:</b> ${data.reply}</p>`;
  document.getElementById("audioPlayer").src = `https://your-replit-url.jinx.repl.co/audio`;
}
