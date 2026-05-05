const yesButton = document.querySelector(".yes");
const noButton  = document.querySelector(".no");
const container = document.querySelector(".btn-container");

// smoother movement
noButton.style.transition = "all 0.25s ease";

// get random position INSIDE container
function moveNoButton() {
  const containerRect = container.getBoundingClientRect();
  const btnRect = noButton.getBoundingClientRect();

  const maxX = container.clientWidth - btnRect.width;
  const maxY = container.clientHeight - btnRect.height;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  noButton.style.left = `${randomX}px`;
  noButton.style.top  = `${randomY}px`;
}

// works on hover (desktop)
noButton.addEventListener("mouseenter", moveNoButton);

// works on click/touch (mobile)
noButton.addEventListener("touchstart", moveNoButton);

// optional: also run when user gets close 😈
document.addEventListener("mousemove", (e) => {
  const rect = noButton.getBoundingClientRect();

  const distance = Math.hypot(
    e.clientX - (rect.left + rect.width / 2),
    e.clientY - (rect.top + rect.height / 2)
  );

  if (distance < 100) {
    moveNoButton();
  }
});

// YES button effect ❤️
yesButton.addEventListener("click", () => {
  document.body.innerHTML = `
    <div style="
      display:flex;
      justify-content:center;
      align-items:center;
      height:100vh;
      font-size:2rem;
      text-align:center;
      background: radial-gradient(circle, #ff4d6d, #1a0033);
      color:white;
      flex-direction:column;
    ">
      <h1>Yayyy ❤️🥰</h1>
      <p>You just made my day 💖</p>
    </div>
  `;
});
