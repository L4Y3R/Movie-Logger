import React from "react";
import Image from "next/image";

const TVDetail = ({ tv }) => {
  return (
    <div className="bg-gray-800 p-8 rounded-3xl w-[500px]">
      <div className="flex justify-center mb-8">
        <Image
          src={`/uploads/tvPosters/${tv.poster}`}
          alt="poster"
          className="object-cover rounded-xl h-72 w-52"
          width={1000}
          height={1000}
        />
      </div>
      <h2 className="text-3xl font-semibold mb-4">
        {tv.title} ({tv.firstRelease} - {tv.lastRelease})
      </h2>
      <p className="text-gray-300 mb-4 text-sm">
        Created by:<span className="font-thin ml-2">{tv.creator}</span>
      </p>
      <p className="text-gray-300 mb-4 text-sm">
        Seasons:<span className="font-thin  ml-2">{tv.seasons}</span>
      </p>
      <p className="text-gray-300 mb-4 text-sm">
        Season and Episode you watched:
        <span className="font-thin  ml-2">
          {" "}
          S0{tv.season} E0{tv.episode}{" "}
        </span>
      </p>
      <p className="text-gray-300 mb-4 text-sm">
        Review:
        <span className="font-thin  ml-2"> {tv.review} </span>
      </p>
    </div>
  );
};

export default TVDetail;
