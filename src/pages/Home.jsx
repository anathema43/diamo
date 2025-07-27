import React from "react";
import { Link } from "react-router-dom";
import { LeafIcon, UsersIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

export default function Home() {
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
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-wide">
            WHY LOCAL & ORGANIC?
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light">
            Discover the Ramro Difference.
          </p>
          <Link 
            to="/shop" 
            className="inline-block bg-himalaya hover:bg-himalaya-dark text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <LeafIcon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Better for Health</h3>
              <p className="text-gray-600 leading-relaxed">
                No chemicals, just nature. Our organic products are grown without harmful pesticides or artificial additives.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <UsersIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Supports Local Farmers</h3>
              <p className="text-gray-600 leading-relaxed">
                Your food empowers communities. Every purchase directly supports small-scale farmers in the Himalayas.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <GlobeAltIcon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Sustainable Future</h3>
              <p className="text-gray-600 leading-relaxed">
                Eco-friendly practices all the way. We're committed to preserving our planet for future generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Our Signature Local Products
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/33239/wheat-field-wheat-cereals-grain.jpg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Organic Red Rice" 
                  className="w-full h-64 object-cover"
                />
                <span className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  100% Organic
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-800">Organic Red Rice</h3>
                <p className="text-gray-600">Nutrient-rich, farm to table. Grown in the pristine valleys of the Himalayas.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Himalayan Buckwheat" 
                  className="w-full h-64 object-cover"
                />
                <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Local
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-800">Himalayan Buckwheat</h3>
                <p className="text-gray-600">Gluten-free, sustainably harvested. A traditional superfood from high altitudes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Farmers Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Meet Our Farmers
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <img 
                src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400" 
                alt="Deepak" 
                className="w-48 h-48 rounded-lg mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold mb-2 text-gray-800">Deepak</h3>
              <p className="text-gray-600">
                Pradhan dedication to organic farming ensures the highest quality products for our customers.
              </p>
            </div>
            
            <div className="text-center">
              <img 
                src="https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400" 
                alt="Laxmi" 
                className="w-48 h-48 rounded-lg mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold mb-2 text-gray-800">Laxmi</h3>
              <p className="text-gray-600">
                Growing for Ramro helps us support our families and villages through sustainable agriculture.
              </p>
            </div>
            
            <div className="text-center">
              <img 
                src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400" 
                alt="Ashok" 
                className="w-48 h-48 rounded-lg mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold mb-2 text-gray-800">Ashok</h3>
              <p className="text-gray-600">
                With Ramro, our work is valued and respected. We're proud to share our harvest with the world.
              </p>
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