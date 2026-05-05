const game    = document.querySelector('main');
const arena   = document.querySelector('.btn-container');
const yesBtn  = document.querySelector('.yes');
const noBtn   = document.querySelector('.no');

// Create counter element and append it
const counter = document.createElement('p');
counter.style.cssText = 'color:rgba(255,255,255,0.6); margin-top:16px; font-size:0.9rem; min-height:1.2em;';
game.appendChild(counter);

// Create yes-screen element
const yesScr = document.createElement('div');
yesScr.style.cssText = 'display:none; flex-direction:column; align-items:center; gap:16px; text-align:center;';
yesScr.innerHTML = `
  <div style="font-size:4rem; animation: float 2s ease-in-out infinite;">❤️</div>
  <h1 id="yes-title" style="font-size:2rem;"></h1>
  <p  id="yes-sub"   style="color:rgba(255,255,255,0.7);"></p>
`;
game.appendChild(yesScr);

let escapes = 0;
let lastMove = 0;
let noBtnW, noBtnH;

function measure() {
  noBtnW = noBtn.offsetWidth;
  noBtnH = noBtn.offsetHeight;
}

function randomPos() {
  const maxX = arena.offsetWidth  - noBtnW;
  const maxY = arena.offsetHeight - noBtnH;
  return {
    x: Math.random() * maxX,
    y: Math.random() * maxY
  };
}

function moveNo() {
  const { x, y } = randomPos();
  noBtn.style.left      = x + 'px';
  noBtn.style.top       = y + 'px';
  noBtn.style.right     = 'auto';
  noBtn.style.bottom    = 'auto';
  noBtn.style.transform = 'none';

  escapes++;
  const msgs = [
    '', 'Getting warmer...', 'Almost!', 'So close...',
    'Sneaky...', 'Try harder!', 'You want this.'
  ];
  counter.textContent = escapes < msgs.length
    ? msgs[escapes]
    : 'Still no? I believe in you.';
}

function onMouseMove(e) {
  const now = Date.now();
  if (now - lastMove < 40) return;
  lastMove = now;

  const rect = noBtn.getBoundingClientRect();
  const cx   = rect.left + rect.width  / 2;
  const cy   = rect.top  + rect.height / 2;
  const dist = Math.hypot(e.clientX - cx, e.clientY - cy);

  if (dist < 90) moveNo();
}

noBtn.addEventListener('mouseenter', moveNo);
noBtn.addEventListener('touchstart', (e) => {
  e.preventDefault();
  moveNo();
}, { passive: false });
document.addEventListener('mousemove', onMouseMove);

yesBtn.addEventListener('click', () => {
  document.removeEventListener('mousemove', onMouseMove);

  // Hide everything except yes screen
  document.querySelector('h1').style.display    = 'none';
  document.querySelector('#hearts-container') &&
    (document.querySelector('#hearts-container').style.display = 'none');
  arena.style.display   = 'none';
  counter.style.display = 'none';

  yesScr.style.display = 'flex';

  document.getElementById('yes-title').textContent =
    escapes === 0 ? 'That was easy!'        :
    escapes  <  3 ? 'Yayyy!'               :
    escapes  <  7 ? 'Took you long enough!' : 'Finally!!!';

  document.getElementById('yes-sub').textContent =
    escapes === 0 ? 'No hesitation. I like that.' :
    escapes  <  3 ? 'You just made my day.'       :
    escapes  <  7 ? "I knew you'd come around."   : 'Worth the wait.';
});

window.addEventListener('resize', measure);

// Init — also generate floating hearts if container exists
const heartsContainer = document.getElementById('hearts-container');
if (heartsContainer) {
  const HEARTS = ['💗', '❤️', '💖', '💞', '💘', '💓', '💝', '🩷'];
  HEARTS.forEach((emoji, i) => {
    const el = document.createElement('div');
    el.className  = 'heart';
    el.textContent = emoji;
    el.style.left              = `${(i / HEARTS.length) * 95 + 2}%`;
    el.style.animationDuration = `${11 + Math.random() * 8}s`;
    el.style.animationDelay    = `${i * 1.2}s`;
    heartsContainer.appendChild(el);
  });
}

measure();
const start = randomPos();
noBtn.style.left      = start.x + 'px';
noBtn.style.top       = start.y + 'px';
noBtn.style.right     = 'auto';
noBtn.style.bottom    = 'auto';
noBtn.style.transform = 'none';
