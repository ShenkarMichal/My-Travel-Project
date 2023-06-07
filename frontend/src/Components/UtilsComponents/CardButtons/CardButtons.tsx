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


interface CardButtonsProp{
    user: UserModel
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

    //Set the current-follow:
    const [isFollow, setIsFollow] = useState<boolean>(false)
    const [followNumber, setFollowNumber] = useState<number>(0)
    const [userFollow, setUserFollow] = useState<any[]>([])

    useEffect(()=>{
        followersService.getFollowNumberByVacation(prop.vacation?.vacationID)
            .then(f => setFollowNumber(f))
            .catch(err => console.log(err))
        followersService.getVacationsByUser(prop.user?.userID)
            .then(v => setUserFollow(v))
            .catch(err => console.log(err))
        const userVacationFollow = userFollow.find(v => v.vacationID === prop.vacation?.vacationID)
            if(userVacationFollow){
                setIsFollow(true)
            }
    },[prop])


    async function follow(userID:number, vacationID: number): Promise<void> {
        const follower = new FollowerModel(userID, vacationID)
        //Check if the follower already exists:
        const followers = followersStore.getState().followers.find(f=> f.userID === follower.userID && f.vacationID === follower.vacationID)
        //If not - we need to follow it:
        if(!followers){        
            try {
                await followersService.addNewFollow(follower)    
                //console.log(followersStore.getState().followers)
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

    return (
        <div className="CardButtons">
            {prop.user?.role === RoleModel.user &&
                <>
                    {/* Follower-button */}
                    <IconButton aria-label="follow" 
                    onClick={() => follow(prop.user.userID, prop.vacation.vacationID)}
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
            {prop.user?.role === RoleModel.admin &&
                <>
                    {/* Edit-button */}
                    <NavLink to={`/vacations/update/${prop.vacation?.vacationID}`} title="Edit">
                        <EditLocationAltIcon color="warning" sx={{fontSize: 35}} />
                    </NavLink>
                    {/* Delete-button */}
                    <NavLink to= {`/vacations/delete/${prop.vacation?.vacationID}`} title="Delete" >
                        <LocationOffIcon color="error" sx={{fontSize: 35}}/>
                    </NavLink>

                </>
            }
			
        </div>
    );
}

export default CardButtons;
