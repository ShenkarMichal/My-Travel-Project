import axios from "axios";
import FollowerModel from "../4-Models/FollowerModel";
import appConfig from "../2-Utils/Config";
import { FollowersActionType, followersStore } from "../3-Redux/FollowersState";

class FollowersService {

    public async addNewFollow(follower: FollowerModel): Promise<void>{

        await axios.post<void>(`${appConfig.followURL}${follower.userID}/${follower.vacationID}`)
        
        followersStore.dispatch({type: FollowersActionType.SetNewFollow, payload: follower})

    }

    public async deleteFollower(follower: FollowerModel): Promise<void> {

        await axios.delete(`${appConfig.followURL}${follower.userID}/${follower.vacationID}`)

        followersStore.dispatch({type: FollowersActionType.DeleteFollow, payload:follower})
    }
}

const followersService = new FollowersService()
export default followersService