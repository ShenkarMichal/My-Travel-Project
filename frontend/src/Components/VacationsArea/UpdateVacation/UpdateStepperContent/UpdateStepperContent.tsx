import { useForm } from "react-hook-form";
import CssTextField from "../../../UtilsComponents/CssTextField/CssTextField";
import SelectContinent from "../../../UtilsComponents/SelectContinent/SelectContinent";
import "./UpdateStepperContent.css";
import VacationModel from "../../../../4-Models/VacationModel";
import { Button } from "@mui/material";
import { useState } from "react";

interface UpdateStepperContentProp {
    stepIndex: number
    onSubmit: (data: VacationModel) => void
    onClick: (data: VacationModel)=>void
    vacation: VacationModel
}

function UpdateStepperContent(prop: UpdateStepperContentProp): JSX.Element {



    const {register, handleSubmit, formState, setValue} = useForm<VacationModel>()

    function getSelectValue(value: number) {


        setValue("continentID" ,value)
                
    }

    const stepContent = [
        <div className="stepContent">
            <CssTextField label={"Destination"} type={"text"} fieldName="destination" 
                            register={register("destination")} defaultValue={prop.vacation?.destination}/>
            <SelectContinent onSelect={getSelectValue} helperText={"Select the continent of the vacation"} defaultValue={prop.vacation?.continentID}/>

        </div>,
        <div className="stepContent">
            <CssTextField label={"Description"} type={"text"} fieldName="description"  
                            register={register("description")} defaultValue={prop.vacation?.description}/> <br />

            <CssTextField label={"From"} type={"date"} fieldName="startDate" 
                            register={register("startDate")} defaultValue={prop.vacation?.startDate} /> <br />

            <CssTextField label={"To"} type={"date"} fieldName="endDate" 
                            register={register("endDate")} defaultValue={prop.vacation?.endDate} /> <br />

            <CssTextField label="Price" type="number" inputProp={{endAdornment: "$"}} fieldName="price" 
                            register={register("price")} defaultValue={prop.vacation?.price} /> <br />

        </div>,
        <div className="stepContent">
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
