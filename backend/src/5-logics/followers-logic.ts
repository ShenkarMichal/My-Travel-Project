import dal from "../2-utils/dal"
import dataUtils from "../2-utils/data-utils"
import { ResourceNotFoundErrorModel } from "../4-models/errors-model"

async function setNewFollow(userID:number, vacationID: number): Promise<void> {
    //If vacation is not exists:
    const vacationCount = await dataUtils.isDataExists(vacationID, "vacationID", "vacations")
    if(!vacationCount) throw new ResourceNotFoundErrorModel(vacationID)

    //If user is not exists:
    const userCount = await dataUtils.isDataExists(userID, "userID", "users")
    if(!userCount) throw new ResourceNotFoundErrorModel(userID)

    //Add follower:
    const sql = `INSERT INTO followers VALUES(?,?)`
    await dal.execute(sql, [userID, vacationID])    
}

async function deleteFollower(userID:number, vacationID: number): Promise<void> {
    //If vacation is not exists:
    const vacationCount = await dataUtils.isDataExists(vacationID, "vacationID", "vacations")
    if(!vacationCount) throw new ResourceNotFoundErrorModel(vacationID)
    
    //If user is not exists:
    const userCount = await dataUtils.isDataExists(userID, "userID", "users")
    if(!userCount) throw new ResourceNotFoundErrorModel(userID)
    
    //Delete follower:
    const sql = `DELETE FROM followers WHERE userID = ? AND vacationID = ?`
    await dal.execute(sql, [userID, vacationID])    
}

async function getAllVacationIDByUserID(userID:number): Promise<number[]> {
    //If user is not exists:
    const userCount = await dataUtils.isDataExists(userID, "userID", "users")
    if(!userCount) throw new ResourceNotFoundErrorModel(userID)

    //Get the vacation that followed by the user
    const sql = `SELECT vacationID FROM followers WHERE userID = ?`
    const vacationsID = await dal.execute(sql, [userID])
    return vacationsID    
}

async function getNumberOfFollowersByVacationID(vacationID:number): Promise<[]> {
    //If vacation is not exists:
    const vacationCount = await dataUtils.isDataExists(vacationID, "vacationID", "vacations")
    if(!vacationCount) throw new ResourceNotFoundErrorModel(vacationID)

    //Get the number of followers of this vacation:
    const sql = `SELECT COUNT(*) AS followersNumber, V.destination
                 FROM followers AS F JOIN vacations AS V
                 ON F.vacationID = V.vacationID
                 WHERE F.vacationID = ?`
    const followersNumber = await dal.execute(sql, [vacationID])
    return followersNumber    
}


export default {
    setNewFollow,
    deleteFollower,
    getAllVacationIDByUserID,
    getNumberOfFollowersByVacationID
}
