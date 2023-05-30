import { ChangeEvent, useEffect, useState } from "react";
import VacationModel from "../../../4-Models/VacationModel";
import "./ContinentArea.css";
import vacationService from "../../../5-Service/VacationsService";
import appConfig from "../../../2-Utils/Config";
import Earth from "../../../1-Assets/Images/BackGrounds/Earth.jpg"
import VacationCard from "../VacationCard/VacationCard";
import Pagination from '@mui/material/Pagination';
import ContinentsSentences, { ContinentsSentencesModel } from "../../../2-Utils/ContinentsSentences";
import { NavLink } from "react-router-dom";
import SelectContinent from "../../UtilsComponents/SelectContinent/SelectContinent";

function ContinentArea(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([])

    //Set Pagination:
    const [pageNumber, setPageNumber] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1)

    const vacationPerPage = 3

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
            }
            else {
                const vacationsByContinent = await vacationService.getVacationsByContinent(continentID)
                setVacations(vacationsByContinent)
                setContinentName(vacationsByContinent[0].continentName)
                setContinentSentence(ContinentsSentences.getSentence(vacationsByContinent[0].continentName))
                //Set pagination:
                setPageNumber(Math.ceil(vacationsByContinent.length/vacationPerPage))
            }
        }
        catch(err:any) {
            alert(err.response.data)
        }        
    }

    function HandleChangePage(event:ChangeEvent<unknown>, newPage: number) {

        setCurrentPage(newPage)
    }

    return (
        <div 
            className="ContinentArea">
			<div 
                className="background" 
                style={{backgroundImage:`url(${appConfig.continentsImageURL + continentName}), url(${Earth})`}}></div>
            <div className="content" style={{backgroundImage:`url(${appConfig.continentsImageURL + continentName}), url(${Earth})`}}>
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
                                                        <NavLink to={`/vacations/${v.vacationID}`}><VacationCard key={v.vacationID} vacation={v}/></NavLink>
                                                        <span>Just {v.price}$</span>
                                                    </div>)}
                    </div>
                </div>
                <Pagination className="Pagination" count={pageNumber} page={currentPage} onChange={HandleChangePage} color="primary"/>

            </div>
        </div>
    );
}

export default ContinentArea;
