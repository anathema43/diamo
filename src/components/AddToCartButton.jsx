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
        className={`px-4 py-2 bg-himalaya text-white rounded-lg hover:bg-himalaya-dark transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
      >
        {product.quantityAvailable === 0 ? "Out of Stock" : "Add to Cart"}
      </button>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={() => updateQuantity(product.id, quantity - 1)}
        className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
      >
        <MinusIcon className="w-4 h-4" />
      </button>
      <span className="min-w-[2rem] text-center font-semibold">{quantity}</span>
      <button
        onClick={() => updateQuantity(product.id, quantity + 1)}
        disabled={quantity >= product.quantityAvailable}
        className="w-8 h-8 flex items-center justify-center bg-himalaya hover:bg-himalaya-dark text-white rounded-full transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        <PlusIcon className="w-4 h-4" />
      </button>
    </div>
  );
}