async function sendMessage() {
  const input = document.getElementById("userInput").value;
  const chatDiv = document.getElementById("chat");

  if (!input.trim()) return;

  // Show user message
  chatDiv.innerHTML += `<p><b>You:</b> ${input}</p>`;
  document.getElementById("userInput").value = "";

  try {
    // Send message to backend
    const res = await fetch("https://958d0e80-5d09-412e-92f7-efc6f9465c41-00-bhtlsigq9q35.sisko.replit.dev/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input })
    });

    const data = await res.json();
    const reply = data.reply;

    // Show Jinx reply
    chatDiv.innerHTML += `<p><b>Jinx:</b> ${reply}</p>`;

    // Play voice using audio file returned from backend (gTTS)
    if (data.audio) {
      const audio = new Audio("https://958d0e80-5d09-412e-92f7-efc6f9465c41-00-bhtlsigq9q35.sisko.replit.dev" + data.audio);
      audio.play();
    }

  } catch (err) {
    chatDiv.innerHTML += `<p><b>Error:</b> ${err.message}</p>`;
  }
}
