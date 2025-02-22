/* eslint-disable @next/next/no-img-element */

"use client";

import React from "react";
import { useSwiper } from "swiper/react";

const PostSlideButton = () => {
  const swiper = useSwiper();

  const handleSlideNext = () => {
    swiper.slideNext();
  };

  const handleSlidePrev = () => {
    swiper.slidePrev();
  };

  return (
    <div className="absolute left-0 top-1/2 z-50 flex w-full justify-between gap-x-6 px-20">
      <button
        className="h-fit w-fit rounded-full border border-transparent border-white p-2 transition hover:bg-white hover:bg-opacity-20"
        onClick={handleSlidePrev}
      >
        <img src="/icons/arrow-left-white.svg" alt="Previous Slide" />
      </button>
      <button
        className="h-fit w-fit rounded-full border border-transparent border-white p-2 transition hover:bg-white hover:bg-opacity-20"
        onClick={handleSlideNext}
      >
        <img src="/icons/arrow-right-white.svg" alt="Next Slide" />
      </button>
    </div>
  );
};

export default PostSlideButton;
