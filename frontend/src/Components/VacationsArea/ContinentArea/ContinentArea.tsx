import { useEffect, useState } from "react";
import VacationModel from "../../../4-Models/VacationModel";
import "./ContinentArea.css";
import vacationService from "../../../5-Service/VacationsService";
import ContinentModel from "../../../4-Models/ContinentModel";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function ContinentArea(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([])

    const [continents, setContinents] = useState<ContinentModel[]>([])

    //Get all continents:
    useEffect(()=>{
        vacationService.getAllContinents()
            .then(c => setContinents(c))
            .catch(err => console.log(err))
    },[])

    const [continentName, setContinentName] = useState<string>("")

    async function getVacations(event:SelectChangeEvent) {
        try{
            const continentID = +event.target.value
            //If none continent selected
            if(continentID === 0){
                setVacations([])
                setContinentName("")
            }
            else {
                const vacationsByContinent = await vacationService.getVacationsByContinent(continentID)
                setVacations(vacationsByContinent)
                setContinentName(vacationsByContinent[0].continentName)
            }
        }
        catch(err:any) {
            alert(err.response.data)
        }        
    }

    const path = "../../../1-Assets/Images/BackGrounds/Earth.jpg"
     path

    return (
        <div 
            className="ContinentArea">
			<div 
                className="background" 
                style={{backgroundImage:`url(${image})`}}></div>
                <div className="content" style={{backgroundImage: `url(${path})`}}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label">Continent</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        label="Age"
                        onChange={getVacations}
                        >
                        <MenuItem value="0">
                            <em>None</em>
                        </MenuItem>
                        {continents.map(c => <MenuItem value={c.continentID} key={c.continentID}>{c.continentName}</MenuItem>)}
                    </Select>
                    <FormHelperText>Select the continent you want to travel to</FormHelperText>
            </FormControl>
   
                    <h3>{continentName}</h3>
                    <img src={path} />
			    vacations list
            </div>
        </div>
    );
}

export default ContinentArea;
