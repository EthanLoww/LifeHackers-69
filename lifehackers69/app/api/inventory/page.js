// app/api/inventory/page.js
import { NextRequest, NextResponse } from 'next/server';

let inventory = [
  { id: 1, name: "Milk", quantity: 10, expiryDate: "2024-06-01", threshold: 5 },
  { id: 2, name: "Eggs", quantity: 30, expiryDate: "2024-06-10", threshold: 10 },
];

export async function handler(req, res) {
  try {
    const method = req.method;

    if (method === 'GET') {
      return NextResponse.json(inventory, { status: 200 });
    } else if (method === 'POST') {
      const { name, quantity, expiryDate, threshold } = await req.json();
      const newItem = {
        id: Date.now(), // Generate a unique ID for the item
        name,
        quantity,
        expiryDate,
        threshold,
      };
      inventory.push(newItem);
      return NextResponse.json(newItem, { status: 201 });
    } else if (method === 'PUT') {
      const { id, ...updatedItem } = await req.json();
      inventory = inventory.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      );
      return NextResponse.json({ message: 'Item updated' }, { status: 200 });
    } else if (method === 'DELETE') {
      const { id } = await req.json();
      inventory = inventory.filter((item) => item.id !== id);
      return NextResponse.json({ message: 'Item deleted' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }
  } catch (error) {
    console.error('Error caught:', error);
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}

export default handler;
