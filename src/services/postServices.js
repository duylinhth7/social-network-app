const PATH = "https://social-network-be-nt32.onrender.com/api/v1/post";
const token = localStorage.getItem("token")


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

export const likePost = async (id) => {
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

export const unLikePost = async (id) => {
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

export const newPost = async (record) => {
  const formData = new FormData();
  formData.append("content", record.content);
  if (record.images) {
    formData.append("images", record.images);
  }
  const response = await fetch(PATH, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: formData
  });

  const data = await response.json();
  return data;
};

export const deletePost = async (postId) => {
  const response = await fetch(PATH + `/delete/${postId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  const data = response.json();
  return data;
}

export const getAllPost = async () => {
  const response = await fetch(PATH, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  const data = response.json();
  return data;
}

export const getDetailPost = async (id) => {
  const response = await fetch(PATH + `/detail/${id}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  const data = response.json();
  return data;
}

export const postComment = async (id, content) => {
  const response = await fetch(PATH + `/comment/${id}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"

    },
    body: JSON.stringify({ content })
  });
  const data = response.json();
  return data;
} 