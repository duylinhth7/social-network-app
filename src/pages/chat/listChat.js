import { useEffect, useState } from "react";
import { getListRoomChat, getRoomChat } from "../../services/roomChatSevices";
import "./listChat.scss";
import { getChat } from "../../services/chatServices";
import dayjs from "dayjs";
import { useChatSocket } from "../../helpers/useChatSocket";
import socket from "../../sockets/socket";
import { MessageOutlined, SmileOutlined } from "@ant-design/icons"
import EmojiPicker from "emoji-picker-react";
import { getInfoUser } from "../../services/userServices";

function ListChat() {
    const [active, setActive] = useState(null);
    const user_id = JSON.parse(localStorage.getItem("user_id"));
    const [data, setData] = useState(null);
    const [contentChat, setContentChat] = useState("")
    const [roomChatId, setRoomChatId] = useState(null);
    const [typingUser, setTypingUser] = useState(null)
    const [messages, setMessages] = useState(0);
    const [user, setUser] = useState(null);
    const fetchApi = async () => {
        const res = await getListRoomChat();
        if (res.code === 200) {
            setData(res.listRooms)
        }
    }
    const handleClick = async (id) => {
        setRoomChatId(id)
        const res = await getChat(id);
        if (res.code === 200) {
            setMessages(res.chats);
            const resRoom = await getRoomChat(id);
            const otherUser = resRoom.roomChat.users.find(item => item.user_id !== user_id);
            setUser(otherUser)
        }
    }
    useEffect(() => {
        fetchApi()
    }, [])
    const [emoji, setEmoji] = useState(false);

    const {
        handleSubmit,
        handleKeyUp,
        handleDelete,
        messagesEndRef
    } = useChatSocket({
        socket,
        roomChatId,
        user_id,
        setMessages,
        setTypingUser,
        setContentChat,
        setEmoji
    });

    const onEmoji = (e) => {
        handleKeyUp();
        setContentChat(item => item + e.emoji)
    }
    return (
        <>
            <div className="list-chat">
                <div className="title">Đoạn chat</div>
                <div className="row">
                    <div className="col-sm-3 col-12 list-chat-left">
                        {
                            data ? (
                                <>
                                    {data.map((item, index) => (
                                        <div className={`list-chat-item ${active === index ? ("active") : ""}`} index={item._id || index} onClick={() => { handleClick(item._id); setActive(index) }}>
                                            <div className="list-chat-avatar">
                                                <img src={item.info.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s"} />
                                            </div>
                                            <div className="list-chat-name">
                                                <span>{item.info.fullName}</span>
                                            </div>
                                        </div>
                                    ))}
                                </>) : (<></>)
                        }
                    </div>
                    <div className="col-sm-9 col-12 list-chat-right">
                        <div className="chat-body">
                            {
                                messages !== 0  && user ? (
                                    <>
                                        {messages.map((item) => (
                                            <div key={item._id} className={item.user_id === user_id ? "chat-body-item you" : "chat-body-item"}>
                                                <div className="chat-body-info">
                                                    {item.user_id !== user_id && (
                                                        <div className="avatar">
                                                            <img
                                                                src={user.infoUser.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s"}
                                                                alt="avatar"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="chat-body-message">
                                                    <div className="name">
                                                        <span>{item.user_id === user_id ? "Bạn" : user.infoUser.fullName}</span>
                                                    </div>
                                                    <div>
                                                        <span className={`message ${item.deleted ? "deleted" : ""}`}>{item.deleted ? ("Tin nhắn đã bị xóa") : (item.message)}</span>
                                                    </div>
                                                    <div className="chat-body-option">
                                                        {
                                                            item.user_id === user_id ? (<div className="delete" onClick={() => handleDelete(item._id)}>Xóa</div>) : (<></>)
                                                        }
                                                        <div>{dayjs(item.updatedAt).format("DD/MM/YYYY HH:mm:ss")}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>) : (
                                    <>
                                        <div className="not-chat">
                                            <MessageOutlined />
                                            <span>  Message</span>
                                        </div>
                                    </>)
                            }

                            {typingUser && (
                                <div className="chat-typing">
                                    <div className="avatar">
                                        <img
                                            src={typingUser.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s"}
                                            alt="Typing user avatar"
                                        />
                                    </div>
                                    <div className="dots">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef}></div>
                        </div>
                        <form style={{ display: messages === 0 ? ("none") : "" }} onSubmit={handleSubmit}>
                            <input name="message" placeholder="Nhập tin nhắn..." value={contentChat}
                                onChange={(e) => setContentChat(e.target.value)} type="text" onKeyUp={handleKeyUp} />
                            <div className="open-emoji" onClick={() => setEmoji(!emoji)}><SmileOutlined /></div>
                            <button type="submit">Send</button>
                        </form>
                        {emoji && (
                            <div className="emoji">
                                <span><EmojiPicker open={emoji} onEmojiClick={onEmoji} width={300} height={400} /></span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
export default ListChat;