import React, { useEffect, useState } from "react";
import HeroImg from "../../assets/hImage (1).png";
import HomeCatSlider from "../../components/HomeCatSlider/CatSlider";
import { TbTruckDelivery } from "react-icons/tb";
import AdsBannerSlider from "../../components/AdsBannerSlider/AdsBannerSlider";
import NavSwiper from "../../components/AdsBannerSlider/AutoAds";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ProductSlider from "../../components/product/ProductSlider";
import CoffeeStories from "../Stories/CoffeeStories";
import api from "../../api/axios";
import HomeProductItems from "../../components/product/HomeProductItems";
import { Link } from "react-router-dom";

const Home = () => {
  const [value, setValue]       = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);

  const handleChange = (event, newValue) => setValue(newValue);

  const categories = [
    "All Products", "Single Origin","Blends","Espresso",
    "Cold Brew","Equipment","Liquor & Sweets",
    "Coffee Bean","Coffee Ground","E.S.E Pods",
  ];

  useEffect(() => {
    fetchProducts();
  }, [value]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      const selectedCategory = categories[value];
      if (selectedCategory && selectedCategory !== "All Products") {
        params.append("catName", selectedCategory);
      }
      const res = await api.get(`/product?${params.toString()}`);
      setProducts(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── Hero ── */}
     <div
  className="hero min-h-[680px] lg:min-h-[760px] bg-[#F5F0EB] bg-cover bg-center flex items-center overflow-hidden"
  style={{
    backgroundImage: `url("/image/rahila-coffee-hero.png")`,
  }}
>
  {/* Soft overlay to keep text readable */}
  <div className="absolute inset-0 bg-gradient-to-r from-[#F5F0EB]/95 via-[#F5F0EB]/70 to-transparent" />

  <div className="container relative z-10 py-16 lg:py-20">
    <div className="max-w-[650px]">

      {/* ================= TEXT ================= */}
      <div className="flex flex-col items-center lg:items-start text-center lg:text-left">

        {/* Badge */}
        <div className="w-fit px-4 py-2 border border-[#A0522D]/40 text-[#6B3A20] rounded-full text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase">
          ☕ Premium Roasts · Abuja's Finest
        </div>

        {/* Heading */}
        <h1 className="mt-7 text-[3.2rem] sm:text-6xl lg:text-[5.5rem] xl:text-[6rem] font-serif font-medium leading-[0.95] tracking-[-0.04em] text-[#2C1A0E]">
          Good Coffee.
          <br />

          <span className="italic text-[#A0522D]">
            Better Mornings.
          </span>
        </h1>

        {/* Description */}
        <p className="mt-7 max-w-lg text-[15px] sm:text-base leading-7 text-[#5A4639]">
          Carefully sourced beans, expertly roasted and brewed to bring out
          rich flavors in every cup. Made for slow moments and good
          conversations.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
<Link to="/ShopNow">
          <button
            className="
              px-7 py-3.5
              bg-[#A0522D]
              text-white
              rounded-full
              text-sm
              font-semibold
              tracking-wide
              hover:bg-[#8B4526]
              transition-all
              duration-300
              hover:-translate-y-0.5
              shadow-lg
              shadow-[#A0522D]/20
            "
          >
            Shop Coffee
          </button>
          </Link>
<Link to="/about">
          <button
            className="
              px-7 py-3.5
              border
              border-[#6B3A20]/40
              text-[#3A2518]
              rounded-full
              text-sm
              font-semibold
              tracking-wide
              hover:bg-[#2C1A0E]
              hover:text-white
              transition-all
              duration-300
            "
          >
            Our Story
          </button>
          </Link>

        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-5 sm:gap-8 mt-12 pt-7 border-t border-[#2C1A0E]/10 w-full max-w-xl">

          <div>
            <p className="text-lg font-semibold text-[#2C1A0E]">
              100%
            </p>

            <p className="text-[11px] sm:text-xs text-[#765F50] mt-1">
              Premium Beans
            </p>
          </div>

          <div className="border-x border-[#2C1A0E]/10">
            <p className="text-lg font-semibold text-[#2C1A0E]">
              Small
            </p>

            <p className="text-[11px] sm:text-xs text-[#765F50] mt-1">
              Batch Roasted
            </p>
          </div>

          <div>
            <p className="text-lg font-semibold text-[#2C1A0E]">
              Fresh
            </p>

            <p className="text-[11px] sm:text-xs text-[#765F50] mt-1">
              From Farm to Cup
            </p>
          </div>

        </div>

      </div>

    </div>
  </div>
</div>
      {/* ── Nav Swiper ── */}
      <NavSwiper />

      {/* ── Category Slider ── */}
      <HomeCatSlider />

      {/* ── Shop by Category ── */}
      <section className="bg-[#f5f0eb] py-8">
        <div className="container">

          {/* Header row — stacks on mobile */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <h2 className="text-[22px] sm:text-[25px] font-bold text-[#000]">
              Shop by Category
            </h2>
            <div className="w-full sm:w-[65%]">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                aria-label="category tabs"
                sx={{
                  "& .MuiTab-root": { fontSize: "12px", minWidth: "auto", padding: "6px 12px" },
                  "& .Mui-selected": { color: "#A0522D !important" },
                  "& .MuiTabs-indicator": { backgroundColor: "#A0522D" },
                }}
              >
                {categories.map(cat => <Tab key={cat} label={cat} />)}
              </Tabs>
            </div>
          </div>

          {/* Products grid */}
          {loading ? (
            <p className="text-center py-10 text-gray-400">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="text-center py-10 text-gray-400">No products in this category yet.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {products.slice(0, 8).map(product => (
                <HomeProductItems key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Free Delivery Banner ── */}
      <section className="py-8 sm:py-16 bg-[#f5f0eb]">
        <div className="container">

          {/* Banner — stacks on mobile */}
          <div className="w-full sm:w-[85%] mx-auto py-4 px-4 sm:px-6 border border-[#572602] flex flex-col sm:flex-row items-center justify-between rounded-md mb-5 gap-3 sm:gap-0 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <TbTruckDelivery className="text-[36px] sm:text-[50px] text-[#572602] shrink-0" />
              <span className="text-[16px] sm:text-[20px] font-bold uppercase">
                FREE DELIVERY
              </span>
            </div>
            <p className="text-[13px] sm:text-[14px] font-[500] text-gray-700 max-w-[300px] sm:max-w-none">
              Freshly Roasted Coffee Delivered To Your Door ☕ — First Order Discount Available
            </p>
            <p className="font-bold text-[16px] sm:text-[20px] text-[#572602]">
              Orders Above $50 Only*
            </p>
          </div>

          <AdsBannerSlider items={4} />
        </div>
      </section>

      {/* ── New Arrivals ── */}
      <section className="py-5 bg-[#f5f0eb]">
        <div className="container">
          <h2 className="text-[20px] sm:text-[25px] font-bold">New Arrivals</h2>
          <p className="text-[13px] text-gray-500 mb-4">Check out our latest products</p>
          <ProductSlider items={6} filter="newArrival" />
        </div>
      </section>

      {/* ── Coffee Stories ── */}
      <section>
        <CoffeeStories />
      </section>

      {/* ── Most Popular ── */}
      <section className="py-5 bg-[#f5f0eb]">
        <div className="container">
          <h2 className="text-[20px] sm:text-[25px] font-bold">Most Popular</h2>
          <p className="text-[13px] text-gray-500 mb-4">Loved by our customers</p>
          <ProductSlider items={6} filter="popular" />
        </div>
      </section>
    </>
  );
};

export default Home;
