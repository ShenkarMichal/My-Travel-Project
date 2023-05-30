import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import "./SelectContinent.css";
import ContinentModel from "../../../4-Models/ContinentModel";
import { useEffect, useState } from "react";
import vacationService from "../../../5-Service/VacationsService";

interface SelectContinentProp {
    onSelect: (data: any) => void
    helperText: string
}

function SelectContinent(prop: SelectContinentProp): JSX.Element {

    const [continents, setContinents] = useState<ContinentModel[]>([])
    
    //Get all continents:
    useEffect(()=>{
        vacationService.getAllContinents()
            .then(c => setContinents(c))
            .catch(err => console.log(err))
    },[])

    function getSelectValue(event: SelectChangeEvent<unknown>) {
        const value = +event.target.value
        prop.onSelect(value)
    }
    
    return (
        <div className="SelectContinent">
			<FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Continent</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Continent"
                    className="Select"
                    variant="outlined"
                    onChange={getSelectValue}>
                        <MenuItem value="0">
                            <em>None</em>
                        </MenuItem>
                        {continents && continents.map(c => <MenuItem value={c.continentID} key={c.continentID}>{c.continentName}</MenuItem>)}
                </Select>
                <FormHelperText>{prop.helperText}</FormHelperText>
            </FormControl>
        </div>
    );
}

export default SelectContinent;
