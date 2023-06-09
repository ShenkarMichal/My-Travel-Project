import { Navigate, useParams } from "react-router-dom";
import "./UserVacations.css";
import { ChangeEvent, useEffect, useState } from "react";
import VacationModel from "../../../4-Models/VacationModel";
import vacationService from "../../../5-Service/VacationsService";
import VacationCard from "../VacationCard/VacationCard";
import { Pagination } from "@mui/material";
import notifyService from "../../../5-Service/NotifyService";
import verifyLogged from "../../../2-Utils/VerifyLogged";

function UserVacations(): JSX.Element {
    const isLogged = verifyLogged.isLogged()

    const userID = +useParams().userID
    const [vacations, setVacations] = useState<VacationModel[]>([])

    //Set Pagination:
    const [pageNumber, setPageNumber] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1)
    
    const vacationPerPage = 3

    useEffect(()=>{
        if(!isLogged) notifyService.error("You are not logged in")    

        vacationService.getVacationsByUser(userID)
            .then(v => setVacations(v))
            .catch(err => notifyService.error(err))
        //Set pagination:
        setPageNumber(Math.ceil(vacations.length/vacationPerPage)) 
    },[vacations.length])



    function HandleChangePage(event:ChangeEvent<unknown>, newPage: number) {

        setCurrentPage(newPage)
    }

    async function reloadUserVacations(): Promise<void> {
        try {
            const vacations = await vacationService.getVacationsByUser(userID)
            setVacations(vacations)
        }
        catch (err: any) {
            console.log(err)            
        }
        
    }
    
    return (
        <>
        {isLogged &&
        <div className="UserVacations">
            <div className="Background"></div>
            <div className="Content">
                <div className="AllData">
                    <div className="Heading">
                        <h3>Your Favorite<br/> Vacations</h3>
                    </div>
                    <div className="Vacations">
                        {vacations && vacations.slice((currentPage-1)* vacationPerPage, currentPage * vacationPerPage).
                                map(v => 
                                    <div className="card" key={v.vacationID}>
                                        <span>{v.duration} days in {v.destination}</span><br/>
                                        <VacationCard key={v.vacationID} vacation={v} favorite = {true} reloadVacations={reloadUserVacations}/>
                                        <span>Just {v.price}$</span>
                                    </div>)}                               
                    </div>
                </div>
                {pageNumber > 1 &&
                    <Pagination className="Pagination" count={pageNumber} page={currentPage} onChange={HandleChangePage} color="primary"/>
                } 
            </div>
        </div>
    }
    {!isLogged &&
        <Navigate to={"/auth/login"} />
    }
    </>
    );
}

export default UserVacations;
