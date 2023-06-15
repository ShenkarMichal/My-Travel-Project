import "./UpdatePassword.css";
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import authService from "../../../5-Service/AuthService";
import { useParams } from "react-router-dom";
import UserModel from "../../../4-Models/UserModel";
import { useForm } from "react-hook-form";
import notifyService from "../../../5-Service/NotifyService";

type FormValues = {
    password: string;
    confirmPassword: string
};
  

function UpdatePassword(): JSX.Element {

    const email = useParams().email

    const { register, handleSubmit, formState, watch } = useForm<FormValues>();

    const password = watch("password");

    async function sendNewPassword(password: FormValues) {
        try {
            const msg = await authService.updatePassword(email,password.password)
            notifyService.success(msg)
        } 
        catch (err: any) {
            notifyService.error(err)
        }
    }

    return (
        <div className="UpdatePassword Auth">
            <form onSubmit={handleSubmit(sendNewPassword)}>
                <h3>Enter a new Password</h3>
                <hr />
    
                <TextField
                    id="standard-basic"
                    label="Password"
                    variant="standard"
                    type="password"
                    {...register("password", UserModel.passwordValidatoin)}
                    /><br/>
                <span className="ErrorMsg">{formState.errors.password?.message}</span>
                    
                <br /> 
                <TextField
                    id="standard-basic"
                    label="Confirm Password"
                    variant="standard"
                    type="password"
                    {...register("confirmPassword",{
                        required: "You mast confirm password",
                        validate: (value) =>
                            value === password || "Passwords do not match",
                    })}/>
                <br />
                <span className="ErrorMsg">{formState.errors.confirmPassword?.message}</span> <br/><br/>
                <Button 
                    color="inherit" 
                    variant="outlined" 
                    endIcon={<SendIcon />} 
                    type="submit"> Set my password
                </Button>
                <br />
            </form>
        </div>
    );
}

export default UpdatePassword;
