import { useForm } from "react-hook-form";
import CssTextField from "../../../UtilsComponents/CssTextField/CssTextField";
import SelectContinent from "../../../UtilsComponents/SelectContinent/SelectContinent";
import "./UpdateStepperContent.css";
import VacationModel from "../../../../4-Models/VacationModel";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import vacationService from "../../../../5-Service/VacationsService";

interface UpdateStepperContentProp {
    stepIndex: number
    onSubmit: (data: VacationModel) => void
    onClick: (data: VacationModel)=>void
}

function UpdateStepperContent(prop: UpdateStepperContentProp): JSX.Element {

    const [vacation, setVacation] = useState<VacationModel>()

    const vacationID = +useParams().vacationID

    useEffect(()=>{
        vacationService.getOneVacation(vacationID)
            .then(v => setVacation(v))
            .catch(err => alert(err.response?.data))
    },[])
    const {register, handleSubmit, formState, setValue} = useForm<VacationModel>()

    function getSelectValue(value: number) {

        setValue("continentID" ,value) 
                
    }

    const stepContent = [
        <div className="stepContent" datatype={"destination&continentID"}>
            <CssTextField label={"Destination"} type={"text"} fieldName="destination" 
                            register={register("destination")} defaultValue={vacation?.destination}/>
            <SelectContinent onSelect={getSelectValue} helperText={"Select the continent of the vacation"}/>

        </div>,
        <div className="stepContent" key={1}>
            <CssTextField label={"Description"} type={"text"} fieldName="description"  
                            register={register("description")} defaultValue={vacation?.description}/> <br />

            <CssTextField label={"From"} type={"date"} fieldName="startDate" 
                            register={register("startDate")} defaultValue={vacation?.startDate} /> <br />

            <CssTextField label={"To"} type={"date"} fieldName="endDate" 
                            register={register("endDate")} defaultValue={vacation?.endDate} /> <br />

            <CssTextField label="Price" type="number" inputProp={{endAdornment: "$"}} fieldName="price" 
                            register={register("price")} defaultValue={vacation?.price} /> <br />

        </div>,
        <div className="stepContent" key={2}>
            <CssTextField label="Image" type="file" inputProp={{accept: "image/*"}} fieldName="image" register={register("image")}/> <br />
        </div>
    ]
    return (
        <div className="UpdateStepperContent">
            <form onSubmit={handleSubmit(prop.onSubmit)}>
            {stepContent[prop.stepIndex]} 
            {prop.stepIndex === stepContent.length-1 ? 
              <Button onClick={handleSubmit(prop.onClick)} color="inherit">Finish</Button> :
              <Button type="submit" color="inherit">Next</Button>
            }
          </form>
			
        </div>
    );
}

export default UpdateStepperContent;
