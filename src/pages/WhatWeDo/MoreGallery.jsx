import React, { useState, useEffect } from "react";
import { FaTimes, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const API_URL = "https://backendd-fundunity.vercel.app/v1/content/imageslider";

const MoreGallery = () => {
  const [gambar, setGambar] = useState([]);
  const [hoverId, setHoverId] = useState(null);
  const [gambarTerpilih, setGambarTerpilih] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
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

  const bukaModal = (index) => {
    setGambarTerpilih(gambar[index]);
    setCurrentIndex(index);
  };

  const navigasi = (arah) => {
    let next = currentIndex + arah;
    if (next < 0) next = gambar.length - 1;
    if (next >= gambar.length) next = 0;
    setCurrentIndex(next);
    setGambarTerpilih(gambar[next]);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <p className="text-lg font-semibold text-gray-400 animate-pulse">
          Memuat galeri...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <p className="text-red-500 font-semibold">Terjadi kesalahan: {error}</p>
      </div>
    );

  if (!gambar.length)
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <p className="text-gray-400 font-semibold">Belum ada gambar tersedia</p>
      </div>
    );

  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-950 to-black py-24 px-6 min-h-screen pt-28">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-extrabold text-white tracking-wide drop-shadow-lg select-none">
          Jelajahi Galeri Kami
        </h1>
        <p className="mt-5 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Temukan momen-momen inspiratif dari komunitas kami. Setiap gambar memiliki cerita yang patut dibagikan.
        </p>
      </div>

      {/* Grid Gambar */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {gambar.map(({ id, imageUrl, title, description }, index) => (
          <div
            key={id}
            className={`relative rounded-2xl overflow-hidden bg-gray-800 bg-opacity-30 backdrop-blur-lg shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out transform hover:scale-[1.04] group`}
            onMouseEnter={() => setHoverId(id)}
            onMouseLeave={() => setHoverId(null)}
            onClick={() => bukaModal(index)}
          >
            <img
              src={imageUrl}
              alt={title || "Gambar Galeri"}
              className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
              draggable={false}
              loading="lazy"
            />
            <div className="p-5 bg-black bg-opacity-40 backdrop-blur-sm text-white text-center">
              <h3 className="text-lg font-bold truncate">{title}</h3>
              {description && (
                <p className="mt-1 text-sm text-gray-300 line-clamp-2">{description}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Zoom */}
      {gambarTerpilih && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 backdrop-blur-md flex items-center justify-center z-50 transition-all duration-300"
          onClick={() => setGambarTerpilih(null)}
        >
          <div
            className="relative max-w-5xl w-full mx-4 bg-gray-900 rounded-xl shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-red-500 transition"
              onClick={() => setGambarTerpilih(null)}
              title="Tutup"
            >
              <FaTimes />
            </button>

            <img
              src={gambarTerpilih.imageUrl}
              alt={gambarTerpilih.title}
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />

            <p className="mt-4 text-center text-gray-200 text-lg font-semibold">
              {gambarTerpilih.title}
            </p>

            {/* Navigasi panah */}
            <button
              className="absolute top-1/2 left-4 -translate-y-1/2 bg-gray-800 bg-opacity-70 p-2 rounded-full text-white hover:bg-opacity-100 transition"
              onClick={() => navigasi(-1)}
              title="Sebelumnya"
            >
              <FaArrowLeft />
            </button>
            <button
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-gray-800 bg-opacity-70 p-2 rounded-full text-white hover:bg-opacity-100 transition"
              onClick={() => navigasi(1)}
              title="Selanjutnya"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default MoreGallery;
