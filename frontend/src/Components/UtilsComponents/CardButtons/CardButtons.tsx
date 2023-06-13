import { NavLink } from "react-router-dom";
import RoleModel from "../../../4-Models/RoleModel";
import UserModel from "../../../4-Models/UserModel";
import "./CardButtons.css";
import VacationModel from "../../../4-Models/VacationModel";
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import LocationOffIcon from '@mui/icons-material/LocationOff';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FollowerModel from "../../../4-Models/FollowerModel";
import followersService from "../../../5-Service/FollowersService";
import { followersStore } from "../../../3-Redux/FollowersState";
import { useEffect, useState } from "react";
import { authStore } from "../../../3-Redux/AuthState";
import vacationService from "../../../5-Service/VacationsService";


interface CardButtonsProp{
    vacation: VacationModel
}
function CardButtons(prop: CardButtonsProp): JSX.Element {

    //Style the badge:
    const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
        '& .MuiBadge-badge': {
          right: -3,
          top: 13,
          border: `2px solid ${theme.palette.background.paper}`,
        },
    }));

    const [user, setUser] = useState<UserModel>()

    //Set the current-follow:
    const [isFollow, setIsFollow] = useState<boolean>(false)
    const [followNumber, setFollowNumber] = useState<number>(0)



    useEffect(()=>{
                //Set the user from Redux:
                setUser(authStore.getState().user)

                //Set the numer of followers per vacation:
                followersService.getFollowNumberByVacation(prop.vacation?.vacationID)
                    .then(f => setFollowNumber(f))
                    .catch(err => console.log(err))

                //Set the button on follow/un-follow on component first rendering:
                if(prop.vacation?.isFollow > 0){
                    setIsFollow(true)
                }                

    },[prop.vacation])
    


    async function follow(userID:number, vacationID: number): Promise<void> {
        const follower = new FollowerModel(userID, vacationID)
        //Check if the follower already exists:
        const followers = followersStore.getState().followers.find(f=> f.userID === follower.userID && f.vacationID === follower.vacationID)
        //If not - we need to follow it:
        if(!followers){        
            try {
                await followersService.addNewFollow(follower)    
                setIsFollow(true)
                const number = await followersService.getFollowNumberByVacation(prop.vacation.vacationID)
                setFollowNumber(number)                                
            }
            catch (err: any) {
                console.log(err)            
            } 
        }
        //If yes - we need to un-follow it:
        else {
            try {
                await followersService.deleteFollower(follower) 
                setIsFollow(false)   
                const number = await followersService.getFollowNumberByVacation(prop.vacation?.vacationID)
                setFollowNumber(number)
            } 
            catch (err: any) {
                console.log(err)                
            }
        }       
    }

    async function deleteProduct(vacationID: number): Promise<void> {
        try {
            if(window.confirm("Are you sure?")){
                await vacationService.deleteVacation(vacationID)
                alert("The vacation has been successfully deleted")                
            }
        } 
        catch (err: any) {
            console.log(err)            
        }
    }

    return (
        <div className="CardButtons">
            {user?.role === RoleModel.user &&
                <>
                    {/* Follower-button */}
                    <IconButton aria-label="follow" 
                    onClick={() => follow(user.userID, prop.vacation.vacationID)}
                    >
                        <StyledBadge badgeContent={followNumber} color="error" sx={{fontSize: 15}}>
                            {!isFollow &&
                                <FavoriteBorderIcon color="error" sx={{fontSize: 35}} />
                            } 
                            {isFollow &&
                                <FavoriteIcon color="error" sx={{fontSize: 35}} />
                            }
                        </StyledBadge>
                    </IconButton>
                    {/* Followers-count */}
                </>
            } 
            {user?.role === RoleModel.admin &&
                <>
                    {/* Edit-button */}
                    <NavLink to={`/vacations/update/${prop.vacation?.vacationID}`} title="Edit">
                        <IconButton className="IconButton">
                            <EditLocationAltIcon color="warning" sx={{fontSize: 35}} />
                        </IconButton>
                    </NavLink>
                    {/* Delete-button */}
                    <IconButton title="Delete" className="IconButton" onClick={()=> deleteProduct(prop.vacation?.vacationID)}>
                        <LocationOffIcon color="error" sx={{fontSize: 35}}/>
                    </IconButton>

                </>
            }
			
        </div>
    );
}

export default CardButtons;
