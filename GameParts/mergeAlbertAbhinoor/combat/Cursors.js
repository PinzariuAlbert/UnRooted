//Mouse Tracking & Custom Cursors

(() => {
  const { state, sfx } = window.Game;
  const hammer = document.getElementById('hammer');
//seed
  const seedCursor = document.createElement('img');
  seedCursor.id = 'seed-cursor';
  seedCursor.src = '/Drawings/ActualDrawings/wheat/wheat1.png';
  document.body.appendChild(seedCursor);

//water
  const waterCursor = document.createElement('img');
  waterCursor.id = 'water-cursor';
  waterCursor.src = '/Drawings/ActualDrawings/wateringCan.png';
  document.body.appendChild(waterCursor);

//ferti

  const fertilizerCursor = document.createElement('img');
  fertilizerCursor.id = 'fertilizer-cursor';
  fertilizerCursor.src = '/Drawings/ActualDrawings/fertilizer3.png';
  document.body.appendChild(fertilizerCursor);

//follow mouse
  function moveCursors(x, y) {
    state.lastMouseX = x;
    state.lastMouseY = y;
    hammer.style.left = x + 'px';
    hammer.style.top = y + 'px';
    seedCursor.style.left = x + 'px';
    seedCursor.style.top = y + 'px';
    waterCursor.style.left = x + 'px';
    waterCursor.style.top = y + 'px';
    fertilizerCursor.style.left = x + 'px';
    fertilizerCursor.style.top = y + 'px';
  }

  window.addEventListener('mousemove', e => {
    moveCursors(e.clientX, e.clientY);
  });


//hammerdown
  window.addEventListener('mousedown', e => {
    if (e.button !== 0 || e.target.closest('#menu') || e.target.closest('#arrow')) return;

    if (state.activeTool === 'hammer') {
      hammer.classList.add('smash');
      sfx.swing();
    } else if (state.activeTool === 'water') {
      waterCursor.classList.add('pour');
    }
  });

  // release mouse to reset hammer & watering can
  window.addEventListener('mouseup', () => {
    hammer.classList.remove('smash');
    waterCursor.classList.remove('pour');

  });

  
  window.Game.moveCursors = moveCursors; //saves it to  soo you can call it later with E
})();