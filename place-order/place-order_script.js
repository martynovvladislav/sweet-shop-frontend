const form = document.getElementsByTagName("form")[0];
const mainContainer = document.getElementsByTagName("main")[0];
let timer = 10;
form.addEventListener("submit", () => {
    let notification = showNotification();
    notification.children[0].addEventListener("click", function() {
        clearInterval(window.interval);
        timer = 5;
        localStorage.setItem("basket", JSON.stringify({}));
        window.location.replace("../main");
    });
    getOut(notification);
});

function getOut(notification) {
    window.interval = setInterval(function() {
        drawTimer(notification);
    }, 1000);
}

function drawTimer(notification) {
    if (timer == 0) {
        clearInterval(window.interval);
        timer = 5;
        localStorage.setItem("basket", JSON.stringify({}));
        window.location.replace("../main");
    } else {
        notification.children[4].innerHTML = `Возвращение на сайт через ${timer}...`;
        timer -= 1;
    }
}

function showNotification() {
    let notification = document.createElement("div");
    notification.className = "order-notification";
    notification.innerHTML = `<img src="../resources/images/cross_icon.png">
    <h2>Спасибо за заказ</h2>
    <p>В течение 20 минут Вам перезвонят, чтобы подтвердить информацию о заказе</p>
    <p>Хорошего дня!</p>
    <p></p>`;
    mainContainer.appendChild(notification);
    return notification;
}

function render() {
    let basket = JSON.parse(localStorage.getItem("basket"));
    console.log(Object.keys(basket));
    if (Object.keys(basket).length == 0) {
        window.location.replace("../main");
    }
}

render();