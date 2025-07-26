import React from "react";
import { useProductStore } from "../store/productStore";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

export default function WishlistPage() {
  const { wishlist } = useProductStore();
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-2">My Wishlist</h2>
      {items.length === 0 ? (
        <div className="bg-gray-100 rounded p-4">No items in wishlist.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
    </div>
  );
}
