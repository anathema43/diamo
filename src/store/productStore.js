import { create } from "zustand";

export const useProductStore = create((set) => ({
  wishlist: [],
  addToWishlist: (id) =>
    set((state) => ({
      wishlist: state.wishlist.includes(id)
        ? state.wishlist
        : [...state.wishlist, id],
    })),
  removeFromWishlist: (id) =>
    set((state) => ({
      wishlist: state.wishlist.filter((wid) => wid !== id),
    })),
}));
