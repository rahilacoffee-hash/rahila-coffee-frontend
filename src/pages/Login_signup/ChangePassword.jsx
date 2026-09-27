import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import AuthLayout from "../../components/Auth/AuthLayout";

const ChangePassword = () => {
  const [password, setPassword] = useState(""); const [confirmPassword, setConfirmPassword] = useState(""); const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const submit = async (event) => { event.preventDefault(); setError(""); const email = localStorage.getItem("resetEmail"); if (!email) return navigate("/forgot-password"); if (password.length < 8) return setError("Use at least 8 characters."); if (password !== confirmPassword) return setError("Passwords do not match."); setLoading(true); try { const response = await api.post("/user/reset-password", { email, newPassword: password, confirmPassword }); if (response.data.success) { localStorage.removeItem("resetEmail"); navigate("/login"); } } catch (err) { setError(err.response?.data?.message || "We couldn't update your password."); } finally { setLoading(false); } };
  return <AuthLayout title="Choose a new password" description="Make it strong and memorable." backTo="/forgot-password"><form className="auth-form" onSubmit={submit}>{error && <p className="auth-alert" role="alert">{error}</p>}<label className="auth-field"><span className="auth-label">New password</span><TextField fullWidth type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} /></label><label className="auth-field"><span className="auth-label">Confirm password</span><TextField fullWidth type="password" autoComplete="new-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /></label><Button className="auth-submit" type="submit" fullWidth disabled={loading}>{loading ? "Updating..." : "Update password"}</Button></form></AuthLayout>;
};

export default ChangePassword;
