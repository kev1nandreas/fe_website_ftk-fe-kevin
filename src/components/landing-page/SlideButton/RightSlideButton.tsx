/* eslint-disable @next/next/no-img-element */

"use client";

import React from "react";
import { useSwiper } from "swiper/react";

const SlideButton = () => {
  const swiper = useSwiper();

  const handleSlideNext = () => {
    swiper.slideNext();
  };

  return (
    <div className="absolute right-0 top-1/2 z-50 flex justify-between gap-x-6 mr-4">
      <button
        className="h-fit w-fit rounded-full border border-transparent bg-white p-2 transition hover:border-base-dark hover:bg-opacity-90"
        onClick={handleSlideNext}
      >
        <img src="/icons/arrow-right-black.svg" alt="Next Slide" />
      </button>
    </div>
  );
};

export default SlideButton;

