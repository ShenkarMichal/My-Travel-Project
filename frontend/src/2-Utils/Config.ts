class Config {

    // Auth links
    public registerURL = "http://localhost:3001/api/auth/register/"
    public loginURL = "http://localhost:3001/api/auth/login/"
    public passwordRecoveryURL = "http://localhost:3001/api/auth/recovery/"

    //Vacations links
    public vacationURL = "http://localhost:3001/api/vacations/"
    public oneVacationURL = "http://localhost:3001/api/vacation/"
    public vacationImageURL = "http://localhost:3001/api/vacations-images/"
    public vacationsByContinent = "http://localhost:3001/api/vacations/by-continent/"
    public continentsURL = "http://localhost:3001/api/vacations/continents/"
    public continentsImageURL = "http://localhost:3001/api/vacations/continent-images/"
    public futureVacationsURL = "http://localhost:3001/api/vacations/by-date/future/"
    public currentVacationsURL = "http://localhost:3001/api/vacations/by-date/current/"
    public userVacationsURL = "http://localhost:3001/api/vacations/by-user/"

    //Utils links
    public weatherURL = "http://localhost:3001/api/weather/"
    public timeURL = "http://localhost:3001/api/time/"

    //Followers links
    public followURL = "http://localhost:3001/api/follow/"
    public vacationOfFollower = "http://localhost:3001/api/vacation-of-follow/"
    public followerNumberOfVacation = "http://localhost:3001/api/follow-of-vacation/"
    public csvFileDownloadURL = "http://localhost:3001/api/follow-of-vacation/download"
    public reportURL = "http://localhost:3001/api/follow-of-vacation/report"
}

const appConfig = new Config()
export default appConfig