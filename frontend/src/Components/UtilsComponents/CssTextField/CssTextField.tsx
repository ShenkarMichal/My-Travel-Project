import styled from "@emotion/styled";
import "./CssTextField.css";
import { InputAdornment, TextField } from "@mui/material";

class InputProp {
    accept?: string
    startAdornment?: string
    endAdornment?: string
}

interface CssTextFieldProp {
    label: string,
    type: string,
    inputProp?: InputProp
}

function CssTextField(prop: CssTextFieldProp): JSX.Element {

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
      
    return (
        <div className="CssTextField">
            <CssTextField id="standard-basic" label={prop.label} variant="standard" type={prop.type} 
                        inputProps={{accept: prop.inputProp?.accept, 
                                    endAdornment: <InputAdornment position="end">{prop.inputProp?.endAdornment}</InputAdornment>,
                                    startAdornment: <InputAdornment position="start">{prop.inputProp?.startAdornment}</InputAdornment>}} />			
        </div>
    );
}

export default CssTextField;
