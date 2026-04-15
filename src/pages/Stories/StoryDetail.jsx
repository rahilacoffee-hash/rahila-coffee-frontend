import React from "react";
import { useParams, Link } from "react-router-dom";
import { STORIES } from "./CoffeeStories";

const StoryDetail = () => {
  const { id } = useParams();
  const story = STORIES.find(s => s.id === Number(id));

  if (!story) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-gray-400 mb-4">Story not found.</p>
        <Link to="/stories" className="text-amber-800 underline">← Back to Stories</Link>
      </div>
    );
  }

  return (
    <section className="py-10 min-h-screen bg-gray-50">
      <div className="container max-w-3xl mx-auto px-4">
        <Link to="/stories" className="text-[13px] text-amber-800 hover:underline mb-6 inline-block">
          ← Back to Coffee Stories
        </Link>

        {/* Hero Image */}
        <div className="rounded-2xl overflow-hidden h-[350px] mb-8">
          <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
        </div>

        {/* Meta */}
        <span className="bg-amber-100 text-amber-800 text-[11px] font-semibold px-3 py-1 rounded-full">
          {story.category}
        </span>
        <h1 className="text-[32px] font-bold text-gray-800 mt-4 mb-2 leading-tight">
          {story.title}
        </h1>
        <p className="text-[13px] text-gray-400 mb-8">{story.date} · {story.readTime}</p>

        {/* Content */}
        <div className="prose max-w-none text-gray-600 leading-relaxed space-y-4">
          <p className="text-[15px]">{story.excerpt}</p>
          <p className="text-[15px]">
            Coffee is more than a beverage — it is a ritual, a culture, and a livelihood for millions of
            farmers across the globe. At Rahila Coffee, we believe every cup deserves a story, and every
            story deserves to be told.
          </p>
          <p className="text-[15px]">
            From the misty highlands where cherries ripen slowly under the African sun, to the careful
            hands of our roasters who coax out the perfect flavor profile — the journey of each bean is
            nothing short of remarkable.
          </p>
          <blockquote className="border-l-4 border-amber-700 pl-4 italic text-gray-500 my-6">
            "Great coffee is not an accident — it is the result of intentional choices made at every
            step of the process."
          </blockquote>
          <p className="text-[15px]">
            Whether you prefer a light, floral pour-over or a bold, dark espresso, we invite you to
            slow down, breathe in the aroma, and appreciate the world in your cup.
          </p>
        </div>

        {/* Related Stories */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <h3 className="text-[18px] font-bold text-gray-800 mb-5">More Stories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {STORIES.filter(s => s.id !== story.id).slice(0, 2).map(s => (
              <Link to={`/stories/${s.id}`} key={s.id}
                className="flex gap-3 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100">
                <img src={s.image} alt={s.title} className="w-16 h-16 object-cover rounded-lg shrink-0" />
                <div>
                  <p className="text-[11px] text-amber-800 font-semibold uppercase">{s.category}</p>
                  <p className="text-[13px] font-semibold text-gray-700 line-clamp-2">{s.title}</p>
                  <p className="text-[11px] text-gray-400 mt-1">{s.readTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryDetail;