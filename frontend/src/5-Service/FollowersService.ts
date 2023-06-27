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

        this.getAllFollowers()

        const response = await axios.post<FollowerModel>(`${appConfig.followURL}${follower.userID}/${follower.vacationID}`)
        const newFollower = response.data
        
        followersStore.dispatch({type: FollowersActionType.SetNewFollow, payload: newFollower})
    }

    public async deleteFollower(follower: FollowerModel): Promise<void> {

        await axios.delete(`${appConfig.followURL}${follower.userID}/${follower.vacationID}`)
        followersStore.dispatch({type: FollowersActionType.DeleteFollow, payload:follower})
    }

    public async getFollowNumberByVacation(vacationID: number): Promise<number> {

        const response = await axios.get(appConfig.followerNumberOfVacation + vacationID)
        const number = response.data

        return number
    }

    public async getVacationsByUser(userID: number): Promise<{vacationID: number}[]> {

        const response = await axios.get<[]>(appConfig.vacationOfFollower + userID)
        const vacationsNumbers = response.data

        return vacationsNumbers
    }

    public async getCsvFile(): Promise<any> {
        const response = await axios.get(appConfig.csvFileDownloadURL)
        return response.data
    }

    public async getDataToReport(): Promise<any[]> {
        const response = await axios.get<any[]>(appConfig.reportURL)
        const data = response.data
        console.log(data)
        return data
    }
}

const followersService = new FollowersService()
export default followersService