
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
        min: {value: 5, message: "Destination is too short"},
        max: {value: 35, message: "Destination is too long"}
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
        // pattern: {value: /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, message: "Date nust be in a valid date format"},
        // validate: (value: Date, { now = new Date() }) =>
        // value >= now || "Date is too early"
    }

    public static endDateValidate = {
            required: {value: true, message: "Date is missing"},
            // pattern: {value: /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, message: "Date nust be in a valid date format"},
            validate: (value: string, { startDate }: VacationModel) =>
            value > startDate || "End must be kater then the start-date"
    }

    public static priceValidate = {
        required: {value: true, message: "Price is missing"},
        min: {value: 0 , message: "Price is too low"},
        max: {value: 10000 , message: "Price is too high"}        
    }

    public static imageValidate = {
        required: {value: true, message: "Image is missing"}     
    }


}

export default VacationModel