import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";



const Login = () => {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    
    const navigater = useNavigate();


  const submithandler = (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };
    console.log(data);


    setemail("");
    setpassword("");

  navigater("/Dashboard");


  };







  return (
 
    <div className="w-screen h-screen flex flex-col items-center ">

      <form
        onSubmit={submithandler}
        id="login"
        className="flex justify-center  items-center w-[300px] h-[400px] mt-[80px]"
      >
        <div className="flex flex-col justify-start items-center gap-8">
          <h1 className="text-2xl text-green-600 font-semibold text-center uppercase">
            Login
          </h1>
          <input
            type="text"
            placeholder="Email"
            className="p-2 w-[250px] h-[40px] rounded-md bg-transparent border-b-2 border-green-600"
            onChange={(e)=> setemail(e.target.value)}
            required
            value={email}
          />

          <input
            type="password"
            placeholder="Password"
            className="p-2 w-[250px] h-[40px] rounded-md bg-transparent border-b-2 border-green-600"
            onChange={(e) => setpassword(e.target.value)}
            required
            value={password}
          />

          <button className="bg-green-600 text-white p-2 w-[250px] h-[40px] rounded-md text-center uppercase"> Login</button>
        </div>
      </form>
    </div>
  );
  };

export default Login;
