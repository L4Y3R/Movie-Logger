"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import Search from "./SearchBar";
import MovieDetail from "./MovieDetail";

export default function MovieCards() {
  const [movies, setMovies] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

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

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseDetail = () => {
    setSelectedMovie(null);
  };

  const handleDelete = async () => {
    if (selectedMovie) {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this movie?"
      );

      if (isConfirmed) {
        const response = await fetch(
          `http://localhost:4000/api/movies/${selectedMovie._id}`,
          {
            method: "DELETE",
          }
        );

        const json = await response.json();

        if (!response.ok) {
          console.error("Error deleting movie", json);
        } else {
          console.log("Movie deleted successfully", json);
          setMovies((prevMovies) =>
            prevMovies.filter((movie) => movie._id !== selectedMovie._id)
          );
          setSelectedMovie(null);
        }
      }
    }
  };

  return (
    <>
      <div className="min-h-screen mx-3 md:mx-10 lg:mx-32 my-3 mb-8 md:my-8 font-semibold text-2xl  px-2 py-4 md:px-10 md:py-8 rounded-3xl bg-gray-800">
        <div className="md:flex justify-center md:justify-between">
          <span className="text-4xl flex justify-center text-center">
            Recently Added Movies
          </span>
          <Search />
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 gap-y-5 md:gap-y-10">
          {movies ? (
            movies.slice(0, 12).map((card, index) => (
              <div
                key={index}
                onClick={() => handleMovieClick(card)}
                className="bg-slate-200 h-62 w-40 md:h-64 md:w-44 lg:h-80 lg:w-52 rounded-3xl transform hover:scale-105 transition-transform duration-300">
                <div className="bg-gradient-to-b rounded-t-xl from-darkCyan to-transparent absolute top-0 left-0 w-full h-full"></div>
                <h6 className="absolute top-2 left-2 text-xs text-slate-300 font-thin">
                  {new Date(card.createdAt).toLocaleDateString()}
                </h6>

                <h3 className="absolute top-6 left-2 text-white">
                  {card.title}
                </h3>
                <Image
                  src="/test/nolan.jpg"
                  alt={`Card Image - ${index}`}
                  className="w-full h-full object-cover rounded-xl"
                  width={1000}
                  height={1000}
                />
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>

        {selectedMovie && (
          <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
            <div>
              <MovieDetail movie={selectedMovie} />
              <div className="mt-2 flex items-center gap-5">
                <button onClick={handleCloseDetail}>
                  <Image
                    src="/icons/close.svg"
                    alt="close button"
                    className="transform hover:scale-125 transition-transform duration-300"
                    width={25}
                    height={25}
                  />
                </button>
                <button onClick={handleCloseDetail}>
                  <Image
                    src="/icons/edit.svg"
                    alt="edit button"
                    className="transform hover:scale-125 transition-transform duration-300"
                    width={23}
                    height={23}
                  />
                </button>
                <button onClick={handleDelete}>
                  <Image
                    src="/icons/delete.svg"
                    alt="delete button"
                    className="transform hover:scale-125 transition-transform duration-300 "
                    width={20}
                    height={20}
                  />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center">
        <Link href="/all-movies">
          <button className=" p-2 w-44 h-12 rounded-xl text-sm  bg-darkCyan hover:bg-teal-600 mb-8">
            See all movies
          </button>
        </Link>
      </div>
    </>
  );
}
