import "./StepContentComponent.css";
import { useForm } from "react-hook-form";
import VacationModel from "../../../../4-Models/VacationModel";
import CssTextField from "../../../UtilsComponents/CssTextField/CssTextField";
import SelectContinent from "../../../UtilsComponents/SelectContinent/SelectContinent";
import { Button } from "@mui/material";
import { useRef } from "react";


interface StepContentProp {
    stepIndex: number
    onSubmit: (data: VacationModel) => void
    onClick: (data: VacationModel)=>void
}

function StepContentComponent(prop: StepContentProp): JSX.Element {

    const {register, handleSubmit, formState, setValue, trigger} = useForm<VacationModel>()

    function getSelectValue(value: number) {

        setValue("continentID" ,value) 
                
    }

    const stepContent = [
        <div className="stepContent" datatype={"destination&continentID"}>
            <CssTextField label={"Destination"} type={"text"} fieldName="destination" register={register("destination")} />
            <SelectContinent onSelect={getSelectValue} helperText={"Select the continent of the vacation"}/>

        </div>,
        <div className="stepContent" key={1}>
            <CssTextField label={"Description"} type={"text"} fieldName="description"  register={register("description")} /> <br />

            <CssTextField label={"From"} type={"date"} fieldName="startDate" register={register("startDate")} /> <br />

            <CssTextField label={"To"} type={"date"} fieldName="endDate" register={register("endDate")} /> <br />

            <CssTextField label="Price" type="number" inputProp={{endAdornment: "$"}} fieldName="price" register={register("price")} /> <br />

        </div>,
        <div className="stepContent" key={2}>
            <CssTextField label="Image" type="file" inputProp={{accept: "image/*"}} fieldName="image" register={register("image")}/> <br />
        </div>
    ]


    return (
        <div className="StepContent">
          <form onSubmit={handleSubmit(prop.onSubmit)}>
            {stepContent[prop.stepIndex]} 
            {prop.stepIndex === stepContent.length-1 ? 
              <Button onClick={handleSubmit(prop.onClick)}>Finish</Button> :
              <Button type="submit">Next</Button>
            }
          </form>
        </div>
    );
}

export default StepContentComponent;
