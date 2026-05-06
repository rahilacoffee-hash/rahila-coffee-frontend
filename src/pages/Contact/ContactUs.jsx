import React, { useState } from "react";
import Button from "@mui/material/Button";
import { CgMail } from "react-icons/cg";
import { FaMapPin } from "react-icons/fa6";
import { PiPhone } from "react-icons/pi";
import { BiCheckCircle } from "react-icons/bi";
import { BsSend } from "react-icons/bs";
import { FiAlertCircle } from "react-icons/fi";
import emailjs from "@emailjs/browser";
const ContactInfo = [
  {
    icon: <CgMail />,
    label: "Email",
    value: "abrahamfred123@gmail.com",
    href: "mailto:abrahamfred123@gmail.com",
  },
  {
    icon: <PiPhone />,
    label: "Phone",
    value: "+234 912 1249 422",
    href: "tel:+2349121249422",
  },
  {
    icon: <FaMapPin />,
    label: "Location",
    value: "Abuja, Nigeria",
    href: "#",
  },
];

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [submitStatus, setSubmitStatus] = useState({
    type: null,
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setSubmitStatus({
      type: null,
      message: "",
    });

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        publicKey,
      );

      setSubmitStatus({
        type: "success",
        message: "Message sent successfully. I'll get back to you soon.",
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Failed to send email:", error);

      setSubmitStatus({
        type: "error",
        message: error.text || "Failed to send message. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-gray-50">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-800/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
            Get in Touch
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-secondary-foreground">
            Let's build
            <span className="font-serif italic font-normal text-amber-800">
              {" "}
              something great.
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="relative order-2 w-full">
            <div className="relative bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-2xl border border-white/10">
              <div className="bg-gradient-to-br from-gray-900/20 to-amber-800/20 backdrop-blur-sm rounded-lg overflow-hidden border border-white/5 ">
                <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-white/5 backdrop-blur-sm border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                    <span className="text-xs sm:text-sm text-gray-900 font-bold">
                      Get{" "}
                      <span className="text-amber-900 font-bold">In Touch</span>
                    </span>
                  </div>
                </div>
                {/* Contact Form */}
                <div className=" mt-5 glass p-8 rounded-3xl border border-primary/30">
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
                      >
                        Name
                      </label>

                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            name: e.target.value,
                          })
                        }
                        placeholder="Your name..."
                        className="w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
                      >
                        Email
                      </label>

                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: e.target.value,
                          })
                        }
                        placeholder="youremail@gmail.com"
                        className="w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-2"
                      >
                        Message
                      </label>

                      <textarea
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            message: e.target.value,
                          })
                        }
                        placeholder="Your message..."
                        className="w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      className="w-full  !text-amber-900 !capitalize !px-8 !py-2.5 "
                      type="submit"
                      size="lg"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <BsSend className="h-5 w-5 ml-2" />
                        </>
                      )}
                    </Button>

                    {/* Success/Error Message */}
                    {submitStatus.type && (
                      <div
                        className={`flex items-center gap-3 p-4 rounded-xl ${
                          submitStatus.type === "success"
                            ? "bg-green-500/10 border border-green-500/20 text-green-500"
                            : "bg-red-500/10 border border-red-500/20 text-red-500"
                        }`}
                      >
                        {submitStatus.type === "success" ? (
                          <BiCheckCircle className="w-5 h-5 flex-shrink-0" />
                        ) : (
                          <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
                        )}

                        <p>{submitStatus.message}</p>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {ContactInfo.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="flex items-center gap-4 p-5 glass rounded-2xl border border-primary/20 hover:border-primary/40 transition"
              >
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center  text-xl">
                  {item.icon}
                </div>

                <div>
                  <h4 className="font-semibold">{item.label}</h4>
                  <p className="text-sm text-gray-400">{item.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
