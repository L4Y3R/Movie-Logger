"use client";

import React from "react";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

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
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("Log in to add a TV Show");
      return;
    }

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
    <div className="mx-4 md:mx-20 my-10 font-semibold md:border-2 md:border-darkCyan px-5 py-4 md:px-10 md:py-8 rounded-2xl bg-gray-800">
      <span className="text-3xl">Add a Movie</span>

      <div className="flex justify-center">
        <form
          className="mt-8"
          onSubmit={handleSubmit}
          encType="multipart/form-data">
          <div className="w-[300px] lg:hidden flex justify-center ml-6 md:ml-16 mb-6">
            <label htmlFor="poster" className="relative cursor-pointer">
              <input
                type="file"
                id="poster"
                accept="image/jpeg, image/jpg, image/png"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="w-[200px] h-[300px] p-2 mb-4 rounded-xl text-sm font-thin border-dashed border-2 border-gray-300 flex items-center justify-center cursor-pointer">
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

          <div className="flex justify-between gap-10">
            <div className="w-[340px] md:w-[400px]">
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

              <div className="flex gap-2 md:gap-5 justify-between">
                <input
                  type="number"
                  onChange={(e) => setFirstRelease(e.target.value)}
                  value={firstRelease}
                  className="w-44 md:w-48 p-2 mb-4 rounded-xl text-sm font-thin"
                  placeholder="First Released Year"
                />

                <input
                  type="number"
                  onChange={(e) => setLastRelease(e.target.value)}
                  value={lastRelease}
                  className="w-44 md:w-48 p-2 mb-4 rounded-xl text-sm font-thin"
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

              <div className="flex gap-2 md:gap-5 justify-between">
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

            <div className="w-[300px] hidden lg:flex">
              <label htmlFor="poster" className="relative cursor-pointer">
                <input
                  type="file"
                  id="poster"
                  accept="image/jpeg, image/jpg, image/png"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="w-[350px] h-full p-2 mb-4 rounded-xl text-sm font-thin border-dashed border-2 border-gray-300 flex items-center justify-center cursor-pointer">
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
