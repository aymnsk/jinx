async function sendMessage() {
  const input = document.getElementById("userInput").value;
  const chatDiv = document.getElementById("chat");
  if (!input.trim()) return;

  chatDiv.innerHTML += `<p><b>You:</b> ${input}</p>`;
  document.getElementById("userInput").value = "";

  const res = await fetch("https://958d0e80-5d09-412e-92f7-efc6f9465c41-00-bhtlsigq9q35.sisko.replit.dev/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: input })
  });

  const data = await res.json();
  const reply = data.reply;

  chatDiv.innerHTML += `<p><b>Jinx:</b> ${reply}</p>`;

  if (data.audio) {
    const audio = new Audio("https://958d0e80-5d09-412e-92f7-efc6f9465c41-00-bhtlsigq9q35.sisko.replit.dev" + data.audio);
    audio.play();
  }
}
