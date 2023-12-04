const sweetsButton = document.getElementById("category-sweets-btn");
const drinksButton = document.getElementById("category-drinks-btn");
const snacksButton = document.getElementById("category-snacks-btn");
const itemsContainer = document.getElementById("items-cont");
const notificationsContainer = document.getElementById("not-cont");
import itemsDB from '../resources/database/db.json' assert { type: 'json'};
let categoryState = "sweets";

function changeBasket(item) {
    item = String(item);
    let basket = JSON.parse(localStorage.getItem("basket"));
    if (basket == null) {
        basket = new Object();
    }
    if (item in basket) {
        basket[item] = basket[item] + 1;
    } else {
        basket[item] = 1;
    }
    localStorage.setItem("basket", JSON.stringify(basket));
}

function showNotification(name) {
    let notification = document.createElement("div");
    notification.className = "notification";
    notification.innerHTML = `<p><strong>${name}</strong> добавлен(-а) в корзину</p>`;
    notificationsContainer.append(notification);
    setTimeout(() => removeNotification(notification), 1000);
}

function removeNotification(notification) {
    notification.style.opacity = 0;
    setTimeout(() => notification.remove(), 500);
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
    let addButtons = Array.from(document.getElementsByClassName("item-add-btn"));
    if (addButtons != null) {
        addButtons.forEach(element => {
            element.addEventListener("click", function() {
                changeBasket(this.getAttribute("data-id"));
                showNotification(this.parentNode.children[2].innerText);
            });
        })
    }
}

function itemConstructor(item) {
    let element = document.createElement("div");
    element.setAttribute("data-id", item.id);
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
    button.className = "item-add-btn";
    button.setAttribute("data-id", item.id);
    button.innerText = "В корзину";
    element.append(price, image, name, button);
    itemsContainer.appendChild(element);
}

function renderItems(categoryState) {
    clearItems();
    for (let key in itemsDB) {
        const item = itemsDB[key];
        if (item.type == categoryState) {
            itemConstructor(item);
        }
    }
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


