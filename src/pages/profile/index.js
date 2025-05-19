import { useEffect, useState } from "react";
import "../profile/profile.scss"
import { getPostUser, likePost, unLikePost } from "../../services/postServices";
function Profile() {
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;
    const token = localStorage.getItem("token");

    const [posts, setPosts] = useState([]);
    const [trigger, setTrigger] = useState(false); // trigger cho useEffect
    const fetchPost = async () => {
        const res = await getPostUser(user._id, token);
        setPosts(res.posts);
    }
    useEffect(() => {
        fetchPost();
    }, [trigger]);
    const handleUnLike = async (id) => {
        const res = await unLikePost(id, token);
        setTrigger(!trigger)
    }
    const handleLike = async (id) => {
        const res = await likePost(id, token);
        setTrigger(!trigger)
    }

    //comment

    //end comment

    if (!user) {
        return <div>Vui lòng đăng nhập để xem trang cá nhân</div>;
    };

    return (
        <div className="profile">
            <div className="container">
                <div className="row profile-info">
                    <div className="col-4 profile-avatar">
                        <img src={user.avatar ? user.avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s"} alt="Avatar người dùng" />
                    </div>
                    <div className="col-8 row">
                        <div className="col-6">{user.fullName}</div>
                        <div className="col-6">
                            <a href="/user/profile/edit">Cập nhật trang cá nhân</a>
                        </div>
                        <div className="col-4">
                            <span>{posts.length > 0 ? posts.length : 0}</span> bài đăng
                        </div>
                        <div className="col-4">
                            <span>{user.following.length} đang theo dõi</span>
                        </div>
                        <div className="col-4">
                            <span>{user.followews.length} người theo dõi</span>
                        </div>
                    </div>
                </div>
                <div className="row profile-create-post">
                    <div className="col-12 text-end">
                        <button className="btn btn-primary">+ Tạo bài viết</button>
                    </div>
                </div>
                <div className="row profile-post">
                    {
                        posts ? (
                            <>
                                {
                                    posts.map((item, index) => (
                                        <div className="profile-post-item" key={index}>
                                            <div className="col-12 profile-post-head">
                                                <img width="50px" src={user.avatar ? user.avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s"} alt="Avatar người dùng" />
                                                <div>
                                                    <b>{user.fullName}</b>
                                                    <div>{item.createdAt}</div>
                                                </div>
                                            </div>
                                            <div className="col-12 profile-post-content">
                                                {item.content}
                                            </div>
                                            <div className="col-12 profile-post-images">
                                                {item.images.length > 0 ? item.images.map((item, index) => (
                                                    <img src={item} />
                                                )) : (<>
                                                </>)}
                                            </div>
                                            <div className="profile-post-button row">
                                                <div className="col-4">
                                                    {item.likes.length > 0 ? (
                                                        <button onClick={() => handleUnLike(item._id)} className={item.likes.includes(user._id) ? "liked" : ""}> {item.likes.length} Thích</button>) : (
                                                        <button onClick={() => handleLike(item._id)}>0 Thích</button>
                                                    )}
                                                </div>
                                                <div className="col-4">
                                                    <button>Bình luận</button>
                                                </div>
                                                <div className="col-4">
                                                    <button>Chia sẻ</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </>) :
                            (<><h2>Chưa có bài viết nào</h2></>)
                    }
                </div>
            </div>

        </div>

    );
}
export default Profile;