import React, { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ViewPost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error("Failed to fetch post:", err.response?.data || err.message);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) {
    return <p className="text-center mt-10">Loading post...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:underline mb-4 block"
      >
        ⬅ Back
      </button>

      <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
      <p className="text-gray-600 mt-2">
        By {post.author?.name || "Unknown"} •{" "}
        {new Date(post.createdAt).toDateString()}
      </p>
      <div className="mt-6 text-gray-700 whitespace-pre-line">{post.content}</div>
    </div>
  );
}
