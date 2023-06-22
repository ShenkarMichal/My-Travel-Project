import { ChangeEvent, useEffect, useState } from "react";
import VacationModel from "../../../4-Models/VacationModel";
import "./ContinentArea.css";
import vacationService from "../../../5-Service/VacationsService";
import Earth from "../../../1-Assets/Images/BackGrounds/Earth.jpg"
import VacationCard from "../VacationCard/VacationCard";
import Pagination from '@mui/material/Pagination';
import ContinentsSentences, { ContinentsSentencesModel } from "../../../2-Utils/ContinentsSentences";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import SelectContinent from "../../UtilsComponents/SelectContinent/SelectContinent";
import verifyLogged from "../../../2-Utils/VerifyLogged";
import { authStore } from "../../../3-Redux/AuthState";
import { vacationsStore } from "../../../3-Redux/VacationsState";
import notifyService from "../../../5-Service/NotifyService";


function ContinentArea(): JSX.Element {

    const isLogged = verifyLogged.isLogged()
    
    const user = authStore.getState().user

    const [vacations, setVacations] = useState<VacationModel[]>([])

    useEffect(()=>{    
        if(!isLogged) notifyService.error("You are not logged in")    

        const unSubscribe = vacationsStore.subscribe(()=>{
                vacationService.getVacationsByContinent(vacations[0]?.continentID, user?.userID)
                    .then(v => {
                        setVacations(v)
                        //Set pagination:
                        setPageNumber(Math.ceil(v.length/vacationPerPage))

                    })
                    .catch(err => notifyService.error(err))

        })

        return ()=> unSubscribe()
    },[vacations])



    //Set Pagination:
    const [pageNumber, setPageNumber] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1)

    const vacationPerPage = 3

    const [continentImageURL, setContinentImageURL] = useState("")

    const [continentName, setContinentName] = useState<string>("")
    const [continentSentence, setContinentSentence] = useState<ContinentsSentencesModel>()

    async function getVacations(continentID:number) {        
        try{
            //If none continent selected
            if(continentID === 0){
                setVacations([])
                setContinentName("")
                setPageNumber(0)
                setContinentSentence(null)
                setContinentImageURL("")
            }
            else {
                //Get vacations by continent:
                const vacationsByContinent = await vacationService.getVacationsByContinent( continentID, user.userID)
                if(vacationsByContinent.length === 0){
                    notifyService.error("We dont have any vacation in that continent")
                    return
                }
                setVacations(vacationsByContinent)
                //Get continent-name:
                setContinentName(vacationsByContinent[0]?.continentName)
                //Get continent sentences:
                setContinentSentence(ContinentsSentences.getSentence(vacationsByContinent[0]?.continentName))
                //Get continent image-url:
                const continentImageURL = await vacationService.getContinentImageUrl(vacationsByContinent[0]?.continentName)
                setContinentImageURL(continentImageURL)
                //Set pagination:
                setPageNumber(Math.ceil(vacationsByContinent.length/vacationPerPage))
            }
        }
        catch(err:any) {
            notifyService.error(err)
        }        
    }

    function HandleChangePage(event:ChangeEvent<unknown>, newPage: number) {

        setCurrentPage(newPage)
    }

    return (
        <>
        {isLogged &&
            <div className="ContinentArea">
                <div className="background" 
                    style={{backgroundImage:`url(${continentImageURL}), url(${Earth})`}}></div>
                <div className="content" style={{backgroundImage:`url(${continentImageURL}), url(${Earth})`}}>
                    <SelectContinent onSelect={getVacations} helperText={"Select the continent you want to travel to"}/>

                    <div className="AllData">
                        <div className="Heading">
                            <h3>{continentName}</h3>
                            <span>{continentSentence?.sentence}</span><br/>
                            <p>{continentSentence?.src}</p>
                        </div>
                        <div className="Vacations">
                            {vacations && vacations.slice((currentPage-1)* vacationPerPage, currentPage * vacationPerPage).
                                                    map(v => 
                                                        <div className="card" key={v.vacationID}>
                                                            <span>{v.duration} days in {v.destination}</span><br/>
                                                            <VacationCard key={v.vacationID} vacation={v} />
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

export default ContinentArea;
