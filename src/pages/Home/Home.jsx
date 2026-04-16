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

const Home = () => {
  const [value, setValue]       = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);

  const handleChange = (event, newValue) => setValue(newValue);

  const categories = [
    "Single Origin","Blends","Espresso",
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
      if (categories[value]) params.append("catName", categories[value]);
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
      <div className="hero min-h-[480px] sm:min-h-[580px] bg-[#F5F0EB] flex items-center">
        <div className="container py-8 sm:py-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">

            {/* Text */}
            <div className="flex flex-col gap-4 order-2 sm:order-1 text-center sm:text-left">
              <div className="w-fit mx-auto sm:mx-0 px-4 py-1 bg-[#A0522D] text-[#F5F0EB] rounded-full text-[12px] sm:text-sm font-semibold tracking-wide">
                ☕ Premium Roasts · Abuja's Finest
              </div>
              <h1 className="text-[2.5rem] sm:text-5xl lg:text-6xl font-bold leading-tight text-[#2C1A0E]">
                We Serve <br />
                the Richest{" "}
                <span className="italic text-[#A0522D]">Coffee</span>
                <br />
                in the City
              </h1>
              <p className="text-[14px] sm:text-base max-w-md mx-auto sm:mx-0 text-[#2C1A0E]">
                Handpicked beans, expertly brewed. From espresso to cold brew —
                experience coffee the way it was meant to be.
              </p>
            </div>

            {/* Image */}
            <div className="flex justify-center items-center order-1 sm:order-2 relative">
              <div className="absolute w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] lg:w-[420px] lg:h-[420px] bg-[#D4A853] rounded-full imgbg" />
              <img
                src={HeroImg}
                alt="Coffee beans"
                className="w-[200px] sm:w-[300px] lg:w-[400px] mx-auto relative z-10 spin drop-shadow-2xl"
              />
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
          <ProductSlider items={6} />
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
          <ProductSlider items={6} />
        </div>
      </section>
    </>
  );
};

export default Home;