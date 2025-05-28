import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/images/hero6.jpg";
import colors from "../utils/colors";

export default function Hero() {
  const [showDonateForm, setShowDonateForm] = useState(false);
  const navigate = useNavigate();

  const toggleDonateForm = () => setShowDonateForm((v) => !v);

  return (
    <>
      <section
        className="relative h-screen flex items-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.3)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-6 z-10 max-w-3xl">
          <h1
            className="text-5xl font-extrabold leading-tight text-white drop-shadow-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Together, Creating Change with YukMariProject
          </h1>
          <p className="mt-6 text-lg text-blue-100 max-w-lg drop-shadow">
            Join us in making a meaningful impact for those in need and building
            a better future.
          </p>
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => navigate("/gallery")}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold rounded-lg shadow-lg hover:brightness-110 transition transform hover:scale-105"
            >
              Let's Get Moving
            </button>
            <button
              onClick={toggleDonateForm}
              className="px-8 py-4 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition transform hover:scale-105"
            >
              Donate Now
            </button>
          </div>
        </div>
      </section>

      {/* Donate Modal */}
      {showDonateForm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={toggleDonateForm}
        >
          <div
            className="bg-white rounded-xl max-w-md w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
              Donate Now
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Donation submitted! Thank you!");
                setShowDonateForm(false);
              }}
            >
              <input
                required
                name="name"
                type="text"
                placeholder="Full Name"
                className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                required
                name="email"
                type="email"
                placeholder="Email Address"
                pattern="[a-zA-Z0-9._%+-]+@gmail\.com"
                title="Please enter a valid Gmail address"
                className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                required
                name="amount"
                type="number"
                placeholder="Donation Amount (IDR)"
                min={1000}
                className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <textarea
                name="message"
                rows={4}
                placeholder="Add a message or description (optional)"
                className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg font-bold hover:brightness-110 transition"
              >
                Complete Donation
              </button>
            </form>
            <button
              onClick={toggleDonateForm}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 font-bold text-2xl"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
}
