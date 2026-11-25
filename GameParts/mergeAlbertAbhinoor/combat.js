(() => {
  const holes = document.querySelectorAll('.hole');
  const moles = document.querySelectorAll('.mole');
  const scoreEl = document.getElementById('score');
  const cropsEl = document.getElementById('crops');
  const moneyEl = document.getElementById('money');
  const hammer = document.getElementById('hammer');
  const hammerBtn = document.getElementById('hammeritem');
  const seedBtn = document.getElementById('seed');
  const arrowBtn = document.getElementById('arrow');
  const upgradeBtn = document.getElementById('upgrade-hammer');
  const hammerIcon = document.getElementById('hammer-icon');
  const seedCursor = document.createElement('img');
  seedCursor.id = 'seed-cursor';
  seedCursor.src = '/Drawings/ActualDrawings/wheat/wheat1.png';
  document.body.appendChild(seedCursor);
  const wheatStages = [
    '/Drawings/ActualDrawings/wheat/wheat1.png',
    '/Drawings/ActualDrawings/wheat/wheat2.png',
    '/Drawings/ActualDrawings/wheat/wheat3.png',
    '/Drawings/ActualDrawings/wheat/wheat4.png',
    '/Drawings/ActualDrawings/wheat/wheat5.png'
  ];

  let score = 0;
  let money = 60;
  let cropsLeft = 0;
  let activeTool = null;
  let hammerLevel = 1;
  let audioCtx = null;
  let lastMouseX = window.innerWidth / 2;
  let lastMouseY = window.innerHeight / 2;

  if (moneyEl) moneyEl.textContent = money + '$';
  if (cropsEl) cropsEl.textContent = cropsLeft;

  function updateMoney(amount) {
    money += amount;
    if (moneyEl) moneyEl.textContent = money + '$';
  }

  function getAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playSwingSound() {
    const ctx = getAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  }

  function playHitSound() {
    const ctx = getAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(420, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + 0.18);
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.18);
  }

  function playCrunchSound() {
    const ctx = getAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(140, ctx.currentTime);
    osc.frequency.setValueAtTime(95, ctx.currentTime + 0.06);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.14);
  }

  function playPlantSound() {
    const ctx = getAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(520, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  }

  function playHarvestSound() {
    const ctx = getAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(580, ctx.currentTime);
    osc.frequency.setValueAtTime(880, ctx.currentTime + 0.07);
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.18);
  }

  function selectTool(tool) {
    activeTool = activeTool === tool ? null : tool;
    document.body.classList.toggle('hammer-active', activeTool === 'hammer');
    document.body.classList.toggle('seed-active', activeTool === 'seed');
    hammerBtn.classList.toggle('active', activeTool === 'hammer');
    seedBtn.classList.toggle('active', activeTool === 'seed');
  }

  if (upgradeBtn) {
    upgradeBtn.addEventListener('click', e => {
      e.stopPropagation();
      if (hammerLevel >= 2 || money < 50) return;

      updateMoney(-50);
      hammerLevel = 2;
      hammer.src = '/Drawings/ActualDrawings/hammer2.png';
      if (hammerIcon) hammerIcon.src = '/Drawings/ActualDrawings/hammer2.png';
      hammer.classList.add('level-2');
      upgradeBtn.textContent = '(MAX)';
      playHarvestSound();
    });
  }

  hammerBtn.addEventListener('click', e => {
    e.stopPropagation();
    selectTool('hammer');
    hammer.style.left = e.clientX + 'px';
    hammer.style.top = e.clientY + 'px';
  });

  seedBtn.addEventListener('click', e => {
    e.stopPropagation();
    selectTool('seed');
    seedCursor.style.left = e.clientX + 'px';
    seedCursor.style.top = e.clientY + 'px';
  });

  document.querySelectorAll('#items .item:not(#hammeritem):not(#seed)').forEach(el => {
    el.addEventListener('click', () => selectTool(null));
  });

  window.addEventListener('keydown', e => {
    if (e.repeat) return;
    const key = e.key.toLowerCase();

    if (key === 'q' && arrowBtn) {
      arrowBtn.click();
    }

    if (key === 'e') {
      selectTool('hammer');
      hammer.style.left = lastMouseX + 'px';
      hammer.style.top = lastMouseY + 'px';
    }
  });

  function setStage(hole, stageIndex) {
    const crop = hole.querySelector('.crop');
    hole.dataset.stage = stageIndex;
    crop.style.backgroundImage = `url("${wheatStages[stageIndex]}")`;

    const isReady = stageIndex === wheatStages.length - 1;
    crop.classList.toggle('ready', isReady);
    hole.classList.toggle('harvestable', isReady);
  }

  function growCrop(hole) {
    const timer = setInterval(() => {
      if (Number(hole.dataset.hp) <= 0) {
        clearInterval(timer);
        return;
      }
      let stage = Number(hole.dataset.stage);
      if (stage < wheatStages.length - 1) {
        setStage(hole, stage + 1);
      } else {
        clearInterval(timer);
      }
    }, 5000);
  }

  function resetPlot(hole) {
    const crop = hole.querySelector('.crop');
    hole.dataset.hp = 0;
    hole.dataset.stage = 0;
    hole.classList.remove('harvestable');
    crop.classList.remove('damaged', 'ready');
    crop.classList.add('dead');
    cropsLeft--;
    if (cropsEl) cropsEl.textContent = cropsLeft;
  }

  holes.forEach(h => {
    h.dataset.hp = 0;
    h.dataset.protected = 0;
    let crop = h.querySelector('.crop');
    if (!crop) {
      crop = document.createElement('div');
      crop.className = 'crop';
      h.prepend(crop);
    }
    crop.classList.add('dead');

    h.addEventListener('mousedown', e => {
      if (activeTool === 'hammer') return;

      if (Number(h.dataset.hp) > 0 && Number(h.dataset.stage) === wheatStages.length - 1) {
        e.stopPropagation();
        updateMoney(25);
        playHarvestSound();
        resetPlot(h);
        return;
      }

      if (activeTool === 'seed' && Number(h.dataset.hp) === 0 && money >= 15) {
        e.stopPropagation();
        updateMoney(-15);
        playPlantSound();

        h.dataset.hp = 5;
        h.dataset.protected = 1;
        setTimeout(() => { h.dataset.protected = 0; }, 3500);

        crop.classList.remove('damaged', 'dead', 'ready');
        setStage(h, 0);
        cropsLeft++;
        if (cropsEl) cropsEl.textContent = cropsLeft;

        growCrop(h);
      }
    });
  });

  window.addEventListener('mousemove', e => {
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    if (activeTool === 'hammer') {
      hammer.style.left = e.clientX + 'px';
      hammer.style.top = e.clientY + 'px';
    } else if (activeTool === 'seed') {
      seedCursor.style.left = e.clientX + 'px';
      seedCursor.style.top = e.clientY + 'px';
    }
  });

  window.addEventListener('mousedown', e => {
    if (activeTool !== 'hammer' || e.target.closest('#menu') || e.target.closest('#arrow')) return;
    hammer.classList.add('smash');
    playSwingSound();
  });

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
    playCrunchSound();
    setTimeout(() => hole.classList.remove('bitten'), 250);

    const crop = hole.querySelector('.crop');
    if (hp > 0 && hp <= 2) {
      crop.classList.add('damaged');
    } else if (hp === 0) {
      resetPlot(hole);
    }
  }

  function getFreeHole() {
    const free = [...holes].filter(
      h => !h.classList.contains('up') && Number(h.dataset.hp) > 0 && h.dataset.protected !== '1'
    );
    return free[Math.floor(Math.random() * free.length)];
  }

  function spawnMole(slotIndex) {
    const allowedMoles = Math.min(5, Math.ceil(cropsLeft / 3));
    const activeMoles = document.querySelectorAll('.hole.up').length;

    if (cropsLeft <= 0 || slotIndex >= allowedMoles || activeMoles >= allowedMoles) {
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
          damageCrop(hole);
        }
        setTimeout(() => spawnMole(slotIndex), Math.random() * 600 + 300);
      }, duration);
    } else {
      setTimeout(() => spawnMole(slotIndex), 400);
    }
  }

  function hitMole(e) {
    if (activeTool !== 'hammer') return;
    const hole = this.parentElement.parentElement;
    if (!hole.classList.contains('up')) return;

    score++;
    hole.classList.remove('up');
    playHitSound();
    showZap(e.clientX, e.clientY);

    if (hammerLevel === 2) {
      holes.forEach(otherHole => {
        if (otherHole !== hole && otherHole.classList.contains('up')) {
          const rect = otherHole.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          if (Math.hypot(cx - e.clientX, cy - e.clientY) < 180) {
            score++;
            otherHole.classList.remove('up');
            showZap(cx, cy);
          }
        }
      });
    }

    scoreEl.textContent = score;
  }

  moles.forEach(m => m.addEventListener('mousedown', hitMole));

  for (let i = 0; i < 5; i++) {
    setTimeout(() => spawnMole(i), i * 350);
  }
})();