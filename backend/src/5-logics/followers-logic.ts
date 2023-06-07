import csvWriter from "../2-utils/csv-writer"
import dal from "../2-utils/dal"
import dataUtils from "../2-utils/data-utils"
import { ResourceNotFoundErrorModel } from "../4-models/errors-model"
import FollowersModel from "../4-models/followers-model"
import VacationModel from "../4-models/vacation-model"

async function setNewFollow(follower: FollowersModel): Promise<void> {
    //If vacation is not exists:
    const vacationCount = await dataUtils.isDataExists(follower.vacationID, "vacationID", "vacations")
    if(!vacationCount) throw new ResourceNotFoundErrorModel(follower.vacationID)

    //If user is not exists:
    const userCount = await dataUtils.isDataExists(follower.userID, "userID", "users")
    if(!userCount) throw new ResourceNotFoundErrorModel(follower.userID)

    //Add follower:
    const sql = `INSERT INTO followers VALUES(?,?)`
    await dal.execute(sql, [follower.userID, follower.vacationID])    
}

async function getAllFollowers():Promise<FollowersModel[]> {

    const sql = "SELECT * FROM followers"
    const followers = await dal.execute(sql)
    return followers    
}

async function deleteFollower(follower: FollowersModel): Promise<void> {
    //If vacation is not exists:
    const vacationCount = await dataUtils.isDataExists(follower.vacationID, "vacationID", "vacations")
    if(!vacationCount) throw new ResourceNotFoundErrorModel(follower.vacationID)
    
    //If user is not exists:
    const userCount = await dataUtils.isDataExists(follower.userID, "userID", "users")
    if(!userCount) throw new ResourceNotFoundErrorModel(follower.userID)
    
    //Delete follower:
    const sql = `DELETE FROM followers WHERE userID = ? AND vacationID = ?`
    await dal.execute(sql, [follower.userID, follower.vacationID])    
}

async function getAllVacationIDByUserID(userID:number): Promise<[]> {
    //If user is not exists:
    const userCount = await dataUtils.isDataExists(userID, "userID", "users")
    if(!userCount) throw new ResourceNotFoundErrorModel(userID)

    //Get the vacation that followed by the user
    const sql = `SELECT vacationID FROM followers WHERE userID = ?`
    const vacationsID = await dal.execute(sql, [userID])
    return vacationsID    
}

async function getNumberOfFollowersByVacationID(vacationID:number): Promise<number> {
    //If vacation is not exists:
    const vacationCount = await dataUtils.isDataExists(vacationID, "vacationID", "vacations")
    if(!vacationCount) throw new ResourceNotFoundErrorModel(vacationID)

    //Get the number of followers of this vacation:
    const sql = `SELECT COUNT(*) AS followersNumber
                 FROM followers 
                 WHERE vacationID = ?`
    const followersNumber = await dal.execute(sql, [vacationID])
    return followersNumber[0].followersNumber  
}

async function getDataOfCsvFile(): Promise<string> {
    const sql = `SELECT V.destination, COUNT(F.vacationID) AS followers_count
                FROM vacations AS V
                JOIN followers AS F
                ON V.vacationID = F.vacationID
                GROUP BY V.destination`
    const data = await dal.execute(sql)
    const now = await csvWriter.writeCsv(data)  
    return now  
}

export default {
    getAllFollowers,
    setNewFollow,
    deleteFollower,
    getAllVacationIDByUserID,
    getNumberOfFollowersByVacationID,
    getDataOfCsvFile
}
