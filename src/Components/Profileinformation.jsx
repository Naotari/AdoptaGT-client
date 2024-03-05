import { useEffect, useState } from "react";
import "./ProfileInformation.css"
import axios from "axios";
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'

const ProfileInformation = () => {
    const userInfo = useSelector((state) => state.LoginInfo.loginData)

    const [userNameEdit, setUserNameEdit] = useState(false)
    const [userNameUsed, setUserNameUsed] = useState(false)
    const [userNameText, setUserNameText] = useState(userInfo.user_name)
    const [nameEdit, setNameEdit] = useState(false)
    const [nameText, setNameText] = useState(userInfo.name)
    const [lastNameText, setLastNameText] = useState(userInfo.last_name)
    const [emailEdit, setEmailEdit] = useState(false)
    const [emailUsed, setEmailUsed] = useState(false)
    const [emailText, setEmailText] = useState(userInfo.email)
    const [changingPassword, setChangingPassword] = useState(false)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [newPasswordWarning, setNewPasswordWarning] = useState(false)
    const [repeatPasswordWarning, setRepeatPasswordWarning] = useState(false)
    const [changePasswordButtonState, setChangePasswordButtonState] = useState(false)
    
    const userNameChangeHandler = async (event) => {
        setUserNameText(event.target.value)
        if (event.target.value === "")  setUserNameUsed(true);
        else {
            try {
                const verifyUserNameResponse = await axios.post("/users/verify/user_name", {user_name: event.target.value})
                if (verifyUserNameResponse.data.state === "ok") setUserNameUsed(false);
            } catch (error) {
                if (error.response.data.state === "error") setUserNameUsed(true);
            }
        }
    }
    const nameChangeHandler = async (event) => {
        if(event.target.id === "name_input") {
            setNameText(event.target.value)
        } else if (event.target.id === "latName_input") {
            setLastNameText(event.target.value)
        }
    }
    const emailChangeHandler = async (event) => {
        setEmailText(event.target.value)
        if (event.target.value === "") setEmailUsed(true);
        else {
            try {
                const verifyEmailResponse = await axios.post("/users/verify/email", {email: event.target.value})
                if (verifyEmailResponse.data.state === "ok") setEmailUsed(false);
            } catch (error) {
                if (error.response.data.state === "error") setEmailUsed(true);
            }
        }
    }
    const passwordChangeHandler = async (event) => {
        if (event.target.id === "old_password") {
            setOldPassword(event.target.value);
        }
        if (event.target.id === "new_password") {
            setNewPassword(event.target.value)
        }
        if (event.target.id === "repeat_password") {
            setRepeatPassword(event.target.value)
        }
    }
    
    const editUserNameSubmit = async () => {
        if(userNameEdit === true) {
            const response = await axios.put("/users", {idUser: userInfo.id, user_name: userNameText})
            location.reload();
            setUserNameEdit(false)
        } else {
            setUserNameEdit(true)
        }
    }
    const closeUserNameEdit = () => {
        setUserNameText(userInfo.user_name)
        setUserNameEdit(false)
        setUserNameUsed(false)
    }
    const editNameSubmit = async () => {
        if(nameEdit === true) {
            const InfoToBeSent = {idUser: userInfo.id}
            if(nameText !== "") {InfoToBeSent.name = nameText}
            if(lastNameText !== "") {InfoToBeSent.last_name = lastNameText}
            
            const response = await axios.put("/users", InfoToBeSent)
            location.reload();
            setNameEdit(false)
        } else {
            setNameEdit(true)
        }
    }
    const closeNameEdit = () => {
        setNameText(userInfo.name)
        setLastNameText(userInfo.last_name)
        setNameEdit(false)
    }
    const editEmailSubmit = async () => {
        if(emailEdit === true) {
            const response = await axios.put("/users", {idUser: userInfo.id, email: emailText})
            window.localStorage.removeItem("token");
            window.location.href = "./login"
            setEmailEdit(false)
        } else {
            setEmailEdit(true)
        }
    }
    const closeEmailEdit = () => {
        setEmailText(userInfo.email)
        setEmailEdit(false)
        setEmailUsed(false)
    }
    const editPasswordSubmit = async (event) => {
        event.preventDefault()
        if(changingPassword === false) {
            setChangingPassword(true)
        } else {
            try {
                const changePasswordResponse = await axios.post("/users/change/password", {idUser: userInfo.id, oldPassword: oldPassword, newPassword: newPassword})
                if (changePasswordResponse.data.state === "ok") {
                    Swal.fire({
                        title: "Contraseña cambiada, inicia sesion de nuevo",
                        text: "Redirigiendo a inicio de sesion.",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 4000
                    });
                    setTimeout(() => { //Se ejecuta DESPUES del conteo
                        window.localStorage.removeItem("token");
                        window.location.href = "./login"
                        setChangingPassword(false)
                    }, 4500)
                }
            } catch (error) {
                console.log(error);
                if (error.response.data.content === "Password doesn't match") {
                    Swal.fire({
                        title: "La contraseña anterior no coincide.", 
                        icon: "error",
                    });
                } else if (error.response.data.content === "Password not allowed") {
                    Swal.fire({
                        title: "La contraseña no esta permitida, intenta otra.", 
                        icon: "error",
                    });
                }
            }
        }
    }
    const closePasswordEdit = () => {
        setOldPassword("")
        setNewPassword("")
        setRepeatPassword("")
        setChangingPassword(false)
    }

    useEffect(() => { //Crete the warnings when changing password
        const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\S+$).{8,}$/;
        if(!(regex.test(newPassword))) {
            setNewPasswordWarning(true);
        } else {
            setNewPasswordWarning(false)
        }
        if(newPassword !== repeatPassword) { //para advertir tambien si se cambia la contraseña en contraseña nueva
            setRepeatPasswordWarning(true)
        } else setRepeatPasswordWarning(false)

        if (oldPassword === "" ||
            newPassword === "" ||
            repeatPassword === "" ||
            !(regex.test(newPassword)) ||
            newPassword !== repeatPassword
        ) setChangePasswordButtonState(false);
        else setChangePasswordButtonState(true);
    }, [oldPassword, newPassword, repeatPassword])
    
    return (
        <div className="ProfileInformation__Main">
            <p className="ProfileInformation__Tittle">Informacion</p>
            <div>
                <div className="ProfileInformation__InfoSection">
                    <p className="profileInformation__InfoSection__Text">Usuario:</p>
                    {userNameEdit?
                        <input className="ProfileInformation__InfoSection__Input" placeholder={userInfo.user_name} onChange={userNameChangeHandler} maxLength="32" value={userNameText}></input>:
                        <p className="profileInformation__InfoSection__Text">{userInfo.user_name}</p>
                    }
                    {userNameUsed && <p style={{color:"red", fontSize:12}}>*Nombre de usuario en uso</p>}
                    <span onClick={editUserNameSubmit} className="material-symbols-outlined move-right Pointing" style={userNameUsed?{color:"grey", pointerEvents:"none"}:{}}>{userNameEdit?"save_as":"edit"}</span>
                    {userNameEdit && <span onClick={closeUserNameEdit} className="material-symbols-outlined Pointing" style={{marginLeft: "5px"}}>close</span>}
                </div>
                <div className="ProfileInformation__InfoSection">
                    <p className="profileInformation__InfoSection__Text">Nombre:</p>
                    {nameEdit?
                        <div>
                            <input id="name_input" className="ProfileInformation__InfoSection__Input" value={nameText} maxLength="32" onChange={nameChangeHandler} placeholder={userInfo.name}></input>
                            <input id="latName_input" className="ProfileInformation__InfoSection__Input" value={lastNameText} maxLength="32" onChange={nameChangeHandler} placeholder={userInfo.last_name}></input>
                        </div>:
                        <p className="profileInformation__InfoSection__Text">{userInfo.name} {userInfo.last_name}</p>
                    }
                    <span onClick={editNameSubmit} className="material-symbols-outlined move-right Pointing">{nameEdit?"save_as":"edit"}</span>
                    {nameEdit && <span onClick={closeNameEdit} className="material-symbols-outlined Pointing" style={{marginLeft: "5px"}}>close</span>}
                </div>
                <div className="ProfileInformation__InfoSection">
                    <p className="profileInformation__InfoSection__Text">Correo:</p>
                    {emailEdit?
                        <input className="ProfileInformation__InfoSection__Input" placeholder={userInfo.email} value={emailText} type="email" onChange={emailChangeHandler} maxLength="64"></input>:
                        <p className="profileInformation__InfoSection__Text">{userInfo.email}</p>
                    }
                    {emailUsed && <p style={{color:"red", fontSize:12}}>*Correo en uso</p>}
                    <span onClick={editEmailSubmit} className="material-symbols-outlined move-right Pointing" style={emailUsed?{color:"grey", pointerEvents:"none"}:{}}>{emailEdit?"save_as":"edit"}</span>
                    {emailEdit && <span onClick={closeEmailEdit} className="material-symbols-outlined Pointing" style={{marginLeft: "5px"}}>close</span>}
                </div>
            </div>
            <div className="ProfileInformation__LowerOptions__Box">
                <div className="ProfileInformation__LowerOptions__Section">
                    {changingPassword?
                        <form className="ProfileInformation__LowerOptions__InputsBox">
                            <label>Contraseña actual</label>
                            <input id="old_password" className="ProfileInformation__LowerOptions__Inputs" value={oldPassword} maxLength="32" onChange={passwordChangeHandler}></input>
                            <label>Contraseña nueva</label>
                            <input id="new_password" className="ProfileInformation__LowerOptions__Inputs" value={newPassword} maxLength="32" onChange={passwordChangeHandler}></input>
                            {newPasswordWarning ? <p className="ProfileInformation__InputsBox__Warning">*Ingresa una combinacion de al menos 8 Mayusculas, Minusculas, Numeros y Caracteres especiales (@#$%^&+=!)</p>: <br></br>}
                            <label>Repetir contraseña</label>
                            <input id="repeat_password" className="ProfileInformation__LowerOptions__Inputs" value={repeatPassword} maxLength="32" onChange={passwordChangeHandler}></input>
                            {repeatPasswordWarning ? <p className="ProfileInformation__InputsBox__Warning">*La nueva contraseña no coincide</p> : <br></br>}
                            <div>
                                <button className="ProfileInformation__LowerOptions__Buttons" onClick={editPasswordSubmit} disabled={!changePasswordButtonState}>Cambiar</button>
                                <button className=" ProfileInformation__LowerOptions__Buttons Delete__Button" onClick={closePasswordEdit} style={{marginLeft: "140px"}}>Cancelar</button>
                            </div>
                        </form>
                    :<button className="ProfileInformation__LowerOptions__Buttons" onClick={editPasswordSubmit}>Cambiar Contraseña</button>
                    }
                </div>
                <div className="ProfileInformation__LowerOptions__Section">
                    <button  className="ProfileInformation__LowerOptions__Buttons Delete__Button">Eliminar cuenta</button>
                </div>
            </div>
        </div>
    )
}

export default ProfileInformation