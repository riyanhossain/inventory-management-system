import axios from 'axios';
import React, { useState } from 'react'

export default function SignUp() {
    const [inputs, setInputs] = useState({});
    const [message, setMessage] = useState('');

    const handleInputs = (e) => {
      setInputs({ ...inputs, [e.target.name]: e.target.value });
    };
    const fetchLogin = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/v1/users/register",
          inputs
        );
        setMessage(response.data.message);
      } catch (error) {
        console.log(error);
      }
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      fetchLogin();
    };
  return (
    <div className="w-10/12 flex flex-col justify-center items-center">
    {message ==='' ? <h1 className="text-2xl font-bold">Sign Up</h1>:<h1 className="text-2xl font-bold">{message}</h1>}
    <br />
    <form className="flex flex-col justify-center items-center w-full gap-y-8" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="name"
        className="w-full bg-[#F0F2F3] p-2"
        autoComplete="name"
        required
        name="name"
        onChange={handleInputs}
      />
      <input
        type="email"
        placeholder="email"
        className="w-full bg-[#F0F2F3] p-2"
        autoComplete="email"
        required
        name="email"
        onChange={handleInputs}
      />
      <input
        type="password"
        placeholder="password"
        className="w-full bg-[#F0F2F3] p-2"
        autoComplete="password"
        required
        name="password"
        onChange={handleInputs}
      />
      <input
        type="submit"
        value="Sign Up"
        className="w-full bg-[#029FAE] p-2 font-semibold text-white"
      />
    </form>
  </div>
  )
}
