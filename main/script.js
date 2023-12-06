"use strict";
const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");
const slider = document.getElementById("slider");
const slide = document.getElementById("slide1");

const mainText = document.getElementById("main-text-cont");
const cakeImg = document.getElementById("main-img-cont");

function scrollRight() {
  if (slider.scrollWidth - slider.clientWidth < Math.round(slider.scrollLeft) + 10 && slider.scrollWidth - slider.clientWidth > Math.round(slider.scrollLeft) - 10) {
    slider.scrollTo({
      left: 0,
      behavior: "smooth"
    });
  } else {
    slider.scrollBy({
      left: (slide.clientWidth) + 100,
      behavior: "smooth"
    });
  }
}


function scrollLeft() {
    if (slider.scrollLeft === 0) {
        slider.scrollTo({
            left: slider.scrollWidth,
            behavior: "smooth"
        });
    } else {
        slider.scrollBy({
            left: -(slide.clientWidth) - 100,
            behavior: "smooth"
        });
    }
}

// Auto slider
let timerId = setInterval(scrollRight, 7000);

function resetTimer() {
  clearInterval(timerId);
  timerId = setInterval(scrollRight, 7000);
}

function leftButtonHandler() {
  leftArrow.removeEventListener("click", leftButtonHandler);
  rightArrow.removeEventListener("click", rightButtonHandler);
  scrollLeft();
  resetTimer();
  setTimeout(() => {
    leftArrow.addEventListener("click", leftButtonHandler);
    rightArrow.addEventListener("click", rightButtonHandler);
  }, 600);
}

leftArrow.addEventListener("click", leftButtonHandler);

function rightButtonHandler() {
  leftArrow.removeEventListener("click", leftButtonHandler);
  rightArrow.removeEventListener("click", rightButtonHandler);
  scrollRight();
  resetTimer();
  setTimeout(() => {
    leftArrow.addEventListener("click", leftButtonHandler);
    rightArrow.addEventListener("click", rightButtonHandler);
  }, 600);
}

rightArrow.addEventListener("click", rightButtonHandler);

window.addEventListener("resize", function() {
  slider.scrollTo({
      left: 0,
      behavior: "auto"
  })
});

window.addEventListener("scroll", function() {
  let value = window.scrollY;
  mainText.style.left = -value * 0.3 + "px";
  cakeImg.style.right = -value * 0.3 + "px";
});