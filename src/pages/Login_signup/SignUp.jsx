import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import api from "../../api/axios";

const Signup = () => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onChangeInput = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!formFields.name || !formFields.email || !formFields.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/user/register", {
        name: formFields.name,
        email: formFields.email,
        password: formFields.password,
      });

      if (res.data.success) {
        localStorage.setItem("pendingEmail", formFields.email);
        navigate("/verify");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  
return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-full max-w-[500px] m-auto rounded-md bg-white p-5 px-5 sm:px-10">
          <h3 className="font-[600] text-center text-[18px]">
            Create a new account
          </h3>

          <form className="w-full mt-5" onSubmit={handleSignup}>

            {error && (
              <p className="text-red-500 text-[13px] mb-3 text-center">{error}</p>
            )}

            <div className="form-group w-full mb-5 relative">
              <TextField
                type="text"
                id="name"
                label="Full Name *"
                variant="outlined"
                className="w-full"
                name="name"
                value={formFields.name}
                onChange={onChangeInput}
              />
            </div>

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

            <div className="flex items-center w-full mt-3 mb-3">
              <Button type="submit" disabled={loading} className="btn-org btn-lg w-full">
                {loading ? "Please wait..." : "Sign Up"}
              </Button>
            </div>

            <p className="mb-4">
              Already have an account?{" "}
              <Link className="link text-[14px] font-[600] ml-1" to="/login">
                Log In
              </Link>
            </p>

          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;