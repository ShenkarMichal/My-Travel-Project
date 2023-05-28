import { useForm } from "react-hook-form";
import "./AddVacation.css";
import VacationModel from "../../../4-Models/VacationModel";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Fragment, useState } from "react";
import { IconClasses } from "@mui/material";
import {ReactComponent as destinationIcon } from '../../../1-Assets/Icons/trending-up.svg'
import { ReactComponent as detailsIcon } from '../../../1-Assets/Icons/clipboard.svg'
import { ReactComponent as cameraIcon }from '../../../1-Assets/Icons/camera.svg'
import { ReactComponent as checkedIcon }from '../../../1-Assets/Icons/check-circle.svg'

interface stepsAndIcons {
    index: number,
    step: string,
    icon: React.ComponentType
}

function AddVacation(): JSX.Element {

    const steps: stepsAndIcons[] = [
        {index: 1,step:'Select destination', icon: destinationIcon },
        {index: 2, step:'Add vacation details',icon: detailsIcon},
        {index: 3, step:'Add image', icon: cameraIcon}
    ];
    const [activeStep, setActiveStep] = useState<number>(0);
    const [skipped, setSkipped] = useState(new Set<number>());
  
    const isStepSkipped = (step: number) => {
      return skipped.has(step);
    };
    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(activeStep);
        }
    
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      };

      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    
      const handleSkip = () => {
    
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
          const newSkipped = new Set(prevSkipped.values());
          newSkipped.add(activeStep);
          return newSkipped;
        });
      };

    const {} = useForm<VacationModel>()

    async function addVacation(vacation: VacationModel){


    }
    return (
        <div className="AddVacation">
  
            <Box sx={{ width: '80%' }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map(s => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: {
                            optional?: React.ReactNode;
                        } = {};

                        if (isStepSkipped(s.index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={s.index} {...stepProps}>
                                <StepLabel {...labelProps} StepIconComponent={activeStep < s.index ? s.icon : checkedIcon}>{s.step}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - The vacation has been successfully added
                        </Typography>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}>
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </Box>
                    </Fragment>
                )}
            </Box>
        
        </div>
    );
}

export default AddVacation;





