import { io } from "socket.io-client";

const socket = io("https://social-network-be-nt32.onrender.com", {
   autoConnect: true,
});

socket.on("connect", () => {
  console.log("Socket connected:", socket.id);
});

export default socket;
