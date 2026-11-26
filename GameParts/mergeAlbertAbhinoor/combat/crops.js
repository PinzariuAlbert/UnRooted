// Planting, growth stages, watering, harvesting, and crop HP
(() => {
  const { state, sfx, updateMoney, updateCrops } = window.Game;
  const holes = document.querySelectorAll('.hole');

  const wheatStages = [
    '/mergeAlbertAbhinoor/ActualDrawings/wheat/wheat1.png',
    '/mergeAlbertAbhinoor/ActualDrawings/wheat/wheat2.png',
    '/mergeAlbertAbhinoor/ActualDrawings/wheat/wheat3.png',
    '/mergeAlbertAbhinoor/ActualDrawings/wheat/wheat4.png',
    '/mergeAlbertAbhinoor/ActualDrawings/wheat/wheat5.png'
  ];

  // Switch wheat image and mark plot ready at the final stage
  function setStage(hole, stageIndex) {
    const crop = hole.querySelector('.crop');
    hole.dataset.stage = stageIndex;
    crop.style.backgroundImage = `url("${wheatStages[stageIndex]}")`;

    const isReady = stageIndex === wheatStages.length - 1;
    crop.classList.toggle('ready', isReady);
    hole.classList.toggle('harvestable', isReady);
  }

  // Advance wheat 1 stage every 5s (20s total) until harvested or destroyed
  function growCrop(hole) {
    const timer = setInterval(() => {
      if (Number(hole.dataset.hp) <= 0) {
        clearInterval(timer);
        return;
      }
      const stage = Number(hole.dataset.stage);
      if (stage < wheatStages.length - 1) {
        setStage(hole, stage + 1);
      } else {
        clearInterval(timer);
      }
    }, 5000);
  }

  // Clear plot back to empty dry soil
  function resetPlot(hole) {
    const crop = hole.querySelector('.crop');
    hole.dataset.hp = 0;
    hole.dataset.stage = 0;
    hole.classList.remove('harvestable', 'wet');
    crop.classList.remove('damaged', 'ready');
    crop.classList.add('dead');
    updateCrops(-1);
  }

  // Subtract 1 HP when a mole finishes biting a crop
  function damageCrop(hole) {
    let hp = Number(hole.dataset.hp);
    if (hp <= 0) return;

    hp--;
    hole.dataset.hp = hp;
    hole.classList.add('bitten');
    sfx.crunch();
    setTimeout(() => hole.classList.remove('bitten'), 250);

    const crop = hole.querySelector('.crop');
    if (hp > 0 && hp <= 2) {
      crop.classList.add('damaged');
    } else if (hp === 0) {
      resetPlot(hole);
    }
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
      if (state.activeTool === 'hammer') return;

      // Harvest full-grown wheat (+25$)
      if (Number(h.dataset.hp) > 0 && Number(h.dataset.stage) === wheatStages.length - 1) {
        e.stopPropagation();
        updateMoney(25);
        sfx.harvest();
        resetPlot(h);
        return;
      }

      // Water dry plot (-14$) and tilt the watering can cursor
      if (state.activeTool === 'water' && !h.classList.contains('wet') && state.money >= 14) {
        updateMoney(-14);
        sfx.water();
        h.classList.add('wet');

        const can = document.getElementById('water-cursor');
        if (can) {
          can.classList.remove('pour');
          void can.offsetWidth; // restart tilt animation on fast clicks
          can.classList.add('pour');
        }
        return;
      }

      // Plant seed on empty plot (-15$) with a 3.5s mole no attack period
      if (state.activeTool === 'seed' && Number(h.dataset.hp) === 0 && state.money >= 15) {
        e.stopPropagation();
        updateMoney(-15);
        sfx.plant();

        h.dataset.hp = 5;
        h.dataset.protected = 1;
        setTimeout(() => { h.dataset.protected = 0; }, 3500);

        crop.classList.remove('damaged', 'dead', 'ready');
        setStage(h, 0);
        updateCrops(1);

        growCrop(h);
      }
    });
  });

  window.Game.damageCrop = damageCrop; // expose so moles can damage crops
})();