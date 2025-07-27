@@ .. @@
 import React from "react";
+import { Link } from "react-router-dom";
 import { useAuthStore } from "../store/authStore";
-import OrdersPage from "./OrdersPage";
-import WishlistPage from "./WishlistPage";
+import { useOrderStore } from "../store/orderStore";
+import { useWishlistStore } from "../store/wishlistStore";

 export default function AccountPage() {
-  const { currentUser } = useAuthStore();
+  const { currentUser, userProfile, logout } = useAuthStore();
+  const { userOrders } = useOrderStore();
+  const { wishlist } = useWishlistStore();

   if (!currentUser) {
-    return <div className="p-10 text-center">Please login to view your account.</div>;
+    return (
+      <div className="min-h-screen bg-organic-background flex items-center justify-center">
+        <div className="text-center">
+          <h2 className="text-2xl font-bold text-organic-text mb-4">Please login to view your account</h2>
+          <Link 
+            to="/login" 
+            className="bg-organic-primary text-white px-6 py-3 rounded-lg hover:opacity-90"
+          >
+            Login
+          </Link>
+        </div>
+      </div>
+    );
   }

   return (
-    <div className="max-w-2xl mx-auto p-6">
-      <h1 className="text-3xl font-bold mb-3">Account</h1>
-      <div className="mb-2 font-semibold">Name: {currentUser.displayName}</div>
-      <div className="mb-4 font-semibold">Email: {currentUser.email}</div>
-      <OrdersPage />
-      <WishlistPage />
+    <div className="min-h-screen bg-organic-background py-8">
+      <div className="max-w-4xl mx-auto px-6">
+        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
+          <div className="flex items-center justify-between mb-6">
+            <h1 className="text-3xl font-bold text-organic-text">My Account</h1>
+            <button
+              onClick={logout}
+              className="text-red-600 hover:text-red-800 font-medium"
+            >
+              Logout
+            </button>
+          </div>
+          
+          <div className="grid md:grid-cols-2 gap-8">
+            <div>
+              <h2 className="text-xl font-semibold text-organic-text mb-4">Profile Information</h2>
+              <div className="space-y-3">
+                <div>
+                  <label className="block text-sm font-medium text-organic-text opacity-75">Name</label>
+                  <p className="text-organic-text">{currentUser.displayName || 'Not provided'}</p>
+                </div>
+                <div>
+                  <label className="block text-sm font-medium text-organic-text opacity-75">Email</label>
+                  <p className="text-organic-text">{currentUser.email}</p>
+                </div>
+                <div>
+                  <label className="block text-sm font-medium text-organic-text opacity-75">Member Since</label>
+                  <p className="text-organic-text">
+                    {userProfile?.createdAt ? 
+                      new Date(userProfile.createdAt).toLocaleDateString() : 
+                      'Recently joined'
+                    }
+                  </p>
+                </div>
+              </div>
+              
+              <button className="mt-6 bg-organic-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition-all">
+                Edit Profile
+              </button>
+            </div>
+            
+            <div>
+              <h2 className="text-xl font-semibold text-organic-text mb-4">Account Statistics</h2>
+              <div className="grid grid-cols-2 gap-4">
+                <div className="bg-organic-background p-4 rounded-lg text-center">
+                  <p className="text-2xl font-bold text-organic-primary">{userOrders?.length || 0}</p>
+                  <p className="text-sm text-organic-text opacity-75">Total Orders</p>
+                </div>
+                <div className="bg-organic-background p-4 rounded-lg text-center">
+                  <p className="text-2xl font-bold text-organic-highlight">{wishlist?.length || 0}</p>
+                  <p className="text-sm text-organic-text opacity-75">Wishlist Items</p>
+                </div>
+              </div>
+            </div>
+          </div>
+        </div>

+        {/* Quick Actions */}
+        <div className="grid md:grid-cols-3 gap-6">
+          <Link 
+            to="/orders" 
+            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all text-center group"
+          >
+            <div className="w-12 h-12 bg-organic-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
+              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
+                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
+              </svg>
+            </div>
+            <h3 className="text-lg font-semibold text-organic-text mb-2">My Orders</h3>
+            <p className="text-organic-text opacity-75 text-sm">View and track your orders</p>
+          </Link>
+          
+          <Link 
+            to="/wishlist" 
+            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all text-center group"
+          >
+            <div className="w-12 h-12 bg-organic-highlight rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
+              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
+                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
+              </svg>
+            </div>
+            <h3 className="text-lg font-semibold text-organic-text mb-2">My Wishlist</h3>
+            <p className="text-organic-text opacity-75 text-sm">Manage your saved items</p>
+          </Link>
+          
+          <Link 
+            to="/shop" 
+            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all text-center group"
+          >
+            <div className="w-12 h-12 bg-organic-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
+              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
+                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
+              </svg>
+            </div>
+            <h3 className="text-lg font-semibold text-organic-text mb-2">Continue Shopping</h3>
+            <p className="text-organic-text opacity-75 text-sm">Discover more products</p>
+          </Link>
+        </div>
+      </div>
     </div>
   );
 }