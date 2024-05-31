import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Container,
  Title,
  Form,
  Input,
  Button,
  InventoryList,
  InventoryItem,
  ItemName,
  ItemDetails,
  Warning,
} from "../components/StyledComponents";

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [threshold, setThreshold] = useState(0);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    const response = await axios.get("/api/inventory");
    setInventory(response.data);
  };

  const addItem = async () => {
    await axios.post("/api/inventory", {
      name,
      quantity,
      expiryDate,
      threshold,
    });
    fetchInventory();
    setName("");
    setQuantity(0);
    setExpiryDate(new Date());
    setThreshold(0);
  };

  return (
    <Container>
      <Title>Inventory Management</Title>
      <Form>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
        <Input
          type="number"
          placeholder="Threshold Quantity"
          value={threshold}
          onChange={(e) => setThreshold(parseInt(e.target.value))}
        />
        <DatePicker
          selected={expiryDate}
          onChange={(date) => setExpiryDate(date)}
          customInput={<Input />} // Custom input for dark theme
        />
        <Button onClick={addItem}>Add Item</Button>
      </Form>
      <InventoryList>
        {inventory.map((item) => (
          <InventoryItem
            key={item.id}
            isBelowThreshold={item.quantity < item.threshold}
          >
            <ItemName>{item.name}</ItemName>
            <ItemDetails>
              {item.quantity} pcs - Expires on{" "}
              {new Date(item.expiryDate).toLocaleDateString()}
              {item.quantity < item.threshold && (
                <Warning> - Low Stock!</Warning>
              )}
            </ItemDetails>
          </InventoryItem>
        ))}
      </InventoryList>
    </Container>
  );
}
