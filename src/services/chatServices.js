const PATH = "https://social-network-be-nt32.onrender.com/api/v1/chat";

const token = localStorage.getItem("token")


export const getChat = async (id) => {
  const response = await fetch(PATH + `/${id}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  const data = await response.json();
  return data;
}
