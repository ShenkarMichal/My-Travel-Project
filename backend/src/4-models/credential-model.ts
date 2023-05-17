import Joi from 'joi'

class CredentialModel {
    public username: string
    public password: string

    public constructor(credential: CredentialModel){
        this.username = credential.username
        this.password = credential.password
    }

    public static validationSchema = Joi.object({
        username: Joi.string().required().min(3).max(15),
        //The password must contain at least one lowercase letter, at least one uppercase letter, and at least one number:
        password: Joi.string().required().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
    })

    public validate(): string {
        const resoult = CredentialModel.validationSchema.validate(this)
        return resoult.error?.message
    }
}

export default CredentialModel