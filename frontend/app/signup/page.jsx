"use client";

import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import Link from "next/link";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, isLoading, error } = useSignup();

  const handleSignup = async (e) => {
    e.preventDefault();

    await signUp(email, password);
  };

  return (
    <div className="flex mt-28 md:mt-0 md:items-center justify-center h-screen">
      <div className="py-6 px-10 md:w-1/3 h-96 bg-darkCyan rounded-3xl ">
        <form>
          <h1 className="text-center text-3xl font-Montserrat font-black mb-5">
            {" "}
            Sign Up{" "}
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
            className="w-full rounded-3xl h-12 mb-6 p-3"
          />
          {error && <div className="text-white text-center"> {error} </div>}

          <button
            disabled={isLoading}
            onClick={handleSignup}
            className="w-full font-bold rounded-3xl h-16 bg-gray-800 hover:bg-gray-900 mt-6">
            {" "}
            <Link href="/">
              <div>Sign Up</div>
            </Link>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
