import React from "react";
import { useProductStore } from "../store/productStore";

export default function WishlistButton({ productId }) {
  const { wishlist, addToWishlist, removeFromWishlist } = useProductStore();

  const inWishlist = wishlist.includes(productId);

  return (
    <button
      className={`rounded-full p-2 border ${inWishlist ? "bg-pink-100 text-pink-600" : "bg-white text-gray-400"}`}
      onClick={() => {
        inWishlist ? removeFromWishlist(productId) : addToWishlist(productId);
      }}
      aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      {inWishlist ? "♥" : "♡"}
    </button>
  );
}
