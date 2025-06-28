async function sendMessage() {
  const input = document.getElementById("userInput").value;
  const chatDiv = document.getElementById("chat");

  if (!input.trim()) return;

  // Show user message
  chatDiv.innerHTML += `<p><b>You:</b> ${input}</p>`;
  document.getElementById("userInput").value = "";

  try {
    // Send to Replit backend (Groq model)
    const res = await fetch("https://958d0e80-5d09-412e-92f7-efc6f9465c41-00-bhtlsigq9q35.sisko.replit.dev/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input })
    });

    const data = await res.json();
    const reply = data.reply;

    // Show Jinx reply
    chatDiv.innerHTML += `<p><b>Jinx:</b> ${reply}</p>`;

    // Speak using Veena TTS
    await playVeenaTTS(reply);

  } catch (error) {
    chatDiv.innerHTML += `<p><b>Error:</b> ${error.message}</p>`;
  }
}

// 🔊 Veena TTS from Hugging Face Space
async function playVeenaTTS(text) {
  try {
    const res = await fetch("https://maya-research-veena.hf.space/run/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [text] })
    });

    const result = await res.json();
    const audioUrl = result.data[0]; // Get URL of audio
    const audio = new Audio(audioUrl);
    audio.play();
  } catch (err) {
    console.error("Veena TTS error:", err);
  }
}
