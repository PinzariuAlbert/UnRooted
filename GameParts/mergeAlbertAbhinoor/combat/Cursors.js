//Mouse Tracking & Custom Cursors

(() => {
  const { state, sfx } = window.Game;
  const hammer = document.getElementById('hammer');

  const seedCursor = document.createElement('img');
  seedCursor.id = 'seed-cursor';
  seedCursor.src = '/Drawings/ActualDrawings/wheat/wheat1.png';
  document.body.appendChild(seedCursor);

//follow mouse
  function moveCursors(x, y) {
    state.lastMouseX = x;
    state.lastMouseY = y;
    hammer.style.left = x + 'px';
    hammer.style.top = y + 'px';
    seedCursor.style.left = x + 'px';
    seedCursor.style.top = y + 'px';
  }

  window.addEventListener('mousemove', e => {
    moveCursors(e.clientX, e.clientY);
  });


//hammerdown
  window.addEventListener('mousedown', e => {
    if (state.activeTool !== 'hammer' || e.target.closest('#menu') || e.target.closest('#arrow')) return;
    hammer.classList.add('smash');
    sfx.swing(); //sound
  });

  window.addEventListener('mouseup', () => hammer.classList.remove('smash'));//make the hammer go up when you let go off the mouse

  window.Game.moveCursors = moveCursors;
})();