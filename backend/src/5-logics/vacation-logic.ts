import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import VacationModel from "../4-models/vacation-model";
import { ValidationErrorModel } from "../4-models/errors-model";
import { v4 as uuid } from "uuid";

async function getAllVacation(): Promise<VacationModel[]> {
    const sql = `SELECT vacationID, destination, description, DATE_FORMAT(startDate, '%d/%m/%Y') AS startDate, 
                        DATE_FORMAT(endDate, '%d/%m/%Y') AS endDate,DATEDIFF(endDate, startDate) AS daysDiff, price, imageName FROM vacations`
    const vacations = await dal.execute(sql)
    return vacations    
}

async function addNewVacation(vacation:VacationModel): Promise<VacationModel> {
    //Validatoin:
    const err = vacation.validate()
    if(err) throw new ValidationErrorModel(err)

    //Generate new imageName:
    const extention = vacation.image.name.substring(vacation.image.name.lastIndexOf("."))
    vacation.imageName = uuid() + extention

    //Save the image into folder
    await vacation.image.mv(`./src/1-assets/images/vacations/` + vacation.imageName)

    //Delete image from vacation-model:
    delete vacation.image

    //Add the vacation into database:
    const sql = `INSERT INTO vacations VALUES(DEFAULT, ?,?,?,?,?,?,?)`
    const info:OkPacket = await dal.execute(sql, [vacation.destination, vacation.description, vacation.startDate,
                                                vacation.endDate, vacation.daysDiff, vacation.price, vacation.imageName])
    vacation.vacationID = info.insertId
    return vacation    
}

export default {
    getAllVacation,
    addNewVacation
}