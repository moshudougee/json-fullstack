import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const EditPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
      const getPostById = () => {
        axios.get(`http://localhost:5000/posts/${id}`)
         .then(response => {
            setTitle(response.data.title);
            setContent(response.data.content);
          })
          .catch(error => {
            console.error(error);
          });
      };
      getPostById();
    }, [id]);

    const updatePost = async(e) => {
        e.preventDefault();
        await axios.patch(`http://localhost:5000/posts/${id}`, { title, content })
         .then(() => {
            navigate("/");
          })
         .catch(error => {
            console.error(error);
          });
      };
    
    
  return (
    <div className="body-main">
        <div className="main-header">
            <h1 className="main-header-title">Edit Post</h1>
        </div>
        <form onSubmit={updatePost} className="main-form">
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
            <button type="submit" className="secondary-btn">Update Post</button>
        </form>
  
    </div>
  )
}

export default EditPost