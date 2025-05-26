import { useState } from "react";
import { searchServices } from "../../services/userServices";
import "./searchSuggest.scss"
import { useNavigate } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons"


function Search() {
    const nav = useNavigate();
    const user_id = JSON.parse(localStorage.getItem("user_id"));
    const [data, setData] = useState();
    const [isVisible, setIsVisible] = useState(false);
    const handleKeyUp = async (e) => {
        const keyword = e.target.value;
        if (keyword) {
            const res = await searchServices(keyword);
            setIsVisible(true)
            setData(res.users)
        }
    }


    return (
        <>
            <form >
                <input
                    onKeyUp={handleKeyUp}
                    name="keyword"
                    type="text"
                    placeholder="Tìm kiếm..."
                    required />
                <button type="submit">Tìm kiếm</button>
                <div className = {isVisible ? "search-suggest" : "hidden"}>
                    <div className="close" onClick={() => setIsVisible(false)}><CloseOutlined /></div>
                    {
                        data ? (
                            <>
                                {data.map((item, index) => (
                                    <div className="search-suggest-item" key={index} onClick={() => {nav(`/user/profile/${item._id}`);
                                     setIsVisible(false)
                                    }}>
                                        <div className="search-suggest-avatar">
                                            <img src={item.avatar ? (item.avatar) : ("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s")} />
                                        </div>
                                        <div className="search-suggest-name">
                                            <span>
                                                {item._id === user_id ? ("Bạn") : (item.fullName)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )
                            :
                            (<>
                                <div className="search-suggest-not">
                                    <span>Không tìm thấy kết quả!</span>
                                </div>
                            </>)
                    }
                </div>
            </form>
        </>
    )
}
export default Search;