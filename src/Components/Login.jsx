import "./Login.css"
import React, {useEffect, useState} from "react";
import axios from "axios";
import Swal from 'sweetalert2'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [LoginButtonState, setLoginButtonState] = useState(true)

    if (!(window.localStorage.token == undefined)) { window.location.href = "./profile" } //Redirect if a user is logged
    
    const emailChangeHandler = (e) => {setEmail(e.target.value)};
    const passwordChangeHandler = (e) => {setPassword(e.target.value)};
    const handleSubmit = async(e) => {
        try {
            e.preventDefault();
            const loginUser = {
                email,
                password
            }
            const loginUserResponse = await axios.post("users/login", loginUser)
            if (loginUserResponse.data.state === "ok") {
                Swal.fire({
                    title: "Accediendo...",
                    showConfirmButton: false,
                });
                window.localStorage.setItem("token", loginUserResponse.data.content.accessToken);
                window.location.href = "./inicio";
            }
            else {
                const responseDB = loginUserResponse.data.content

            }
        } catch (error) {
            console.log(error);
            if (error.response.data.content === "User not found") {
                Swal.fire({
                    text: "No se encontro el usuario",
                    icon: "error",
                    timer: 5000,
                });
            }
            else if (error.response.data.content === "Incorrect password") {
                Swal.fire({
                    text: "Contraseña incorrecta",
                    icon: "error",
                    timer: 5000,
                });
            }
        }
    }

    useEffect(() => {
        if(email === "") setLoginButtonState(true)
        else if(password === "") setLoginButtonState(true)
        else setLoginButtonState(false)
    }, [email, password])

    return (
        <div className="Login_Main">
            <form onSubmit={handleSubmit} className="Login__Form">
                <p className="Login__Tittle">Iniciar sesión</p>
                <label htmlFor="email">Correo Electrónico:</label>
                <input className="Login__InputBox" value={email} onChange={emailChangeHandler} type="email" placeholder="Tu Correo Electrónico" id="email" name="email" maxlength="64"></input>

                <label htmlFor="password">Password</label>
                <input className="Login__InputBox" value={password} onChange={passwordChangeHandler} type="password" placeholder="****" id="password" name="password" maxlength="32"></input>

                <button className="login__UploadButton" type="submit" disabled={LoginButtonState}>Iniciar sesión</button>
            </form>
            <a href="/register" style={{borderRadius:"20px"}}><button className="login__UploadButton">No tienes cuenta? Registrate aqui.</button></a>
        </div>
    )
}

export default Login;