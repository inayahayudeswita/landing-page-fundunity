import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoCMS from "../assets/images/logoCMS.jpg";

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [showDonateForm, setShowDonateForm] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    notes: "",
    amount: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleDropdown = (menu) =>
    setActiveDropdown(activeDropdown === menu ? null : menu);

  const openDonateForm = () => setShowDonateForm(true);
  const closeDonateForm = () => setShowDonateForm(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/v1/content/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama: formData.nama,
          email: formData.email,
          amount: Number(formData.amount),
          notes: formData.notes,
        }),
      });

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
      setFormData({ nama: "", email: "", notes: "", amount: "" });
    }
  };

  return (
    <>
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black bg-opacity-90 py-2 shadow-lg"
            : "bg-black bg-opacity-70 py-4"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <img src={logoCMS} alt="YMP Logo" className="h-14 w-auto" />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6 text-white font-medium">
            {["who", "what", "moving"].map((menu) => (
              <div key={menu} className="relative group">
                <button
                  onClick={() => toggleDropdown(menu)}
                  className="flex items-center gap-1 hover:text-blue-400 transition-colors"
                  aria-expanded={activeDropdown === menu}
                >
                  {menu === "who" && "Who We Are"}
                  {menu === "what" && "What We Do"}
                  {menu === "moving" && "Moving Together"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {activeDropdown === menu && (
                  <div
                    className="absolute top-full left-0 mt-2 w-48 rounded-lg shadow-lg bg-blue-900"
                    role="menu"
                  >
                    {menu === "who" && (
                      <>
                        <Link
                          to="/about"
                          className="block px-4 py-2 hover:bg-blue-700"
                          role="menuitem"
                        >
                          About YMP
                        </Link>
                        <Link
                          to="/contact"
                          className="block px-4 py-2 hover:bg-blue-700"
                          role="menuitem"
                        >
                          Contact
                        </Link>
                        <Link
                          to="/"
                          className="block px-4 py-2 hover:bg-blue-700"
                          role="menuitem"
                        >
                          Home
                        </Link>
                      </>
                    )}

                    {menu === "what" && (
                      <>
                        <Link
                          to="/program"
                          className="block px-4 py-2 hover:bg-blue-700"
                          role="menuitem"
                        >
                          Program
                        </Link>
                        <Link
                          to="/campaign"
                          className="block px-4 py-2 hover:bg-blue-700"
                          role="menuitem"
                        >
                          Campaign
                        </Link>
                      </>
                    )}

                    {menu === "moving" && (
                      <>
                        <Link
                          to="/volunteers"
                          className="block px-4 py-2 hover:bg-blue-700"
                          role="menuitem"
                        >
                          Volunteers
                        </Link>
                        <Link
                          to="/donationinnature"
                          className="block px-4 py-2 hover:bg-blue-700"
                          role="menuitem"
                        >
                          Donation in Nature
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Donate Button */}
            <button
              onClick={openDonateForm}
              className="ml-4 px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold shadow-lg hover:brightness-110 transition"
            >
              Donate Now
            </button>
          </nav>

          {/* Mobile Hamburger */}
          <button className="md:hidden text-white" aria-label="Open menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Modal Donate Form */}
      {showDonateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 relative">
            <button
              onClick={closeDonateForm}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-xl"
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">Donate Now</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="nama">
                  Nama
                </label>
                <input
                  id="nama"
                  name="nama"
                  type="text"
                  value={formData.nama}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="notes">
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="amount">
                  Amount (IDR)
                </label>
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  min="1"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
              >
                {loading ? "Processing..." : "Pay Now"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
