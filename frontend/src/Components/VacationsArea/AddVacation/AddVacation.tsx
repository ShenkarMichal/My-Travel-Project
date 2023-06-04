import "./AddVacation.css";
import VacationModel from "../../../4-Models/VacationModel";
import {ReactComponent as destinationIcon } from '../../../1-Assets/Icons/trending-up.svg'
import { ReactComponent as detailsIcon } from '../../../1-Assets/Icons/clipboard.svg'
import { ReactComponent as cameraIcon }from '../../../1-Assets/Icons/camera.svg'
import { ReactComponent as checkedIcon }from '../../../1-Assets/Icons/check-circle.svg'
import { useState } from "react";
import { NewVacationActionType, newVacationStore } from "../../../3-Redux/newVacationState";
import vacationService from "../../../5-Service/VacationsService";
import { useNavigate } from "react-router-dom";
import StepperComponent, { StepModel } from "../../UtilsComponents/StepperComponent/StepperComponent";
import StepperContent from "../../UtilsComponents/StepperContent/StepperContent";
import useBlokcedPage from "../../../2-Utils/UseBlockedPage";
import verifyLogged from "../../../2-Utils/VerifyLogged";

function AddVacation(): JSX.Element {

    const isAdmin = verifyLogged.isAdmin()

    const navigate = useNavigate()

    //Set the active step
    const [activeStep, setActiveStep] = useState(0);
    
    //Set steps
    const steps: StepModel[] = [
        {index: 1,label:'Set destination', icon: activeStep > 0 ? checkedIcon : destinationIcon },
        {index: 2, label:'Add vacation details',icon: activeStep > 1 ? checkedIcon : detailsIcon},
        {index: 3, label:'Add image', icon: activeStep > 2 ? checkedIcon : cameraIcon}
    ];

    const [error, setError] = useState("")
    //Function on Finish-Handler
    async function saveNewVacation(vacation: VacationModel){
        try {
            saveCurrentForm(vacation)
            const newVacation = newVacationStore.getState().vacation
            console.log(vacation)
            if(!vacation.image){
                setError("Image is required")
                setActiveStep(2)
                return false
            }
            setError("")
            await vacationService.addNewVacation(newVacation)
            alert("The vacation has been succssefuly added")
            newVacationStore.dispatch({type: NewVacationActionType.ClearVacationState})
            navigate("/vacations")
        }
        catch (err: any) {
            alert(err)            
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
        <>
        {isAdmin &&
            <div className="AddVacation"> 
                <StepperComponent 
                    steps={steps} 
                    stepContent={<StepperContent stepIndex={activeStep} onSubmit={saveCurrentForm} onClick={saveNewVacation} imageErrorMsg={error || ""} />} 
                    endMsg={"All steps completed - The vacation has been successfully added"} 
                    heading={"Have a new place to travel?"}
                    handleBack={handleBack}
                    activeStep={activeStep}
                />            
            </div>
        }
        {!isAdmin &&
            useBlokcedPage.NotAdminBlock()
        }
        </>
    );
}

export default AddVacation;





