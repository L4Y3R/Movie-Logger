"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Search from "./SearchBar";

export default function TVCards() {
  const [tv, setTv] = useState(null);

  useEffect(() => {
    const fetchTv = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/tv");
        const json = await response.json();
        console.log("Received Data", json);

        if (response.ok) {
          setTv(json);
        }
      } catch (error) {
        console.log("Error fetching tv series", error);
      }
    };

    fetchTv();
  }, []);

  return (
    <>
      <div className="min-h-screen mx-3 md:mx-10 lg:mx-32 my-3 mb-8 md:my-8 font-semibold text-2xl  px-2 py-4 md:px-10 md:py-8 rounded-3xl bg-gray-800">
        <div className="md:flex justify-center md:justify-between">
          <span className="text-4xl flex justify-center text-center">
            Recently Added TV
          </span>
          <Search />
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 gap-y-5 md:gap-y-10">
          {tv ? (
            tv.slice(0, 12).map((card, index) => (
              <Link href="/info-tv">
                <div
                  key={index}
                  className="bg-slate-200 h-62 w-40 md:h-64 md:w-44 lg:h-80 lg:w-52 rounded-3xl transform hover:scale-105 transition-transform duration-300">
                  <div className="bg-gradient-to-b rounded-t-xl from-darkCyan to-transparent absolute top-0 left-0 w-full h-full"></div>
                  <h7 className="absolute top-2 left-2 text-xs text-slate-300 font-thin">
                    {new Date(card.createdAt).toLocaleDateString()}
                  </h7>
                  <h3 className="absolute top-6 left-2 text-white">
                    {card.title}
                  </h3>
                  <Image
                    src={card.imageSrc}
                    alt={`Card Image - ${index}`}
                    className="w-full h-full object-cover rounded-xl"
                    width={1000}
                    height={1000}
                  />
                </div>
              </Link>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <Link href="/all-tv">
          <button className=" p-2 w-44 h-12 rounded-xl text-sm  bg-darkCyan hover:bg-teal-600 mb-8">
            See all tv series
          </button>
        </Link>
      </div>
    </>
  );
}
