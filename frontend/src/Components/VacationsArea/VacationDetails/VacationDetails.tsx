import { useEffect, useState } from "react";
import VacationModel from "../../../4-Models/VacationModel";
import "./VacationDetails.css";
import vacationService from "../../../5-Service/VacationsService";
import { Navigate, useParams } from "react-router-dom";
import verifyLogged from "../../../2-Utils/VerifyLogged";

function VacationDetails(): JSX.Element {

    const isLogged = verifyLogged.isLogged()

    const [vacation, setVacation] = useState<VacationModel>()
    const vacationID = +useParams().vacationID

    useEffect(()=>{
        vacationService.getOneVacation(vacationID)
            .then(v => setVacation(v))
            .catch(err => console.log(err))
    },[])

    const [imageURl, setImageURL] = useState("")

    useEffect(()=>{
        vacationService.getVacationImageUrl(vacation?.vacationID)
            .then(url => setImageURL(url))
            .catch(err => console.log(err))
    },[vacation])

    return (
        <>
        {isLogged &&       
            <div className="VacationDetails" style={{backgroundImage: `url(${imageURl})`}}>
                {vacation && <>
                    <div className="DetailsContainer">
                        <div className="Details">
                            <h2>{vacation.destination}</h2>
                            <div className="DetailsHeading">Where?</div>
                        </div>
                        <div className="Details">
                            <h4>From: {vacation.startDate} <br/> To: {vacation.endDate}. <br/> Total: {vacation.duration} days.</h4>
                            <div className="DetailsHeading">When?</div>
                        </div>
                        <div className="Details">
                            <span>{vacation.description}</span>
                            <div className="DetailsHeading">What?</div>
                        </div>
                        <div className="Details">
                            <span>{vacation.price}$</span>
                            <div className="DetailsHeading">How much?</div>
                        </div>
                        <div className="Details">
                            <span>More...</span>
                            <div className="DetailsHeading">More...</div>
                        </div>                
                    </div>
                </>}            
            </div>
        }
        {!isLogged &&
            <Navigate to={"/auth/login"} />
        }
        </>
    );
}

export default VacationDetails;
