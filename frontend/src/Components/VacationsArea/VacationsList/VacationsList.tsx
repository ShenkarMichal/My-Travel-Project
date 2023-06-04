import { useEffect, useRef, useState } from "react";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationsList.css";
import VacationModel from "../../../4-Models/VacationModel";
import vacationService from "../../../5-Service/VacationsService";
import points from "../../../1-Assets/Images/UtilsImages/WhitePoints.png"
import FilterButton from "../FilterButton/FilterButton";
import { NavLink } from "react-router-dom";
import { vacationsStore } from "../../../3-Redux/VacationsState";

function VacationsList(): JSX.Element {
  const [vacations, setVacations] = useState<VacationModel[]>([]);

  const cardRef = useRef(null);
  
  useEffect(() => {
    vacationService
      .getAllVacation()
      .then((v) => setVacations(v))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const cardWidth = '200';
    const cardCount = vacations.length;
    const marqueeReset = -10;

    cardRef.current?.style.setProperty('--card-width', `${cardWidth}px`);
    cardRef.current?.style.setProperty('--card-count', `${cardCount}`);
    cardRef.current?.style.setProperty('--marquee-reset', `${marqueeReset}%`);
    
    const marqueeAnimation = `marquee ${vacations.length * 3}s linear infinite`;

    cardRef.current.style.animation = marqueeAnimation;
    cardRef.current.style.animationDuration = `${vacations.length * 3}s`;
    cardRef.current.style.animationTimingFunction = 'linear';
    cardRef.current.style.animationIterationCount = 'infinite';

  }, [vacations]);


  return (
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
                  {vacations.map((v) => (
                  <NavLink to={`/vacations/${v.vacationID}`} key={v.vacationID}><VacationCard key={v.vacationID} vacation={v} /></NavLink>
                  ))}
              </div>
          </div>
          <img src={points} />
      </div>
    </div>
  );
}

export default VacationsList;
