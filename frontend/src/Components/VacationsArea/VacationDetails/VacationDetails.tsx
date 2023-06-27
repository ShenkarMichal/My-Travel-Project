import { useEffect, useState } from "react";
import VacationModel from "../../../4-Models/VacationModel";
import "./VacationDetails.css";
import vacationService from "../../../5-Service/VacationsService";
import { Navigate, useParams } from "react-router-dom";
import verifyLogged from "../../../2-Utils/VerifyLogged";
import notifyService from "../../../5-Service/NotifyService";
import utilsService from "../../../5-Service/UtilsService";
import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import Brightness7OutlinedIcon from '@mui/icons-material/Brightness7Outlined';
import MoreTimeOutlinedIcon from '@mui/icons-material/MoreTimeOutlined';

function VacationDetails(): JSX.Element {

    const isLogged = verifyLogged.isLogged()

    const [vacation, setVacation] = useState<VacationModel>()
    const vacationID = +useParams().vacationID
    const [imageURl, setImageURL] = useState("")    

    const [distance, setDistance] = useState<string>("")
    const [weather, setWeather] = useState<[number, string, string]>()
    const [time, setTime] = useState<string>("")


    async function setVariables(){
        try {
            const oneVacation = await vacationService.getOneVacation(vacationID)
            setVacation(oneVacation)
            setDistance(await utilsService.calculateDistanceFromCurrentLocation(oneVacation.destination))
            setImageURL(await vacationService.getVacationImageUrl(oneVacation.vacationID))
            setWeather(await utilsService.getWeather(oneVacation.destination))
            setTime(await utilsService.getLocalTime(oneVacation.destination))
        }
        catch (err: any) {
            notifyService.error(err)    
        }
    }

    useEffect(()=>{
        if(!isLogged) notifyService.error("You are not logged in")    
        
        setVariables()
            .then()
            .catch(err => notifyService.error(err))

        //Update the time per minute:
        const timeInterval = setInterval(()=>{
            setVariables()
                .then()
                .catch(err => notifyService.error(err))
            },1000*60)

        return ()=> clearInterval(timeInterval)
    },[])

    return (
        <>
        {isLogged &&  <>   
            <div className="VacationDetails" style={{backgroundImage: `url(${imageURl})`}}></div>
                {vacation && <>
                    <div className="DetailsContainer Content" style={{backgroundImage: `url(${imageURl})`}}>
                        <div className="Details">
                            <h2>{vacation.destination}</h2>
                            <div className="DetailsHeading">Where?</div>
                        </div>
                        <div className="Details">
                            <span className="moreSpan">
                            <lord-icon
                                src="https://cdn.lordicon.com/fhtaantg.json"
                                trigger="loop"
                                colors="primary:#121331,secondary:#848484"
                                stroke="25"
                                style={{width:"80px",height:"80px"}}>
                            </lord-icon>
                            <h4>From: {vacation.startDate} <br/> To: {vacation.endDate}. <br/> Total: {vacation.duration} days.</h4>
                            </span>
                            <div className="DetailsHeading">When?</div>
                        </div>
                        <div className="Details">
                            <span className="moreSpan">
                            <lord-icon
                                src="https://cdn.lordicon.com/qgjxvqgb.json"
                                trigger="loop"
                                colors="primary:#121331,secondary:#848484"
                                stroke="25"
                                style={{width:"100px",height:"100px"}}>
                            </lord-icon>
                            <p className="desc">{vacation.description}</p>
                            </span>
                            <div className="DetailsHeading">What?</div>
                        </div>
                        <div className="Details">
                            <span className="moreSpan">
                            <lord-icon
                                src="https://cdn.lordicon.com/qhviklyi.json"
                                trigger="loop"
                                colors="primary:#121331,secondary:#848484"
                                stroke="35"
                                style={{width:"80px", height:"80px"}}>
                            </lord-icon>
                            <span>{vacation.price.toLocaleString()}$</span>
                            </span>
                            <div className="DetailsHeading">How much?</div>
                        </div>
                        <div className="Details">
                            <span className="moreSpan">  
                            {distance &&
                            <>                              
                            <lord-icon
                                src="https://cdn.lordicon.com/gqzfzudq.json"
                                trigger="loop"
                                colors="primary:#848484,secondary:#121331"
                                stroke="25"
                                state="loop"
                                style={{width:'80px', height:'80px'}}>
                            </lord-icon>
                            <span>{distance} km</span>
                            </>}
                            </span>
                            <span className="moreSpan">                                
                            {weather &&
                                <>
                                <lord-icon
                                    src="https://cdn.lordicon.com/wcjauznf.json"
                                    trigger="loop"
                                    colors="primary:#121331,secondary:#08a88a"
                                    stroke="25"
                                    style={{width:"80px", height:"80px"}}>
                                </lord-icon> 
                                <div>
                                    <span>{weather[0].toFixed(2)}℃ </span>
                                    <span>{weather[1]} </span>
                                    <img src={`http://openweathermap.org/img/w/${weather[2]}.png`} alt="Weather Icon" />
                                </div>
                                </>}
                            </span>
                            <span className="moreSpan">
                            <lord-icon
                                    src="https://cdn.lordicon.com/kbtmbyzy.json"
                                    trigger="loop"
                                    colors="primary:#848484,secondary:#121331"
                                    stroke="35"
                                    style={{width:"80px", height:"80px"}}>
                                </lord-icon>                                
                                <span>{time}</span>
                            </span>
                            <div className="DetailsHeading">More...</div>
                        </div>                
                    </div>
                </>}            
        </>}
        {!isLogged &&
            <Navigate to={"/auth/login"} />
        }
        </>
    );
}

export default VacationDetails;
