const yesButton = document.querySelector(".yes");
const noButton  = document.querySelector(".no");

function getRandomPos() {
  return Math.floor(Math.random() * 280) + "px";
}

noButton.addEventListener("mouseover", () => {
  noButton.style.left = getRandomPos();
  noButton.style.top  = getRandomPos();
});

yesButton.addEventListener("click", () => {
  alert("I love you too ❤️🥰");
});