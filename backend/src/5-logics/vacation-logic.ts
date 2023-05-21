import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import VacationModel from "../4-models/vacation-model";
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/errors-model";
import { v4 as uuid } from "uuid";
import fs from "fs";

//Get all vacations:
async function getAllVacation(): Promise<VacationModel[]> {
    const sql = `SELECT vacationID, destination, description, DATE_FORMAT(startDate, '%d/%m/%Y') AS startDate, 
                        DATE_FORMAT(endDate, '%d/%m/%Y') AS endDate,DATEDIFF(endDate, startDate) AS daysDiff, price, imageName FROM vacations`
    const vacations = await dal.execute(sql)
    return vacations    
}

//Add new vacation:
async function addNewVacation(vacation:VacationModel): Promise<VacationModel> {
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

    //Get the new vacation:
    const newVacation = await getOneVacation(vacation.vacationID)
    return newVacation
}

//Update vacation:
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

    //Get the new vacation:
    const newVacation = await getOneVacation(vacation.vacationID)
    return newVacation
}

//Get one specific vacation:
async function getOneVacation(vacationID:number): Promise<VacationModel> {
    const sql = `SELECT vacationID, destination, description, DATE_FORMAT(startDate, '%d/%m/%Y') AS startDate, 
                DATE_FORMAT(endDate, '%d/%m/%Y') AS endDate,DATEDIFF(endDate, startDate) AS daysDiff, price, imageName 
                FROM vacations WHERE vacationID = ?`
    const resoult = await dal.execute(sql, [vacationID])
    const vacation = resoult[0]
    //If the id is not exists:
    if(!vacation) throw new ResourceNotFoundErrorModel(vacationID)

    return vacation    
}

//Delete vacation:
async function deleteVacation(vacationID:number): Promise<void> {
    //Delete image from folder:
    const resoult = await dal.execute(`SELECT imageName FROM vacations WHERE vacationID = ?`, [vacationID])
    const imageName = resoult[0]?.imageName
    await deleteImageFile(imageName)

    //Delete vacation from database:
    const sql = `DELETE FROM vacations WHERE vacationID = ?`
    const info: OkPacket = await dal.execute(sql, [vacationID])
    //If id is not exists:
    if(info.affectedRows === 0) throw new ResourceNotFoundErrorModel(vacationID)     
}

//Get image-name:
async function getImageName(vacationID:number): Promise<string> {
    const sql = `SELECT imageName FROM vacations WHERE vacationID = ?`
    const resoult = await dal.execute(sql, [vacationID])
    const imageName = resoult[0].imageName
    //If id not exists:
    if(!imageName) throw new ResourceNotFoundErrorModel(vacationID)
    return imageName    
}

//Utilities function of saving and deleting images:
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
        fs.unlinkSync("./src/1-assets/images/vacations/" + imageName);
    }     
}

export default {
    getAllVacation,
    getOneVacation,
    addNewVacation, 
    updateVacation,
    deleteVacation,
    getImageName
}