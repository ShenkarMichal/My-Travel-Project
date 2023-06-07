import { useEffect, useRef, useState } from "react";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationsList.css";
import VacationModel from "../../../4-Models/VacationModel";
import vacationService from "../../../5-Service/VacationsService";
import points from "../../../1-Assets/Images/UtilsImages/WhitePoints.png"
import FilterButton from "../FilterButton/FilterButton";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import verifyLogged from "../../../2-Utils/VerifyLogged";
import { vacationsStore } from "../../../3-Redux/VacationsState";
import UserModel from "../../../4-Models/UserModel";
import { authStore } from "../../../3-Redux/AuthState";

function VacationsList(): JSX.Element {

    const isLogged = verifyLogged.isLogged()

    const [vacations, setVacations] = useState<VacationModel[]>([]);

    const cardRef = useRef(null);
    
    useEffect(() => {
        vacationService.getAllVacation()
            .then((v) => setVacations(v))
            .catch((err) => console.log(err));
        setUser(authStore.getState().user)
        console.log(user)
    
        const unsubscribe = authStore.subscribe(()=>{
            setUser(authStore.getState().user)
        })
    
        return()=> unsubscribe()
    }, []);

    const [user, setUser] = useState<UserModel>()

    useEffect(()=>{

    },[])

    useEffect(() => {
        const cardWidth = '200';
        const cardCount = vacations.length;
        const marqueeReset = -10;

        cardRef.current?.style.setProperty('--card-width', `${cardWidth}px`);
        cardRef.current?.style.setProperty('--card-count', `${cardCount}`);
        cardRef.current?.style.setProperty('--marquee-reset', `${marqueeReset}%`);
        
        const marqueeAnimation = `marquee ${vacations.length * 3}s linear infinite`;

        if(cardRef.current) {
        cardRef.current.style.animation = marqueeAnimation;
        cardRef.current.style.animationDuration = `${vacations.length * 3}s`;
        cardRef.current.style.animationTimingFunction = 'linear';
        cardRef.current.style.animationIterationCount = 'infinite';
        }
            
        let animationTimeout: string | number | NodeJS.Timeout; // Variable to retrieve the animation after a break

        const handleMouseEnter = () => {
            if (cardRef.current) {
            cardRef.current.style.animationPlayState = 'paused'; // Pause the animation when mouse enter
            }
        };

        const handleMouseLeave = () => {
            if (cardRef.current) {
            animationTimeout = setTimeout(() => {
                cardRef.current.style.animationPlayState = 'running'; // Continue the animation from the point where it paused
            }, 1000); // The duration of the pause before continuing
            }
        };

        cardRef.current?.addEventListener('mouseenter', handleMouseEnter);
        cardRef.current?.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            // Clearing the events and timeout at the end of the component's life:
            cardRef.current?.removeEventListener('mouseenter', handleMouseEnter);
            cardRef.current?.removeEventListener('mouseleave', handleMouseLeave);
            clearTimeout(animationTimeout);
        };

    }, [vacations]);


    return (
        <>
        {isLogged &&
        <div className="VacationsList">
            <h1>
            <span>360 DEG</span><br/> <span>AROUND THE</span>
            <br /> WORLD <br />
            <div className="FilterButton">
                <p>A journey of a thousand miles <br />begins with a single step.</p>
                <p>Lao Tzu</p>
                <FilterButton />
            </div>
            </h1>

            <div className="marquee-container">
                <div className="marquee">
                    <div className="marquee-content" ref={cardRef}>
                        {vacations.map((v) => (<VacationCard vacation={v} user={user} key={v.vacationID} />))}
                    </div>
                </div>
                <img src={points} />
            </div>
        </div>
        }
        {!isLogged &&
        <Navigate to={"/auth/login"}/>
        }
        </>
    );
}

export default VacationsList;
