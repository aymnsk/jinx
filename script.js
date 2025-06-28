// script.js (everything in one file)
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.6'

const SUPABASE_URL = 'https://birkyotaolnhspyaggcy.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const input = document.getElementById('input')
const sendBtn = document.getElementById('sendBtn')
const loginBtn = document.getElementById('loginBtn')
const chatbox = document.getElementById('chatbox')
const player = document.getElementById('player')

const BACKEND_URL = "https://958d0e80-5d09-412e-92f7-efc6f9465c41-00-bhtlsigq9q35.sisko.replit.dev"

loginBtn.onclick = async () => {
  const email = prompt("Enter your email:")
  if (email) {
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) alert("Login error: " + error.message)
    else {
      alert("📩 Check your inbox!")
      localStorage.setItem("user_email", email)
    }
  }
}

async function getUserId() {
  const { data, error } = await supabase.auth.getUser()
  if (error || !data.user) return null
  return data.user.id
}

sendBtn.onclick = async () => {
  const text = input.value.trim()
  if (!text) return

  const user_id = await getUserId()
  if (!user_id) {
    alert("Please login first")
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

window.addEventListener('DOMContentLoaded', () => {
  const stored = localStorage.getItem('user_email')
  if (stored) console.log(`🔁 Logged in as: ${stored}`)
})
