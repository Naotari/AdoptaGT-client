import { useState } from "react";
import "./ProfileInformation.css"
import axios from "axios";
import Swal from 'sweetalert2'

const ProfileInformation = (props) => {
    const userInfo = props.userInfo 
    // console.log(userInfo);

    const [userNameEdit, setUserNameEdit] = useState(true)
    const [userNameUsed, setUserNameUsed] = useState(false)
    const [userNameText, setUserNameText] = useState("")
    const [nameEdit, setNameEdit] = useState(true)
    const [nameText, setNameText] = useState("")
    const [lastNameText, setLastNameText] = useState("")
    const [emailEdit, setEmailEdit] = useState(true)
    const [emailUsed, setEmailUsed] = useState(false)
    const [emailText, setEmailText] = useState("")
    const [changingPassword, setChangingPassword] = useState(false)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [newPasswordWarning, setNewPasswordWarning] = useState(false)
    const [repeatPasswordWarning, setRepeatPasswordWarning] = useState(false)
    
    const userNameChangeHandler = async (event) => {
        setUserNameText(event.target.value)
        if (event.target.value !== "") {
            const response = await axios.post("/users/verify/user_name", {user_name: event.target.value})
            if (response.data.message === "There is already a user with that user_name") {
                setUserNameUsed(true)
            }
            else {
                setUserNameUsed(false)
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
        if (event.target.value !== "") {
            const response = await axios.post("/users/verify/email", {email: event.target.value})
            if (response.data.message === "There is already a user with that email") {
                setEmailUsed(true)
            }
            else {
                setEmailUsed(false)
            }
        }
    }
    const passwordChangeHandler = async (event) => {
        if(event.target.id === "old_password") {
            setOldPassword(event.target.value)
        } else if (event.target.id === "new_password") {

            setNewPassword(event.target.value)
            if(event.target.value !== repeatPassword) {
                setRepeatPasswordWarning(true)
            }   else setRepeatPasswordWarning(false)
            const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\S+$).{8,}$/;
            if (event.target.value === "" || !(regex.test(event.target.value))) {
                setNewPasswordWarning(true)
            } else {setNewPasswordWarning(false)}
            
        } else if (event.target.id === "repeat_password") {
            setRepeatPassword(event.target.value)
            if(newPassword !== event.target.value) {
                setRepeatPasswordWarning(true)
            } else setRepeatPasswordWarning(false)
        }
    }

    const editUserNameSubmit = async () => {
        if(userNameEdit === true) {
            setUserNameEdit(false)
        } else {
            const response = await axios.put("/users", {idUser: userInfo.id, user_name: userNameText})
            location.reload();
            setUserNameEdit(true)
        }
    }
    const editNameSubmit = async () => {
        if(nameEdit === true) {
            setNameEdit(false)
        } else {
            console.log(userInfo.id);
            const InfoToBeSent = {idUser: userInfo.id}
            if(nameText !== "") {InfoToBeSent.name = nameText}
            if(lastNameText !== "") {InfoToBeSent.last_name = lastNameText}

            const response = await axios.put("/users", InfoToBeSent)
            location.reload();
            setNameEdit(true)
        }
    }
    const editEmailSubmit = async () => {
        if(emailEdit === true) {
            setEmailEdit(false)
        } else {
            const response = await axios.put("/users", {idUser: userInfo.id, email: emailText})
            window.localStorage.removeItem("token");
            window.location.href = "./login"
            setEmailEdit(true)
        }
    }
    const editPasswordSubnit = async (event) => {
        event.preventDefault()
        if(changingPassword === false) {
            setChangingPassword(true)
        } else {
            const response = await axios.post("/users/change/password", {idUser: userInfo.id, oldPassword: oldPassword, newPassword: newPassword})
            console.log(response);
            if (response.data.error) {
                if (response.data.error === "Password doesn't match") {
                    Swal.fire({
                        title: "La contraseña anterior no coincide.", 
                        icon: "error",
                    });
                }
            } else {
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
        }
    }

    return (
        <div className="ProfileInformation__Main">
            <p className="ProfileInformation__Tittle">Informacion</p>
            <div>
                <div className="ProfileInformation__InfoSection">
                    <p className="profileInformation__InfoSection__Text">Usuario:</p>
                    {userNameEdit?<p className="profileInformation__InfoSection__Text">{userInfo.user_name}</p>:
                        <input className="ProfileInformation__InfoSection__Input" placeholder={userInfo.user_name} onChange={userNameChangeHandler} maxLength="32" value={userNameText}></input>
                    }
                    {userNameUsed && <p style={{color:"red", fontSize:12}}>*Nombre de suario en uso</p>}
                    <span onClick={editUserNameSubmit} className="material-symbols-outlined move-right Pointing" style={userNameUsed?{color:"grey", pointerEvents:"none"}:{}}>{userNameEdit?"edit":"save_as"}</span>
                </div>
                <div className="ProfileInformation__InfoSection">
                    <p className="profileInformation__InfoSection__Text">Nombre:</p>
                    {nameEdit?<p className="profileInformation__InfoSection__Text">{userInfo.name} {userInfo.last_name}</p>:
                        <div>
                            <input id="name_input" className="ProfileInformation__InfoSection__Input" value={nameText} maxLength="32" onChange={nameChangeHandler} placeholder={userInfo.name}></input>
                            <input id="latName_input" className="ProfileInformation__InfoSection__Input" value={lastNameText} maxLength="32" onChange={nameChangeHandler} placeholder={userInfo.last_name}></input>
                        </div>
                    }
                    <span onClick={editNameSubmit} className="material-symbols-outlined move-right Pointing">{nameEdit?"edit":"save_as"}</span>
                </div>
                <div className="ProfileInformation__InfoSection">
                    <p className="profileInformation__InfoSection__Text">Correo:</p>
                    {emailEdit?<p className="profileInformation__InfoSection__Text">{userInfo.email}</p>:
                        <input className="ProfileInformation__InfoSection__Input" placeholder={userInfo.email} value={emailText} type="email" onChange={emailChangeHandler}></input>
                    }
                    {emailUsed && <p style={{color:"red", fontSize:12}}>*Correo en uso</p>}
                    <span onClick={editEmailSubmit} className="material-symbols-outlined move-right Pointing" style={emailUsed?{color:"grey", pointerEvents:"none"}:{}}>{emailEdit?"edit":"save_as"}</span>
                </div>
            </div>
            <div className="ProfileInformation__LowerOptions__Box">
                <div className="ProfileInformation__LowerOptions__Section">
                    {changingPassword?
                        <form className="ProfileInformation__LowerOptions__InputsBox">
                            <label>Contraseña actual</label>
                            <input id="old_password" className="ProfileInformation__LowerOptions__Inputs" value={oldPassword} maxLength="64" onChange={passwordChangeHandler}></input>
                            <label>Contraseña nueva</label>
                            <input id="new_password" className="ProfileInformation__LowerOptions__Inputs" value={newPassword} maxLength="64" onChange={passwordChangeHandler}></input>
                            {newPasswordWarning ? <p className="ProfileInformation__InputsBox__Warning">*Ingresa una combinacion de al menos 8 Mayusculas, Minusculas, Numeros y Caracteres especiales (@#$%^&+=!)</p>: <br></br>}
                            <label>Repetir contraseña</label>
                            <input id="repeat_password" className="ProfileInformation__LowerOptions__Inputs" value={repeatPassword} maxLength="64" onChange={passwordChangeHandler}></input>
                            {repeatPasswordWarning ? <p className="ProfileInformation__InputsBox__Warning">*La nueva contraseña no coincide</p> : <br></br>}
                            <button className="ProfileInformation__LowerOptions__Buttons" onClick={editPasswordSubnit}>Guardar</button>
                        </form>
                    :<button className="ProfileInformation__LowerOptions__Buttons" onClick={editPasswordSubnit}>Cambiar Contraseña</button>
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