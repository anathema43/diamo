import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AccountPage from "./pages/AccountPage";
import CheckoutPage from "./pages/CheckoutPage";
import AdminPage from "./pages/AdminPage";
import { useAuthStore } from "./store/authStore";

function App() {
  const { fetchUser } = useAuthStore();
  
  useEffect(() => {
    try {
      const unsub = fetchUser();
      return () => unsub && unsub();
    } catch (error) {
      console.log("Auth not configured yet");
    }
  }, [fetchUser]);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-himalaya-light to-blue-200">
        <Navbar />
        <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
        </main>
      </div>
    </Router>
  );
}
export default App;
