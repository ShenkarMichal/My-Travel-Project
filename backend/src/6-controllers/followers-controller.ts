import express, { NextFunction, Request, Response } from 'express'
import followersLogic from '../5-logics/followers-logic'
import FollowersModel from '../4-models/followers-model'
import path from 'path'
import isAdmin from '../3-middlewares/is-admin'
import isLoggedIn from '../3-middlewares/is-logged-in'
import csvWriter from '../2-utils/csv-writer'

const router = express.Router()
//Get all followers:
router.get("/follow",isLoggedIn,async (requset:Request, response: Response, next: NextFunction) => {
    try {
        const followers = await followersLogic.getAllFollowers()
        response.json(followers)          
    }
    catch (err: any) {
        next(err)        
    }  
})

//Set new follower:
router.post("/follow/:userID([0-9]+)/:vacationID([0-9]+)",isLoggedIn,async (requset:Request, response: Response, next: NextFunction) => {
    try {
        const userID = +requset.params.userID
        const vacationID = +requset.params.vacationID

        const follower: FollowersModel = {userID, vacationID}
    
        await followersLogic.setNewFollow(follower) 
        response.sendStatus(201)          
    }
    catch (err: any) {
        next(err)        
    }  
})

//Delete follower:
router.delete("/follow/:userID([0-9]+)/:vacationID([0-9]+)",isLoggedIn,async (requset:Request, response: Response, next: NextFunction) => {
    try {
        const userID = +requset.params.userID
        const vacationID = +requset.params.vacationID

        const follower: FollowersModel = {userID, vacationID}
    
        await followersLogic.deleteFollower(follower)
        response.sendStatus(204)           
    }
    catch (err: any) {
        next(err)        
    } 
})

//Get all vacationsID by follower:
router.get("/vacation-of-follow/:userID([0-9]+)",isLoggedIn,async (requset:Request, response: Response, next: NextFunction) => {
    try {
        const userID = +requset.params.userID
        const vacationsID = await followersLogic.getAllVacationIDByUserID(userID)
        response.status(200).json(vacationsID)            
    }
    catch (err: any) {
        next(err)        
    }
})

//Get the number of followers by vacaionID:
router.get("/follow-of-vacation/:vacationID([0-9]+)",isLoggedIn,async (requset:Request, response: Response, next: NextFunction) => {
    try {
        const vacationID = +requset.params.vacationID
        const numberOfFollowers = await followersLogic.getNumberOfFollowersByVacationID(vacationID)
        response.status(200).json(numberOfFollowers)            
    }
    catch (err: any) {
        next(err)        
    }
})

//Get the csv-file download:
router.get("/follow-of-vacation/download",isAdmin,async (requset:Request, response: Response, next: NextFunction) => {
    try {
        const data = await followersLogic.getDataOfCsvFile()
        await csvWriter.writeCsv(data)  

        const filePath = path.join(__dirname, '..', '..','src', '1-assets', 'files', `output-${new Date().toDateString()}.csv`);
        response.download(filePath)
    }
    catch (err: any) {
        next(err)        
    }
})

//Get the report data:
router.get("/follow-of-vacation/report",isAdmin,async (requset:Request, response: Response, next: NextFunction) => {
    try {
        const data = await followersLogic.getDataOfCsvFile()
        response.json(data)
    }
    catch (err: any) {
        next(err)        
    }
})



 

export default router
