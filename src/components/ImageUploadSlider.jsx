"use client";
import React, { useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  autoplay: false,
  arrows: true,
  adaptiveHeight: false,
};

export default function ImageUploadSlider() {
  const [images, setImages] = useState([]);

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    const fileUrls = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setImages(fileUrls);
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFilesChange}
        className="block w-full text-sm text-slate-700"
      />
      {images.length > 0 && (
        <Slider {...sliderSettings}>
          {images.map((img) => (
            <div key={img.name} className="relative h-64">
              <Image src={img.url} alt={img.name} fill className="object-cover" />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}
