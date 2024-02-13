"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

function NavBar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="w-full h-14 bg-darkCyan flex items-center px-5 md:px-20 lg:px-44 justify-between">
      <Link href="/">
        <div className="flex items-center md:gap-3">
          <Image
            src="/logo/affiliatetheme.svg"
            alt="logo"
            width={25}
            height={25}
            className="pb-2"
          />
          <span className="font-Montserrat font-bold text-lg">Cinephile</span>
        </div>
      </Link>

      {!user && (
        <div>
          <Link href="/login">
            <button className="rounded-lg px-2 py-1 bg-teal-500 hover:bg-teal-800 transition-transform-background duration-500 mx-5">
              {" "}
              Login{" "}
            </button>
          </Link>
          <Link href="/signup">
            <button className="rounded-lg px-2 py-1 bg-teal-500 hover:bg-teal-800 transition-transform-background duration-500">
              {" "}
              Sign Up{" "}
            </button>
          </Link>
        </div>
      )}

      {user && (
        <div>
          <span> {user.email} </span>
          <button onClick={handleLogout}>
            <Link href="/login">
              <button className=" mx-3 rounded-lg px-2 py-1 bg-teal-500 hover:bg-teal-800 transition-transform-background duration-500">
                {" "}
                Log Out{" "}
              </button>
            </Link>
          </button>
        </div>
      )}
    </div>
  );
}

export default NavBar;
