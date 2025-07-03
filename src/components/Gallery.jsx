import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";  
import { motion } from "framer-motion";
import { FaCameraRetro, FaArrowRight } from "react-icons/fa";  // <-- tambahin FaArrowRight
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://backendd-fundunity.vercel.app/v1/content/imageslider")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch images");
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
            Our Gallery Moments
          </h2>
          <div className="mx-auto mt-4 w-20 h-1 bg-gradient-to-r from-blue-500 via-green-400 to-yellow-400 rounded-full shadow-md"></div>
          <p className="text-gray-600 max-w-3xl mx-auto mt-6 text-lg leading-relaxed">
            Discover the stories behind our mission. Watch impactful videos and
            see the powerful images that tell stories of change.
          </p>
        </motion.header>

        {/* Content Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          variants={containerVariants}
        >
          {/* Video Card */}
          <motion.div
            className="bg-white shadow-xl rounded-2xl overflow-hidden transition-transform duration-500 hover:scale-105"
            variants={itemVariants}
          >
            <video
              controls
              className="w-full h-60 object-cover"
              poster={images[0]?.imageUrl || ""}
              preload="metadata"
            >
              <source src={video1} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="p-6 text-center">
              <p className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">
                Our Mission in Motion
              </p>
            </div>
          </motion.div>

          {/* Text Block */}
          <motion.div
            className="bg-gradient-to-br from-blue-700 to-green-600 text-white p-8 rounded-2xl shadow-2xl flex flex-col justify-center"
            variants={itemVariants}
          >
            <h3 className="text-3xl font-extrabold flex items-center gap-3 mb-4">
              <FaCameraRetro className="text-yellow-300 animate-pulse" />
              Our Impact Stories
            </h3>
            <p className="text-lg font-medium leading-relaxed mb-6">
              Our visual journey illustrates how small actions can create a big
              difference. These moments remind us why community matters.
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
              More Gallery <FaArrowRight />
            </NavLink>
          </motion.div>

          {/* Image Gallery */}
          <motion.div
            className="grid grid-cols-3 gap-4"
            variants={itemVariants}
          >
            {loading ? (
              <p className="col-span-3 text-center text-gray-500">
                Loading images...
              </p>
            ) : (
              images.map((img, i) => (
                <motion.div
                  key={img.id || i}
                  className="rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-110 transition duration-500"
                >
                  <img
                    src={img.imageUrl}
                    alt={img.title || `Gallery ${i + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              ))
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Gallery;
