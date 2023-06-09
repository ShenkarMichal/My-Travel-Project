import styled from "@emotion/styled";
import "./CssTextField.css";
import { InputAdornment, TextField } from "@mui/material";
import { ChangeEvent } from "react";

class InputProp {
    accept?: string
    startAdornment?: string
    endAdornment?: string
    readOnly?: boolean
}

interface CssTextFieldProp {
    label: string,
    type: string,
    inputProp?: InputProp
    fieldName: string
    register?: any
    defaultValue?: any
    onChange?: (event: ChangeEvent<HTMLInputElement>)=> void
    id?: string
    Multiline?: number
    value?: string
    variant?: string
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
        <>
            <CssTextField label={prop.label} variant={prop.variant || "standard"} type={prop.type} 
                          name={prop.fieldName} fullWidth 
                          defaultValue={prop.defaultValue}
                          InputProps={{accept: prop.inputProp?.accept, 
                                    endadornment: <InputAdornment position="end">{prop.inputProp?.endAdornment}</InputAdornment>,
                                    startadornment: <InputAdornment position="start">{prop.inputProp?.startAdornment}</InputAdornment>,                                    
                                    // shrink: true,
                                    readOnly: prop.inputProp?.readOnly}}
                                    {...prop.register}
                                    onChange={prop.onChange}
                                    id = {prop.id}
                                    multiline={prop.Multiline && true || false}
                                    rows={prop.Multiline || 0}
                                    value={prop.value}                                   
                                    
                       />			
        </>
    );
}

export default CssTextField;
