import React from "react";
import { Link } from "react-router-dom";
import { TruckIcon, BeakerIcon, HandshakeIcon } from "@heroicons/react/24/outline";
import AddToCartButton from "../components/AddToCartButton";
import products from "../data/products";
import formatCurrency from "../utils/formatCurrency";

export default function Home() {
  // Get featured products (first 2 products)
  const featuredProducts = products.slice(0, 2);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="text-center max-w-4xl px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-wide">
            Experience Pure<br />Local Goodness
          </h1>
          <p className="text-lg md:text-xl mb-8 font-light">
            Handpicked, Organically Grown in the Himalayas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/shop" 
              className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3 rounded-lg text-lg transition-all duration-300"
            >
              Shop Now
            </Link>
            <Link 
              to="/about" 
              className="inline-block bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold px-8 py-3 rounded-lg text-lg transition-all duration-300 border border-white border-opacity-50"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <TruckIcon className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Free Delivery</h3>
              <p className="text-gray-600">On all orders</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <BeakerIcon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">100% Organic</h3>
              <p className="text-gray-600">Pure & chemical free</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <HandshakeIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Fair Trade</h3>
              <p className="text-gray-600">Supports Local Farmers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Featured Products
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-48 object-cover"
                  />
                  {product.category === 'grains' && (
                    <span className="absolute top-3 left-3 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      100% Organic
                    </span>
                  )}
                  {product.category === 'honey' && (
                    <span className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Local
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2 text-gray-800">{product.name}</h3>
                  <p className="text-2xl font-bold text-gray-800 mb-3">{formatCurrency(product.price)}</p>
                  <AddToCartButton product={product} className="w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Ramro Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Local farmers" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Why Ramro?</h2>
              <ul className="space-y-4 text-lg text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-himalaya rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  Locally sourced & sustainably grown
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-himalaya rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  No chemical pesticides or fertilizers
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-himalaya rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  Promotes healthy communities
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Testimonials
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <p className="text-xl italic text-gray-700 mb-4">"Best rice ever!"</p>
              <div className="flex justify-center">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="w-2 h-2 bg-orange-400 rounded-full"></span>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xl italic text-gray-700 mb-4">"Healthier for my family."</p>
              <div className="flex justify-center">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="w-2 h-2 bg-orange-400 rounded-full"></span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-himalaya text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience the Ramro Difference?</h2>
          <p className="text-xl mb-8">Join thousands of customers who choose authentic, organic products from the Himalayas.</p>
          <Link 
            to="/shop" 
            className="inline-block bg-white text-himalaya font-semibold px-8 py-4 rounded-lg text-lg hover:bg-gray-100 transition-all duration-300"
          >
            Start Shopping
          </Link>
        </div>
      </section>
    </div>
  );
}