import { useEffect, useRef, useState } from "react";
import { editProfile, getInfoUser } from "../../services/userServices";
import "../profile/edit.scss";
import { notification } from "antd";
import { useNavigate } from "react-router-dom"

function Edit() {
    const nav = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, description) => {
        api[type]({
            message: 'Thông báo',
            description:
                `${description}`,
        });
    };
    const fileInputRef = useRef(null);
    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result); // hiển thị ảnh mới
            };
            reader.readAsDataURL(file);
        }
    };
    const [user, setUser] = useState(null);
    const user_id = JSON.parse(localStorage.getItem("user_id"));
    const token = localStorage.getItem("token")
    const [data, setData] = useState(null);
    const [imagePreview, setAvatarPreview] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const fetchUser = async () => {
        const res = await getInfoUser(user_id, token);
        setUser(res.user)
        setData(res.user);
        setAvatarPreview(res.user.avatar);
        setFullName(res.user.fullName); // Khởi tạo state với dữ liệu ban đầu
        setEmail(res.user.email);       // Khởi tạo state với dữ liệu ban đầu
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataUpdate = {};
        if (password) {
            dataUpdate.password = password;
        }
        if (imagePreview !== data.avatar) {
            dataUpdate.avatar = imagePreview;
        }
        if (fullName !== data.fullName) {
            dataUpdate.fullName = fullName;
        }
        if (email !== data.email) {
            dataUpdate.email = email;
        }
        if (Object.keys(dataUpdate).length > 0) {
            const res = await editProfile(user_id, dataUpdate)
            if (res.code == 200) {
                openNotificationWithIcon("success", res.message);
                setTimeout(() => {
                    nav("/user/profile");
                }, 2000)
            }

        } else {
            openNotificationWithIcon("error", "Không có thay đổi nào được thực hiện")
            return;
        }
    };

    return (
        <>
            {contextHolder}
            {data ? (
                <div className="container edit">
                    <form onSubmit={handleSubmit}>
                        <div className="edit-head">
                            <img
                                type="file"
                                name="avatar"
                                accept="image/*"
                                src={imagePreview}
                                className="me-5"
                            />
                            <b className="me-5">{data.fullName}</b>
                            <span className="btn btn-primary" onClick={handleAvatarClick}>Cập nhật ảnh đại diện</span>
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="edit-main">
                            <div className="mb-3">
                                <label htmlFor="fullName" className="form-label">Họ và tên*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="fullName"
                                    name="fullName"
                                    value={fullName} // Liên kết với state fullName
                                    onChange={handleFullNameChange} // Xử lý sự kiện onChange
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email*</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={email} // Liên kết với state email
                                    onChange={handleEmailChange} // Xử lý sự kiện onChange
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Mật khẩu*</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    placeholder="Nếu không nhập password sẽ không đổi!"
                                    value={password} // Liên kết với state password
                                    onChange={handlePasswordChange} // Xử lý sự kiện onChange
                                />
                            </div>
                            <button className="btn btn-primary" type="submit">Cập nhật</button>
                        </div>
                    </form>
                </div>
            ) : (<></>)}
        </>
    );
}

export default Edit;