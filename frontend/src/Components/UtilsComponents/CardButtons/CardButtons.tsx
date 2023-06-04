import { NavLink } from "react-router-dom";
import RoleModel from "../../../4-Models/RoleModel";
import UserModel from "../../../4-Models/UserModel";
import "./CardButtons.css";
import VacationModel from "../../../4-Models/VacationModel";
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import vacationService from "../../../5-Service/VacationsService";
import WrongLocationIcon from '@mui/icons-material/WrongLocation';

interface CardButtonsProp{
    userRole: RoleModel
    vacation: VacationModel
    deleteVacation: (data: number)=> void
}
function CardButtons(prop: CardButtonsProp): JSX.Element {

    return (
        <div className="CardButtons">
            {prop.userRole === RoleModel.user &&
                <>
                    {/* Follower-button */}

                    {/* Followers-count */}
                </>
            }
            {prop.userRole === RoleModel.admin &&
                <>
                    {/* Edit-button */}
                    <NavLink to={`/vacations/update/${prop.vacation?.vacationID}`}>
                        <EditLocationAltIcon />
                    </NavLink>
                    {/* Delete-button */}
                    <button onClick={()=>prop.deleteVacation(prop.vacation?.vacationID)}>
                        <WrongLocationIcon />
                    </button>

                </>
            }
			
        </div>
    );
}

export default CardButtons;
