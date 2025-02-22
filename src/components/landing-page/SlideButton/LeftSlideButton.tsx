/* eslint-disable @next/next/no-img-element */

"use client";

import React from "react";
import { useSwiper } from "swiper/react";

const SlideButton = () => {
  const swiper = useSwiper();

  const handleSlidePrev = () => {
    swiper.slidePrev();
  };

  return (
    <div className="absolute left-0 top-1/2 z-50 flex justify-between gap-x-6 ml-4">
      <button
        className="h-fit w-fit rounded-full border border-transparent bg-white p-2 transition hover:border-base-dark hover:bg-opacity-90"
        onClick={handleSlidePrev}
      >
        <img src="/icons/arrow-left-black.svg" alt="Previous Slide" />
      </button>
    </div>
  );
};

export default SlideButton;

