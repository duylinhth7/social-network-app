import "../header/header.scss"

function Header() {
    return (
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
                        <ul>
                            <li className='header_menu-login'>
                                <a href="/user/login">Đăng nhập</a>
                            </li>
                            <li className='header_menu-register'>
                                <a href="/user/register">Đăng ký</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
