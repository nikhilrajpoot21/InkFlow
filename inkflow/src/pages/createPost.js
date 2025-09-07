import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CreatePost = () => {
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    tags: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handlePublish = async (e) => {
    e.preventDefault(); // ✅ stop reload

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to publish a post!");
        return;
      }

      const res = await axios.post(
        "/api/posts",
        {
          title: postData.title,
          content: postData.content,
          tags: postData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Post Created:", res.data);
      alert("🎉 Your post has been published!");

      // reset form
      setPostData({
        title: "",
        content: "",
        tags: "",
      });
    } catch (err) {
      console.error("Publish failed:", err.response?.data || err.message);
      alert("Failed to publish post. Check console for details.");
    }
  };

  return (
    <div className="bg-[#f5f5f0] min-h-screen p-10 relative">
      {/* Go Back Home Button */}
      <Link
        to="/home"
        className="absolute top-6 left-6 px-4 py-2 bg-[#2c2c2c] text-white rounded-lg hover:bg-[#444] transition"
      >
        🏠 Home
      </Link>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-[#d4cfc7]">
        <h2 className="text-3xl font-bold text-[#2c2c2c] mb-6">✍️ Create Post</h2>

        <form onSubmit={handlePublish}>
          {/* Title Input */}
          <input
            type="text"
            name="title"
            value={postData.title}
            onChange={handleChange}
            placeholder="Post Title"
            className="w-full p-3 border rounded-lg mb-6"
            required
          />

          {/* Content Textarea */}
          <textarea
            name="content"
            value={postData.content}
            onChange={handleChange}
            placeholder="Write your thoughts here..."
            className="w-full p-3 border rounded-lg mb-6"
            rows="8"
            required
          />

          {/* Tags Input */}
          <input
            type="text"
            name="tags"
            value={postData.tags}
            onChange={handleChange}
            placeholder="Tags (comma separated)"
            className="w-full p-3 border rounded-lg mb-6"
          />

          {/* Publish Button */}
          <div className="text-right">
            <button
              type="submit"
              className="px-6 py-3 bg-[#2c2c2c] text-white font-semibold rounded-xl hover:bg-[#444] transition"
            >
              🚀 Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
