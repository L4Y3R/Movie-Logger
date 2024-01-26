import React from "react";
import RecentCards from "../../components/RecentCards";

function Recent() {
  return (
    <div className="min-h-screen mx-3 md:mx-32 my-3 mb-8 md:my-8 font-semibold text-2xl md:border-2 md:border-darkCyan px-2 py-4 md:px-10 md:py-8 rounded-2xl bg-gray-800">
      <span className="text-4xl">Recently Added</span>
      <div className="mt-8"></div>
      <RecentCards />
    </div>
  );
}

export default Recent;
