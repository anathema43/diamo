// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Check if Firebase is properly configured
const isFirebaseConfigured = Object.values(firebaseConfig).every(value => 
  value && 
  value !== 'undefined' && 
  value !== '' && 
  !value.toString().includes('placeholder') && 
  !value.toString().includes('your_') &&
  !value.toString().includes('null')
);

if (!isFirebaseConfigured) {
  console.info('ℹ️ Firebase not configured yet. Running in demo mode.');
  console.info('To enable full functionality, please configure Firebase in your .env file.');
}

// Initialize Firebase only if properly configured
let app, auth, db, storage, functions;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    functions = getFunctions(app);
    console.info('✅ Firebase initialized successfully');
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error);
    // Create mock services to prevent app crashes
    auth = null;
    db = null;
    storage = null;
    functions = null;
  }
} else {
  // Create mock services for demo mode
  console.info('🔧 Running in demo mode without Firebase');
  auth = null;
  db = null;
  storage = null;
  functions = null;
}

export { auth, db, storage, functions };

// Enable offline persistence for Firestore
import { enableNetwork, disableNetwork } from "firebase/firestore";

export const enableOffline = () => disableNetwork(db);
export const enableOnline = () => enableNetwork(db);

export default app;
