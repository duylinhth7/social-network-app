import { notification } from "antd";
import "../header/header.scss"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { useCallback, useEffect, useState } from "react";
import { getInfoUser } from "../../services/userServices";
import Search from "../search";

function Header() {
    const nav = useNavigate()
    const [user, setUser] = useState(null);
    const [trigger, setTrigger] = useState(false);
    const user_id = JSON.parse(localStorage.getItem("user_id"));
    const fetchApi = async () => {
        const res = await getInfoUser(user_id);
        if (res.code === 200) {
            setUser(res.user);
        }
    }
    useEffect(() => {
        fetchApi()
    }, []);
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, description) => {
        api[type]({
            message: 'Thông báo',
            description:
                `${description}`,
        });
    };
    const handleLogout = () => {
        localStorage.removeItem("user_id")
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
                        <div className='header_logo col-md-3 col-6'>
                            <span onClick={() => nav("/")}>SOCIAL NETWORK</span>
                        </div>
                        <div className='header_menu col-md-4 col-6'>
                            {user ?
                                <>
                                    <ul>
                                        <li className="header_menu-message me-1">
                                            <NavLink to="/listchat">Nhắn tin</NavLink>
                                        </li>
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
                        <div className='header_search col-md-5 col-12'>
                            <Search />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
