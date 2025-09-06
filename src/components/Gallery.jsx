import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCameraRetro, FaArrowRight } from "react-icons/fa";
import video1 from "../assets/images/video1.mp4";

const colors = {
  bgGradient: "linear-gradient(180deg, #e8f0fe 0%, #ffffff 100%)",
};

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://backendd-fundunity.onrender.com/v1/content/imageslider")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil gambar");
        return res.json();
      })
      .then((data) => {
        setImages(data.slice(0, 3));
        setLoading(false);
      })
      .catch(() => {
        setImages([]);
        setLoading(false);
      });
  }, []);

  return (
    <section
      className="py-24 px-6 md:px-12"
      style={{
        background: colors.bgGradient,
        minHeight: "100vh",
      }}
    >
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.header className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500 tracking-wide drop-shadow-md select-none">
            Galeri Momen Kami
          </h2>
          <div className="mx-auto mt-4 w-20 h-1 bg-gradient-to-r from-blue-500 via-green-400 to-yellow-400 rounded-full shadow-md"></div>
          <p className="text-gray-600 max-w-3xl mx-auto mt-6 text-lg leading-relaxed">
            Temukan cerita di balik misi kami. Saksikan video penuh makna dan lihat gambar-gambar yang menggambarkan perubahan nyata.
          </p>
        </motion.header>

        {/* Konten Utama */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          variants={containerVariants}
        >
          {/* Video */}
          <motion.div
  className="bg-white shadow-xl rounded-2xl overflow-hidden transition-transform duration-500 hover:scale-105"
  variants={itemVariants}
>
  <div className="relative w-full h-[400px]">
    <iframe
      width="100%"
      height="100%"
      src="https://www.youtube.com/embed/jKqTBpq_zfI?si=cWe0O6adm11kK5Tj"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      className="w-full h-full rounded-lg"
    />
  </div>
  <div className="p-6 text-center">
    <p className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-yellow-500">
      Misi Kami dalam Gerakan
    </p>
  </div>
</motion.div>


          {/* Teks Info */}
          <motion.div
            className="bg-gradient-to-br from-blue-700 to-green-600 text-white p-8 rounded-2xl shadow-2xl flex flex-col justify-center"
            variants={itemVariants}
          >
            <h3 className="text-3xl font-extrabold flex items-center gap-3 mb-4">
              <FaCameraRetro className="text-yellow-300 animate-pulse" />
              Cerita Dampak Kami
            </h3>
            <p className="text-lg font-medium leading-relaxed mb-6">
              Perjalanan visual kami menunjukkan bagaimana tindakan kecil dapat menciptakan perubahan besar. Momen-momen ini mengingatkan kita pentingnya komunitas.
            </p>
            <NavLink
              to="/moregallery"
              className={({ isActive }) =>
                `inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold shadow-lg transition ${
                  isActive
                    ? "bg-blue-700 text-white"
                    : "bg-white text-blue-700 hover:bg-gray-100"
                }`
              }
            >
              Lihat Galeri <FaArrowRight />
            </NavLink>
          </motion.div>

          {/* Galeri Gambar */}
          <motion.div
            className="grid grid-cols-3 gap-4"
            variants={itemVariants}
          >
            {loading ? (
              <p className="col-span-3 text-center text-gray-500">
                Memuat gambar...
              </p>
            ) : (
              images.map((img, i) => (
                <motion.div
                  key={img.id || i}
                  className="rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-110 transition duration-500 cursor-pointer"
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img.imageUrl}
                    alt={img.title || `Galeri ${i + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              ))
            )}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Modal Zoom */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
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

export default Gallery;
