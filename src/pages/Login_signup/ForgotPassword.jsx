import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import AuthLayout from "../../components/Auth/AuthLayout";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const submit = async (event) => {
    event.preventDefault(); setError("");
    if (!email) return setError("Enter your email address.");
    setLoading(true);
    try { const response = await api.post("/user/forgot-password", { email }); if (response.data.success) { localStorage.setItem("resetEmail", email); navigate("/verify-forgot-otp"); } }
    catch (err) { setError(err.response?.data?.message || "We couldn't send a reset code."); }
    finally { setLoading(false); }
  };
  return <AuthLayout title="Reset your password" description="We'll send a verification code to your email." backTo="/login"><form className="auth-form" onSubmit={submit}>{error && <p className="auth-alert" role="alert">{error}</p>}<label className="auth-field"><span className="auth-label">Email address</span><TextField fullWidth type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label><Button className="auth-submit" type="submit" fullWidth disabled={loading}>{loading ? "Sending..." : "Send reset code"}</Button></form><p className="auth-footer">Remembered it? <Link className="auth-link" to="/login">Sign in</Link></p></AuthLayout>;
};

export default ForgotPassword;
