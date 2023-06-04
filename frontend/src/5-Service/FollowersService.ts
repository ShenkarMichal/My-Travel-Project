import axios from "axios";
import FollowerModel from "../4-Models/FollowerModel";
import appConfig from "../2-Utils/Config";
import { FollowersActionType, followersStore } from "../3-Redux/FollowersState";

class FollowersService {

    public async getAllFollowers(): Promise<FollowerModel[]>{
        let followers = followersStore.getState().followers
        if(followers.length === 0){
            const response = await axios.get<FollowerModel[]>(appConfig.followURL)
            followers = response.data
            followersStore.dispatch({type: FollowersActionType.GetAllFollowers, payload: followers})
        }

        return followers
    }    

    public async addNewFollow(follower: FollowerModel): Promise<void>{
        let followers = followersStore.getState().followers
        if(followers.length === 0){
            this.getAllFollowers()
        }
        await axios.post<void>(`${appConfig.followURL}${follower.userID}/${follower.vacationID}`)
        
        followersStore.dispatch({type: FollowersActionType.SetNewFollow, payload: follower})
    }

    public async deleteFollower(follower: FollowerModel): Promise<void> {
        let followers = followersStore.getState().followers
        if(followers.length === 0){
            this.getAllFollowers()
        }

        await axios.delete(`${appConfig.followURL}${follower.userID}/${follower.vacationID}`)
        followersStore.dispatch({type: FollowersActionType.DeleteFollow, payload:follower})
    }

    public async getFollowNumberByVacation(vacationID: number): Promise<number> {

        let followers = followersStore.getState().followers
        if(followers.length === 0) {
            this.getAllFollowers()
        }

        const response = await axios.get(appConfig.followerNumberOfVacation + vacationID)
        const number = response.data

        return number
    }

    public async getVacationsByUser(userID: number): Promise<[]> {

        const response = await axios.get<[]>(appConfig.vacationOfFollower + userID)
        const vacationsNumbers = response.data

        return vacationsNumbers
    }
}

const followersService = new FollowersService()
export default followersService