import React, { useState } from "react";
import { Link } from "react-router-dom";

const faqs = [
  {
    category: "Orders",
    items: [
      { q: "How do I track my order?", a: "Go to Order Tracking in the top menu or footer, enter your Order ID (found in your confirmation email) and we'll show you real-time status." },
      { q: "Can I cancel my order?", a: "Orders can be cancelled within 1 hour of placing them. Go to My Orders, find the order and click Cancel Order. Once shipped, cancellation is no longer possible." },
      { q: "How long does delivery take?", a: "Standard delivery within Abuja takes 1-2 business days. Other cities in Nigeria typically take 2-4 business days." },
      { q: "What if my order arrives damaged?", a: "Take a photo immediately and contact us at orders@rahilacoffee.com within 24 hours. We will arrange a replacement or full refund." },
    ],
  },
  {
    category: "Payments",
    items: [
      { q: "What payment methods do you accept?", a: "We accept all major credit/debit cards (Visa, Mastercard) via Stripe. All payments are encrypted and secure." },
      { q: "Is my payment information safe?", a: "Yes. We never store your card details. All payments are processed by Stripe, a PCI-compliant payment processor." },
      { q: "When will I be charged?", a: "You are charged immediately when your order is placed and payment is confirmed." },
      { q: "Can I get a refund?", a: "Yes. Contact us within 7 days of delivery for a full refund on unopened products. Damaged items are replaced free of charge." },
    ],
  },
  {
    category: "Products",
    items: [
      { q: "Are your coffees freshly roasted?", a: "Yes! We roast in small batches every week. Your order is dispatched within 2-3 days of roasting for maximum freshness." },
      { q: "What grind should I choose?", a: "Whole Bean for the freshest taste (requires a grinder). Coarse for French Press. Medium for drip/pour-over. Fine for espresso." },
      { q: "Do you offer subscriptions?", a: "We're working on a subscription model for regular deliveries. Sign up for our newsletter to be the first to know." },
      { q: "Are your coffees organic?", a: "Most of our coffees are grown using natural farming methods. Check each product page for specific certifications." },
    ],
  },
  {
    category: "Account",
    items: [
      { q: "How do I create an account?", a: "Click Sign Up in the top navigation, fill in your details, and verify your email with the OTP we send you." },
      { q: "I forgot my password. What do I do?", a: "Click 'Forgot Password' on the login page. Enter your email and we'll send you a reset OTP within minutes." },
      { q: "How do I update my shipping address?", a: "Go to My Account → My Profile and update your address in the Shipping Address section." },
      { q: "Can I have multiple delivery addresses?", a: "Currently we support one saved address. You can always enter a different address at checkout." },
    ],
  },
];

const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 px-5 text-left hover:bg-amber-50 transition-colors rounded-lg"
      >
        <span className="text-[14px] font-semibold text-gray-800 pr-4">{q}</span>
        <span className="text-amber-800 text-[18px] shrink-0">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <p className="px-5 pb-4 text-[13px] text-gray-500 leading-relaxed">{a}</p>
      )}
    </div>
  );
};

const HelpCenter = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Orders");

  const filteredFaqs = search
    ? faqs.map(cat => ({
        ...cat,
        items: cat.items.filter(
          item => item.q.toLowerCase().includes(search.toLowerCase()) ||
                  item.a.toLowerCase().includes(search.toLowerCase())
        )
      })).filter(cat => cat.items.length > 0)
    : faqs.filter(cat => cat.category === activeCategory);

  return (
    <section className="py-10 min-h-screen bg-gray-50">
      <div className="container max-w-4xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-[36px] font-bold text-gray-800 mb-3">Help Center</h1>
          <p className="text-gray-400 text-[15px] mb-6">Find answers to common questions about orders, payments, and products.</p>

          {/* Search */}
          <div className="relative max-w-lg mx-auto">
            <span className="absolute left-4 top-3.5 text-gray-400 text-[18px]">🔍</span>
            <input
              type="text" placeholder="Search your question..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-[14px] focus:outline-none focus:border-amber-700 bg-white shadow-sm"
            />
          </div>
        </div>

        {!search && (
          /* Category tabs */
          <div className="flex gap-2 flex-wrap justify-center mb-8">
            {faqs.map(cat => (
              <button key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={`px-5 py-2 rounded-full text-[13px] font-semibold border transition-all
                  ${activeCategory === cat.category
                    ? "bg-amber-800 text-white border-amber-800"
                    : "bg-white text-gray-500 border-gray-200 hover:border-amber-400"}`}>
                {cat.category}
              </button>
            ))}
          </div>
        )}

        {/* FAQ accordion */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          {filteredFaqs.length === 0 ? (
            <p className="text-center py-10 text-gray-400">No results found for "{search}"</p>
          ) : (
            filteredFaqs.map(cat => (
              <div key={cat.category}>
                {search && (
                  <div className="px-5 py-3 bg-amber-50 border-b">
                    <p className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">{cat.category}</p>
                  </div>
                )}
                {cat.items.map((item, i) => <FaqItem key={i} q={item.q} a={item.a} />)}
              </div>
            ))
          )}
        </div>

        {/* Still need help */}
        <div className="bg-amber-900 rounded-2xl p-8 text-center text-white">
          <h3 className="text-[22px] font-bold mb-2">Still Need Help?</h3>
          <p className="text-amber-200 text-[14px] mb-5">
            Our team is available Monday – Friday, 9am – 6pm WAT
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/contact">
              <button className="bg-white text-amber-900 font-bold text-[13px] px-6 py-2.5 rounded-xl hover:bg-amber-50 transition-all">
                Contact Us
              </button>
            </Link>
            <a href="mailto:hello@rahilacoffee.com">
              <button className="border border-amber-300 text-white font-bold text-[13px] px-6 py-2.5 rounded-xl hover:bg-amber-800 transition-all">
                Email Support
              </button>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HelpCenter;