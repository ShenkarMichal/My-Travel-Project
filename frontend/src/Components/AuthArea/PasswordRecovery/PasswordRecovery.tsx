import {  styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import "./PasswordRecovery.css";
import { useState } from 'react';
import authService from '../../../5-Service/AuthService';

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


  function PasswordRecovery(): JSX.Element {
    const [email, setEmail] = useState("");
  
    async function sendEmail(event: React.FormEvent<HTMLFormElement>) {
        try {
            event.preventDefault();

            const msg = await authService.PasswordRecovery(email)
            alert(msg)            
        } 
        catch (err: any) {
            console.log(err)            
        }
    }
  
    return (
      <div className="PasswordRecovery">
        <form onSubmit={sendEmail}>
            <h3>Forgot Your Password?</h3>
            <hr />
  
            <span>Please enter your email address:</span> <br />
            <CssTextField
                id="standard-basic"
                label="Email"
                variant="standard"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
            <br />
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
