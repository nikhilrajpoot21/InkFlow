import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [email,setemail] = useState('');
  const [password,setpassword] = useState('');

      const handleSubmit = async (e) =>{
        e.preventDefault();
        try{  
        const res = await axios.post('https://inkflow-9dh6.onrender.com/api/auth/login',{email,password});
        console.log('login successful:', res.data);
        localStorage.setItem("token",res.data.token);
        navigate("/home")
        } catch (error) {
        console.error('login failed:', error.response?.data || error.message);
     }
    }
  return (
      <div className="bg-[#f5f5f0] min-h-screen flex items-center justify-center">
  <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-lg border border-[#d4cfc7]">
    <h2 className="text-3xl font-semibold text-[#2c2c2c] mb-6 text-center tracking-wide">Welcome Back</h2>
    
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#4a4a4a]">Email address</label>
        <input type="email" id="email" name="email" value={email} onChange={e=>setemail(e.target.value)} required
          className="mt-1 block w-full px-4 py-2 border border-[#ccc] rounded-md bg-[#fafafa] text-[#2c2c2c] focus:outline-none focus:ring-2 focus:ring-[#bfae94]" />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-[#4a4a4a]">Password</label>
        <input type="password" id="password" name="password" value={password} onChange={e=>setpassword(e.target.value)} required
          className="mt-1 block w-full px-4 py-2 border border-[#ccc] rounded-md bg-[#fafafa] text-[#2c2c2c] focus:outline-none focus:ring-2 focus:ring-[#bfae94]" />
      </div>

      <button type="submit"
        className="w-full py-2 px-4 bg-[#2c2c2c] text-white font-semibold rounded-md hover:bg-[#1f1f1f] transition duration-200">
        Sign In
      </button>
    </form>

    <p className="mt-6 text-center text-sm text-[#6b6b6b]">
      New here?
      <Link to="/signup" className="text-[#bfae94] hover:underline">Create an account</Link>
    </p>
  </div>
</div>
  )
}
