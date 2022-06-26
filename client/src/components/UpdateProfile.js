import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "../App";

export default function UpdateProfile() {
    const [user, setUser] = useContext(UserContext);
  const [inputs, setInputs] = useState({...user});
  const [message, setMessage] = useState("");
  
  const handleInputs = (e) => {
    setInputs({...inputs, [e.target.name]: e.target.value });
  };
  console.log(inputs);
  const fetchLogin = async () => {
    try {
      const response = await axios.patch(
        "http://localhost:5000/api/v1/users/update",
        {
            name: inputs.name,
            email: inputs.email,
        },{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
      );
      setMessage(response.data.message);
        setUser(inputs);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchLogin();
  };
  return (
    <div className="flex flex-col justify-center items-center w-screen h-[600px]">
      <div className="w-10/12 flex flex-col justify-center items-center">
        {message === "" ? (
          <h1 className="text-2xl font-bold">Update Profile</h1>
        ) : (
          <h1 className="text-2xl font-bold">{message}</h1>
        )}
        <br />
        <form
          className="flex flex-col justify-center items-center w-96 gap-y-8"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="name"
            className="w-full bg-[#F0F2F3] p-2"
            autoComplete="name"
            required
            name="name"
            onChange={handleInputs}
            value={inputs.name}
          />
          <input
            type="email"
            placeholder="email"
            className="w-full bg-[#F0F2F3] p-2"
            autoComplete="email"
            required
            name="email"
            onChange={handleInputs}
            value={inputs.email}
          />
          <input
            type="submit"
            value="Update"
            className="w-full bg-[#029FAE] p-2 font-semibold text-white"
          />
        </form>
      </div>
    </div>
  );
}
