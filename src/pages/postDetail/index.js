import { useEffect, useState } from "react";
import { deleteComment, getDetailPost } from "../../services/postServices";
import { useNavigate, useParams } from "react-router-dom";
import socket from "../../sockets/socket";
import dayjs from "dayjs";
import "./postDetail.scss";
import { SendOutlined } from "@ant-design/icons"
import { likeSocket } from "../../helpers/likeSocket";
import { commentSocket } from "../../helpers/commentSocket";
function PostDetail() {
    const user_id = JSON.parse(localStorage.getItem("user_id"))
    const nav = useNavigate();
    const params = useParams();
    const [data, setData] = useState();
    const [trigger, setTrigger] = useState(true);
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getDetailPost(params.id);
            setData(res);
        };
        fetchApi();
    }, [trigger]);
    const handleDeleteComment = async (idPost, idComment) => {
        console.log(idPost, idComment)
        const res = await deleteComment(idPost, idComment);
        if (res) {
            console.log(res)
            if (res.code === 200) {
                setTrigger(!trigger)
            }
        }
    }
    const { handleLike, handleUnLike } = likeSocket({ socket, setTrigger, trigger, user_id });
    const { handleSubmit } = commentSocket({ socket, setTrigger, trigger, user_id })
    return (
        <>
            {data ? (
                <>
                    <div className="post-detail">
                        <div className="container">
                            <div className="col-12 post-detail-head" onClick={() => nav(`/post/${data._id}`)}>
                                <img width="50px" src={data.infoUser.avatar ? data.infoUser.avatar :
                                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s"}
                                    alt="Avatar người dùng"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => nav(`/user/profile/${data.user_id}`)}
                                />
                                <div>
                                    <b>{user_id === data.user_id ? "Bạn" : (<>{data.infoUser.fullName}</>)}</b>
                                    <div>{dayjs(data.createdAt).format("DD/MM/YYYY HH:mm")}</div>
                                </div>
                                {data.infoUser._id == user_id ? (<>
                                    {/* <div className="profile-post-option"><PostOptions postId={data._id} onDeletePost={handleDeletePost} /></div> */}
                                </>) : (<></>)}
                            </div>
                            <div className="col-12 post-detail-content">
                                {data.content}
                            </div>
                            <div className="col-12 post-detail-images">
                                {data.images.length > 0 ? data.images.map((data, index) => (
                                    <img src={data} />
                                )) : (<>
                                </>)}
                            </div>
                            <div className="post-detail-button row">
                                <div className="col-4">
                                    {data.likes.length > 0 ? (<>
                                        {data.likes.includes(user_id) ? (<button className="liked" onClick={() => handleUnLike(data._id)}>{data.likes.length} Thích</button>) :
                                            (<button onClick={() => handleLike(data._id)}>{data.likes.length} Thích</button>)}
                                    </>) : (<button onClick={() => handleLike(data._id)}>0 Thích</button>)}
                                </div>
                                <div className="col-4">
                                    <button onClick={() => {
                                        document.querySelector("#comment").focus();
                                    }}>Bình luận ({data.comments.length})</button>
                                </div>
                                <div className="col-4">
                                    <button>Chia sẻ</button>
                                </div>
                            </div>
                            <div className="post-detail_comment">
                                <div className="list-comments">
                                    {data.comments.length > 0 ? (
                                        <>
                                            {data.comments.map((item, index) => (
                                                <div className="comment-item" key={index}>
                                                    <div className="comment-item_avatar" onClick={() => nav(`/user/profile/${item.user_id}`)}>{item.infoUser.avatar ?
                                                        (<><img src={item.infoUser.avatar} /></>) :
                                                        (<><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s" /></>)}
                                                    </div>
                                                    <div className="comment-item_content">
                                                        <div className="fullName">{item.user_id === user_id ? "Bạn" : <>{item.infoUser.fullName}</>}</div>
                                                        <div className="content">{item.content}</div>
                                                    </div>
                                                    {
                                                        item.user_id === user_id ? (
                                                            <>
                                                                <div className="comment-item-delete" onClick={() => { handleDeleteComment(data._id, item._id) }}><span>Xóa</span></div>
                                                            </>
                                                        ) : (<></>)
                                                    }
                                                </div>
                                            ))}
                                        </>) :
                                        (<p>Chưa có bình luận nào</p>)}
                                </div>
                                <div className="form-comment">
                                    <form onSubmit={(e) => { handleSubmit(e, data._id) }}>
                                        <input type="text" id="comment" placeholder="Hãy bình luận gì đó..." />
                                        <button type="submit"> <SendOutlined /></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>) : (<></>)}
        </>
    )
}
export default PostDetail;