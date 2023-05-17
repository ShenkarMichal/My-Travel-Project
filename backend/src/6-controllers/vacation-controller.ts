import express, { NextFunction, Request, Response } from 'express'
import vacationLogic from '../5-logics/vacation-logic'

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

export default router