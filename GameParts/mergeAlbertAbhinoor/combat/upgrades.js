//Tool Selection, Shortcuts & Hammer Upgrade



(() => {
  const { state, sfx, updateMoney } = window.Game;

  const hammer = document.getElementById('hammer');
  const hammerBtn = document.getElementById('hammeritem');
  const seedBtn = document.getElementById('seed');
  const arrowBtn = document.getElementById('arrow');
  const upgradeBtn = document.getElementById('upgrade-hammer');
  const hammerIcon = document.getElementById('hammer-icon');

  function selectTool(tool) {
    state.activeTool = state.activeTool === tool ? null : tool;
    document.body.classList.toggle('hammer-active', state.activeTool === 'hammer');
    document.body.classList.toggle('seed-active', state.activeTool === 'seed');
    hammerBtn.classList.toggle('active', state.activeTool === 'hammer');
    seedBtn.classList.toggle('active', state.activeTool === 'seed');
  }

  if (upgradeBtn) {
    upgradeBtn.addEventListener('click', e => {
      e.stopPropagation();
      if (state.hammerLevel >= 2 || state.money < 50) return;

      updateMoney(-50);
      state.hammerLevel = 2;
      hammer.src = '/Drawings/ActualDrawings/hammer2.png';
      if (hammerIcon) hammerIcon.src = '/Drawings/ActualDrawings/hammer2.png';
      hammer.classList.add('level-2');
      upgradeBtn.textContent = '(MAX)';
      sfx.harvest();
    });
  }

  hammerBtn.addEventListener('click', e => {
    e.stopPropagation();
    selectTool('hammer');
    if (window.Game.moveCursors) window.Game.moveCursors(e.clientX, e.clientY);
  });

  seedBtn.addEventListener('click', e => {
    e.stopPropagation();
    selectTool('seed');
    if (window.Game.moveCursors) window.Game.moveCursors(e.clientX, e.clientY);
  });

  document.querySelectorAll('#items .item:not(#hammeritem):not(#seed)').forEach(el => {
    el.addEventListener('click', () => selectTool(null));
  });

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