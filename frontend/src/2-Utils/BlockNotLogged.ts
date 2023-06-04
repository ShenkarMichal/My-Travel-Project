import { authStore } from "../3-Redux/AuthState";
import RoleModel from "../4-Models/RoleModel";


class BlockNotLogged {

    public isLogged(): boolean {
        if(!authStore.getState().user) return false

        return true                  
    }

    public isAdmin():boolean {
        const isLogged = this.isLogged()
        if(!isLogged) return false

        const user = authStore.getState().user
        return user.role === RoleModel.admin
    }
}

const blockNotLogged = new BlockNotLogged()
export default  blockNotLogged