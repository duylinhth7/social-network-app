import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./forgetPassword.scss";
import { otpPassword } from "../../services/userServices";
import {  } from "antd/es/notification/interface";
import { notification } from "antd";

function Otp() {
    const { email } = useParams();
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
        e.preventDefault()
        const otp = e.target[1].value;
        const res = await otpPassword(email, otp);
        if(res.code === 200){
        nav(`/user/resetpassword/${res.passwordResetToken}`)
        } else {
            openNotificationWithIcon("error", res.message)
        }
    };

    return (
        <>
            {contextHolder}
            <div className="forget-password-container">
                <h2 className="title">Xác thực OTP</h2>
                <form className="forget-password-form" onSubmit={handleSubmit}>
                    <label>Email:</label>
                    <input type="email" value={email} disabled />

                    <label htmlFor="otp">Nhập mã OTP:</label>
                    <input
                        type="text"
                        id="otp"
                        placeholder="Nhập mã OTP"
                        required
                    />

                    <button type="submit">Xác nhận</button>
                </form>
            </div>
        </>
    );
}

export default Otp;
