import { useNavigate } from "react-router-dom";

class UseBlokcedPage {

    public navigate = useNavigate()

    public NotLoggedBlock() {
    
    
        alert("You are not logged-in")
        this.navigate("/auth/login")    
    }

    public NotAdminBlock() {

        alert("You do not have an admin permission")
        this.navigate("/vacations")
    }



}

const useBlokcedPage = new UseBlokcedPage()
export default useBlokcedPage