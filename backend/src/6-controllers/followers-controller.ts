import express, { NextFunction, Request, Response } from 'express'
import followersLogic from '../5-logics/followers-logic'

const router = express.Router()

//Set new follower:
router.post("/follow/:userID([0-9]+)/:vacationID([0-9]+)",async (requset:Request, response: Response, next: NextFunction) => {
    try {
        const userID = +requset.params.userID
        const vacationID = +requset.params.vacationID
    
        await followersLogic.setNewFollow(userID, vacationID) 
        response.sendStatus(201)          
    }
    catch (err: any) {
        next(err)        
    }  
})

//Delete follower:
router.delete("/follow/:userID([0-9]+)/:vacationID([0-9]+)",async (requset:Request, response: Response, next: NextFunction) => {
    try {
        const userID = +requset.params.userID
        const vacationID = +requset.params.vacationID
    
        await followersLogic.deleteFollower(userID, vacationID)
        response.sendStatus(204)           
    }
    catch (err: any) {
        next(err)        
    } 
})

//Get all vacationsID by follower:
router.get("/vacation-of-follow/:userID([0-9]+)",async (requset:Request, response: Response, next: NextFunction) => {
    try {
        const userID = +requset.params.userID
        const vacationsID = await followersLogic.getAllVacationIDByUserID(userID)
        response.status(200).json(vacationsID)            
    }
    catch (err: any) {
        next(err)        
    }
})



export default router
