"use client";

import React from "react";
import { useState } from "react";

function page() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  return (
    <div className=" mx-3 md:mx-10 lg:mx-32 my-3 mb-8 md:my-8 font-semibold md:border-2 md:border-darkCyan px-2 py-4 md:px-10 md:py-8 rounded-2xl bg-gray-800">
      <span className="text-3xl">Add a Movie</span>
      <div className="flex justify-center gap-10">
        <div className="w-96 mt-8">
          <input
            type="text"
            className="w-full p-2 mb-4 rounded-xl text-sm font-thin"
            placeholder="Title of the movie"
          />

          <input
            type="text"
            className="w-full p-2 mb-4 rounded-xl text-sm font-thin"
            placeholder="Director"
          />

          <input
            type="text"
            className="w-full p-2 mb-4 rounded-xl text-sm font-thin"
            placeholder="Released Year"
          />

          <input
            type="text"
            className="w-20 p-2 mb-4 rounded-xl text-sm font-thin"
            placeholder="Runtime"
          />
          <span className="ml-2 font-normal"> Hours </span>

          <textarea
            className="w-full p-2 mb-4 rounded-xl text-sm font-thin"
            placeholder="Write a review here..."
            rows={4}
          />

          <button className="w-full p-2 h-12 mt-4 rounded-xl text-sm  bg-darkCyan hover:bg-teal-600">
            Add the movie
          </button>
        </div>
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
