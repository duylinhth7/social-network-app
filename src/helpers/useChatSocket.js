import { useEffect, useRef } from "react";

export const useChatSocket = ({
  socket,
  roomChatId,
  user_id,
  setMessages,
  setTypingUser,
  setContentChat,
  setEmoji  
}) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNewMessage = (data) => {
    setMessages(prev => {
      const newMessages = [...prev, data];
      scrollToBottom();
      return newMessages;
    });
  };

  const handleTyping = (data) => {
    setTypingUser(data.infoUser);
    scrollToBottom();
    setTimeout(() => setTypingUser(null), 3000);
  };

  const handleDeleteMessage = (data) => {
    setMessages((prev) =>
      prev.map((item) =>
        item._id === data.id_message ? { ...item, deleted: true } : item
      )
    );
  };

  useEffect(() => {
    if (!roomChatId || !user_id) return;

    const handleConnect = () => {
      socket.emit("CLIENT_JOIN_CHAT", { roomChatId });
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
  }, [roomChatId, user_id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = e.target.message.value;
    setContentChat("");
    setEmoji(false)
    if (!message) return;

    socket.emit("CLIENT_SEND_MESSAGE", {
      user_id,
      roomChatId,
      message,
    });

    
  };

  const handleKeyUp = () => {
    socket.emit("CLIENT_ON_KEY_UP", {
      user_id,
      roomChatId,
    });
  };

  const handleDelete = async (id_message) => {
    socket.emit("CLIENT_DELETE_MESSAGE", {
      user_id,
      id_message,
      roomChatId,
    });
  };

  return {
    handleSubmit,
    handleKeyUp,
    handleDelete,
    messagesEndRef
  };
};
