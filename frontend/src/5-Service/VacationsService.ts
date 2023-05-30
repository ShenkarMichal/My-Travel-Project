import axios from "axios"
import { VacationsActionType, vacationsStore } from "../3-Redux/VacationsState"
import VacationModel from "../4-Models/VacationModel"
import appConfig from "../2-Utils/Config"
import ContinentModel from "../4-Models/ContinentModel"
import { ContinentsActionType, continentsStore } from "../3-Redux/ContinentsState"

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

        const vacationFormData = new FormData()
        
        vacationFormData.append("destination", vacation.destination)
        vacationFormData.append("description", vacation.description)
        vacationFormData.append("continentID", vacation.continentID.toLocaleString())
        vacationFormData.append("price", vacation.price.toLocaleString())
        vacationFormData.append("startDate", vacation.startDate.toLocaleString())
        vacationFormData.append("endDate", vacation.endDate.toLocaleString())
        vacationFormData.append("image", vacation.image[0])

        const response = await axios.post<VacationModel>(appConfig.vacationURL, vacationFormData)
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

    //Get vacations by continent:
    public async getVacationsByContinent(continentID: number): Promise<VacationModel[]> {

        let vacations = vacationsStore.getState().vacations.filter(v => v.continentID === continentID)
        //If the vacations are not exist in the store:
        if(vacations.length === 0){
            const response = await axios.get<VacationModel[]>(appConfig.vacationsByContinent + continentID)
            vacations = response.data
        }

        return vacations
    }

    //Get all continents:
    public async getAllContinents(): Promise<ContinentModel[]>{

        let continents = continentsStore.getState().continents
        //If the store is empty:
        if(continents.length === 0) {
            const response = await axios.get<ContinentModel[]>(appConfig.continentsURL)
            continents = response.data
            //Save the continents in tthe store:
            continentsStore.dispatch({type: ContinentsActionType.GetAllContinents, payload: continents})
        }
        return continents
    }
}

const vacationService = new VacationsService()
export default vacationService