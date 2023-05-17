import express, { NextFunction, Request, Response } from 'express'
import UserModel from '../4-models/user-model'
import authLogic from '../5-logics/auth-logic'
import CredentialModel from '../4-models/credential-model'

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


export default router