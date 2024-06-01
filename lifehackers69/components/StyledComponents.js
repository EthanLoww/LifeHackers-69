import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #1a1a1a;
  color: #e0e0e0;
  min-height: 100vh;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #ffffff;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;
`;

export const Input = styled.input`
  padding: 10px;
  margin: 5px;
  border: 1px solid #444;
  border-radius: 4px;
  width: 100%;
  background-color: #333;
  color: #e0e0e0;
  font-size: 1rem;

  &::placeholder {
    color: #aaa;
  }
`;

export const Button = styled.button`
  padding: 12px 24px;
  margin-top: 10px;
  border: none;
  border-radius: 4px;
  background-color: #0070f3;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;

  &:hover {
    background-color: #005bb5;
  }
`;

export const InventoryList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
  max-width: 600px;
  margin-top: 20px;
`;

export const InventoryItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  margin: 5px 0;
  border: 1px solid #444;
  border-radius: 4px;
  background-color: #2c2c2c;
`;

export const ItemName = styled.span`
  font-weight: bold;
  color: #ffffff;
`;

export const ItemDetails = styled.span`
  color: #bbb;
`;


export const Warning = styled.div`
  color: red;
  font-weight: bold;
`;