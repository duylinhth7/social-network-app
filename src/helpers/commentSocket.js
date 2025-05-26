export const commentSocket = ({ socket, trigger, setTrigger, user_id }) => {
    const handleSubmit = (e, id_post) => {
        e.preventDefault()
        const content = e.target[0].value;
        if (content) {
            socket.emit("CLIENT_COMMENT", {
                user_id,
                content,
                id_post
            })
            e.target[0].value =""
        }
    }

    socket.on("SERVER_RETURN_COMMENT", (data) => {
        if (data) {
            setTrigger(!trigger)
        }
    })

    return {
        handleSubmit
    }
}