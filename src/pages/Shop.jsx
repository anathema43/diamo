import React, { useState } from "react";
import { useProductStore } from "../store/productStore";
import ProductCard from "../components/ProductCard";
import AdvancedFilters from "../components/AdvancedFilters";
import AdvancedFilters from "../components/AdvancedFilters";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";

export default function Shop() {
  const { products, fetchProducts, loading } = useProductStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    categories: [],
    priceMin: 0,
    priceMax: 1000,
    rating: 0,
    inStock: false,
    featured: false,
    origin: '',
    sortBy: 'name'
  });
  const [filters, setFilters] = useState({
    categories: [],
    priceMin: 0,
    priceMax: 1000,
    rating: 0,
    inStock: false,
    featured: false,
    origin: '',
    sortBy: 'name'
  });

  React.useEffect(() => {
    // Always fetch products from Firestore - single source of truth
    fetchProducts();
  }, [products.length, fetchProducts]);

  // Get unique categories and price range from products
  const categories = React.useMemo(() => {
    return [...new Set(products.map(p => p.category))].filter(Boolean);
  }, [products]);

  const priceRange = React.useMemo(() => {
    if (products.length === 0) return { min: 0, max: 1000 };
    const prices = products.map(p => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }, [products]);

  // Get unique categories and price range from products
  const categories = React.useMemo(() => {
    return [...new Set(products.map(p => p.category))].filter(Boolean);
  }, [products]);

  const priceRange = React.useMemo(() => {
    if (products.length === 0) return { min: 0, max: 1000 };
    const prices = products.map(p => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }, [products]);

  // Filter and sort products
  const filteredProducts = React.useMemo(() => {
    return products
    .filter(product => {
      // Search term filter
      const matchesSearch = !searchTerm || 
        (product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Category filter
      const matchesCategory = filters.categories.length === 0 || 
                             filters.categories.includes(product.category);
      
      // Price filter
      const matchesPrice = product.price >= filters.priceMin && 
                          product.price <= filters.priceMax;
      
      // Rating filter
      const matchesRating = filters.rating === 0 || 
                           (product.rating || 0) >= filters.rating;
      
      // Stock filter
      const matchesStock = !filters.inStock || 
                          (product.quantityAvailable > 0);
      
      // Featured filter
      const matchesFeatured = !filters.featured || 
                             product.featured === true;
      
      // Origin filter
      const matchesOrigin = !filters.origin || 
                           (product.origin && product.origin.includes(filters.origin));
      
      return matchesSearch && matchesCategory && matchesPrice && 
             matchesRating && matchesStock && matchesFeatured && matchesOrigin;
      const matchesCategory = filters.categories.length === 0 || 
                             filters.categories.includes(product.category);
      
      // Price filter
      const matchesPrice = product.price >= filters.priceMin && 
                          product.price <= filters.priceMax;
      
      // Rating filter
      const matchesRating = filters.rating === 0 || 
                           (product.rating || 0) >= filters.rating;
      
      // Stock filter
      const matchesStock = !filters.inStock || 
                          (product.quantityAvailable > 0);
      
      // Featured filter
      const matchesFeatured = !filters.featured || 
                             product.featured === true;
      
      // Origin filter
      const matchesOrigin = !filters.origin || 
                           (product.origin && product.origin.includes(filters.origin));
      
      return matchesSearch && matchesCategory && matchesPrice && 
             matchesRating && matchesStock && matchesFeatured && matchesOrigin;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'relevance':
          // Simple relevance based on search term match
          if (searchTerm) {
            const aRelevance = (a.name?.toLowerCase().includes(searchTerm.toLowerCase()) ? 2 : 0) +
                              (a.description?.toLowerCase().includes(searchTerm.toLowerCase()) ? 1 : 0);
            const bRelevance = (b.name?.toLowerCase().includes(searchTerm.toLowerCase()) ? 2 : 0) +
                              (b.description?.toLowerCase().includes(searchTerm.toLowerCase()) ? 1 : 0);
            return bRelevance - aRelevance;
          }
          return (a.name || '').localeCompare(b.name || '');
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "newest":
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        default:
          return (a.name || '').localeCompare(b.name || '');
      }
        case 'relevance':
          // Simple relevance based on search term match
          if (searchTerm) {
            const aRelevance = (a.name?.toLowerCase().includes(searchTerm.toLowerCase()) ? 2 : 0) +
                              (a.description?.toLowerCase().includes(searchTerm.toLowerCase()) ? 1 : 0);
            const bRelevance = (b.name?.toLowerCase().includes(searchTerm.toLowerCase()) ? 2 : 0) +
                              (b.description?.toLowerCase().includes(searchTerm.toLowerCase()) ? 1 : 0);
            return bRelevance - aRelevance;
          }
          return (a.name || '').localeCompare(b.name || '');
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "newest":
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        default:
          return (a.name || '').localeCompare(b.name || '');
      }
    });
  }, [products, searchTerm, filters]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <main className="min-h-screen bg-gray-50" data-cy="shop-page">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-himalaya-dark mb-2">Shop Ramro Products</h1>
          <p className="text-gray-600">Discover authentic, organic products from the Himalayas</p>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-8">
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

                {/* Advanced Filters */}
                <div className="flex items-center gap-4">
                  <AdvancedFilters
                    onFiltersChange={handleFiltersChange}
                    categories={categories}
                    priceRange={priceRange}
                    initialFilters={filters}
                  />
                filters.priceMax < priceRange.max || filters.rating > 0 || 
                filters.inStock || filters.featured || filters.origin) && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm text-gray-600">Active filters:</span>
                    {filters.categories.map(category => (
                      <span key={category} className="bg-organic-primary text-white px-2 py-1 rounded-full text-xs">
                        {category}
                      </span>
                    ))}
                    {(filters.priceMin > priceRange.min || filters.priceMax < priceRange.max) && (
                      <span className="bg-organic-primary text-white px-2 py-1 rounded-full text-xs">
                        ₹{filters.priceMin} - ₹{filters.priceMax}
                      </span>
                    )}
                    {filters.rating > 0 && (
                      <span className="bg-organic-primary text-white px-2 py-1 rounded-full text-xs">
                        {filters.rating}+ stars
                      </span>
                    )}
                    {filters.inStock && (
                      <span className="bg-organic-primary text-white px-2 py-1 rounded-full text-xs">
                        In Stock
                      </span>
                    )}
                    {filters.featured && (
                      <span className="bg-organic-primary text-white px-2 py-1 rounded-full text-xs">
                        Featured
                      </span>
                    )}
                    {filters.origin && (
                      <span className="bg-organic-primary text-white px-2 py-1 rounded-full text-xs">
                        {filters.origin}
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              {/* Active Filters Display */}
              {(filters.categories.length > 0 || filters.priceMin > priceRange.min || 
                filters.priceMax < priceRange.max || filters.rating > 0 || 
                filters.inStock || filters.featured || filters.origin) && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm text-gray-600">Active filters:</span>
                    {filters.categories.map(category => (
                      <span key={category} className="bg-organic-primary text-white px-2 py-1 rounded-full text-xs">
                        {category}
                      </span>
                    ))}
                    {(filters.priceMin > priceRange.min || filters.priceMax < priceRange.max) && (
                      <span className="bg-organic-primary text-white px-2 py-1 rounded-full text-xs">
                        ₹{filters.priceMin} - ₹{filters.priceMax}
                      </span>
                    )}
                    {filters.rating > 0 && (
                      <span className="bg-organic-primary text-white px-2 py-1 rounded-full text-xs">
                        {filters.rating}+ stars
                      </span>
                    )}
                    {filters.inStock && (
                      <span className="bg-organic-primary text-white px-2 py-1 rounded-full text-xs">
                        In Stock
                      </span>
                    )}
                    {filters.featured && (
                      <span className="bg-organic-primary text-white px-2 py-1 rounded-full text-xs">
                        Featured
                      </span>
                    )}
                    {filters.origin && (
                      <span className="bg-organic-primary text-white px-2 py-1 rounded-full text-xs">
                        {filters.origin}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </section>

            {/* Products Grid */}
            <section aria-label="Product catalog">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12" data-cy="no-results-message">
                  <p className="text-gray-500 text-lg">
                    No products found matching your search and filters.
                  </p>
                  <button 
                    onClick={() => {
                      setSearchTerm("");
                      setFilters({
                        categories: [],
                        priceMin: priceRange.min,
                        priceMax: priceRange.max,
                        rating: 0,
                        inStock: false,
                        featured: false,
                        origin: '',
                        sortBy: 'name'
                      });
                        categories: [],
                        priceMin: priceRange.min,
                        priceMax: priceRange.max,
                        rating: 0,
                        inStock: false,
                        featured: false,
                        origin: '',
                        sortBy: 'name'
                      });
                    }}
                    className="mt-4 text-organic-primary hover:text-organic-text underline"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-gray-600">
                      Showing {filteredProducts.length} of {products.length} products
                    </p>
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-cy="product-grid">
                  {filteredProducts.map((product) => (
                    <li key={product.id}>
                      <ProductCard product={product} />
                    </li>
                  ))}
                  </ul>
                </div>
              )}
            </section>
          </>
        )}
      </section>
    </main>
  );
}