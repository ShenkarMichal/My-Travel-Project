import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import VacationModel from "../4-models/vacation-model";
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/errors-model";
import { v4 as uuid } from "uuid";
import fs from "fs";
import ContinentModel from "../4-models/continent-model";
import dataUtils from "../2-utils/data-utils";

//Get all vacations:
async function getAllVacation(userID: number): Promise<VacationModel[]> {
    const sql = `SELECT V.vacationID, V.destination, V.continentID, V.description, DATE_FORMAT(V.startDate, '%d/%m/%Y') AS startDate,
                        DATE_FORMAT(V.endDate, '%d/%m/%Y') AS endDate, DATEDIFF(V.endDate, V.startDate) AS duration, V.price,
                        V.imageName, C.continentName, IF(F.userID IS NOT NULL, 1, 0) AS isFollow
                        FROM vacations AS V JOIN continents AS C ON V.continentID = C.continentID
                            LEFT JOIN followers AS F ON V.vacationID = F.vacationID AND F.userID = ?
                        ORDER BY V.startDate, V.endDate`
    const vacations = await dal.execute(sql, [userID])
    return vacations    
}

//Add new vacation:
async function addNewVacation(vacation:VacationModel): Promise<VacationModel> {
    //Validatoin:
    const err = vacation.validate()
    if(err) throw new ValidationErrorModel(err)
    
    //Generate imagName:
    generateImageName(vacation)

    //Add the vacation into database:
    const sql = `INSERT INTO vacations VALUES(DEFAULT, ?,?,?,?,?,?,?,?)`
    const info:OkPacket = await dal.execute(sql, [vacation.destination,vacation.continentID, vacation.description, vacation.startDate,
                                                vacation.endDate, vacation.duration, vacation.price, vacation.imageName])
    vacation.vacationID = info.insertId

    //Get the new vacation:
    const newVacation = await getOneVacation(vacation.vacationID)
    return newVacation
}

//Update vacation:
async function updateVacation(vacation:VacationModel): Promise<VacationModel> {
    //Validation:
    const err = vacation.validate()
    if(err) {
        //On update the user can insert a past-date:
        if(err !== '"startDate" must be greater than or equal to "now"'){
            throw new ValidationErrorModel(err)
        }
    }

    const imageName = await getVacationImageName(vacation.vacationID)

    if(vacation.image){
        //Generate imageName:
        generateImageName(vacation)
        //Delete the current image from folder:
        await deleteImageFile(imageName)
    }    
    else {
        vacation.imageName = imageName
    }

    //Update the vacation in database:
    const sql = `UPDATE vacations 
                SET destination = ?, continentID = ?, description = ?, startDate = ?, endDate = ?, duration = ?, price = ?, imageName = ?
                WHERE vacationID = ?`
    const info: OkPacket = await dal.execute(sql, [vacation.destination,vacation.continentID, vacation.description, vacation.startDate, vacation.endDate, 
                                                    vacation.duration, vacation.price, vacation.imageName, vacation.vacationID])
    if(info.affectedRows === 0) throw new ResourceNotFoundErrorModel(vacation.vacationID)

    //Get the new vacation:
    const newVacation = await getOneVacation(vacation.vacationID)
    return newVacation
}

