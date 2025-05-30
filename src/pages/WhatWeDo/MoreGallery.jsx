import React, { useState, useEffect } from "react";

const API_URL = "https://backend-donatebank.vercel.app/v1/content/imageslider";

const MoreGallery = () => {
  const [images, setImages] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch images");
        return res.json();
      })
      .then((data) => {
        setImages(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-gray-700">Loading images...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600 font-semibold">Error: {error}</p>
      </div>
    );

  if (!images.length)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 font-semibold">No images found</p>
      </div>
    );

  return (
    <section className="bg-gradient-to-tr from-blue-100 via-gray-100 to-green-100 py-20 px-6 min-h-screen">
      {/* Header Text */}
      <div className="max-w-4xl mx-auto text-center mb-14">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-teal-400 to-green-500 tracking-wide drop-shadow-sm select-none">
          Explore Our Gallery
        </h1>
        <p className="mt-5 text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Discover inspiring moments captured in our gallery. Every image tells a story of hope, community, and change.
        </p>
      </div>

      {/* Image Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {images.map(({ id, imageUrl, title, description }) => (
          <div
            key={id}
            className={`relative rounded-xl overflow-hidden shadow-lg bg-white cursor-pointer transition-transform duration-500 ${
              hoveredId === id ? "scale-105 shadow-2xl" : ""
            }`}
            onMouseEnter={() => setHoveredId(id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <img
              src={imageUrl}
              alt={title || "Gallery image"}
              className={`w-full h-72 object-cover transition-transform duration-500 ${
                hoveredId === id ? "scale-110" : "scale-100"
              }`}
              draggable={false}
              loading="lazy"
            />
            <div className="p-5 bg-gradient-to-r from-blue-400 via-teal-300 to-green-400 text-white font-semibold text-center tracking-wide">
              <h3 className="text-xl">{title}</h3>
              {description && (
                <p className="mt-1 text-sm font-normal opacity-90">{description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MoreGallery;
