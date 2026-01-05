export function saveOrder(order) {
  const existingOrders =
    JSON.parse(localStorage.getItem("elvia_orders")) || [];

  existingOrders.push(order);

  localStorage.setItem(
    "elvia_orders",
    JSON.stringify(existingOrders)
  );
}

export function getOrders() {
  return JSON.parse(localStorage.getItem("elvia_orders")) || [];
}
