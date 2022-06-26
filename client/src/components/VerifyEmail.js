import axios from "axios";
import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

export default function VerifyEmail() {
    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get("token")
    const [inputs, setInputs] = useState({});
    const [message, setMessage] = useState("");
    const handleInputs = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
      };
      console.log(inputs);
    const VerifyEmail = async () => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/v1/users/new-password",
                {token, password: inputs.password}
            );
            console.log(response.data);
            setMessage(response.data.message);
        } catch (error) {
            console.log(error);
        }
    }
    const handleSubmit  = (e) => {
        e.preventDefault();
        // // const varToken = localStorage.getItem("token");
        // const response = await axios.post('http://localhost:5000/api/v1/users/reset-password', inputs
        // // {
        // //     headers: {
        // //       Authorization: 'Bearer ' + varToken
        // //     }
        // // }
        // );
        // setMessage(response.data.message);
        VerifyEmail();
    }
    console.log(message);
  return (
    <div className="flex flex-col justify-center items-center h-[600px]">
      <div className="flex flex-col justify-center items-center w-[400px]">
        {message ===""?<h1 className="text-2xl font-bold">New Password</h1>:<h1 className="text-2xl font-bold">{message}</h1>}
        <br />
        <form className="flex flex-col justify-center items-center w-full gap-y-8"
        onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="password"
            className="w-full bg-[#F0F2F3] p-2"
            autoComplete="password"
            onChange={handleInputs}
            name="password"
          />

          <input
            type="submit"
            value="Save Password"
            className="w-full bg-[#029FAE] p-2 font-semibold text-white"
          />
        </form>
      </div>
    </div>
  );
}