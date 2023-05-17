import express, { NextFunction, Request, Response } from 'express'
import vacationLogic from '../5-logics/vacation-logic'
import VacationModel from '../4-models/vacation-model'

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

export default router