async function sendMessage() {
  const input = document.getElementById("userInput").value;
  const chatDiv = document.getElementById("chat");

  // Show user message
  chatDiv.innerHTML += `<p><b>You:</b> ${input}</p>`;
  document.getElementById("userInput").value = "";

  // Call Replit backend (Groq API)
  const res = await fetch("https://958d0e80-5d09-412e-92f7-efc6f9465c41-00-bhtlsigq9q35.sisko.replit.dev/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: input })
  });

  const data = await res.json();

  // Show AI reply
  chatDiv.innerHTML += `<p><b>Jinx:</b> ${data.reply}</p>`;

  // Speak the reply
  const utterance = new SpeechSynthesisUtterance(data.reply);
  utterance.lang = "en-IN"; // Hinglish-style accent
  utterance.rate = 1;        // Normal speed
  utterance.pitch = 1.2;     // Slightly sweet voice
  speechSynthesis.speak(utterance);
}
