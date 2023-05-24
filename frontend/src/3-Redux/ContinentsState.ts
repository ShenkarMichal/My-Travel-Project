import { createStore } from "redux";
import ContinentModel from "../4-Models/ContinentModel";

//1 - Global State:
export class ContinentsState {
    public continents: ContinentModel[] = []
}

//2 - Action Type
export enum ContinentsActionType {
    GetAllContinents
}

//3 - Action
export interface ContinentsAction {
    type: ContinentsActionType,
    payload: any
}

//4 - Reducer
export function continentsReducer(currentState = new ContinentsState(), action: ContinentsAction): ContinentsState {
    const newState = {...currentState}

    switch (action.type){
        case ContinentsActionType.GetAllContinents:
            newState.continents = action.payload
            break
    }

    return newState
}

//5 - Store
export const continentsStore = createStore(continentsReducer)