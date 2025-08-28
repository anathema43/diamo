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
  console.error('🔥 Firebase Configuration Error');
  console.error('====================================');
  console.error('Firebase is not properly configured. Please follow these steps:');
  console.error('');
  console.error('1. Create a .env file in your project root (copy from .env.example)');
  console.error('2. Go to Firebase Console: https://console.firebase.google.com');
  console.error('3. Select your project → Project Settings → General');
  console.error('4. Scroll down to "Your apps" and find your web app');
  console.error('5. Copy the config values and update your .env file');
  console.error('');
  console.error('Current config status:');
  Object.entries(firebaseConfig).forEach(([key, value]) => {
    const status = value && value !== 'undefined' && !value.toString().includes('your_') ? '✅' : '❌';
    console.error(`${status} ${key}: ${value ? 'Set' : 'Missing'}`);
  });
  console.error('');
  
  // In development, show warning but don't crash the app
  if (import.meta.env.DEV) {
    console.error('🔧 Development mode: Please configure Firebase to continue.');
    // Don't initialize Firebase with invalid config
    throw new Error('Firebase configuration required. Please set up your .env file with valid Firebase credentials.');
  } else {
    // Only throw error in production
    throw new Error('Firebase configuration is required. Please set up your environment variables.');
  }
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

// Enable offline persistence for Firestore
import { enableNetwork, disableNetwork } from "firebase/firestore";

export const enableOffline = () => disableNetwork(db);
export const enableOnline = () => enableNetwork(db);

export default app;
