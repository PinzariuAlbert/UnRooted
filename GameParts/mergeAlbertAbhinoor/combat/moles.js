(() => {
  const { state, sfx } = window.Game;
  const holes = document.querySelectorAll('.hole');
  const moles = document.querySelectorAll('.mole');

  function showZap(x, y) {
    const el = document.createElement('div');
    el.className = 'zap';
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 200);
  }

  function getFreeHole() {
    const free = [...holes].filter(
      h => !h.classList.contains('up') && Number(h.dataset.hp) > 0 && h.dataset.protected !== '1'
    );
    return free[Math.floor(Math.random() * free.length)];
  }

  function spawnMole(slotIndex) {
    const allowedMoles = Math.min(5, Math.ceil(state.cropsLeft / 3));
    const activeMoles = document.querySelectorAll('.hole.up').length;

    if (state.cropsLeft <= 0 || slotIndex >= allowedMoles || activeMoles >= allowedMoles) {
      setTimeout(() => spawnMole(slotIndex), 500);
      return;
    }

    const hole = getFreeHole();
    const duration = Math.random() * 800 + 1400;

    if (hole) {
      hole.classList.add('up');
      setTimeout(() => {
        if (hole.classList.contains('up')) {
          hole.classList.remove('up');
          if (window.Game.damageCrop) window.Game.damageCrop(hole);
        }
        setTimeout(() => spawnMole(slotIndex), Math.random() * 600 + 300);
      }, duration);
    } else {
      setTimeout(() => spawnMole(slotIndex), 400);
    }
  }

  function hitMole(e) {
    if (state.activeTool !== 'hammer') return;
    const hole = this.parentElement.parentElement;
    if (!hole.classList.contains('up')) return;

    hole.classList.remove('up');
    sfx.hit();
    showZap(e.clientX, e.clientY);

    if (state.hammerLevel === 2) {
      holes.forEach(otherHole => {
        if (otherHole !== hole && otherHole.classList.contains('up')) {
          const rect = otherHole.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          if (Math.hypot(cx - e.clientX, cy - e.clientY) < 180) {
            otherHole.classList.remove('up');
            showZap(cx, cy);
          }
        }
      });
    }
  }

  moles.forEach(m => m.addEventListener('mousedown', hitMole));

  for (let i = 0; i < 5; i++) {
    setTimeout(() => spawnMole(i), i * 350);
  }
})();