const PATH = "https://social-network-be-nt32.onrender.com/api/v1/user";

const token = localStorage.getItem("token")

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

export const getInfoUser = async (id) => {
  const response = await fetch(PATH + `/detail/${id}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export const editProfile = async (id, dataUpdate) => {
  const response = await fetch(PATH + `/edit/${id}`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataUpdate)
  });

  const data = await response.json();
  return data;
};

export const searchServices = async (keyword) => {
  const response = await fetch(PATH + `?keyword=${keyword}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  const data = await response.json();
  return data;
}


export const forgetPasswordServices = async (email) => {
  const response = await fetch(PATH + "/password/forget", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email})
  });

  const data = await response.json();
  return data;
}

export const otpPassword = async (email, otp) => {
  const response = await fetch(PATH + "/password/otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email, otp})
  });

  const data = await response.json();
  return data;
}

export const resetPassword = async (password, authPassword, passwordResetToken) => {
  const response = await fetch(PATH + "/password/reset", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({password, authPassword, passwordResetToken})
  });

  const data = await response.json();
  return data;
}