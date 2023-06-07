import { useParams } from "react-router-dom";
import "./UserVacations.css";
import { useEffect, useState } from "react";
import VacationModel from "../../../4-Models/VacationModel";
import vacationService from "../../../5-Service/VacationsService";

function UserVacations(): JSX.Element {
    const userID = +useParams()
    const [vacations, setVacations] = useState<VacationModel[]>([])

    useEffect(()=>{
        vacationService.getVacationsByUser(userID)
            .then(v => setVacations(v))
            .catch(err => console.log(err))
    },[])
    return (
        <>
        <div className="UserVacations Background"></div>
        <div className="Content">
            <div className="Heading">
                <h3>Your Favorite<br/> Vacations</h3>
            </div>
            <div className="Vacations">
                
            </div>
        </div>
        </>
    );
}

export default UserVacations;
