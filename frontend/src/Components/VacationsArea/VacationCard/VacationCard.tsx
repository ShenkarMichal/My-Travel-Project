import { useEffect, useState } from "react";
import VacationModel from "../../../4-Models/VacationModel";
import "./VacationCard.css";
import vacationService from "../../../5-Service/VacationsService";
import CardButtons from "../../UtilsComponents/CardButtons/CardButtons";
import { NavLink, useNavigate } from "react-router-dom";
import notifyService from "../../../5-Service/NotifyService";

interface VacationCardProps {
    vacation: VacationModel
}

function VacationCard(props: VacationCardProps): JSX.Element {
    const [imageURl, setImageURL] = useState("")
    useEffect(()=>{
        vacationService.getVacationImageUrl(props.vacation.vacationID)
            .then(url => setImageURL(url))
            .catch(err => notifyService.error(err))
    },[props])


    return (
        <div className="VacationCard" style={{backgroundImage: `url(${imageURl})`}} >
            <CardButtons vacation={props.vacation}  />
            <NavLink to={`/vacations/${props.vacation?.vacationID}`}>
                    <h6>{props.vacation.destination}</h6>
                    <span>Start: {props.vacation.startDate}</span> <br/>
                    <span> End: {props.vacation.endDate}</span>             
            </NavLink>
        </div>
    );
}

export default VacationCard;
