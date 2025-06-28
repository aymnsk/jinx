// script.js
import { getUserId, login } from './auth.js'

const input = document.getElementById('input')
const sendBtn = document.getElementById('sendBtn')
const loginBtn = document.getElementById('loginBtn')
const chatbox = document.getElementById('chatbox')
const player = document.getElementById('player')

const BACKEND_URL = "https://958d0e80-5d09-412e-92f7-efc6f9465c41-00-bhtlsigq9q35.sisko.replit.dev"

// Auto-login check
window.addEventListener('DOMContentLoaded', async () => {
  const email = localStorage.getItem('user_email')
  if (email) {
    console.log(`Auto-login as ${email}`)
  }
})

loginBtn.onclick = async () => {
  const email = prompt("Enter your email to login:")
  if (email) {
    await login(email)
    localStorage.setItem('user_email', email)
  }
}

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

  const res = await fetch(`${BACKEND_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id, text })
  })

  const data = await res.json()
  if (data.reply) appendJinxMsg(data.reply)
  if (data.audio) playAudio(`${BACKEND_URL}${data.audio}`)
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
