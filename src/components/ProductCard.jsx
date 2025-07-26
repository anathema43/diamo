import React from "react";
import { Link } from "react-router-dom";
import ReviewStars from "./ReviewStars";
import WishlistButton from "./WishlistButton";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col transition hover:shadow-xl">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-44 object-cover rounded-md mb-2"
        />
        <div className="absolute top-2 right-2">
          <WishlistButton productId={product.id} />
        </div>
      </div>
      <h2 className="text-lg font-bold text-himalaya-dark mb-1">{product.name}</h2>
      <ReviewStars rating={product.rating} />
      <p className="text-stone-600 mb-2">{product.description}</p>
      <div className="flex justify-between items-center mt-auto">
        <span className="text-lg font-semibold text-green-700">₹{product.price}</span>
        <Link to={`/products/${product.id}`} className="bg-himalaya-dark text-white px-3 py-1 rounded hover:bg-himalaya transition">View</Link>
      </div>
      {product.quantityAvailable === 0 && (
        <span className="block mt-2 text-red-500 font-bold">Out of Stock</span>
      )}
    </div>
  );
}
