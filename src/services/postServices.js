const PATH = "https://social-network-be-nt32.onrender.com/api/v1/post";


export const getPostUser = async (id, token) => {
  const response = await fetch(PATH + `/${id}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export const likePost = async (id, token) => {
  const response = await fetch(PATH + `/like/${id}`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export const unLikePost = async (id, token) => {
  const response = await fetch(PATH + `/unlike/${id}`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};