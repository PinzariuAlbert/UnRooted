window.Game = (() => {
  const moneyEl = document.getElementById('money');

  const state = {
    money: 60,
    cropsLeft: 0,
    activeTool: null,
    hammerLevel: 1,
    lastMouseX: window.innerWidth / 2,
    lastMouseY: window.innerHeight / 2
  };

  let audioCtx = null;

  function getAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  }

  function tone(type, startFreq, endFreq, duration, vol) {
    const ctx = getAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + duration);
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  }

  const sfx = {
    swing: () => tone('sine', 220, 80, 0.08, 0.08),
    hit: () => tone('sawtooth', 420, 55, 0.18, 0.25),
    crunch: () => tone('square', 140, 95, 0.14, 0.12),
    plant: () => tone('triangle', 300, 520, 0.1, 0.15),
    harvest: () => tone('triangle', 580, 880, 0.18, 0.18)
  };

  function updateMoney(amount) {
    state.money += amount;
    if (moneyEl) moneyEl.textContent = state.money + '$';
  }

  function updateCrops(amount) {
    state.cropsLeft += amount;
  }

  if (moneyEl) moneyEl.textContent = state.money + '$';

  return { state, sfx, updateMoney, updateCrops };
})();