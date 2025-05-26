import { useNavigate } from "react-router-dom";
import { registerServices } from "../../services/userServices";
import "../register/register.scss";
import { useState } from "react"
function Register() {
    const nav = useNavigate()
    const [avatarFile, setAvatarFile] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault()
        const record = {
            fullName: e.target.fullName.value,
            email: e.target.email.value,
            avatar: avatarFile,
            password: e.target.password.value,
            authPassword: e.target.authPassword.value,
        }
        const data = await registerServices(record);
        if(data.code == 200){
            localStorage.setItem("token", data.tokenJWT);
            nav("/")
        }
    }
    return (
        <>
            <div className="register">
                <div className="container">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <h2>Đăng ký</h2>

                        <input type="text" name="fullName" placeholder="Họ và tên" required />
                        <input type="email" name="email" placeholder="Email" required />
                        <input type="password" name="password" placeholder="Mật khẩu" required />
                        <input type="password" name="authPassword" placeholder="Xác nhận mật khẩu" required />

                        <input
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={(e) => setAvatarFile(e.target.files[0])}
                        />
                        {avatarFile && (
                            <div className="avatar-preview">
                                <img src={URL.createObjectURL(avatarFile)} alt="Ảnh xem trước" />
                                <span onClick={() => { setAvatarFile(null) }}>Xóa</span>
                            </div>
                        )}

                        <button type="submit">Đăng ký</button>
                    </form>
                </div>
            </div>
        </>
    )
};
export default Register