const sweetsButton = document.getElementById("category-sweets-btn");
const drinksButton = document.getElementById("category-drinks-btn");
const snacksButton = document.getElementById("category-snacks-btn");
const itemsContainer = document.getElementById("items-cont");
const notificationsContainer = document.getElementById("not-cont");
const princessImage = document.getElementById("cat-img-princess-cont");
const candiesImage = document.getElementById("cat-img-candies-cont");
const mainText = document.getElementById("main-text-cont");
const basketImgContainer = document.getElementById("basket-cont");
let categoryState = "sweets";
let itemsDB;

let request = new XMLHttpRequest();
request.open('GET', '../resources/database/db.json', false);
request.send(null);

if (request.status === 200) {
    itemsDB = JSON.parse(request.responseText);
    console.log('itemsDB successfully loaded:', itemsDB);
} else {
    console.error('Failed to load itemsDB');
}

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
    updateHeader();
}

function showNotification(name) {
    let notification = document.createElement("div");
    notification.className = "notification";
    notification.innerHTML = `<img src="../resources/images/cross_icon.png"><p><strong>${name}</strong> добавлен(-а) в корзину</p>`;
    notificationsContainer.append(notification);
    setTimeout(() => removeNotification(notification), 3000);
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

notificationsContainer.addEventListener("click", function(event) {
    if (event.target.tagName == "IMG") {
        removeNotification(event.target.parentNode);
    }
});


window.addEventListener("scroll", function() {
    let value = window.scrollY;
    princessImage.style.left = -value * 0.3 + "px";
    candiesImage.style.right = -value * 0.3 + "px";
    mainText.style.top = value * 0.5 + "px";
});

function updateHeader() {
    let basket = JSON.parse(localStorage.getItem("basket"));
    let totalAmount = 0;
    for (let id in basket) {
        totalAmount += Number(basket[id]);
    }
    if (totalAmount == 0) {
        basketImgContainer.children[1].src = "../resources/images/empty_basket.png";
    } else {
        basketImgContainer.children[0].children[0].innerHTML = totalAmount;
        basketImgContainer.children[1].src = "../resources/images/basket.png";
    }
}
updateHeader();
