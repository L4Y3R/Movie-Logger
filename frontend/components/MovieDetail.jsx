import React from "react";
import Image from "next/image";

const MovieDetail = ({ movie }) => {
  return (
    <div className="bg-gray-800 p-8 rounded-3xl w-[500px] relative overflow-hidden">
      <div className="flex justify-center mb-8">
        <Image
          src={`/uploads/moviePosters/${movie.poster}`}
          alt="poster"
          className="object-cover rounded-xl h-96 w-72"
          width={1400}
          height={1000}
        />
      </div>
      <h2 className="text-3xl font-semibold mb-4 text-white">
        {movie.title} ({movie.releaseYear})
      </h2>
      <p className="text-gray-300 mb-4 text-sm">
        Directed by:<span className="font-thin ml-2">{movie.director}</span>
      </p>
      <p className="text-gray-300 mb-4 text-sm">
        Runtime:<span className="font-thin ml-2">{movie.runtime} Hours</span>
      </p>
      <p className="text-gray-300 mb-4 text-sm">
        Review:
        <span className="font-thin ml-2">{movie.review}</span>
      </p>
    </div>
  );
};

export default MovieDetail;
