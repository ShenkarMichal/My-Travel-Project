import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'
import CredentialModel from "../../../4-Models/CredentialModel";
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

function Login(): JSX.Element {

    const {register, handleSubmit, formState} = useForm<CredentialModel>()
    const navigate = useNavigate()

    async function sendForm(credential: CredentialModel) {
        try {
            await authService.login(credential)    
            navigate("/vacations")
            alert("Welcome back! We're leaving on a journey right away!!")            
        }
        catch (err:any) {
            console.log(err)            
        }
    }
    
    return (
        <div className="Login Auth">
			    <form  onSubmit={handleSubmit(sendForm)}>
                <h4>Join Our Travel</h4><hr />

                <CssTextField id="standard-basic" label="username" variant="standard" {...register("username")}/> <br />

                <CssTextField id="standard-basic" label="password" variant="standard" type="password" {...register("password")} /> <br />
                <NavLink to="/auth/recovery">Forgot Password?</NavLink><br /> <br />
                <Button color="inherit" variant="outlined" startIcon={<DirectionsRunIcon />} type="submit">
                    Let's Go!
                </Button> <br />
                <span>Is your backpack still unpacked? </span>
                <NavLink to="/auth/register">Click here!</NavLink>

          </form>

        </div>
    );
}

export default Login;
