import React, { useState } from "react";
import { useProductStore } from "../store/productStore";
import ProductCard from "../components/ProductCard";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";

export default function Shop() {
  const { products, fetchProducts, loading } = useProductStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterCategory, setFilterCategory] = useState("all");

  React.useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products.length, fetchProducts]);

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === "all" || 
                             product.category === filterCategory ||
                             product.name.toLowerCase().includes(filterCategory.toLowerCase());
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <div className="min-h-screen bg-gray-50" data-cy="shop-page">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-himalaya-dark mb-2">Shop Ramro Products</h1>
          <p className="text-gray-600">Discover authentic, organic products from the Himalayas</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex justify-center py-12" role="status" aria-label="Loading products">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-organic-primary"></div>
            <span className="sr-only">Loading products...</span>
          </div>
        ) : (
          <>
            {/* Filters and Search */}
            <section className="bg-white rounded-lg shadow-sm p-6 mb-8" aria-label="Product filters">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <label htmlFor="product-search" className="sr-only">Search products</label>
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
                  <input
                    id="product-search"
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-himalaya focus:border-transparent"
                    data-cy="search-input"
                  />
                </div>

                {/* Filters */}
                <div className="flex gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <FunnelIcon className="w-5 h-5 text-gray-500" aria-hidden="true" />
                    <label htmlFor="category-filter" className="sr-only">Filter by category</label>
                    <select
                      id="category-filter"
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-himalaya focus:border-transparent"
                      data-cy="category-filter"
                    >
                      <option value="all">All Categories</option>
                      <option value="pickle">Pickles</option>
                      <option value="honey">Honey</option>
                      <option value="spices">Spices</option>
                      <option value="grains">Grains</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="sort-select" className="sr-only">Sort products</label>
                    <select
                      id="sort-select"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-himalaya focus:border-transparent"
                      data-cy="sort-select"
                    >
                      <option value="name">Sort by Name</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* Products Grid */}
            <section aria-label="Product catalog">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12" data-cy="no-results-message">
                  <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                  <button 
                    onClick={() => {
                      setSearchTerm("");
                      setFilterCategory("all");
                    }}
                    className="mt-4 text-organic-primary hover:text-organic-text underline"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-cy="product-grid">
                  {filteredProducts.map((product) => (
                    <li key={product.id}>
                      <ProductCard product={product} />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}