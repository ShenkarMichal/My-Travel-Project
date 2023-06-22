import express, { NextFunction, Request, Response } from 'express'
import UserModel from '../4-models/user-model'
import authLogic from '../5-logics/auth-logic'
import CredentialModel from '../4-models/credential-model'
import path from 'path'

const router = express.Router()

//Register
router.post("/register", async (request: Request, response: Response, next: NextFunction)=>{
    try {
        //Create user model from the body
        const user = new UserModel(request.body)
        const token = await authLogic.register(user)
    
        //Response the token
        response.status(201).json(token)        
    }
    catch (err: any) {
        next(err)        
    }
})

//Login
router.post("/login", async (request: Request, response: Response, next: NextFunction)=>{
    try {
        //Create credential model from the body
        const credential = new CredentialModel(request.body)
        const token = await authLogic.login(credential)
    
        //Response the token
        response.json(token)        
    }
    catch (err: any) {
        next(err)        
    }
})

//Password Recovery
router.post("/recovery/:email", async (request: Request, response: Response, next: NextFunction)=>{
    try {
        const email = request.params.email
        await authLogic.passwordRecovery(email)
    
        response.status(200).send("The email was successfully sent, please check your email-box")
    }
    catch (err: any) {
        next(err)        
    }
})

//Update user password:
router.post("/recovery/:email/:password", async (request: Request, response: Response, next: NextFunction)=>{
    try {
        const email = request.params.email
        const password = request.params.password
        await authLogic.updateUserPassword(email, password)
    
        response.status(200).send("The password has been succssefully update")
    }
    catch (err: any) {
        next(err)        
    }
})

//Update user details:
router.put("/user-update/:userID([0-9]+)", async (request: Request, response: Response, next: NextFunction)=>{
    try {
        const userID = +request.params.userID
        request.body.userID = userID 
        request.body.image = request.files?.image
        const user = new UserModel(request.body)
        const token = await authLogic.updateUserDetails(user)
    
        response.status(200).json(token)
    }
    catch (err: any) {
        next(err)        
    }
})

//Get user image:
router.get("/user-image/:userID([0-9]+)", async (request: Request, response: Response, next: NextFunction)=>{
    try {
        const userID = +request.params.userID
        const imageName = await authLogic.getUserImage(userID)
        if(!imageName) response.send(null)

        const image = path.join(__dirname, "..", "1-assets", "images","users", imageName)
        response.sendFile(image)
        }
    catch (err: any) {
        next(err)        
    }
})

export default router