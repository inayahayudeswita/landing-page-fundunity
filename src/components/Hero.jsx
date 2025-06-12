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

  const navigate = useNavigate();

  const toggleDonateForm = () => setShowDonateForm((v) => !v);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      const result = await response.json();

      if (result.snapToken) {
        window.snap.pay(result.snapToken, {
          onSuccess: function (res) {
            console.log("Payment Success:", res);
            alert("Thank you! Donation successful.");
            setShowDonateForm(false);
          },
          onPending: function () {
            alert("Donation is pending. Please complete payment.");
          },
          onError: function (err) {
            console.error("Payment Error:", err);
            alert("Oops! Something went wrong.");
          },
          onClose: function () {
            console.log("Payment popup closed");
          },
        });
      } else {
        alert("Failed to get snapToken. Try again.");
      }
    } catch (error) {
      console.error("Transaction Error:", error);
      alert("Donation failed. Please try again.");
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg mb-6">
              Together, Creating Change with YukMariProject
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Join us in making a meaningful impact for those in need and building a better future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/gallery")}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:brightness-110 transition"
              >
                Let's Get Moving
              </button>
              <button
                onClick={toggleDonateForm}
                className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition"
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
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
              Donate Now
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                required
                name="name"
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg"
              />
              <input
                required
                name="email"
                type="email"
                placeholder="Email Address"
                pattern="[a-zA-Z0-9._%+-]+@gmail\.com"
                title="Please enter a valid Gmail address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg"
              />
              <input
                required
                name="amount"
                type="number"
                placeholder="Donation Amount (IDR)"
                min={1000}
                value={formData.amount}
                onChange={handleInputChange}
                className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg"
              />
              <textarea
                name="message"
                rows={4}
                placeholder="Add a message (optional)"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-lg resize-none"
              />
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:brightness-110"
              >
                Complete Donation
              </button>
            </form>
            <button
              onClick={toggleDonateForm}
              className="absolute top-3 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
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
