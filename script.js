function randomInt(max){
    return Math.floor(Math.random() * max)
}

const universe = document.getElementById('universe');
const hud = document.getElementById('hud');
const colonizedStars = JSON.parse(localStorage.getItem('colonizedStars') || '{}');
const title = document.getElementById('title')

let hudFixed = false;

function generateStarData() {
  const types = ['Anã Branca', 'Gigante Vermelha', 'Estrela de Nêutrons', 'Estrela Azul', 'Estrela de Carbono'];
  const names = ['Alpha', 'Beta', 'Gama', 'Zeta']

  const prefix = names[randomInt(4)]

  const name = `${prefix} - ${Math.floor(Math.random() * 1000)}`;
  const type = types[Math.floor(Math.random() * types.length)];

  const temp = 'R$ ' + (3000 + Math.floor(Math.random() * 10000)) + 'M';
  const hue = Math.floor(Math.random() * 240); // vermelho (0) a azul (240)
  const color = `hsl(${hue}, 100%, 70%)`;
  return { name, type, temp, color };
}

for (let i = 0; i < 300; i++) {
  const star = document.createElement('div');
  star.classList.add('star');
  const starData = generateStarData();
  const id = `${starData.name}-${i}`;

  star.dataset.id = id;
  star.dataset.name = starData.name;
  star.dataset.type = starData.type;
  star.dataset.temp = starData.temp;

  star.style.backgroundColor = starData.color;
  star.style.color = starData.color;

  if (colonizedStars[id]) {
    star.classList.add('colonized');
  }

  star.style.left = Math.random() * 2000 + 'px';
  star.style.top = Math.random() * 2000 + 'px';
  universe.appendChild(star);

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
}

function showStarData(starData, id, star) {
  document.getElementById('star-name').textContent = starData.name;
  document.getElementById('star-type').textContent = starData.type;
  document.getElementById('star-temp').textContent = starData.temp;

  document.getElementById('colonize-btn').onclick = () => {
    star.classList.add('colonized');
    colonizedStars[id] = starData;
    localStorage.setItem('colonizedStars', JSON.stringify(colonizedStars));
  };
}

function handleTitleClass() {
    title.classList.add('hidden')

    title.addEventListener('transitioned', () => {
        titleElement.classList.remove('title');
    })
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

function openMenu() {
    console.log(colonizedStars);
    
}

document.getElementById('menu')
    .addEventListener('click', openMenu)
