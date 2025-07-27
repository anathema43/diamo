import { create } from "zustand";
import { auth } from "../firebase/firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile 
} from "firebase/auth";

export const useAuthStore = create((set) => ({
  currentUser: null,
  loading: true,
  error: null,

  fetchUser: () => {
    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        set({ currentUser: user, loading: false });
      });
      return unsubscribe;
    } catch (error) {
      console.log("Firebase not configured, using mock auth");
      // Fallback to mock auth if Firebase isn't configured
      set({ currentUser: null, loading: false });
      return () => {};
    }
  },

  signup: async (email, password, name) => {
    set({ error: null });
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      set({ currentUser: userCredential.user });
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ error: null });
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      set({ currentUser: userCredential.user });
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
      set({ currentUser: null });
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },
}));