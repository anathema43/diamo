import React, { useEffect, useState } from "react";
import { useProductStore } from "../store/productStore";
import { useOrderStore } from "../store/orderStore";
import { useArtisanStore } from "../store/artisanStore";
import { useInventoryStore } from "../store/inventoryStore";
import formatCurrency from "../utils/formatCurrency";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductFormModal from "../components/ProductFormModal";
import ArtisanFormModal from "../components/ArtisanFormModal.jsx";
import BulkProductUpload from "../components/BulkProductUpload";
import AdminAlgoliaSync from "../components/AdminAlgoliaSync";
import ArtisanSeedButton from "../components/ArtisanSeedButton";
import AdminSeedButton from "../components/AdminSeedButton";
import StoryEditor from "../components/StoryEditor";
import ContentEditor from "../components/ContentEditor";
import AnalyticsDashboard from "../components/AnalyticsDashboard";
import { 
  TrashIcon, 
  PencilIcon, 
  ExclamationTriangleIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  ArrowTopRightOnSquareIcon,
  ChartBarIcon,
  CogIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  ClockIcon,
  TruckIcon,
  EnvelopeIcon
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

  const [activeTab, setActiveTab] = useState('dashboard');
  const [productSearchTerm, setProductSearchTerm] = useState("");
  const [orderSearchTerm, setOrderSearchTerm] = useState("");
  const [showProductModal, setShowProductModal] = useState(false);
  const [showArtisanModal, setShowArtisanModal] = useState(false);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingArtisan, setEditingArtisan] = useState(null);
  const [editingStory, setEditingStory] = useState(null);
  const [stories, setStories] = useState([]);

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
    product.name.toLowerCase().includes(productSearchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(productSearchTerm.toLowerCase()) ||
    (product.sku && product.sku.toLowerCase().includes(productSearchTerm.toLowerCase()))
  );

  // Filter orders by search term
  const filteredOrders = orders.filter(order =>
    order.orderNumber?.toLowerCase().includes(orderSearchTerm.toLowerCase()) ||
    order.userEmail?.toLowerCase().includes(orderSearchTerm.toLowerCase()) ||
    order.status?.toLowerCase().includes(orderSearchTerm.toLowerCase())
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

  const handleAddStory = () => {
    setEditingStory(null);
    setShowStoryModal(true);
  };

  const handleEditStory = (story) => {
    setEditingStory(story);
    setShowStoryModal(true);
  };

  const handleCloseModals = () => {
    setShowProductModal(false);
    setShowArtisanModal(false);
    setShowStoryModal(false);
    setEditingProduct(null);
    setEditingArtisan(null);
    setEditingStory(null);
  };

  if (productsLoading || ordersLoading || artisansLoading) {
    return <LoadingSpinner />;
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: ChartBarIcon },
    { id: 'products', label: 'Products', icon: ShoppingBagIcon },
    { id: 'orders', label: 'Orders', icon: ClockIcon },
    { id: 'artisans', label: 'Artisans', icon: UserGroupIcon },
    { id: 'inventory', label: 'Inventory', icon: TruckIcon },
    { id: 'stories', label: 'Stories', icon: PencilIcon },
    { id: 'pages', label: 'Pages', icon: DocumentTextIcon },
    { id: 'analytics', label: 'Analytics', icon: ChartBarIcon },
    { id: 'settings', label: 'Settings', icon: CogIcon }
  ];

  return (
    <div className="min-h-screen bg-organic-background py-8" data-cy="admin-dashboard">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-organic-text">Darjeeling Souls Admin</h1>
            <p className="text-organic-text opacity-75">Manage your authentic Darjeeling marketplace</p>
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
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="border-b">
            <nav className="flex space-x-8 px-6 overflow-x-auto">
              {tabs.map(tab => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-organic-primary text-organic-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-organic-text mb-2">📦 New Orders</h3>
                    <p className="text-3xl font-bold text-blue-600">{stats.processing}</p>
                  </div>
                  <ClockIcon className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-sm text-gray-600 mt-2">Orders awaiting processing</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-organic-text mb-2">💰 Today's Revenue</h3>
                    <p className="text-3xl font-bold text-green-600">{formatCurrency(todaysRevenue)}</p>
                  </div>
                  <CurrencyDollarIcon className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-sm text-gray-600 mt-2">Revenue from today's orders</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-organic-text mb-2">📉 Low Stock Items</h3>
                    <p className="text-3xl font-bold text-orange-600">{lowStockItems.length}</p>
                  </div>
                  <ExclamationTriangleIcon className="w-8 h-8 text-orange-600" />
                </div>
                <p className="text-sm text-gray-600 mt-2">Items needing restock</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-organic-text mb-2">👥 Total Products</h3>
                    <p className="text-3xl font-bold text-purple-600">{products.length}</p>
                  </div>
                  <ShoppingBagIcon className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-sm text-gray-600 mt-2">Products in catalog</p>
              </div>
            </div>

            {/* Low Stock Alert */}
            {lowStockItems.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600" />
                  <h3 className="text-lg font-semibold text-yellow-800">Low Stock Alert</h3>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {lowStockItems.slice(0, 6).map(item => (
                    <div key={item.id} className="bg-white p-4 rounded border">
                      <h4 className="font-medium text-organic-text">{item.name}</h4>
                      <p className="text-sm text-red-600">Only {item.quantity || item.quantityAvailable} left</p>
                      <button 
                        onClick={() => setActiveTab('inventory')}
                        className="text-xs text-organic-primary hover:underline mt-1"
                      >
                        Manage Stock →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-organic-text">📋 Recent Orders</h2>
                <button 
                  onClick={() => setActiveTab('orders')}
                  className="text-organic-primary hover:text-organic-text font-medium"
                >
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
                      <th className="text-left py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="py-2 font-mono text-sm">{order.orderNumber || order.id.slice(0, 8)}</td>
                        <td className="py-2">{order.userEmail}</td>
                        <td className="py-2 font-semibold">{formatCurrency(order.total)}</td>
                        <td className="py-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-2 text-sm">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-2">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className="text-xs border rounded px-2 py-1 focus:ring-2 focus:ring-organic-primary focus:border-transparent"
                          >
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-organic-text mb-4">🛍️ Product Management</h3>
                <div className="space-y-3">
                  <button
                    onClick={handleAddProduct}
                    className="w-full flex items-center gap-2 bg-organic-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all"
                  >
                    <PlusIcon className="w-4 h-4" />
                    Add New Product
                  </button>
                  <button
                    onClick={() => setActiveTab('products')}
                    className="w-full text-organic-primary hover:text-organic-text font-medium text-sm"
                  >
                    Manage All Products →
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-organic-text mb-4">👨‍🎨 Artisan Management</h3>
                <div className="space-y-3">
                  <button
                    onClick={handleAddArtisan}
                    className="w-full flex items-center gap-2 bg-organic-highlight text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all"
                  >
                    <PlusIcon className="w-4 h-4" />
                    Add New Artisan
                  </button>
                  <button
                    onClick={() => setActiveTab('artisans')}
                    className="w-full text-organic-primary hover:text-organic-text font-medium text-sm"
                  >
                    Manage All Artisans →
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-organic-text mb-4">📊 Analytics</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Revenue:</span>
                    <span className="font-semibold">{formatCurrency(stats.totalRevenue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Orders This Month:</span>
                    <span className="font-semibold">{stats.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Artisans:</span>
                    <span className="font-semibold">{artisans.length}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Database Setup */}
            <div className="grid md:grid-cols-2 gap-6">
              <AdminSeedButton />
              <ArtisanSeedButton />
            </div>

            {/* Search Management */}
            <AdminAlgoliaSync />
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-organic-text">🍵 Product Management</h2>
                <div className="flex gap-3">
                  <button
                    onClick={handleAddProduct}
                    className="flex items-center gap-2 bg-organic-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all"
                  >
                    <PlusIcon className="w-4 h-4" />
                    Add Product
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="🔍 Search products by name, category, or SKU..."
                  value={productSearchTerm}
                  onChange={(e) => setProductSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-organic-primary focus:border-transparent"
                />
              </div>

              {/* Products Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left py-3 px-4">Image</th>
                      <th className="text-left py-3 px-4">Product</th>
                      <th className="text-left py-3 px-4">Category</th>
                      <th className="text-left py-3 px-4">Price</th>
                      <th className="text-left py-3 px-4">Stock</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-12 h-12 object-cover rounded"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-organic-text">{product.name}</p>
                            <p className="text-sm text-gray-600">{product.sku}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="capitalize text-sm">{product.category}</span>
                        </td>
                        <td className="py-3 px-4 font-semibold">{formatCurrency(product.price)}</td>
                        <td className="py-3 px-4">
                          <span className={`${
                            product.quantityAvailable <= 5 ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {product.quantityAvailable}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            product.featured ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {product.featured ? 'Featured' : 'Regular'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="text-organic-primary hover:text-organic-text"
                              title="Edit Product"
                            >
                              <PencilIcon className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => window.open(`/products/${product.id}`, '_blank')}
                              className="text-blue-600 hover:text-blue-800"
                              title="View Product"
                            >
                              <EyeIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No products found matching your search.</p>
                </div>
              )}
            </div>

            {/* Bulk Upload */}
            <BulkProductUpload onUploadComplete={() => fetchProducts()} />
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-organic-text">📋 Order Management</h2>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={orderSearchTerm}
                    onChange={(e) => setOrderSearchTerm(e.target.value)}
                    className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-organic-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-3 px-4">Order ID</th>
                    <th className="text-left py-3 px-4">Customer</th>
                    <th className="text-left py-3 px-4">Items</th>
                    <th className="text-left py-3 px-4">Total</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono text-sm">{order.orderNumber || order.id.slice(0, 8)}</td>
                      <td className="py-3 px-4">{order.userEmail}</td>
                      <td className="py-3 px-4">
                        <span className="text-sm">{order.items?.length || 0} items</span>
                      </td>
                      <td className="py-3 px-4 font-semibold">{formatCurrency(order.total)}</td>
                      <td className="py-3 px-4">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="text-xs border rounded px-2 py-1 focus:ring-2 focus:ring-organic-primary focus:border-transparent"
                        >
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => {/* View order details */}}
                          className="text-organic-primary hover:text-organic-text"
                          title="View Details"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Artisans Tab */}
        {activeTab === 'artisans' && (
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

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artisans.map((artisan) => (
                <div key={artisan.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-center gap-3 mb-3">
                    <img 
                      src={artisan.profileImage} 
                      alt={artisan.name} 
                      className="w-12 h-12 object-cover rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-organic-text">{artisan.name}</h3>
                      <p className="text-sm text-gray-600">{artisan.location}</p>
                      {artisan.featured && (
                        <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full mt-1">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{artisan.experience} years exp.</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditArtisan(artisan)}
                        className="text-organic-primary hover:text-organic-text"
                        title="Edit Artisan"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => window.open(`/artisans/${artisan.id}`, '_blank')}
                        className="text-blue-600 hover:text-blue-800"
                        title="View Profile"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Inventory Tab */}
        {activeTab === 'inventory' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-organic-text mb-6">📦 Inventory Management</h2>
            
            {/* Inventory Overview */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-green-600">
                  {products.filter(p => p.quantityAvailable > 10).length}
                </p>
                <p className="text-sm text-green-700">Well Stocked</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-yellow-600">
                  {products.filter(p => p.quantityAvailable <= 10 && p.quantityAvailable > 5).length}
                </p>
                <p className="text-sm text-yellow-700">Medium Stock</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-orange-600">
                  {products.filter(p => p.quantityAvailable <= 5 && p.quantityAvailable > 0).length}
                </p>
                <p className="text-sm text-orange-700">Low Stock</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-red-600">
                  {products.filter(p => p.quantityAvailable === 0).length}
                </p>
                <p className="text-sm text-red-700">Out of Stock</p>
              </div>
            </div>

            {/* Low Stock Items */}
            {lowStockItems.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-organic-text mb-4">⚠️ Items Needing Attention</h3>
                <div className="space-y-3">
                  {lowStockItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div>
                          <h4 className="font-medium text-organic-text">{item.name}</h4>
                          <p className="text-sm text-red-600">Only {item.quantity || item.quantityAvailable} left</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleEditProduct(item)}
                        className="bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700"
                      >
                        Update Stock
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All Products Inventory */}
            <div>
              <h3 className="text-lg font-semibold text-organic-text mb-4">📋 All Products Inventory</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left py-2 px-3">Product</th>
                      <th className="text-left py-2 px-3">Current Stock</th>
                      <th className="text-left py-2 px-3">Status</th>
                      <th className="text-left py-2 px-3">Last Updated</th>
                      <th className="text-left py-2 px-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b">
                        <td className="py-2 px-3">
                          <div className="flex items-center gap-2">
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="w-8 h-8 object-cover rounded"
                            />
                            <span className="font-medium">{product.name}</span>
                          </div>
                        </td>
                        <td className="py-2 px-3 font-semibold">{product.quantityAvailable}</td>
                        <td className="py-2 px-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            product.quantityAvailable === 0 ? 'bg-red-100 text-red-800' :
                            product.quantityAvailable <= 5 ? 'bg-orange-100 text-orange-800' :
                            product.quantityAvailable <= 10 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {product.quantityAvailable === 0 ? 'Out of Stock' :
                             product.quantityAvailable <= 5 ? 'Low Stock' :
                             product.quantityAvailable <= 10 ? 'Medium Stock' :
                             'In Stock'}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-sm text-gray-600">
                          {product.updatedAt ? new Date(product.updatedAt).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="py-2 px-3">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="text-organic-primary hover:text-organic-text text-sm"
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Stories Tab */}
        {activeTab === 'stories' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-organic-text">📖 Stories Management</h2>
                <button
                  onClick={handleAddStory}
                  className="flex items-center gap-2 bg-organic-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all"
                >
                  <PlusIcon className="w-4 h-4" />
                  Create New Story
                </button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-blue-800 mb-2">📝 Story Ideas for Food Products</h3>
                <div className="text-sm text-blue-700 space-y-1">
                  <p>• <strong>Artisan Profiles:</strong> "Meet Deepak: The Pickle Master of Darjeeling"</p>
                  <p>• <strong>Process Stories:</strong> "From Hive to Jar: The Journey of Wild Himalayan Honey"</p>
                  <p>• <strong>Seasonal Updates:</strong> "Spring Harvest: Fresh Vegetables for Traditional Pickles"</p>
                  <p>• <strong>Cultural Context:</strong> "The Role of Pickles in Darjeeling Family Traditions"</p>
                  <p>• <strong>Community Impact:</strong> "How Your Purchase Supports 8 Families in Darjeeling"</p>
                   <p>• <strong>Events & News:</strong> "Darjeeling Tea Festival 2024: Celebrating Heritage"</p>
                   <p>• <strong>Behind the Scenes:</strong> "A Day in the Life of a Honey Collector"</p>
                   <p>• <strong>Quality Stories:</strong> "Why Our Organic Certification Matters"</p>
                </div>
              </div>

              {/* Stories Management */}
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-organic-text">Published Stories</h3>
                  <div className="flex items-center gap-3">
                    <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                      <option value="all">All Categories</option>
                      <option value="events">Events</option>
                      <option value="artisan-story">Artisan Stories</option>
                      <option value="food-culture">Food Culture</option>
                      <option value="news">News</option>
                    </select>
                    <Link 
                      to="/stories"
                      target="_blank"
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View Live Stories Page →
                    </Link>
                  </div>
                </div>
                
                {/* Stories List */}
                {stories.length === 0 ? (
                  <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">No Stories Yet</h3>
                    <p className="text-gray-500 mb-4">Create your first story to engage customers with authentic content</p>
                    <button
                      onClick={handleAddStory}
                      className="bg-organic-primary text-white px-6 py-3 rounded-lg hover:opacity-90"
                    >
                      Create First Story
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {stories.slice(0, 10).map((story) => (
                      <div key={story.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <>
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-medium text-organic-text">{story.title}</h3>
                                {story.featured && (
                                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                                    Featured
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mt-1">
                                By {story.author} • {(story.category || '').replace('-', ' ')} • {story.readTime}
                              </p>
                              <p className="text-sm text-gray-700 mt-2 line-clamp-2">{story.excerpt}</p>
                              <p className="text-xs text-gray-500 mt-2">
                                Published: {new Date(story.publishedAt).toLocaleDateString()}
                              </p>
                            </>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <button
                              onClick={() => handleEditStory(story)}
                              className="text-organic-primary hover:text-organic-text text-sm font-medium"
                            >
                              Edit
                            </button>
                            <Link 
                              to={`/stories/${story.id}`}
                              target="_blank"
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              View
                            </Link>
                            <button
                              onClick={() => handleDeleteStory(story.id)}
                              className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Pages Tab */}
        {activeTab === 'pages' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-organic-text mb-6">📄 Page Content Management</h2>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-green-800 mb-2">✨ Easy Content Editing</h3>
                <p className="text-sm text-green-700">
                  You can now edit any page content directly! Just visit the page and look for the edit button (pencil icon) 
                  in the top-right corner when logged in as admin.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { id: 'about', title: 'About Us', description: 'Company story and mission' },
                  { id: 'contact', title: 'Contact', description: 'Contact information and form' },
                  { id: 'shipping-policy', title: 'Shipping Policy', description: 'Shipping terms and delivery info' },
                  { id: 'privacy-policy', title: 'Privacy Policy', description: 'Privacy and data protection' },
                  { id: 'refund-policy', title: 'Refund Policy', description: 'Return and refund terms' },
                  { id: 'terms-of-use', title: 'Terms of Use', description: 'Terms and conditions' }
                ].map(page => (
                  <div key={page.id} className="border rounded-lg p-4">
                    <h3 className="font-medium text-organic-text mb-2">{page.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{page.description}</p>
                    <div className="flex gap-2">
                      <Link 
                        to={`/${page.id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View Page
                      </Link>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-600">
                        Edit directly on the page (look for pencil icon)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <AnalyticsDashboard />
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-organic-text mb-6">⚙️ System Settings</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-organic-text mb-4">🔍 Search Configuration</h3>
                  <AdminAlgoliaSync />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-organic-text mb-4">📧 Email Settings</h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <EnvelopeIcon className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-blue-800">Email Notifications</span>
                    </div>
                    <p className="text-blue-700 text-sm mb-3">
                      Email notifications are handled automatically by Firebase Functions when orders are created or updated.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Order Confirmations:</span>
                        <span className="text-green-600 font-medium">✅ Active</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping Notifications:</span>
                        <span className="text-green-600 font-medium">✅ Active</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Welcome Emails:</span>
                        <span className="text-green-600 font-medium">✅ Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-organic-text mb-4">🏪 Store Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
                  <input
                    type="text"
                    defaultValue="Darjeeling Souls"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-organic-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Store Tagline</label>
                  <input
                    type="text"
                    defaultValue="Authentic Darjeeling Hill Products"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-organic-primary focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Store Description</label>
                  <textarea
                    rows={3}
                    defaultValue="Handpicked, Organically Grown in the Darjeeling Hills"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-organic-primary focus:border-transparent"
                  />
                </div>
              </div>
              <button className="mt-4 bg-organic-primary text-white px-6 py-2 rounded-lg hover:opacity-90">
                Save Settings
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showProductModal && (
        <ProductFormModal
          product={editingProduct}
          artisans={artisans}
          onClose={handleCloseModals}
          onSave={() => {
            handleCloseModals();
            fetchProducts();
          }}
        />
      )}

      {showArtisanModal && (
        <ArtisanFormModal
          artisan={editingArtisan}
          onClose={handleCloseModals}
          onSave={() => {
            handleCloseModals();
            fetchArtisans();
          }}
        />
      )}

      {showStoryModal && (
        <StoryEditor
          story={editingStory}
          onClose={handleCloseModals}
          onSave={() => {
            handleCloseModals();
            // Refresh stories list
          }}
        />
      )}
    </div>
  );
}