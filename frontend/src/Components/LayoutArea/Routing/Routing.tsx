import { Navigate, Route, Routes } from "react-router-dom";
import "./Routing.css";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import VacationDetails from "../../VacationsArea/VacationDetails/VacationDetails";
import PageNotFound from "../PageNotFound/PageNotFound";
import PasswordRecovery from "../../AuthArea/PasswordRecovery/PasswordRecovery";
import UpdatePassword from "../../AuthArea/UpdatePassword/UpdatePassword";
import ContinentArea from "../../VacationsArea/ContinentArea/ContinentArea";
import DateArea from "../../VacationsArea/DateArea/DateArea";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import UpdateVacation from "../../VacationsArea/UpdateVacation/UpdateVacation";
import Profile from "../../AuthArea/Profile/Profile";
import UserVacations from "../../VacationsArea/UserVacations/UserVacations";
import Logout from "../../AuthArea/Logout/Logout";
import VacationsReport from "../../VacationsArea/VacationsReport/VacationsReport";
import VacationsCSV from "../../VacationsArea/VacationsCSV/VacationsCSV";


function Routing(): JSX.Element {
      

    return (
        <div className="Routing">
			<Routes>
                {/* Auth Routes: */}
                <Route path="/auth/register" element={<Register />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/logout" element={<Logout />} />
                <Route path="/auth/recovery" element={<PasswordRecovery />} />
                <Route path="/auth/recovery/update-password/:email" element={<UpdatePassword />} />
                <Route path="/auth/profile" element={<Profile />} />

                {/* Vacations Routes: */}
                <Route path="/vacations" element={<VacationsList />} />
                <Route path="/vacations/:vacationID" element={<VacationDetails />} />
                <Route path="/vacations/filter/by-continent/" element={<ContinentArea />} />
                <Route path="/vacations/filter/by-date" element={<DateArea />} />
                <Route path="/vacations/new" element={<AddVacation />} />
                <Route path="/vacations/update/:vacationID" element={<UpdateVacation />} />
                <Route path="/vacations/by-user/:userID" element={<UserVacations />} />
                <Route path="/vacations/report" element={<VacationsReport />} />
                <Route path="/vacations/csv-download" element={<VacationsCSV />} />

                {/* Default Route: */}
                <Route path="/" element={<Navigate to="/auth/login" />} />
                
                {/* Page-not-found Route: */}
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default Routing;
