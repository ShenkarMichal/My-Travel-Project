import { useEffect, useState } from "react";
import VacationModel from "../../../4-Models/VacationModel";
import "./ContinentArea.css";
import vacationService from "../../../5-Service/VacationsService";
import { useParams } from "react-router-dom";

function ContinentArea(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([])

    useEffect(()=>{
        vacationService.getVacationsByContinent(continentID)
            .then(v => setVacations(v))
            .catch(err => console.log(err))
    },[])

    const [continentName, setContinentName] = useState<string>("")
    setContinentName(vacations[0]?.continentName)
    return (
        <div 
            className="ContinentArea" 
            style={{backgroundImage: `url("../../../1-Assets/Images/BackGrounds/${continentName}.jpg")` || `url("../../../1-Assets/Images/BackGrounds/Earth.jpg")`}}>
			<div 
                className="background" 
                style={{backgroundImage: `url("../../../1-Assets/Images/BackGrounds/${continentName}.jpg")` || `url("../../../1-Assets/Images/BackGrounds/Earth.jpg")`}}></div>
                <div className="content">
   
                    <h3>{continentName}</h3>
			    vacations list
            </div>
        </div>
    );
}

export default ContinentArea;
