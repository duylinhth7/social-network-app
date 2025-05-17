const PATH = "https://social-network-be-nt32.onrender.com/api/v1/user";

export const loginServices = async (email, password) => {
    const response = await fetch(PATH + "/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    return data;
};

export const registerServices = async (record) => {
    const formData = new FormData();
    formData.append("fullName", record.fullName);
    formData.append("email", record.email);
    formData.append("password", record.password);
    formData.append("authPassword", record.authPassword);
    if (record.avatar) {
        formData.append("avatar", record.avatar); // chỉ gửi nếu có ảnh
    }

    const response = await fetch(PATH + "/register", {
        method: "POST",
        body: formData
    });
    const result = await response.json();
    return result;
};
