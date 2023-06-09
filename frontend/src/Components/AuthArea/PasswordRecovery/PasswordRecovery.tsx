import {  styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import "./PasswordRecovery.css";
import { useState } from 'react';
import authService from '../../../5-Service/AuthService';
import { useNavigate } from 'react-router-dom';
import notifyService from '../../../5-Service/NotifyService';
import CssTextField from '../../UtilsComponents/CssTextField/CssTextField';


  function PasswordRecovery(): JSX.Element {
    const [email, setEmail] = useState("")
    const navigate = useNavigate()
  
    async function sendEmail(event: React.FormEvent<HTMLFormElement>) {
        try {
            event.preventDefault()
            const msg = await authService.PasswordRecovery(email)
            notifyService.success(msg)
            navigate("/auth/login")
        } 
        catch (err: any) {
          notifyService.error(err)
        }
    }
  
    return (
      <div className="PasswordRecovery Auth">
        <form onSubmit={sendEmail}>
            <h3>Forgot Your Password?</h3>
            <hr />
  
            <span>Please enter your email address:</span> <br />
            <CssTextField
            id="standard-basic"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            fieldName={'email'}/>
            <br /> <br />
            <Button 
                color="inherit" 
                variant="outlined" 
                endIcon={<SendIcon />} 
                type="submit"> Send
            </Button>
            <br />
        </form>
      </div>
    );
  }
  

export default PasswordRecovery;
