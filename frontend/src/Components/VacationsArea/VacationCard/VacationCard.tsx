import { useEffect, useState } from "react";
import VacationModel from "../../../4-Models/VacationModel";
import "./VacationCard.css";
import vacationService from "../../../5-Service/VacationsService";
import CardButtons from "../../UtilsComponents/CardButtons/CardButtons";
import { NavLink, useNavigate } from "react-router-dom";
import UserModel from "../../../4-Models/UserModel";


interface VacationCardProps {
    vacation: VacationModel
    user: UserModel
}

function VacationCard(props: VacationCardProps): JSX.Element {
    const [imageURl, setImageURL] = useState("")

    useEffect(()=>{
        vacationService.getVacationImageUrl(props.vacation.vacationID)
            .then(url => setImageURL(url))
            .catch(err => console.log(err))
    },[props.vacation])

    const navigate = useNavigate()

    async function deleteVacation(vacationID:number):Promise<void> {
        try {
            await vacationService.deleteVacation(vacationID)    
            console.log("The vacation ahs been successfully deleted")
            navigate("/vacations")        
        }
        catch (err: any) {
            console.log(err)            
        }        
    }

    return (
        <div className="VacationCard" style={{backgroundImage: `url(${imageURl})`}} >
            <CardButtons user={props.user} vacation={props.vacation} deleteVacation={()=>deleteVacation(props.vacation?.vacationID)}  />
            <NavLink to={`/vacations/${props.vacation?.vacationID}`}>
                    <h6>{props.vacation.destination}</h6>
                    <span>Start: {props.vacation.startDate}</span> <br/>
                    <span> End: {props.vacation.endDate}</span>             
            </NavLink>
        </div>
    );
}

export default VacationCard;
