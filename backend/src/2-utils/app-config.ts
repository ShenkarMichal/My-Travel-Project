class AppConfig {
    public host = "localhost"
    public user = "MyTravelAdmin"
    public password = "aroundtheworld"
    public database = "mytravel"

    public port = 3001
    public frontendURL = "http://localhost:3000"
}

const appConfig = new AppConfig()
export default appConfig