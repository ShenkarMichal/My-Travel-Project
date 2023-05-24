class ContinentModel {
    public continentID: number
    public continentName: string

    public constructor(continent: ContinentModel) {
        this.continentID = continent.continentID
        this.continentName = continent.continentName
    }
}

export default ContinentModel