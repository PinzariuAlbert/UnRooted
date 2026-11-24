const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const scoreEl = document.getElementById('score');
const cropsEl = document.getElementById('crops');
const hammer = document.getElementById('hammer');

let score = 0;
let cropsLeft = holes.length;

holes.forEach(h => {
  h.dataset.hp = 2;
  if (!h.querySelector('.crop')) {
    const crop = document.createElement('div');
    crop.className = 'crop';
    h.prepend(crop);
  }
});

function stripWhite(img) {
  const src = new Image();
  src.src = img.src;
  src.onload = () => {
    const c = document.createElement('canvas');
    c.width = src.width;
    c.height = src.height;
    const ctx = c.getContext('2d');
    ctx.drawImage(src, 0, 0);
    const frame = ctx.getImageData(0, 0, c.width, c.height);
    for (let i = 0; i < frame.data.length; i += 4) {
      if (frame.data[i] > 235 && frame.data[i + 1] > 235 && frame.data[i + 2] > 235) {
        frame.data[i + 3] = 0;
      }
    }
    ctx.putImageData(frame, 0, 0);
    img.src = c.toDataURL();
  };
}

stripWhite(hammer);

window.addEventListener('mousemove', e => {
  hammer.style.left = e.clientX + 'px';
  hammer.style.top = e.clientY + 'px';
});

window.addEventListener('mousedown', () => hammer.classList.add('smash'));
window.addEventListener('mouseup', () => hammer.classList.remove('smash'));

function showZap(x, y) {
  const el = document.createElement('div');
  el.className = 'zap';
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 200);
}

function damageCrop(hole) {
  let hp = Number(hole.dataset.hp);
  if (hp <= 0) return;

  hp--;
  hole.dataset.hp = hp;
  hole.classList.add('bitten');
  setTimeout(() => hole.classList.remove('bitten'), 250);

  const crop = hole.querySelector('.crop');
  if (hp === 1) {
    crop.classList.add('damaged');
  } else if (hp === 0) {
    crop.classList.add('dead');
    cropsLeft--;
    if (cropsEl) cropsEl.textContent = cropsLeft;
  }
}

function getFreeHole() {
  const free = [...holes].filter(h => !h.classList.contains('up') && Number(h.dataset.hp) > 0);
  return free[Math.floor(Math.random() * free.length)];
}

function spawnMole() {
  if (cropsLeft <= 0) return;

  const hole = getFreeHole();
  const duration = Math.random() * 700 + 850;

  if (hole) {
    hole.classList.add('up');
    setTimeout(() => {
      if (hole.classList.contains('up')) {
        hole.classList.remove('up');
        damageCrop(hole);
      }
      spawnMole();
    }, duration);
  } else {
    setTimeout(spawnMole, 200);
  }
}

function hitMole(e) {
  const hole = this.parentElement.parentElement;
  if (!hole.classList.contains('up')) return;

  score++;
  scoreEl.textContent = score;
  hole.classList.remove('up');
  showZap(e.clientX, e.clientY);
}

moles.forEach(m => m.addEventListener('mousedown', hitMole));

for (let i = 0; i < 5; i++) {
  setTimeout(spawnMole, i * 220);
}