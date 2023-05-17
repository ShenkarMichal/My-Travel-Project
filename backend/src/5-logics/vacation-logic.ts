import dal from "../2-utils/dal";
import VacationModel from "../4-models/vacation-model";

async function getAllVacation(): Promise<VacationModel[]> {
    const sql = `SELECT vacationID, destination, description, DATE_FORMAT(startDate, '%d/%m/%Y') AS startDate, 
                        DATE_FORMAT(endDate, '%d/%m/%Y') AS endDate, price, imageName FROM vacations`
    const vacations = await dal.execute(sql)
    return vacations    
}

export default {
    getAllVacation
}