import "./Post.css"

const Post = (props) => {

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

    return (
        <div className="Post_Main">
            <div className="Post_Main_User_Section">
                <img src={userIcon} alt="user" className="Post_Main_Image"></img>
                <div>
                    <p className="Post_Main_User_Section_User">{userName}</p>
                    <p className="Post_Main_User_Section_Date">{postDate}</p>
                </div>
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