import React, { useState, useEffect } from "react";

const API_URL = "https://backendd-fundunity.vercel.app/v1/content/imageslider";

const MoreGallery = () => {
  const [gambar, setGambar] = useState([]);
  const [hoverId, setHoverId] = useState(null);
  const [gambarTerpilih, setGambarTerpilih] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil gambar");
        return res.json();
      })
      .then((data) => {
        setGambar(data);
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
        <p className="text-lg font-semibold text-gray-700">Memuat gambar...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600 font-semibold">Terjadi kesalahan: {error}</p>
      </div>
    );

  if (!gambar.length)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 font-semibold">Belum ada gambar yang tersedia</p>
      </div>
    );

  return (
    <section className="bg-gradient-to-tr from-gray-800 via-gray-900 to-black py-24 px-6 min-h-screen pt-28">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-14">
        <h1 className="text-5xl font-extrabold text-gray-200 tracking-wide drop-shadow-lg select-none">
          Jelajahi Galeri Kami
        </h1>
        <p className="mt-5 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Temukan momen-momen inspiratif dalam galeri kami. Setiap gambar menyimpan kisah tentang harapan, komunitas, dan perubahan.
        </p>
      </div>

      {/* Grid Gambar */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {gambar.map(({ id, imageUrl, title, description }) => (
          <div
            key={id}
            className={`relative rounded-xl overflow-hidden shadow-lg bg-gray-800 cursor-pointer transition-transform duration-500 ${
              hoverId === id ? "scale-105 shadow-2xl" : ""
            }`}
            onMouseEnter={() => setHoverId(id)}
            onMouseLeave={() => setHoverId(null)}
            onClick={() => setGambarTerpilih({ imageUrl, title })}
          >
            <img
              src={imageUrl}
              alt={title || "Gambar Galeri"}
              className={`w-full h-72 object-cover transition-transform duration-500 ${
                hoverId === id ? "scale-110" : "scale-100"
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

      {/* Modal Zoom */}
      {gambarTerpilih && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setGambarTerpilih(null)}
        >
          <div className="relative max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-red-500 transition"
              onClick={() => setGambarTerpilih(null)}
            >
              &times;
            </button>
            <img
              src={gambarTerpilih.imageUrl}
              alt={gambarTerpilih.title}
              className="w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
            <p className="mt-4 text-center text-gray-200 text-lg">{gambarTerpilih.title}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default MoreGallery;
