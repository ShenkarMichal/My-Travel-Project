import axios from "axios"
import { VacationsActionType, vacationsStore } from "../3-Redux/VacationsState"
import VacationModel from "../4-Models/VacationModel"
import appConfig from "../2-Utils/Config"

class VacationsService {

    //Get all vacations:
    public async getAllVacation(): Promise<VacationModel[]> {

        let vacations = vacationsStore.getState().vacations
        //If the store is empty:
        if(vacations.length === 0){
            const response = await axios.get<VacationModel[]>(appConfig.vacationURL)
            vacations = response.data
            vacationsStore.dispatch({type: VacationsActionType.GetAllVacations, payload: vacations})
        }
        return vacations        
    }

    //Add new vacation:
    public async addNewVacation(vacation:VacationModel): Promise<void> {

        const response = await axios.post<VacationModel>(appConfig.vacationURL, vacation)
        const newVacation = response.data

        //Add the new vacation to the store:
        vacationsStore.dispatch({type: VacationsActionType.AddNewVacation, payload: newVacation})
    }

    //Update vacation:
    public async updateVacation(vacation:VacationModel): Promise<void> {

        const response = await axios.put<VacationModel>(appConfig.vacationURL, vacation)
        const newVacation = response.data

        //Update the vacation in the store:
        vacationsStore.dispatch({type: VacationsActionType.UpdateVacation, payload:newVacation})
    }

    //Get one specific vacation:
    public async getOneVacation(vacationID:number): Promise<VacationModel> {

        let vacation = vacationsStore.getState().vacations.find(v => v.vacationID === vacationID)
        //If the vacation is not exists in the store:
        if(!vacation){
            const response = await axios.get<VacationModel>(appConfig.vacationURL + vacationID)
            vacation = response.data            
        }

        return vacation
    }

    //Delete vacation:
    public async deleteVacation(vacationID:number): Promise<void> {

        await axios.delete(appConfig.vacationURL + vacationID)
        //Delete vacation from the store:
        vacationsStore.dispatch({type: VacationsActionType.deleteVacation, payload: vacationID})
    }
}

const vacationService = new VacationsService()
export default vacationService