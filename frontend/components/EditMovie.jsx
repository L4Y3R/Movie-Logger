import React, { useState } from "react";
import Image from "next/image";

function EditMovie({ movie, onSave, onCancel }) {
  const [editedTitle, setEditedTitle] = useState(movie.title);
  const [editedDirector, setEditedDirector] = useState(movie.director);
  const [editedReleaseYear, setEditedReleaseYear] = useState(movie.releaseYear);
  const [editedRuntime, setEditedRuntime] = useState(movie.runtime);
  const [editedReview, setEditedReview] = useState(movie.review);
  const [editedPoster, setEditedPoster] = useState(null);
  const [error, setError] = useState(null);

  const handleSave = async () => {
    const editedMovie = {
      title: editedTitle,
      director: editedDirector,
      releaseYear: editedReleaseYear,
      runtime: editedRuntime,
      review: editedReview,
      poster: editedPoster,
    };

    onSave(editedMovie);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEditedPoster(file);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-80 flex items-center justify-center">
      <div className="mx-3 md:mx-10 lg:mx-32 my-3 mb-8 md:my-8 font-semibold  px-2 py-4 md:px-10 md:py-8 rounded-2xl bg-gray-800">
        <span className="text-3xl">Edit Movie Details</span>
        <div className="flex justify-center">
          <form className="mt-8" onSubmit={handleSave}>
            <div className="flex justify-between gap-20">
              <div className="w-[400px]">
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
                  className="w-full p-2 mb-4 rounded-xl text-sm font-thin"
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
              <div className="w-[350px]">
                <label htmlFor="poster" className="relative cursor-pointer">
                  {editedPoster ? (
                    <img
                      src={URL.createObjectURL(editedPoster)}
                      alt="Edited Poster"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <Image
                      src={`/uploads/moviePosters/${movie.poster}`}
                      alt="Existing Poster"
                      className="w-full h-full object-cover rounded-xl"
                      width={1000}
                      height={1000}
                    />
                  )}
                  <input
                    type="file"
                    id="poster"
                    accept="image/jpeg, image/jpg, image/png"
                    onChange={handleFileChange}
                    className="hidden"
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
    </div>
  );
}

export default EditMovie;
