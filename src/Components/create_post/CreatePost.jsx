import { useState } from "react";
import "./CreatePost.css"
import NewPost from "./NewPost";


const CreatePost = (props) => {

    const [newPostShow, setNewPostShow] = useState(false)
    
    const idUser = props.idUser
    
    const createPostHandler = () => {
        console.log(idUser);
        setNewPostShow(true)
    }
    
    return (
        <div className="CreatePost_Main">
            {newPostShow && <NewPost setNewPostShow={setNewPostShow} idUser={idUser}/>}
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