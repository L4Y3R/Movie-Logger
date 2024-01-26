import React from "react";
import AllCards from "../../components/AllCards";

function All() {
  return (
    <>
      <div className="min-h-screen mx-3 md:mx-10 lg:mx-32 my-3 mb-8 md:my-8 font-semibold text-2xl md:border-2 md:border-darkCyan px-2 py-4 md:px-10 md:py-8 rounded-2xl bg-gray-800">
        <div className="md:flex items-center justify-between">
          <span className="text-4xl flex justify-center">All Entries</span>

          <div className="relative flex items-center justify-center">
            <input
              type="text"
              placeholder="Search..."
              className="mt-4 md:mt-0 rounded-xl text-xs font-light px-5 w-80 md:w-96 h-10 pr-10"
            />

            <button className="absolute top-4 right-5 md:top-0 md:right-0 mt-2 mr-3">
              {" "}
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512">
                <path
                  fill="#ffffff"
                  d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="mt-8"></div>
        <AllCards />
      </div>
    </>
  );
}

export default All;
