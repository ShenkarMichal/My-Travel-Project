import { useNavigate, useParams } from "react-router-dom";
import vacationService from "../../../5-Service/VacationsService";
import "./DeleteVacation.css";
import { useEffect } from "react";

function DeleteVacation(): JSX.Element {

    const vacationID = +useParams().vacationID
    const navigate = useNavigate()
    useEffect(()=>{
        vacationService.deleteVacation(vacationID)
            .then(()=>{
                console.log("success")
                navigate("/vacations")})
            .catch(err => console.log(err))
    },[])
    return null
}

export default DeleteVacation;
