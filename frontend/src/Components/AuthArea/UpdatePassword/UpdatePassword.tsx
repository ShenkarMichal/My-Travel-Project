import { useState } from "react";
import "./UpdatePassword.css";
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import authService from "../../../5-Service/AuthService";
import { useNavigate, useParams } from "react-router-dom";

function UpdatePassword(): JSX.Element {

    const [password, setPassword] = useState("");
    const email = useParams().email
    const navigate = useNavigate()
  
    async function sendNewPassword(event: React.FormEvent<HTMLFormElement>) {
        try {
            // event.preventDefault()
            console.log(email)
            const msg = await authService.updatePassword(email,password)
            alert(msg)  
        } 
        catch (err: any) {
            console.log(err)            
        }
    }
    return (
        <div className="UpdatePassword Auth">
            <form onSubmit={sendNewPassword}>
                <h3>Enter a new Password</h3>
                <hr />
    
                <TextField
                    id="standard-basic"
                    label="Password"
                    variant="standard"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                <br /> <br/>
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
