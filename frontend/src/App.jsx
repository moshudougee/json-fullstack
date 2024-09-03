import { BrowserRouter, Route, Routes } from "react-router-dom"
import PostList from "./components/PostList"
import AddPost from "./components/AddPost"
import EditPost from "./components/EditPost"
import NoPage from "./components/NoPage"


function App() {
  

  return (
    <div className=" scroll-smooth">
    <BrowserRouter>
     <nav className="nav">
       <h2 className="nav-logo">Sitemate Client Server Challenge</h2>
       <div className="flex space-x-4 w-3/4">
         <a href="/" className="nav-links">Posts</a>
       </div>
     </nav>
     
     <div className="flex my-4 mx-20">
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/add" element={<AddPost />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </div>
    </BrowserRouter>
  </div>
  )
}

export default App
