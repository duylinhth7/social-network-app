import { useNavigate } from "react-router-dom";
import "./forgetPassword.scss";
import { forgetPasswordServices } from "../../services/userServices";
import { notification } from "antd";

function ForgetPassword() {
    const nav = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, description) => {
        api[type]({
            message: 'Thông báo',
            description:
                `${description}`,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value
        const res = await forgetPasswordServices(email);
        if (res.code === 200) {
            nav(`/user/otp/${email}`)
        } else {
            openNotificationWithIcon("error", res.message)
        }

    };

    return (
        <>
            {contextHolder }
            <div className="forget-password-container">
                <h2 className="title">Quên mật khẩu</h2>
                <form className="forget-password-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Nhập email của bạn"
                        required
                    />
                    <button type="submit">Gửi yêu cầu</button>
                </form>
            </div>
        </>
    );
}

export default ForgetPassword;
