import { useEffect, useState } from "react";
import appConfig from "../../../2-Utils/Config";
import VacationModel from "../../../4-Models/VacationModel";
import "./VacationCard.css";
import vacationService from "../../../5-Service/VacationsService";

interface VacationCardProps {
    vacation: VacationModel
}

function VacationCard(props: VacationCardProps): JSX.Element {
    const [imageURl, setImageURL] = useState("")

    useEffect(()=>{
        vacationService.getVacationImageUrl(props.vacation.vacationID)
            .then(url => setImageURL(url))
            .catch(err => console.log(err))
    },[props.vacation])

    return (
        <div className="VacationCard" style={{backgroundImage: `url(${imageURl})`}} >
			<h6>{props.vacation.destination}</h6>
            <span>Start: {props.vacation.startDate} <br /> End: {props.vacation.endDate}</span>
        </div>
    );
}

export default VacationCard;
