import React from "react";
import { useCartStore } from "../store/cartStore";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

export default function AddToCartButton({ product, className = "" }) {
  const { addToCart, updateQuantity, getItemQuantity } = useCartStore();
  const quantity = getItemQuantity(product.id);

  if (quantity === 0) {
    return (
      <button
        onClick={() => addToCart(product, 1)}
        disabled={product.quantityAvailable === 0}
        className={`px-4 py-2 bg-himalayan text-white rounded-lg hover:bg-himalayan-dark transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg border border-himalayan-dark ${className}`}
      >
        {product.quantityAvailable === 0 ? "Out of Stock" : "Add to Cart"}
      </button>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={() => updateQuantity(product.id, quantity - 1)}
        className="w-8 h-8 flex items-center justify-center bg-himalayan-light hover:bg-himalayan-stone text-himalayan-dark rounded-full transition-all duration-200 border border-himalayan-stone shadow-sm hover:shadow-md"
      >
        <MinusIcon className="w-4 h-4" />
      </button>
      <span className="min-w-[2rem] text-center font-semibold text-himalayan-dark bg-white px-2 py-1 rounded border border-himalayan-light">{quantity}</span>
      <button
        onClick={() => updateQuantity(product.id, quantity + 1)}
        disabled={quantity >= product.quantityAvailable}
        className="w-8 h-8 flex items-center justify-center bg-himalayan hover:bg-himalayan-dark text-white rounded-full transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg border border-himalayan-dark"
      >
        <PlusIcon className="w-4 h-4" />
      </button>
    </div>
  );
}