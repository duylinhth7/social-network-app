import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import socket from "../../sockets/socket";
import { getChat } from "../../services/chatServices";
import { getRoomChat } from "../../services/roomChatSevices";
import dayjs from "dayjs";
import "./chat.scss";
import { useChatSocket, UseChatSocket } from "../../helpers/useChatSocket";
import EmojiPicker from 'emoji-picker-react';
import { SmileOutlined } from "@ant-design/icons"


function Chat() {
  const nav = useNavigate()
  const params = useParams();
  const { id } = params; // roomChatId
  const user_id = JSON.parse(localStorage.getItem("user_id"));

  const [messages, setMessages] = useState([]);
  const [contentChat, setContentChat] = useState("")
  const [typingUser, setTypingUser] = useState(null);
  const [user, setUser] = useState(null);

  const fetchRoomChat = async () => {
    const res = await getRoomChat(id);
    if (res.code === 200) {
      const user = res.roomChat.users.find(item => item.user_id !== user_id);
      setUser(user);
    } else {
      nav("/")
    }
  };

  const fetchMessage = async () => {
    const res = await getChat(id);
    console.log(res)
    if (res.code === 200) {
      setMessages(res.chats);
    }
  };
  useEffect(() => {
    fetchRoomChat();
    fetchMessage()
  }, [])
  const [emoji, setEmoji] = useState(false);

  const {
    handleSubmit,
    handleKeyUp,
    handleDelete,
    messagesEndRef
  } = useChatSocket({
    socket,
    roomChatId: id,
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
    <div className="container">
      <div className="chat">
        {user && (
          <div className="chat-head">
            <div className="chat-head-avatar">
              <img
                src={user.infoUser.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s"}
                alt="avatar"
              />
            </div>
            <div className="chat-head-name">
              <span>{user.infoUser.fullName}</span>
            </div>
          </div>
        )}

        <div className="chat-body">
          {
            messages && user ? (<>          {messages.map((item) => (
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
          ))}</>) : ""
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

        <form onSubmit={handleSubmit}>
          <input name="message" placeholder="Nhập tin nhắn..."
            type="text"
            value={contentChat}
            onChange={(e) => setContentChat(e.target.value)}
            onKeyUp={handleKeyUp} />
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
  );
}

export default Chat;
