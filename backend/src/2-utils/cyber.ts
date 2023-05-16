import Jwt from 'jsonwebtoken'
import UserModel from '../4-models/user-model';
import crypto from 'crypto'

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

const salt = "myTravelSalt"
function hash(plainText: string): string {
    if(!plainText) return null

    const hashText = crypto.createHmac("sha512", salt).update(plainText).digest("hex")

    return hashText
}

export default {
    getNewToken,
    hash
}