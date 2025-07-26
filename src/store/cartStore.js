import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cart: [],

  addToCart: (product, qty = 1) => {
    set((state) => {
      const exists = state.cart.find((item) => item.id === product.id);
      if (exists) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + qty }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { ...product, quantity: qty }] };
    });
  },

  updateQuantity: (id, qty) => {
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(qty, 1) } : item
      ),
    }));
  },

  removeFromCart: (id) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    }));
  },

  clearCart: () => set({ cart: [] }),
}));
