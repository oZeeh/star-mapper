import { setupHeaderToggle } from '../headerToggle.js';

const chat = document.getElementById('chat');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

const interest = 0.015;

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
  const msg = userInput.value.trim();
  blinkEyes()
  if (msg === '') return;

  addMessage(msg, 'user');
  userInput.value = '';

  const amount = parseFloat(msg);
  
  if (!isNaN(amount) && amount > 0) {
    setTimeout(() => {
      showFinancingOptions(amount);
    }, 500);
  } else {
    setTimeout(() => {
      addMessage("Por favor, informe um valor numérico para simular o financiamento.", 'bot');
    }, 500);
  }
}

function showFinancingOptions(baseAmount) {
  const options = [3, 6, 12];
  const container = document.createElement('div');
  container.classList.add('bot');

  options.forEach(installments => {
    const totalAmount = baseAmount * (1 + (interest * installments));
    const installmentAmount = (totalAmount / installments).toFixed(2);
    const total = totalAmount.toFixed(2);

    const button = document.createElement('button');
    button.textContent = `${installments}x de R$ ${installmentAmount}`;
    button.addEventListener('click', () => {
      confirmFinancing(installments, installmentAmount, total);
      container.querySelectorAll('button').forEach(b => b.disabled = true);
    });
    container.appendChild(button);
  });

  chat.appendChild(container);
  chat.scrollTop = chat.scrollHeight;
}

function confirmFinancing(installments, installmentAmount, total) {
  const msg = `⭐Perfeito! Financiamento em ${installments}x de R$ ${installmentAmount} confirmado ✅. Total: R$ ${total}. 🚀✨`;
  addMessage(msg, 'bot');
  blinkEyes() 
  sparkleAssistant()
}

function addMessage(texto, classe) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add(classe);
  msgDiv.textContent = texto;
  chat.appendChild(msgDiv);
  chat.scrollTop = chat.scrollHeight;
}

function reactRobot() {
    const robot = document.getElementById('robot-svg');
    robot.classList.add('new-message');

    setTimeout(() => {
        robot.classList.remove('new-message');
    }, 500);
}

function blinkEyes() {
const eyes = document.querySelectorAll('#robot-svg .eye');
eyes.forEach(eye => {
    eye.classList.add('blinking');
    setTimeout(() => {
    eye.classList.remove('blinking');
    }, 300);
});
}
  
function sparkleAssistant() {
const assistant = document.getElementById('assistant');

const positions = [
    { x: 10, y: 10 },
    { x: 80, y: 15 },
    { x: 50, y: 5 },
    { x: 20, y: 70 },
    { x: 75, y: 70 },
    { x: 88, y: 90 },
    { x: 98, y: 80 },
];

positions.forEach(pos => {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.left = pos.x + 'px';
    sparkle.style.top = pos.y + 'px';

    assistant.appendChild(sparkle);

    sparkle.addEventListener('animationend', () => {
    sparkle.remove();
    });
});
}

document.getElementById('send-btn').addEventListener('click', () => {
    reactRobot();
    blinkEyes();
});

setupHeaderToggle()