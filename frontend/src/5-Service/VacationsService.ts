import axios from "axios"
import { VacationsActionType, vacationsStore } from "../3-Redux/VacationsState"
import VacationModel from "../4-Models/VacationModel"
import appConfig from "../2-Utils/Config"
import ContinentModel from "../4-Models/ContinentModel"
import { ContinentsActionType, continentsStore } from "../3-Redux/ContinentsState"
import followersService from "./FollowersService"

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
        //If the user refresh the app:
        let vacations = vacationsStore.getState().vacations
        if(vacations.length === 0){
            this.getAllVacation()
        }

        console.log(vacation)

        //Use Form-Data for attach files:
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
        //If the user refresh the app:
        let vacations = vacationsStore.getState().vacations
        if(vacations.length === 0){
            this.getAllVacation()
        }

        //Use Form-Data for attach files:
        const vacationFormData = new FormData()
        
        vacationFormData.append("destination", vacation.destination)
        vacationFormData.append("description", vacation.description)
        vacationFormData.append("continentID", vacation.continentID.toLocaleString())
        vacationFormData.append("price", vacation.price.toLocaleString())
        vacationFormData.append("startDate", vacation.startDate.toLocaleString())
        vacationFormData.append("endDate", vacation.endDate.toLocaleString())
        if(vacation.image) vacationFormData.append("image", vacation.image[0])        

        const response = await axios.put<VacationModel>(appConfig.vacationURL+vacation.vacationID, vacationFormData)
        const newVacation = response.data

        //Update the vacation in the store:
        vacationsStore.dispatch({type: VacationsActionType.UpdateVacation, payload:newVacation})
        console.log(vacationsStore.getState().vacations)
    }

    //Get one specific vacation:
    public async getOneVacation(vacationID:number): Promise<VacationModel> {

        const vacations = vacationsStore.getState().vacations
        let vacation = vacations.find(v => v.vacationID === vacationID)
        //If the vacation is not exists in the store:
        if(!vacation){
            const response = await axios.get<VacationModel>(appConfig.vacationURL + vacationID)
            vacation = response.data  
        }

        return vacation
    }

    //Delete vacation:
    public async deleteVacation(vacationID:number): Promise<void> {
        //If the user refresh the app:
        let vacations = vacationsStore.getState().vacations
        if(vacations.length === 0){
            this.getAllVacation()
        }

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
            //Save the continents in the store:
            continentsStore.dispatch({type: ContinentsActionType.GetAllContinents, payload: continents})
        }
        return continents
    }

    //Get image URL with token:
    public async getVacationImageUrl(vacationID: number): Promise<string> {

        const response = await axios.get(appConfig.vacationImageURL + vacationID,{responseType: "blob"})
        const imageURL = URL.createObjectURL(response.data)
        return imageURL
    }

    public async getContinentImageUrl(continentName: string): Promise<string> {

        const response = await axios.get(appConfig.continentsImageURL + continentName, {responseType: "blob"})
        const continentImageURL = URL.createObjectURL(response.data)
        return continentImageURL
    }

    //Get future vacations:
    public async getFutureVacations(): Promise<VacationModel[]> {
        //Set the current date without time:
        const now = new Date()
        now.setHours(0,0,0,0)

        const allVacations = vacationsStore.getState().vacations
        let vacations: VacationModel[]
        //If the vacations are not exist in the state:
        if(allVacations.length === 0){
            const response = await axios.get<VacationModel[]>(appConfig.futureVacationsURL)
            vacations = response.data
        }
        else {
            vacations = allVacations.filter(v =>{                
                const [day, month, year] = v.startDate.split("/").map(Number)
                const startDate = new Date (year, month-1, day)
                startDate.setHours(0,0,0,0)
                return startDate > now
            })
        }
        return vacations
    }

    //Get current vacations:
    public async getCurrentVacations(): Promise<VacationModel[]> {
        //Set the current date without time:
        const now = new Date()
        now.setHours(0,0,0,0)
        const allVacations = vacationsStore.getState().vacations
        let vacations: VacationModel[]

        //If the store is empty:
        if(allVacations.length === 0){
            const response = await axios.get<VacationModel[]>(appConfig.currentVacationsURL)
            vacations = response.data
        }
        else {
            vacations = allVacations.filter(v => {
                const [Sday, Smonth, Syear] = v.startDate.split("/").map(Number)
                const startDate = new Date(Syear, Smonth-1, Sday)
                startDate.setHours(0,0,0,0)
                const [Eday, Emonth, Eyear] = v.endDate.split("/").map(Number)
                const endDate = new Date(Eyear, Emonth-1, Eday)
                endDate.setHours(0,0,0,0)

                return startDate <= now && endDate >= now
            })
        }

        return vacations
    }

    //Get vacations by user:
    public async getVacationsByUser(userID: number): Promise<VacationModel[]> {
        let allVacations = vacationsStore.getState().vacations
        let userVacations: VacationModel[] = []
        if(allVacations.length === 0) {
            const response = await axios.get<VacationModel[]>(appConfig.userVacationsURL + userID)
            userVacations = response.data            
        }
        else {
            const vacationOfFollower = await followersService.getVacationsByUser(userID)
            userVacations = allVacations.filter(v => {
                console.log(v)
                vacationOfFollower.find( f => f.vacationID === v.vacationID)
            })
            console.log(vacationOfFollower)
        }
        return userVacations
    }

}

const vacationService = new VacationsService()
export default vacationService