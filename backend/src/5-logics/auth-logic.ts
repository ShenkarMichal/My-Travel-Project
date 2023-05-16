import { OkPacket } from "mysql";
import UserModel from "../4-models/user-model";
import dal from "../2-utils/dal";
import cyber from "../2-utils/cyber";
import { UnauthorizedErrorModel } from "../4-models/errors-model";

async function register(user:UserModel): Promise<string> {
    //validation
    
    //Check if username exists
    if(isUsernameExists(user.username)) throw new UnauthorizedErrorModel("username already exists")

    //Secure coding - hash password
    user.password = cyber.hash(user.password)
    //Add the user to the database
    const sql = `INSERT INTO users VALUES(DEFAULT, ?, ?, ?, ?, ?, DEFAULT)`
    const info: OkPacket = await dal.execute(sql, [user.firstName, user.lastName, user.username, user.password, user.email])
    user.userID = info.insertId
    //Generate token
    const token = cyber.getNewToken(user)
    return token    
}

async function isUsernameExists(username:string): Promise<Boolean> {
    const sql = `SELECT COUNT(*) AS usernameCount FROM users WHERE username = ?`
    const resoult = await dal.execute(sql, [username])
    const count = resoult[0].usernameCount
    return count > 0    
}



