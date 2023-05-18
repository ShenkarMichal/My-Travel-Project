import express, { NextFunction, Request, Response } from 'express'
import followersLogic from '../5-logics/followers-logic'

const router = express.Router()

//Set new follower:
router.post("/follow/:userID([0-9]+)/:vacationID([0-9]+)",async (requset:Request, response: Response, next: NextFunction) => {
    const userID = +requset.params.userID
    const vacationID = +requset.params.vacationID

    await followersLogic.setNewFollow(userID, vacationID) 
    response.sendStatus(200)    
})

//Delete follower:
router.delete("/follow/:userID([0-9]+)/:vacationID([0-9]+)",async (requset:Request, response: Response, next: NextFunction) => {
    const userID = +requset.params.userID
    const vacationID = +requset.params.vacationID

    await followersLogic.deleteFollower(userID, vacationID)
    response.sendStatus(204)    
})

export default router
