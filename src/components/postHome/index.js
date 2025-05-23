import { useRef, useState } from "react";
import "./postHome.scss"
import { CameraOutlined } from "@ant-design/icons"
import { newPost } from "../../services/postServices";

function PostHome({trigger, setTrigger}) {
    const [imageFile, setImageFile] = useState();
    const fileInputRef = useRef();
    const handleSetImage = () => {
        fileInputRef.current.click();
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const record = {
            content: e.target[0].value
        }
        if(imageFile){
            record["images"] = imageFile
        }
        const res = await newPost(record);
        if(res.code === 200){
            e.target[0].value ="";
            setImageFile(null)
            setTrigger(!trigger);
        }
    }
    return (
        <>
            <form className="post" onSubmit={handleSubmit}>
                <div className="post-content">
                    <textarea name=""content rows="4" placeholder="Nhập nội dung bạn muốn chia sẻ..." />
                </div>
                <input
                    type="file"
                    name="images"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={(e) => setImageFile(e.target.files[0])}
                />
                {
                    imageFile && (
                        <div className="image-preview">
                            <img src={URL.createObjectURL(imageFile)} atl="Ảnh xem trước" />
                            <span onClick={() => { setImageFile(null) }}>X</span>
                        </div>
                    )
                }
                <div>
                    <div className="post-set-image" onClick={() => handleSetImage()}>
                        <span><CameraOutlined /></span>
                    </div>
                </div>
                <div className="post-submit">
                    <button type="submit">
                        Đăng bài
                    </button>
                </div>
            </form>
        </>
    )
}
export default PostHome;