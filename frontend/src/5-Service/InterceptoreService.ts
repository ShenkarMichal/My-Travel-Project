import axios from "axios";
import { authStore } from "../3-Redux/AuthState";

class InterceptorService {

    public createInterceptor(): void {
        axios.interceptors.request.use(request => {
            if(sessionStorage.getItem("token")) {
                request.headers = {
                    authorization: "Bearer " + sessionStorage.getItem("token")
                }
            }
            return request
        })
    }
}

const interceptorService = new InterceptorService()
export default interceptorService