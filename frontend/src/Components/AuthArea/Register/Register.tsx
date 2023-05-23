import { NavLink, useNavigate } from "react-router-dom";
import "./Register.css";
import { useForm } from "react-hook-form";
import UserModel from "../../../4-Models/UserModel";
import authService from "../../../5-Service/AuthService";
import {  styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';


const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: '#A0AAB4',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#E0E3E7',
      },
      '&:hover fieldset': {
        borderColor: '#B2BAC2',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#6F7E8C',
      },
    },
  });

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
            alert(err.response.data)            
        }
    }
    
    return (
        <div className="Register Auth">
			<form onSubmit={handleSubmit(sendForm)}>
                <h4>Join Our Travel</h4><hr />
                <CssTextField id="standard-basic" label="First Name" variant="standard" {...register("firstName", UserModel.firstNameValidatoin)}/> <br />
                <span className="ErrorMsg">{formState.errors.username?.message}</span><br/>
                <CssTextField id="standard-basic" label="Last Name" variant="standard" {...register("lastName", UserModel.lastNameValidatoin)}/> <br />
                <span className="ErrorMsg">{formState.errors.lastName?.message}</span><br/>
                <CssTextField id="standard-basic" label="Email" variant="standard" type="email" {...register("email", UserModel.emailValidation)}/> <br />
                <span className="ErrorMsg">{formState.errors.email?.message}</span><br/>
                <CssTextField id="standard-basic" label="username" variant="standard" {...register("username", UserModel.usernameValidatoin)}/> <br />
                <span className="ErrorMsg">{formState.errors.username?.message}</span><br/>
                <CssTextField id="standard-basic" label="Password" variant="standard" type="password" {...register("password", UserModel.passwordValidatoin)}/> <br />
                <span className="ErrorMsg">{formState.errors.password?.message}</span><br/> 
                <CssTextField id="standard-basic" label="Confirm Password" variant="standard" type="password" {...register("confirmPassword", UserModel.confirmPasswordValidation)}/> <br />
                <span className="ErrorMsg">{formState.errors.confirmPassword?.message}</span><br/> <br />
                <Button color="inherit" variant="outlined" startIcon={<DirectionsRunIcon />} type="submit">
                    Let's Go!
                </Button> <br />
                <span>Ready for the journey? </span>
                <NavLink to="/auth/login">Click here!</NavLink>

            </form>
        </div>
    );
}

export default Register;
