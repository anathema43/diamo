import { create } from "zustand";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      set({ products, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addProduct: async (newProduct) => {
    set({ error: null });
    try {
      const docRef = await addDoc(collection(db, "products"), newProduct);
      set({ products: [...get().products, { ...newProduct, id: docRef.id }] });
    } catch (error) {
      set({ error: error.message });
    }
  },

  updateProduct: async (id, updatedFields) => {
    set({ error: null });
    try {
      const ref = doc(db, "products", id);
      await updateDoc(ref, updatedFields);
      set({
        products: get().products.map(p => p.id === id ? { ...p, ...updatedFields } : p),
      });
    } catch (error) {
      set({ error: error.message });
    }
  },

  deleteProduct: async (id) => {
    set({ error: null });
    try {
      await deleteDoc(doc(db, "products", id));
      set({
        products: get().products.filter(p => p.id !== id),
      });
    } catch (error) {
      set({ error: error.message });
    }
  },
}));
