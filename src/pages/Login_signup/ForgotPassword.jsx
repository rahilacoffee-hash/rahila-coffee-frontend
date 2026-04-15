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
      const email = localStorage.getItem("pendingEmail");

      const res = await api.post("/user/reset-password", {
        email,
        newPassword: formFields.newPassword,
        confirmPassword: formFields.confirmPassword,
      });

      if (res.data.success) {
        localStorage.removeItem("pendingEmail");
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-[500px] m-auto rounded-md bg-white p-5 px-10">
          <h3 className="font-[600] text-center text-[18px]">
            Reset Password
          </h3>

          {error && (
            <p className="text-red-500 text-[13px] mt-3 text-center">{error}</p>
          )}

          <form className="w-full mt-5" onSubmit={handleChangePassword}>

            <div className="form-group w-full mb-5 relative">
              <TextField
                type={isPasswordShow === false ? "password" : "text"}
                id="newPassword"
                label="New Password *"
                variant="outlined"
                className="w-full"
                name="newPassword"
                value={formFields.newPassword}
                onChange={onChangeInput}
              />
              <Button
                className="!absolute !top-[10px] !right-[10px] !z-50 !w-[35px] !min-w-[35px] !h-[35px] !rounded-full !text-black"
                onClick={() => setIsPasswordShow(!isPasswordShow)}
              >
                {isPasswordShow === true ? (
                  <IoEye className="text-[20px] opacity-75" />
                ) : (
                  <IoEyeOff className="text-[20px] opacity-75" />
                )}
              </Button>
            </div>

            <div className="form-group w-full mb-5 relative">
              <TextField
                type={isPasswordShow2 === false ? "password" : "text"}
                id="confirmPassword"
                label="Confirm Password *"
                variant="outlined"
                className="w-full"
                name="confirmPassword"
                value={formFields.confirmPassword}
                onChange={onChangeInput}
              />
              <Button
                className="!absolute !top-[10px] !right-[10px] !z-50 !w-[35px] !min-w-[35px] !h-[35px] !rounded-full !text-black"
                onClick={() => setIsPasswordShow2(!isPasswordShow2)}
              >
                {isPasswordShow2 === true ? (
                  <IoEye className="text-[20px] opacity-75" />
                ) : (
                  <IoEyeOff className="text-[20px] opacity-75" />
                )}
              </Button>
            </div>

            <div className="flex items-center w-full mt-3 mb-3">
              <Button
                type="submit"
                disabled={loading}
                className="btn-org btn-lg w-full"
              >
                {loading ? "Updating..." : "Change Password"}
              </Button>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;