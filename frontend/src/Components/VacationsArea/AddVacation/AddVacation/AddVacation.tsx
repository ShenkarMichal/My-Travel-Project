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


interface stepsAndIcons {
    index: number,
    step: string,
    icon: React.ComponentType
}

function AddVacation(): JSX.Element {


    //Set steps
    const steps: stepsAndIcons[] = [
        {index: 1,step:'Set destination', icon: destinationIcon },
        {index: 2, step:'Add vacation details',icon: detailsIcon},
        {index: 3, step:'Add image', icon: cameraIcon}
    ];

    //Set the active step
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
            <Box sx={{ maxWidth: 400 }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                    <Step key={index}>
                        <StepLabel
                            //Set the last-step heading in the step of index #2
                            optional={
                                index === 2 ? (
                                <Typography variant="caption">Last step</Typography>
                                ) : null 
                            }>
                            {step.step}
                        </StepLabel>
                        <StepContent>
                            
                            <Typography>{step.step}<StepContentComponent stepIndex={index} onSubmit={addVacation} onClick={handleNext} /></Typography>
                            <Box sx={{ mb: 2 }}>
                                <div>

                                <Button
                                    disabled={index === 0}
                                    onClick={handleBack}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    Back
                                </Button>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                    ))}

                </Stepper>
                {activeStep === steps.length && (
                    <Paper square elevation={0} sx={{ p: 3 }}>
                        <Typography>All steps completed - The vacation has been successfully added</Typography>
                    </Paper>
                )}
            </Box>

            
        </div>
    );
}

export default AddVacation;




