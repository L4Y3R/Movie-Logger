import React, { useState } from "react";
import Image from "next/image";

function EditMovie({ tv, onSave, onCancel }) {
  const [editedTitle, setEditedTitle] = useState(tv.title);
  const [editedCreator, setEditedCreator] = useState(tv.creator);
  const [editedFirstRelease, setEditedFirstRelease] = useState(tv.firstRelease);
  const [editedLastRelease, setEditedLastRelease] = useState(tv.lastRelease);
  const [editedSeasons, setEditedSeasons] = useState(tv.seasons);
  const [editedSeason, setEditedSeason] = useState(tv.season);
  const [editedEpisode, setEditedEpisode] = useState(tv.episode);
  const [editedReview, setEditedReview] = useState(tv.review);
  const [error, setError] = useState(null);

  const handleSave = async (e) => {
    const editedTv = {
      title: editedTitle,
      creator: editedCreator,
      firstRelease: editedFirstRelease,
      lastRelease: editedLastRelease,
      seasons: editedSeasons,
      season: editedSeason,
      episode: editedEpisode,
      review: editedReview,
    };

    try {
      const response = await fetch(`http://localhost:4000/api/tv/${tv._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedTv),
      });

      if (!response.ok) {
        e.preventDefault();
        const data = await response.json();
        throw new Error(data.error || "Failed to update tv show");
      }

      console.log("TV Show updated successfully!");
    } catch (error) {
      e.preventDefault();
      console.error("Error updating tv show:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-80 flex items-center justify-center">
      <div className="mx-3 md:mx-10 lg:mx-32 my-3 mb-8 md:my-8 font-semibold  px-2 py-4 md:px-10 md:py-8 rounded-2xl bg-gray-800">
        <span className="text-3xl">Edit TV Series Details</span>
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
                  value={editedCreator}
                  onChange={(e) => setEditedCreator(e.target.value)}
                  className="w-full p-2 mb-4 rounded-xl text-sm font-thin"
                  placeholder="Creator"
                />

                <div className="flex justify-between">
                  <input
                    type="number"
                    value={editedFirstRelease}
                    onChange={(e) => setEditedFirstRelease(e.target.value)}
                    className="w-44 p-2 mb-4 rounded-xl text-sm font-thin"
                    placeholder="First Released Year"
                  />

                  <input
                    type="number"
                    value={editedLastRelease}
                    onChange={(e) => setEditedLastRelease(e.target.value)}
                    className="w-44 p-2 mb-4 rounded-xl text-sm font-thin"
                    placeholder="Last Released Year"
                  />
                </div>

                <input
                  type="number"
                  value={editedSeasons}
                  onChange={(e) => setEditedSeasons(e.target.value)}
                  className="w-16 p-2 mb-4 rounded-xl text-sm font-thin"
                  placeholder="Total seasons"
                />

                <span className="ml-2 font-normal text-sm">
                  {" "}
                  Of total seasons{" "}
                </span>

                <div className="flex justify-between items-center">
                  <input
                    type="number"
                    value={editedSeason}
                    onChange={(e) => setEditedSeason(e.target.value)}
                    className="w-16 p-2 mb-4 rounded-xl text-sm font-thin"
                    placeholder="Season you saw"
                  />

                  <span className="ml-2 font-normal text-sm mb-4">
                    Season I saw
                  </span>

                  <input
                    type="number"
                    value={editedEpisode}
                    onChange={(e) => setEditedEpisode(e.target.value)}
                    className="w-16 p-2 mb-4 rounded-xl text-sm font-thin"
                    placeholder="Episode you saw"
                  />

                  <span className="ml-2 font-normal text-sm mb-4">
                    Episode I saw{" "}
                  </span>
                </div>

                <textarea
                  value={editedReview}
                  onChange={(e) => setEditedReview(e.target.value)}
                  className="w-full p-2 mb-4 rounded-xl text-sm font-thin"
                  placeholder="Write a review here..."
                  rows={10}
                />
              </div>
              <div className="w-[350px]">
                <label htmlFor="poster" className="relative">
                  <Image
                    src={`/uploads/tvPosters/${tv.poster}`}
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
    </div>
  );
}

export default EditMovie;
