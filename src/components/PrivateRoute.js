
import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(user)
    return(
        <>
            {user ? <>
            {props.children}
            </> : 
            <>
            <Navigate to="/user/login"></Navigate>
            </>}
        </>
    )
};

export default PrivateRoute;
