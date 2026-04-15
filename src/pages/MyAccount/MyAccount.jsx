
import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AccountSidebar from "../../components/AccountSidebar/AccountSidebar";
import api from "../../api/axios";
import { MyContext } from "../../App";

const MyAccount = () => {
  const context = useContext(MyContext);
  const [formFields, setFormFields] = useState({ name: "", email: "", mobile: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (context.user) {
      setFormFields({
        name: context.user.name || "",
        email: context.user.email || "",
        mobile: context.user.mobile || "",
      });
    }
  }, [context.user]);

  const onChangeInput = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.put("/user/update", formFields);
      const updatedUser = { ...context.user, ...formFields };
      context.setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      context.openAlertBox("success", "Profile updated!");
    } catch (err) {
      context.openAlertBox("error", err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (context.user) {
      setFormFields({
        name: context.user.name || "",
        email: context.user.email || "",
        mobile: context.user.mobile || "",
      });
    }
  };

  return (
    <section className="py-10 w-full">
      <div className="container flex flex-col md:flex-row gap-5">

        {/* Sidebar — full width on mobile, 20% on desktop */}
        <div className="w-full md:w-[20%]">
          <AccountSidebar />
        </div>

        {/* Form — full width on mobile, 50% on desktop */}
        <div className="w-full md:w-[50%]">
          <div className="card bg-white p-5 shadow-md rounded-md">
            <h2 className="pb-3">My Profile</h2>
            <hr />

            <form className="mt-5" onSubmit={handleSave}>
              {/* Name + Email — stack on mobile, side by side on sm+ */}
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="w-full sm:w-1/2">
                  <TextField
                    label="Full Name *"
                    variant="outlined"
                    size="small"
                    className="w-full"
                    name="name"
                    value={formFields.name}
                    onChange={onChangeInput}
                  />
                </div>
                <div className="w-full sm:w-1/2">
                  <TextField
                    label="Email *"
                    variant="outlined"
                    size="small"
                    className="w-full"
                    name="email"
                    type="email"
                    value={formFields.email}
                    onChange={onChangeInput}
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="flex mt-4">
                <div className="w-full sm:w-1/2">
                  <TextField
                    label="Phone No"
                    variant="outlined"
                    size="small"
                    className="w-full"
                    name="mobile"
                    value={formFields.mobile}
                    onChange={onChangeInput}
                  />
                </div>
              </div>

              <br />
              <div className="flex items-center gap-4">
                <Button type="submit" disabled={loading} className="btn-org btn-lg w-[100px]">
                  {loading ? "..." : "SAVE"}
                </Button>
                <Button type="button" onClick={handleCancel} className="btn-org btn-lg w-[100px] btn-border">
                  CANCEL
                </Button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MyAccount;