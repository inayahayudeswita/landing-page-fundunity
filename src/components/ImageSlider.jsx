import React, { useRef, useState, useEffect } from "react";

// Ganti ini sesuai path gambar lokal kamu
import image1 from "../assets/images/image1.jpg";
import image2 from "../assets/images/image2.jpg";
import image3 from "../assets/images/image3.jpg";
import image4 from "../assets/images/image4.jpg";
import image5 from "../assets/images/image5.jpg";
import image6 from "../assets/images/image6.jpg";
import image7 from "../assets/images/image7.jpg";

const ImageSlider = () => {
  const images = [
    { src: image1, description: "Sunset over the ocean." },
    { src: image2, description: "Snowy mountains under a clear sky." },
    { src: image3, description: "Vibrant city skyline at night." },
    { src: image4, description: "Peaceful forest pathway." },
    { src: image5, description: "Beach with turquoise water." },
    { src: image6, description: "Stunning waterfall in the jungle." },
    { src: image7, description: "Cozy cabin in the snow." },
  ];

  const scrollRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  return (
    <div className="relative w-full max-w-6xl mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Image Slider</h2>

      {/* Scrollable Image Container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scroll-smooth gap-6 px-4"
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`flex-shrink-0 w-72 relative rounded-xl overflow-hidden cursor-pointer transition-transform duration-500 shadow-lg ${
              hoveredIndex === index ? "scale-105 shadow-2xl" : "scale-100"
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={image.src}
              alt={`Slide ${index + 1}`}
              className={`w-full h-64 object-cover transition-transform duration-700 ${
                hoveredIndex === index ? "scale-110" : "scale-100"
              }`}
              draggable={false}
            />
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-transparent to-transparent p-4 text-white font-semibold text-center">
              {image.description}
            </div>
          </div>
        ))}
      </div>

      {/* Button Prev */}
      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-transform hover:scale-110"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Button Next */}
      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-transform hover:scale-110"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ImageSlider;
