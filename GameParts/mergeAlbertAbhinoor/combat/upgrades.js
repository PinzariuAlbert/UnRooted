(() => {
  const { state, sfx, updateMoney } = window.Game;

  const hammer = document.getElementById('hammer');
  const hammerBtn = document.getElementById('hammeritem');
  const hammerLabel = document.getElementById('hammer-label');
  const seedBtn = document.getElementById('seed');
  const waterBtn = document.getElementById('wateritem');
  const arrowBtn = document.getElementById('arrow');

  function selectTool(tool) {
    state.activeTool = state.activeTool === tool ? null : tool;
    document.body.classList.toggle('hammer-active', state.activeTool === 'hammer');
    document.body.classList.toggle('seed-active', state.activeTool === 'seed');
    document.body.classList.toggle('water-active', state.activeTool === 'water');
  }

  // Click the sidebar Hammer slot to buy the Level 2 upgrade
  hammerBtn.addEventListener('click', e => {
    e.stopPropagation();
    if (state.hammerLevel >= 2 || state.money < 50) return;

    updateMoney(-50);
    state.hammerLevel = 2;
    hammer.src = '/Drawings/ActualDrawings/hammer2.png';
    hammer.classList.add('level-2');
    hammerBtn.classList.add('upgraded');
    if (hammerLabel) hammerLabel.textContent = 'Hammer MAX';
    sfx.harvest();
  });

  // Click Seeds to equip/unequip seed cursor
  seedBtn.addEventListener('click', e => {
    e.stopPropagation();
    selectTool('seed');
    if (window.Game.moveCursors) window.Game.moveCursors(e.clientX, e.clientY);
  });
  // Click water to equip/unequip seed cursor
  if (waterBtn) {
    waterBtn.addEventListener('click', e => {
      e.stopPropagation();
      selectTool('water');
      if (window.Game.moveCursors) window.Game.moveCursors(e.clientX, e.clientY);
    });
  }

  // Clicking Fertilizer or Pesticide puts away any active tool
  document.querySelectorAll('#items .item:not(#hammeritem):not(#seed):not(#wateritem)').forEach(el => {
    el.addEventListener('click', () => selectTool(null));
  });


  // Press Q to toggle sidebar, E to toggle Hammer cursor
  window.addEventListener('keydown', e => {
    if (e.repeat) return;
    const key = e.key.toLowerCase();

    if (key === 'q' && arrowBtn) arrowBtn.click();
    if (key === 'e') {
      selectTool('hammer');
      if (window.Game.moveCursors) window.Game.moveCursors(state.lastMouseX, state.lastMouseY);
    }
  });
})();