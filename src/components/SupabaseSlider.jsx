'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { supabase } from '@/lib/supabaseClient';

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  appendDots: (dots) => (
    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
      <ul className="flex space-x-2 pointer-events-auto">{dots}</ul>
    </div>
  ),
  customPaging: (i) => (
    <button
      className="w-3 h-3 rounded-full bg-white/50 hover:bg-white transition-all duration-200"
      aria-label={`شريحة ${i + 1}`}
    />
  ),
};

export default function SupabaseSlider() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase
        .from('dashboard_images')
        .select('url')
        .order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching images', error);
        return;
      }
      setImages(data.map((row) => row.url));
    };
    fetchImages();
  }, []);

  return (
    <Slider {...sliderSettings}>
      {images.map((url, idx) => (
        <div key={idx} className="px-2">
          <div className="relative h-64 sm:h-80 md:h-96 rounded-3xl overflow-hidden bg-white/70 backdrop-blur border border-slate-200">
            <Image
              src={url}
              alt={`slide-${idx}`}
              fill
              unoptimized
              className="object-cover"
              sizes="(min-width: 768px) 70vw, 90vw"
            />
          </div>
        </div>
      ))}
    </Slider>
  );
}
