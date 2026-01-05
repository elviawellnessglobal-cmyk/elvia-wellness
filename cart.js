const cartItemsContainer = document.getElementById("cart-items");
const emptyText = document.getElementById("empty-cart");
const discountMessage = document.getElementById("discount-message");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let discountApplied = false;

function renderCart() {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    emptyText.style.display = "block";
    return;
  }

  emptyText.style.display = "none";

  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <p>${item.name}</p>
      <p>${item.price}</p>
    `;
    cartItemsContainer.appendChild(div);
  });
}

function applyDiscount() {
  const code = document.getElementById("discount-code").value;

  if (code === "ELVIA10" && !discountApplied) {
    discountApplied = true;
    discountMessage.innerText = "A refined benefit has been applied.";
  } else {
    discountMessage.innerText = "This code is not valid.";
  }
}

renderCart();
