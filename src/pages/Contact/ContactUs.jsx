import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const ContactUs = () => {
  const [form, setForm]       = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  return (
    <section className="py-10 min-h-screen bg-gray-50">
      <div className="container max-w-5xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-[36px] font-bold text-gray-800 mb-3">Get in Touch</h1>
          <p className="text-gray-400 text-[15px] max-w-lg mx-auto">
            Have a question about an order, our coffee, or a wholesale enquiry?
            We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Info Cards */}
          <div className="space-y-5">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mb-3 text-xl">📍</div>
              <h4 className="font-bold text-gray-800 mb-1">Visit Us</h4>
              <p className="text-[13px] text-gray-500">
                12 Aminu Kano Crescent<br />
                Wuse 2, Abuja, FCT<br />
                Nigeria
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mb-3 text-xl">📧</div>
              <h4 className="font-bold text-gray-800 mb-1">Email Us</h4>
              <p className="text-[13px] text-gray-500">hello@rahilacoffee.com</p>
              <p className="text-[13px] text-gray-500">orders@rahilacoffee.com</p>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mb-3 text-xl">📞</div>
              <h4 className="font-bold text-gray-800 mb-1">Call Us</h4>
              <p className="text-[13px] text-gray-500">+234 801 234 5678</p>
              <p className="text-[11px] text-gray-400 mt-1">Mon–Fri, 9am–6pm WAT</p>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mb-3 text-xl">🕐</div>
              <h4 className="font-bold text-gray-800 mb-1">Opening Hours</h4>
              <p className="text-[13px] text-gray-500">Monday – Friday: 9am – 7pm</p>
              <p className="text-[13px] text-gray-500">Saturday: 10am – 5pm</p>
              <p className="text-[13px] text-gray-500">Sunday: Closed</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-[18px] font-bold text-gray-800 mb-6">Send Us a Message</h3>

              {sent ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mb-4">✅</div>
                  <h3 className="text-[18px] font-bold text-gray-800 mb-2">Message Sent!</h3>
                  <p className="text-gray-400 text-[14px]">
                    Thanks for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name:"", email:"", subject:"", message:"" }); }}
                    className="mt-4 text-amber-800 text-[13px] hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextField
                      label="Your Name *" name="name" value={form.name}
                      onChange={handleChange} size="small" fullWidth required
                    />
                    <TextField
                      label="Email Address *" name="email" type="email"
                      value={form.email} onChange={handleChange} size="small" fullWidth required
                    />
                  </div>
                  <TextField
                    label="Subject *" name="subject" value={form.subject}
                    onChange={handleChange} size="small" fullWidth required
                  />
                  <TextField
                    label="Message *" name="message" value={form.message}
                    onChange={handleChange} multiline rows={5} fullWidth required
                    placeholder="Tell us about your order, question, or feedback..."
                  />
                  <Button
                    type="submit" disabled={loading}
                    className="!bg-amber-800 !text-white !capitalize !px-8 !py-2.5"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;