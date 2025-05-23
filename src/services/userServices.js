const PATH = "https://social-network-be-nt32.onrender.com/api/v1/user";
const token = localStorage.getItem("token")

export const loginServices = async (email, password) => {
  const response = await fetch(PATH + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
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
