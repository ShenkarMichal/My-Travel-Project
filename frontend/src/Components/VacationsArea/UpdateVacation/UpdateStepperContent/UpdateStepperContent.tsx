import { useForm } from "react-hook-form";
import CssTextField from "../../../UtilsComponents/CssTextField/CssTextField";
import SelectContinent from "../../../UtilsComponents/SelectContinent/SelectContinent";
import "./UpdateStepperContent.css";
import VacationModel from "../../../../4-Models/VacationModel";
import { Button } from "@mui/material";
import { ChangeEvent, useState } from "react";
import appConfig from "../../../../2-Utils/Config";

interface UpdateStepperContentProp {
    stepIndex: number
    onSubmit: (data: VacationModel) => void
    onClick: (data: VacationModel)=>void
    vacation: VacationModel
}

function UpdateStepperContent(prop: UpdateStepperContentProp): JSX.Element {

    const {register, handleSubmit, formState, setValue} = useForm<VacationModel>()

    //Get the value from the select-continent box:
    function getSelectValue(value: number) {
        setValue("continentID" ,value)                
    }

    //Save the upload-file and it's url:
    const [fileUpLoad, setFileUpLoad] = useState<string>()

    //Save the file name for the label of the input:
    const [fileName, setFileName] = useState('')

    function handleChangeFile(event: ChangeEvent<HTMLInputElement>){
        const uploadFile = event.target.files
        setFileUpLoad(URL.createObjectURL(uploadFile[0]))
        console.log(uploadFile)
        setValue("image", uploadFile)
        setFileName(uploadFile[0].name)
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
        <div className="stepContent" >
            <label htmlFor="input-file" className="inputFileLabel">{fileName || "Select File"}</label>
            <CssTextField id="input-file" label="Image" type="file" inputProp={{accept: "image/*"}} 
                        fieldName="image" onChange={handleChangeFile}/> <br />
            {fileUpLoad ? <img src={fileUpLoad} width={150}/> :
                <img src={appConfig.vacationImageURL + prop.vacation.vacationID} width={150} />
            }
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
