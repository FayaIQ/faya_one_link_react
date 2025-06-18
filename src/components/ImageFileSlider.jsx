"use client";
import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import sliderImages from "../data/sliderImages";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  autoplay: true,
  arrows: true,
  adaptiveHeight: false,
};

export default function ImageFileSlider() {
  return (
    <Slider {...sliderSettings}>
      {sliderImages.map((img) => (
        <div key={img.src} className="relative h-64">
          <Image src={img.src} alt={img.alt} fill className="object-cover" />
        </div>
      ))}
    </Slider>
  );
}
