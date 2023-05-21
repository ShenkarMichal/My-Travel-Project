class Config {
    public registerURL = "http://localhost:3001/api/auth/register/"
    public loginURL = "http://localhost:3001/api/auth/login/"
    public passwordRecoveryURL = "http://localhost:3001/api/auth/recovery/"

    public vacationURL = "http://localhost:3001/api/vacations/"
    public vacationImageURL = "http://localhost:3001/api/vacations-images/"

    public followURL = "http://localhost:3001/api/follow/"
    public vacationOfFollower = "http://localhost:3001/api/vacation-of-follow/"
    public followerOfVacation = "http://localhost:3001/api/follow-of-vacation/"
}

const appConfig = new Config()
export default appConfig