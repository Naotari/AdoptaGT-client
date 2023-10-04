import "./Profile.css"
import authorizationProcess from "../Utilities/Authorization"
import { useState, useEffect } from "react"
import axios from "axios";
import CreatePost from "./create_post/CreatePost";
import Posts from "./Posts";
import Adopciones from "./Adopciones"
import CreateAdoption from "./create_adoption/CreateAdoption";


const Profile = () => {

    const [verified, setVerified] = useState("")
    const [userData, setUserData] = useState("")
    const [UserPanel, setUserPanel] = useState("")
    const [selectedInfo, setSelectedInfo] = useState("posts")
    const [specialButton, setSepecialButton] = useState("")
    
    if (window.localStorage.token === undefined) { window.location.href = "./login" } //Redirect if no one is logged 
    
    const tempFunction = async()=> { //Verification and dataFetch
        const tokenObject = {token: window.localStorage.token}
        const response = await axios.post("users/verify", tokenObject)
        //here I need to create the redirect when the user was not found.
        setVerified(response.data)
        const data = await axios.get(`users/${response.data.idUser}`)
        setUserData(data.data)
        console.log(data.data);
        if(data.data.role === "admin") {setSepecialButton(<button onClick={displayAdminPanelHandler}>Perfil Administrativo</button>)}
        else if(data.data.role === "moderator") {setSepecialButton(<button onClick={displayModPanelHandler}>Perfil de Moderador</button>)}
    };

    const displayUserDetailsHandler = () => { setSelectedInfo("details") }
    const displayUserPostsHandler = () => { setSelectedInfo("posts") }
    const displayUserAdoptionsHandler = () => { setSelectedInfo("adoptions") }
    const displayAdminPanelHandler = () => {window.location.href = "./admin" }
    const displayModPanelHandler = () => {window.location.href = "./mod" }
    const closeSesionHandler = () => {
        window.localStorage.removeItem("token");
        window.location.href = "./inicio"
    }
    
    const userDetails = [
        <div className="Profile--User__Details" key={1}>
            <p>Usuario:</p>
            <p>{userData.user_name}</p>
            <p>Nombre:</p>
            <p>{userData.name} {userData.last_name}</p>
            <p>Correo:</p>
            <p>{userData.email}</p>
        </div>
    ]
    const userPosts = (
        <div>
            <CreatePost idUser={userData.id}/>
            <Posts></Posts>
        </div>
    )
    const userAdoptions = (
        <div>
            <CreateAdoption idUser={userData.id}></CreateAdoption>
            <Adopciones></Adopciones>
        </div>
    )

    useEffect(() => {
        tempFunction();
    }, [])
    
    useEffect(() => {
        if(selectedInfo === "posts") setUserPanel(userPosts)
        else if (selectedInfo === "details") setUserPanel(userDetails)
        else if (selectedInfo === "adoptions") setUserPanel(userAdoptions)
        
    }, [userData, selectedInfo])
    
    // if (window.localStorage.token) {
    //     const idUser = verified.idUser
    //     // console.log(userData);
    // } else {
    //     window.location.href = "./login";
    // }

    return (
        <div className="Profile_Main">
            <div className="Profile_first_Column">
                <img src={userData.image} alt="dog not found" className="Profile__Image"/>
                <p className="Profile_first_Column__Name">{userData.user_name}</p>
                <button className="Profile_first_Column__Button" onClick={displayUserPostsHandler}>Mis Publicaciones</button>
                <button className="Profile_first_Column__Button" onClick={displayUserAdoptionsHandler}>Mis Adopciones</button>
                <button className="Profile_first_Column__Button" onClick={displayUserDetailsHandler}>Informacion</button>
                {specialButton}
                {/* <button onClick={displayAdminPanelHandler}>Perfil Administrativo</button> */}
                <button className="Profile_first_Column__Button" onClick={closeSesionHandler}>Cerrar Sesion</button>
            </div>
                {UserPanel}
        </div>
    )
}

export default Profile;