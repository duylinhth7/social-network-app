import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getInfoUser } from "../services/userServices";

const PrivateRoute = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user_id = JSON.parse(localStorage.getItem("user_id"));
    const token = localStorage.getItem("token");

    if (!user_id || !token) {
      setLoading(false);
      
      return;
    }

    const fetchApi = async () => {
      try {
        const res = await getInfoUser(user_id);
        if (res.code === 200) {
          setUser(res.user);
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApi();
  }, []);

  if (loading) return <div>Đang kiểm tra đăng nhập...</div>;

  return user ? <Outlet /> : <Navigate to="/user/login" />;
};

export default PrivateRoute;
