import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const AboutUs = () => {
  return (
    <div className="min-h-screen">

      {/* Hero */}
      <div className="relative h-[420px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1400&h=500&fit=crop"
          alt="Coffee farm"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 right-0 inset-0 bg-black/55 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-[42px] font-bold text-white mb-4">Our Story</h1>
          <p className="text-gray-200 text-[16px] max-w-xl">
            Born in Abuja, rooted in Africa, connected to the world's finest coffee origins.
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <span className="text-amber-800 text-[11px] font-bold uppercase tracking-widest">Our Mission</span>
          <h2 className="text-[32px] font-bold text-gray-800 mt-3 mb-5">
            More Than Just Coffee
          </h2>
          <p className="text-gray-500 text-[15px] leading-relaxed max-w-2xl mx-auto">
            Rahila Coffee was founded on a simple belief: that exceptional coffee, sourced responsibly and
            roasted with care, should be accessible to everyone. We work directly with small-scale farmers
            across Africa and Central America to bring you beans that carry the full story of their origin.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 bg-amber-50">
        <div className="container max-w-5xl mx-auto px-4">
          <h2 className="text-[28px] font-bold text-gray-800 text-center mb-10">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="font-bold text-gray-800 mb-2">Sustainability</h3>
              <p className="text-[13px] text-gray-500">
                We use eco-friendly packaging and support farming practices that protect the environment
                for future generations.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="font-bold text-gray-800 mb-2">Direct Trade</h3>
              <p className="text-[13px] text-gray-500">
                We pay farmers above fair trade rates and visit our sourcing partners regularly
                to ensure ethical conditions.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <div className="text-4xl mb-4">☕</div>
              <h3 className="font-bold text-gray-800 mb-2">Quality First</h3>
              <p className="text-[13px] text-gray-500">
                Every batch is cupped and scored by our certified Q-graders before it earns a place
                in our lineup.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-white">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-amber-800 text-[11px] font-bold uppercase tracking-widest">How It Started</span>
              <h2 className="text-[28px] font-bold text-gray-800 mt-3 mb-4">
                From a Kitchen Table to Your Doorstep
              </h2>
              <p className="text-gray-500 text-[14px] leading-relaxed mb-4">
                Rahila Coffee started in 2022 when our founder, passionate about specialty coffee and
                frustrated by the lack of quality options in Nigeria, began importing single-origin beans
                directly from Ethiopia and Kenya.
              </p>
              <p className="text-gray-500 text-[14px] leading-relaxed mb-6">
                What began as a passion project quickly grew into a full e-commerce platform connecting
                Nigerian coffee lovers with the world's finest beans. Today, we serve hundreds of customers
                across the country with next-day delivery to major cities.
              </p>
              <Link to="/ShopNow">
                <Button className="!bg-amber-800 !text-white !capitalize !px-6 !py-2">
                  Shop Our Collection
                </Button>
              </Link>
            </div>
            <div className="rounded-2xl overflow-hidden h-[350px]">
              <img
                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop"
                alt="Coffee roasting"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-amber-900 text-white">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-[40px] font-black">24+</p>
              <p className="text-amber-200 text-[13px] mt-1">Coffee Origins</p>
            </div>
            <div>
              <p className="text-[40px] font-black">500+</p>
              <p className="text-amber-200 text-[13px] mt-1">Happy Customers</p>
            </div>
            <div>
              <p className="text-[40px] font-black">12</p>
              <p className="text-amber-200 text-[13px] mt-1">Farm Partners</p>
            </div>
            <div>
              <p className="text-[40px] font-black">3yrs</p>
              <p className="text-amber-200 text-[13px] mt-1">In Business</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-[28px] font-bold text-gray-800 mb-4">Ready to Taste the Difference?</h2>
        <p className="text-gray-400 text-[14px] mb-6">
          Browse our curated selection of single-origin coffees from around the world.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/ShopNow">
            <Button className="!bg-amber-800 !text-white !capitalize !px-8 !py-2.5">
              Shop Now
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outlined" className="!border-amber-800 !text-amber-800 !capitalize !px-8 !py-2.5">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;