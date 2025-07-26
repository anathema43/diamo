import React from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
