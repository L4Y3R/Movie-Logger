import React from "react";
import Image from "next/image";

function Footer() {
  return (
    <div className="w-full h-[150px] bg-darkCyan absolute flex-col">
      <div className="flex items-center justify-center mt-10 md:gap-3">
        <Image
          src="/logo/affiliatetheme.svg"
          alt="logo"
          width={20}
          height={20}
          className="pb-2"
        />
        <span className="font-Montserrat font-bold text-md">Cinephile</span>
      </div>
      <div>
        <span className="font-Montserrat text-sm flex justify-center text-gray-300">
          All rights reserved
        </span>
      </div>
    </div>
  );
}

export default Footer;
