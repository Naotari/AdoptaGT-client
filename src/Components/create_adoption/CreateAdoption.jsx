import { useState } from "react";
import "./CreateAdoption.css"
import NewAdoptionWindow from "./NewAdoptionWindow";


const CreateAdoption = (props) => {

    const [newAdoptionShow, setNewAdoptionShow] = useState(false)
    
    const idUser = props.idUser
    
    const createAdoptionHandler = () => {
        console.log(idUser);
        setNewAdoptionShow(true)
    }
    
    return (
        <div className="CreateAdoption_Main">
            {newAdoptionShow && <NewAdoptionWindow setNewAdoptionShow={setNewAdoptionShow} idUser={idUser}/>}
            <button onClick={createAdoptionHandler} className="CreatePost_Button CreateAdoption_Button">
                <span className="material-symbols-outlined">
                    add_box
                </span>
                Crear nueva Adopción
            </button>
        </div>
    )
}

export default CreateAdoption;