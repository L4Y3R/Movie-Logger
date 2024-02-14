import React, { useState } from "react";
import Image from "next/image";
import { useAuthContext } from "../hooks/useAuthContext";
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
  const { user } = useAuthContext();

  const handleSave = async (e) => {
    if (!user) {
      setError("Log in to edit");
      return;
    }
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
          Authorization: `Bearer ${user.token}`,
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
      <div className="mx-3 md:mx-10 lg:mx-32 my-3 mb-8 md:my-8 font-semibold  px-2 py-4 md:px-10 md:py-8 rounded-3xl bg-gray-800 hidden lg:flex">
        <div className="justify-center hidden lg:flex">
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

      <div className="rounded-3xl bg-gray-800 flex justify-center lg:hidden">
        <div className="flex lg:hidden">
          <form className="mt-8 md:mt-0 md:ml-16" onSubmit={handleSave}>
            <div className="w-[340px] mt-72 ml-16 md:ml-8">
              <label htmlFor="poster" className="relative">
                <Image
                  src={`/uploads/tvPosters/${tv.poster}`}
                  alt="Existing Poster"
                  className="object-cover rounded-3xl "
                  width={1000}
                  height={1000}
                />
              </label>
            </div>

            <div className="flex gap-20 mt-8 ml-16 md:ml-8">
              <div className="w-[400px]">
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="w-80 p-2 mb-4 rounded-xl text-sm font-thin"
                  placeholder="Title of the movie"
                />

                <input
                  type="text"
                  value={editedCreator}
                  onChange={(e) => setEditedCreator(e.target.value)}
                  className="w-80 p-2 mb-4 rounded-xl text-sm font-thin"
                  placeholder="Creator"
                />

                <div className="flex gap-16">
                  <input
                    type="number"
                    value={editedFirstRelease}
                    onChange={(e) => setEditedFirstRelease(e.target.value)}
                    className="p-2 mb-4 rounded-xl text-sm font-thin w-32"
                    placeholder="First Released Year"
                  />

                  <input
                    type="number"
                    value={editedLastRelease}
                    onChange={(e) => setEditedLastRelease(e.target.value)}
                    className="w-32 p-2 mb-4 rounded-xl text-sm font-thin"
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

                <div className="flex-col justify-between items-center">
                  <input
                    type="number"
                    value={editedSeason}
                    onChange={(e) => setEditedSeason(e.target.value)}
                    className="w-16 p-2 mb-4 rounded-xl text-sm font-thin"
                    placeholder="Season you saw"
                  />

                  <span className="font-normal text-sm ml-2 mb-4">
                    Season I saw
                  </span>

                  <input
                    type="number"
                    value={editedEpisode}
                    onChange={(e) => setEditedEpisode(e.target.value)}
                    className="ml-2 w-16 p-2 mb-4 rounded-xl text-sm font-thin"
                    placeholder="Episode you saw"
                  />

                  <span className="ml-2 font-normal text-sm mb-4">
                    Episode I saw{" "}
                  </span>
                </div>

                <textarea
                  value={editedReview}
                  onChange={(e) => setEditedReview(e.target.value)}
                  className="w-80 p-2 mb-4 rounded-xl text-sm font-thin"
                  placeholder="Write a review here..."
                  rows={10}
                />
              </div>
            </div>

            <div className="flex justify-center ml-6 gap-3 mb-4">
              <button
                className=" p-2 h-12 rounded-xl text-sm  bg-darkCyan hover:bg-teal-600 w-72"
                type="submit">
                Save Changes
              </button>
              <button
                className="p-2 h-12 flex justify-center items-center"
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
