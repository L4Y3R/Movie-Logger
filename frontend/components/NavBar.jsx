import React from "react";
import Image from "next/image";

function NavBar() {
  return (
    <div className="w-full h-14 bg-darkCyan flex items-center px-5 md:px-44 justify-between">
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
      <div>
        <button className="rounded-lg px-2 py-1 bg-teal-500 hover:bg-teal-800 transition-transform-background duration-500">
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default NavBar;