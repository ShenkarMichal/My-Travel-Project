import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import "./SelectContinent.css";
import ContinentModel from "../../../4-Models/ContinentModel";
import { useEffect, useState } from "react";
import vacationService from "../../../5-Service/VacationsService";
import notifyService from "../../../5-Service/NotifyService";

interface SelectContinentProp {
    onSelect: (data: any) => void
    helperText: string
    defaultValue?:number
    required?: boolean
}

function SelectContinent(prop: SelectContinentProp): JSX.Element {

    const [continents, setContinents] = useState<ContinentModel[]>([])
    
    //Get all continents:
    useEffect(()=>{
        vacationService.getAllContinents()
            .then(c => setContinents(c))
            .catch(err => notifyService.error(err))
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
                    required={prop.required || false}
                    defaultValue={prop.defaultValue}
                    onChange={getSelectValue}>
                        <MenuItem value="0">
                            <em>None</em>
                        </MenuItem>
                        {continents && continents.map(c =>
                        <MenuItem value={c.continentID} key={c.continentID} defaultChecked = {c.continentID === prop.defaultValue ? true : false}>{c.continentName}</MenuItem>)}
                </Select>
                <FormHelperText>{prop.helperText}</FormHelperText>
            </FormControl>
        </div>
    );
}

export default SelectContinent;
