import axios from "axios"
import "./NavBar.css"
import { useState, useEffect } from "react"


const NavBar = () => {

    const [userData, setUserData] = useState("")
    const [logged, setLogged] = useState(false)
    let tokenObject = {token: window.localStorage.token}

    const tempFunction = async()=> { //Verification
        // console.log(tokenObject);
        if (tokenObject.token === undefined) {
            setLogged(false)
        } else {
            // console.log("entra aqui");
            const response = await axios.post("users/verify", tokenObject)
            //here I need to create the redirect when the user was not found.
            const data = await axios.get(`users/${response.data.idUser}`)
            setUserData(data.data)
            setLogged(true)
            // console.log(data.data);
        }
    };

    useEffect(() => {
        tempFunction();
    }, [])

    return (
        <div className="NavBar_Main">
            <div>
                <a href="/inicio">
                <img src="https://res.cloudinary.com/dyiymsxec/image/upload/v1677607164/AdoptaGT/Paw_icon.png" alt="home" className="NavBar_Icon"></img>
                </a>
            </div>
            <div className="NavBar_Links">
                <a href="/posts" className="NavBar__TextFormat__Box">
                    <p className="NavBar__TextFormat">Posts</p>
                </a>
                <a href="/adoptions" className="NavBar__TextFormat__Box">
                    <p className="NavBar__TextFormat">Adopciones</p>
                </a>
            </div>
            <div>
            <a href={logged === true ? "/profile" : "/login"} className="NavBar__TextFormat__Box UserBox">
                    <p className="NavBar__TextFormat">{logged === true ? userData.user_name : "Iniciar sesion"}</p>
                    {logged === false ? <span className="material-symbols-outlined NavBar__User--Default">account_circle</span> : <img src={userData.image} className="NavBar_Icon UserIcon"></img>}
                </a>
            </div>
        </div>
    )
}

export default NavBar;