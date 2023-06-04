import { ReactElement, useEffect, useState } from "react";
import appConfig from "../../../2-Utils/Config";
import VacationModel from "../../../4-Models/VacationModel";
import "./VacationCard.css";
import vacationService from "../../../5-Service/VacationsService";
import CardButtons from "../../UtilsComponents/CardButtons/CardButtons";
import RoleModel from "../../../4-Models/RoleModel";
import { NavLink } from "react-router-dom";


interface VacationCardProps {
    vacation: VacationModel
    userRole: RoleModel
}

function VacationCard(props: VacationCardProps): JSX.Element {
    const [imageURl, setImageURL] = useState("")

    useEffect(()=>{
        vacationService.getVacationImageUrl(props.vacation.vacationID)
            .then(url => setImageURL(url))
            .catch(err => console.log(err))
    },[props.vacation])

    async function deleteVacation(vacationID:number):Promise<void> {
        try {
            vacationService.deleteVacation(vacationID)    
            console.log("The vacation ahs been successfully deleted")

        }
        catch (err: any) {
            console.log(err)            
        }        
    }

    return (
        <>
            <CardButtons userRole={props.userRole} vacation={props.vacation} deleteVacation={()=>deleteVacation(props.vacation?.vacationID)} />
            <NavLink to={`/vacations/${props.vacation?.vacationID}`}>
                <div className="VacationCard" style={{backgroundImage: `url(${imageURl})`}} >
                    <h6>{props.vacation.destination}</h6>
                    <span>Start: {props.vacation.startDate} <br /> End: {props.vacation.endDate}</span>
                </div>
            </NavLink>
        </>
    );
}

export default VacationCard;
