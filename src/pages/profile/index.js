import { useEffect, useRef, useState } from "react";
import "../profile/profile.scss"
import dayjs from "dayjs";
import { deletePost, getPostUser, likePost, newPost, unLikePost } from "../../services/postServices";
import { getInfoUser } from "../../services/userServices";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { follow, unfollow } from "../../services/followServices";
import { Button, Dropdown, Menu, Modal } from "antd";
import PostOptions from "../../helpers/postOptions";
import { createRoomChatServices } from "../../services/roomChatSevices";
import socket from "../../sockets/socket";
import { likeSocket } from "../../helpers/likeSocket";
import  { GetFollower, GetFollowing } from "./getFollow";


function Profile() {
    const [user, setUser] = useState(null);
    const nav = useNavigate()
    const params = useParams();
    const user_id = JSON.parse(localStorage.getItem("user_id"));
    const token = localStorage.getItem("token")
    const fetchUser = async () => {
        const res = await getInfoUser(params.id, token);
        if (res.code == 200) {
            setUser(res.user)
        } else {
            setUser(false)
        }
    }

    const [posts, setPosts] = useState([]);
    const [trigger, setTrigger] = useState(false); // trigger cho useEffect
    const fetchPost = async () => {
        const res = await getPostUser(params.id, token);
        setPosts((res.posts).reverse());
    }
    const { handleLike, handleUnLike } = likeSocket({ socket, setTrigger, trigger, user_id });
    useEffect(() => {
        fetchPost();
        fetchUser();
    }, [trigger, params.id]);

    //follow
    const handleFollow = async () => {
        const res = await follow(user._id)
        setTrigger(!trigger)
    }
    const handleUnFollow = async () => {
        const res = await unfollow(user._id)
        setTrigger(!trigger)

    }
    //end follow

    //set show follow
    const [showFollowingModal, setShowFollowingModal] = useState(false);
    const [showFollowerModal, setShowFollowerModal] = useState(false)
    //end set show follow

    //Model tạo bài viết mới
    const [open, setOpen] = useState(false);
    const fileInputRef = useRef(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const record = {
            content: e.target[0].value
        };
        if (e.target[1].value) {
            record.images = [e.target[1].value]
        }
        const res = await newPost(record);
        if (res.code == 200) {
            setOpen(false);
            setTrigger(!trigger)
        }
    }

    //end tạo bài viết mới

    //option post
    const handleDeletePost = async (postId) => {
        const res = await deletePost(postId);
        if (res.code == 200) {
            setTrigger(!trigger)
        }
    }
    //end option post

    //inbox
    const handleClick = async () => {
        const data = {
            senderId: user_id,
            receiverId: params.id
        }
        const res = await createRoomChatServices(data);
        if (res.code === 200) {
            nav(`/chat/${res.chatId}`)
            socket.emit("CLIENT_JOIN_CHAT", {
                roomChatId: res.chatId
            })
        }
    }
    //end inbox

    if (user === null) {
        return <div>Đang tải...</div>; // hoặc spinner
    }

    if (!user) {
        return <div>Vui lòng đăng nhập để xem trang cá nhân</div>;
    };

    return (
        <div className="profile">
            <div className="container">
                <div className="row profile-info">
                    <div className="col-4 profile-avatar">
                        <img src={user.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s"} alt="Avatar người dùng" />
                    </div>
                    <div className="col-8 row">
                        <div className="col-6">{user.fullName}</div>
                        <div className="col-6">
                            {user._id === user_id ? (<><NavLink to={"/user/profile/edit"}>Cập nhật trang cá nhân</NavLink></>) : (
                                <>
                                    {
                                        user.followews.includes(user_id) ? (
                                            <>
                                                <NavLink onClick={handleUnFollow}>Đang theo dõi</NavLink>
                                            </>) : (<><NavLink onClick={handleFollow}>Theo dõi</NavLink></>)
                                    }
                                </>)}
                        </div>
                        {user._id !== user_id ? (
                            <>
                                <div className="col-4">
                                    <NavLink onClick={() => handleClick()}>Nhắn tin</NavLink>
                                </div>
                            </>
                        ) : (<></>)}
                        <div className="col-4">
                            <span>{posts.length > 0 ? posts.length : 0}</span> bài đăng
                        </div>
                        <div className="col-4" onClick={() => setShowFollowingModal(true)}>
                            <span>{user.following.length} đang theo dõi</span>
                        </div>
                        <GetFollowing id={params.id} open={showFollowingModal} onClose={() => setShowFollowingModal(false)}/>
                        <div className="col-4" onClick={() => setShowFollowerModal(true)}>
                            <span>{user.followews.length} người theo dõi</span>
                        </div>
                        <GetFollower id={params.id} open={showFollowerModal} onClose={() => setShowFollowerModal(false)}/>

                    </div>
                </div>
                <div className="row profile-create-post">
                    <div className="col-12 text-end">
                        {user._id === user_id ? (<button className="btn btn-primary" onClick={() => setOpen(true)}>+ Tạo bài viết</button>) : (<></>)}
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
                                                <img width="50px" src={user.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s"} alt="Avatar người dùng" />
                                                <div>
                                                    <b>{user.fullName}</b>
                                                    <div>{dayjs(item.createdAt).format("DD/MM/YYYY HH:mm")}</div>
                                                </div>
                                                {user._id == user_id ? (<>
                                                    <div className="profile-post-option"><PostOptions postId={item._id} onDeletePost={handleDeletePost} /></div>
                                                </>) : (<></>)}
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
                                                    {item.likes.length > 0 ? (<>
                                                        {item.likes.includes(user_id) ? (<button className="liked" onClick={() => { handleUnLike(item._id) }}>{item.likes.length} Thích</button>) :
                                                            (<button onClick={() => { handleLike(item._id) }}>{item.likes.length} Thích</button>)}
                                                    </>) : (<button onClick={() => { handleLike(item._id) }} >0 Thích</button>)}
                                                </div>
                                                <div className="col-4">
                                                    <button onClick={() => nav(`/post/${item._id}`)}>Bình luận</button>
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
            <Modal
                title={<p>Tạo bài viết mới</p>}
                footer={<></>}
                open={open}
                onCancel={() => setOpen(false)}
            >
                <>
                    <form onSubmit={handleSubmit}>
                        <div className="form-set-content"><textarea placeholder=" Bạn đang nghĩ gì?" rows={5} name="content" required /></div>
                        <div>
                            <div className="form-set-images" onClick={() => handleAvatarClick()}>Chọn ảnh</div>
                            <input
                                type="file"
                                name="images"
                                accept="image/*"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                onChange={(e) => setAvatarFile(e.target.files[0])}
                            />

                            {avatarFile && (
                                <div className="avatar-preview">
                                    <img src={URL.createObjectURL(avatarFile)} alt="Ảnh xem trước" />
                                    <span onClick={() => { setAvatarFile(null) }}>Xóa</span>
                                </div>
                            )}</div>
                        <div className="form-set-submit"><button type="submit" >Đăng bài</button></div>
                    </form>
                </>
            </Modal>
        </div>

    );
}
export default Profile;