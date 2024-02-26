import "./Edit.css"
import { useState, useEffect } from "react";
import axios from "axios";

const Edit = (props) => {
    console.log("estos son los props --->", props);

    const [userData, setUserData] = useState(null)
    const [editOptions, setEditOptions] = useState(null)

    const getUserData = async () => {
        const response = await axios.get(`users/${props.userId}`)
        setUserData(response.data.content)
    }

    const userNameChangeHandler = (event) => {
        setUserData((prevState) => ({
            ...prevState,
            user_name: event.target.value,
        }));
    };
    const nameChangeHandler = (event) => {
        setUserData((prevState) => ({
            ...prevState,
            name: event.target.value,
        }));
    };
    const lastNameChangeHandler = (event) => {
        setUserData((prevState) => ({
            ...prevState,
            last_name: event.target.value,
        }));
    };
    const emailChangeHandler = (event) => {
        setUserData((prevState) => ({
            ...prevState,
            email: event.target.value,
        }));
    };
    const roleChangeHandler = (event) => {
        setUserData((prevState) => ({
            ...prevState,
            role: event.target.value,
        }));
    };

    useEffect(() => {
        getUserData();
    },[])
    useEffect(() => {
        if(userData) {
            console.log(userData);

            setEditOptions(
                <div className="Edit__Second">
                    <p className="Edit--Title">Editar usuario con ID: {userData.id}</p>
                    <form className="Edit--Form">

                        <div className="Edit--Form__Section">
                        <label htmlFor="user_name">Usuario</label>
                        <input value={userData.user_name} onChange={nameChangeHandler}id="user_name" type="text"  name="user_name"></input>
                        </div>

                        <div className="Edit--Form__Section">
                        <label htmlFor="name">Nombre</label>
                        <input value={userData.name} onChange={nameChangeHandler}id="name" type="text"  name="name"></input>
                        </div>

                        <div className="Edit--Form__Section">
                        <label htmlFor="last_name">Apellido</label>
                        <input value={userData.last_name} onChange={lastNameChangeHandler}id="last_name" type="text"  name="last_name"></input>
                        </div>

                        <div className="Edit--Form__Section">
                        <label htmlFor="email">Correo</label>
                        <input value={userData.email} onChange={emailChangeHandler}id="email" type="email"  name="email"></input>
                        </div>

                        <div className="Edit--Form__Section">
                        <select name="role" id="role" onChange={roleChangeHandler} value={userData.role}>
                            <option value="admin">Administrador</option>
                            <option value="moderator">Moderador</option>
                            <option value="user">Usuario</option>
                        </select>
                        </div>
                        
                    </form>
                    <div>
                        <button onClick={props.closeButtonHandler}>Guardar Cambios</button>
                        <button onClick={props.closeButtonHandler}>Cerrar</button>
                    </div>
                </div>
            )
        }
    },[userData])

    return (
        <div className="Edit__Main">
            {editOptions}
        </div>
    )
}

export default Edit;