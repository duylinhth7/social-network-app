import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import socket from "../../sockets/socket";
import { getChat } from "../../services/chatServices";
import { getRoomChat } from "../../services/roomChatSevices";
import dayjs from "dayjs";
import "./chat.scss";

function Chat() {
  const nav = useNavigate()
  const params = useParams();
  const { id } = params; // roomChatId
  const user_id = JSON.parse(localStorage.getItem("user_id"));
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([]);
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
    if (res.code === 200) {
      setMessages(res.chats);
    }
  };

  const handleDeleteMessage = (data) => {
    setMessages((prev) =>
      prev.map((item) =>
        item._id === data.id_message
          ? { ...item, deleted: true }
          : item
      )
    );
  };


  const handleNewMessage = (data) => {
    setMessages(prev => {
      const newMessages = [...prev, data];
      scrollToBottom(); // Chỉ scroll khi có tin nhắn mới
      return newMessages;
    });
  };

  const handleTyping = (data) => {
    setTypingUser(data.infoUser);
    scrollToBottom();
    setTimeout(() => setTypingUser(null), 3000);
  };

  useEffect(() => {
    if (!id || !user_id) return;

    fetchMessage();
    fetchRoomChat();

    const handleConnect = () => {
      socket.emit("CLIENT_JOIN_CHAT", { roomChatId: id });
    };

    if (socket.connected) {
      handleConnect();
    } else {
      socket.once("connect", handleConnect);
    }

    socket.on("SERVER_RETURN_MESSAGE", handleNewMessage);
    socket.on("SERVER_RETURN_TYPING", handleTyping);
    socket.on("SERVER_RETURN_DELETE_MESSAGE", handleDeleteMessage);

    return () => {
      socket.off("SERVER_RETURN_MESSAGE", handleNewMessage);
      socket.off("SERVER_RETURN_TYPING", handleTyping);
      socket.off("SERVER_RETURN_DELETE_MESSAGE", handleDeleteMessage);
      socket.off("connect", handleConnect);
    };
  }, [id, user_id]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = e.target.message.value;
    if (!message) return;

    socket.emit("CLIENT_SEND_MESSAGE", {
      user_id,
      roomChatId: id,
      message,
    });

    e.target.message.value = "";
  };

  const handleKeyUp = () => {
    socket.emit("CLIENT_ON_KEY_UP", {
      user_id,
      roomChatId: id,
    });
  };

  const handleDelete = async (id_message) => {
    socket.emit("CLIENT_DELETE_MESSAGE", {
      user_id,
      id_message,
      roomChatId: id,
    });
  };

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
          {messages.map((item) => (
            <div key={item._id} className={item.user_id === user_id ? "chat-body-item you" : "chat-body-item"}>
              <div className="chat-body-info">
                {item.user_id !== user_id && (
                  <div className="avatar">
                    <img
                      src={item.infoUser.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s"}
                      alt="avatar"
                    />
                  </div>
                )}
              </div>
              <div className="chat-body-message">
                <div className="name">
                  <span>{item.user_id === user_id ? "Bạn" : item.infoUser.fullName}</span>
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
          <input name="message" placeholder="Nhập tin nhắn..." type="text" onKeyUp={handleKeyUp} />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
