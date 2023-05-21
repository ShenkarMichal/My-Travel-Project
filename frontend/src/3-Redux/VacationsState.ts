import { createStore } from "redux";
import VacationModel from "../4-Models/VacationModel";

//1 - Global State:
export class VacationsState {
    public vacations: VacationModel[] = []
}

//2 - Action Type
export enum VacationsActionType {
    GetAllVacations,
    AddNewVacation,
    UpdateVacation,
    deleteVacation
}

//3 - Action
export interface VacationAction {
    type: VacationsActionType,
    payload: any
}

//4 - Reducer
export function vacationReducer(currentState = new VacationsState(), action: VacationAction): VacationsState {
    const newState = {...currentState}

    switch (action.type){
        case VacationsActionType.GetAllVacations:
            newState.vacations = action.payload
            break
        case VacationsActionType.AddNewVacation:
            newState.vacations.push(action.payload)
            break
        case VacationsActionType.UpdateVacation:
            const indexToUpdate = newState.vacations.findIndex(v => v.vacationID = action.payload.vacationID)
            newState.vacations[indexToUpdate] = action.payload
            break
        case VacationsActionType.deleteVacation:
            const indexToDelete = newState.vacations.findIndex(v => v.vacationID = action.payload)
            newState.vacations.splice(indexToDelete, 1)
            break
    }

    return newState
}

//5 - Store
export const vacationsStore = createStore(vacationReducer)