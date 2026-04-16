import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { MailOutline } from "@mui/icons-material";
import api from "../../api/axios";

const ForgotPassword = () => {
  const [email, setEmail]     = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [sent, setSent]       = useState(false);
  const navigate              = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) { setError("Please enter your email address"); return; }

    setLoading(true);
    try {
      const res = await api.post("/user/forgot-password", { email });
      if (res.data.success) {
        localStorage.setItem("pendingEmail", email);
        setSent(true);
        setTimeout(() => navigate("/verify-forgot-otp"), 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-[#f1f1f1] px-4">
      <div className="w-full max-w-[450px] bg-white p-8 md:p-12 rounded-[32px] shadow-sm border border-stone-100">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-amber-900">
            <MailOutline fontSize="large" />
          </div>
          <h2 className="text-2xl font-black text-stone-800">Forgot Password?</h2>
          <p className="text-sm text-stone-400 mt-2 font-medium">
            Enter your registered email and we'll send you a reset OTP.
          </p>
        </div>

        {sent ? (
          <div className="text-center">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">✅</div>
            <p className="text-green-700 font-bold text-[15px] mb-2">OTP Sent!</p>
            <p className="text-stone-400 text-[13px]">
              Check your inbox at <span className="font-bold text-amber-900">{email}</span>.<br/>
              Redirecting to verification...
            </p>
          </div>
        ) : (
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <p className="text-red-500 text-[13px] text-center bg-red-50 px-3 py-2 rounded-xl">{error}</p>
            )}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <TextField
                fullWidth variant="outlined" type="email"
                value={email} onChange={e => setEmail(e.target.value)}
                placeholder="e.g. you@rahilacoffee.com"
                InputProps={{ className: "rounded-2xl h-14 bg-stone-50" }}
              />
            </div>
            <Button type="submit" fullWidth variant="contained" disabled={loading}
              className="!bg-amber-900 hover:!bg-amber-950 !h-14 !rounded-2xl !font-bold !capitalize !text-[15px]">
              {loading ? "Sending OTP..." : "Send Reset OTP"}
            </Button>
            <div className="text-center pt-2">
              <Link to="/login" className="text-sm text-amber-900 font-black hover:underline">
                ← Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default ForgotPassword;