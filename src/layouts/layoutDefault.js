import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

function LayoutDefault(){
    return(
        <>
            <div className="layout">
                <Header>
                    <Header/>
                </Header>
                <div className="main" style={{background: "#f9f9f9"}}>
                    <Outlet />
                </div>
                <footer>
                    <Footer/>
                </footer>
            </div>
        </>
    )
}
export default LayoutDefault;