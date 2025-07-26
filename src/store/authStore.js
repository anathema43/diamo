import { create } from "zustand";
import { auth, db } from "../firebase/firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const useAuthStore = create((set) => ({
  currentUser: null,

  fetchUser: () => {
    return onAuthStateChanged(auth, async (user) => {
      set({ currentUser: user });
    });
  },

  signup: async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (userCredential.user) {
      await updateProfile(userCredential.user, { displayName: name });
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name: name,
        email: email,
      });
    }
  },

  login: async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  },

  logout: async () => {
    await signOut(auth);
    set({ currentUser: null });
  },
}));
