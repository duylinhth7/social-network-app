import { useNavigate } from "react-router-dom";
import { loginServices } from "../../services/userServices";
import { notification } from "antd"
import "./login.scss";

function Login() {
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon =  (type, description) => {
        api[type]({
            message: 'Thông báo',
            description:
                `${description}`,
        });
    };
    const nav = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target[0].value;
        const password = e.target[1].value
        const data = await loginServices(email, password);
        if (data.code == 200) {
            openNotificationWithIcon("success", "Đăng nhập thành công!")
            // localStorage.setItem("token", data.user.token);
            // nav("/")
        } else {
            openNotificationWithIcon("error", data.message)
        };
    };
    return (<>
        {contextHolder}
        <div className="login">
            <div className="container">
                <form className="form" onSubmit={handleSubmit}>
                    <h2>Đăng nhập</h2>

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Nhập email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Nhập mật khẩu"
                            required
                        />
                    </div>

                    <div className="form-extra">
                        <a href="/forgot-password" className="forgot-password">
                            Quên mật khẩu?
                        </a>
                    </div>

                    <button type="submit">Đăng nhập</button>
                </form>
            </div>
        </div>
    </>
    );
}

export default Login;
