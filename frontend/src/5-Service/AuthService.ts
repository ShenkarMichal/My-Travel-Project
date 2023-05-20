import axios from "axios"
import UserModel from "../4-Models/UserModel"
import appConfig from "../2-Utils/Config"
import { AuthActionType, authStore } from "../3-Redux/AuthState"
import CredentialModel from "../4-Models/CredentialModel"

class AuthService {

    public async register(user:UserModel): Promise<void> {
        //Add the user to the database
        const response = await axios.post<string>(appConfig.registerURL, user)
        const token = response.data

        //Save the token in the state:
        authStore.dispatch({type: AuthActionType.Logout, payload: token})   
    }

    public async login(credential:CredentialModel): Promise<void> {
        //Get the tokem from the server:
        const response = await axios.post<string>(appConfig.loginURL, credential)
        const token = response.data

        //Save the token in the state:
        authStore.dispatch({type: AuthActionType.Login, payload: token})         
    }

    public logout(): void {
        //Delete the token from state:
        authStore.dispatch({type: AuthActionType.Logout})
    }

    public async PasswordRecovery(email: string): Promise<string> {
        const response = await axios.post(appConfig.passwordRecoveryURL + email)
        const msg = response.data
        return msg
    }
}

const authService = new AuthService()
export default authService