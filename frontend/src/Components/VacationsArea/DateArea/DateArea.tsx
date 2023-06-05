import "./DateArea.css";
import Checkbox from '@mui/material/Checkbox';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useState } from "react";
import VacationModel from "../../../4-Models/VacationModel";

function DateArea(): JSX.Element {
    const label = { inputProps: { 'aria-label': 'Checkbox date' } };

    const [current, setCurrent] = useState<boolean>(false)
    const [future, setFuture] = useState<boolean>(false)

    const [vacations, setVacations] = useState<VacationModel[]>([])

    function handleCurrent(event: React.ChangeEvent<HTMLInputElement>) {
        setCurrent(event.target.checked)
        
        if(!current){
            setFuture(false)
            
        }
    }

    function handleFuture(event: React.ChangeEvent<HTMLInputElement>) {
        setFuture(event.target.checked)
        
        if(!future){
            setCurrent(false)
        }
    }
    
    return (
        <>
        <div className="DateArea"></div>
            <div className="DataContent">
                <Checkbox 
                    checked = {future}
                    onChange={handleFuture}
                    title="Future Vacations" 
                    icon={<CalendarMonthOutlinedIcon 
                    sx={{fontSize: 40}}/>} 
                    checkedIcon={<CalendarMonthIcon color="error" sx={{fontSize: 40}}/>} />
                <Checkbox
                    checked = {current}
                    onChange={handleCurrent}
                    title="Current Vacations"
                    icon={<EventAvailableOutlinedIcon sx={{fontSize: 40}} />}
                    checkedIcon={<EventAvailableIcon color="error" sx={{fontSize: 40}} />}                    
                />
            </div>
        </>
    );
}

export default DateArea;
