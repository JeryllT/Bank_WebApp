import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";

const loggedInLayout = () => {

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default loggedInLayout