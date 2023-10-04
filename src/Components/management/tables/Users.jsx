import { useEffect, useState } from "react";
import "./Users.css"
import axios from "axios";
import Edit from "../Edit";


const Users = () => {

    const [allUsersData, setAllUsersData] = useState(null)
    const [usersList, setUsersList] = useState(null)
    const [editComponent, setEditComponent] = useState(false)
    const [editComponentUserId, serEditComponentUserId] = useState(null)

    const allUsersDataFetch = async () => { //Getting all data
        const response = await axios.get("users/")
            setAllUsersData(response.data)
    }

    const deleteUser = async (id) => {
        const response = await axios.delete(`users/${id}`)
        allUsersDataFetch()
    }

    const deleteHandler = (e) => {
        console.log(e.target.value);
        swal({
            title: "¿Estas seguro?",
            text: "Una vez eliminada la cuenta ya no se puede Recuperar.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
            .then((willDelete) => {
            if (willDelete) {
                deleteUser(e.target.value)
                swal("La cuenta fue eliminada", {
                icon: "success",
                });
            } else {
                swal("No se elimino la cuenta");
            }
        });
    }

    const editHandler = (e) => {
        console.log(e.target.value);
        setEditComponent(true)
        serEditComponentUserId(e.target.value)
    }
    const closeButtonHandler = (e) => {
        setEditComponent(false)
    }


    useEffect(() => {
        allUsersDataFetch();
    },[])
    useEffect(() => {
        if(allUsersData) { //waiting until all data is done to continue
            console.log(allUsersData[0]);
            const convertedList = allUsersData.map( (user) => {
                return (
                <div className="User__List__Box" key={user.id}>
                    <p className="Space_Table--User">{user.user_name}</p>
                    <p className="Space_Table--Name">{user.name} , {user.last_name}</p>
                    <p className="Space_Table--Email">{user.email}</p>
                    <p className="Space_Table--Role">{user.role}</p>
                    <p className="Space_Table--State">{user.state}</p>
                    <div className="Space_Table--Options">
                        <button onClick={deleteHandler} value={user.id} className="material-symbols-outlined">
                            delete
                        </button>
                        <button onClick={editHandler} value={user.id} className="material-symbols-outlined">
                            edit
                        </button>
                    </div>
                </div>
                )
            })
            setUsersList(convertedList)
        }
    },[allUsersData])

    return (
        <div className="Users__Main">
            {editComponent? <Edit userId = {editComponentUserId} closeButtonHandler = {closeButtonHandler}/> : ""}
            <div>Filtros</div>
            <div className="Users__Section__Title__Bar">
                <p className="Space_Table--User">Usuario</p>
                <p className="Space_Table--Name">Nombre</p>
                <p className="Space_Table--Email">Correo</p>
                <p className="Space_Table--Role">Role</p>
                <p className="Space_Table--State">Estado</p>
                <p className="Space_Table--Options">Opciones</p>
            </div>
            {usersList}
        </div>
    )
}

export default Users;