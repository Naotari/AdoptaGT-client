import "./Profile.css"
import authorizationProcess from "../Utilities/Authorization"
import { useState, useEffect } from "react"
import axios from "axios";
import CreatePost from "./create_post/CreatePost";
import Posts from "./Posts";
import Adopciones from "./Adopciones"
import CreateAdoption from "./create_adoption/CreateAdoption";
import ProfileInformation from "./Profileinformation";


const Profile = () => {

    const [verified, setVerified] = useState("")
    const [userData, setUserData] = useState("")
    const [UserPanel, setUserPanel] = useState("")
    const [selectedInfo, setSelectedInfo] = useState("posts")
    const [specialButton, setSepecialButton] = useState("")
    const [uploadingUserImage, setUploadingUserImage] = useState(false)
    
    if (window.localStorage.token === undefined) { window.location.href = "./login" } //Redirect if no one is logged 
    
    const tempFunction = async()=> { //Verification and dataFetch
        const tokenObject = {token: window.localStorage.token}
        const response = await axios.post("users/verify", tokenObject)
        //here I need to create the redirect when the user was not found.
        setVerified(response.data)
        const data = await axios.get(`users/${response.data.idUser}`)
        setUserData(data.data)
        // console.log(data.data);
        if(data.data.role === "admin") {setSepecialButton(<button onClick={displayAdminPanelHandler}>Perfil Administrativo</button>)}
        else if(data.data.role === "moderator") {setSepecialButton(<button onClick={displayModPanelHandler}>Perfil de Moderador</button>)}
    };

    const userImageHandler = async(event) => {
        try {
            if(event.target.files[0]) {
                setUploadingUserImage(true)
    
                const imageData = new FormData();
                imageData.append("file", event.target.files[0]);
                imageData.append("folder", "/AdoptaGT/user_image");
                imageData.append("upload_preset", "adoptagt_user_image");
                const cloudImageResponse = await axios.post("https://api.cloudinary.com/v1_1/dyiymsxec/upload/", imageData)
                const cloudImageURL = cloudImageResponse.data.secure_url;
    
                const urlData = {
                    previous_Image_url: userData.image,
                    new_Image_url: cloudImageURL,
                    idUser: userData.id
                }
                const NewImageResponse = await axios.post("/users/user/image_update", urlData)

                const newUserData = {...userData, image: cloudImageURL}
                setUserData(newUserData)
                setUploadingUserImage(false)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const displayUserDetailsHandler = () => { setSelectedInfo("details") }
    const displayUserPostsHandler = () => { setSelectedInfo("posts") }
    const displayUserAdoptionsHandler = () => { setSelectedInfo("adoptions") }
    const displayAdminPanelHandler = () => {window.location.href = "./admin" }
    const displayModPanelHandler = () => {window.location.href = "./mod" }
    const closeSesionHandler = () => {
        window.localStorage.removeItem("token");
        window.location.href = "./inicio"
    }
    
    const userDetails = (
            <ProfileInformation userInfo={userData}></ProfileInformation>
    )
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
                <div className="Profile__Image--Box">
                    <img src={userData.image} alt="dog not found" className="Profile__Image"/>
                    {/* <button title="Cambiar imagen" className="material-symbols-outlined Profile__Image--Edit__Button" onClick={userImageHandler}>edit</button> */}
                    <label title="Cambiar imagen" htmlFor="userImage" className="material-symbols-outlined Profile__Image--Edit__Button">edit</label>
                    <input id="userImage" type="file" className="Profile__Image--Input" onChange={userImageHandler}></input>
                    {uploadingUserImage && <i className="material-symbols-outlined LoadingRotation Profile__Image--Uploading"> cached </i>}
                </div>
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