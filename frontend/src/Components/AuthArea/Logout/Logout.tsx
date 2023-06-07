import { useNavigate } from "react-router-dom";
import authService from "../../../5-Service/AuthService";
import "./Logout.css";
import { useEffect } from "react";

function Logout(): JSX.Element {

    const navigate = useNavigate()
    useEffect(()=>{
        authService.logout()
        alert("Goodbye, we look forward to seeing you again soon!!")
        navigate("/auth/login")
    },[])
    return null
}

export default Logout;
