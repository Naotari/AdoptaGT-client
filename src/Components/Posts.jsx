import "./Posts.css"
import Post from "./Post"
import axios from "axios"
import { useState, useEffect } from "react"

const Posts = () => {

    const [postsFromAPI, setPostsFromAPI] = useState([])
    const [postsFormated, setPostsFormated] = useState([])

    const getPostsfromAPI = async() => {
        try {
            const response = await axios.get("/posts")
            setPostsFromAPI(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    const formatPosts = () => {
        // console.log(postsFromAPI);
        let postsMapped = []
        postsFromAPI.forEach(post => postsMapped.push(
            <Post info={post} key={post.id}></Post>
        ))
        // console.log(postsMapped);
        setPostsFormated(postsMapped);
    }

    useEffect(() => {
        getPostsfromAPI();
        // console.log("Entra aqui");
    }, []);

    useEffect(() => {
        
        if(postsFromAPI.length > 0) {
            // console.log("Entra despues");
            formatPosts()
        }
    }, [postsFromAPI]);



    return (
        <div className="Posts_Main">
            {postsFormated}
        </div>
    )
}

export default Posts;