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
        // Check if we have a demo user in localStorage
        const demoAuth = localStorage.getItem('demo-auth-storage');
        if (demoAuth) {
          try {
            const { currentUser, userProfile } = JSON.parse(demoAuth);
            set({ currentUser, userProfile, loading: false });
          } catch (e) {
            set({ currentUser: null, userProfile: null, loading: false });
          }
        } else {
          set({ currentUser: null, userProfile: null, loading: false });
        }
        return () => {};
      }
      
      if (!auth.onAuthStateChanged) {
        console.warn('Firebase auth not properly initialized, using demo mode');
        set({ currentUser: null, userProfile: null, loading: false });
        return () => {};
      }
      
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          // CRITICAL: Always fetch fresh user profile from Firestore on auth state change
          try {
            if (!db) {
              set({ currentUser: user, userProfile: null, loading: false });
              return;
            }
            
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);
            const userProfile = userDocSnap.exists() ? userDocSnap.data() : null;
            
            set({ currentUser: user, userProfile, loading: false });
          } catch (error) {
            console.error("Error fetching user profile:", error);
            set({ currentUser: user, userProfile: null, loading: false });
          }
        } else {
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
      // Check if Firebase is configured
      if (!auth || !import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY.includes('placeholder')) {
        // Demo mode - simulate successful signup
        const demoUser = {
          uid: 'demo-user-' + Date.now(),
          email: email,
          displayName: name
        };
        
        const demoProfile = {
          uid: demoUser.uid,
          email: demoUser.email,
          displayName: name,
          role: email.includes('admin') ? 'admin' : 'customer',
          createdAt: new Date().toISOString()
        };
        
        // Save to localStorage for demo persistence
        localStorage.setItem('demo-auth-storage', JSON.stringify({
          currentUser: demoUser,
          userProfile: demoProfile
        }));
        
        set({ currentUser: demoUser, userProfile: demoProfile, loading: false });
        return;
      }
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      
      // Create user profile in Firestore
      if (db) {
        const userProfile = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: name,
          role: 'customer',
          createdAt: new Date().toISOString(),
          addresses: [],
          preferences: {
            currency: 'INR',
            language: 'en'
          }
        };
        
        await setDoc(doc(db, "users", userCredential.user.uid), userProfile);
        set({ currentUser: userCredential.user, userProfile, loading: false });
      } else {
        // Demo mode - create mock profile
        const mockProfile = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: name,
          role: 'customer',
          createdAt: new Date().toISOString()
        };
        set({ currentUser: userCredential.user, userProfile: mockProfile, loading: false });
        }
    } catch (error) {
      // Provide user-friendly error messages
      let errorMessage = "Account creation failed. Please try again.";
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "An account with this email already exists. Please try logging in instead.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Please enter a valid email address.";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "Password should be at least 6 characters long.";
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = "Email/password accounts are not enabled. Please contact support.";
      }
      
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ error: null, loading: true });
    try {
      // Check if Firebase is configured
      if (!auth || !import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY.includes('placeholder')) {
        // Demo mode - simulate successful login
        const demoUser = {
          uid: 'demo-user-123',
          email: email,
          displayName: email.split('@')[0]
        };
        
        const demoProfile = {
          uid: demoUser.uid,
          email: demoUser.email,
          displayName: demoUser.displayName,
          role: email.includes('admin') ? 'admin' : 'customer',
          createdAt: new Date().toISOString()
        };
        
        // Save to localStorage for demo persistence
        localStorage.setItem('demo-auth-storage', JSON.stringify({
          currentUser: demoUser,
          userProfile: demoProfile
        }));
        
        set({ currentUser: demoUser, userProfile: demoProfile, loading: false });
        return;
      }
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // CRITICAL: Fetch user profile from Firestore to get role information
      if (db) {
        const userDocRef = doc(db, "users", userCredential.user.uid);
        const userDocSnap = await getDoc(userDocRef);
        
        let userProfile = null;
        if (userDocSnap.exists()) {
          userProfile = userDocSnap.data();
        } else {
          console.warn('User document not found in Firestore for UID:', userCredential.user.uid);
        }
        
        set({ currentUser: userCredential.user, userProfile, loading: false });
      } else {
        // Demo mode - create mock profile
        const mockProfile = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: userCredential.user.displayName,
          role: 'customer',
          createdAt: new Date().toISOString()
        };
        set({ currentUser: userCredential.user, userProfile: mockProfile, loading: false });
      }
    } catch (error) {
      // Provide user-friendly error messages
      let errorMessage = "Login failed. Please check your credentials.";
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = "No account found with this email address.";
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = "Incorrect password. Please try again.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Please enter a valid email address.";
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = "This account has been disabled. Please contact support.";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Too many failed attempts. Please try again later.";
      }
      
      set({ error: errorMessage, loading: false });
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
      } else {
        userProfile = userDocSnap.data();
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