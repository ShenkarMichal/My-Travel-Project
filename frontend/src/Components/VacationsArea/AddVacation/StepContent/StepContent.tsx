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
import SelectContinent from "../../../UtilsComponents/SelectContinent/SelectContinent";


interface StepContentProp {
    stepIndex: number
}

function StepContent(prop: StepContentProp): JSX.Element {

    const {register, handleSubmit, formState, setValue} = useForm<VacationModel>()

    function getSelectValue(value: number) {
        setValue("continentID", value)
    }

    const stepContent = [
        <div className="stepContent">
            <h4>Set Destination:</h4>
            <CssTextField label={"Destination"} type={"text"} {...register("destination")} />
            <SelectContinent onSelect={getSelectValue} helperText={"Select the continent of the vacation"} />
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
