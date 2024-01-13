import "./CreatePost.css"
import NewPost from "./NewPost";
import { useSelector, useDispatch } from 'react-redux'
import { NewPostWindowSwitch } from "../../redux/newPostSlice";


const CreatePost = () => {

    const dispatch = useDispatch()

    const NewPostWindowState = useSelector((state) => state.NewPost.NewPostWindowState)
    
    const createPostHandler = () => {
        dispatch(NewPostWindowSwitch(true))
    }
    
    return (
        <div className="CreatePost_Main">
            {NewPostWindowState && <NewPost/>}
            <button onClick={createPostHandler} className="CreatePost_Button">
                <span className="material-symbols-outlined">
                    add_box
                </span>
                Crear nueva publicación
            </button>
        </div>
    )
}

export default CreatePost;