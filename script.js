// script.js — final version (no Supabase, username login only)
const input = document.getElementById('input')
const sendBtn = document.getElementById('sendBtn')
const loginBtn = document.getElementById('loginBtn')
const chatbox = document.getElementById('chatbox')
const player = document.getElementById('player')

const BACKEND_URL = "https://958d0e80-5d09-412e-92f7-efc6f9465c41-00-bhtlsigq9q35.sisko.replit.dev"
const ALLOWED_USERS = ['mn01', 'testmn']

loginBtn.onclick = () => {
  const username = prompt("Enter your username 💖 (e.g. mn01 or testmn)")
  if (!username || !ALLOWED_USERS.includes(username)) {
    alert("Sorry, only allowed users can talk to Jinx 😿")
    return
  }
  localStorage.setItem('user_id', username)
  alert(`Welcome ${username}! Jinx missed you 🥺💘`)
}

sendBtn.onclick = async () => {
  const text = input.value.trim()
  if (!text) return

  const user_id = localStorage.getItem('user_id')
  if (!user_id || !ALLOWED_USERS.includes(user_id)) {
    alert("Access denied. Please login with a valid username.")
    return
  }

  appendUserMsg(text)
  input.value = ''

  try {
    const res = await fetch(`${BACKEND_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id, text })
    })

    const data = await res.json()
    if (data.reply) appendJinxMsg(data.reply)
    if (data.audio) playAudio(`${BACKEND_URL}${data.audio}`)
  } catch (err) {
    appendJinxMsg("Oops, Jinx is feeling shy right now 😳")
  }
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

window.addEventListener('DOMContentLoaded', () => {
  const id = localStorage.getItem('user_id')
  if (id && ALLOWED_USERS.includes(id)) {
    console.log(`✅ Logged in as: ${id}`)
  } else {
    localStorage.removeItem('user_id')
    console.warn('⛔ Unauthorized or expired session')
  }
})
