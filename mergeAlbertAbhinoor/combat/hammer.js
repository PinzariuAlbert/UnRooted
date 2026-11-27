  const hammer = document.getElementById('hammer');
  hammerCursor.id = hammer-cursor
  hammerCursor.src = "/mergeAlbertAbhinoor/ActualDrawings/hammer2.png"
  document.body.appendChild(hammerCursor)

    function moveCursors(x, y) {
    state.lastMouseX = x;
    state.lastMouseY = y;
    hammer.style.left = x + 'px';
    hammer.style.top = y + 'px';
    }

//hammerdown
  window.addEventListener('mousedown', e => {
    if (e.button !== 0 || e.target.closest('#menu') || e.target.closest('#arrow')) return;

  });

  // release mouse to reset hammer & watering can
  window.addEventListener('mouseup', () => {
  });