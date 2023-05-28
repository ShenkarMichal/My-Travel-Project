import "./StepContent.css";
import { useForm } from "react-hook-form";
import VacationModel from "../../../../4-Models/VacationModel";
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import {InputLabel, Select, TextField, styled } from "@mui/material";
import { useEffect, useState } from "react";
import vacationService from "../../../../5-Service/VacationsService";
import ContinentModel from "../../../../4-Models/ContinentModel";
import InputAdornment from '@mui/material/InputAdornment';


interface StepContentProp {
    stepIndex: number,
    onSubmit: (data:VacationModel) => void,
}

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: '#A0AAB4',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#E0E3E7',
      },
      '&:hover fieldset': {
        borderColor: '#B2BAC2',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#6F7E8C',
      },
    },
  });

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
            <CssTextField id="standard-basic" label="Destination" variant="standard" {...register("destination")}/> <br />
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
            <CssTextField id="standard-basic" label="Description" variant="standard" {...register("description")}/> <br />
            <CssTextField id="standard-basic" label="From" variant="standard" type="date" {...register("startDate")}/> <br />
            <CssTextField id="standard-basic" label="To" variant="standard" type="date" {...register("endDate")}/> <br />
            <CssTextField id="standard-basic" label="price" variant="standard" type="number"    
                        InputProps={{
                            endAdornment: <InputAdornment position="end">$</InputAdornment>,
                            }}
                        {...register("price")}/> <br />
        </div>,
        <div>
            <h4>Add Image:</h4>
            <CssTextField id="standard-basic" 
                        label="Image" variant="standard" type="file" 
                        inputProps={{accept: "image/jpg, image/png"}} {...register("image")}/> <br />
        </div>
    ]


    async function addVacation(vacation:VacationModel) {
        prop.onSubmit(vacation)
        alert("hi")        
    }
    return (
        <div className="StepContent">
                {stepContent[prop.stepIndex-1]}  
        </div>
    );
}

export default StepContent;
