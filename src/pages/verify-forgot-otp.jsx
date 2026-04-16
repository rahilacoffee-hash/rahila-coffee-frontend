// pages/Verify/VerifyForgotOTP.jsx
import React, { useState, useRef } from "react";
import { Button } from "@mui/material";
import { VerifiedUserOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const VerifyForgotOTP = () => {
  const [otpArray, setOtpArray] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [resending, setResending] = useState(false);
  const inputRefs               = useRef([]);
  const navigate                = useNavigate();

  const email = localStorage.getItem("pendingEmail") || "";

  const handleChange = (value, index) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newOtp  = [...otpArray];
    newOtp[index] = value.slice(-1);
    setOtpArray(newOtp);

    // Auto-advance to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Go back on backspace
    if (e.key === "Backspace" && !otpArray[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtp = [...otpArray];
    pasted.split("").forEach((char, i) => { newOtp[i] = char; });
    setOtpArray(newOtp);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const otp = otpArray.join("");
    if (otp.length < 6) { setError("Please enter all 6 digits"); return; }

    setLoading(true);
    try {
      // ← CORRECT route: /user/verify-forgot-password-otp
      const res = await api.post("/user/verify-forgot-password-otp", { email, otp });

      if (res.data.success) {
        navigate("/change-password");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
      // Clear inputs on error
      setOtpArray(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;
    setResending(true);
    setError("");
    try {
      await api.post("/user/forgot-password", { email });
      setError(""); // clear errors
      alert("New OTP sent to your email!");
      setOtpArray(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (err) {
      setError("Failed to resend. Please try again.");
    } finally {
      setResending(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-[#f1f1f1] px-4">
      <div className="w-full max-w-[480px] bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-stone-100 text-center">

        <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-5 text-amber-900">
          <VerifiedUserOutlined style={{ fontSize: "40px" }} />
        </div>

        <h2 className="text-2xl font-black text-stone-800">Check Your Email</h2>
        <p className="text-sm text-stone-400 mt-2 mb-6 leading-relaxed">
          We sent a 6-digit OTP to<br />
          <span className="text-amber-900 font-bold">{email || "your email"}</span>
        </p>

        {error && (
          <p className="text-red-500 text-[13px] mb-4 bg-red-50 px-3 py-2 rounded-xl">{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          {/* OTP inputs */}
          <div className="flex justify-between gap-2 mb-6" onPaste={handlePaste}>
            {otpArray.map((digit, idx) => (
              <input
                key={idx}
                ref={el => inputRefs.current[idx] = el}
                type="text"
                inputMode="numeric"
                value={digit}
                maxLength={1}
                onChange={e => handleChange(e.target.value, idx)}
                onKeyDown={e => handleKeyDown(e, idx)}
                className={`w-full h-14 sm:h-16 border-2 rounded-2xl text-center text-[22px] font-bold focus:outline-none transition-all
                  ${digit ? "border-amber-700 bg-amber-50" : "border-stone-200"}`}
              />
            ))}
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading || otpArray.join("").length < 6}
            className="!bg-amber-900 !h-14 !rounded-2xl !font-bold !capitalize !text-[15px]"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>

        <p className="mt-6 text-sm text-stone-400">
          Didn't receive the code?{" "}
          <button
            onClick={handleResend}
            disabled={resending}
            className="text-amber-900 font-black hover:underline disabled:opacity-50"
          >
            {resending ? "Sending..." : "Resend OTP"}
          </button>
        </p>
      </div>
    </section>
  );
};

export default VerifyForgotOTP;