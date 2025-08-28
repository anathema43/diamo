import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useArtisanStore } from "../store/artisanStore";
import { useProductStore } from "../store/productStore";
import ProductCard from "../components/ProductCard";
import ResponsiveImage from "../components/ResponsiveImage";
import LoadingSpinner from "../components/LoadingSpinner";
import { ArrowLeftIcon, MapPinIcon, CalendarIcon, StarIcon } from "@heroicons/react/24/outline";

export default function ArtisanProfile() {
  const { id } = useParams();
  const { getArtisanById, getArtisanProducts } = useArtisanStore();
  const [artisan, setArtisan] = useState(null);
  const [artisanProducts, setArtisanProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtisanData = async () => {
      setLoading(true);
      try {
        if (!db || true) { // Always use demo data for now
          // Demo artisan data when Firebase isn't configured
          const demoArtisans = [
            {
              id: 'deepak-sharma-001',
              name: 'Deepak Sharma',
              title: 'Master Pickle Maker',
              location: 'Darjeeling, West Bengal',
              region: 'West Bengal',
              experience: 25,
              profileImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800',
              shortBio: 'Third-generation pickle maker specializing in traditional Darjeeling recipes passed down through his family.',
              story: `Deepak Sharma learned the art of pickle making from his grandmother, who taught him the secret blend of spices that makes Darjeeling pickles unique. Growing up in the misty hills of Darjeeling, he witnessed how each season brought different vegetables and fruits that could be preserved using ancient techniques.

His family has been making pickles for over 75 years, and Deepak has perfected the recipes while maintaining the traditional methods. He sources all his ingredients from local farmers in the Darjeeling hills, ensuring that every jar tells the story of the mountains.

Today, Deepak employs 8 local women in his small workshop, providing them with steady income while preserving the traditional knowledge of pickle making. His pickles are made in small batches, ensuring quality and authenticity in every jar.`,
              specialties: ["Traditional Pickle Making", "Darjeeling Recipes", "Spice Blending"],
              techniques: [
                "Hand-grinding of spices",
                "Preserving family recipes", 
                "Supporting local farmers",
                "Sustainable practices",
                "Quality over quantity"
              ],
              values: [
                "Traditional methods",
                "Family recipes",
                "Local sourcing",
                "Women empowerment",
                "Quality craftsmanship"
              ],
              culturalHeritage: "Darjeeling pickle making tradition",
              familyMembers: 6,
              rating: 4.8,
              reviewCount: 24,
              featured: true,
              productCount: 3
            },
            {
              id: 'laxmi-devi-001',
              name: 'Laxmi Devi',
              title: 'Wild Honey Collector',
              location: 'Manali, Himachal Pradesh',
              region: 'Himachal Pradesh',
              experience: 18,
              profileImage: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=800',
              shortBio: 'Expert honey collector who harvests wild honey from high-altitude forests using traditional sustainable methods.',
              story: `Laxmi Devi comes from a family of traditional honey collectors in the high mountains of Himachal Pradesh. She learned the ancient art of wild honey collection from her father, who taught her to read the mountains and understand the behavior of wild bees.

At altitudes of over 3000 meters, Laxmi carefully harvests honey from wild bee colonies, using smoke and traditional tools that have been used for centuries. She follows strict sustainable practices, never taking more than the bees can spare, ensuring the colonies remain healthy.

Her honey is completely raw and unprocessed, containing all the natural enzymes and nutrients that make Himalayan honey so special. Each batch reflects the unique flora of the high-altitude forests where the bees collect nectar.`,
              specialties: ["Wild Honey Collection", "Sustainable Harvesting", "High-Altitude Foraging"],
              techniques: [
                "Traditional smoking methods",
                "Sustainable harvesting practices",
                "Natural comb extraction", 
                "Raw honey preservation"
              ],
              values: [
                "Environmental conservation",
                "Sustainable harvesting",
                "Community cooperation",
                "Natural purity"
              ],
              culturalHeritage: "Himalayan honey collection traditions",
              familyMembers: 4,
              rating: 4.9,
              reviewCount: 18,
              featured: true,
              productCount: 2
            },
            {
              id: 'ashok-singh-001',
              name: 'Ashok Singh', 
              title: 'Organic Rice Farmer',
              location: 'Uttarakhand Hills',
              region: 'Uttarakhand',
              experience: 22,
              profileImage: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800',
              shortBio: 'Dedicated organic farmer growing ancient varieties of red rice in terraced fields using traditional methods.',
              story: `Ashok Singh is a passionate advocate for organic farming and the preservation of ancient rice varieties. His family has been farming in the terraced fields of Uttarakhand for generations, and he has dedicated his life to maintaining these traditional practices.

He grows several heritage varieties of red rice that are native to the Himalayan region. These varieties are naturally resistant to pests and diseases, requiring no chemical inputs. The terraced fields, carved into the mountainside by his ancestors, use an ingenious water management system that has sustained agriculture for centuries.`,
              specialties: ["Organic Farming", "Heritage Rice Varieties", "Terraced Agriculture"],
              techniques: [
                "Terraced field cultivation",
                "Natural pest management",
                "Traditional seed preservation",
                "Hand harvesting methods"
              ],
              values: [
                "Organic farming principles",
                "Biodiversity conservation", 
                "Soil health preservation",
                "Community education"
              ],
              culturalHeritage: "Himalayan terraced farming traditions",
              familyMembers: 5,
              rating: 4.7,
              reviewCount: 31,
              featured: true,
              productCount: 2
            },
            {
              id: 'karma-lama-001',
              name: 'Karma Lama',
              title: 'Traditional Tea Master',
              location: 'Darjeeling Tea Gardens',
              region: 'West Bengal',
              experience: 35,
              profileImage: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800',
              shortBio: 'Fourth-generation tea master overseeing traditional Darjeeling tea production with expertise in orthodox tea processing.',
              story: `Karma Lama represents the fourth generation of his family to work in the Darjeeling tea gardens. His great-grandfather started as a tea plucker in the British era, and the family has been involved in tea production ever since.

Working at the historic Makaibari Tea Estate, Karma oversees the traditional orthodox tea processing that gives Darjeeling tea its distinctive muscatel flavor. He understands the subtle art of withering, rolling, oxidation, and firing that transforms fresh tea leaves into the world-renowned Darjeeling tea.

His expertise extends beyond processing to understanding the terroir - how altitude, soil, weather, and timing affect the final cup. He can identify the flush (harvest season) and even the specific garden of a tea just by tasting.

Karma trains young tea workers in traditional methods while adapting to organic and biodynamic practices that are increasingly important for premium tea markets. His work ensures that Darjeeling tea maintains its reputation as the "Champagne of Teas."`,
              specialties: ["Orthodox Tea Processing", "Tea Tasting", "Garden Management"],
              techniques: [
                "Traditional withering methods",
                "Hand-rolling techniques", 
                "Oxidation control",
                "Firing and drying expertise"
              ],
              values: [
                "Tea quality excellence",
                "Traditional processing methods",
                "Sustainable tea farming",
                "Knowledge transfer to youth"
              ],
              culturalHeritage: "Darjeeling tea garden traditions",
              familyMembers: 8,
              rating: 4.9,
              reviewCount: 45,
              featured: false,
              productCount: 4
            }
          ];
          
          const foundArtisan = demoArtisans.find(a => a.id === id);
          if (foundArtisan) {
            setArtisan(foundArtisan);
            // Demo products for this artisan
            const demoProducts = [
              {
                id: '1',
                name: 'Darjeeling Pickle',
                description: 'Authentic spicy pickle from the hills of Darjeeling',
                price: 299,
                image: 'https://res.cloudinary.com/dj4kdlwzo/image/upload/v1752940186/pickle_3_co88iu.jpg',
                quantityAvailable: 10,
                category: 'pickle',
                rating: 4.5,
                artisan: foundArtisan.name
              }
            ];
            setArtisanProducts(foundArtisan.name === 'Deepak Sharma' ? demoProducts : []);
          } else {
            setError("Artisan not found");
          }
        } else {
          const artisanData = await getArtisanById(id);
          if (artisanData) {
            setArtisan(artisanData);
            const products = await getArtisanProducts(id);
            setArtisanProducts(products);
          } else {
            setError("Artisan not found");
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtisanData();
  }, [id, getArtisanById, getArtisanProducts]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !artisan) {
    return (
      <div className="min-h-screen bg-organic-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-organic-text mb-4">
            {error || "Artisan not found"}
          </h2>
          <Link 
            to="/artisans" 
            className="inline-flex items-center gap-2 text-organic-primary hover:text-organic-text"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Artisans
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-organic-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-organic-text to-organic-highlight text-white overflow-hidden">
        <div className="absolute inset-0 bg-mountain-pattern opacity-10"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <Link 
              to="/artisans" 
              className="inline-flex items-center gap-2 text-white hover:text-organic-primary transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Back to Artisans
            </Link>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                {artisan.name}
              </h1>
              <p className="text-xl mb-6 opacity-90">
                {artisan.title || "Master Artisan"}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-5 h-5" />
                  <span>{artisan.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  <span>{artisan.experience} years of experience</span>
                </div>
                {artisan.rating && (
                  <div className="flex items-center gap-2">
                    <StarIcon className="w-5 h-5 fill-current text-yellow-400" />
                    <span>{artisan.rating}/5 ({artisan.reviewCount || 0} reviews)</span>
                  </div>
                )}
              </div>
              
              <p className="text-lg leading-relaxed opacity-90">
                {artisan.shortBio}
              </p>
            </div>
            
            <div className="relative">
              <ResponsiveImage
                src={artisan.profileImage}
                alt={`${artisan.name} - Himalayan Artisan`}
                className="w-full h-96 rounded-2xl shadow-2xl"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={true}
              />
              {artisan.featured && (
                <div className="absolute top-4 left-4">
                  <span className="bg-organic-primary text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    ⭐ Featured Artisan
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Artisan Story */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="font-display text-3xl font-bold text-organic-text mb-6">
              The Story of {artisan.name}
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-organic-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">{artisan.experience}</span>
                  </div>
                  <h3 className="font-semibold text-organic-text">Years of Experience</h3>
                  <p className="text-sm text-organic-text opacity-75">Mastering traditional crafts</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-organic-highlight rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">{artisanProducts.length}</span>
                  </div>
                  <h3 className="font-semibold text-organic-text">Products</h3>
                  <p className="text-sm text-organic-text opacity-75">Available in our store</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-organic-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">{artisan.familyMembers || 5}</span>
                  </div>
                  <h3 className="font-semibold text-organic-text">Family Members</h3>
                  <p className="text-sm text-organic-text opacity-75">Supported by your purchase</p>
                </div>
              </div>
              
              <div className="space-y-6 text-organic-text leading-relaxed">
                {artisan.story ? (
                  artisan.story.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))
                ) : (
                  <p>
                    {artisan.name} is a master artisan from {artisan.location}, carrying forward 
                    generations of traditional knowledge and craftsmanship. With {artisan.experience} years 
                    of experience, they create authentic products that tell the story of the Himalayas.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Cultural Heritage */}
          {artisan.culturalHeritage && (
            <div className="bg-organic-background rounded-2xl p-8 mb-12">
              <h3 className="font-display text-2xl font-bold text-organic-text mb-6">
                Cultural Heritage & Traditions
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-organic-text mb-3">Traditional Techniques</h4>
                  <ul className="space-y-2 text-organic-text">
                    {artisan.techniques?.map((technique, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-organic-primary rounded-full mt-2 flex-shrink-0"></span>
                        {technique}
                      </li>
                    )) || (
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-organic-primary rounded-full mt-2 flex-shrink-0"></span>
                        Traditional Himalayan craftsmanship passed down through generations
                      </li>
                    )}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-organic-text mb-3">Cultural Values</h4>
                  <ul className="space-y-2 text-organic-text">
                    {artisan.values?.map((value, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-organic-highlight rounded-full mt-2 flex-shrink-0"></span>
                        {value}
                      </li>
                    )) || (
                      <>
                        <li className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-organic-highlight rounded-full mt-2 flex-shrink-0"></span>
                          Sustainable and eco-friendly practices
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-organic-highlight rounded-full mt-2 flex-shrink-0"></span>
                          Community support and fair trade
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-organic-highlight rounded-full mt-2 flex-shrink-0"></span>
                          Preservation of cultural heritage
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Artisan's Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-organic-text mb-4">
              Products by {artisan.name}
            </h2>
            <p className="text-xl text-organic-text opacity-75">
              Discover authentic creations from this master artisan
            </p>
          </div>
          
          {artisanProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {artisanProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-organic-text opacity-75 mb-6">
                No products available from this artisan at the moment.
              </p>
              <Link 
                to="/shop" 
                className="inline-block bg-organic-primary text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-all"
              >
                Explore All Products
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Impact Story */}
      <section className="py-16 bg-organic-background">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-organic-text mb-6">
            Your Impact
          </h2>
          <p className="text-xl text-organic-text opacity-75 mb-8 leading-relaxed">
            When you purchase from {artisan.name}, you're not just buying a product – 
            you're supporting a family, preserving traditional crafts, and contributing 
            to the sustainable development of Himalayan communities.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-12 h-12 bg-organic-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">👨‍👩‍👧‍👦</span>
              </div>
              <h3 className="font-semibold text-organic-text mb-2">Family Support</h3>
              <p className="text-sm text-organic-text opacity-75">
                Direct income for {artisan.familyMembers || 5} family members
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-12 h-12 bg-organic-highlight rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">🏛️</span>
              </div>
              <h3 className="font-semibold text-organic-text mb-2">Cultural Preservation</h3>
              <p className="text-sm text-organic-text opacity-75">
                Keeping traditional crafts alive for future generations
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-12 h-12 bg-organic-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">🌱</span>
              </div>
              <h3 className="font-semibold text-organic-text mb-2">Sustainable Practices</h3>
              <p className="text-sm text-organic-text opacity-75">
                Eco-friendly methods that protect the environment
              </p>
            </div>
          </div>
          
          <div className="mt-12">
            <Link 
              to="/shop" 
              className="inline-block bg-organic-primary text-white font-bold px-8 py-4 rounded-lg hover:opacity-90 transition-all transform hover:scale-105 shadow-lg"
            >
              Support {artisan.name} - Shop Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}