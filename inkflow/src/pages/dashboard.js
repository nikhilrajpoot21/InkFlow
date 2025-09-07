import React, { useEffect, useState } from 'react'
import { Link  } from "react-router-dom";
import axios from 'axios';

export default function Dashboard() {
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
    const fetchPost = async () =>{
      try{
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await axios.get('http://localhost:5000/api/posts/user',{ headers: { Authorization: `Bearer ${token}` }})
      
      console.log(res.data)
      setPosts(res.data)
      }catch(err){
        console.error("Failed to fetch posts:", err.response?.data || err.message);
      }
    };
    fetchPost();
    },[]);
   const handleLogout = () => {
    localStorage.removeItem("token");
     window.location.href = "/"; 
  };

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(posts.filter((post) => post._id !== postId));
      alert("Post deleted successfully!");
    } catch (err) {
      console.error("Failed to delete post:", err.response?.data || err.message);
      alert("Failed to delete post.");
    }
  };

  return(
    <div className="bg-[#f5f5f0] min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg border-r border-[#d4cfc7] p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-[#2c2c2c] mb-8 tracking-wide">InkFlow</h2>
        <nav className="space-y-4 text-[#4a4a4a] font-medium">
          <Link to="/home" className="block hover:text-[#bfae94] transition">🏠 Home</Link>
          <Link to="/createPost" className="block hover:text-[#bfae94] transition">✍️ Create Post</Link>
          <Link to="/settings" className="block hover:text-[#bfae94] transition">⚙️ Settings</Link>
          <button onClick={handleLogout}  className="block text-red-500 hover:text-red-600 transition">🚪 Logout</button>
        </nav>
      </aside>
      

      {/* Main Content */}
      <main className="flex-1 p-10">
        {/* Hero / Welcome */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-[#d4cfc7] mb-10">
          <h1 className="text-3xl font-bold text-[#2c2c2c]">Welcome back, {posts[0]?.author?.name?.split(" ")[0] || "Guest"} 👋</h1>
          <p className="text-[#6b6b6b] mt-2">Here’s what’s happening with your blogs today.</p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow border border-[#d4cfc7] text-center">
            <h3 className="text-xl font-semibold text-[#2c2c2c]">{posts.length}</h3>
            <p className="text-[#6b6b6b]">Published Blogs</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border border-[#d4cfc7] text-center">
            <h3 className="text-xl font-semibold text-[#2c2c2c]">currently Not Available</h3>
            <p className="text-[#6b6b6b]">Drafts</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border border-[#d4cfc7] text-center">
            <h3 className="text-xl font-semibold text-[#2c2c2c]">currently Not Available</h3>
            <p className="text-[#6b6b6b]">Followers</p>
          </div>
        </div>

        {/* Recent Posts */}
        <div>
          <h2 className="text-2xl font-semibold text-[#2c2c2c] mb-6">Recent Posts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <div key={post._id} className="bg-white p-6 rounded-xl shadow border border-[#d4cfc7] hover:shadow-lg transition">
                <h3 className="text-lg font-semibold text-[#2c2c2c]">{post.title}</h3>
                <p className="text-[#6b6b6b] mt-2">{post.content}</p>
                <div className="flex justify-between items-center mt-4 text-sm">
                  <span className="text-[#bfae94]">2 days ago</span>
                  <div className="space-x-3">
                    <Link to={`/post/${post._id}`} className="text-[#2c2c2c] hover:text-[#bfae94]">
                      👁️ View
                    </Link>                    
                    <button onClick={() => handleDelete(post._id)} className="text-red-500 hover:text-red-600">🗑️ Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-10 text-center">
          <Link 
            to="/createPost" 
            className="inline-block bg-[#2c2c2c] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1f1f1f] transition"
          >
            ✍️ Write a New Post
          </Link>
        </div>
      </main>
    </div>
  )
  
}
