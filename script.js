function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function formatMoney(unformattedString) {
  const string = unformattedString.toString();
  const numeric = string.replace(/[^\d,.-]/g, '').replace(',', '.');
  const amount = parseFloat(numeric);

  if (isNaN(amount)) {
    return 'Valor inválido';
  }

  return amount.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

const universe = document.getElementById('universe');
const hud = document.getElementById('hud');
const colonizedStars = JSON.parse(localStorage.getItem('colonizedStars') || '{}');
const title = document.getElementById('title');
const cart = document.getElementById('cart');
const cartContent = document.getElementById('cartContent');
const menuButton = document.getElementById('menu');

let hudFixed = false;

function generateStarData() {
  const types = ['Anã Branca', 'Gigante Vermelha', 'Estrela de Nêutrons', 'Estrela Azul', 'Estrela de Carbono'];
  const names = ['Alpha', 'Beta', 'Gama', 'Zeta'];
  const prefix = names[randomInt(names.length)];
  const name = `${prefix} - ${Math.floor(Math.random() * 1000)}`;
  const type = types[randomInt(types.length)];
  const value = formatMoney(3000 + randomInt(10000));
  const hue = randomInt(240);
  const color = `hsl(${hue}, 100%, 70%)`;

  return { name, type, value, color };
}

function showStarData(starData, id, star) {
  document.getElementById('star-name').textContent = starData.name;
  document.getElementById('star-type').textContent = starData.type;
  document.getElementById('star-value').textContent = starData.value;

  document.getElementById('colonize-btn').onclick = () => {
    star.classList.add('colonized');
    colonizedStars[id] = starData;
    localStorage.setItem('colonizedStars', JSON.stringify(colonizedStars));
    updateCartContent();
  };
}

function updateCartContent() {
  const stars = Object.values(colonizedStars);

  if (stars.length === 0) {
    cartContent.innerHTML = 'Nenhuma estrela adicionada.';
  } else {
    cartContent.innerHTML = '<strong>Estrelas colonizadas:</strong><ul>' +
      stars.map(star => `<li>${star.name} (${star.type}) - ${star.value}</li>`).join('') +
      '</ul>';
  }
}

function handleTitleClass() {
  title.classList.add('hidden');

  title.addEventListener('transitionend', () => {
    title.classList.remove('title');
  });
}

for (let i = 0; i < 300; i++) {
  const star = document.createElement('div');
  star.classList.add('star');

  const starData = generateStarData();
  const id = `${starData.name}-${i}`;

  star.dataset.id = id;
  star.dataset.name = starData.name;
  star.dataset.type = starData.type;
  star.dataset.value = starData.value;
  star.style.backgroundColor = starData.color;
  star.style.color = starData.color;
  star.style.left = Math.random() * 2000 + 'px';
  star.style.top = Math.random() * 2000 + 'px';

  if (colonizedStars[id]) {
    star.classList.add('colonized');
  }

  star.addEventListener('mouseenter', () => {
    if (!hudFixed) {
      hud.hidden = false;
      showStarData(starData, id, star);
    }
  });

  star.addEventListener('mouseleave', () => {
    if (!hudFixed) {
      hud.hidden = true;
    }
  });

  star.addEventListener('click', (e) => {
    e.stopPropagation();
    hudFixed = true;
    hud.hidden = false;
    showStarData(starData, id, star);
  });

  universe.appendChild(star);
}

let isDragging = false;
let startX, startY;
let offsetX = 0, offsetY = 0;

universe.addEventListener('mousedown', (e) => {
  handleTitleClass();
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
  universe.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  offsetX += e.clientX - startX;
  offsetY += e.clientY - startY;
  universe.style.left = offsetX + 'px';
  universe.style.top = offsetY + 'px';
  startX = e.clientX;
  startY = e.clientY;
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  universe.style.cursor = 'grab';
});

menuButton.addEventListener('click', (e) => {
  e.stopPropagation();
  cart.hidden = !cart.hidden;
});

document.addEventListener('click', (e) => {
  if (!menuButton.contains(e.target) && !cart.contains(e.target)) {
    cart.hidden = true;
  }
});

updateCartContent();