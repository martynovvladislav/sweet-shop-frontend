"use strict";
const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");
const slider = document.getElementById("slider");
const slide = document.getElementById("slide1");

function scrollRight() {
  if (slider.scrollWidth - slider.clientWidth < Math.round(slider.scrollLeft) + 10 && slider.scrollWidth - slider.clientWidth > Math.round(slider.scrollLeft) - 10) {
    slider.scrollTo({
      left: 0,
      behavior: "smooth"
    });
  } else {
    slider.scrollBy({
      left: (slide.clientWidth) + 101,
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
            left: -(slide.clientWidth) - 101,
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


leftArrow.addEventListener("click", function () {
    scrollLeft();
    resetTimer();
});

rightArrow.addEventListener("click", function (ev) {
    scrollRight();
    resetTimer();
});

window.addEventListener("resize", function() {
    slider.scrollTo({
        left: 0,
        behavior: "auto"
    })
});