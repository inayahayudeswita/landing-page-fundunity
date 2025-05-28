import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaCameraRetro } from "react-icons/fa";
import video1 from "../assets/images/video1.mp4";
import img1 from "../assets/images/image1.jpg";
import img2 from "../assets/images/image2.jpg";
import img3 from "../assets/images/image3.jpg";

const colors = {
  primary: "#1a73e8",
  secondary: "#4285f4",
  accent: "#34a853",
  dark: "#1a237e",
  lightText: "#5f6368",
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
            Discover the stories behind our mission. Watch impactful videos and see the powerful images that tell stories of change.
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
              poster={img1}
              preload="metadata"
            >
              <source src={video1} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="p-6 text-center">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-white bg-gradient-to-r from-blue-600 to-green-500 px-6 py-3 rounded-full font-semibold shadow-lg hover:brightness-110 transition"
              >
                Watch More Videos <FaArrowRight />
              </Link>
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
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-full font-bold shadow-lg hover:bg-gray-100 transition"
            >
              View Full Gallery <FaArrowRight />
            </Link>
          </motion.div>

          {/* Image Gallery */}
          <motion.div
            className="grid grid-cols-3 gap-4"
            variants={itemVariants}
          >
            {[img1, img2, img3].map((img, i) => (
              <motion.div
                key={i}
                className="rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-110 transition duration-500"
              >
                <img
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Gallery;
