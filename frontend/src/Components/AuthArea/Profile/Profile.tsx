import "./Profile.css";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import UserModel from "../../../4-Models/UserModel";
import authService from "../../../5-Service/AuthService";
import { Button } from "@mui/material";
import BeenhereIcon from '@mui/icons-material/Beenhere';
import notifyService from "../../../5-Service/NotifyService";
import CssTextField from "../../UtilsComponents/CssTextField/CssTextField";
import { ChangeEvent, useEffect, useState } from "react";
import { authStore } from "../../../3-Redux/AuthState";
import appConfig from "../../../2-Utils/Config";
import verifyLogged from "../../../2-Utils/VerifyLogged";

function Profile(): JSX.Element {

        
    const isLogged = verifyLogged.isLogged()

    const navigate = useNavigate()
    const {register, handleSubmit, formState, setValue} = useForm<UserModel>()
    const [user, setUser] = useState<UserModel>()
 
    async function sendForm(newUser: UserModel) {
        try {
            newUser.userID = user.userID
            newUser.role = user.role
            await authService.updateUserDetails(newUser) 
            notifyService.success("Your profile has been successfully updated")
            navigate("/vacations")
        }
        catch (err: any) {
            notifyService.error(err)
        }
    }

    useEffect(()=>{
        if(!isLogged) notifyService.error("You are not logged in")

        setUser(authStore.getState().user)
        setImageURL(appConfig.getUserImageURL + user?.userID)

        const unsubscribe = authStore.subscribe(()=>{
            setUser(authStore.getState().user)
            setImageURL(appConfig.getUserImageURL + user?.userID)

        })

        return()=> unsubscribe()
    },[user])
    
    //Save the upload-file and it's url:
    const [fileUpLoad, setFileUpLoad] = useState<string>()

    //Save the file name for the label of the input:
    const [fileName, setFileName] = useState('')

    function handleChangeFile(event: ChangeEvent<HTMLInputElement>){
        const uploadFile = event.target.files
        setFileUpLoad(URL.createObjectURL(uploadFile[0]))
        console.log(uploadFile)
        setValue("image", uploadFile)
        setFileName(uploadFile[0].name)
   }

    const [imageURl, setImageURL] = useState("")



    
    return (
    <>{isLogged && 
        <div className="Profile Auth">
			{user &&
            <form onSubmit={handleSubmit(sendForm)}>
                <h4>Who Are You?</h4><hr />
                <CssTextField 
                type="text"
                label="First Name"
                fieldName="First Name"
                variant="filled"
                defaultValue={user.firstName}
                register={register("firstName", UserModel.firstNameValidatoin)}/> <br />
                <span className="ErrorMsg">{formState.errors.username?.message}</span><br/>
                <CssTextField 
                    label="Last Name" 
                    type="text"
                    variant="filled"
                    fieldName="Last Name"
                    defaultValue={user.lastName}
                    register={register("lastName", UserModel.lastNameValidatoin)}/> <br />
                <span className="ErrorMsg">{formState.errors.lastName?.message}</span><br/>
                <CssTextField 
                    fieldName="Email"
                    label="Email"
                    defaultValue={user.email}
                    variant="filled" 
                    type="email" 
                    inputProp={{readOnly: true}}
                    register={register("email", UserModel.emailValidation)}/> <br />
                <span className="ErrorMsg">{formState.errors.email?.message}</span><br/>
                <CssTextField 
                    type="text"
                    fieldName="username"
                    label="username" 
                    defaultValue={user.username}
                    variant="filled"
                    register={register("username", UserModel.usernameValidatoin)}/> <br />
                <span className="ErrorMsg">{formState.errors.username?.message}</span><br/>
                <span>The image will be updated upon your next login</span>
                <CssTextField id="input-file" label={fileName || "Image"} type="file" inputProp={{accept: "image/*"}} variant="filled"
                    fieldName="image" onChange={handleChangeFile}/> <br />
                {fileUpLoad ? <img src={fileUpLoad} width={150}/> :
                        <img src={imageURl} />
                }<br/>                        
                <br />
                <Button 
                    color="inherit" 
                    variant="outlined" 
                    startIcon={<BeenhereIcon />} 
                    type="submit">
                    Save Change
                </Button> 
                <br />
                <span>Do you want to change your password?</span>
                <NavLink to={"/auth/recovery/update-password/"+user?.email}><br/>Click here!</NavLink>

            </form>}
        </div>
        
    }
    {!isLogged &&
        <Navigate to={"/auth/login"}/>        
    }
    </>);
    
}

export default Profile;
