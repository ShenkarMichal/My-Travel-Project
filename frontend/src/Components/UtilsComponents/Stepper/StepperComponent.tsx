import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import "./StepperComponent.css";
import { useState } from 'react';

export class StepModel {
    public index: number
    public label: string
    public icon: React.ComponentType
}
interface StepperProps {
    steps: StepModel[]
    stepContent: any
    endMsg: string
    heading: string
    activeStep: number
    handleBack: () => void
}
function StepperComponent(props: StepperProps): JSX.Element {

    return (
        <div className="Stepper">
			<h3>{props.heading}</h3><hr/>
                <Box sx={{ maxWidth: 400 }}>
                    <Stepper activeStep={props.activeStep} orientation="vertical">
                        {props.steps.map((step, index) => (
                        <Step key={index}>
                            <StepLabel
                                StepIconComponent = {step.icon}
                                //Set the last-step heading in the step of index #2
                                optional={
                                    index === 2 ? (
                                    <Typography variant="caption">Last step</Typography>
                                    ) : null 
                                }>
                                {step.label}
                            </StepLabel>
                            <StepContent>                                
                                <div>{props.stepContent} </div>
                                <Box sx={{ mb: 2 }}>
                                    <div>
                                        <Button
                                            disabled={index === 0}
                                            onClick={props.handleBack}
                                            sx={{ mt: 1, mr: 1 }}
                                            color="inherit">
                                            Back
                                        </Button>
                                    </div>
                                </Box>
                            </StepContent>
                        </Step>
                        ))}
                    </Stepper>
                    {props.activeStep === props.steps.length && (
                        <Paper className='Paper' square elevation={0} sx={{ p: 3 }}>
                            <Typography>{props.endMsg}</Typography>
                        </Paper>
                    )}
                </Box>
        </div>
    );
}

export default StepperComponent;
