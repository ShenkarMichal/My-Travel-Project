import { NavLink, useNavigate } from "react-router-dom";
import "./Register.css";
import { useForm } from "react-hook-form";
import UserModel from "../../../4-Models/UserModel";
import authService from "../../../5-Service/AuthService";



function Register(): JSX.Element {


    const {register, handleSubmit, formState} = useForm<UserModel>()
    const navigate = useNavigate()

    async function sendForm(user: UserModel) {
        try {
            await authService.register(user) 
            alert("Welcome! We're leaving on a journey right away!!")   
            navigate("/vacations")
        }
        catch (err: any) {
            console.log(err)            
        }
    }
    
    return (
        <div className="Register">
			<form onSubmit={handleSubmit(sendForm)}>
                <h4>Join Our Travel</h4><hr />
                <label>First Name:</label>
                <input type="text" {...register("firstName")}/> <br />

                <label>Last Name:</label>
                <input type="text" {...register("lastName")}/> <br />

                <label>Email:</label>
                <input type="email" {...register("email")}/> <br />

                <label>username:</label>
                <input type="text" {...register("username")}/> <br />

                <label>Password:</label>
                <input type="password" {...register("password")}/> <br />

                <button>Let's Go!</button> <br /> <br />
                <span>Ready for the journey? </span>
                <NavLink to="/auth/login">Click here!</NavLink>

            </form>
        </div>
    );
}

export default Register;
