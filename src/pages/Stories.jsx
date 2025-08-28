import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CalendarIcon, UserIcon, ClockIcon, ArrowRightIcon, PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { collection, getDocs, orderBy, query, limit, where, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuthStore } from "../store/authStore";
import ResponsiveImage from "../components/ResponsiveImage";
import LoadingSpinner from "../components/LoadingSpinner";
import StoryEditor from "../components/StoryEditor";

export default function Stories() {
  const { userProfile } = useAuthStore();
  const [stories, setStories] = useState([]);
  const [featuredStory, setFeaturedStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showStoryEditor, setShowStoryEditor] = useState(false);
  const [editingStory, setEditingStory] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  
  const isAdmin = userProfile?.role === 'admin';

  useEffect(() => {
    fetchStories();
  }, [selectedCategory, sortBy]);

  const fetchStories = async () => {
    setLoading(true);
    try {
      if (!db) {
        // Demo stories for when Firebase isn't configured
        const demoStories = [
          {
            id: '1',
            title: 'The Ancient Art of Darjeeling Pickle Making',
            excerpt: 'In the early morning mist of Darjeeling, when the hills are shrouded in clouds and the air carries the scent of tea gardens, Deepak Sharma begins his day as his grandmother taught him 25 years ago.',
            content: `In the early morning mist of Darjeeling, when the hills are shrouded in clouds and the air carries the scent of tea gardens, Deepak Sharma begins his day as his grandmother taught him 25 years ago.

The small workshop behind his house comes alive with the sounds of grinding spices and chopping vegetables. This is where three generations of pickle-making knowledge converge into jars of authentic Darjeeling flavor.

## A Family Legacy

Deepak's grandmother, Kamala Devi, started making pickles in 1948 when she moved to Darjeeling after partition. With limited resources but abundant knowledge of traditional preservation techniques, she began creating pickles that would remind her family of their ancestral home.

"She taught me that pickle-making is not just about preserving vegetables," Deepak explains, his hands expertly grinding mustard seeds in a traditional stone grinder. "It's about preserving memories, culture, and the essence of our hills."

## The Secret of Darjeeling Pickles

What makes Darjeeling pickles unique is not just the recipe, but the environment. The cool mountain air, the pure water from natural springs, and the specific varieties of chilies and vegetables that grow in this altitude create flavors that cannot be replicated elsewhere.

## Supporting the Community

Today, Deepak employs 8 local women in his workshop, providing them with steady income while preserving traditional knowledge. His success has inspired other families to revive their own traditional recipes.`,
            author: 'Editorial Team',
            authorImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800',
            authorBio: 'Food culture writer documenting traditional Darjeeling food practices.',
            category: 'artisan-story',
            featuredImage: 'https://res.cloudinary.com/dj4kdlwzo/image/upload/v1752940186/pickle_3_co88iu.jpg',
            publishedAt: '2024-01-15',
            readTime: '6 min read',
            featured: true,
            tags: ['traditional-recipes', 'family-heritage', 'pickle-making'],
            authorId: 'deepak-sharma-001' // Link to artisan profile
          },
          {
            id: '2',
            title: 'Darjeeling Winter Festival 2024: A Magical Celebration in the Clouds',
            excerpt: 'The inaugural Darjeeling Winter Festival brought together thousands of visitors to celebrate hill culture, local cuisine, and traditional crafts in a spectacular three-day event.',
            content: `Every October, the hill station of Darjeeling transforms into a spectacular celebration as the Bengali community comes together for Durga Puja. The cool mountain air fills with the sound of dhak drums, the aroma of traditional sweets, and the joyous chatter of families reuniting for the festival.

## A Festival in the Clouds

Darjeeling's Durga Puja has a unique character shaped by its mountain setting. The pandals (temporary structures) are built on steep hillsides, offering breathtaking views of the Kanchenjunga peaks as devotees offer prayers to Goddess Durga.

The main celebrations happen at Chowrasta, the heart of Darjeeling, where elaborate pandals showcase artistic themes that blend Bengali traditions with local hill culture. This year's theme celebrated the harmony between different communities living in the hills.

## Community Unity

What makes Darjeeling's Durga Puja special is how it brings together people from all backgrounds - Bengali families, Nepali neighbors, Tibetan friends, and visitors from across India. The festival becomes a celebration of the multicultural spirit that defines Darjeeling.

Local businesses, from tea gardens to small shops, participate by sponsoring pandals and organizing cultural programs. The entire town becomes one big family during these five days.

## Traditional Foods and Modern Touches

The festival features traditional Bengali sweets like rasgulla and sandesh, but also incorporates local Darjeeling flavors. Street vendors sell everything from traditional luchi-alur dom to local momos, creating a unique fusion of cultures.

Many families prepare special festival meals using locally sourced ingredients - pickles from hill gardens, honey from mountain forests, and spices from local markets, connecting the celebration to the land that sustains them.

## Cultural Bridge

For many Bengali families who have made Darjeeling their home over generations, this festival is a bridge between their cultural roots and their mountain identity. It's a time when stories are shared, traditions are passed down, and the community bonds are strengthened.`,
            author: 'Festival Reporter',
            authorImage: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=800',
            authorBio: 'Local journalist covering cultural events and community celebrations in the Darjeeling region.',
            category: 'events',
            featuredImage: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=800',
            publishedAt: '2024-10-15',
            readTime: '5 min read',
            featured: true,
            tags: ['durga-puja', 'bengali-culture', 'darjeeling-festivals', 'community-celebration']
          },
          {
            id: '3',
            title: 'The Sacred Groves of Kalimpong: Where Nature Meets Spirituality',
            excerpt: 'Hidden in the forests around Kalimpong are sacred groves that have been protected by local communities for centuries, preserving both biodiversity and spiritual traditions.',
            content: `Deep in the forests surrounding Kalimpong, there exist sacred groves that serve as living temples where nature and spirituality converge. These protected forest patches, known locally as "devrai," have been safeguarded by indigenous communities for over 500 years.

## Ancient Protection System

The sacred groves represent one of the world's oldest conservation systems. Local communities designated these forest areas as sacred, making them off-limits for hunting, logging, or any form of exploitation. This traditional conservation has preserved biodiversity that has disappeared from surrounding areas.

## Biodiversity Hotspots

These groves harbor rare medicinal plants, ancient trees, and wildlife that have vanished from other parts of the region. Botanists have identified over 200 plant species in just one grove, including several that are found nowhere else in the Eastern Himalayas.

## Spiritual Significance

Each grove is dedicated to local deities and serves as a place for community prayers and festivals. The annual grove festivals bring together people from multiple villages to celebrate the harmony between humans and nature.

## Modern Challenges

Today, these sacred groves face pressure from development and changing lifestyles. However, local environmental groups are working with traditional communities to document and protect these invaluable ecosystems for future generations.

## Conservation Success

The sacred groves of Kalimpong demonstrate how traditional knowledge and spiritual beliefs can create effective conservation. They serve as models for community-based conservation efforts across the Himalayas.`,
            author: 'Environmental Writer',
            authorImage: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800',
            authorBio: 'Environmental journalist documenting traditional conservation practices in the Eastern Himalayas.',
            category: 'places',
            featuredImage: 'https://images.pexels.com/photos/33239/wheat-field-wheat-cereals-grain.jpg?auto=compress&cs=tinysrgb&w=800',
            publishedAt: '2024-09-20',
            readTime: '6 min read',
            featured: false,
            tags: ['sacred-groves', 'kalimpong', 'conservation', 'spirituality', 'biodiversity']
          },
          {
            id: '4',
            title: 'Losar: Tibetan New Year Celebrations in the Hills',
            excerpt: 'The Tibetan New Year brings colorful celebrations to hill communities, featuring traditional dances, special foods, and ancient rituals that welcome prosperity and good fortune.',
            content: `As February arrives in the Himalayan foothills, Tibetan communities prepare for Losar, their most important celebration of the year. The festival marks not just the new year, but a time of renewal, family reunions, and cultural pride.

## Preparations Begin

Weeks before Losar, families begin preparing traditional foods like khapse (deep-fried cookies), guthuk (special soup), and chang (barley beer). Homes are cleaned thoroughly, new clothes are prepared, and prayer flags are hung to welcome good fortune.

## The Three Days of Celebration

Losar is celebrated over three days, each with its own significance. The first day is for family, the second for friends, and the third for the community. Monasteries hold special prayers, and traditional cham dances are performed to drive away evil spirits.

## Cultural Preservation

In places like Darjeeling, Kalimpong, and Gangtok, Losar celebrations help preserve Tibetan culture among younger generations who may be more connected to modern life than traditional practices.

## Food and Fellowship

The festival foods are not just delicious but carry deep meaning. Khapse cookies are shaped into auspicious symbols, and the ingredients for guthuk soup are chosen for their symbolic significance in bringing good luck.

## Modern Adaptations

While maintaining traditional elements, modern Losar celebrations in hill towns also include cultural programs, exhibitions of Tibetan art, and community gatherings that welcome people from all backgrounds to learn about Tibetan culture.`,
            author: 'Cultural Reporter',
            authorImage: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800',
            authorBio: 'Journalist specializing in Himalayan cultural traditions and festival celebrations.',
            category: 'traditions',
            featuredImage: 'https://images.pexels.com/photos/4198017/pexels-photo-4198017.jpeg?auto=compress&cs=tinysrgb&w=800',
            publishedAt: '2024-02-10',
            readTime: '5 min read',
            featured: false,
            tags: ['losar', 'tibetan-new-year', 'cultural-festivals', 'traditional-celebrations']
          },
          {
            id: '5',
            title: 'The Toy Train Journey: A Century of Mountain Magic',
            excerpt: 'The Darjeeling Himalayan Railway, affectionately known as the Toy Train, continues to enchant travelers with its century-old journey through the misty hills and tea gardens.',
            content: `The whistle of the Darjeeling Himalayan Railway echoes through the mountains as it has for over 150 years. This narrow-gauge railway, lovingly called the "Toy Train," is more than just transportation - it's a journey through time and a testament to human ingenuity.

## Engineering Marvel

Built between 1879 and 1881, the railway climbs from sea level to over 2000 meters using ingenious loops and zigzags. The engineering feat required no tunnels, instead following the natural contours of the mountains through 88 curves and over 900 bridges.

## Living Heritage

Today, the Toy Train is a UNESCO World Heritage Site, but it remains a working railway serving local communities. School children use it to reach their schools, vendors sell tea and snacks at stations, and tourists from around the world experience the magic of slow travel.

## The Journey Experience

The 8-hour journey from New Jalpaiguri to Darjeeling passes through changing landscapes - from tropical plains to temperate forests to alpine meadows. Passengers witness the gradual transformation of culture, architecture, and vegetation as the train climbs higher.

## Preserving the Magic

Local communities and railway enthusiasts work together to maintain this heritage railway. Recent restoration efforts have ensured that future generations can continue to experience the wonder of this mountain railway.

The Toy Train represents the spirit of Darjeeling - a blend of history, culture, and natural beauty that continues to inspire and delight all who experience its magic.`,
            author: 'Heritage Writer',
            authorImage: 'https://images.pexels.com/photos/1181562/pexels-photo-1181562.jpeg?auto=compress&cs=tinysrgb&w=800',
            authorBio: 'Travel and heritage writer documenting the cultural landmarks of the Eastern Himalayas.',
            category: 'places',
            featuredImage: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=800',
            publishedAt: '2024-08-15',
            readTime: '6 min read',
            featured: false,
            tags: ['toy-train', 'darjeeling-railway', 'unesco-heritage', 'mountain-travel']
          },
          {
            id: '6',
            title: 'Monsoon Magic: When the Hills Turn Emerald Green',
            excerpt: 'The monsoon season transforms the Darjeeling hills into a lush paradise, bringing life to tea gardens and filling the air with the fragrance of mountain flowers.',
            content: `When the monsoon clouds roll in from the Bay of Bengal, the Darjeeling hills undergo a magical transformation. The landscape that was golden and dry in the pre-monsoon heat suddenly bursts into every shade of green imaginable.

## The Arrival of Rains

The first monsoon showers usually arrive in June, announced by dramatic clouds that engulf the mountains. The temperature drops, the air becomes fresh and clean, and the entire hill station seems to breathe a sigh of relief.

## Tea Gardens Come Alive

For the tea gardens, monsoon is the most crucial season. The combination of warmth and moisture creates ideal conditions for tea bushes to produce the tender leaves that make the finest Darjeeling tea. The second flush, harvested during monsoon, produces teas with the distinctive muscatel flavor that Darjeeling is famous for.

## Mountain Flowers Bloom

The hillsides explode with wildflowers - rhododendrons, primulas, orchids, and countless other species paint the landscape in brilliant colors. The air fills with fragrances that seem to change with every turn in the mountain paths.

## Life in the Clouds

Living in the monsoon means embracing the mist and clouds that often shroud the hills. Locals joke that they live "inside the clouds," and indeed, walking through Darjeeling during Monsoon often feels like moving through a dream.

## Challenges and Beauty

While monsoon brings beauty, it also brings challenges - landslides, power cuts, and transportation difficulties. But hill communities have adapted over generations, and there's a special rhythm to monsoon life that visitors find enchanting.

The monsoon season reminds everyone why the hills are called a paradise - it's when nature displays its full glory and the mountains reveal their true character.`,
            author: 'Nature Writer',
            authorImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800',
            authorBio: 'Nature writer and photographer documenting the seasonal beauty of the Eastern Himalayas.',
            category: 'places',
            featuredImage: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
            publishedAt: '2024-07-05',
            readTime: '5 min read',
            featured: false,
            tags: ['monsoon', 'darjeeling-weather', 'tea-season', 'mountain-beauty']
          }
        ];
        setStories(demoStories);
        setFeaturedStory(demoStories.find(s => s.featured));
        setLoading(false);
        return;
      }

      let q;
      if (selectedCategory === 'all') {
        q = query(
          collection(db, "stories"),
          orderBy(sortBy === 'newest' ? "publishedAt" : "title", sortBy === 'newest' ? "desc" : "asc"),
          limit(50)
        );
      } else {
        q = query(
          collection(db, "stories"),
          where("category", "==", selectedCategory),
          orderBy(sortBy === 'newest' ? "publishedAt" : "title", sortBy === 'newest' ? "desc" : "asc"),
          limit(50)
        );
      }
      
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

  const handleDeleteStory = async (storyId) => {
    if (!window.confirm('Are you sure you want to delete this story?')) return;
    
    try {
      if (db) {
        await deleteDoc(doc(db, "stories", storyId));
      }
      setStories(stories.filter(s => s.id !== storyId));
      if (featuredStory?.id === storyId) {
        setFeaturedStory(null);
      }
    } catch (error) {
      console.error('Error deleting story:', error);
      alert('Error deleting story: ' + error.message);
    }
  };

  const handleEditStory = (story) => {
    setEditingStory(story);
    setShowStoryEditor(true);
  };

  const handleAddStory = () => {
    setEditingStory(null);
    setShowStoryEditor(true);
  };

  const handleCloseEditor = () => {
    setShowStoryEditor(false);
    setEditingStory(null);
  };

  const handleSaveStory = () => {
    setShowStoryEditor(false);
    setEditingStory(null);
    fetchStories(); // Refresh stories list
  };

  const categories = [
    { id: 'all', label: 'All Stories' },
    { id: 'events', label: 'Events & Festivals' },
    { id: 'people', label: 'People & Profiles' },
    { id: 'places', label: 'Places & Destinations' },
    { id: 'traditions', label: 'Traditions & Culture' },
    { id: 'artisan-story', label: 'Artisan Stories' },
    { id: 'food-culture', label: 'Food & Recipes' },
    { id: 'community', label: 'Community Impact' },
    { id: 'sustainability', label: 'Environment' }
  ];

  // Filter and sort stories
  let filteredStories = selectedCategory === 'all' 
    ? stories.filter(story => !story.featured && story.content && story.content.length > 100) // Only show stories with substantial content
    : stories.filter(story => story.category === selectedCategory && !story.featured && story.content && story.content.length > 100);

  // Sort stories
  filteredStories = filteredStories.sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.publishedAt) - new Date(b.publishedAt);
      case 'title':
        return a.title.localeCompare(b.title);
      case 'author':
        return a.author.localeCompare(b.author);
      case 'newest':
      default:
        return new Date(b.publishedAt) - new Date(a.publishedAt);
    }
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-organic-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-organic-text to-organic-highlight text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-mountain-pattern opacity-10"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              Darjeeling Stories & News
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto mb-8">
              Weekly updates, events, and interesting stories from the Darjeeling hills. 
              Stay connected with our community and discover what's happening in our region.
            </p>
            
            {/* Admin Add Story Button */}
            {isAdmin && (
              <button
                onClick={handleAddStory}
                className="inline-flex items-center gap-2 bg-white text-organic-text font-semibold px-6 py-3 rounded-lg hover:bg-organic-background transition-all"
              >
                <PlusIcon className="w-5 h-5" />
                Create New Story
              </button>
            )}
          </div>
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
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-organic-primary text-white'
                      : 'bg-organic-background text-organic-text hover:bg-organic-primary hover:text-white'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
            
            {/* Sort Options */}
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-organic-text">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-organic-primary focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title A-Z</option>
                <option value="author">Author A-Z</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Results Info */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-organic-text opacity-75">
              {filteredStories.length} {selectedCategory === 'all' ? 'stories' : `${categories.find(c => c.id === selectedCategory)?.label.toLowerCase()} stories`} found
            </p>
            {isAdmin && (
              <button
                onClick={handleAddStory}
                className="flex items-center gap-2 bg-organic-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all"
              >
                <PlusIcon className="w-4 h-4" />
                Add Story
              </button>
            )}
          </div>
          
          {filteredStories.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-organic-text mb-2">No Stories Found</h3>
              <p className="text-organic-text opacity-75 mb-6">
                {selectedCategory === 'all' 
                  ? 'No stories have been published yet.' 
                  : `No stories found in the ${categories.find(c => c.id === selectedCategory)?.label} category.`
                }
              </p>
              {isAdmin && (
                <button
                  onClick={handleAddStory}
                  className="bg-organic-primary text-white px-6 py-3 rounded-lg hover:opacity-90"
                >
                  Create First Story
                </button>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStories.map((story) => (
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
                      {(story.category || '').replace('-', ' ')}
                    </span>
                  </div>
                  {/* Admin Controls */}
                  {isAdmin && (
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={() => handleEditStory(story)}
                        className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                        title="Edit Story"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteStory(story.id)}
                        className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                        title="Delete Story"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  )}
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
          )}
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
      
      {/* Story Editor Modal */}
      {showStoryEditor && (
        <StoryEditor
          story={editingStory}
          onClose={handleCloseEditor}
          onSave={handleSaveStory}
        />
      )}
    </div>
  );
}