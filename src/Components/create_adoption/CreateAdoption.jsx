import "./CreateAdoption.css"
import NewAdoptionWindow from "./NewAdoptionWindow";
import { useSelector, useDispatch } from 'react-redux'
import { NewAdoptionWindowSwitch } from "../../redux/newAdoptionSlice";


const CreateAdoption = () => {

    const dispatch = useDispatch()

    const NewAdoptionWindowState = useSelector((state) => state.NewAdoption.NewAdoptionWindowState)
    
    const createAdoptionHandler = () => {
        dispatch(NewAdoptionWindowSwitch(true))
    }
    
    return (
        <div className="CreateAdoption_Main">
            {NewAdoptionWindowState && <NewAdoptionWindow/>}
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