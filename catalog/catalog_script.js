const sweetsButton = document.getElementById("category-sweets-btn");
const drinksButton = document.getElementById("category-drinks-btn");
const snacksButton = document.getElementById("category-snacks-btn");
const itemsContainer = document.getElementById("items-cont");

let categoryState = "sweets";
async function fetchData(callback) {
    const response = await fetch("../resources/database/db.json");
    let itemsDB = await response.json();
    if (callback) {
        callback(itemsDB);
    }
}

function renderCatalog() {
    if (categoryState == "sweets") {
        sweetsButton.style.background = "rgba(255, 62, 201, 1)";
        sweetsButton.style.color = "white";
        drinksButton.style.background = "none";
        drinksButton.style.color = "black";
        snacksButton.style.background = "none";
        snacksButton.style.color = "black";
    } else if (categoryState == "drinks") {
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
    renderItems(categoryState);
}

function itemConstructor(item) {
    let element = document.createElement("div");
    if (item.new) {
        element.className = "item new-item";
    } else {
        element.className = "item";
    }
    let price = document.createElement("h2");
    price.innerText = item.price + "₽";
    let image = document.createElement("img");
    image.src = item.imgsrc;
    let name = document.createElement("p");
    name.innerText = item.name;
    let button = document.createElement("button");
    button.innerText = "В корзину";
    element.append(price, image, name, button);
    itemsContainer.appendChild(element);
}

function renderItems(categoryState) {
    clearItems();
    fetchData((itemsDB) => {
        for (let key in itemsDB) {
            const item = itemsDB[key];
            if (item.type == categoryState) {
                itemConstructor(item);
            }
        }
    });
}

function clearItems() {
    let items = document.getElementsByClassName("item");
    while (items[0]) {
        items[0].parentNode.removeChild(items[0]);
    }
}

renderCatalog();

sweetsButton.addEventListener("click", () => {
    categoryState = "sweets";
    renderCatalog();
});

drinksButton.addEventListener("click", () => {
    categoryState = "drinks";
    renderCatalog();
});

snacksButton.addEventListener("click", () => {
    categoryState = "snacks";
    renderCatalog();
});