import {
  getInventory,
  addItem,
  updateItem,
  deleteItem,
} from "../../data/inventory";

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(getInventory());
  } else if (req.method === "POST") {
    addItem(req.body);
    res.status(201).json({ message: "Item added" });
  } else if (req.method === "PUT") {
    const { id } = req.body;
    updateItem(id, req.body);
    res.status(200).json({ message: "Item updated" });
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    deleteItem(id);
    res.status(200).json({ message: "Item deleted" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
