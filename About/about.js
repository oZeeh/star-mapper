import { setupHeaderToggle } from '../headerToggle.js';

setupHeaderToggle()

const starContainer = document.querySelector('.background-stars');

  const numStars = 100; // Quantas estrelas

  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    // Posição aleatória
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;

    // Tamanho aleatório
    const size = Math.random() * 2 + 1; // entre 1px e 3px
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    // Delay aleatório na animação
    star.style.animationDelay = `${Math.random() * 5}s`;

    starContainer.appendChild(star);
  }