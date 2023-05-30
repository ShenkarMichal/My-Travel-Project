
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

}

export default VacationModel