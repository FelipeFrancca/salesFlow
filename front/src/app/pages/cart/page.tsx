"use client";

import { FC } from "react";
import { useCart } from "./CartContext";
import { Button, IconButton, TextField } from "@mui/material";
import { FormatCurrency } from "../utils/formatCurrency";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart: FC = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (id: number, newQuantity: string) => {
    const parsedQuantity = parseInt(newQuantity);
    if (parsedQuantity >= 1) {
      updateQuantity(id, parsedQuantity);
    }
  };

  return (
    <div className="w-full mt-40">
      <h2 className="text-lg font-bold flex w-full justify-center">Carrinho</h2>
      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <ul className="w-full flex justify-center flex-wrap p-10 gap-4">
  {cart.map((item) => (
    <li key={item.id} className="w-52 p-4 bg-white rounded-lg shadow-md flex flex-col items-center justify-center text-center mb-4">
      <BrokenImageIcon style={{ fontSize: 50 }} className="text-gray-300" />
      <span className="text-lg font-semibold">{item.produtoTitle}</span>
      <span className="text-gray-600">{FormatCurrency(item.valor)}</span>
      <div className="flex items-center mt-2">
        <TextField
          type="number"
          value={item.quantity || 1}
          onChange={(e) => handleQuantityChange(item.id, e.target.value)}
          inputProps={{ min: 1 }}
          size="small"
          className="w-16 text-center"
        />
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => removeFromCart(item.id)}
          className="ml-2"
        >
          <DeleteIcon />
        </Button>
      </div>
    </li>
  ))}
</ul>
      )}
      <div className="mt-4 flex justify-center">
        <Button variant="contained" color="primary">
          Finalizar Compra
        </Button>
      </div>
    </div>
  );
};

export default Cart;
