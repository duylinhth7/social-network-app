import { notification } from "antd";
import "../header/header.scss"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { useCallback, useEffect, useState } from "react";
import { getInfoUser } from "../../services/userServices";

function Header() {
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
