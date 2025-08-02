import React, { useEffect, useState } from "react";
import { useProductStore } from "../store/productStore";
import { useOrderStore } from "../store/orderStore";
import { useArtisanStore } from "../store/artisanStore";
import { useInventoryStore } from "../store/inventoryStore";
import formatCurrency from "../utils/formatCurrency";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductFormModal from "../components/ProductFormModal";
import ArtisanFormModal from "../components/ArtisanFormModal.jsx";
import { 
  TrashIcon, 
  PencilIcon, 
  ExclamationTriangleIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  ArrowTopRightOnSquareIcon
} from "@heroicons/react/24/outline";

export default function Admin() {
  const {
    products,
    fetchProducts,
    loading: productsLoading,
  } = useProductStore();

  const {
    orders,
    fetchOrders,
    updateOrderStatus,
    getOrderStats,
    loading: ordersLoading,
  } = useOrderStore();

  const {
    artisans,
    fetchArtisans,
    loading: artisansLoading,
  } = useArtisanStore();

  const {
    lowStockItems,
    fetchLowStockProducts,
    loading: inventoryLoading
  } = useInventoryStore();

  const [productSearchTerm, setProductSearchTerm] = useState("");
  const [showProductModal, setShowProductModal] = useState(false);
  const [showArtisanModal, setShowArtisanModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingArtisan, setEditingArtisan] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchArtisans();
    fetchLowStockProducts();
  }, [fetchProducts, fetchOrders, fetchArtisans, fetchLowStockProducts]);

  const stats = getOrderStats();
  
  // Calculate today's revenue
  const today = new Date().toDateString();
  const todaysOrders = orders.filter(order => 
    new Date(order.createdAt).toDateString() === today
  );
  const todaysRevenue = todaysOrders.reduce((sum, order) => sum + (order.total || 0), 0);

  // Filter products by search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(productSearchTerm.toLowerCase())
  );

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowProductModal(true);
  };

  const handleEditArtisan = (artisan) => {
    setEditingArtisan(artisan);
    setShowArtisanModal(true);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowProductModal(true);
  };

  const handleAddArtisan = () => {
    setEditingArtisan(null);
    setShowArtisanModal(true);
  };

  const handleCloseModals = () => {
    setShowProductModal(false);
    setShowArtisanModal(false);
    setEditingProduct(null);
    setEditingArtisan(null);
  };

  if (productsLoading || ordersLoading || artisansLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-organic-background py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-organic-text">Darjeeling Soul Admin</h1>
            <p className="text-organic-text opacity-75">Welcome back! Here's your daily snapshot.</p>
          </div>
          <div className="flex gap-3">
            <a 
              href="/" 
              target="_blank"
              className="flex items-center gap-2 bg-organic-highlight text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all"
            >
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              View Live Site
            </a>
            <button className="bg-organic-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all">
              Logout
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-organic-text mb-2">📦 New Orders</h3>
                <p className="text-3xl font-bold text-blue-600">{stats.processing}</p>
              </div>
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                View & Process →
              </button>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-organic-text mb-2">💰 Today's Revenue</h3>
                <p className="text-3xl font-bold text-green-600">{formatCurrency(todaysRevenue)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-organic-text mb-2">📉 Low Stock Items</h3>
                <p className="text-3xl font-bold text-orange-600">{lowStockItems.length}</p>
              </div>
              <button className="text-orange-600 hover:text-orange-800 font-medium">
                View & Update →
              </button>
            </div>
          </div>
        </div>

        {/* Low Stock Alert */}
        {lowStockItems.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600" />
              <h3 className="text-lg font-semibold text-yellow-800">Low Stock Alert</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lowStockItems.slice(0, 6).map(item => (
                <div key={item.id} className="bg-white p-4 rounded border">
                  <h4 className="font-medium text-organic-text">{item.name}</h4>
                  <p className="text-sm text-red-600">Only {item.quantity || item.quantityAvailable} left</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-organic-text">📋 Recent Orders</h2>
            <button className="text-organic-primary hover:text-organic-text font-medium">
              View All Orders →
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Order ID</th>
                  <th className="text-left py-2">Customer</th>
                  <th className="text-left py-2">Total</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-left py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="py-2 font-mono text-sm">{order.orderNumber || order.id.slice(0, 8)}</td>
                    <td className="py-2">{order.userEmail}</td>
                    <td className="py-2 font-semibold">{formatCurrency(order.total)}</td>
                    <td className="py-2">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="border rounded px-2 py-1 text-sm focus:ring-2 focus:ring-organic-primary focus:border-transparent"
                      >
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-2 text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Product Management */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-organic-text">🍵 Product Management</h2>
            <button
              onClick={handleAddProduct}
              className="flex items-center gap-2 bg-organic-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all"
            >
              <PlusIcon className="w-4 h-4" />
              Add New Product
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="🔍 Search products to edit..."
              value={productSearchTerm}
              onChange={(e) => setProductSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-organic-primary focus:border-transparent"
            />
          </div>

          {/* Products List */}
          <div className="space-y-3">
            {filteredProducts.slice(0, 8).map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium text-organic-text">{product.name}</h3>
                    <p className="text-sm text-gray-600">{formatCurrency(product.price)} • Stock: {product.quantityAvailable}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleEditProduct(product)}
                  className="flex items-center gap-2 text-organic-primary hover:text-organic-text font-medium"
                >
                  <PencilIcon className="w-4 h-4" />
                  Edit
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <button className="text-organic-primary hover:text-organic-text font-medium">
              View All Products →
            </button>
          </div>
        </div>

        {/* Artisan Management */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-organic-text">👩‍🎨 Artisan Management</h2>
            <button
              onClick={handleAddArtisan}
              className="flex items-center gap-2 bg-organic-highlight text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all"
            >
              <PlusIcon className="w-4 h-4" />
              Add New Artisan
            </button>
          </div>

          {/* Artisans List */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {artisans.slice(0, 6).map((artisan) => (
              <div key={artisan.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center gap-3 mb-3">
                  <img 
                    src={artisan.profileImage} 
                    alt={artisan.name} 
                    className="w-10 h-10 object-cover rounded-full"
                  />
                  <div>
                    <h3 className="font-medium text-organic-text">{artisan.name}</h3>
                    <p className="text-sm text-gray-600">{artisan.location}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{artisan.experience} years exp.</span>
                  <button
                    onClick={() => handleEditArtisan(artisan)}
                    className="flex items-center gap-1 text-organic-primary hover:text-organic-text text-sm font-medium"
                  >
                    <PencilIcon className="w-3 h-3" />
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <button className="text-organic-primary hover:text-organic-text font-medium">
              View All Artisans →
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showProductModal && (
        <ProductFormModal
          product={editingProduct}
          artisans={artisans}
          onClose={handleCloseModals}
          onSave={() => {
            handleCloseModals();
            fetchProducts(); // Refresh products list
          }}
        />
      )}

      {showArtisanModal && (
        <ArtisanFormModal
          artisan={editingArtisan}
          onClose={handleCloseModals}
          onSave={() => {
            handleCloseModals();
            fetchArtisans(); // Refresh artisans list
          }}
        />
      )}
    </div>
  );
}