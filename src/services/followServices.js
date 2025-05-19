const PATH = "https://social-network-be-nt32.onrender.com/api/v1/follow";


const token = localStorage.getItem("token");
export const unfollow = async (id) => {
  const response = await fetch(PATH + `/unfollow/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export const follow = async (id) => {
  const response = await fetch(PATH + `/${id}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};