
export const likeSocket = ({
    socket,
    trigger,
    setTrigger,
    user_id
}) => {
    const handleLike = (id) => {
        socket.emit("CLIENT_LIKE_POST", {
            id_post: id,
            user_id
        })
    };

    const handleUnLike = (id) => {
        socket.emit("CLIENT_UNLIKE_POST", {
            id_post: id,
            user_id
        })
    };

    socket.on("SERVER_RETURN_UNLIKE" , (data) => {
        if(data){
            setTrigger(!trigger)
        }
    })

    socket.on("SERVER_RETURN_LIKE", (data) => {
        setTrigger(!trigger)
    })


    return {
        handleLike,
        handleUnLike
    }
}