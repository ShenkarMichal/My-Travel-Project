import { useNavigate } from "react-router-dom";
import StepperComponent, { StepModel } from "../../UtilsComponents/StepperComponent/StepperComponent";
import "./UpdateVacation.css";
import { useState } from "react";
import {ReactComponent as destinationIcon } from '../../../1-Assets/Icons/trending-up.svg'
import { ReactComponent as detailsIcon } from '../../../1-Assets/Icons/clipboard.svg'
import { ReactComponent as cameraIcon }from '../../../1-Assets/Icons/camera.svg'
import { ReactComponent as checkedIcon }from '../../../1-Assets/Icons/check-circle.svg'
import VacationModel from "../../../4-Models/VacationModel";
import { NewVacationActionType, newVacationStore } from "../../../3-Redux/newVacationState";
import vacationService from "../../../5-Service/VacationsService";
import UpdateStepperContent from "./UpdateStepperContent/UpdateStepperContent";

function UpdateVacation(): JSX.Element {
    
    const navigate = useNavigate()

    //Set the active step
    const [activeStep, setActiveStep] = useState(0);
    
    //Set steps
    const steps: StepModel[] = [
        {index: 1,label:'Set destination', icon: activeStep > 0 ? checkedIcon : destinationIcon },
        {index: 2, label:'Update vacation details',icon: activeStep > 1 ? checkedIcon : detailsIcon},
        {index: 3, label:'Change image', icon: activeStep > 2 ? checkedIcon : cameraIcon}
    ];

    //Function on Finish-Handler
    async function updateVacation(vacation: VacationModel){
        try {
            saveCurrentForm(vacation)
            const newVacation = newVacationStore.getState().vacation
            await vacationService.updateVacation(newVacation)
            alert("The vacation has been succssefuly update")
            navigate("/vacations")
        }
        catch (err: any) {
            alert(err.response?.data)            
        }
    };

    //Function on Back-Handler
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    //Function on Next-Handler
    function saveCurrentForm(vacation: VacationModel){
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        newVacationStore.dispatch({type: NewVacationActionType.SaveNewVacation, payload: vacation})
    }

    return (
        <div className="UpdateVacation">
			<StepperComponent 
                steps={steps} 
                stepContent={<UpdateStepperContent stepIndex={activeStep} onSubmit={saveCurrentForm} onClick={updateVacation} />} 
                endMsg={"All steps completed - The vacation has been successfully update"} 
                heading={"Have a new place to travel?"}
                handleBack={handleBack}
                activeStep={activeStep}
            />            
        </div>
    );
}

export default UpdateVacation;
