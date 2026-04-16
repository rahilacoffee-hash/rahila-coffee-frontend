import React, { useState } from "react";
import { Button, TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff, LockOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const ChangePassword = () => {
  const [newPassword, setNewPassword]         = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew]                 = useState(false);
  const [showConfirm, setShowConfirm]         = useState(false);
  const [loading, setLoading]                 = useState(false);
  const [error, setError]                     = useState("");
  const navigate                              = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!newPassword || !confirmPassword) { setError("Please fill in all fields"); return; }
    if (newPassword.length < 8) { setError("Password must be at least 8 characters"); return; }
    if (newPassword !== confirmPassword) { setError("Passwords do not match"); return; }

    const email = localStorage.getItem("pendingEmail");
    if (!email) {
      setError("Session expired. Please start the forgot password process again.");
      return;
    }

    setLoading(true);
    try {
      // ← CORRECT route: /user/reset-password
      // ← sending both spellings to handle the backend typo
      const res = await api.post("/user/reset-password", {
        email,
        newPassword,
        confirmPassword,
        confrimPassword: confirmPassword, // backend typo — send both
      });

      if (res.data.success) {
        localStorage.removeItem("pendingEmail");
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-[#f1f1f1] px-4">
      <div className="w-full max-w-[450px] bg-white p-10 md:p-12 rounded-[32px] shadow-sm border border-stone-100">

        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-amber-900">
            <LockOutlined fontSize="large" />
          </div>
          <h2 className="text-2xl font-black text-stone-800 tracking-tight">Set New Password</h2>
          <p className="text-sm text-stone-400 mt-2 font-medium">
            Create a strong password for your account.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {error && (
            <p className="text-red-500 text-[13px] text-center bg-red-50 px-3 py-2 rounded-xl">{error}</p>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">
              New Password
            </label>
            <TextField
              fullWidth
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="Min. 8 characters"
              InputProps={{
                className: "rounded-2xl h-14 bg-stone-50",
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowNew(!showNew)} edge="end">
                      {showNew ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">
              Confirm Password
            </label>
            <TextField
              fullWidth
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Repeat your password"
              InputProps={{
                className: "rounded-2xl h-14 bg-stone-50",
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirm(!showConfirm)} edge="end">
                      {showConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>

          {/* Password strength indicator */}
          {newPassword && (
            <div className="space-y-1">
              <div className="flex gap-1">
                {[1,2,3,4].map(i => (
                  <div key={i} className={`h-1 flex-1 rounded-full transition-all ${
                    newPassword.length >= i * 2
                      ? i <= 2 ? "bg-red-400" : i === 3 ? "bg-yellow-400" : "bg-green-500"
                      : "bg-gray-200"
                  }`} />
                ))}
              </div>
              <p className="text-[11px] text-gray-400">
                {newPassword.length < 6 ? "Too short" : newPassword.length < 8 ? "Weak" : newPassword.length < 12 ? "Good" : "Strong"}
              </p>
            </div>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            className="!bg-amber-900 hover:!bg-amber-950 !h-14 !rounded-2xl !font-bold !capitalize !text-[15px]"
          >
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ChangePassword;