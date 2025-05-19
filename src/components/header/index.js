import { notification } from "antd";
import "../header/header.scss"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { useCallback, useEffect, useState } from "react";
import { getInfoUser } from "../../services/userServices";

function Header() {
    const [user, setUser] = useState(null);
    const user_id = JSON.parse(localStorage.getItem("user_id"));
    const token = localStorage.getItem("token")
    const fetchApi = useCallback(async () => {
        try {
            const res = await getInfoUser(user_id, token);
            if (res.code === 200) {
                setUser(res.user);
            }
        } catch (err) {
            console.error("Lỗi khi lấy thông tin user:", err);
        }
    }, [user_id, token]);
    useEffect(() => {
        if (user_id && token) {
            fetchApi();
        }
    }, [fetchApi]);
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, description) => {
        api[type]({
            message: 'Thông báo',
            description:
                `${description}`,
        });
    };
    const nav = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        openNotificationWithIcon("success", "Đăng xuất thành công!");
        setTimeout(() => {
            window.location.href = "/"; // reload lại toàn bộ app, header reset
        }, 500);
    };
    return (
        <>
            {contextHolder}
            <div className='header'>
                <div className='container'>
                    <div className='row'>
                        <div className='header_logo col-3'>
                            <a>LOGO</a>
                        </div>
                        <div className='header_search col-5'>
                            <form>
                                <input type="text" placeholder="Tìm kiếm..." required />
                                <button type="submit">Tìm</button>
                            </form>
                        </div>
                        <div className='header_menu col-4'>
                            {user ?
                                <>
                                    <ul>
                                        <li className="header_menu-profile me-1">
                                            <NavLink to={`/user/profile/${user._id}`}>
                                                {user.fullName}
                                            </NavLink>
                                        </li>
                                        <li className='header_menu-logout'>
                                            <a onClick={() => handleLogout()}>Đăng xuất</a>
                                        </li>
                                    </ul>
                                </> :
                                <>
                                    <ul>
                                        <li className='header_menu-login'>
                                            <NavLink to={"/user/login"}>Đăng nhập</NavLink>
                                        </li>
                                        <li className='header_menu-register'>
                                            <NavLink to={"/user/register"}>Đăng ký</NavLink>
                                        </li>
                                    </ul>
                                </>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
