import { useNavigate, useParams } from "react-router-dom";
import StepperComponent, { StepModel } from "../../UtilsComponents/StepperComponent/StepperComponent";
import "./UpdateVacation.css";
import { useEffect, useState } from "react";
import {ReactComponent as destinationIcon } from '../../../1-Assets/Icons/trending-up.svg'
import { ReactComponent as detailsIcon } from '../../../1-Assets/Icons/clipboard.svg'
import { ReactComponent as cameraIcon }from '../../../1-Assets/Icons/camera.svg'
import { ReactComponent as checkedIcon }from '../../../1-Assets/Icons/check-circle.svg'
import VacationModel from "../../../4-Models/VacationModel";
import { NewVacationActionType, newVacationStore } from "../../../3-Redux/newVacationState";
import vacationService from "../../../5-Service/VacationsService";
import { format, isValid, parse } from 'date-fns'
import StepperContent from "../../UtilsComponents/StepperContent/StepperContent";
import verifyLogged from "../../../2-Utils/VerifyLogged";
import useBlokcedPage from "../../../2-Utils/UseBlockedPage";


function UpdateVacation(): JSX.Element {

    const isAdmin = verifyLogged.isAdmin()

    const [vacation, setVacation] = useState<VacationModel>()
    const vacationID = +useParams().vacationID

    useEffect(() => {
        vacationService.getOneVacation(vacationID)
          .then(v => {
            const parsedStartDate = parse(v.startDate, 'dd/MM/yyyy', new Date());
            const parsedEndDate = parse(v.endDate, 'dd/MM/yyyy', new Date());
      
            //Save the dates in a valid format for the date-inputs
            if (isValid(parsedStartDate) && isValid(parsedEndDate)) {
              const formattedStartDate = format(parsedStartDate, 'yyyy-MM-dd');
              const formattedEndDate = format(parsedEndDate, 'yyyy-MM-dd');
              const updatedVacation = { ...v, startDate: formattedStartDate, endDate: formattedEndDate };
      
              setVacation(updatedVacation);
            } else {
              console.log('Invalid date format');
            }
          })
          .catch(err => console.log(err));
      }, []);
    
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
    async function updateVacation(updateVacation: VacationModel){
        saveCurrentForm(updateVacation)
        let newVacation = newVacationStore.getState().vacation            
        newVacation = {...newVacation, vacationID:vacationID}
        //Save the current continentID if it is not change:
        if(!newVacation.continentID){
            newVacation = {...newVacation, continentID:vacation.continentID}
        }
        try {
            await vacationService.updateVacation(newVacation)
            alert("The vacation has been succssefuly update")
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
            <div className="UpdateVacation">
                {vacation &&
                <StepperComponent 
                    steps={steps} 
                    stepContent={<StepperContent stepIndex={activeStep} onSubmit={saveCurrentForm} onClick={updateVacation} vacation={vacation} />} 
                    endMsg={"All steps completed - The vacation has been successfully update"} 
                    heading={"Have a new place to travel?"}
                    handleBack={handleBack}
                    activeStep={activeStep}
                />}  
            </div>
        }
        {!isAdmin &&
            useBlokcedPage.NotAdminBlock()
        }
        </>
    
    );
}

export default UpdateVacation;
