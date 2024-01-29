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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tv = {
      title,
      creator,
      firstRelease,
      lastRelease,
      seasons,
      season,
      episode,
      review,
    };

    const response = await fetch("http://localhost:4000/api/tv", {
      method: "POST",
      body: JSON.stringify(tv),
      headers: {
        "Content-Type": "application/json",
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
    <div className=" mx-3 md:mx-10 lg:mx-32 my-3 mb-8 md:my-8 font-semibold md:border-2 md:border-darkCyan px-2 py-4 md:px-10 md:py-8 rounded-2xl bg-gray-800">
      <span className="text-3xl">Add a TV Series</span>
      <div className="flex justify-center gap-20">
        <form className="w-96 mt-8" onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="w-full p-2 mb-4 rounded-xl text-sm font-thin"
            placeholder="Title of the show"
          />

          <input
            type="text"
            onChange={(e) => setCreator(e.target.value)}
            value={creator}
            className="w-full p-2 mb-4 rounded-xl text-sm font-thin"
            placeholder="Creator"
          />

          <div className="flex gap-2">
            <input
              type="number"
              onChange={(e) => setFirstRelease(e.target.value)}
              value={firstRelease}
              className="w-full p-2 mb-4 rounded-xl text-sm font-thin"
              placeholder="First Released Year"
            />

            <input
              type="number"
              onChange={(e) => setLastRelease(e.target.value)}
              value={lastRelease}
              className="w-full p-2 mb-4 rounded-xl text-sm font-thin"
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

          <div className="flex gap-2">
            <input
              type="number"
              onChange={(e) => setSeason(e.target.value)}
              value={season}
              className="w-full p-2 mb-4 rounded-xl text-sm font-thin"
              placeholder="Season you watched"
            />

            <input
              type="number"
              onChange={(e) => setEpisode(e.target.value)}
              value={episode}
              className="w-full p-2 mb-4 rounded-xl text-sm font-thin"
              placeholder="Episode you watched"
            />
          </div>

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
            Add the TV Show
          </button>
        </form>

        {error && <div className="text-red-400"> {error} </div>}

        <div className="w-80 mt-8">
          <label htmlFor="poster" className="relative cursor-pointer">
            <input
              type="file"
              id="poster"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="w-full h-[500px] border-dashed border-2 border-gray-300 flex items-center justify-center rounded-md">
              {selectedFile ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Poster"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <>
                  <p className="text-gray-500">Click to upload poster</p>
                </>
              )}
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

export default page;
