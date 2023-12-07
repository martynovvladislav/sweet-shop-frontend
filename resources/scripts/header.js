const basketImgContainer = document.getElementById("basket-cont");

function update() {
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

update();