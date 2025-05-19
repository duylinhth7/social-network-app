import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getInfoUser } from "../services/userServices";

const PrivateRoute = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // trạng thái loading
    const user_id = JSON.parse(localStorage.getItem("user_id"));
    const token = localStorage.getItem("token");

    const fetchApi = async () => {
        try {
            const res = await getInfoUser(user_id, token);
            if (res.code === 200) {
                setUser(res.user);
            }
        } catch (error) {
            console.error("Lỗi khi lấy thông tin user:", error);
            setLoading(false);
        } finally {
            setLoading(false); // kết thúc loading
        }
    };

    useEffect(() => {
        fetchApi();
    }, []);

    if (loading) return <div>Đang kiểm tra đăng nhập...</div>;

    return user ? children : <Navigate to="/user/login" />;
};

export default PrivateRoute;
