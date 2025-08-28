import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CalendarIcon, UserIcon, ClockIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { db } from "../firebase/firebase";
import ResponsiveImage from "../components/ResponsiveImage";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Stories() {
  const [stories, setStories] = useState([]);
  const [featuredStory, setFeaturedStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      if (!db) {
        // Demo stories for when Firebase isn't configured
        const demoStories = [
          {
            id: '1',
            title: 'Darjeeling Tea Festival 2024: A Celebration of Hill Culture',
            excerpt: 'The annual tea festival brought together over 50 local producers, showcasing the rich cultural heritage of our hills.',
            content: `The annual Darjeeling Tea Festival has become more than just a celebration of tea - it's a vibrant showcase of the entire hill culture. This year, over 50 local producers participated, displaying everything from traditional pickles to wild honey.`,
            author: 'Editorial Team',
            authorImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'events',
            featuredImage: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=800',
            publishedAt: '2024-01-15',
            readTime: '4 min read',
            featured: true,
            tags: ['festival', 'community', 'tea-culture']
          },
          {
            id: '2',
            title: 'Winter Harvest: How Cold Weather Makes Better Pickles',
            excerpt: 'The winter months in Darjeeling create perfect conditions for pickle making. Local producers explain why cold weather pickles taste better.',
            content: 'As winter settles over the Darjeeling hills, something magical happens in the small workshops where traditional pickles are made. The cold, dry air creates perfect conditions for fermentation...',
            author: 'Food Editor',
            authorImage: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'food-culture',
            featuredImage: 'https://res.cloudinary.com/dj4kdlwzo/image/upload/v1752940186/pickle_3_co88iu.jpg',
            publishedAt: '2024-01-10',
            readTime: '6 min read',
            featured: false,
            tags: ['winter-harvest', 'pickle-making', 'seasonal-food']
          },
          {
            id: '3',
            title: 'New Organic Certification for Hill Farmers',
            excerpt: 'Five more Darjeeling farmers received organic certification this month, expanding our network of certified organic producers.',
            content: 'Great news for organic food lovers! Five more farmers from the Darjeeling region have successfully completed their organic certification process. This brings our total network of certified organic producers to 25...',
            author: 'News Team',
            authorImage: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'news',
            featuredImage: 'https://images.pexels.com/photos/33239/wheat-field-wheat-cereals-grain.jpg?auto=compress&cs=tinysrgb&w=800',
            publishedAt: '2024-01-05',
            readTime: '3 min read',
            featured: false,
            tags: ['organic-certification', 'farmers', 'quality-assurance']
          }
        ];
        setStories(demoStories);
        setFeaturedStory(demoStories.find(s => s.featured));
        setLoading(false);
        return;
      }

      const q = query(
        collection(db, "stories"),
        orderBy("publishedAt", "desc"),
        limit(20)
      );
      
      const querySnapshot = await getDocs(q);
      const storiesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      setStories(storiesData);
      setFeaturedStory(storiesData.find(story => story.featured));
    } catch (error) {
      console.error('Error fetching stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', label: 'All Stories' },
    { id: 'events', label: 'Events & Festivals' },
    { id: 'news', label: 'News & Updates' },
    { id: 'food-culture', label: 'Food Culture' },
    { id: 'community', label: 'Community Stories' },
    { id: 'seasonal', label: 'Seasonal Updates' }
  ];

  const filteredStories = selectedCategory === 'all' 
    ? stories 
    : stories.filter(story => story.category === selectedCategory);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-organic-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-organic-text to-organic-highlight text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-mountain-pattern opacity-10"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Darjeeling Stories & News
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
            Weekly updates, events, and interesting stories from the Darjeeling hills. 
            Stay connected with our community and discover what's happening in our region.
          </p>
        </div>
      </section>

      {/* Featured Story */}
      {featuredStory && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative">
                  <ResponsiveImage
                    src={featuredStory.featuredImage}
                    alt={featuredStory.title}
                    className="w-full h-96 lg:h-full"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={true}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-organic-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                      ⭐ Featured Story
                    </span>
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={featuredStory.authorImage} 
                      alt={featuredStory.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-organic-text">{featuredStory.author}</p>
                      <p className="text-sm text-organic-text opacity-75">{featuredStory.readTime}</p>
                    </div>
                  </div>
                  <h2 className="font-display text-3xl font-bold text-organic-text mb-4">
                    {featuredStory.title}
                  </h2>
                  <p className="text-lg text-organic-text opacity-75 mb-6 leading-relaxed">
                    {featuredStory.excerpt}
                  </p>
                  <Link 
                    to={`/stories/${featuredStory.id}`}
                    className="inline-flex items-center gap-2 bg-organic-primary text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-all"
                  >
                    Read Full Story
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={\`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-organic-primary text-white'
                    : 'bg-organic-background text-organic-text hover:bg-organic-primary hover:text-white'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStories.filter(story => !story.featured).map((story) => (
              <article key={story.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative">
                  <ResponsiveImage
                    src={story.featuredImage}
                    alt={story.title}
                    className="w-full h-48"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-organic-highlight text-white px-2 py-1 rounded-full text-xs font-semibold capitalize">
                      {story.category.replace('-', ' ')}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <img 
                      src={story.authorImage} 
                      alt={story.author}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="text-sm">
                      <p className="font-medium text-organic-text">{story.author}</p>
                      <div className="flex items-center gap-2 text-organic-text opacity-75">
                        <CalendarIcon className="w-3 h-3" />
                        <span>{new Date(story.publishedAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <ClockIcon className="w-3 h-3" />
                        <span>{story.readTime}</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-display text-xl font-bold text-organic-text mb-3 line-clamp-2">
                    {story.title}
                  </h3>
                  <p className="text-organic-text opacity-75 mb-4 line-clamp-3">
                    {story.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {story.tags?.slice(0, 2).map(tag => (
                      <span key={tag} className="bg-organic-background text-organic-text px-2 py-1 rounded-full text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <Link 
                    to={`/stories/${story.id}`}
                    className="inline-flex items-center gap-2 text-organic-primary hover:text-organic-text font-medium"
                  >
                    Read Story
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-organic-text text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            Taste the Stories, Support the Artisans
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Every product you purchase directly supports these amazing artisans and their families
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/shop" 
              className="inline-block bg-organic-primary text-white font-bold px-8 py-4 rounded-lg hover:opacity-90 transition-all"
            >
              Shop Authentic Products
            </Link>
            <Link 
              to="/artisans" 
              className="inline-block border border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white hover:text-organic-text transition-all"
            >
              Meet Our Artisans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}