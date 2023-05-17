import { OkPacket } from "mysql";
import UserModel from "../4-models/user-model";
import dal from "../2-utils/dal";
import cyber from "../2-utils/cyber";
import { UnauthorizedErrorModel, ValidationErrorModel } from "../4-models/errors-model";
import RoleModel from "../4-models/role-model";
import CredentialModel from "../4-models/credential-model";

async function register(user:UserModel): Promise<string> {
    //validation
    const err = user.validate()
    if(err) throw new ValidationErrorModel(err)
    
    //Check if username exists:
    if(await isDataExists("username", user.username)) throw new UnauthorizedErrorModel("username already exists")
    //Check if email exists:
    if(await isDataExists("email", user.email)) throw new UnauthorizedErrorModel("email already exists")

    //Secure coding - hash password
    user.password = cyber.hash(user.password)

    //Add the user to the database
    const sql = `INSERT INTO users VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)`
    const info: OkPacket = await dal.execute(sql, [user.firstName, user.lastName, user.username, user.password, user.email, RoleModel.user])
    user.userID = info.insertId

    //Generate token
    const token = cyber.getNewToken(user)
    return token    
}

async function isDataExists(dataName:string, data: string): Promise<Boolean> {
    const sql = `SELECT COUNT(*) AS Count FROM users WHERE ${dataName} = ?`
    const resoult = await dal.execute(sql, [data])
    const count = resoult[0].Count
    return count > 0  
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

export default {
    register, 
    login
}



