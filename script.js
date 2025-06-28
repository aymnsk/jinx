// script.js
import { getUserId, login } from './auth.js'

const input = document.getElementById('input')
const sendBtn = document.getElementById('sendBtn')
const loginBtn = document.getElementById('loginBtn')
const chatbox = document.getElementById('chatbox')
const player = document.getElementById('player')

loginBtn.onclick = () => login(prompt("Enter your email to login:"))

sendBtn.onclick = async () => {
  const text = input.value.trim()
  if (!text) return

  const user_id = await getUserId()
  if (!user_id) {
    alert("Please login first!")
    return
  }

  appendUserMsg(text)
  input.value = ''

  const res = await fetch("https://your-replit-backend/chat", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id, text })
  })

  const data = await res.json()
  if (data.reply) appendJinxMsg(data.reply)
  if (data.audio) playAudio(data.audio)
}

function appendUserMsg(msg) {
  const div = document.createElement('div')
  div.className = 'user-msg'
  div.textContent = 'You: ' + msg
  chatbox.appendChild(div)
  chatbox.scrollTop = chatbox.scrollHeight
}

function appendJinxMsg(msg) {
  const div = document.createElement('div')
  div.className = 'jinx-msg'
  div.textContent = 'Jinx: ' + msg
  chatbox.appendChild(div)
  chatbox.scrollTop = chatbox.scrollHeight
}

function playAudio(url) {
  player.src = url
  player.style.display = 'block'
  player.play()
}
