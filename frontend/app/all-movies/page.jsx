"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Search from "../../components/SearchBar";
import { useState, useEffect } from "react";

export default function allMovies() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/movies");
        const json = await response.json();
        console.log("Received Data", json);

        if (response.ok) {
          setMovies(json);
        }
      } catch (error) {
        console.error("Error fetching movies", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <div className="min-h-screen mx-3 md:mx-10 lg:mx-32 my-3 mb-8 md:my-8 font-semibold text-2xl md:border-2 md:border-darkCyan px-2 py-4 md:px-10 md:py-8 rounded-2xl bg-gray-800">
        <div className="md:flex justify-center md:justify-between">
          <span className="text-4xl flex justify-center text-center">
            All Movies
          </span>
          <Search />
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 gap-y-5 md:gap-y-10">
          {movies ? (
            movies.map((card, index) => (
              <Link key={index} href="/info-movie">
                <div className="bg-slate-200 h-62 w-40 md:h-64 md:w-44 lg:h-80 lg:w-52 rounded-xl border-2 border-darkCyan transform hover:scale-105 transition-transform duration-300">
                  <div className="bg-gradient-to-b rounded-t-xl from-slate-900 to-transparent absolute top-0 left-0 w-full h-full"></div>
                  <h6 className="absolute top-2 mb-2 left-2 text-white text-xs">
                    {new Date(card.createdAt).toLocaleDateString()}
                  </h6>
                  <h3 className="absolute top-5 left-2 text-white">
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
    </>
  );
}
