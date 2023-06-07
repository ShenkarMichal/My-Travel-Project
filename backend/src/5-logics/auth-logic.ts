import { OkPacket } from "mysql";
import UserModel from "../4-models/user-model";
import dal from "../2-utils/dal";
import cyber from "../2-utils/cyber";
import { UnauthorizedErrorModel, ValidationErrorModel } from "../4-models/errors-model";
import RoleModel from "../4-models/role-model";
import CredentialModel from "../4-models/credential-model";
import dataUtils from "../2-utils/data-utils";
import Joi from "joi";
import fsPromise from 'fs/promises'

async function register(user:UserModel): Promise<string> {
    //validation
    const err = user.validate()
    if(err) throw new ValidationErrorModel(err)
    
    //Check if username exists:
    if(await dataUtils.isDataExists(user.username, "username", "users")) throw new UnauthorizedErrorModel("username already exists")
    //Check if email exists:
    if(await dataUtils.isDataExists(user.email, "email", "users")) throw new UnauthorizedErrorModel("email already exists")

    //Secure coding - hash password
    user.password = cyber.hash(user.password)
    //Set the role on "User" at default
    user.role = RoleModel.user

    //Add the user to the database
    const sql = `INSERT INTO users VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)`
    const info: OkPacket = await dal.execute(sql, [user.firstName, user.lastName, user.username, user.password, user.email, user.role])
    user.userID = info.insertId

    //Generate token
    const token = cyber.getNewToken(user)
    return token    
}

async function login(credential:CredentialModel): Promise<string> {
    //Validation:
    const err = credential.validate()
    if(err) throw new ValidationErrorModel(err)

    //Secure coding - hash password:
    credential.password = cyber.hash(credential.password)

    //Checking if username and password are correct:
    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`
    const resoult = await dal.execute(sql, [credential.username, credential.password])
    const user = resoult[0]
    if(!user) throw new UnauthorizedErrorModel(`The username or password incorrect`)
    
    //Generating token
    const token = cyber.getNewToken(user)
    return token    
}

async function passwordRecovery(email:string): Promise<void> {
    //Validation:
    const emailSchema = Joi.string().email().required()
    function validateEmail():string {
        const resoult = emailSchema.validate(email)
        return resoult.error?.message
    }
    const err = validateEmail()
    if(err) throw new ValidationErrorModel(err)

    //If email is not exists:
    if(!await dataUtils.isDataExists(email, "email", "users")) throw new UnauthorizedErrorModel("The email is not exists")

    //Set the subject and the content of the mail:
    const subject = "Password-Recovery From My-Travel, Please not Replay!"
    let content = await fsPromise.readFile("./src/2-utils/password-recovery-mail.txt", "utf-8")   
    //Change the link in the mail:
    content = content.replace('email', email+"/")
    
    //Send email with recovery-password link:
    await dataUtils.sendEmailToUser(email, subject, content)    
}

async function updateUserPassword(email:string, password: string): Promise<void> {
    //Validation:
    const passwordSchema =Joi.string().required().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
    function validatePassword():string {
        const resoult = passwordSchema.validate(password)
        return resoult.error?.message
    } 
    const err = validatePassword()
    if(err) throw new ValidationErrorModel(err)

    //Secure codeing- hash password:
    password = cyber.hash(password)
    
    //Update the password by email:
    const sql = `UPDATE users SET password = ? WHERE email = ?`
    await dal.execute(sql, [password, email])      
}

export default {
    register, 
    login,
    passwordRecovery,
    updateUserPassword
}



