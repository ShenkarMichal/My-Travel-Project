
class CredentialModel {
    public username: string
    public password: string

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
}

export default CredentialModel