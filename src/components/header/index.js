import { notification } from "antd";
import "../header/header.scss"
import { useNavigate } from "react-router-dom"

function Header() {
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, description) => {
        api[type]({
            message: 'Thông báo',
            description:
                `${description}`,
        });
    };
    const nav = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const handleLogout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        nav("/");
        openNotificationWithIcon("success", "Đăng xuất thành công!")
    }
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
                                            <a href="/user/profile">
                                                {user.fullName}
                                            </a>
                                        </li>
                                        <li className='header_menu-logout'>
                                            <a onClick={() => handleLogout()}>Đăng xuất</a>
                                        </li>
                                    </ul>
                                </> :
                                <>
                                    <ul>
                                        <li className='header_menu-login'>
                                            <a href="/user/login">Đăng nhập</a>
                                        </li>
                                        <li className='header_menu-register'>
                                            <a href="/user/register">Đăng ký</a>
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
