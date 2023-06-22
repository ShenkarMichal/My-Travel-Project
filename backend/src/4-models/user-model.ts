import { UploadedFile } from "express-fileupload"
import RoleModel from "./role-model"
import Joi from 'joi'

class UserModel {
    public userID: number
    public firstName: string
    public lastName: string
    public username: string
    public password: string
    public email: string
    public role: RoleModel

    public image: UploadedFile
    public imageName: string

    public constructor(user: UserModel) {
        this.userID = user.userID
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.username = user.username
        this.password = user.password
        this.email = user.email
        this.role = user.role
        this.image = user.image
        this.imageName = user.imageName
    }

    //Validation
    public static ValidationSchema = Joi.object({
        userID: Joi.number().optional().integer().positive(),
        firstName: Joi.string().required().min(3).max(15),
        lastName: Joi.string().required().min(3).max(15),
        username: Joi.string().required().min(3).max(15),
        //The password must contain at least one lowercase letter, at least one uppercase letter, and at least one number:
        password: Joi.string().required().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/), 
        email: Joi.string().required().email(),
        role: Joi.string().forbidden(),
        image: Joi.optional(),
        imageName: Joi.string().optional()
    })

    public validate(): string {
        const resoult = UserModel.ValidationSchema.validate(this)
        return resoult.error?.message
    }

    //Validation on update user:
    public static ValidationUpdateSchema = Joi.object({
        userID: Joi.number().optional().integer().positive(),
        firstName: Joi.string().required().min(3).max(15),
        lastName: Joi.string().required().min(3).max(15),
        username: Joi.string().required().min(3).max(15),
        image: Joi.optional(),
        imageName: Joi.string().optional(),
        email: Joi.string().optional().email(),
        role: Joi.string().required()

    })
    
    public updateValidate(): string {
        const resoult = UserModel.ValidationUpdateSchema.validate(this)
        return resoult.error?.message
    }
}

export default UserModel