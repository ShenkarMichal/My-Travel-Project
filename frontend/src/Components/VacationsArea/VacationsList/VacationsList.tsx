import { useEffect, useState } from "react";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationsList.css";
import VacationModel from "../../../4-Models/VacationModel";
import vacationService from "../../../5-Service/VacationsService";
import points from "../../../1-Assets/Images/UtilsImages/WhitePoints.png"
import FilterButton from "../FilterButton/FilterButton";
import { NavLink } from "react-router-dom";

function VacationsList(): JSX.Element {
  const [vacations, setVacations] = useState<VacationModel[]>([]);

  useEffect(() => {
    vacationService
      .getAllVacation()
      .then((v) => setVacations(v))
      .catch((err) => console.log(err));
  }, []);


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
              <div className="marquee-content">
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
