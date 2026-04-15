import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import api from "../../api/axios";

const Logout = () => {
  const navigate = useNavigate();
  const context = useContext(MyContext);

  useEffect(() => {
    async function handleLogout() {
      try {
        await api.get("/user/logout");
      } catch (err) {
        console.log(err);
      } finally {
        // Clear everything
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");

        // Update context
        if (context?.setUser) context.setUser(null);
        if (context?.setIsLogin) context.setIsLogin(false);

        // Redirect to login
        navigate("/login");
      }
    }

    handleLogout();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-[16px] text-gray-500">Logging out...</p>
    </div>
  );
};

export default Logout;