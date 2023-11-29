const sweetsButton = document.getElementById("category-sweets-btn");
const drinksButton = document.getElementById("category-drinks-btn");
const snacksButton = document.getElementById("category-snacks-btn");

let categoryState = 0;

function renderCatalog() {
    if (categoryState == 0) {
        sweetsButton.style.background = "rgba(255, 62, 201, 1)";
        sweetsButton.style.color = "white";
        drinksButton.style.background = "none";
        drinksButton.style.color = "black";
        snacksButton.style.background = "none";
        snacksButton.style.color = "black";
    } else if (categoryState == 1) {
        sweetsButton.style.background = "none";
        sweetsButton.style.color = "black";
        drinksButton.style.background = "rgba(255, 62, 201, 1)";
        drinksButton.style.color = "white";
        snacksButton.style.background = "none";
        snacksButton.style.color = "black";
    } else {
        sweetsButton.style.background = "none";
        sweetsButton.style.color = "black";
        drinksButton.style.background = "none";
        drinksButton.style.color = "black";
        snacksButton.style.background = "rgba(255, 62, 201, 1)";
        snacksButton.style.color = "white";
    }
}

renderCatalog();

sweetsButton.addEventListener("click", () => {
    categoryState = 0;
    renderCatalog();
})

drinksButton.addEventListener("click", () => {
    categoryState = 1;
    renderCatalog();
})

snacksButton.addEventListener("click", () => {
    categoryState = 2;
    renderCatalog();
})