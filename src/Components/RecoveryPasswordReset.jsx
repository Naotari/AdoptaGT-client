import { useEffect, useState } from "react";
import "./RecoveryPasswordReset.css"
import axios from "axios";
import Swal from 'sweetalert2'
import { useParams } from "react-router-dom";

const RecoveryPasswordReset = () => {

    if (!(window.localStorage.token == undefined)) { window.location.href = "../inicio" } //Redirect if a user is logged
    
    let { token } = useParams();
    console.log(token);
    
    const [newPassword, setNewPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [newPasswordWarning, setNewPasswordWarning] = useState(false)
    const [repeatPasswordWarning, setRepeatPasswordWarning] = useState(false)
    const [changePasswordButtonState, setChangePasswordButtonState] = useState(false)

    const passwordChangeHandler = async (event) => {
        if (event.target.id === "new_password") {
            setNewPassword(event.target.value)
        }
        if (event.target.id === "repeat_password") {
            setRepeatPassword(event.target.value)
        }
    }

    const editPasswordSubmit = async(e) => {
        e.preventDefault();
        try {
            const passwordAndToken = {
                token,
                password: repeatPassword,
            }
            console.log(passwordAndToken);
            const recoveryPasswordResetResponse = await axios.put("/users/password_reset", passwordAndToken)
            if (recoveryPasswordResetResponse.data.state === "ok") {
                Swal.fire({
                    title: "Contraseña cambiada, inicia sesion de nuevo",
                    text: "Redirigiendo a inicio de sesion.",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 4000
                });
                setTimeout(() => { //Se ejecuta DESPUES del conteo
                    window.localStorage.removeItem("token");
                    window.location.href = "../../login"
                }, 4500)
            }
        } catch (error) {
            if (error.response.data.content === "Expired token") {
                Swal.fire({
                    title: "Token expirado",
                    text: "Envia de nuevo un correo de recuperacion de contraseña.",
                    icon: "error",
                });
            }
        }

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

        if (newPassword === "" ||
            repeatPassword === "" ||
            !(regex.test(newPassword)) ||
            newPassword !== repeatPassword
        ) setChangePasswordButtonState(false);
        else setChangePasswordButtonState(true);
    }, [newPassword, repeatPassword])


    return (
        <div className="RecoveryPasswordReset_Main">
            <form className="RecoveryPasswordReset__Form">
                <h2>Restablecer de contraseña</h2>
                <label>Contraseña nueva</label>
                <input id="new_password" className="ProfileInformation__LowerOptions__Inputs" value={newPassword} maxLength="32" onChange={passwordChangeHandler}></input>
                {newPasswordWarning ? <p className="ProfileInformation__InputsBox__Warning">*Ingresa una combinacion de al menos 8 Mayusculas, Minusculas, Numeros y Caracteres especiales (@#$%^&+=!)</p>: <br></br>}
                <label>Repetir contraseña</label>
                <input id="repeat_password" className="ProfileInformation__LowerOptions__Inputs" value={repeatPassword} maxLength="32" onChange={passwordChangeHandler}></input>
                {repeatPasswordWarning ? <p className="ProfileInformation__InputsBox__Warning">*La nueva contraseña no coincide</p> : <br></br>}
                <div>
                    <button className="ProfileInformation__LowerOptions__Buttons" onClick={editPasswordSubmit} disabled={!changePasswordButtonState}>Actualizar contraseña</button>
                </div>
            </form>
        </div>
    )
}

export default RecoveryPasswordReset;