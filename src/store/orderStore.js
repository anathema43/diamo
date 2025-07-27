import { create } from "zustand";
import { collection, getDocs, addDoc, doc, updateDoc, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuthStore } from "./authStore";

export const useOrderStore = create((set, get) => ({
  orders: [],
  loading: false,
  error: null,

  fetchOrders: async (userId = null) => {
    set({ loading: true, error: null });
    try {
      let q = collection(db, "orders");
      if (userId) {
        q = query(q, where("userId", "==", userId));
      }
      const snapshot = await getDocs(q);
      const orders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      set({ orders, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addOrder: async (order) => {
    set({ error: null });
    try {
      const docRef = await addDoc(collection(db, "orders"), order);
      set({ orders: [...get().orders, { ...order, id: docRef.id }] });
    } catch (error) {
      set({ error: error.message });
    }
  },

  createOrder: async (orderData) => {
    const { currentUser } = useAuthStore.getState();
    if (!currentUser) throw new Error("User not authenticated");
    
    const order = {
      ...orderData,
      userId: currentUser.uid,
      userEmail: currentUser.email,
      status: "processing",
      createdAt: Date.now(),
    };
    
    return await get().addOrder(order);
  },

  updateOrderStatus: async (id, status) => {
    set({ error: null });
    try {
      await updateDoc(doc(db, "orders", id), { status });
      set({
        orders: get().orders.map(order =>
          order.id === id ? { ...order, status } : order
        ),
      });
    } catch (error) {
      set({ error: error.message });
    }
  },
}));
