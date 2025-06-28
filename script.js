async function sendMessage() {
  const input = document.getElementById("userInput").value;
  const chatDiv = document.getElementById("chat");

  chatDiv.innerHTML += `<p><b>You:</b> ${input}</p>`;

  const res = await fetch("https://958d0e80-5d09-412e-92f7-efc6f9465c41-00-bhtlsigq9q35.sisko.replit.dev/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: input })
  });

  const data = await res.json();
  chatDiv.innerHTML += `<p><b>Jinx:</b> ${data.reply}</p>`;
}
