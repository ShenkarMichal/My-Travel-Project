import express, { NextFunction, Request, Response } from 'express'
import vacationLogic from '../5-logics/vacation-logic'
import VacationModel from '../4-models/vacation-model'
import isLoggedIn from '../3-middlewares/is-logged-in'
import path from 'path'
import isAdmin from '../3-middlewares/is-admin'
import UserModel from '../4-models/user-model'
import dataUtils from '../2-utils/data-utils'

const router = express.Router()

//Get all vacations
router.get("/vacations/:userID([0-9]+)", isLoggedIn, async (request: Request, response: Response, next: NextFunction)=>{
    try {
        const userID = +request.params.userID
        const vacations = await vacationLogic.getAllVacation(userID)
        response.json(vacations)    
    }
    catch (err: any) {
        next(err)        
    }
})

//Get one specific vacation
router.get("/vacation/:vacationID([0-9]+)", isLoggedIn, async (request: Request, response: Response, next: NextFunction)=>{
    try {
        const vacationID = +request.params.vacationID
        const vacation = await vacationLogic.getOneVacation(vacationID)
        response.json(vacation)    
    }
    catch (err: any) {
        next(err)        
    }
})

//Add new vacation
router.post("/vacations",isAdmin, async (request: Request, response: Response, next: NextFunction)=>{
    try {
        request.body.image = request.files?.image
        const vacation = new VacationModel(request.body)
        const newVacation = await vacationLogic.addNewVacation(vacation)
        response.status(201).json(newVacation)    
    }
    catch (err: any) {
        next(err)        
    }
})

//Update vacation
router.put("/vacations/:vacationID([0-9]+)",isAdmin, async (request: Request, response: Response, next: NextFunction)=>{
    try {
        request.body.image = request.files?.image
        request.body.vacationID = +request.params.vacationID
        const vacation = new VacationModel(request.body)
        const newVacation = await vacationLogic.updateVacation(vacation)
        response.status(200).json(newVacation)    
    }
    catch (err: any) {
        next(err)        
    }
})

//Delete vacation
router.delete("/vacations/:vacationID([0-9]+)", isAdmin ,async (request: Request, response: Response, next: NextFunction)=>{
    try {
        const vacationID = +request.params.vacationID
        await vacationLogic.deleteVacation(vacationID)
        response.sendStatus(204)
    }
    catch (err: any) {
        next(err)        
    }
})

//Serve the vacation image to the user:
router.get("/vacations-images/:vacationID([0-9]+)" ,isLoggedIn,async (request: Request, response: Response, next: NextFunction)=>{
    try {
        const vacationID = +request.params.vacationID
        const imageName = await vacationLogic.getVacationImageName(vacationID)
        const image = path.join(__dirname, "..", "1-assets", "images","vacations", imageName)
        response.sendFile(image)
    }
    catch (err: any) {
        next(err)        
    }
})

//Get vacations by continent:
router.get("/vacations/by-continent/:continentID([0-9]+)/:userID([0-9]+)", isLoggedIn ,async (request: Request, response: Response, next: NextFunction)=>{
    try {
        const continentID = +request.params.continentID
        const userID = +request.params.userID
        const vacations = await vacationLogic.getVacationsByContinent(continentID, userID)
        response.json(vacations)
    }
    catch (err: any) {
        next(err)        
    }
})

//Get all continents:
router.get("/vacations/continents", isLoggedIn ,async (request: Request, response: Response, next: NextFunction)=>{
    try {
        const continents = await vacationLogic.getAllContinents()
        response.json(continents)
    }
    catch (err: any) {
        next(err)        
    }
})

//Serve the continent image to the user:
router.get("/vacations/continent-images/:continentName", isLoggedIn,async (request: Request, response: Response, next: NextFunction)=>{
    try {
        const continentName = request.params.continentName
        const imageName = await vacationLogic.getContinentImageName(continentName)
        const image = path.join(__dirname, "..", "1-assets", "images","continents", imageName)
        response.sendFile(image)
    }
    catch (err: any) {
        next(err)        
    }
})

//Get the future vacations:
router.get("/vacations/by-date/future/:userID([0-9]+)", isLoggedIn,async (request: Request, response: Response, next: NextFunction)=>{
    try {
        const userID = +request.params.userID
        const futureVacations = await vacationLogic.getFutureVacations(userID)
        response.json(futureVacations)
    }
    catch (err: any) {
        next(err)        
    }
})

//Get the current vacations:
router.get("/vacations/by-date/current/:userID([0-9]+)", isLoggedIn,async (request: Request, response: Response, next: NextFunction)=>{
    try {
        const userID = + request.params.userID
        const currentVacations = await vacationLogic.getCurrentVacations(userID)
        response.json(currentVacations)
    }
    catch (err: any) {
        next(err)        
    }
})

//Get vacations by userID:
router.get("/vacations/by-user/:userID([0-9]+)", isLoggedIn, async (requset:Request, response: Response, next: NextFunction) => {
    try {
        const userID = +requset.params.userID
        const vacations = await vacationLogic.getVacationsByUser(userID)
        response.status(200).json(vacations)            
    }
    catch (err: any) {
        next(err)        
    }
})

//Get weather by loacation:
router.get("/weather/:lat/:lng", isLoggedIn, async (requset:Request, response: Response, next: NextFunction) => {
    try {
        const lat = +requset.params.lat
        const lng = +requset.params.lng
        const weather = await dataUtils.getWeather(lat, lng)
        response.status(200).json(weather)            
    }
    catch (err: any) {
        next(err)        
    }
})

//Get local time:
router.get("/time/:lat/:lng", isLoggedIn, async (requset:Request, response: Response, next: NextFunction) => {
    try {
        const lat = +requset.params.lat
        const lng = +requset.params.lng
        const time = await dataUtils.getLocalTime(lat, lng)
        response.status(200).json(time)            
    }
    catch (err: any) {
        next(err)        
    }
})


export default router