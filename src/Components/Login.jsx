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
            const response = await axios.post("users/login", loginUser)
            if (response.data.status === "ok") {
                Swal.fire({
                    text: "Accediendo",
                });
                window.localStorage.setItem("token", response.data.accessToken);
                window.location.href = "./inicio";
            }
            else {
                const responseDB = response.data.error
                if (responseDB === "User not found") {
                    Swal.fire({
                        text: "No se encontro el usuario",
                        icon: "error",
                        timer: 5000,
                    });
                }
                else if (responseDB === "Incorrect password") {
                    Swal.fire({
                        text: "Contraseña incorrecta",
                        icon: "error",
                        timer: 5000,
                    });
                }
            }
        } catch (error) {
            console.log(error);
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
                <input className="Login__InputBox" value={email} onChange={emailChangeHandler} type="email" placeholder="Tu Correo Electrónico" id="email" name="email"></input>

                <label htmlFor="password">Password</label>
                <input className="Login__InputBox" value={password} onChange={passwordChangeHandler} type="password" placeholder="****" id="password" name="password"></input>

                <button className="login__UploadButton" type="submit" disabled={LoginButtonState}>Iniciar sesión</button>
            </form>
            <a href="/register" style={{borderRadius:"20px"}}><button className="login__UploadButton">No tienes cuenta? Registrate aqui.</button></a>
        </div>
    )
}

export default Login;