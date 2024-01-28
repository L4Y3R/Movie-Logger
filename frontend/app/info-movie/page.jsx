import React from "react";
import Image from "next/image";

function page() {
  return (
    <div className="min-h-[800px] mx-3 md:mx-10 lg:mx-32 my-3 mb-8 md:my-8 font-semibold md:border-2 md:border-darkCyan px-2 py-4 md:px-10 md:py-8 rounded-2xl bg-gray-800">
      <div className="flex items-center justify-between">
        <span className="text-3xl flex justify-center md:justify-start">
          Movie Name Here
        </span>

        <div className="flex gap-4 items-center">
          <button>
            <Image
              src="/icons/edit.svg"
              alt="delete"
              width={25}
              height={25}
              className="hover:scale-110"
            />
          </button>
          <button>
            <Image
              src="/icons/delete.svg"
              alt="delete"
              width={25}
              height={25}
              className="hover:scale-110"
            />
          </button>
        </div>
      </div>
      <div className="lg:mx-16 mt-5 md:mt-10 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-10">
        <div className="bg-slate-200 h-62 w-[300px]  md:h-[600px] md:w-[400px] rounded-xl">
          <Image
            src="/test/nolan.jpg"
            alt="poster img"
            className="w-full h-full object-cover rounded-xl"
            width={1000}
            height={1000}
          />
        </div>
        <div className="flex flex-col justify-center text-center lg:text-start lg:justify-start gap-y-10 w-[400px]">
          <span> Director: Chris Nolan </span>
          <span> Release year: 2014 </span>
          <span> Runtime: 145 mins</span>
          <span> Review: </span>
        </div>
      </div>
    </div>
  );
}

export default page;
