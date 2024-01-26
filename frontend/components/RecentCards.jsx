import React from "react";
import Image from "next/image";

export default function RecentCards() {
  const cardData = [
    { date: "2024-03-02", title: "Interstellar", imageSrc: "/test/nolan.jpg" },
    { date: "2024-03-02", title: "Interstellar", imageSrc: "/test/nolan.jpg" },
    { date: "2024-03-02", title: "Interstellar", imageSrc: "/test/nolan.jpg" },
    { date: "2024-03-02", title: "Interstellar", imageSrc: "/test/nolan.jpg" },
    { date: "2024-03-02", title: "Interstellar", imageSrc: "/test/nolan.jpg" },
    { date: "2024-03-02", title: "Interstellar", imageSrc: "/test/nolan.jpg" },
    { date: "2024-03-02", title: "Interstellar", imageSrc: "/test/nolan.jpg" },
    { date: "2024-03-02", title: "Interstellar", imageSrc: "/test/nolan.jpg" },
    { date: "2024-03-02", title: "Interstellar", imageSrc: "/test/nolan.jpg" },
    { date: "2024-03-02", title: "Interstellar", imageSrc: "/test/nolan.jpg" },
    { date: "2024-03-02", title: "Interstellar", imageSrc: "/test/nolan.jpg" },
  ];

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 gap-y-5 md:gap-y-10">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-slate-200 md:h-64 md:w-44 lg:h-80 lg:w-52 rounded-xl border-2 border-darkCyan transform hover:scale-105 transition-transform duration-300">
            <div className="bg-gradient-to-b rounded-t-xl from-slate-900 to-transparent absolute top-0 left-0 w-full h-full"></div>
            <h7 className="absolute top-2 left-2 text-white text-xs">
              {card.date}
            </h7>
            <h3 className="absolute top-5 left-2 text-white">{card.title}</h3>
            <Image
              src={card.imageSrc}
              alt={`Card Image - ${index}`}
              className="w-full h-full object-cover rounded-xl"
              width={1000}
              height={1000}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
