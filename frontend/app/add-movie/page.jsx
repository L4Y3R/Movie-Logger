"use client";

import React from "react";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

function page() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [runtime, setRuntime] = useState("");
  const [review, setReview] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("Log in to add a TV Show");
      return;
    }

    const formData = new FormData();
    formData.append("poster", selectedFile);
    formData.append("title", title);
    formData.append("director", director);
    formData.append("releaseYear", releaseYear);
    formData.append("runtime", runtime);
    formData.append("review", review);

    const response = await fetch("http://localhost:4000/api/movies", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    try {
      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      }

      if (response.ok) {
        setTitle("");
        setDirector("");
        setReleaseYear("");
        setRuntime("");
        setReview("");
        setError(null);
        setSuccessMessage("Movie successfully added!");
        setSelectedFile(null);

        console.log("New movie added", json);
      }
    } catch (error) {
      console.log("Error parsing JSON Response", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="mx-3 md:mx-10 lg:mx-32 my-3 mb-8 md:my-8 font-semibold md:border-2 md:border-darkCyan px-2 py-4 md:px-10 md:py-8 rounded-2xl bg-gray-800">
      <span className="text-3xl">Add a Movie</span>

      <div className="flex justify-center">
        <form
          className="mt-8"
          onSubmit={handleSubmit}
          encType="multipart/form-data">
          <div className="flex justify-between gap-20">
            <div className="w-[400px]">
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="w-full p-2 mb-4 rounded-xl text-sm font-thin"
                placeholder="Title of the movie"
              />

              <input
                type="text"
                onChange={(e) => setDirector(e.target.value)}
                value={director}
                className="w-full p-2 mb-4 rounded-xl text-sm font-thin"
                placeholder="Director"
              />

              <input
                type="number"
                onChange={(e) => setReleaseYear(e.target.value)}
                value={releaseYear}
                className="w-full p-2 mb-4 rounded-xl text-sm font-thin"
                placeholder="Released Year"
              />

              <input
                type="number"
                onChange={(e) => setRuntime(e.target.value)}
                value={runtime}
                className="w-20 p-2 mb-4 rounded-xl text-sm font-thin"
                placeholder="Runtime"
              />
              <span className="ml-2 font-normal"> Hours </span>

              <textarea
                onChange={(e) => setReview(e.target.value)}
                value={review}
                className="w-full p-2 mb-4 rounded-xl text-sm font-thin"
                placeholder="Write a review here..."
                rows={4}
              />

              <button
                type="submit"
                className="w-full p-2 h-12 mt-4 rounded-xl text-sm  bg-darkCyan hover:bg-teal-600">
                Add the movie
              </button>
            </div>

            <div className="w-[250px]">
              <label htmlFor="poster" className="relative cursor-pointer">
                <input
                  type="file"
                  id="poster"
                  accept="image/jpeg, image/jpg, image/png"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="w-full h-full p-2 mb-4 rounded-xl text-sm font-thin border-dashed border-2 border-gray-300 flex items-center justify-center cursor-pointer">
                  {selectedFile ? (
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Poster"
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <p className="text-gray-500">Click to upload poster</p>
                  )}
                </div>
              </label>
            </div>
          </div>

          {successMessage && (
            <div className="text-green-400 mt-4">{successMessage}</div>
          )}

          {error && (
            <div className="text-red-400 text-center font-thin mt-4">
              {" "}
              {error}{" "}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default page;
