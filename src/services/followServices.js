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

export const getFollowingServices = async (id) => {
  const response = await fetch(PATH + `/following/${id}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  const data = await response.json();
  return data
}

export const getFollowerServices = async (id) => {
  const response = await fetch(PATH + `/follower/${id}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  const data = await response.json();
  return data
}