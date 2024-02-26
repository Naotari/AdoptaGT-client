import "./NewPost.css"
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios";
import { NewPostWindowSwitch } from "../../redux/newPostSlice";

const NewPost = () => {

    const dispatch = useDispatch()
    const idUser = useSelector((state) => state.LoginInfo.loginData.id)

    const [descriptionText, setDescriptionText] = useState("")
    const [imageCloud, setImageCloud] = useState("")
    const [posting, setPosting] = useState(false)

    const descriptionChangeHandler = (e) => {
        console.log(e.target.value);
        setDescriptionText(e.target.value)
    }
    const closeNewPostHandler = () => {
        dispatch(NewPostWindowSwitch(false))
    }
    const imageCloudChangeHandler = (event) => {
        console.log(URL.createObjectURL(event.target.files[0]));
        setImageCloud(event.target.files[0])
    };
    const imageCloudDeletehandler = (event) => {
        event.preventDefault()
        const fileInput = document.getElementById('cloudImage');
        fileInput.value = ''
        setImageCloud("")
    }
    const submitHandler = async (event) => {
        event.preventDefault()
        try {
            setPosting(true)
            let cloudImageURL = ""

            if (imageCloud) {
                console.log("entra aqui");
                const imageData = new FormData();
                imageData.append("file", imageCloud); //element file is the image that was selected
                imageData.append("folder", "/AdoptaGT/post_image"); //element folder is the path from cloudanity wher the image will be saved
                imageData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET_POST); // upload preset from cloudinary
                const cloudImageResponse = await axios.post("https://api.cloudinary.com/v1_1/dyiymsxec/upload/", imageData)
                console.log(cloudImageResponse);
                cloudImageURL = cloudImageResponse.data.secure_url;
            }
            const postCreation = {
                user_id: idUser,
                image: cloudImageURL,
                text: descriptionText,
            }
            const responseAPI = await axios.post("/posts", postCreation)
            console.log(responseAPI);
    
            setPosting(false)
            dispatch(NewPostWindowSwitch(false))
            location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="NewPostWindow_Main">
            {posting && 
                <div className="NewPostWindow__Posting">
                    <p>Publicando...</p>
                    <i className="material-symbols-outlined LoadingRotation">
                        cached
                    </i>
                </div>
            }
            <div className="NewPostWindow_Title">
                Crear publicación
                <button onClick={closeNewPostHandler} className="material-symbols-outlined NewPostWindow_Close">
                    close
                </button>
            </div>
            <div className="NewPostWindow_Content">
                <form className="NewPostWindow_Form" onSubmit={submitHandler}>
                    <label htmlFor="description"></label>
                    <textarea
                        id="description"
                        name="description"
                        value={descriptionText}
                        onChange={descriptionChangeHandler}
                        placeholder="Descripcion"
                        className="NewPostWindow--description__Box">
                    </textarea>

                    {imageCloud &&
                        <div className="NewPostWindow_Content_Section_Image_Box">
                            <img src={URL.createObjectURL(imageCloud)} className="NewPostWindow_Content_Section_Image"></img>
                            <button onClick={imageCloudDeletehandler} className="material-symbols-outlined NewPostWindow_Close Over_Image">
                                close
                            </button>
                        </div>
                    }

                    <div className="NewPostWindow--BelowOptions">
                        <label htmlFor="cloudImage" className="material-symbols-outlined NewPostWindow--ImageLabel">photo_camera</label>
                        <input id="cloudImage" type="file" className="NewPostWindow--ImageButton" onChange={imageCloudChangeHandler}></input>
                        <button className="NewPostWindow_UploadButton" disabled={descriptionText ? false : true}>publicar</button>
                    </div>
                </form>
            </div>
        </div>  
    )
}

export default NewPost;