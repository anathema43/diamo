import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeftIcon, CalendarIcon, ClockIcon, ShareIcon } from "@heroicons/react/24/outline";
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
        // Demo story for when Firebase isn't configured
        const demoStory = {
          id: '1',
          title: 'The Ancient Art of Darjeeling Pickle Making',
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
          relatedProducts: ['1'] // Product IDs
        };
        setStory(demoStory);
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