import express, { NextFunction, Request, Response } from 'express'
import vacationLogic from '../5-logics/vacation-logic'
import VacationModel from '../4-models/vacation-model'
import isLoggedIn from '../3-middlewares/is-logged-in'

const router = express.Router()

//Get all vacations
router.get("/vacations", async (request: Request, response: Response, next: NextFunction)=>{
    try {
        const vacations = await vacationLogic.getAllVacation()
        response.json(vacations)    
    }
    catch (err: any) {
        next(err)        
    }
})

//Get one specific vacation
router.get("/vacations/:vacationID([0-9]+)", async (request: Request, response: Response, next: NextFunction)=>{
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
router.post("/vacations", async (request: Request, response: Response, next: NextFunction)=>{
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
router.put("/vacations/:vacationID([0-9]+)",isLoggedIn, async (request: Request, response: Response, next: NextFunction)=>{
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
router.delete("/vacations/:vacationID([0-9]+)",isLoggedIn ,async (request: Request, response: Response, next: NextFunction)=>{
    try {
        const vacationID = +request.params.vacationID
        await vacationLogic.deleteVacation(vacationID)
        response.sendStatus(204)
    }
    catch (err: any) {
        next(err)        
    }
})



export default router