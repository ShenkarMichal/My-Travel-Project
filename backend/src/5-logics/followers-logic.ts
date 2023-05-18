import dal from "../2-utils/dal"

async function setNewFollow(userID:number, vacationID: number): Promise<void> {
    const sql = `INSERT INTO followers VALUES(?,?)`
    await dal.execute(sql, [userID, vacationID])    
}

async function deleteFollower(userID:number, vacationID: number): Promise<void> {
    const sql = `DELETE FROM followers WHERE userID = ? AND vacationID = ?`
    await dal.execute(sql, [userID, vacationID])    
}

async function getAllVacationIDByUserID(userID:number): Promise<number[]> {
    const sql = `SELECT vacationID FROM followers WHERE userID = ?`
    const vacationsID = await dal.execute(sql, [userID])
    return vacationsID    
}

async function getNumberOfFollowersByVacationID(vacationID:number): Promise<number> {
    const sql = `SELECT COUNT(*) AS followersNumber FROM followers WHERE vacationID = ?`
    const resoult = await dal.execute(sql, [vacationID])
    const followersNumber = resoult[0].followersNumber
    return followersNumber    
}

export default {
    setNewFollow,
    deleteFollower,
    getAllVacationIDByUserID,
    getNumberOfFollowersByVacationID
}
