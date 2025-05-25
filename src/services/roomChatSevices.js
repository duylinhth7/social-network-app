const PATH = "https://social-network-be-nt32.onrender.com/api/v1/roomchat";
const token = localStorage.getItem("token")


export const createRoomChatServices = async (record) => {
  const response = await fetch(PATH + "/create", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(record)
  });

  const data = await response.json();
  return data;
};

export const getRoomChat = async (id) => {
  const response = await fetch( PATH + `/${id}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  const data = await response.json();
  return data;
}

export const getListRoomChat = async () => {
  const response = await fetch( PATH + `/getlistchat`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  const data = await response.json();
  return data;
}
