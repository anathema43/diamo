import React, { useEffect, useState } from "react";
import { useProductStore } from "../store/productStore";
import { useOrderStore } from "../store/orderStore";
import formatCurrency from "../utils/formatCurrency";
import LoadingSpinner from "../components/LoadingSpinner";

const emptyProduct = {
  name: "",
  description: "",
  price: "",
  image: "",
  quantityAvailable: "",
  category: "",
};

export default function Admin() {
  const {
    products,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    loading: productsLoading,
  } = useProductStore();

  const {
    orders,
    fetchOrders,
    updateOrderStatus,
    getOrderStats,
    loading: ordersLoading,
  } = useOrderStore();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [isEdit, setIsEdit] = useState(false);
  const [productForm, setProductForm] = useState(emptyProduct);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, [fetchProducts, fetchOrders]);

  // Handle product form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductForm((f) => ({
      ...f,
      [name]: value,
    }));
  };

  // Add or Edit product
  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...productForm,
      price: parseFloat(productForm.price),
      quantityAvailable: parseInt(productForm.quantityAvailable)
    };

    if (isEdit) {
      updateProduct(editId, productData);
    } else {
      addProduct(productData);
    }
    
    setProductForm(emptyProduct);
    setIsEdit(false);
    setEditId(null);
  };

  const handleEdit = (product) => {
    setProductForm({
      ...product,
      price: product.price.toString(),
      quantityAvailable: product.quantityAvailable.toString()
    });
    setIsEdit(true);
    setEditId(product.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this product?")) {
      deleteProduct(id);
    }
  };

  const stats = getOrderStats();

  const TabButton = ({ id, label, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-6 py-3 font-medium rounded-lg transition-all ${
        active
          ? 'bg-organic-primary text-white'
          : 'bg-white text-organic-text hover:bg-organic-background'
      }`}
    >
      {label}
    </button>
  );

  if (productsLoading || ordersLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-organic-background py-8">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-organic-text mb-8">Admin Dashboard</h1>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          <TabButton 
            id="dashboard" 
            label="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="products" 
            label="Products" 
            active={activeTab === 'products'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="orders" 
            label="Orders" 
            active={activeTab === 'orders'} 
            onClick={setActiveTab} 
          />
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-organic-text mb-2">Total Products</h3>
                <p className="text-3xl font-bold text-organic-primary">{products.length}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-organic-text mb-2">Total Orders</h3>
                <p className="text-3xl font-bold text-organic-primary">{stats.total}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-organic-text mb-2">Revenue</h3>
                <p className="text-3xl font-bold text-organic-highlight">{formatCurrency(stats.totalRevenue)}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-organic-text mb-2">Processing Orders</h3>
                <p className="text-3xl font-bold text-yellow-600">{stats.processing}</p>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-organic-text mb-4">Recent Orders</h2>
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-8">
            {/* Product Form */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-organic-text mb-4">
                {isEdit ? "Edit Product" : "Add New Product"}
              </h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                <input
                  name="name"
                  value={productForm.name}
                  onChange={handleChange}
                  placeholder="Product Name"
                  className="border rounded-lg p-3 focus:ring-2 focus:ring-organic-primary focus:border-transparent"
                  required
                />
                <input
                  name="category"
                  value={productForm.category}
                  onChange={handleChange}
                  placeholder="Category (e.g., honey, pickle, grains)"
                  className="border rounded-lg p-3 focus:ring-2 focus:ring-organic-primary focus:border-transparent"
                  required
                />
                <input
                  name="image"
                  value={productForm.image}
                  onChange={handleChange}
                  placeholder="Image URL"
                  className="border rounded-lg p-3 focus:ring-2 focus:ring-organic-primary focus:border-transparent"
                  required
                />
                <input
                  name="price"
                  value={productForm.price}
                  onChange={handleChange}
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="Price"
                  className="border rounded-lg p-3 focus:ring-2 focus:ring-organic-primary focus:border-transparent"
                  required
                />
                <input
                  name="quantityAvailable"
                  value={productForm.quantityAvailable}
                  onChange={handleChange}
                  type="number"
                  min="0"
                  placeholder="Available Quantity"
                  className="border rounded-lg p-3 focus:ring-2 focus:ring-organic-primary focus:border-transparent"
                  required
                />
                <textarea
                  name="description"
                  value={productForm.description}
                  onChange={handleChange}
                  placeholder="Product Description"
                  className="border rounded-lg p-3 col-span-1 md:col-span-2 focus:ring-2 focus:ring-organic-primary focus:border-transparent"
                  rows={3}
                  required
                />
                <button
                  type="submit"
                  className="bg-organic-primary text-white px-6 py-3 rounded-lg hover:opacity-90 col-span-1 md:col-span-2 font-semibold"
                >
                  {isEdit ? "Update Product" : "Add Product"}
                </button>
              </form>
            </div>

            {/* Products List */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-organic-text mb-4">Products ({products.length})</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Image</th>
                      <th className="text-left py-2">Name</th>
                      <th className="text-left py-2">Category</th>
                      <th className="text-left py-2">Price</th>
                      <th className="text-left py-2">Stock</th>
                      <th className="text-left py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b">
                        <td className="py-2">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-12 h-12 object-cover rounded"
                          />
                        </td>
                        <td className="py-2 font-medium">{product.name}</td>
                        <td className="py-2 capitalize">{product.category}</td>
                        <td className="py-2 font-semibold">{formatCurrency(product.price)}</td>
                        <td className="py-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            product.quantityAvailable > 10 ? 'bg-green-100 text-green-800' :
                            product.quantityAvailable > 0 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {product.quantityAvailable}
                          </span>
                        </td>
                        <td className="py-2">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(product)}
                              className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="text-red-600 hover:text-red-800 font-medium"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-organic-text mb-4">Orders ({orders.length})</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Order ID</th>
                    <th className="text-left py-2">Customer</th>
                    <th className="text-left py-2">Items</th>
                    <th className="text-left py-2">Total</th>
                    <th className="text-left py-2">Status</th>
                    <th className="text-left py-2">Date</th>
                    <th className="text-left py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="py-2 font-mono text-sm">{order.orderNumber || order.id.slice(0, 8)}</td>
                      <td className="py-2">{order.userEmail}</td>
                      <td className="py-2">
                        <div className="text-sm">
                          {order.items && order.items.slice(0, 2).map((item, idx) => (
                            <div key={idx}>{item.name} × {item.quantity}</div>
                          ))}
                          {order.items && order.items.length > 2 && (
                            <div className="text-gray-500">+{order.items.length - 2} more</div>
                          )}
                        </div>
                      </td>
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
                      <td className="py-2">
                        <button className="text-organic-primary hover:text-organic-text font-medium">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}