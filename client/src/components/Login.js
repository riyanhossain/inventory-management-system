import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import axios from "axios";
import SignUp from "./SignUp";

export default function Login() {
  const [toggle, setToggle] = useState(true);
  const [user, setUser] = useContext(UserContext);
  const [inputs, setInputs] = useState({});

  const handleInputs = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const fetchLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/login",
        inputs
      );

      setUser(response.data);
      user.signIn= true;
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.log(error);
    }

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchLogin();
  };
  return (
    <div className="flex flex-col justify-center items-center h-[600px]">
      {toggle ? (
        <div className="flex flex-col justify-center items-center bg-white h-[382px] w-[648px] shadow-lg">
          <div className="w-10/12 flex flex-col justify-center items-center">
            {user.message && <h1>{user.message}</h1>}
            <h1 className="text-2xl font-bold">Sign In</h1>
            <br />
            <form
              className="flex flex-col justify-center items-center w-full gap-y-8"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                name="email"
                placeholder="email"
                className="w-full bg-[#F0F2F3] p-2"
                autoComplete="email"
                onChange={handleInputs}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="password"
                className="w-full bg-[#F0F2F3] p-2"
                autoComplete="password"
                onChange={handleInputs}
                required
              />
              <input
                type="submit"
                value="Sign In"
                className="w-full bg-[#029FAE] p-2 font-semibold text-white"
              />
            </form>
          </div>
          <p>
            Don’t have account?{" "}
            <button
              className="text-[#007580] font-medium"
              onClick={() => setToggle(!toggle)}
            >
              Sign Up
            </button>
          </p>
          <Link to="/forget-password">
            <button className="text-[#007580] font-medium">
              Forget Passaword
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center bg-white h-[382px] w-[648px] shadow-lg">
          <SignUp/>
      
          <p>
            Already have account?{" "}
            <button
              className="text-[#007580] font-medium"
              onClick={() => setToggle(!toggle)}
            >
              Sign In
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
