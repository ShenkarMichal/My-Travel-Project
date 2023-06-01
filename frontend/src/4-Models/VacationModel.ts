
class VacationModel {
    public vacationID: number
    public destination: string
    public continentID: number
    public description: string
    public startDate: string
    public endDate: string
    public duration: number
    public price: number
    public imageName: string
    public image: FileList

    public continentName: string

    public static destinationValidate = {
        required: {value: true, message: "Destination is missing"},
        minLength: {value: 5, message: "Destination is too short"},
        maxLength: {value: 35, message: "Destination is too long"}
    }

    public static continentIDValidate = {
        required: {value: true, message: "Continent is missing"}
    }

    public static descriptionValidate = {
        required: {value: true, message: "Description is missing"},
        min: {value: 5, message: "Description is too short"},
        max: {value: 300, message: "Description is too long"}
    }

    public static startDateValidate = {
        required: {value: true, message: "Date is missing"},
        validate: (value: string) =>{
        const now = new Date().toISOString()
        return value >= now || "Date is too early"
        }
    }

    public static endDateValidate = {
            required: {value: true, message: "Date is missing"},
            validate: (value: string, { startDate }: VacationModel) =>
            value > startDate || "End must be later than the start-date"
    }

    public static priceValidate = {
        required: {value: true, message: "Price is missing"},
        min: {value: 0 , message: "Price is too low"},
        max: {value: 10000 , message: "Price is too high"}        
    }

}

export default VacationModel