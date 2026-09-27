import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import AuthLayout from "../components/Auth/AuthLayout";

const VerifyForgotOTP = () => {
  const [email, setEmail] = useState(() => localStorage.getItem("resetEmail") || "");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const submit = async (event) => {
    event.preventDefault(); setError("");
    if (!email || otp.length !== 6) return setError("Enter your email and the six-digit code.");
    setLoading(true);
    try { const response = await api.post("/user/verify-forgot-password-otp", { email, otp }); if (response.data.success) { localStorage.setItem("resetEmail", email); navigate("/change-password"); } }
    catch (err) { setError(err.response?.data?.message || "We couldn't verify that code."); }
    finally { setLoading(false); }
  };
  return <AuthLayout title="Check your email" description="Enter the six-digit reset code we sent you." backTo="/forgot-password" backLabel="Use another email"><form className="auth-form" onSubmit={submit}>{error && <p className="auth-alert" role="alert">{error}</p>}<label className="auth-field"><span className="auth-label">Email address</span><TextField fullWidth type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label><label className="auth-field"><span className="auth-label">Reset code</span><TextField fullWidth inputProps={{ inputMode: "numeric", maxLength: 6 }} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} /></label><Button className="auth-submit" type="submit" fullWidth disabled={loading}>{loading ? "Verifying..." : "Verify code"}</Button></form><p className="auth-footer">Didn't receive a code? <Link className="auth-link" to="/forgot-password">Try again</Link></p></AuthLayout>;
};

export default VerifyForgotOTP;
