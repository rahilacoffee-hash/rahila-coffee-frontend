import React, { useState } from "react";
import shield from "../../assets/security.png";
import OtpBox from "../../components/OTP/OtpBox";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const VerifyOTP = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp || otp.length < 4) {
      setError("Please enter the complete OTP");
      return;
    }

    setLoading(true);
    try {
      const email = localStorage.getItem("pendingEmail");

      const res = await api.post("/user/verifyEmail", {
        email,
        otp,
      });

      if (res.data.success) {
        localStorage.removeItem("pendingEmail");
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const pendingEmail = localStorage.getItem("pendingEmail") || "your email";

  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-full max-w-[500px] mx-auto rounded-md bg-white p-5 sm:px-10">
          <div className="text-center flex items-center justify-center">
            <img src={shield} width="80" alt="shield" />
          </div>

          <h3 className="font-[600] text-center text-[18px] mt-4 mb-5">
            Verify OTP
          </h3>

          <p className="mt-0">
            OTP sent to{" "}
            <span className="text-amber-700 font-bold">{pendingEmail}</span>
          </p>

          {error && (
            <p className="text-red-500 text-[13px] mt-2 text-center">{error}</p>
          )}

          <form onSubmit={VerifyOTP}>
            <OtpBox length={6} onChange={handleOtpChange} />

            <div className="flex items-center justify-center mt-5 px-4">
              <Button
                type="submit"
                disabled={loading}
                className="!w-full btn-org btn-lg"
              >
                {loading ? "Verifying..." : "Verify"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Verify;