const mainText = document.getElementById("main-text-cont");
const initInfo = document.getElementById("init-info-content");
const itemsInfo = document.querySelectorAll('.info');
const itemsPict = document.querySelectorAll('.pict');
const splitLines = document.querySelectorAll('.split');

window.addEventListener("scroll", function() {
    let value = window.scrollY;
    mainText.style.top = value * 0.3 + "px";
    initInfo.style.top = -value * 0.3 + "px";
});

window.addEventListener("scroll", checkItems);

function checkItems() {
    const triggerBottom = window.innerHeight / 6 * 4;
    itemsInfo.forEach((item) => {
        const itemTop = item.getBoundingClientRect().top;

        if (itemTop < triggerBottom) {
            item.classList.add("show");
        } else {
            item.classList.remove("show");
        }
    });

    itemsPict.forEach((item) => {
        const itemTop = item.getBoundingClientRect().top;

        if (itemTop < triggerBottom) {
            item.classList.add("show");
        } else {
            item.classList.remove("show");
        }
    });

    splitLines.forEach((item) => {
        const itemTop = item.getBoundingClientRect().top;

        if (itemTop < triggerBottom) {
            item.classList.add("show");
        } else {
            item.classList.remove("show");
        }
    });
}