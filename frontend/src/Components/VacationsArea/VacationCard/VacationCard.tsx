import VacationModel from "../../../4-Models/VacationModel";
import "./VacationCard.css";

interface VacationCardProps {
    vacation: VacationModel
}

function VacationCard(props: VacationCardProps): JSX.Element {
    return (
        <div className="VacationCard">
			<h3>{props.vacation.destination}</h3>
            {/* Image */}
            <span>Start: {props.vacation.startDate} | End: {props.vacation.endDate}</span>
        </div>
    );
}

export default VacationCard;
