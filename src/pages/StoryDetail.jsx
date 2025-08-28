import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeftIcon, ArrowRightIcon, CalendarIcon, ClockIcon, ShareIcon } from "@heroicons/react/24/outline";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import ResponsiveImage from "../components/ResponsiveImage";
import LoadingSpinner from "../components/LoadingSpinner";

export default function StoryDetail() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedStories, setRelatedStories] = useState([]);

  useEffect(() => {
    fetchStory();
  }, [id]);

  const fetchStory = async () => {
    try {
      if (!db) {
        // Demo stories for when Firebase isn't configured
        const demoStories = {
          '1': {
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

Deepak sources all his ingredients from local farmers within a 10-kilometer radius of his workshop. The green chilies come from terraced gardens in Ghoom, the mustard oil is pressed in nearby Kurseong, and the spices are hand-selected from the local market where vendors have known his family for decades.

## Traditional Techniques in Modern Times

While the world has moved to industrial food processing, Deepak maintains the traditional methods:

- **Hand-grinding spices** in stone mortars for better flavor release
- **Solar drying** vegetables on bamboo mats during the dry season
- **Clay pot fermentation** for developing complex flavors
- **Natural preservation** without any chemical additives

Each batch is small, typically 20-30 jars, ensuring quality control and maintaining the artisanal character that makes these pickles special.

## Supporting the Community

Today, Deepak employs 8 local women in his workshop, providing them with steady income while preserving traditional knowledge. His success has inspired other families to revive their own traditional recipes, creating a small but thriving community of artisan food producers in Darjeeling.

"When people buy our pickles, they're not just buying food," Deepak says, carefully ladling freshly made pickle into sterilized jars. "They're supporting our families, our traditions, and our way of life in these beautiful hills."

## The Future of Tradition

As younger generations move to cities for education and employment, Deepak worries about the future of traditional food crafts. However, platforms like Darjeeling Souls give him hope.

"Now, a young person living in Mumbai or Delhi can taste the same pickle their grandmother made, and they can know the story behind it. This connection keeps our culture alive."

Every jar of Deepak's pickle carries with it the mist of Darjeeling mornings, the wisdom of three generations, and the hope that traditional knowledge will continue to nourish families across India.`,
            author: 'Deepak Sharma',
            authorImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800',
            authorBio: 'Third-generation pickle maker from Darjeeling, preserving family recipes for over 25 years.',
            category: 'artisan-story',
            featuredImage: 'https://res.cloudinary.com/dj4kdlwzo/image/upload/v1752940186/pickle_3_co88iu.jpg',
            publishedAt: '2024-01-15',
            readTime: '5 min read',
            tags: ['traditional-recipes', 'family-heritage', 'pickle-making'],
            relatedProducts: ['1']
          },
          '2': {
            id: '2',
            title: 'Darjeeling Winter Festival 2024: A Magical Celebration in the Clouds',
            excerpt: 'The inaugural Darjeeling Winter Festival brought together thousands of visitors to celebrate hill culture, local cuisine, and traditional crafts in a spectacular three-day event.',
            content: `The inaugural Darjeeling Winter Festival brought together thousands of visitors to celebrate hill culture, local cuisine, and traditional crafts in a spectacular three-day event that showcased the best of Darjeeling's heritage.

## A Festival Born from Community Spirit

The idea for the Winter Festival came from local tourism operators and cultural groups who wanted to create a unique event that would highlight Darjeeling's rich cultural diversity during the quieter winter months. Unlike summer festivals that focus on tea, this celebration embraced the full spectrum of hill culture.

## Three Days of Cultural Immersion

The festival featured traditional dance performances by local groups, including Nepali folk dances, Tibetan cultural shows, and Bengali musical performances. Food stalls offered everything from traditional momos and thukpa to Darjeeling pickles and locally made sweets.

## Artisan Showcase

Local artisans displayed their crafts - from bamboo weaving to traditional textile work. Visitors could watch pickle-making demonstrations, learn about tea processing, and even try their hand at traditional crafts under expert guidance.

## Community Impact

The festival provided a significant economic boost to local businesses, with hotels reporting full occupancy and restaurants seeing record sales. More importantly, it gave young people a platform to showcase their talents and connect with their cultural roots.

## Looking Forward

The success of the 2024 Winter Festival has inspired plans for an annual celebration that will become a signature event for Darjeeling, attracting visitors from across India and beyond while celebrating the unique culture of the hills.`,
            author: 'Festival Reporter',
            authorImage: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=800',
            authorBio: 'Local journalist covering cultural events and community celebrations in the Darjeeling region.',
            category: 'events',
            featuredImage: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=800',
            publishedAt: '2024-12-15',
            readTime: '6 min read',
            featured: true,
            tags: ['winter-festival', 'darjeeling-events', 'cultural-celebration', 'community-festival']
          },
          '3': {
            id: '3',
            title: 'The Sacred Groves of Kalimpong: Where Nature Meets Spirituality',
            excerpt: 'Hidden in the forests around Kalimpong are sacred groves that have been protected by local communities for centuries, preserving both biodiversity and spiritual traditions.',
            content: `Hidden in the forests around Kalimpong are sacred groves that have been protected by local communities for centuries, preserving both biodiversity and spiritual traditions.

## Ancient Protection System

The sacred groves represent one of the world's oldest conservation systems. Local communities designated these forest areas as sacred, making them off-limits for hunting, logging, or any form of exploitation.

## Biodiversity Hotspots

These groves harbor rare medicinal plants, ancient trees, and wildlife that have vanished from other parts of the region. Botanists have identified over 200 plant species in just one grove.

## Spiritual Significance

Each grove is dedicated to local deities and serves as a place for community prayers and festivals. The annual grove festivals bring together people from multiple villages.`,
            author: 'Environmental Writer',
            authorImage: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800',
            authorBio: 'Environmental journalist documenting traditional conservation practices.',
            category: 'places',
            featuredImage: 'https://images.pexels.com/photos/33239/wheat-field-wheat-cereals-grain.jpg?auto=compress&cs=tinysrgb&w=800',
            publishedAt: '2024-09-20',
            readTime: '4 min read',
            featured: false,
            tags: ['sacred-groves', 'kalimpong', 'conservation']
          },
          '4': {
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
          '5': {
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
          '6': {
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

Living in the monsoon means embracing the mist and clouds that often shroud the hills. Locals joke that they live "inside the clouds," and indeed, walking through Darjeeling during monsoon often feels like moving through a dream.

## Challenges and Beauty

While monsoon brings beauty, it also brings challenges - landslides, power cuts, and transportation difficulties. But hill communities have adapted over generations, and there's a special rhythm to monsoon life that visitors find enchanting.

The monsoon season reminds everyone why the hills are called a paradise - it's when nature displays its full glory and the mountains reveal their true character.`,
            author: 'Nature Writer',
            authorImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800',
            authorBio: 'Nature writer and photographer documenting the seasonal beauty of the Eastern Himalayas.',
            category: 'places',
            featuredImage: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
            publishedAt: '2024-07-05',
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
            featured: false,
            tags: ['monsoon', 'darjeeling-weather', 'tea-season', 'mountain-beauty']
          }
        };
        
        const foundStory = demoStories[id];
        if (foundStory) {
          setStory(foundStory);
        } else {
          setError("Story not found");
        }
        setLoading(false);
        return;
      }

      const docRef = doc(db, "stories", id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setStory({ id: docSnap.id, ...docSnap.data() });
      }
    } catch (error) {
      console.error('Error fetching story:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: story.title,
        text: story.excerpt,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Story link copied to clipboard!');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-organic-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-organic-text mb-4">Story not found</h2>
          <Link 
            to="/stories" 
            className="inline-flex items-center gap-2 text-organic-primary hover:text-organic-text"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Stories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-organic-background">
      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link 
            to="/stories" 
            className="inline-flex items-center gap-2 text-organic-primary hover:text-organic-text"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Stories
          </Link>
        </div>
      </div>

      {/* Story Header */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-organic-highlight text-white px-3 py-1 rounded-full text-sm font-semibold capitalize">
              {story.category.replace('-', ' ')}
            </span>
            <span className="text-organic-text opacity-75">•</span>
            <span className="text-organic-text opacity-75">{story.readTime}</span>
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl font-bold text-organic-text mb-6 leading-tight">
            {story.title}
          </h1>
          
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <img 
                src={story.authorImage} 
                alt={story.author}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-organic-text text-lg">{story.author}</p>
                {story.authorBio && (
                  <p className="text-organic-text opacity-75 text-sm">{story.authorBio}</p>
                )}
                <div className="flex items-center gap-2 text-sm text-organic-text opacity-75 mt-1">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{new Date(story.publishedAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-organic-primary hover:text-organic-text"
            >
              <ShareIcon className="w-5 h-5" />
              Share
            </button>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-8">
          <ResponsiveImage
            src={story.featuredImage}
            alt={story.title}
            className="w-full h-96 rounded-lg shadow-lg"
            sizes="(max-width: 768px) 100vw, 800px"
            priority={true}
          />
        </div>

        {/* Story Content */}
        <div className="prose prose-lg max-w-none">
          <div className="text-organic-text leading-relaxed space-y-6">
            {story.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="font-display text-2xl font-bold text-organic-text mt-8 mb-4">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('- ')) {
                const listItems = paragraph.split('\n').filter(item => item.startsWith('- '));
                return (
                  <ul key={index} className="list-disc list-inside space-y-2 ml-4">
                    {listItems.map((item, i) => (
                      <li key={i} className="text-organic-text">
                        <strong>{item.replace('- **', '').split('**')[0]}</strong>
                        {item.includes('**') ? item.split('**')[1] : item.replace('- ', '')}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={index} className="text-organic-text leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>

        {/* Tags */}
        {story.tags && (
          <div className="mt-8 pt-8 border-t">
            <div className="flex flex-wrap gap-2">
              {story.tags.map(tag => (
                <span key={tag} className="bg-organic-background text-organic-text px-3 py-1 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio */}
        {story.authorBio && (
          <div className="mt-8 p-6 bg-organic-background rounded-lg">
            <div className="flex items-start gap-4">
              <img 
                src={story.authorImage} 
                alt={story.author}
                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
              />
              <div>
                <h3 className="font-semibold text-organic-text mb-2">About {story.author}</h3>
                <p className="text-organic-text opacity-75">{story.authorBio}</p>
                <Link 
                  to={`/artisans/${story.authorId || story.author.toLowerCase().replace(' ', '-')}`}
                  className="inline-flex items-center gap-2 text-organic-primary hover:text-organic-text font-medium mt-2"
                >
                  View Artisan Profile
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </article>

      {/* Related Products */}
      {story.relatedProducts && story.relatedProducts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-display text-2xl font-bold text-organic-text mb-6 text-center">
              Products from this Story
            </h2>
            <div className="text-center">
              <Link 
                to="/shop"
                className="inline-block bg-organic-primary text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-all"
              >
                Shop {story.author}'s Products
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}