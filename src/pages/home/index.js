import { useEffect, useState } from "react";
import { getAllPost } from "../../services/postServices";
import { getInfoUser } from "../../services/userServices";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { handleLikeHelper, handleUnLikeHelper } from "../../helpers/postHelper";
import PostHome from "../../components/postHome";

function Home() {
    const nav = useNavigate();
    const user_id = JSON.parse(localStorage.getItem("user_id"));
    const [data, setData] = useState();
    const [trigger, setTrigger] = useState(true);
    const fetchPost = async () => {
        const res = await getAllPost();
        if (res.code === 200) {
            setData((res.posts).reverse());
        } else {
            setData(0)
        }
    };
    useEffect(() => {
        fetchPost();
    }, [trigger]);
    return (
        <>
            <div className="post_home">
                <div className="container">
                    <div className="mt-4">
                        <PostHome trigger={trigger} setTrigger={setTrigger}/>
                    </div>
                    <div className="row profile-post">
                        {
                            data ? (data.map((item, index) => (
                                <div className="profile-post-item" key={index}>
                                    <div className="col-12 profile-post-head" onClick={() => nav(`/post/${item._id}`)}>
                                        <img width="50px" src={item.infoUser.avatar ? item.infoUser.avatar :
                                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s"}
                                            alt="Avatar người dùng"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => { nav(`/user/profile/${item.user_id}`) }}
                                        />
                                        <div>
                                            <b>{user_id === item.user_id ? "Bạn" : (<>{item.infoUser.fullName}</>)}</b>
                                            <div>{dayjs(item.createdAt).format("DD/MM/YYYY HH:mm")}</div>
                                        </div>
                                        {item.infoUser._id == user_id ? (<>
                                            {/* <div className="profile-post-option"><PostOptions postId={item._id} onDeletePost={handleDeletePost} /></div> */}
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
                                                {item.likes.includes(user_id) ? (<button className="liked" onClick={() => handleUnLikeHelper(item._id, trigger, setTrigger)}>{item.likes.length} Thích</button>) :
                                                    (<button onClick={() => handleLikeHelper(item._id, trigger, setTrigger)}>{item.likes.length} Thích</button>)}
                                            </>) : (<button onClick={() => handleLikeHelper(item._id, trigger, setTrigger)}>0 Thích</button>)}
                                        </div>
                                        <div className="col-4">
                                            <button onClick={() => nav(`/post/${item._id}`)}>Bình luận ({item.comments.length})</button>
                                        </div>
                                        <div className="col-4">
                                            <button>Chia sẻ</button>
                                        </div>
                                    </div>
                                </div>
                            ))) : (<></>)
                        }
                    </div>
                </div>
            </div>
        </>
    )

};
export default Home;