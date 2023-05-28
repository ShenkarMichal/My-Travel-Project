import { useForm } from "react-hook-form";
import "./AddVacation.css";
import VacationModel from "../../../../4-Models/VacationModel";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Fragment, useEffect, useState } from "react";
import {ReactComponent as destinationIcon } from '../../../../1-Assets/Icons/trending-up.svg'
import { ReactComponent as detailsIcon } from '../../../../1-Assets/Icons/clipboard.svg'
import { ReactComponent as cameraIcon }from '../../../../1-Assets/Icons/camera.svg'
import { ReactComponent as checkedIcon }from '../../../../1-Assets/Icons/check-circle.svg'
import StepContent from "../StepContent/StepContent";

interface stepsAndIcons {
    index: number,
    step: string,
    icon: React.ComponentType
}

function AddVacation(): JSX.Element {

    const {handleSubmit} = useForm<VacationModel>()


    const steps: stepsAndIcons[] = [
        {index: 1,step:'Select destination', icon: destinationIcon },
        {index: 2, step:'Add vacation details',icon: detailsIcon},
        {index: 3, step:'Add image', icon: cameraIcon}
    ];
    const [activeStep, setActiveStep] = useState<number>(0);

    const handleNext = () => {    
        setActiveStep((prevActiveStep) => prevActiveStep + 1);

        if(activeStep === steps.length-1){
            handleSubmit(addVacation)()
        }
      };

      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };   

    async function addVacation(vacation: VacationModel){
        alert("send")
        console.log(vacation)

    }
    return (
        <div className="AddVacation">
  
            <Box sx={{ width: '80%' }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map(s => {


                        return (
                            <Step key={s.index}>
                                <StepLabel StepIconComponent={activeStep < s.index ? s.icon : checkedIcon}>{s.step}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                <form onSubmit={()=>addVacation}>

                    {activeStep === steps.length ? (
                        <Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                All steps completed - The vacation has been successfully added
                            </Typography>
                        </Fragment>
                    ) : (
                        <Fragment>

                            <Typography sx={{ mt: 2, mb: 1 }}>
                                        <StepContent stepIndex={activeStep+1} onSubmit={()=>addVacation}/>
                                </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}>
                                    Back
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />                
                                <Button onClick={handleNext} >
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </Box>
                        </Fragment>
                    )}
                </form>                            

            </Box>
        
        </div>
    );
}

export default AddVacation;





