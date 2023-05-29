import "./StepContent.css";
import { useForm } from "react-hook-form";
import VacationModel from "../../../../4-Models/VacationModel";
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import {InputLabel, Select } from "@mui/material";
import { useEffect, useState } from "react";
import vacationService from "../../../../5-Service/VacationsService";
import ContinentModel from "../../../../4-Models/ContinentModel";
import InputAdornment from '@mui/material/InputAdornment';
import CssTextField from "../../../UtilsComponents/CssTextField/CssTextField";


interface StepContentProp {
    stepIndex: number
}

function StepContent(prop: StepContentProp): JSX.Element {

    const {register, handleSubmit, formState} = useForm<VacationModel>()

    const [continents, setContinents] = useState<ContinentModel[]>([])
    
    //Get all continents:
    useEffect(()=>{
        vacationService.getAllContinents()
            .then(c => setContinents(c))
            .catch(err => console.log(err))
    },[])

    const stepContent = [
        <div className="stepContent">
            <h4>Set Destination:</h4>
            <CssTextField label={"Destination"} type={"text"} {...register("destination")} />
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Continent</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Continent"
                    className="Select"
                    variant="outlined"
                    {...register("continentID")}>
                        <MenuItem value="0">
                            <em>None</em>
                        </MenuItem>
                        {continents.map(c => <MenuItem value={c.continentID} key={c.continentID}>{c.continentName}</MenuItem>)}
                </Select>
                <FormHelperText>Select the continent you want to travel to</FormHelperText>
            </FormControl>
        </div>,
        <div className="stepContent">
            <h4>Set Vacation Details:</h4>
            <CssTextField label={"Description"} type={"text"} {...register("description")}/> <br />
            <CssTextField label={"From"} type={"date"} {...register("startDate")}/> <br />
            <CssTextField label={"To"} type={"date"} {...register("endDate")}/> <br />
            <CssTextField label="Price" type="number" inputProp={{endAdornment: "$"}} {...register("price")}/> <br />
        </div>,
        <div>
            <h4>Add Image:</h4>
            <CssTextField label="Image" type="file" inputProp={{accept: "image/jpg, image/png"}} {...register("image")}/> <br />
        </div>
    ]

    function addVacation(vacation: VacationModel){
        console.log(vacation)
    }

    return (
        <div className="StepContent">
                  {stepContent[prop.stepIndex-1]}  
        </div>
    );
}

export default StepContent;
