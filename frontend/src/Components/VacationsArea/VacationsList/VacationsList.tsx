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
import CardButtons from "../../UtilsComponents/CardButtons/CardButtons";

function VacationsList(): JSX.Element {

  const isLogged = verifyLogged.isLogged()

  const [vacations, setVacations] = useState<VacationModel[]>([]);
  const [user, setUser] = useState<UserModel>()

  const cardRef = useRef(null);
  
  useEffect(() => {
    vacationService.getAllVacation()
      .then((v) => setVacations(v))
      .catch((err) => console.log(err));
    
    const unsubscribe = vacationsStore.subscribe(()=>{
      vacationService.getAllVacation()
      .then((v) => setVacations(v))
      .catch((err) => console.log(err));
    })

    return ()=> unsubscribe()

  }, []);

  useEffect(()=>{
    setUser(authStore.getState().user)

    const unsubscribe = authStore.subscribe(()=>{
        setUser(authStore.getState().user)
    })

    return ()=> unsubscribe()
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

    
  let animationTimeout: string | number | NodeJS.Timeout; // משתנה לאחזור האנימציה אחרי הפסקה

  const handleMouseEnter = () => {
    if (cardRef.current) {
      cardRef.current.style.animationPlayState = 'paused'; // השהיית האנימציה בעת מעבר העכבר
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      animationTimeout = setTimeout(() => {
        cardRef.current.style.animationPlayState = 'running'; // המשך האנימציה מהנקודה שבה הפסקה
      }, 500); // משך ההשהייה לפני ההמשך
    }
  };

  cardRef.current?.addEventListener('mouseenter', handleMouseEnter);
  cardRef.current?.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    // ניקוי האיוונטים והטיימאוט בסיום חיי הקומפוננטה
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
                    {vacations.map((v) => (<VacationCard vacation={v} user={user} key={v.vacationID}  />))}
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
