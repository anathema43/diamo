import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
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
        if (qty <= 0) {
          get().removeFromCart(id);
          return;
        }
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity: qty } : item
          ),
        }));
      },

      removeFromCart: (id) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        }));
      },

      clearCart: () => set({ cart: [] }),

      getItemQuantity: (id) => {
        const item = get().cart.find((item) => item.id === id);
        return item ? item.quantity : 0;
      },

      getTotalItems: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
    }),
    {
      name: "ramro-cart-storage",
    }
  )
);