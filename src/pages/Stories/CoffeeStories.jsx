

import React from "react";
import { Link } from "react-router-dom";

const STORIES = [
  {
    id: 1,
    title: "The Journey of Ethiopian Yirgacheffe",
    excerpt: "Discover how this legendary light roast travels from the highlands of Ethiopia to your morning cup. We trace every step from cherry to brew.",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&h=400&fit=crop",
    category: "Origin Story",
    date: "March 15, 2025",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Why Single-Origin Coffee Tastes Different",
    excerpt: "Altitude, soil, rainfall — all shape the flavor profile of your coffee. Here's the science behind why single-origin beans are so unique.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop",
    category: "Education",
    date: "March 10, 2025",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "How to Brew the Perfect Pour-Over",
    excerpt: "Master the art of pour-over brewing with our step-by-step guide. From grind size to water temperature — every detail matters.",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop",
    category: "Brewing Guide",
    date: "March 5, 2025",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Kenya AA: The Wine of Coffees",
    excerpt: "Bold, fruity, and bright — Kenya AA is unlike anything else in the coffee world. We explore what makes this East African gem so special.",
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&h=400&fit=crop",
    category: "Origin Story",
    date: "Feb 28, 2025",
    readTime: "5 min read",
  },
  {
    id: 5,
    title: "Dark Roast vs Light Roast: Which Is Right for You?",
    excerpt: "Many people choose their roast by color, but the real difference lies in flavor complexity, caffeine content, and brewing method.",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&h=400&fit=crop",
    category: "Education",
    date: "Feb 20, 2025",
    readTime: "4 min read",
  },
  {
    id: 6,
    title: "Our Sourcing Philosophy: Direct Trade",
    excerpt: "At Rahila Coffee, we believe in fair compensation for farmers. Learn how our direct trade relationships ensure quality and sustainability.",
    image: "https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=600&h=400&fit=crop",
    category: "Behind the Brand",
    date: "Feb 10, 2025",
    readTime: "7 min read",
  },
];

const CoffeeStories = () => {
  return (
    <section className="py-10 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-[26px] md:text-[36px] font-bold text-gray-800 mb-3">
            ☕ Coffee Stories & Insights
          </h1>
          <p className="text-gray-400 text-[14px] md:text-[15px] max-w-xl mx-auto">
            Explore the world behind your cup — origins, brewing guides, and the stories of the people who grow our coffee.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-10">
          <Link to="/stories/1" className="block group">
            <div className="relative rounded-2xl overflow-hidden h-[220px] sm:h-[300px] md:h-[380px]">
              <img
                src={STORIES[0].image}
                alt={STORIES[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 md:p-8">
                <span className="bg-amber-800 text-white text-[11px] font-semibold px-3 py-1 rounded-full mb-3 inline-block">
                  {STORIES[0].category}
                </span>
                <h2 className="text-white text-[18px] md:text-[28px] font-bold leading-tight mb-2">
                  {STORIES[0].title}
                </h2>
                <p className="text-gray-300 text-[12px] md:text-[13px]">
                  {STORIES[0].date} · {STORIES[0].readTime}
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Grid — 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {STORIES.slice(1).map(story => (
            <div key={story.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col">
              <Link to={`/stories/${story.id}`} className="overflow-hidden block h-[200px]">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </Link>
              <div className="p-5 flex flex-col flex-1">
                <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider mb-2">
                  {story.category}
                </span>
                <Link to={`/stories/${story.id}`}>
                  <h3 className="text-[15px] font-bold text-gray-800 hover:text-amber-800 transition-colors leading-snug mb-2">
                    {story.title}
                  </h3>
                </Link>
                <p className="text-[13px] text-gray-500 line-clamp-2 flex-1 mb-4">
                  {story.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <p className="text-[11px] text-gray-400">{story.date} · {story.readTime}</p>
                  <Link to={`/stories/${story.id}`} className="text-[12px] font-semibold text-amber-800 hover:underline">
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export { STORIES };
export default CoffeeStories