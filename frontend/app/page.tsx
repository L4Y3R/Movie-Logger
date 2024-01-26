"use client";
import React, { useState } from "react";
import Image from "next/image";

import Recents from "./recent/page";
import All from "./all/page";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [activeTab, setActiveTab] = useState<"recentlyAdded" | "allMovies">(
    "recentlyAdded"
  );

  const handleTabClick = (tab: "recentlyAdded" | "allMovies") => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="flex justify-center gap-3">
        <div
          className={`flex gap-2 items-center cursor-pointer px-4 font-Montserrat font-medium py-2 mt-2 rounded-lg ${
            activeTab === "recentlyAdded" ? "bg-darkCyan" : "text-gray-500"
          }`}
          onClick={() => handleTabClick("recentlyAdded")}>
          <Image
            src="icons/clock-solid.svg"
            alt="recent ico"
            width={15}
            height={15}
          />
          Recent
        </div>
        <div
          className={`flex gap-2 items-center cursor-pointer px-4 font-Montserrat font-medium py-2 mt-2 rounded-lg ${
            activeTab === "allMovies" ? "bg-darkCyan" : "text-gray-500"
          }`}
          onClick={() => handleTabClick("allMovies")}>
          <Image
            src="/icons/grip-solid.svg"
            alt="all ico"
            width={15}
            height={15}
          />
          All
        </div>
      </div>

      {activeTab === "recentlyAdded" && <Recents />}
      {activeTab === "allMovies" && <All />}

      <div className="fixed right-8 bottom-16 md:right-20 z-10">
        <button>
          <svg
            className="w-10 h-10 fill-darkCyan transform hover:scale-125 transition-transform duration-300"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512">
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Home;
