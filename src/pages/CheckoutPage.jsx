import React from "react";
import { useCartStore } from "../store/cartStore";
import { Link } from "react-router-dom";

export default function CheckoutPage() {
  const { cart, clearCart } = useCartStore();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0)
    return (
      <div className="max-w-lg mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-3">Checkout</h2>
        <p className="text-gray-600 mb-4">No items in cart.</p>
        <Link to="/" className="text-himalaya hover:underline">Shop Now</Link>
      </div>
    );

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id} className="mb-2 flex justify-between">
            <span>{item.name} x {item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between font-bold text-lg mt-6">
        <span>Total:</span>
        <span>₹{total}</span>
      </div>
      <button
        className="mt-8 w-full bg-himalaya text-white py-3 rounded hover:bg-himalaya-dark"
        onClick={() => {
          clearCart();
          alert("Thank you for your purchase! (Integrate Stripe for payments)");
        }}
      >
        Pay Now (Demo)
      </button>
    </div>
  );
}import React, { useState } from "react";
import { useCartStore } from "../store/cartStore";
import { useOrderStore } from "../store/orderStore";
import formatCurrency from "../utils/formatCurrency";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const { cart, clearCart } = useCartStore();
  const { placeOrder } = useOrderStore();
  const [address, setAddress] = useState("");
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrder = async (e) => {
    e.preventDefault();
    setProcessing(true);
    await placeOrder(cart, total, address);
    clearCart();
    setProcessing(false);
    navigate("/orders");
  };

  if (!cart.length) {
    return (
      <div className="max-w-xl mx-auto p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">No items in cart</h2>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <form onSubmit={handleOrder} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Shipping Address</label>
          <textarea
            className="w-full border rounded p-2"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your full shipping address"
          />
        </div>
        <div className="font-bold mb-2">Order Total: {formatCurrency(total)}</div>
        <button type="submit" className="w-full bg-himalaya text-white py-2 rounded hover:bg-himalaya-dark" disabled={processing}>
          {processing ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}

