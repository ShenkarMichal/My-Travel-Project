import { UploadedFile } from 'express-fileupload'
import Joi from 'joi'

class VacationModel {
    public vacationID: number
    public destination: string
    public description: string
    public startDate: string
    public endDate: string
    public daysDiff: number
    public price: number
    public imageName: string
    public image: UploadedFile

    public constructor(vacation: VacationModel){
        this.vacationID = vacation.vacationID
        this.destination = vacation.destination
        this.description = vacation.description
        this.startDate = vacation.startDate
        this.endDate = vacation.endDate
        this.daysDiff = vacation.daysDiff
        this.price = vacation.price
        this.imageName = vacation.imageName
        this.image = vacation.image
    }

    public static validationSchema = Joi.object({
        vacationID: Joi.number().optional().integer().positive() ,
        destination: Joi.string().required().min(5).max(35),
        description: Joi.string().required().min(5).max(300),
        startDate: Joi.date().min(Joi.ref('now')).required(),
        endDate: Joi.date().min(Joi.ref('startDate')).required(),
        daysDiff: Joi.number().optional().integer().positive(),
        price: Joi.number().required().min(0).max(10000).positive(),
        imageName: Joi.string().required().valid('image/jpg', 'image/png'), //The file must be with jpg/png extention.
        image: Joi.object({
            size: Joi.number().max(10 * 1024 * 1024).required(), //The file size nust be less than 5mb
          }).required(),
    })

    public validate(): string {
        const resoult = VacationModel.validationSchema.validate(this)
        return resoult.error?.message
    }
}

export default VacationModel

