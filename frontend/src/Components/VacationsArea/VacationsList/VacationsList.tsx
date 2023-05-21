import { useEffect, useState } from "react";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationsList.css";
import VacationModel from "../../../4-Models/VacationModel";

function VacationsList(): JSX.Element {
    const [vacations, setVacations] = useState<VacationModel[]>([])

    useEffect(()=>{
        vacat
    },[])
    return (
        <div className="VacationsList">
            <h1>
                <span>360 DEG </span> <span> <br/> AROUND THE</span>
                <br /> WORLD
            </h1>
            <div className="AllVacations">
                <VacationCard />
            </div>
        </div>
    );
}

export default VacationsList;
