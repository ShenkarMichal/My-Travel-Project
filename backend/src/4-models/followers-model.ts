
class FollowersModel {
    public userID: number
    public vacationID: number

    public constructor(follower: FollowersModel) {
        this.userID = follower.userID
        this.vacationID = follower.vacationID
    }
}

export default FollowersModel