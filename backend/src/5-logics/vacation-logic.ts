import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import VacationModel from "../4-models/vacation-model";
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/errors-model";
import { v4 as uuid } from "uuid";
import fs from "fs";

async function getAllVacation(): Promise<VacationModel[]> {
    const sql = `SELECT vacationID, destination, description, DATE_FORMAT(startDate, '%d/%m/%Y') AS startDate, 
                        DATE_FORMAT(endDate, '%d/%m/%Y') AS endDate,DATEDIFF(endDate, startDate) AS daysDiff, price, imageName FROM vacations`
    const vacations = await dal.execute(sql)
    return vacations    
}

async function addNewVacation(vacation:VacationModel): Promise<VacationModel> {
    console.log(vacation.startDate)
    //Validatoin:
    const err = vacation.validate()
    if(err) throw new ValidationErrorModel(err)
    
    //Generate imagName:
    await generateImageName(vacation)

    //Add the vacation into database:
    const sql = `INSERT INTO vacations VALUES(DEFAULT, ?,?,?,?,?,?,?)`
    const info:OkPacket = await dal.execute(sql, [vacation.destination, vacation.description, vacation.startDate,
                                                vacation.endDate, vacation.daysDiff, vacation.price, vacation.imageName])
    vacation.vacationID = info.insertId

    //Calculate the dateDiff
    const daysDiff = await dal.execute(`SELECT DATEDIFF(endDate, startDate) AS daysDiff FROM vacations WHERE vacationID = ${vacation.vacationID}`)
    vacation.daysDiff = daysDiff[0].daysDiff

    return vacation    
}

async function updateVacation(vacation:VacationModel): Promise<VacationModel> {
    //Validation:
    const err = vacation.validate()
    if(err) throw new ValidationErrorModel(err)

    //Generate imageName:
    await generateImageName(vacation)

    //Delete the current image from folder:
    await deleteImageFile(vacation.imageName)

    //Update the vacation in database:
    const sql = `UPDATE vacations 
                SET destination = ?, description = ?, startDate = ?, endDate = ?, daysDiff = ?, price = ?, imageName = ?
                WHERE vacationID = ?`
    const info: OkPacket = await dal.execute(sql, [vacation.destination, vacation.description, vacation.startDate, vacation.endDate, 
                                                    vacation.daysDiff, vacation.price, vacation.imageName, vacation.vacationID])
    if(info.affectedRows === 0) throw new ResourceNotFoundErrorModel(vacation.vacationID)

    //Return the new vacation
    const resoult = await dal.execute(`SELECT * FROM vacations WHERE vacationID = ${vacation.vacationID}`)
    return resoult[0]
}

async function generateImageName(vacation: VacationModel):Promise<void> {
    //Generate new imageName:
    const extention = vacation.image.name.substring(vacation.image.name.lastIndexOf("."))
    vacation.imageName = uuid() + extention

    //Save the image into folder
    await vacation.image.mv("./src/1-assets/images/vacations/" + vacation.imageName)

    //Delete image from vacation-model:
    delete vacation.image
}

async function deleteImageFile(imageName:string): Promise<void> {
    if (fs.existsSync("./src/1-assets/images/vacations/" + imageName)) {

        // Delete it:
        fs.unlinkSync("./src/1-assets/images/" + imageName);
    } 
    
}

export default {
    getAllVacation,
    addNewVacation, 
    updateVacation
}