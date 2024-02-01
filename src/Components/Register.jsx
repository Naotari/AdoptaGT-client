import "./Register.css"
import React, {useEffect, useState} from "react";
import axios from "axios";

const Register = () => {


    const [userName, setUserName] = useState("")
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [imageCloud, setImageCloud] = useState("")
    const [posting, setPosting] = useState(false)
    const [submitButtonState, setsubmitButtonState] = useState(true)
    const [userNameTakken, setUserNameTakken] = useState(false)
    const [userEmailTakken, setUserEmailTakken] = useState(false)
    const [strongPassword, setStrongPassword] = useState(false)
    const [URL, setURL] = useState(false)

    const userNameChangeHandler = (e) => {setUserName(e.target.value)};
    const nameChangeHandler = (e) => {setName(e.target.value)};
    const lastNameChangeHandler = (e) => {setLastName(e.target.value)};
    const emailChangeHandler = (e) => {setEmail(e.target.value)};
    const passwordChangeHandler = (e) => {setPassword(e.target.value)};
    const imageCloudChangeHandler = (event) => {setImageCloud(event.target.files[0])};
    const imageCloudDeletehandler = (event) => {
        event.preventDefault()
        const fileInput = document.getElementById('cloudImage');
        fileInput.value = ''
        setImageCloud("")
    }
    const handleSubmit = async(e) => {
        e.preventDefault(); //Prevent the page to refresh and remove the info typed in
        try {

            setPosting(true)
            let cloudImageURL = ""

            if (imageCloud) { //Process to upload the image in cloudinary
                const imageData = new FormData();
                imageData.append("file", imageCloud); //element file is the image that was selected
                imageData.append("folder", "/AdoptaGT/user_image"); //element folder is the path from cloudanity wher the image will be saved
                imageData.append("upload_preset", "adoptagt_user_image"); // upload preset from cloudinary
                const cloudImageResponse = await axios.post("https://api.cloudinary.com/v1_1/dyiymsxec/upload/", imageData)
                // console.log(cloudImageResponse);
                cloudImageURL = cloudImageResponse.data.secure_url;
                setURL(cloudImageURL)
            }

            const newUser = {
                    user_name: userName,
                    name,
                    last_name: lastName,
                    email,
                    password,
                    image: cloudImageURL,
            }
            const response = await axios.post("/users", newUser)
            // console.log(response);

            setPosting(false)
            window.location.href = "./login"
    
        } catch (error) {
            axios.delete("/users/user/iamge", {imageURL : URL})
            .then(response => console.log("deletion image ==>" , response , "this is the error ==>" , error))
        }

    }

    useEffect(() => {
        if(userName === "") setsubmitButtonState(true);
        else if(name === "" || userNameTakken === true) setsubmitButtonState(true);
        else if(lastName === "") setsubmitButtonState(true)
        else if(email === "" || userEmailTakken === true) setsubmitButtonState(true)
        else if(password === "" || strongPassword === true) setsubmitButtonState(true)
        else if(imageCloud === "") setsubmitButtonState(true)
        else setsubmitButtonState(false)
    }, [ userName, name, lastName, email, password, imageCloud, userNameTakken, userEmailTakken, strongPassword])

    useEffect(() => { //Check the user name availability
        const request = async () => {
            if (userName !== "") {
                const response = await axios.post("/users/verify/user_name", {user_name: userName})
                if (response.data.message === "There is already a user with that user_name") {
                    setUserNameTakken(true);
                    setsubmitButtonState(true);
                }
                else setUserNameTakken(false)
            }
        }
        request()
    }, [userName])
    useEffect(() => { //check the email availavility
        const request = async () => {
            if (email !== "") {
                const response = await axios.post("/users/verify/email", {email})
                if (response.data.message === "There is already a user with that email") {
                    setUserEmailTakken(true);
                    setsubmitButtonState(true);
                }
                else setUserEmailTakken(false)
            }
        }
        request()
    }, [email])
    useEffect(() => { // check the password requirements
        const request = async () => {
            const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\S+$).{8,}$/;
            if (!(password === "" || regex.test(password))) {
                setStrongPassword(true)
                setsubmitButtonState(true);
            } else setStrongPassword(false)
        }
        request()
    }, [password])

    return (
        <div className="Register_Main">
            <form onSubmit={handleSubmit} className="Register__Form">
                {posting && 
                    <div className="Registration__Posting">
                        <p>Creando cuenta...</p>
                        <i className="material-symbols-outlined LoadingRotation">cached</i>
                    </div>
                }
                <div className="Register__Form__Sub">
                    <div className="Register__Form--DataBox">
                        <p className="Register__Tittle">Registrarse</p>
                        <label htmlFor="userName">Usuario: {userNameTakken && <a style={{margin: 10, fontSize:"11px", color:"red"}}>Ya existe el nombre de usuario.</a>}</label>
                        <input className="Register__InputBox" maxLength="32" value={userName} onChange={userNameChangeHandler} type="text" placeholder="Tu nombre de usuario" id="userName" name="userName" style={userNameTakken ? { color: "red" } : {}}></input>
                        
                        <label htmlFor="name">Nombre:</label>
                        <input className="Register__InputBox" maxLength="32" value={name} onChange={nameChangeHandler} type="text" placeholder="Tu nombre" id="name" name="name"></input>

                        <label htmlFor="lastName">Apellido:</label>
                        <input className="Register__InputBox" maxLength="32" value={lastName} onChange={lastNameChangeHandler} type="text" placeholder="Tu apellido" id="lastName" name="lastName"></input>

                        <label htmlFor="email">Correo Electrónico: {userEmailTakken && <a style={{margin: 10, fontSize:"11px", color:"red"}}>Ya existe el Correo.</a>}</label>
                        <input className="Register__InputBox" value={email} onChange={emailChangeHandler} type="email" placeholder="Tu Correo Electrónico" id="email" name="email" style={userEmailTakken ? { color: "red" } : {}}></input>

                        <label htmlFor="password">Contraseña: {strongPassword && <a style={{margin: 0, fontSize:"11px", color:"red"}}>Ingresa una combinacion de al menos 8 Mayusculas, Minusculas, Numeros y Caracteres especiales (@#$%^&+=!)</a>}</label>
                        <input className="Register__InputBox" value={password} onChange={passwordChangeHandler} type="text" placeholder="****" id="password" name="password" style={strongPassword ? { color: "red" } : {}}></input>
                    </div>

                    {imageCloud &&
                        <div className="Register_Content_Section_Image_Box">
                            <img src={URL.createObjectURL(imageCloud)} className="Register_Content_Section_Image"></img>
                            <button onClick={imageCloudDeletehandler} className="material-symbols-outlined Register_Close">
                                close
                            </button>
                        </div>
                    }
                </div>
                <div className="Register--BelowOptions">
                    <label htmlFor="cloudImage" className="material-symbols-outlined Register--ImageLabel">photo_camera</label>
                    <input id="cloudImage" type="file" className="Register--ImageButton" onChange={imageCloudChangeHandler}></input>
                    <button className="register__UploadButton" type="submit" disabled={submitButtonState}>Crear Cuenta</button>
                </div>
            </form>

            <a href="/login" style={{borderRadius:"20px"}}><button className="register__UploadButton">Ya tienes cuenta? Inicia sesión aqui.</button></a>
        </div>
    )
}

export default Register;