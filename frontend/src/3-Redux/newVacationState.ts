import { createStore } from "redux"
import VacationModel from "../4-Models/VacationModel"

//1 - Global State:
export class newVacationState {
    public vacation: VacationModel 
}

//2 - Action Type
export enum NewVacationActionType {
    SaveNewVacation
}

//3 - Action
export interface NewVacationAction {
    type: NewVacationActionType,
    payload: VacationModel
}

//4 - Reducer
export function newVacationReducer(currentState = new newVacationState(), action: NewVacationAction): newVacationState {
    const newState = {...currentState}
    
    switch (action.type){
        case NewVacationActionType.SaveNewVacation:
            //Delete enpty field in the payload:
            for(let prop in action.payload){
                if(!action.payload[prop as keyof VacationModel]){
                    delete action.payload[prop as keyof VacationModel]
                }
            }
            //Merge the two objects into one:
            const newVacation = Object.assign({},newState.vacation, action.payload)
            newState.vacation = newVacation
            break
    }

    return newState
}

//5 - Store
export const newVacationStore = createStore(newVacationReducer)