class ContinentModel {
    public continentID: number
    public continentName: string
    public continentImageName: string

    public constructor(continent: ContinentModel) {
        this.continentID = continent.continentID
        this.continentName = continent.continentName
        this.continentImageName = continent.continentImageName
    }
}

export default ContinentModel