import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import AuthLayout from "../../components/Auth/AuthLayout";

const Verify = () => {
  const [email, setEmail] = useState(() => localStorage.getItem("pendingEmail") || "");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    if (!email || otp.length !== 6) return setError("Enter your email and the six-digit code.");
    setLoading(true);
    try {
      const response = await api.post("/user/verifyEmail", { email, otp });
      if (response.data.success) {
        localStorage.removeItem("pendingEmail");
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "We couldn't verify that code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return <AuthLayout title="Verify your email" description="Enter the six-digit code we sent to your inbox." backTo="/signUp" backLabel="Back to sign up"><form className="auth-form" onSubmit={submit}>{error && <p className="auth-alert" role="alert">{error}</p>}<label className="auth-field"><span className="auth-label">Email address</span><TextField fullWidth type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label><label className="auth-field"><span className="auth-label">Verification code</span><TextField fullWidth inputProps={{ inputMode: "numeric", maxLength: 6 }} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} /></label><Button className="auth-submit" type="submit" fullWidth disabled={loading}>{loading ? "Verifying..." : "Verify email"}</Button></form><p className="auth-footer">Already verified? <Link className="auth-link" to="/login">Sign in</Link></p></AuthLayout>;
};

export default Verify;
