const texts = [
  "You can change the speed of this animation with the button above.",
  "Keep tapping until you reach a desired speed.",
  "Hi there &#128075;!",
  "Welcome to my corner of the internet &#127760 &#128513;.",
  "Make yourself at home &#128146;!",
  "You can subscribe to my newsletter with the 'Newsletter' navigation link in the navigation menu.",
  "The other navigation links don't yet work though &#128517;.",
  "My social media links are down below.",
  "Follow and connect with me everywhere!",
  "Will continuously be working on this place so you can visit me from time to time to see what I'm up to &#128579.",
  "Nice chatting with you!",
  "Have a nice day &#129305;!",
];

let count = 0;
let index = 0;
let currentText = "";
let letter = "";
let speedButton;
let speedFactorArray;
let speedFactorIndex;
const lT = 100;
const pT = 1500;
let letterTimeout = 200;
let paragraphTimeout = 1000;

(function type() {
  if (count === texts.length) {
    count = 0;
  }

  currentText = texts[count];
  letter = currentText.slice(0, ++index);
  skip = /&(#)*([0-9]+)*;*$/g.test(letter);
  leter = letter.replace(/&(#)*([0-9]+)*;*$/g, letter);

  document.querySelector(".animated-text p").innerHTML =
    letter + '<span class="cursor"></span>';
  if (skip) {
    type();
  } else if (letter.length === currentText.length) {
    count++;
    index = 0;
    setTimeout(type, paragraphTimeout);
    document.querySelector(".cursor").classList.add("blink");
  } else {
    setTimeout(type, letterTimeout);
  }
})();

window.onload = function () {
  speedButton = document.querySelector(".speed-button");

  speedFactorArray = [1, 1.5, 2, 2.5, 0.2, 0.5, 0.7];

  speedFactorIndex = 0;

  speedButton.addEventListener("click", clickHandler);
};

function clickHandler() {
  speedFactorIndex = speedFactorIndex + 1;

  if (speedFactorIndex >= speedFactorArray.length) {
    speedFactorIndex = 0;
  }

  paragraphTimeout = pT / speedFactorArray[speedFactorIndex];
  letterTimeout = lT / speedFactorArray[speedFactorIndex];

  speedButton.textContent = speedFactorArray[speedFactorIndex].toString() + "x";
}

//this handles outlines when user is tabbing and/or clicking
function handleFirstTab(e) {
  if (e.key === "Tab") {
    document.body.classList.add("user-is-tabbing");

    window.removeEventListener("keydown", handleFirstTab);
    window.addEventListener("mousedown", handleMouseDownOnce);
  }
}

function handleMouseDownOnce() {
  document.body.classList.remove("user-is-tabbing");

  window.removeEventListener("mousedown", handleMouseDownOnce);
  window.addEventListener("keydown", handleFirstTab);
}

function handleTap(e) {
  document.body.classList.remove("user-is-tabbing");
  e.target.blur();
}

window.addEventListener("keydown", handleFirstTab);
document.addEventListener("touchend", handleTap);

/* Open when someone clicks on hamburger */
function openNav() {
  document.querySelector("nav .ul").classList.add("open");
  document.querySelector("nav .ul").classList.remove("closed");
  document.querySelector(".hamburger").classList.add("inactive");
  document.querySelector(".hamburger").classList.remove("active");
  document.querySelector(".close").classList.add("active");
  document.querySelector(".close").classList.remove("inactive");
  document.querySelector(".background").classList.add("show");
  document.querySelector(".background").classList.remove("hide");
}

/* Close when someone clicks on close */
function closeNav() {
  document.querySelector("nav .ul").classList.add("closed");
  document.querySelector("nav .ul").classList.remove("open");
  document.querySelector(".hamburger").classList.add("active");
  document.querySelector(".hamburger").classList.remove("inactive");
  document.querySelector(".close").classList.add("inactive");
  document.querySelector(".close").classList.remove("active");
  document.querySelector(".background").classList.add("hide");
  document.querySelector(".background").classList.remove("show");
}
