import { useState } from "react"
import "./Admin.css"
import Users from "./tables/Users"
import { useSelector, useDispatch } from 'react-redux'
import {obtainLoginInfo, loginState} from "../../redux/loginInfoSlice"


const Admin = () => {
    
    const [selectedList, setSelectedList] = useState(<Users/>)

    const userData = useSelector((state) => state.LoginInfo.loginData);
    console.log(userData.role);
    if (window.localStorage.token) {
        if (!(userData.role === undefined) && !(userData.role === "admin")) window.location.href = "./inicio"
    } else window.location.href = "./inicio"
    
    return (
        <div className="Admin__Main">
            <div className="Admin--Tag__Section">
                <button className="Admin--Tag__Button" onClick={() => {window.location.href = "./profile"} }>
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <button className="Admin--Tag__Button">Usuarios</button>
                <button className="Admin--Tag__Button">Posts</button>
                <button className="Admin--Tag__Button">Adopciones</button>
            </div>
            <div className="Admin--Tables__Section">
                {selectedList}
            </div>
        </div>
    )
}

export default Admin;