"use client";

import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";

import MovieDetail from "./MovieDetail";
import EditMovie from "./EditMovie";

export default function MovieCards() {
  const [movies, setMovies] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showAllMovies, setShowAllMovies] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

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
        console.error("Error fetching tv shows", error);
      } finally {
        setLoading(false);
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

  const handleEditDetail = () => {
    setEditMode(true);
  };

  const handleSaveEdit = async (editedMovie) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/movies/${selectedMovie._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedMovie),
        }
      );

      const json = await response.json();

      if (!response.ok) {
        console.error("Error updating movie details", json);
      } else {
        setMovies((prevMovies) =>
          prevMovies.map((movie) =>
            movie._id === selectedMovie._id ? editedMovie : movie
          )
        );
        setSelectedMovie(null);
        setEditMode(false);
      }
    } catch (error) {
      console.error("Error updating movie details", error);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredMovies = movies
    ? movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.director.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      <div className="min-h-screen mx-3 md:mx-10 lg:mx-32 my-3 mb-8 md:my-8 font-semibold text-2xl  px-2 py-4 md:px-10 md:py-8 rounded-3xl bg-gray-800">
        <div className="md:flex justify-center md:justify-between">
          <span className="text-4xl flex justify-center text-center">
            Recently Added Movies
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by Title or Director"
            className="p-2 px-3 w-96 rounded-full text-sm font-thin bg-gray-700 text-white"
          />
        </div>

        <div className="mt-10 flex justify-center items-center">
          {loading ? (
            <p className="mt-52 text-md font-thin">Loading...</p>
          ) : editMode ? (
            <EditMovie
              movie={selectedMovie}
              onSave={handleSaveEdit}
              onCancel={handleCancelEdit}
            />
          ) : filteredMovies.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-16 gap-y-5 md:gap-y-10">
              {filteredMovies
                .slice(0, showAllMovies ? filteredMovies.length : 12)
                .map((card, index) => (
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
                      src={`/uploads/moviePosters/${card.poster}`}
                      alt={`Card Image - ${index}`}
                      className="w-full h-full object-cover rounded-xl"
                      width={1000}
                      height={1000}
                    />
                  </div>
                ))}
            </div>
          ) : (
            <p className="mt-52 text-md font-thin">No movies found :(</p>
          )}
        </div>

        {selectedMovie && !editMode && (
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
                <button onClick={handleEditDetail}>
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
        <button
          className=" p-2 w-44 h-12 rounded-xl text-sm  bg-darkCyan hover:bg-teal-600 mb-8"
          onClick={() => setShowAllMovies(true)}>
          See all movies
        </button>
      </div>
    </>
  );
}
