import { create } from "zustand";

export const useAuthStore = create((set) => ({
  currentUser: null,

  fetchUser: () => {
    // Mock auth for now - replace with Firebase when configured
    set({ currentUser: null });
    return () => {}; // cleanup function
  },

  signup: async (email, password, name) => {
    // Mock signup - replace with Firebase
    const mockUser = { uid: Date.now().toString(), email, displayName: name };
    set({ currentUser: mockUser });
  },

  login: async (email, password) => {
    // Mock login - replace with Firebase
    const mockUser = { uid: Date.now().toString(), email, displayName: "Test User" };
    set({ currentUser: mockUser });
  },

  logout: async () => {
    set({ currentUser: null });
  },
}));
