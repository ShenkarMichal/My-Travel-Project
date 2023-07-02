import { createStore } from "redux";
import FollowerModel from "../4-Models/FollowerModel";
import followersService from "../5-Service/FollowersService";
import axios from "axios";
import appConfig from "../2-Utils/Config";

//1 - Global State:
export class FollowersState {
    public followers: FollowerModel[] = []

}

//2 - Action Type
export enum FollowersActionType {
    GetAllFollowers,
    SetNewFollow,
    DeleteFollow,
    Logout    
}

//3 - Action
export interface FollowersAction {
    type: FollowersActionType,
    payload?: any
}

//4 - Reducer
export function followersReducer(currentState = new FollowersState(), action: FollowersAction): FollowersState {
    const newState = {...currentState}

    switch (action.type){
        case FollowersActionType.GetAllFollowers:
            newState.followers = action.payload
            break
        case FollowersActionType.SetNewFollow:
            newState.followers.push(action.payload)
            break
        case FollowersActionType.DeleteFollow:
            const indexToDelete = newState.followers.findIndex(f => f.userID === action.payload.userID && f.vacationID === action.payload.vacationID)
            newState.followers.splice(indexToDelete, 1)
            break
        case FollowersActionType.Logout:
            newState.followers = []
            break
    }

    return newState
}

//5 - Store
export const followersStore = createStore(followersReducer)