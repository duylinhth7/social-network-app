import { likePost, postComment, unLikePost } from "../services/postServices";

export const commentHelper = async (e, id, trigger, setTrigger) => {
    e.preventDefault()
    const value = e.target[0].value;
    if (value) {
        try {
            const res = await postComment(id, value);
            if(res){
                 e.target[0].value = "";
            }
            setTrigger(!trigger);
        } catch (error) {
        }
    }
}