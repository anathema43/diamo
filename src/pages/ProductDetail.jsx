import React from "react";
import { useParams } from "react-router-dom";
import products from "../data/products";
import { useCartStore } from "../store/cartStore";
import ReviewStars from "../components/ReviewStars";
import WishlistButton from "../components/WishlistButton";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCartStore();

  if (!product) return <div className="p-10">Product not found.</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded shadow-md p-8 flex flex-col md:flex-row gap-10 mt-8">
      <img src={product.image} alt={product.name} className="w-full md:w-96 h-64 object-cover rounded" />
      <div className="flex-1 flex flex-col">
        <h1 className="text-3xl font-bold text-himalaya-dark mb-2">{product.name}</h1>
        <ReviewStars rating={product.rating || 4} />
        <p className="text-lg text-gray-700 mb-4">{product.description}</p>
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xl font-semibold text-green-700">₹{product.price}</span>
          <WishlistButton productId={product.id} />
        </div>
        <div>
          <button
            className="px-6 py-2 bg-himalaya text-white rounded hover:bg-himalaya-dark transition"
            disabled={product.quantityAvailable === 0}
            onClick={() => addToCart(product, 1)}
          >
            {product.quantityAvailable === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
        <div className="mt-4 text-gray-500 text-sm">
          {product.quantityAvailable > 0 ? `${product.quantityAvailable} left in stock` : "Not available"}
        </div>
      </div>
    </div>
  );
}
