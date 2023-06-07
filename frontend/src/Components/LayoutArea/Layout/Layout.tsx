import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import "./Layout.css";
import UserModel from "../../../4-Models/UserModel";
import { authStore } from "../../../3-Redux/AuthState";
import { useLocation } from "react-router-dom";
import AdminSpeedDial from "../../UtilsComponents/AdminSpeedDial/AdminSpeedDial";
import RoleModel from "../../../4-Models/RoleModel";

function Layout(): JSX.Element {

    
    const [user, setUser] = useState<UserModel>()

    useEffect(()=>{
        setUser(authStore.getState().user)        
        
        const unsubscribe = authStore.subscribe(()=>{
            setUser(authStore.getState().user)
        })

        return ()=> unsubscribe()
    },[])
    
    return (
        <div className="Layout">
            <header>
                <Header user={user} />
            </header>
            <main>
			    <Main />
            </main>
            <aside>
                <AdminSpeedDial user={user} />
            </aside>    
        </div>
    );
}

export default Layout;
