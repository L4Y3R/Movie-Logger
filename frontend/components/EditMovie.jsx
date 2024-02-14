import React, { useState } from "react";
import Image from "next/image";
import { useAuthContext } from "../hooks/useAuthContext";

function EditMovie({ movie, onSave, onCancel }) {
  const [editedTitle, setEditedTitle] = useState(movie.title);
  const [editedDirector, setEditedDirector] = useState(movie.director);
  const [editedReleaseYear, setEditedReleaseYear] = useState(movie.releaseYear);
  const [editedRuntime, setEditedRuntime] = useState(movie.runtime);
  const [editedReview, setEditedReview] = useState(movie.review);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const handleSave = async (e) => {
    if (!user) {
      setError("Log in to edit");
      return;
    }

    const editedMovie = {
      title: editedTitle,
      director: editedDirector,
      releaseYear: editedReleaseYear,
      runtime: editedRuntime,
      review: editedReview,
    };

    try {
      const response = await fetch(
        `http://localhost:4000/api/movies/${movie._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(editedMovie),
        }
      );

      if (!response.ok) {
        e.preventDefault();
        const data = await response.json();
        throw new Error(data.error || "Failed to update movie");
      }

      console.log("Movie updated successfully!");
    } catch (error) {
      e.preventDefault();
      console.error("Error updating movie:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-80 items-center justify-center">
      <div className="mx-3 md:mx-10 lg:mx-32 my-3 mb-8 md:my-8 font-semibold  px-2 py-4 md:px-10 md:py-8 rounded-3xl bg-gray-800 hidden lg:flex">
        <div className="justify-center hidden lg:flex">
          <form className="mt-8" onSubmit={handleSave}>
            <div className="flex justify-between md:gap-20">
              <div className="w-[400px] mt-6 md:mt-0">
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="w-full p-2 mb-4 rounded-xl text-sm font-thin"
                  placeholder="Title of the movie"
                />

                <input
                  type="text"
                  value={editedDirector}
                  onChange={(e) => setEditedDirector(e.target.value)}
                  className="w-full p-2 mb-4 rounded-xl text-sm font-thin"
                  placeholder="Director"
                />

                <input
                  type="number"
                  value={editedReleaseYear}
                  onChange={(e) => setEditedReleaseYear(e.target.value)}
                  className="w-full p-2 mb-4 rounded-xl text-sm font-thin"
                  placeholder="Released Year"
                />

                <input
                  type="number"
                  value={editedRuntime}
                  onChange={(e) => setEditedRuntime(e.target.value)}
                  className="w-16 p-2 mb-4 rounded-xl text-sm font-thin"
                  placeholder="Runtime"
                />
                <span className="ml-2 font-normal text-sm"> Hours </span>

                <textarea
                  value={editedReview}
                  onChange={(e) => setEditedReview(e.target.value)}
                  className="w-full p-2 mb-4 rounded-xl text-sm font-thin"
                  placeholder="Write a review here..."
                  rows={10}
                />
              </div>
              <div className="hidden md:flex w-[350px]">
                <label htmlFor="poster" className="relative">
                  <Image
                    src={`/uploads/moviePosters/${movie.poster}`}
                    alt="Existing Poster"
                    className="w-full h-full object-cover rounded-xl"
                    width={1000}
                    height={1000}
                  />
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                className="w-full p-2 h-12 mt-4 rounded-xl text-sm  bg-darkCyan hover:bg-teal-600"
                type="submit">
                Save Changes
              </button>
              <button
                className="p-2 h-12 mt-4  flex justify-center items-center"
                onClick={onCancel}>
                <Image
                  src="/icons/close.svg"
                  alt="close-button"
                  className="transform hover:scale-125 transition-transform duration-300"
                  width={40}
                  height={40}></Image>
              </button>
            </div>
          </form>
        </div>

        {error && <div className="text-red-400 text-sm mt-4">{error}</div>}
      </div>

      <div className="mx-3 md:mx-10 lg:mx-32 my-3 mb-8 md:my-8 font-semibold  px-2 py-4 md:px-10 md:py-8 rounded-3xl bg-gray-800 flex lg:hidden">
        <div className="flex lg:hidden">
          <form className="mt-8 ml-0 md:ml-28" onSubmit={handleSave}>
            <div className="w-[350px]">
              <label htmlFor="poster" className="relative">
                <Image
                  src={`/uploads/moviePosters/${movie.poster}`}
                  alt="Existing Poster"
                  className="w-full h-full object-cover rounded-3xl ml-2"
                  width={1000}
                  height={1000}
                />
              </label>
            </div>
            <div className="flex justify-between md:gap-20">
              <div className="w-[400px] mt-6 ml-2 md:mt-0">
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="w-80 p-2 mb-4 rounded-xl text-sm font-thin"
                  placeholder="Title of the movie"
                />

                <input
                  type="text"
                  value={editedDirector}
                  onChange={(e) => setEditedDirector(e.target.value)}
                  className="w-80 p-2 mb-4 rounded-xl text-sm font-thin"
                  placeholder="Director"
                />

                <input
                  type="number"
                  value={editedReleaseYear}
                  onChange={(e) => setEditedReleaseYear(e.target.value)}
                  className="w-80 p-2 mb-4 rounded-xl text-sm font-thin"
                  placeholder="Released Year"
                />

                <input
                  type="number"
                  value={editedRuntime}
                  onChange={(e) => setEditedRuntime(e.target.value)}
                  className="w-44 p-2 mb-4 rounded-xl text-sm font-thin"
                  placeholder="Runtime"
                />
                <span className="ml-2 font-normal text-sm"> Hours </span>

                <textarea
                  value={editedReview}
                  onChange={(e) => setEditedReview(e.target.value)}
                  className="w-80 p-2 mb-4 rounded-xl text-sm font-thin"
                  placeholder="Write a review here..."
                  rows={10}
                />
              </div>
            </div>

            <div className="flex">
              <button
                className="p-2 h-12 rounded-xl text-sm  bg-darkCyan hover:bg-teal-600 w-80"
                type="submit">
                Save Changes
              </button>
              <button
                className="p-2 h-12  flex justify-center items-center mr-2"
                onClick={onCancel}>
                <Image
                  src="/icons/close.svg"
                  alt="close-button"
                  className="transform hover:scale-125 transition-transform duration-300"
                  width={40}
                  height={40}></Image>
              </button>
            </div>
          </form>
        </div>

        {error && <div className="text-red-400 text-sm mt-4">{error}</div>}
      </div>
    </div>
  );
}

export default EditMovie;
