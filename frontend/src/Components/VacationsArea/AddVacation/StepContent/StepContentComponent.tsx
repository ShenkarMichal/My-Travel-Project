import "./StepContentComponent.css";
import { useForm } from "react-hook-form";
import VacationModel from "../../../../4-Models/VacationModel";
import CssTextField from "../../../UtilsComponents/CssTextField/CssTextField";
import SelectContinent from "../../../UtilsComponents/SelectContinent/SelectContinent";
import { Button } from "@mui/material";


interface StepContentProp {
    stepIndex: number
    onSubmit: (data: VacationModel) => void
    onClick: ()=>void
}

function StepContentComponent(prop: StepContentProp): JSX.Element {

    const {register, handleSubmit, formState, setValue} = useForm<VacationModel>()

    function getSelectValue(value: number) {

        setValue("continentID" ,value) 
                
    }

    const stepContent = [
        <div className="stepContent">
            <CssTextField label={"Destination"} type={"text"} fieldName="destination" register={register("destination")} />
            <SelectContinent onSelect={getSelectValue} helperText={"Select the continent of the vacation"}/>
        </div>,
        <div className="stepContent">
            <CssTextField label={"Description"} type={"text"} fieldName="description" /> <br />
            <CssTextField label={"From"} type={"date"} fieldName="startDate" /> <br />
            <CssTextField label={"To"} type={"date"} fieldName="endDate" /> <br />
            <CssTextField label="Price" type="number" inputProp={{endAdornment: "$"}} fieldName="price" register={register("price")} /> <br />

        </div>,
        <div className="stepContent">
            <CssTextField label="Image" type="file" inputProp={{accept: "image/*"}} fieldName="image" register={register("image")}/> <br />
        </div>
    ]

    return (
        <div className="StepContent">
          <form onSubmit={handleSubmit(prop.onSubmit)}>
            {stepContent[prop.stepIndex]} 
             
            <Button type="submit" onClick={prop.onClick}>
                {prop.stepIndex === stepContent.length-1 ? 'Finish' : 'Next'}
            </Button> 
            
          </form>
        </div>
    );
}

export default StepContentComponent;
