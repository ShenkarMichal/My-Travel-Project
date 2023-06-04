import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import "./Layout.css";
import UserModel from "../../../4-Models/UserModel";
import { authStore } from "../../../3-Redux/AuthState";
import { useLocation } from "react-router-dom";

function Layout(): JSX.Element {

    
    const [user, setUser] = useState<UserModel>()

    //Get re-render when the URL of react-router-dom is change:
    const location = useLocation()

    useEffect(()=>{
        setUser(authStore.getState().user)
    },[location])
    
    return (
        <div className="Layout">
            <header>
                <Header user={user} />
            </header>
			<Main />
        </div>
    );
}

export default Layout;
