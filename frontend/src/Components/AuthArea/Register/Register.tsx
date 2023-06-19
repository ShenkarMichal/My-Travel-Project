import { NavLink, useNavigate } from "react-router-dom";
import "./Register.css";
import { useForm } from "react-hook-form";
import UserModel from "../../../4-Models/UserModel";
import authService from "../../../5-Service/AuthService";
import { Button } from "@mui/material";
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import notifyService from "../../../5-Service/NotifyService";
import CssTextField from "../../UtilsComponents/CssTextField/CssTextField";

function Register(): JSX.Element {


    const {register, handleSubmit, formState} = useForm<UserModel>()
    const navigate = useNavigate()

    async function sendForm(user: UserModel) {
        try {
            await authService.register(user) 
            notifyService.success("Welcome! We're leaving on a journey right away!!")
            navigate("/vacations")
        }
        catch (err: any) {
            notifyService.error(err)
        }
    }
    
    return (
        <div className="Register Auth">
			<form onSubmit={handleSubmit(sendForm)}>
                <h4>Join Our Travel</h4><hr />
                <CssTextField 
                type="text"
                label="First Name"
                fieldName="First Name"
                register={register("firstName", UserModel.firstNameValidatoin)}/> <br />
                <span className="ErrorMsg">{formState.errors.username?.message}</span><br/>
                <CssTextField 
                    label="Last Name" 
                    type="text"
                    fieldName="Last Name"
                    register={register("lastName", UserModel.lastNameValidatoin)}/> <br />
                <span className="ErrorMsg">{formState.errors.lastName?.message}</span><br/>
                <CssTextField 
                    fieldName="Email"
                    label="Email" 
                    type="email" 
                    register={register("email", UserModel.emailValidation)}/> <br />
                <span className="ErrorMsg">{formState.errors.email?.message}</span><br/>
                <CssTextField 
                    type="text"
                    fieldName="username"
                    label="username" 
                    register={register("username", UserModel.usernameValidatoin)}/> <br />
                <span className="ErrorMsg">{formState.errors.username?.message}</span><br/>
                <CssTextField 
                    fieldName="Password"
                    label="Password" 
                    type="password" 
                    register={register("password", UserModel.passwordValidatoin)}/> <br />
                <span className="ErrorMsg">{formState.errors.password?.message}</span><br/> 
                <CssTextField 
                    fieldName="Confirm Password"
                    label="Confirm Password" 
                    type="password" 
                    register={register("confirmPassword", UserModel.confirmPasswordValidation)}/> <br />
                <span className="ErrorMsg">{formState.errors.confirmPassword?.message}</span><br/> 
                <br />
                <Button 
                    color="inherit" 
                    variant="outlined" 
                    startIcon={<DirectionsRunIcon />} 
                    type="submit">
                    Let's Go!
                </Button> 
                <br />
                <span>Ready for the journey? </span>
                <NavLink to="/auth/login">Click here!</NavLink>

            </form>
        </div>
    );
}

export default Register;
