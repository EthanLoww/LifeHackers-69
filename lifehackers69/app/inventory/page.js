'use client';
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
  ErrorMessage,
  Loading,
} from "../../components/StyledComponents";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [threshold, setThreshold] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/inventory");
      if (!response.ok) {
        throw new Error("Failed to fetch inventory");
      }
      const data = await response.json();
      setInventory(data);
    } catch (error) {
      setError("Failed to fetch inventory.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async () => {
    if (!name || quantity <= 0 || threshold < 0) {
      setError("Please provide valid inputs.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          quantity,
          expiryDate: expiryDate.toISOString(),
          threshold,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add item");
      }
      fetchInventory();
      setName("");
      setQuantity(0);
      setExpiryDate(new Date());
      setThreshold(0);
      setError("");
    } catch (error) {
      setError("Failed to add item.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Inventory Management</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form>
        <Input
          type="text"
          placeholder="Name of Food"
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
          placeholder="Minimum Quantity"
          value={threshold}
          onChange={(e) => setThreshold(parseInt(e.target.value))}
        />
        <DatePicker
          selected={expiryDate}
          onChange={(date) => setExpiryDate(date)}
          customInput={<Input />}
        />
        <Button type="button" onClick={handleAddItem}>Add</Button>
      </Form>
      {loading ? (
        <Loading>Loading...</Loading>
      ) : (
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
      )}
    </Container>
  );
}
