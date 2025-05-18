import "../profile/profile.scss"
function Profile() {
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;

    if (!user) {
        return <div>Vui lòng đăng nhập để xem trang cá nhân</div>;
    }

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
                            <span>0</span> bài đăng
                        </div>
                        <div className="col-4">
                            <span>{user.following.length} đang theo dõi</span>
                        </div>
                        <div className="col-4">
                            <span>{user.followews.length} người theo dõi</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Profile;