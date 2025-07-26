import { create } from "zustand";

export const useOrderStore = create((set) => ({
  orders: [],
  placeOrder: (cart, total, address) =>
    set((state) => ({
      orders: [
        ...state.orders,
        {
          id: Date.now().toString(),
          cart,
          total,
          address,
          date: new Date().toLocaleString(),
        },
      ],
    })),
}));
