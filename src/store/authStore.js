import { create } from "zustand";
import { persist } from "zustand/middleware";
import { auth } from "../firebase/firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const googleProvider = new GoogleAuthProvider();

export const useAuthStore = create(
  persist(
    (set, get) => ({
  currentUser: null,
  userProfile: null,
  loading: true,
  error: null,

  fetchUser: () => {
    try {
      // Check if Firebase auth is available
      if (!auth) {
        console.warn('Firebase auth not available, using demo mode');
        set({ currentUser: null, userProfile: null, loading: false });
        return () => {};
      }
      
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          // CRITICAL: Always fetch fresh user profile from Firestore on auth state change
          try {
            if (!db) {
              console.warn('Firestore not available, using basic auth only');
              set({ currentUser: user, userProfile: null, loading: false });
              return;
            }
            
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);
            const userProfile = userDocSnap.exists() ? userDocSnap.data() : null;
            
            console.log('Auth state changed - user profile:', userProfile); // Debug log
            set({ currentUser: user, userProfile, loading: false });
          } catch (error) {
            console.error("Error fetching user profile:", error);
            set({ currentUser: user, userProfile: null, loading: false });
          }
        } else {
          console.log('Auth state changed - user logged out'); // Debug log
          set({ currentUser: null, userProfile: null, loading: false });
        }
      });
      return unsubscribe;
    } catch (error) {
      console.log("Firebase not configured, using mock auth");
      set({ currentUser: null, userProfile: null, loading: false });
      return () => {};
    }
  },

  signup: async (email, password, name) => {
    set({ error: null, loading: true });
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      
      // Create user profile in Firestore
      const userProfile = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: name,
        role: 'customer',
        createdAt: new Date().toISOString(),
        addresses: [],
        preferences: {
          currency: 'USD',
          language: 'en'
        }
      };
      
      await setDoc(doc(db, "users", userCredential.user.uid), userProfile);
      set({ currentUser: userCredential.user, userProfile, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ error: null, loading: true });
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // CRITICAL: Fetch user profile from Firestore to get role information
      const userDocRef = doc(db, "users", userCredential.user.uid);
      const userDocSnap = await getDoc(userDocRef);
      
      let userProfile = null;
      if (userDocSnap.exists()) {
        userProfile = userDocSnap.data();
        console.log('User profile fetched on login:', userProfile); // Debug log
      } else {
        console.warn('User document not found in Firestore for UID:', userCredential.user.uid);
      }
      
      set({ currentUser: userCredential.user, userProfile, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  loginWithGoogle: async () => {
    set({ error: null, loading: true });
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // CRITICAL: Fetch or create user profile from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      let userProfile;
      
      if (!userDocSnap.exists()) {
        // Create new user profile for Google OAuth users
        userProfile = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: 'customer',
          createdAt: new Date().toISOString(),
          addresses: [],
          preferences: {
            currency: 'USD',
            language: 'en'
          }
        };
        await setDoc(userDocRef, userProfile);
        console.log('Created new user profile for Google OAuth:', userProfile);
      } else {
        userProfile = userDocSnap.data();
        console.log('Existing user profile fetched for Google OAuth:', userProfile);
      }
      
      set({ currentUser: user, userProfile, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await signOut(auth);
      set({ currentUser: null, userProfile: null, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  updateProfile: async (updates) => {
    const { currentUser } = get();
    if (!currentUser) throw new Error("No user logged in");
    
    set({ loading: true });
    try {
      await setDoc(doc(db, "users", currentUser.uid), updates, { merge: true });
      set({ userProfile: { ...get().userProfile, ...updates }, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}),
    {
      name: "auth-storage",
      partialize: (state) => ({ 
        currentUser: state.currentUser,
        userProfile: state.userProfile 
      }),
    }
  )
);