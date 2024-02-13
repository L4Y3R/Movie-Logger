"use client";

import Link from "next/link";
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex mt-28 md:mt-0 md:items-center justify-center h-screen">
      <div className="py-6 px-10 md:w-1/3 h-96 bg-darkCyan rounded-3xl ">
        <form>
          <h1 className="text-center text-3xl font-Montserrat font-black mb-5">
            {" "}
            Login{" "}
          </h1>

          <label className="font-Montserrat font-bold"> Email </label>
          <br></br>

          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full mb-4 rounded-3xl h-12 p-3"
          />

          <label className="font-Montserrat font-bold"> Password </label>
          <br></br>

          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full mb-4 rounded-3xl h-12 p-3"
          />

          {error && <div className="text-white text-center"> {error} </div>}
          <button
            disabled={isLoading}
            onClick={handleLogin}
            className="w-full font-bold rounded-3xl h-16 bg-gray-800 hover:bg-gray-900 mt-8">
            {" "}
            <Link href="/">
              <div>Login</div>
            </Link>{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
