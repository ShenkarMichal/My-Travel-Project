import "./VacationsCSV.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import followersService from "../../../5-Service/FollowersService";
import notifyService from "../../../5-Service/NotifyService";

function VacationsCSV(): JSX.Element {

    const navigate = useNavigate()
    useEffect(()=>{
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
