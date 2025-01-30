/* eslint-disable @next/next/no-img-element */

import React from "react";

const Fotbar = () => {
  return (
    <div className="relative h-fit w-full">
      <img src="/images/Fotbar.jpg" alt="Foto Bareng" className="w-full border-2 brightness-50" />
      <div className="absolute bottom-0 h-16 md:h-60 w-full bg-gradient-to-t from-yellow-400 via-yellow-400 via-30% to-transparent"></div>
      <div className="absolute top-0 h-16 md:h-60 w-full bg-gradient-to-b from-white via-white via-30% to-transparent"></div>
    </div>
  );
};

export default Fotbar;
