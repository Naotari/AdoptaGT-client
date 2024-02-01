import { useEffect, useState } from "react";
import "./Post.css"
import { useSelector } from 'react-redux'
import Swal from "sweetalert2";
import axios from "axios";

const Post = (props) => {

    const idLogged = useSelector((state) => state.LoginInfo.loginData.id)

    const [deletePostOption, setDeletePostOption] = useState(false)

    
    const userName = props.info.User.user_name
    const userIcon = props.info.User.image
    const postContent = props.info.text
    const postImage = props.info.image

    const dateString = props.info.createdAt;
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-based, so add 1 to get the correct month.
    const year = date.getFullYear();

    const postDate = `${day}/${month}/${year}`
    const postLikes = "35"
    const postCommentsCount = "15"
    const postComments = "commentario de pruebas"

    const deletePostHandler = () => {
        Swal.fire({
            title: "Deseas eliminar la publicacion?",
            showCancelButton: true,
            confirmButtonColor: "#68D4CE",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar"
        }).then((result) => {
            if(result.isConfirmed) {
                axios.delete("/posts/" + props.info.id)
                .then((result) => {
                    Swal.fire({
                        title: "Eliminada!",
                        text: "Tu publicacion ha sido eliminada.",
                        icon: "success"
                    })
                })
                .catch((error) => {
                    if (error.response.data.state === "error") {
                        Swal.fire({
                            title: "Error!",
                            text: "Tu publicacion no se pudo eliminar, intentalo mas tarde.",
                            icon: "error"
                        })
                    }
                });
            }
        })
    }
    
    useEffect(() => {
        if ( idLogged === props.info.user_id ) setDeletePostOption(true);
    }, [idLogged])
    
    return (
        <div className="Post_Main">
            <div className="Post_Main_User_Section">
                <img src={userIcon} alt="user" className="Post_Main_Image"></img>
                <div>
                    <p className="Post_Main_User_Section_User">{userName}</p>
                    <p className="Post_Main_User_Section_Date">{postDate}</p>
                </div>
                { deletePostOption && 
                    <button onClick={deletePostHandler}>
                        <span className="material-symbols-outlined">
                            delete
                        </span>
                    </button>
                }
            </div>
            <div className="Post_Main_Content_Section">
                <p className="Post_Main_Content_Section_Text">{postContent}</p>
                <div className="Post_Main_Content_Section_Image_Box">
                    <img src={postImage} className="Post_Main_Content_Section_Image"></img>
                </div>
            </div>
            <div className="Post_Main_Content_Info">
                <p className="Post_Main_Content_Info_Number">{postLikes} Me gusta</p>
                <p className="Post_Main_Content_Info_Number">{postCommentsCount} Comentarios</p>
                
            </div>
            <div className="Post_Main_Content_Actions">
                <button className="Post_Main_Content_Actions_Buttons">Me gusta</button>
                <button className="Post_Main_Content_Actions_Buttons">Comentarios</button>
            </div>
        </div>
    )
}

export default Post;