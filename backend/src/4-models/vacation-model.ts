import { UploadedFile } from 'express-fileupload'
import Joi from 'joi'

class VacationModel {
    public vacationID: number
    public destination: string
    public continentID: number
    public description: string
    public startDate: string
    public endDate: string
    public duration: number
    public price: number
    public imageName: string
    public image: UploadedFile

    public constructor(vacation: VacationModel){
        this.vacationID = vacation.vacationID
        this.destination = vacation.destination
        this.continentID = vacation.continentID
        this.description = vacation.description
        this.startDate = vacation.startDate
        this.endDate = vacation.endDate
        this.duration = vacation.duration
        this.price = vacation.price
        this.imageName = vacation.imageName
        this.image = vacation.image
    }

    public static validationSchema = Joi.object({
        vacationID: Joi.number().optional().integer().positive() ,
        destination: Joi.string().required().min(5).max(35),
        continentID: Joi.number().required().integer().positive().min(1).max(7),
        description: Joi.string().required().min(5).max(300),
        startDate: Joi.date().iso().min('now').required(),
        endDate: Joi.date().iso().min(Joi.ref('startDate')).required(),
        duration: Joi.number().optional().integer().positive(),
        price: Joi.number().required().min(0).max(10000).positive(),
        imageName: Joi.string().optional().valid('image/*'), //The file must be an image file
        image: Joi.object({
            size: Joi.number().max(10 * 1024 * 1024).required(), //The file size nust be less than 5mb
          }).optional().options({stripUnknown: true}),
    })

    public validate(): string {
        const resoult = VacationModel.validationSchema.validate(this)
        
        return resoult.error.message
    }
}

export default VacationModel

