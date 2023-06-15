import "./DateArea.css";
import Checkbox from '@mui/material/Checkbox';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { ChangeEvent, useEffect, useState } from "react";
import VacationModel from "../../../4-Models/VacationModel";
import vacationService from "../../../5-Service/VacationsService";
import VacationCard from "../VacationCard/VacationCard";
import UserModel from "../../../4-Models/UserModel";
import { authStore } from "../../../3-Redux/AuthState";
import { Pagination } from "@mui/material";
import { vacationsStore } from "../../../3-Redux/VacationsState";
import notifyService from "../../../5-Service/NotifyService";

function DateArea(): JSX.Element {

    const user = authStore.getState().user
    
    const [current, setCurrent] = useState<boolean>(false)
    const [future, setFuture] = useState<boolean>(false)
    const [filter, setFilter] = useState<string>("")

    const [vacations, setVacations] = useState<VacationModel[]>([])

    //Set Pagination:
    const [pageNumber, setPageNumber] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const vacationPerPage = 3

    useEffect(()=>{
        const unSubscribe = vacationsStore.subscribe(()=>{
            if(filter === "Future Vacations"){
                vacationService.getFutureVacations(user?.userID)
                    .then(v => {
                        setVacations(v)
                        //Set pagination:
                        setPageNumber(Math.ceil(v.length/vacationPerPage))
                })
                .catch(err => notifyService.error(err))
            }
            else if(filter === "Current Vacations"){                            
                vacationService.getCurrentVacations(user?.userID)
                    .then(v => {
                        setVacations(v)
                        //Set pagination:
                        setPageNumber(Math.ceil(v.length/vacationPerPage))
                    })
                    .catch(err => notifyService.error(err))
            }
        })

    return ()=> unSubscribe()

    },[vacations])
    
    function HandleChangePage(event:ChangeEvent<unknown>, newPage: number) {

        setCurrentPage(newPage)
    }
    
    async function handleCurrent(event: React.ChangeEvent<HTMLInputElement>) {
        setCurrent(event.target.checked)
        
        if(!current){
            setFuture(false)
            await getVacations("current")                        
        }
        else {
            setVacations([])
            setFilter("") 
        }
    }

    async function handleFuture(event: React.ChangeEvent<HTMLInputElement>) {
        setFuture(event.target.checked)
        
        if(!future){
            setCurrent(false)
            await getVacations("future")
        }
        else {
            setVacations([])
            setFilter("") 
        }
    }

    async function getVacations(filter: string): Promise<void> {
        setVacations([])
        setFilter("")
        setCurrentPage(1)

        let filterVacations: VacationModel[] = []
        try {
            if(filter === "future"){
                setFilter("Future Vacations")
                filterVacations = await vacationService.getFutureVacations(user.userID)
                setVacations(filterVacations)
            }
            else if(filter === "current"){
                setFilter("Current Vacations")
                filterVacations = await vacationService.getCurrentVacations(user.userID)
                setVacations(filterVacations)
            }  
            //Set pagination:
            setPageNumber(Math.ceil(filterVacations.length/vacationPerPage))                    
        }
        catch (err: any) {
            notifyService.error(err)
        }
    }
    
    return (
        <>
        <div className="DateArea">
            <div className="Background"></div>
            <div className="Content">
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

                <div className="AllData">
                    <div className="Heading">
                        <h3>{filter}</h3>
                        {filter && <>
                            <span>The opportunity will soon pass, </span><br/>
                            <span>to reserve a place contact us immediately</span>
                        </>}
                    </div>
                    <div className="Vacations">
                        {vacations && vacations.slice((currentPage-1)* vacationPerPage, currentPage * vacationPerPage).
                                                map(v => 
                                                    <div className="card" key={v.vacationID}>
                                                        <span>{v.duration} days in {v.destination}</span><br/>
                                                        <VacationCard key={v.vacationID} vacation={v}/>
                                                        <span>Just {v.price}$</span>
                                                    </div>)}
                    </div>
                </div>
                {pageNumber > 1 &&
                    <Pagination className="Pagination" count={pageNumber} page={currentPage} onChange={HandleChangePage} color="primary"/>
                }  
            </div>
        </div>
        </>
    );
}

export default DateArea;
