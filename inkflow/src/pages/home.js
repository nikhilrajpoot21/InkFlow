import React, { useEffect, useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [posts,setPosts] = useState([]);
  const navigate = useNavigate()
    useEffect(()=>{
    const fetchPost = async () =>{
      try{
      const token = localStorage.getItem("token");
      const res = await axios.get('/api/posts',{ headers: { Authorization: `Bearer ${token}` }})
      
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
    setPosts([]);   // clear feed state
    navigate("/");  // redirect to login
  };
  const trendingPosts = [
    { id: 1, title: "Mastering MERN Stack", author: "Aditi", likes: 340 },
    { id: 2, title: "10 Tips for Cloud Computing", author: "Rohan", likes: 290 },
    { id: 3, title: "React vs Vue – Which to Choose?", author: "Meera", likes: 210 },
  ];

  // const allPosts = [
  //   {
  //     id: 1,
  //     title: "Understanding JavaScript Closures",
  //     preview: "Closures are one of the most powerful features in JS...",
  //     author: "Ankit",
  //     time: "1 hr ago",
  //   },
  //   {
  //     id: 2,
  //     title: "Getting Started with Docker",
  //     preview: "Docker simplifies containerization and app deployment...",
  //     author: "Riya",
  //     time: "3 hrs ago",
  //   },
  //   {
  //     id: 3,
  //     title: "The Future of AI & Cloud",
  //     preview: "AI and cloud computing are reshaping the IT landscape...",
  //     author: "Nikhil",
  //     time: "Yesterday",
  //   },
  // ];

  return (
    <div className="bg-[#f5f5f0] min-h-screen flex">
  {/* Sidebar */}
  <aside className="w-64 bg-white shadow-lg border-r border-[#d4cfc7] p-6 flex flex-col">
    <h2 className="text-2xl font-bold text-[#2c2c2c] mb-8 tracking-wide">InkFlow</h2>
    <nav className="space-y-4 text-[#4a4a4a] font-medium">
      <Link to="/dashboard" className="block hover:text-[#bfae94] transition">🏠 Dashboard</Link>
      <Link to="/createPost" className="block hover:text-[#bfae94] transition">✍️ Create Post</Link>
      <Link to="/settings" className="block hover:text-[#bfae94] transition">⚙️ Settings</Link>
      <button onClick={handleLogout}  className="block text-red-500 hover:text-red-600 transition">🚪 Logout</button>
    </nav>
  </aside>

  {/* Main Content */}
  <main className="flex-1 p-10 overflow-y-auto">
    {/* Trending Section */}
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-[#2c2c2c] mb-6">🔥 Trending Posts (currently not working)</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {trendingPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-6 rounded-xl shadow border border-[#d4cfc7] hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-[#2c2c2c]">{post.title}</h3>
            <p className="text-[#6b6b6b] mt-2">By {post.author}</p>
            <div className="flex justify-between items-center mt-4 text-sm">
              <span className="text-[#bfae94]">{post.likes} ❤️ Likes</span>
              <Link
                to={`/post/${post.id}`}
                className="text-[#2c2c2c] hover:text-[#bfae94]"
              >
                👁️ Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* All Posts Feed */}
    <section>
  <h2 className="text-2xl font-bold text-[#2c2c2c] mb-6">📢 Latest Posts</h2>
  <div className="space-y-6">
    {posts.map((post) => (
      <div
        key={post._id}
        className="bg-white p-6 rounded-xl shadow border border-[#d4cfc7] hover:shadow-lg transition"
      >
        <h3 className="text-lg font-semibold text-[#2c2c2c]">{post.title}</h3>
        <p className="text-[#6b6b6b] mt-2">
          {post.preview || post.content?.substring(0, 100) + "..."}
        </p>
        <div className="flex justify-between items-center mt-4 text-sm">
          <span className="text-[#bfae94]">
            By {post.author?.name.split(" ")[0] || "Unknown"}
          </span>
          <Link
            to={`/post/${post._id}`}
            className="text-[#2c2c2c] hover:text-[#bfae94]"
          >
            👁️ View
          </Link>
        </div>
      </div>
    ))}
  </div>
</section>
  </main>
</div>

  );
}
