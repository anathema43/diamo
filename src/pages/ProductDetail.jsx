import React from "react";
import { useParams, Link } from "react-router-dom";
import products from "../data/products";
import ReviewStars from "../components/ReviewStars";
import WishlistButton from "../components/WishlistButton";
import AddToCartButton from "../components/AddToCartButton";
import formatCurrency from "../utils/formatCurrency";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">The product you're looking for doesn't exist.</p>
        <Link 
          to="/shop" 
          className="inline-flex items-center gap-2 px-6 py-2 bg-himalaya text-white rounded-lg hover:bg-himalaya-dark transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to Shop
        </Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <Link 
          to="/shop" 
          className="inline-flex items-center gap-2 text-himalaya hover:text-himalaya-dark"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to Shop
        </Link>
      </nav>

      {/* Product Details */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* Product Image */}
        <div className="relative">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
          {product.quantityAvailable === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
              <span className="text-white font-bold text-2xl">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-3xl font-bold text-himalaya-dark">{product.name}</h1>
            <WishlistButton productId={product.id} />
          </div>
          
          <div className="mb-4">
            <ReviewStars rating={product.rating || 4} />
            <span className="ml-2 text-gray-600">({product.rating || 4}/5)</span>
          </div>
          
          <p className="text-xl font-semibold text-green-700 mb-6">{formatCurrency(product.price)}</p>
          
          <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>
          
          {/* Product Features */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Product Features:</h3>
            <ul className="text-gray-600 space-y-1">
              <li>• 100% Organic and Natural</li>
              <li>• Sourced directly from Himalayan farmers</li>
              <li>• No artificial preservatives or chemicals</li>
              <li>• Sustainably grown and harvested</li>
            </ul>
          </div>
          
          {/* Stock Status */}
          <div className="mb-6">
            {product.quantityAvailable > 0 ? (
              <p className="text-green-600 font-medium">
                ✓ In Stock ({product.quantityAvailable} available)
              </p>
            ) : (
              <p className="text-red-600 font-medium">✗ Out of Stock</p>
            )}
          </div>
          
          {/* Add to Cart */}
          <div className="mb-6">
            <AddToCartButton product={product} className="w-full md:w-auto" />
          </div>
          
          {/* Additional Info */}
          <div className="text-sm text-gray-500 space-y-1">
            <p>• Free shipping on orders over ₹500</p>
            <p>• 7-day return policy</p>
            <p>• Secure payment options</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img 
                  src={relatedProduct.image} 
                  alt={relatedProduct.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold mb-2">{relatedProduct.name}</h3>
                  <p className="text-green-700 font-semibold mb-3">{formatCurrency(relatedProduct.price)}</p>
                  <Link 
                    to={`/products/${relatedProduct.id}`}
                    className="block w-full text-center px-4 py-2 bg-himalaya text-white rounded hover:bg-himalaya-dark transition-colors"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}