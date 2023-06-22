import { useForm } from "react-hook-form";
import CssTextField from "../CssTextField/CssTextField";
import SelectContinent from "../SelectContinent/SelectContinent";
import "./StepperContent.css";
import VacationModel from "../../../4-Models/VacationModel";
import { Button } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import vacationService from "../../../5-Service/VacationsService";
import notifyService from "../../../5-Service/NotifyService";

interface StepperContentProp {
    stepIndex: number
    onSubmit: (data: VacationModel) => void
    onClick: (data: VacationModel)=>void
    vacation?: VacationModel
    imageErrorMsg?: string  
}

function StepperContent(prop: StepperContentProp): JSX.Element {

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

    const [imageURl, setImageURL] = useState("")

    useEffect(()=>{
        vacationService.getVacationImageUrl(prop.vacation?.vacationID)
            .then(url => setImageURL(url))
            .catch(err => console.log(err))
    },[prop.vacation])

    return (
        <div className="UpdateStepperContent">
            <form onSubmit={handleSubmit(prop.onSubmit)} >
                {prop.stepIndex === 0 &&
                    <div className="stepContent">
                        <CssTextField label={"Destination"} type={"text"} fieldName="destination" 
                            register={register("destination", VacationModel.destinationValidate)} defaultValue={prop.vacation?.destination}/>
                        <span className="ErrorMsg">{formState.errors.destination?.message}</span><br/>

                        <SelectContinent onSelect={getSelectValue} helperText={"Select the continent of the vacation"} 
                            defaultValue={prop.vacation?.continentID} required={true}/>
                    </div>
                }
                {prop.stepIndex === 1 &&
                    <div className="stepContent">
                        <CssTextField label={"Description"} type={"text"} fieldName="description" id="outlined-multiline-static" Multiline= {4}
                            register={register("description", VacationModel.descriptionValidate)} defaultValue={prop.vacation?.description}/>
                        <span className="ErrorMsg">{formState.errors.description?.message}</span>

                    {/* Change the date validatoin in add/update component: */}
                        {prop.vacation && <>
                        <CssTextField label={"From"} type={"date"} fieldName="startDate" 
                            register={register("startDate", {required:{value: true, message: "Date is missing"}})} defaultValue={prop.vacation?.startDate} /> <br />
                        <span className="ErrorMsg">{formState.errors.startDate?.message}</span>
                        </>}

                        {!prop.vacation && <>
                            <CssTextField label={"From"} type={"date"} fieldName="startDate" 
                            register={register("startDate", VacationModel.startDateValidate)} /> <br />
                        <span className="ErrorMsg">{formState.errors.startDate?.message}</span>
                        </>}

                        <CssTextField label={"To"} type={"date"} fieldName="endDate" 
                            register={register("endDate", VacationModel.endDateValidate)} defaultValue={prop.vacation?.endDate} /> <br />
                        <span className="ErrorMsg">{formState.errors.endDate?.message}</span>

                        <CssTextField label="Price" type="number" inputProp={{endAdornment: "$"}} fieldName="price" 
                            register={register("price", VacationModel.priceValidate)} defaultValue={prop.vacation?.price} /> <br />
                        <span className="ErrorMsg">{formState.errors.price?.message}</span>                       
                    </div>
                }
                {prop.stepIndex === 2 &&
                    <div className="stepContent" >
                        <label htmlFor="input-file" className="inputFileLabel">{fileName || "Select File"}</label>
                        <CssTextField id="input-file" label="Image" type="file" inputProp={{accept: "image/*"}} 
                                    fieldName="image" onChange={handleChangeFile}/> <br />
                        {fileUpLoad ? <img src={fileUpLoad} width={150}/> :
                                <img src={imageURl} />
                        }<br/>
                        {prop.imageErrorMsg && 
                            <span className="ErrorMsg">Image is required</span>    
                        }
                    </div>
                }
            {prop.stepIndex === 2 ? 
              <Button onClick={handleSubmit(prop.onClick)} color="inherit">Finish</Button> :
              <Button type="submit" color="inherit">Next</Button>
            }
          </form>
			
        </div>
    );
}

export default StepperContent;
