import RoleModel from "./RoleModel";

class UserModel {
    public userID: number
    public firstName: string
    public lastName: string
    public username: string
    public password: string
    public email: string
    public role: RoleModel

    public confirmPassword: string

    public static firstNameValidatoin = {
        required: {value: true, message: "First-Name is missing"},
        min: {value: 3, message: "First-Name is too short"},
        max: {value: 15, message: "First-Name is too long"}
    }
    public static lastNameValidatoin = {
        required: {value: true, message: "Last-Name is missing"},
        min: {value: 3, message: "Last-Name is too short"},
        max: {value: 15, message: "Last-Name is too long"}
    }
    public static usernameValidatoin = {
        required: {value: true, message: "username is missing"},
        min: {value: 3, message: "username is too short"},
        max: {value: 15, message: "username is too long"}
    }
    public static passwordValidatoin = {
        required: {value: true, message: "Password is missing"},
        min: {value: 8, message: "Password must contain at least 8 characters"},
        pattern: {value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, message: "Password must contain at least one uppercase letter, one lowercase letter, and one number"}        
    }

    public static confirmPasswordValidation = {
        required: {value: true, message: "You must confirm password"},
        validate: (value: string, { password }: UserModel) =>
            value === password || "Passwords do not match",
    }

    public static emailValidation = {
        required: {value: true, message: "Email is missing"},
        pattern: {value:  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, message: "Email must be a valid email"}        
    }
}

export default UserModel;
