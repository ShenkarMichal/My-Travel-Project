import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'
import CredentialModel from "../../../4-Models/CredentialModel";
import authService from "../../../5-Service/AuthService";
import {  styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import notifyService from "../../../5-Service/NotifyService";
import CssTextField from "../../UtilsComponents/CssTextField/CssTextField";

function Login(): JSX.Element {

    const {register, handleSubmit, formState} = useForm<CredentialModel>()
    const navigate = useNavigate()

    async function sendForm(credential: CredentialModel) {
        try {
            await authService.login(credential)    
            navigate("/vacations")
            notifyService.success("Welcome back! We're leaving on a journey right away!!")
        }
        catch (err:any) {
            notifyService.error(err)            
        }
    }
    
    return (
        <div className="Login Auth">
			    <form  onSubmit={handleSubmit(sendForm)}>
                <h4>Join Our Travel</h4><hr />

                <CssTextField type="text" fieldName="username" 
                            label="username" register={register("username", CredentialModel.usernameValidatoin)}/> <br />
                <span className="ErrorMsg">{formState.errors.username?.message}</span><br/>

                <CssTextField fieldName="Password" label="password" type="password" register={register("password", CredentialModel.passwordValidatoin)} /> <br />
                <span className="ErrorMsg">{formState.errors.password?.message}</span><br/>

                <NavLink to="/auth/recovery">Forgot Password?</NavLink><br /> <br />
                <Button color="inherit" variant="outlined" startIcon={<DirectionsRunIcon />} type="submit">
                    Let's Go!
                </Button> <br />
                <span>Is your backpack still unpacked? </span><br/>
                <NavLink to="/auth/register">Click here!</NavLink>

          </form>

        </div>
    );
}

export default Login;
