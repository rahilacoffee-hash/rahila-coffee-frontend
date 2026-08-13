import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/axios";

const fallbackImage = "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=900&h=500&fit=crop";

export default function StoryDetail() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { api.get(`/blog/${id}`).then((res) => setStory(res.data.data)).catch(() => setStory(null)).finally(() => setLoading(false)); }, [id]);
  if (loading) return <div className="text-center py-20 text-gray-400">Loading story...</div>;
  if (!story) return <div className="flex flex-col items-center justify-center py-20"><p className="text-gray-400 mb-4">Story not found.</p><Link to="/stories" className="text-amber-800 underline">← Back to Stories</Link></div>;
  return <section className="py-10 min-h-screen bg-gray-50"><div className="container max-w-3xl mx-auto px-4"><Link to="/stories" className="text-[13px] text-amber-800 hover:underline mb-6 inline-block">← Back to Coffee Stories</Link><div className="rounded-2xl overflow-hidden h-[350px] mb-8"><img src={story.image || fallbackImage} alt={story.title} className="w-full h-full object-cover" /></div><span className="bg-amber-100 text-amber-800 text-[11px] font-semibold px-3 py-1 rounded-full">{story.category}</span><h1 className="text-[32px] font-bold text-gray-800 mt-4 mb-2 leading-tight">{story.title}</h1><p className="text-[13px] text-gray-400 mb-8">{new Date(story.createdAt).toLocaleDateString()} · {story.readTime}</p><div className="prose max-w-none text-gray-600 leading-relaxed whitespace-pre-line"><p className="text-[15px] font-medium mb-5">{story.excerpt}</p><p className="text-[15px]">{story.content}</p></div></div></section>;
}
