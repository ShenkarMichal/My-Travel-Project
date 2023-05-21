import appConfig from "../../../2-Utils/Config";
import VacationModel from "../../../4-Models/VacationModel";
import "./VacationCard.css";

interface VacationCardProps {
    vacation: VacationModel
}

function VacationCard(props: VacationCardProps): JSX.Element {
    return (
        <div className="VacationCard" style={{backgroundImage: `url(${appConfig.vacationImageURL + props.vacation.vacationID})`}} >
			<h3>{props.vacation.destination}</h3>
            {/* <img src={appConfig.vacationImageURL + props.vacation.vacationID} /> */}
            <span>Start: {props.vacation.startDate} | End: {props.vacation.endDate}</span>
        </div>
    );
}

export default VacationCard;
