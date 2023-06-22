import jwtDecode from "jwt-decode";
import UserModel from "../4-Models/UserModel";
import { createStore } from "redux";

//1 - Global-State:
export class AuthState {
    public user: UserModel = null
    public token: string = null

    public constructor(){
        if(sessionStorage.getItem("token")){
            this.token = sessionStorage.getItem("token")
            const container: {user: UserModel} = jwtDecode(this.token)
            this.user = container.user
        }
    }
}

//2 - Action-Type:
export enum AuthActionType {
    Login,
    Register,
    Logout,
    Update
}

//3 - Action:
export interface AuthAction {
    type: AuthActionType,
    payload?: string;
}

//4 - Reducer:
export function authReduser(currentState = new AuthState(), action: AuthAction): AuthState {
    const newState = {...currentState}

    switch (action.type) {
        case AuthActionType.Register:
        case AuthActionType.Login:
        case AuthActionType.Update:
            newState.token = action.payload
            //Rscue the user from the token string:
            const container: {user: UserModel} = jwtDecode(newState.token)
            newState.user = container.user
            //Save the token for refresh-page case:
            sessionStorage.setItem("token", newState.token)
            break
        case AuthActionType.Logout:
            newState.token = null
            newState.user = null
            sessionStorage.removeItem("token")
            break
    }

    return newState
}

//5 - Store
export const authStore = createStore(authReduser)