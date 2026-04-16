import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const ForgotPassword = () => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isPasswordShow2, setIsPasswordShow2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formFields, setFormFields] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const onChangeInput = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError("");

    const email = localStorage.getItem("pendingEmail");

    if (!email) {
      setError("Session expired. Please request password reset again.");
      return;
    }

    if (!formFields.newPassword || !formFields.confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (formFields.newPassword !== formFields.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/user/reset-password", {
        email,
        otp, // VERY IMPORTANT
        newPassword,
        confirmPassword,
      });

      if (res.data.success) {
        localStorage.removeItem("pendingEmail");
        navigate("/login");
      }
    } catch (err) {
      console.log(err); // Debug
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to reset password",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-6 sm:py-10 px-3">
      <div className="max-w-lg mx-auto">
        <div className="shadow-md rounded-md bg-white p-5 sm:p-8">
          <h3 className="font-semibold text-center text-[18px]">
            Reset Password
          </h3>

          {error && (
            <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
          )}

          <form className="w-full mt-5" onSubmit={handleChangePassword}>
            {/* New Password */}
            <div className="mb-5 relative">
              <TextField
                type={!isPasswordShow ? "password" : "text"}
                label="New Password *"
                variant="outlined"
                fullWidth
                name="newPassword"
                value={formFields.newPassword}
                onChange={onChangeInput}
              />

              <Button
                type="button"
                onClick={() => setIsPasswordShow(!isPasswordShow)}
                className="!absolute !top-[10px] !right-[10px] !min-w-[35px] !h-[35px]"
              >
                {isPasswordShow ? (
                  <IoEye className="!text-black" />
                ) : (
                  <IoEyeOff className="!text-black" />
                )}
              </Button>
            </div>

            {/* Confirm Password */}
            <div className="mb-5 relative">
              <TextField
                type={!isPasswordShow2 ? "password" : "text"}
                label="Confirm Password *"
                variant="outlined"
                fullWidth
                name="confirmPassword"
                value={formFields.confirmPassword}
                onChange={onChangeInput}
              />

              <Button
                type="button"
                onClick={() => setIsPasswordShow2(!isPasswordShow2)}
                className="!absolute !top-[10px] !right-[10px] !min-w-[35px] !h-[35px]"
              >
                {isPasswordShow2 ? (
                  <IoEye className="!text-black" />
                ) : (
                  <IoEyeOff className="!text-black" />
                )}
              </Button>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="btn-org w-full mt-3"
            >
              {loading ? "Updating..." : "Change Password"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
