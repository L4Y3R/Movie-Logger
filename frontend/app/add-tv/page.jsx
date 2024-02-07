"use client";

import React from "react";
import { useState } from "react";

function page() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [creator, setCreator] = useState("");
  const [firstRelease, setFirstRelease] = useState("");
  const [lastRelease, setLastRelease] = useState("");
  const [seasons, setSeasons] = useState("");
  const [season, setSeason] = useState("");
  const [episode, setEpisode] = useState("");
  const [review, setReview] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("postertv", selectedFile);
    formData.append("title", title);
    formData.append("firstRelease", firstRelease);
    formData.append("lastRelease", lastRelease);
    formData.append("seasons", seasons);
    formData.append("season", season);
    formData.append("episode", episode);
    formData.append("review", review);

    const response = await fetch("http://localhost:4000/api/tv", {
      method: "POST",
      body: formData,
    });

    try {
      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      }

      if (response.ok) {
        setTitle("");
        setCreator("");
        setFirstRelease("");
        setLastRelease("");
        setSeasons("");
        setSeason("");
        setEpisode("");
        setReview("");
        setError(null);
        setSuccessMessage("TV Show successfully added!");
        setSelectedFile(null);

        console.log("New TV Show added", json);
      }
    } catch (error) {
      console.error("Error parsing JSON response:", error);
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
                placeholder="Title of the TV Series"
              />

              <input
                type="text"
                onChange={(e) => setCreator(e.target.value)}
                value={creator}
                className="w-full p-2 mb-4 rounded-xl text-sm font-thin"
                placeholder="Creator"
              />

              <div className="flex gap-5 justify-between">
                <input
                  type="number"
                  onChange={(e) => setFirstRelease(e.target.value)}
                  value={firstRelease}
                  className="w-48 p-2 mb-4 rounded-xl text-sm font-thin"
                  placeholder="First Released Year"
                />

                <input
                  type="number"
                  onChange={(e) => setLastRelease(e.target.value)}
                  value={lastRelease}
                  className="w-48 p-2 mb-4 rounded-xl text-sm font-thin"
                  placeholder="Last Released Year"
                />
              </div>
              <input
                type="number"
                onChange={(e) => setSeasons(e.target.value)}
                value={seasons}
                className="w-full p-2 mb-4 rounded-xl text-sm font-thin"
                placeholder="Number of total seasons"
              />

              <div className="flex gap-5 justify-between">
                <input
                  type="number"
                  onChange={(e) => setSeason(e.target.value)}
                  value={season}
                  className="w-48 p-2 mb-4 rounded-xl text-sm font-thin"
                  placeholder="Season you saw"
                />

                <input
                  type="number"
                  onChange={(e) => setEpisode(e.target.value)}
                  value={episode}
                  className="w-48 p-2 mb-4 rounded-xl text-sm font-thin"
                  placeholder="Episode you saw"
                />
              </div>

              <textarea
                onChange={(e) => setReview(e.target.value)}
                value={review}
                className="w-full p-2 mb-4 rounded-xl text-sm font-thin"
                placeholder="Your review..."
                rows={4}
              />

              <button
                type="submit"
                className="w-full p-2 h-12 mt-4 rounded-xl text-sm  bg-darkCyan hover:bg-teal-600">
                Add the TV Series
              </button>
            </div>

            <div className="w-[300px]">
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
