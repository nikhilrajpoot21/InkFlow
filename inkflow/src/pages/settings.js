import React, { useState } from "react";
import { Link } from "react-router-dom"; // if you're using react-router

const Settings = () => {
  const [formData, setFormData] = useState({
    username: "Nikhil",
    email: "nikhil@example.com",
    bio: "Just writing my thoughts on InkFlow ✍️",
    theme: "light",
    notifications: true,
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    console.log("Settings Saved ✅", formData);
    alert("Your settings have been saved!");
  };

  return (
    <div className="bg-[#f5f5f0] min-h-screen p-10 relative">
      {/* Home Button */}
      <Link
        to="/home"
        className="absolute top-6 left-6 px-4 py-2 bg-[#2c2c2c] text-white rounded-lg hover:bg-[#444] transition"
      >
        🏠 Home
      </Link>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-[#d4cfc7]">
        <h2 className="text-3xl font-bold text-[#2c2c2c] mb-6">⚙️ Settings</h2>

        {/* Profile Settings */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-[#2c2c2c] mb-4">
            👤 Profile Settings
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 border rounded-lg"
            />
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Write your bio..."
              className="w-full p-3 border rounded-lg"
              rows="3"
            />
          </div>
        </div>

        {/* Preferences */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-[#2c2c2c] mb-4">
            🎨 Preferences
          </h3>
          <div className="space-y-4">
            <select
              name="theme"
              value={formData.theme}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            >
              <option value="light">🌞 Light</option>
              <option value="dark">🌙 Dark</option>
            </select>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="notifications"
                checked={formData.notifications}
                onChange={handleChange}
                className="h-5 w-5"
              />
              <span className="text-[#4a4a4a]">Enable Notifications</span>
            </label>
          </div>
        </div>

        {/* Account Settings */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-[#2c2c2c] mb-4">
            🔐 Account Settings
          </h3>
          <button className="px-4 py-2 bg-[#bfae94] text-white rounded-lg hover:bg-[#a69480] transition">
            Change Password
          </button>
        </div>

        {/* Save Button */}
        <div className="text-right">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-[#2c2c2c] text-white font-semibold rounded-xl hover:bg-[#444] transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
