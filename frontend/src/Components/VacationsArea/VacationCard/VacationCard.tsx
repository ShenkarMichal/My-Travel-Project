import appConfig from "../../../2-Utils/Config";
import VacationModel from "../../../4-Models/VacationModel";
import "./VacationCard.css";

interface VacationCardProps {
    vacation: VacationModel
}

function VacationCard(props: VacationCardProps): JSX.Element {
    return (
        <div className="VacationCard" style={{backgroundImage: `url(${appConfig.vacationImageURL + props.vacation.vacationID})`}} >
			<h6>{props.vacation.destination}</h6>
            <span>Start: {props.vacation.startDate} <br /> End: {props.vacation.endDate}</span>
        </div>
    );
}

export default VacationCard;
