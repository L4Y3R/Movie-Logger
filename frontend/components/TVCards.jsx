"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import Search from "./SearchBar";
import TVDetail from "./TVDetail";

export default function MovieCards() {
  const [tv, setTv] = useState(null);
  const [selectedTv, setSelectedTv] = useState(null);
  const [showAllTv, setShowAllTv] = useState(false);

  useEffect(() => {
    const fetchTv = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/tv");
        const json = await response.json();
        console.log("Received Data", json);

        if (response.ok) {
          setTv(json);
        }
      } catch (error) {
        console.error("Error fetching tv shows", error);
      }
    };

    fetchTv();
  }, []);

  const handleTvClick = (tv) => {
    setSelectedTv(tv);
  };

  const handleCloseDetail = () => {
    setSelectedTv(null);
  };

  const handleDelete = async () => {
    if (selectedTv) {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this TV Series?"
      );

      if (isConfirmed) {
        const response = await fetch(
          `http://localhost:4000/api/tv/${selectedTv._id}`,
          {
            method: "DELETE",
          }
        );

        const json = await response.json();

        if (!response.ok) {
          console.error("Error deleting tv series", json);
        } else {
          console.log("TV Series deleted successfully", json);
          setTv((prevtv) => prevtv.filter((tv) => tv._id !== selectedTv._id));
          setSelectedTv(null);
        }
      }
    }
  };

  return (
    <>
      <div className="min-h-screen mx-3 md:mx-10 lg:mx-32 my-3 mb-8 md:my-8 font-semibold text-2xl  px-2 py-4 md:px-10 md:py-8 rounded-3xl bg-gray-800">
        <div className="md:flex justify-center md:justify-between">
          <span className="text-4xl flex justify-center text-center">
            Recently Added TV Series
          </span>
          <Search />
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 gap-y-5 md:gap-y-10">
          {tv ? (
            tv.slice(0, showAllTv ? tv.length : 12).map((card, index) => (
              <div
                key={index}
                onClick={() => handleTvClick(card)}
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
                  alt="poster"
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
        {selectedTv && (
          <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
            <div>
              <TVDetail tv={selectedTv} />
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
        <button
          className=" p-2 w-44 h-12 rounded-xl text-sm  bg-darkCyan hover:bg-teal-600 mb-8"
          onClick={() => setShowAllTv(true)}>
          See all TV series
        </button>
      </div>
    </>
  );
}
