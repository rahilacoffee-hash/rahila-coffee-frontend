

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

const fallbackImage = "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&h=400&fit=crop";
const formatDate = (date) => new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });

const CoffeeStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { api.get("/blog").then((res) => setStories(res.data.data || [])).catch(console.error).finally(() => setLoading(false)); }, []);
  const featured = stories[0];
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

        {loading ? <p className="text-center text-gray-400 py-10">Loading stories...</p> : !featured ? <p className="text-center text-gray-400 py-10">New coffee stories are coming soon.</p> : <>
        <div className="mb-10">
          <Link to={`/stories/${featured._id}`} className="block group">
            <div className="relative rounded-2xl overflow-hidden h-[220px] sm:h-[300px] md:h-[380px]">
              <img
                src={featured.image || fallbackImage}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 md:p-8">
                <span className="bg-amber-800 text-white text-[11px] font-semibold px-3 py-1 rounded-full mb-3 inline-block">
                  {featured.category}
                </span>
                <h2 className="text-white text-[18px] md:text-[28px] font-bold leading-tight mb-2">
                  {featured.title}
                </h2>
                <p className="text-gray-300 text-[12px] md:text-[13px]">
                  {formatDate(featured.createdAt)} · {featured.readTime}
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Grid — 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.slice(1).map(story => (
            <div key={story._id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col">
              <Link to={`/stories/${story._id}`} className="overflow-hidden block h-[200px]">
                <img
                  src={story.image || fallbackImage}
                  alt={story.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </Link>
              <div className="p-5 flex flex-col flex-1">
                <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider mb-2">
                  {story.category}
                </span>
                <Link to={`/stories/${story._id}`}>
                  <h3 className="text-[15px] font-bold text-gray-800 hover:text-amber-800 transition-colors leading-snug mb-2">
                    {story.title}
                  </h3>
                </Link>
                <p className="text-[13px] text-gray-500 line-clamp-2 flex-1 mb-4">
                  {story.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <p className="text-[11px] text-gray-400">{formatDate(story.createdAt)} · {story.readTime}</p>
                  <Link to={`/stories/${story._id}`} className="text-[12px] font-semibold text-amber-800 hover:underline">
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        </>}

      </div>
    </section>
  );
};

export default CoffeeStories
