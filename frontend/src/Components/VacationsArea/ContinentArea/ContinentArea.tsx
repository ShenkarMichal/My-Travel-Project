import { ChangeEvent, useEffect, useState } from "react";
import VacationModel from "../../../4-Models/VacationModel";
import "./ContinentArea.css";
import vacationService from "../../../5-Service/VacationsService";
import ContinentModel from "../../../4-Models/ContinentModel";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import appConfig from "../../../2-Utils/Config";
import Earth from "../../../1-Assets/Images/BackGrounds/Earth.jpg"
import VacationCard from "../VacationCard/VacationCard";
import Pagination from '@mui/material/Pagination';
import ContinentsSentences, { ContinentsSentencesModel } from "../../../2-Utils/ContinentsSentences";

function ContinentArea(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([])

    const [continents, setContinents] = useState<ContinentModel[]>([])
    //Set Pagination:
    const [pageNumber, setPageNumber] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1)


    const vacationPerPage = 3

    //Get all continents:
    useEffect(()=>{
        vacationService.getAllContinents()
            .then(c => setContinents(c))
            .catch(err => console.log(err))
    },[])

    const [continentName, setContinentName] = useState<string>("")
    const [continentSentence, setContinentSentence] = useState<ContinentsSentencesModel>()

    async function getVacations(event:SelectChangeEvent) {
        try{
            const continentID = +event.target.value
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
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label">Continent</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        label="Continent"
                        className="Select"
                        variant="outlined"
                        onChange={getVacations}
                        >
                        <MenuItem value="0">
                            <em>None</em>
                        </MenuItem>
                        {continents.map(c => <MenuItem value={c.continentID} key={c.continentID}>{c.continentName}</MenuItem>)}
                    </Select>
                    <FormHelperText>Select the continent you want to travel to</FormHelperText>
                </FormControl>
                <div className="AllData">
                    <div className="Heading">
                        <h3>{continentName}</h3>
                        <span>{continentSentence?.sentence}</span><br/>
                        <p>{continentSentence?.src}</p>

                    </div>
                    <div className="Vacations">

                        {vacations && vacations.slice((currentPage-1)* vacationPerPage, currentPage * vacationPerPage).
                                                map(v => 
                                                    <div className="card">
                                                        <span>{v.duration} days in {v.destination}</span><br/>
                                                        <VacationCard key={v.vacationID} vacation={v}/>
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
