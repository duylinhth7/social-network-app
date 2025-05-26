import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../services/userServices";
import "./forgetPassword.scss";
import { notification } from "antd";

function ResetPassword() {

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, description) => {
        api[type]({
            message: 'Thông báo',
            description:
                `${description}`,
        });
    };
    const nav = useNavigate();
    const params = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const password = e.target[0].value;
        const authPassword = e.target[1].value;
        const res = await resetPassword(password, authPassword, params.passwordResetToken)
        if (res.code === 200) {
            nav("/user/login");
        } else {
            openNotificationWithIcon("error", res.message)  
        }
    };

    return (
        <>
            {contextHolder}
            <div className="forget-password-container">
                <h2 className="title">Đặt lại mật khẩu</h2>
                <form className="forget-password-form" onSubmit={handleSubmit}>
                    <label htmlFor="password">Mật khẩu mới:</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Nhập mật khẩu mới"
                        required
                    />

                    <label htmlFor="authPassword">Xác nhận mật khẩu:</label>
                    <input
                        type="password"
                        id="authPassword"
                        placeholder="Nhập lại mật khẩu"
                        required
                    />

                    <button type="submit">Đổi mật khẩu</button>
                </form>
            </div>
        </>
    );
}

export default ResetPassword;