//Get one specific vacation:
async function getOneVacation(vacationID:number): Promise<VacationModel> {
    const sql = `SELECT V.vacationID, V.destination, V.continentID, V.description, DATE_FORMAT(V.startDate, '%d/%m/%Y') AS startDate,
                DATE_FORMAT(V.endDate, '%d/%m/%Y') AS endDate, DATEDIFF(V.endDate, V.startDate) AS duration, V.price,
                V.imageName, C.continentName, IF(F.userID IS NOT NULL, 1, 0) AS isFollow
                FROM vacations AS V JOIN continents AS C ON V.continentID = C.continentID
                LEFT JOIN followers AS F ON V.vacationID = F.vacationID AND F.userID = 0
                WHERE V.vacationID = ?`
    const resoult = await dal.execute(sql, [vacationID ])
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

//Get vacation-image-name:
async function getVacationImageName(vacationID:number): Promise<string> {
    const sql = `SELECT imageName FROM vacations WHERE vacationID = ?`
    const resoult = await dal.execute(sql, [vacationID])
    const imageName = resoult[0].imageName
    
    //If id not exists:
    if(!imageName) throw new ResourceNotFoundErrorModel(vacationID)
    return imageName    
}

//Get vacations by continent:
async function getVacationsByContinent(continentID:number, userID: number): Promise<VacationModel[]> {
    const sql = `SELECT V.vacationID, V.destination, V.continentID, V.description, DATE_FORMAT(V.startDate, '%d/%m/%Y') AS startDate,
                DATE_FORMAT(V.endDate, '%d/%m/%Y') AS endDate, DATEDIFF(V.endDate, V.startDate) AS duration, V.price,
                V.imageName, C.continentName, IF(F.userID IS NOT NULL, 1, 0) AS isFollow
                FROM vacations AS V JOIN continents AS C ON V.continentID = C.continentID
                LEFT JOIN followers AS F ON V.vacationID = F.vacationID AND F.userID = ?
                WHERE V.continentID = ?
                ORDER BY V.startDate, V.endDate`
    const vacations = await dal.execute(sql, [userID,continentID])
    return vacations    
}

//Get all continents:
async function getAllContinents(): Promise<ContinentModel[]> {
    const sql = `SELECT * FROM continents`
    const continents = await dal.execute(sql)
    return continents    
}

//Get continent-image-name:
async function getContinentImageName(continentName:string): Promise<string> {
    const sql = `SELECT continentImageName FROM continents WHERE continentName = ?`
    const resoult = await dal.execute(sql, [continentName])
    const imageName = resoult[0].continentImageName

    return imageName    
}

//Get all future-vacations:
async function getFutureVacations(userID: number): Promise<VacationModel[]> { 
    const sql = `SELECT V.vacationID, V.destination, V.continentID, V.description, DATE_FORMAT(V.startDate, '%d/%m/%Y') AS startDate, 
                DATE_FORMAT(V.endDate, '%d/%m/%Y') AS endDate, DATEDIFF(V.endDate, V.startDate) AS duration, V.price, V.imageName,
                IF(F.userID IS NOT NULL, 1, 0) AS isFollow
                FROM vacations AS V JOIN followers AS F ON V.vacationID = F.vacationID AND F.userID = ?
                WHERE V.startDate > CURRENT_DATE
                ORDER BY V.startDate, V.endDate`
    const vacations = await dal.execute(sql, [userID])
    return vacations    
}

//Get current vacations:
async function getCurrentVacations(userID: number): Promise<VacationModel[]> {
    const sql = `SELECT V.vacationID, V.destination, V.continentID, V.description, DATE_FORMAT(V.startDate, '%d/%m/%Y') AS startDate, 
                DATE_FORMAT(V.endDate, '%d/%m/%Y') AS endDate, DATEDIFF(V.endDate, V.startDate) AS duration, V.price, V.imageName,
                IF(F.userID IS NOT NULL, 1, 0) AS isFollow
                FROM vacations AS V JOIN followers AS F ON V.vacationID = F.vacationID AND F.userID = ?
                WHERE V.startDate <= CURRENT_DATE && V.endDate >= CURRENT_DATE
                ORDER BY V.startDate, V.endDate`
    const vacations = await dal.execute(sql, [userID])

    return vacations    
}

//Get vacations by user:
async function getVacationsByUser(userID:number): Promise<VacationModel> {
    //If user is not exists:
    const userCount = await dataUtils.isDataExists(userID, "userID", "users")
    if(!userCount) throw new ResourceNotFoundErrorModel(userID)

    //Get the vacations from database:
    const sql = `SELECT V.vacationID, V.destination, V.continentID, V.description, DATE_FORMAT(V.startDate, '%d/%m/%Y') AS startDate, 
                DATE_FORMAT(V.endDate, '%d/%m/%Y') AS endDate, DATEDIFF(V.endDate, V.startDate) AS duration, V.price, V.imageName,
                IF(F.userID IS NOT NULL, 1, 0) AS isFollow
                FROM vacations AS V JOIN followers AS F
                ON V.vacationID = F.VacationID AND F.userID = ?
                WHERE F.userID = ?
                ORDER BY V.startDate, V.endDate`
    const vacations = await dal.execute(sql, [userID,userID])
    return vacations       
}

//Utilities function of saving and deleting images:
function generateImageName(vacation: VacationModel):void {
    //Generate new imageName:
    const extention = vacation.image.name.substring(vacation.image.name.lastIndexOf("."))
    vacation.imageName = uuid() + extention

    //Save the image into folder
    vacation.image.mv("./src/1-assets/images/vacations/" + vacation.imageName)

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
    getVacationImageName,
    getVacationsByContinent,
    getAllContinents,
    getContinentImageName,
    getFutureVacations,
    getCurrentVacations,
    getVacationsByUser
}