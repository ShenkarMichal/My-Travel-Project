import RoleModel from "./RoleModel"

class UserModel {
    public userID: number
    public firstName: string
    public lastName: string
    public username: string
    public password: string
    public email: string
    public role: RoleModel
}

export default UserModel