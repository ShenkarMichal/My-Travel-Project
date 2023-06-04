import { createStore } from "redux";
import FollowerModel from "../4-Models/FollowerModel";

//1 - Global State:
export class FollowersState {
    public followers: FollowerModel[] = []
}

//2 - Action Type
export enum FollowersActionType {
    SetNewFollow,
    DeleteFollow
}

//3 - Action
export interface FollowersAction {
    type: FollowersActionType,
    payload: FollowerModel
}

//4 - Reducer
export function followersReducer(currentState = new FollowersState(), action: FollowersAction): FollowersState {
    const newState = {...currentState}

    switch (action.type){
        case FollowersActionType.SetNewFollow:
            newState.followers.push(action.payload)
            break
        case FollowersActionType.DeleteFollow:
            const indexToDelete = newState.followers.findIndex(f => f.userID === action.payload.userID && f.vacationID === action.payload.vacationID)
            newState.followers.splice(indexToDelete, 1)
            break
    }

    return newState
}

//5 - Store
export const followersStore = createStore(followersReducer)