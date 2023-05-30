import "./AddVacation.css";
import VacationModel from "../../../../4-Models/VacationModel";
import {ReactComponent as destinationIcon } from '../../../../1-Assets/Icons/trending-up.svg'
import { ReactComponent as detailsIcon } from '../../../../1-Assets/Icons/clipboard.svg'
import { ReactComponent as cameraIcon }from '../../../../1-Assets/Icons/camera.svg'
import { ReactComponent as checkedIcon }from '../../../../1-Assets/Icons/check-circle.svg'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import StepContentComponent from "../StepContent/StepContentComponent";
import { NewVacationActionType, newVacationStore } from "../../../../3-Redux/newVacationState";
import vacationService from "../../../../5-Service/VacationsService";
import { useNavigate } from "react-router-dom";
import StepperComponent, { StepModel } from "../../../UtilsComponents/StepperComponent/StepperComponent";


interface stepsAndIcons {
    index: number,
    step: string,
    icon: React.ComponentType
}

function AddVacation(): JSX.Element {

    const navigate = useNavigate()

    //Set the active step
    const [activeStep, setActiveStep] = useState(0);
    
    //Set steps
    const steps: StepModel[] = [
        {index: 1,label:'Set destination', icon: activeStep > 0 ? checkedIcon : destinationIcon },
        {index: 2, label:'Add vacation details',icon: activeStep > 1 ? checkedIcon : detailsIcon},
        {index: 3, label:'Add image', icon: activeStep > 2 ? checkedIcon : cameraIcon}
    ];

    //Function on Finish-Handler
    async function saveNewVacation(vacation: VacationModel){
        try {
            saveCurrentForm(vacation)
            const newVacation = newVacationStore.getState().vacation
            await vacationService.addNewVacation(newVacation)
            alert("The vacation has been succssefuly added")
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
        <div className="AddVacation"> 
            <StepperComponent 
                steps={steps} 
                stepContent={<StepContentComponent stepIndex={activeStep} onSubmit={saveCurrentForm} onClick={saveNewVacation} />} 
                endMsg={"All steps completed - The vacation has been successfully added"} 
                heading={"Have a new place to travel?"}
                handleBack={handleBack}
                activeStep={activeStep}
            />            
        </div>
    );
}

export default AddVacation;





