import { useEffect, useState } from "react"
import { getFollowerServices, getFollowingServices } from "../../services/followServices";
import "./modelFollow.scss"
import { Modal } from "antd";
export const  GetFollowing = ({ id, open, onClose }) => {
    const [following, setFollowing] = useState(null);
    const fetchApi = async () => {
        const res = await getFollowingServices(id);
        setFollowing(res.followingInfo);
    }
    useEffect(() => {
        if (open) {
            fetchApi();
        }
    }, [open]);
    return (
        <>
            <Modal
                title={<p>Người đang theo dõi</p>}
                open={open}
                onCancel={() => onClose()}
                footer={null}
            >
                {
                    following && (
                        <div className="model-follow">
                            {
                                following.map((item, index) => (
                                    <div className="model-item">
                                        <div className="model-info">
                                            <img src={item.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s"}/>
                                            <span className="fullName">{item.fullName}</span>
                                        </div>
                                        <div>Đang theo dõi</div>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </Modal>
        </>
    )
}

//Get follower

export const  GetFollower = ({ id, open, onClose }) => {
    const [follower, setFollower] = useState(null);
    const fetchApi = async () => {
        const res = await getFollowerServices(id);
        setFollower(res.followerInfo);
    }
    useEffect(() => {
        if (open) {
            fetchApi();
        }
    }, [open]);
    return (
        <>
            <Modal
                title={<p>Người đang theo dõi</p>}
                open={open}
                onCancel={() => onClose()}
                footer={null}
            >
                {
                    follower && (
                        <div className="model-follow">
                            {
                                follower.map((item, index) => (
                                    <div className="model-item">
                                        <div className="model-info">
                                            <img src={item.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s"}/>
                                            <span className="fullName">{item.fullName}</span>
                                        </div>
                                        <div>Người theo dõi</div>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </Modal>
        </>
    )
}