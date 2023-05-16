import RoleModel from "./role-model"

class UserModel {
    public userID: number
    public firstName: string
    public lastName: string
    public username: string
    public password: string
    public email: string
    public role: RoleModel

    public constructor(user: UserModel) {
        this.userID = user.userID
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.username = user.username
        this.password = user.password
        this.email = user.email
        this.role = user.role
    }

}

export default UserModel