import React from "react";
import { Link } from "react-router-dom";

const BlogCard = () => {
  return (
    <>
      {/* first blog */}
      <div className="bg-white group rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
        {/* Image */}
        <div className="relative">
          <img
            src="https://res.cloudinary.com/dwwsz3kss/image/upload/v1764848567/icv-ng/zqukxf5gy1r2yzxxrkyd.webp"
            alt=" How To Store Coffee Beans For Freshness"
            className="h-48 w-full object-cover group-hover:scale-104 "
          />

          {/* Category badge */}
          <h1 className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
            Coffee Culture
          </h1>

          {/* Featured badge */}
          <h1 className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
            Featured
          </h1>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Meta */}
          <div className="text-xs text-gray-500 flex gap-2 mb-2">
            <span>Dec 4, 2025</span>
            <span>•Tofunmi</span>
            <span>• 2 min read</span>
          </div>

          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            <Link to="/" className="link">
           
              How To Store Coffee Beans For Freshness
            </Link>
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4">
            How to Store Coffee Beans for Freshness to Keep Flavor In and Keep
            the Stale Out.
          </p>

          {/* Footer */}
          <div className="flex justify-between items-center text-sm">
            <button className="text-orange-500 hover:underline">
               <Link to="/"> Read More →</Link>
            </button>
          </div>
        </div>
      </div>
      {/* second blog */}
      <div className="bg-white rounded-xl group shadow-md overflow-hidden hover:shadow-lg transition">
        {/* Image */}
        <div className="relative">
          <img
            src="https://res.cloudinary.com/dwwsz3kss/image/upload/v1762510054/icv-ng/xfhxqqdq1tuzlkwwbvhc.webp"
            alt="The Role of Water in Coffee Brewing"
            className="h-48 w-full object-cover group-hover:scale-104"
          />

          {/* Category badge */}
          <h1 className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
            Brewing Techniques
          </h1>

          {/* Featured badge */}
          <h1 className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
            Featured
          </h1>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Meta */}
          <div className="text-xs text-gray-500 flex gap-2 mb-2">
            <span>Nov 7, 2025</span>
            <span>• Moyo</span>
            <span>• 1 min read</span>
          </div>

          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
             <Link to="/" className="link">
            The Role of Water in Coffee Brewing
            </Link>
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4">
            Your Coffee Is 98% Water—Make It Count You can use the best beans
            and perfect your grind.
          </p>

          {/* Footer */}
          <div className="flex justify-between items-center text-sm">
            <button className="text-orange-500 hover:underline">
               <Link to="/"> Read More →</Link>
            </button>
          </div>
        </div>
      </div>
      {/* third blog */}
      <div className="bg-white rounded-xl shadow-md group overflow-hidden hover:shadow-lg transition">
        {/* Image */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1442550528053-c431ecb55509?w=800"
            alt="The Role of Water in Coffee Brewing"
            className="h-48 w-full object-cover group-hover:scale-104"
          />

          {/* Category badge */}
          <h1 className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
            Coffee Origins
          </h1>

          {/* Featured badge */}
          <h1 className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
            Featured
          </h1>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Meta */}
          <div className="text-xs text-gray-500 flex gap-2 mb-2">
            <span>Jul 21, 2025</span>
            <span>• Samuel</span>
            <span>• 1 min read</span>
          </div>

          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
          <Link to="/" className="link">
            Colombian Coffee: The Perfect Climate for Beans
            </Link>
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4">
            Explore how Colombia's unique geography and climate create some of
            the world's most beloved coffee beans.
          </p>

          {/* Footer */}
          <div className="flex justify-between items-center text-sm">
           <button className="text-orange-500 hover:underline">
               <Link to="/"> Read More →</Link>
            </button>
          </div>
        </div>
      </div>
      {/* fourth blog */}
      <div className="bg-white rounded-xl shadow-md group overflow-hidden hover:shadow-lg transition">
        {/* Image */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800"
            alt="The Role of Water in Coffee Brewing"
            className="h-48 w-full object-cover group-hover:scale-104"
          />

          {/* Category badge */}
          <h1 className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
            Coffee Origins
          </h1>

          {/* Featured badge */}
          <h1 className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
            Featured
          </h1>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Meta */}
          <div className="text-xs text-gray-500 flex gap-2 mb-2">
            <span> Jul 21, 2025</span>
            <span>• Samuel</span>
            <span>• 1 min read</span>
          </div>

          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
             <Link to="/" className="link">
            Brazilian Coffee: The Giant of Global Coffee Production
            </Link>
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4">
            Explore how Colombia's unique geography and climate create some of
            the world's most beloved coffee beans.
          </p>

          {/* Footer */}
          <div className="flex justify-between items-center text-sm">
             <button className="text-orange-500 hover:underline">
               <Link to="/"> Read More →</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
