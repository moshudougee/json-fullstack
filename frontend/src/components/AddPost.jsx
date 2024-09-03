import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const AddPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const savePost = async(e) => {
        e.preventDefault();
        try {
           await axios.post("http://localhost:5000/posts", {
             title,
             content
           });
           navigate("/"); 
        } catch (error) {
           console.log(error); 
        }
    }
    
  return (
    <div className="body-main">
        <div className="main-header">
            <h1 className="main-header-title">Add Post</h1>
        </div>
        <form onSubmit={savePost} className="main-form">
            <label className="flex gap-3 w-full">
                <span className="w-1/3">Title:</span>
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Title"
                    className="w-2/3 h-[30px] border" 
                />
            </label>
            <hr/>
            <label className="flex gap-3 w-full">
                <span className="w-1/3">Content:</span>
                <textarea 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Content"
                    className="w-2/3 h-[90px] border" 
                />
            </label>
            <hr/>
            <button type="submit" className="secondary-btn">Add Post</button>
        </form>
    </div>
  )
}

export default AddPost