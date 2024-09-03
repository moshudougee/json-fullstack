import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      getPosts();
    }, []);

    const getPosts = () => {
        axios.get("http://localhost:5000/posts")
         .then(response => {
            setPosts(response.data);
          })
          .catch(error => {
            console.error("Error fetching posts:", error);
          });
      };

    const deletePost = async(id) => {
        await axios.delete(`http://localhost:5000/posts/${id}`)
        .then(() => {
          getPosts();
        })
        .catch(error => {
          console.error("Error deleting post:", error);
        });
        
    }
    
  return (
    <div className="body-main">
        <div className="main-header">
            <h1 className="main-header-title">Posts</h1>
        </div>
        <hr />
        <div className="flex gap-4">
            <button onClick={getPosts} className="primary-btn">
                Refresh
            </button>
            <Link to={`/add`} className="main-link">Add Post</Link>
        </div>
        
        {posts.map(post => (
            <div key={post.id} className="main-body">
                <h2 className="main-body-title">{post.title}</h2>
                <p className="main-body-content">{post.content}</p>
                <div className="flex gap-3 w-1/2">
                    <Link to={`/edit/${post.id}`} className="secondary-btn">Edit</Link>
                    <button onClick={() => deletePost(post.id)} className="danger-btn">Delete</button>
                </div>
                <hr />
            </div>
            
        ))}
    </div>
  )
}

export default PostList