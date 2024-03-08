import "./RecoveryPasswordForm.css"
import React, {useEffect, useState} from "react";
import axios from "axios";
import Swal from 'sweetalert2'

const RecoveryPasswordForm = () => {

    if (!(window.localStorage.token == undefined)) { window.location.href = "./profile" } //Redirect if a user is logged

    const [email, setEmail] = useState("")
    const [emailSent, setEmailSent] = useState(false)

    const advertaismentEmailSent = (
        <div className="RecoveryPasswordForm__Message__Email__Sent">
            <h2>El correo se ha enviado.</h2>
            <p>Revisa tu bandeja de entrada o tu bandeja de spam.</p>
            <p style={{fontSize: "15px", marginTop:"10px"}}>En caso de no recibirlo, intenta nuevamente o intentalo mas tarde.</p>
        </div>
    )

    if (!(window.localStorage.token == undefined)) { window.location.href = "./profile" } //Redirect if a user is logged
    
    const emailChangeHandler = (e) => {setEmail(e.target.value)};

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const emailFormat = {email}
            const recoveryEmailVerificationResponse = await axios.put("/users/password_recovery/email_verification", emailFormat)
            if (recoveryEmailVerificationResponse.data.state === "ok") setEmailSent(true)
        } catch (error) {
    console.log(error);
            if (error.response.data.content === "Email not found") {
                Swal.fire({
                    text: "No se encontro el Correo ingresado",
                    icon: "error",
                });
            }
            if (error.response.data.content === "Email Inactive") {
                Swal.fire({
                    text: "La cuenta relacionada a este email esta deshabilitada.",
                    icon: "error",
                });
            }
        }
    }

    return (
        <div className="RecoveryPasswordForm_Main">
            {emailSent ? advertaismentEmailSent : 
                <>
                    <form onSubmit={handleSubmit} className="RecoveryPasswordForm__Form">
                        <h2>Recuperacion de cuenta</h2>
                        <label htmlFor="email">Ingresa tu Correo Electrónico:</label>
                        <input className="RecoveryPasswordForm__InputBox" value={email} onChange={emailChangeHandler} type="email" placeholder="Tu Correo Electrónico" id="email" name="email" maxLength="64"></input>

                        <button className="RecoveryPasswordForm__UploadButton" type="submit" disabled={email === ""}>Enviar recuperacion de contraseña</button>
                    </form>
                    <a href="/register" style={{borderRadius:"20px"}}><button className="RecoveryPasswordForm__UploadButton">No tienes cuenta? Registrate aqui.</button></a>
                    <a href="/login" style={{borderRadius:"20px", marginTop:"10px"}}><button className="RecoveryPasswordForm__UploadButton">Iniciar sesion con contraseña</button></a>
                </>
            }
        </div>
    )
}

export default RecoveryPasswordForm;