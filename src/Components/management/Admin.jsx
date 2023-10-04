import { useState } from "react"
import "./Admin.css"
import Users from "./tables/Users"

const Admin = () => {

    const [selectedList, setSelectedList] = useState(<Users/>)


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