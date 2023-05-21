import { useState } from "react";
import "./UpdatePassword.css";
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import authService from "../../../5-Service/AuthService";

function UpdatePassword(): JSX.Element {

    const [password, setPassword] = useState("");
  
    async function sendEmail(event: React.FormEvent<HTMLFormElement>) {
        try {
            event.preventDefault();

            const msg = await authService.updatePassword(password)
            alert(msg)            
        } 
        catch (err: any) {
            console.log(err)            
        }
    }
    return (
        <div className="UpdatePassword">
            <form onSubmit={sendEmail}>
                <h3>Enter a new Password</h3>
                <hr />
    
                <TextField
                    id="standard-basic"
                    label="Email"
                    variant="standard"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                <br />
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
