import "./VacationsCSV.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import followersService from "../../../5-Service/FollowersService";
import notifyService from "../../../5-Service/NotifyService";
import verifyLogged from "../../../2-Utils/VerifyLogged";

function VacationsCSV(): JSX.Element {

    
    const isAdmin = verifyLogged.isAdmin()
    const isLogged = verifyLogged.isLogged()

    const navigate = useNavigate()
    useEffect(()=>{
        if(isLogged && !isAdmin) {
            notifyService.error("You dont have an admin premmision")
            navigate("/vacations")
            return
        }

        followersService.getCsvFile()
            .then((data)=> {
                console.log("success");
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(new Blob([data]));
                link.download = 'output.csv';
                link.click();
                notifyService.success("The CSV file has been download")
            })
            .catch(err => notifyService.error(err))
        navigate("/vacations")
    },[])

    return null
}

export default VacationsCSV;
