import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/images/hero6.jpg";

export default function Hero() {
  const [showDonateForm, setShowDonateForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toggleDonateForm = () => setShowDonateForm((v) => !v);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "https://backendd-fundunity-production.up.railway.app/v1/content/transaction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nama: formData.name,
            email: formData.email,
            amount: Number(formData.amount),
            notes: formData.message,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert("Gagal membuat transaksi: " + (data.error || "Unknown error"));
        setLoading(false);
        return;
      }

      const { redirectUrl } = data;
      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        alert("Redirect URL tidak tersedia");
      }
    } catch (error) {
      alert("Error saat membuat transaksi: " + error.message);
    } finally {
      setLoading(false);
      setShowDonateForm(false);
      setFormData({
        name: "",
        email: "",
        amount: "",
        message: "",
      });
    }
  };

  return (
    <>
      <section
        className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.3)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto z-10 max-w-7xl">
          <div className="max-w-4xl">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white drop-shadow-lg mb-4 sm:mb-6"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Together, Creating Change with YukMariProject
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl drop-shadow mb-6 sm:mb-8 leading-relaxed">
              Join us in making a meaningful impact for those in need and building
              a better future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <button
                onClick={() => navigate("/gallery")}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold rounded-lg shadow-lg hover:brightness-110 transition transform hover:scale-105 text-sm sm:text-base"
              >
                Let's Get Moving
              </button>
              <button
                onClick={toggleDonateForm}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition transform hover:scale-105 text-sm sm:text-base"
              >
                Donate Now
              </button>
            </div>
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
            className="bg-white rounded-xl max-w-md w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-blue-700">
              Donate Now
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                required
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full mb-4 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base"
              />
              <input
                required
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                pattern="[a-zA-Z0-9._%+-]+@gmail\.com"
                title="Please enter a valid Gmail address"
                placeholder="Email Address"
                className="w-full mb-4 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base"
              />
              <input
                required
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Donation Amount (IDR)"
                min={1}
                className="w-full mb-4 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Add a message or description (optional)"
                className="w-full mb-6 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base resize-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg font-bold hover:brightness-110 transition text-sm sm:text-base"
              >
                {loading ? "Processing..." : "Complete Donation"}
              </button>
            </form>
            <button
              onClick={toggleDonateForm}
              className="absolute top-3 sm:top-4 right-3 sm:right-4 text-gray-600 hover:text-gray-900 font-bold text-xl sm:text-2xl"
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
