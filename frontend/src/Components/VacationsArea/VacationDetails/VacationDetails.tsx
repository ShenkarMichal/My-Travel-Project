import { useEffect, useState } from "react";
import VacationModel from "../../../4-Models/VacationModel";
import "./VacationDetails.css";
import vacationService from "../../../5-Service/VacationsService";
import { useParams } from "react-router-dom";
import { url } from "inspector";
import appConfig from "../../../2-Utils/Config";

function VacationDetails(): JSX.Element {

    const [vacation, setVacation] = useState<VacationModel>()
    const vacationID = +useParams().vacationID

    useEffect(()=>{
        vacationService.getOneVacation(vacationID)
            .then(v => setVacation(v))
            .catch(err => console.log(err))
    },[])

    return (
        <div className="VacationDetails" style={{backgroundImage: `url(${appConfig.vacationImageURL + vacation?.vacationID})`}}>
            {vacation && <>
                <div className="DetailsContainer">
                    <div className="Details">
                        <h2>{vacation.destination}</h2>
                        <div className="DetailsHeading">Where?</div>
                    </div>
                    <div className="Details">
                        <h4>From: {vacation.startDate} To: {vacation.endDate}. Total: {vacation.daysDiff}</h4>
                        <div className="DetailsHeading">When?</div>
                    </div>
                    <div className="Details">
                        <span>{vacation.description}</span>
                        <div className="DetailsHeading">What?</div>
                    </div>
                    <div className="Details">
                        <span>{vacation.price}</span>
                        <div className="DetailsHeading">How much?</div>
                    </div>
                    <div className="Details">
                        <span>More...</span>
                        <div className="DetailsHeading">More...</div>
                    </div>                
                </div>
            </>}
        </div>
    );
}

export default VacationDetails;
