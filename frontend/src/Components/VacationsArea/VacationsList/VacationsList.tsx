import { useEffect, useState } from "react";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationsList.css";
import VacationModel from "../../../4-Models/VacationModel";
import vacationService from "../../../5-Service/VacationsService";

function VacationsList(): JSX.Element {
    const [vacations, setVacations] = useState<VacationModel[]>([])

    useEffect(()=>{
        vacationService.getAllVacation()
            .then(v => setVacations(v))
            .catch(err => console.log(err))
    },[])

    return (
        <div className="VacationsList">
            <h1>
                <span>360 DEG </span> <span> <br/> AROUND THE</span>
                <br /> WORLD
            </h1>
            <div className="AllVacations">
                {vacations && vacations.map(v => <VacationCard key={v.vacationID} vacation={v} />)}
            </div>
        </div>
    );
}

export default VacationsList;
