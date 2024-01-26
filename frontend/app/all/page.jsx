import React from "react";
import AllCards from "../../components/AllCards";
import SearchBar from "../../components/SearchBar";

function All() {
  return (
    <>
      <div className="min-h-screen mx-3 md:mx-10 lg:mx-32 my-3 mb-8 md:my-8 font-semibold text-2xl md:border-2 md:border-darkCyan px-2 py-4 md:px-10 md:py-8 rounded-2xl bg-gray-800">
        <div className="md:flex items-center justify-between">
          <span className="text-4xl flex justify-center">All Entries</span>

          <SearchBar />
        </div>
        <div className="mt-8"></div>
        <AllCards />
      </div>
    </>
  );
}

export default All;
