import { Outlet } from "react-router-dom";
import Header from "../components/header";

function LayoutDefault(){
    return(
        <>
            <div className="layout">
                <header>
                    <Header/>
                </header>
                <div className="main">
                    <Outlet />
                </div>
                <footer>
                    footer
                </footer>
            </div>
        </>
    )
}
export default LayoutDefault;