import axios from "axios"
import "./NavBar.css"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import {obtainLoginInfo, loginState} from "../redux/loginInfoSlice"


const NavBar = () => {

    const dispatch = useDispatch()

    const userData = useSelector((state) => state.LoginInfo.loginData)
    const logged = useSelector((state) => state.LoginInfo.logged)
    
    let tokenObject = {token: window.localStorage.token}

    const tempFunction = async()=> { //Verification
        if (tokenObject.token === undefined) {
            dispatch(loginState(false))
        } else {
            const response = await axios.post("users/verify", tokenObject)
            //here I need to create the redirect when the user was not found.
            const getUserResponse = await axios.get(`users/${response.data.content.idUser}`)
            dispatch(loginState(true))
            dispatch(obtainLoginInfo(getUserResponse.data.content))
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