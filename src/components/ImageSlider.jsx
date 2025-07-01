import React, { useRef, useState, useEffect } from "react";

const BASE_URL =  "https://backendd-fundunity.vercel.app";

const ImageSlider = () => {
  const [images, setImages] = useState([]);
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
    const fetchImages = async () => {
      try {
        const response = await fetch(`${BASE_URL}/v1/content/imageslider`);
        if (!response.ok) throw new Error("Failed to fetch images");
        const data = await response.json();

        // Map data dengan sesuaikan ke imageUrl
        const formatted = data.map(item => ({
          src: item.imageUrl.startsWith("http") 
            ? item.imageUrl 
            : `${BASE_URL}${item.imageUrl}`,
          description: item.description || "No description",
        }));

        setImages(formatted);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

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
  }, [images]);

  return (
    <div className="relative w-full max-w-6xl mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Image Slider</h2>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto scroll-smooth gap-6 px-4"
      >
        {images.length === 0 ? (
          <p className="text-center w-full">Loading images...</p>
        ) : (
          images.map((image, index) => (
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
          ))
        )}
      </div>

      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-transform hover:scale-110"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-transform hover:scale-110"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ImageSlider;
