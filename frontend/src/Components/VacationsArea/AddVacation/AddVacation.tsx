import "./AddVacation.css";
import VacationModel from "../../../4-Models/VacationModel";
import {ReactComponent as destinationIcon } from '../../../1-Assets/Icons/trending-up.svg'
import { ReactComponent as detailsIcon } from '../../../1-Assets/Icons/clipboard.svg'
import { ReactComponent as cameraIcon }from '../../../1-Assets/Icons/camera.svg'
import { ReactComponent as checkedIcon }from '../../../1-Assets/Icons/check-circle.svg'
import { useEffect, useState } from "react";
import { NewVacationActionType, newVacationStore } from "../../../3-Redux/newVacationState";
import vacationService from "../../../5-Service/VacationsService";
import { Navigate, useNavigate } from "react-router-dom";
import StepperComponent, { StepModel } from "../../UtilsComponents/StepperComponent/StepperComponent";
import StepperContent from "../../UtilsComponents/StepperContent/StepperContent";
import verifyLogged from "../../../2-Utils/VerifyLogged";
import notifyService from "../../../5-Service/NotifyService";

function AddVacation(): JSX.Element {

    const navigate = useNavigate()
    
    const isAdmin = verifyLogged.isAdmin()
    const isLogged = verifyLogged.isLogged()


    useEffect(()=>{
        if(isLogged && !isAdmin) notifyService.error("You dont have an admin premmision")

    },[])

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
            notifyService.success("The vacation has been succssefuly added")
            newVacationStore.dispatch({type: NewVacationActionType.ClearVacationState})
            navigate("/vacations")
        }
        catch (err: any) {
            notifyService.error(err)
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
                    heading={"Have a new place to travel?"}
                    handleBack={handleBack}
                    activeStep={activeStep}
                />            
            </div>
        }
        {!isAdmin &&
            <Navigate to={"/vacations"} />
        }
        </>
    );
}

export default AddVacation;





