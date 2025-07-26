import React from "react";
import { useCartStore } from "../store/cartStore";
import { Link, useNavigate } from "react-router-dom";
import formatCurrency from "../utils/formatCurrency";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCartStore();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto p-8 text-center">
        <h1 className="text-3xl mb-2 font-bold">Your Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/" className="mt-6 inline-block px-6 py-2 bg-himalaya text-white rounded hover:bg-himalaya-dark">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl mb-8 font-bold">Your Cart</h1>
      <div className="space-y-6">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b py-4">
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
              <div>
                <div className="font-bold">{item.name}</div>
                <div className="text-sm text-gray-500">Price: {formatCurrency(item.price)}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} className="px-2">-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2">+</button>
              <button onClick={() => removeFromCart(item.id)} className="ml-2 text-red-600">Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-between items-center">
        <span className="font-bold text-xl">Total: {formatCurrency(total)}</span>
        <button
          className="px-6 py-2 bg-himalaya text-white rounded hover:bg-himalaya-dark"
          onClick={() => navigate("/checkout")}
        >
          Checkout
        </button>
        <button className="px-3 py-2 bg-gray-200 ml-3 rounded" onClick={clearCart}>Clear Cart</button>
      </div>
    </div>
  );
}
