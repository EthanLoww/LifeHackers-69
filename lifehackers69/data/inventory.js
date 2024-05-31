let inventory = [
  { id: 1, name: "Milk", quantity: 10, expiryDate: "2024-06-01" },
  { id: 2, name: "Eggs", quantity: 30, expiryDate: "2024-06-10" },
];

export function getInventory() {
  return inventory;
}

export function addItem(item) {
  inventory.push(item);
}

export function updateItem(id, updatedItem) {
  inventory = inventory.map((item) =>
    item.id === id ? { ...item, ...updatedItem } : item
  );
}

export function deleteItem(id) {
  inventory = inventory.filter((item) => item.id !== id);
}
