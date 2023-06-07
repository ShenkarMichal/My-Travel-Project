import "./VacationsCSV.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import followersService from "../../../5-Service/FollowersService";
import appConfig from "../../../2-Utils/Config";

function VacationsCSV(): JSX.Element {

    const navigate = useNavigate()
    useEffect(()=>{
        followersService.getCsvFile()
            .then(()=> {
                console.log("success")
                const link = document.createElement('a');
                link.href = appConfig.csvFileDownloadURL;
                link.download = 'output.csv';
                link.click();
            })
            .catch(err => console.log(err))
        navigate("/vacations")
    },[])

    return null
}

export default VacationsCSV;
