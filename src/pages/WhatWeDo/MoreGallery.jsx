import React, { useState, useEffect } from "react";

const API_URL = "https://backendd-fundunity.vercel.app/v1/content/imageslider";

const MoreGallery = () => {
  const [images, setImages] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // ⬅️ For zoom
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
    <section className="bg-gradient-to-tr from-gray-800 via-gray-900 to-black py-20 px-6 min-h-screen">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-14">
        <h1 className="text-5xl font-extrabold text-gray-200 tracking-wide drop-shadow-lg select-none">
          Explore Our Gallery
        </h1>
        <p className="mt-5 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Discover inspiring moments captured in our gallery. Every image tells a story of hope, community, and change.
        </p>
      </div>

      {/* Image Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {images.map(({ id, imageUrl, title, description }) => (
          <div
            key={id}
            className={`relative rounded-xl overflow-hidden shadow-lg bg-gray-800 cursor-pointer transition-transform duration-500 ${
              hoveredId === id ? "scale-105 shadow-2xl" : ""
            }`}
            onMouseEnter={() => setHoveredId(id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => setSelectedImage({ imageUrl, title })} // ⬅️ Zoom trigger
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
            <div className="p-5 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-gray-200 font-semibold text-center tracking-wide">
              <h3 className="text-xl">{title}</h3>
              {description && (
                <p className="mt-1 text-sm font-normal opacity-80">{description}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Zoom Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)} // Close when clicking background
        >
          <div className="relative max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-red-500 transition"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.title}
              className="w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
            <p className="mt-4 text-center text-gray-200 text-lg">{selectedImage.title}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default MoreGallery;
