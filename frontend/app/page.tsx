"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "../hooks/useAuthContext";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import TVCards from "../components/TVCards";
import MovieCards from "../components/MovieCards";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [activeTab, setActiveTab] = useState<"movies" | "tv">("movies");

  const handleTabClick = (tab: "movies" | "tv") => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="flex justify-center gap-3">
        <div
          className={`flex gap-2 items-center cursor-pointer px-4 font-Montserrat font-medium py-2 mt-2 rounded-3xl ${
            activeTab === "movies" ? "bg-darkCyan" : "text-gray-500"
          }`}
          onClick={() => handleTabClick("movies")}>
          <Image
            src="icons/film-solid.svg"
            alt="movie ico"
            width={15}
            height={15}
          />
          Movies
        </div>
        <div
          className={`flex gap-2 items-center cursor-pointer px-4 font-Montserrat font-medium py-2 mt-2 rounded-3xl ${
            activeTab === "tv" ? "bg-darkCyan" : "text-gray-500"
          }`}
          onClick={() => handleTabClick("tv")}>
          <Image
            src="/icons/tv-solid.svg"
            alt="tv ico"
            width={15}
            height={15}
          />
          TV Series
        </div>
      </div>

      {activeTab === "movies" && <MovieCards />}
      {activeTab === "tv" && <TVCards />}

      <div className="fixed right-8 bottom-16 md:right-20 z-10">
        <Dropdown>
          <DropdownTrigger>
            <button>
              <svg
                className="w-14 h-14 fill-white transform hover:scale-125 transition-transform duration-300"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512">
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
              </svg>
            </button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Static Actions"
            className=" rounded-xl bg-darkCyan p-2">
            <DropdownItem key="movie" className="mb-2">
              <Link href="/add-movie">
                <div className="flex items-center gap-2">
                  <div>Add a Movie</div>

                  <div>
                    <Image
                      src="icons/film-solid.svg"
                      alt="movie icon"
                      height={20}
                      width={20}
                    />
                  </div>
                </div>
              </Link>
            </DropdownItem>

            <DropdownItem key="tv">
              <Link href="/add-tv">
                <div className="flex items-center gap-2">
                  <div>Add a TV Series</div>

                  <div>
                    <Image
                      src="/icons/tv-solid.svg"
                      alt="tv icon"
                      height={20}
                      width={20}
                    />
                  </div>
                </div>
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Home;
