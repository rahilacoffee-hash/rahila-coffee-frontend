import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom"
import { MyContext } from "../../App";
import api from "../../api/axios";

const Login = () => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const context = useContext(MyContext);

  const onChangeInput = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!formFields.email || !formFields.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/user/login", {
        email: formFields.email,
        password: formFields.password,
      });

      if (res.data.success) {
        const { accessToken, refreshToken } = res.data.data;

        // Get full user details
        const userRes = await api.get("/user/user-details", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const user = userRes.data.data;

        // Save to localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(user));

        // Update context if you have setUser in context
        if (context?.setUser) context.setUser(user);
        if (context?.setIsLogin) context.setIsLogin(true);

        context?.openAlertBox("success", "Login successful!");

        // Redirect based on role
        if (user.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async () => {
    if (!formFields.email) {
      setError("Enter your email first then click forgot password");
      return;
    }
    try {
      const res = await api.post("/user/forgot-password", {
        email: formFields.email,
      });
      if (res.data.success) {
        localStorage.setItem("pendingEmail", formFields.email);
        context?.openAlertBox("success", "OTP sent to your email");
        navigate("/verify-forgot");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

 
return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-full max-w-[500px] m-auto rounded-md bg-white p-5 px-5 sm:px-10">
          <h3 className="font-[600] text-center text-[18px]">
            Login to your account
          </h3>

          <form className="w-full mt-5" onSubmit={handleLogin}>

            {error && (
              <p className="text-red-500 text-[13px] mb-3 text-center">{error}</p>
            )}

            <div className="form-group w-full mb-5 relative">
              <TextField
                type="email"
                id="email"
                label="Email *"
                variant="outlined"
                className="w-full"
                name="email"
                value={formFields.email}
                onChange={onChangeInput}
              />
            </div>

            <div className="form-group w-full mb-5 relative">
              <TextField
                type={isPasswordShow === false ? "password" : "text"}
                id="password"
                label="Password *"
                variant="outlined"
                className="w-full"
                name="password"
                value={formFields.password}
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

            <Link to="/forgot-password" className="link cursor-pointer text-[14px] font-[600]">
              Forgot password?
            </Link>

            <div className="flex items-center w-full mt-3 mb-3">
              <Button type="submit" disabled={loading} className="btn-org btn-lg w-full">
                {loading ? "Logging in..." : "Login"}
              </Button>
            </div>

            <p className="mb-4">
              Don't have an account?{" "}
              <Link className="link text-[14px] font-[600]" to="/signUp">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;