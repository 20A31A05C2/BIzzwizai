"use client";
import React from "react";

const RocketScrollEffect = () => {
  return (
    <div className="justify-center items-center flex flex-col mt-10 mb-10">
      {/* Rocket container with relative positioning */}
      <div className="relative flex flex-col items-center min-h-[1200px]">
        {/* Rocket image */}
        <img
          src="/rocket.png"
          alt="Rocket"
          className="w-[400px] h-[400px] object-contain z-10 relative"
        />
        
        {/* Fire positioned at rocket's bottom tip */}
        <img
          src="/fire.png"
          alt="Rocket Fire"
          className="w-[1000px] h-[1000px] object-contain -mt-60 z-5"
        />
      </div>
    </div>
  );
};

export default RocketScrollEffect;