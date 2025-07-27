import React from "react";
import { useUserStore } from "../store/userStore";

const WishlistButton = ({ product }) => {
  const wishlist = useUserStore((state) => state.wishlist) || [];
  const toggleWishlist = useUserStore((state) => state.toggleWishlist);

  if (!product || !product.id) return null; // 💡 Early return, avoid error

  const isWishlisted = wishlist.includes(product.id);

  return (
    <button
      className={`px-2 py-1 rounded ${
        isWishlisted ? "bg-red-500 text-white" : "bg-gray-200"
      }`}
      onClick={() => toggleWishlist(product.id)}
    >
      {isWishlisted ? "♥" : "♡"}
    </button>
  );
};

export default WishlistButton;
