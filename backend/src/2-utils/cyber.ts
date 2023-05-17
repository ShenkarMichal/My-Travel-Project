import Jwt from 'jsonwebtoken'
import UserModel from '../4-models/user-model';
import crypto from 'crypto'
import { Request } from 'express';

const secretKey = "aroundTheWorld"

function getNewToken(user: UserModel): string {
    //Secure coding - delete password
    delete user.password
    //Set the token payload
    const container = { user }
    //Set the exp of the token
    const options = { expiresIn: "3h" }
    //Sign token
    const token = Jwt.sign(container, secretKey, options)
    return token
}

function verifyToken(request: Request): Promise<boolean> {
    return new Promise((resolve, reject)=>{
        try {
            const header = request.headers.authorization
            if(!header){
                resolve(false)
                return
            }  
            const token = header.substring(7)
            if(!token){
                resolve(false)
                return
            }
            Jwt.verify(token, secretKey, err =>{
                if(err){
                    resolve(false)
                    return
                }
                resolve(true)
            })
        }
        catch (err: any) {
            reject(err)            
        }
    })
}

const salt = "myTravelSalt"
function hash(plainText: string): string {
    if(!plainText) return null

    const hashText = crypto.createHmac("sha512", salt).update(plainText).digest("hex")

    return hashText
}

export default {
    getNewToken,
    hash,
    verifyToken
}