import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoCMS from "../assets/images/logoCMS.jpg";

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [showDonateForm, setShowDonateForm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const openDonateForm = () => setShowDonateForm(true);
  const closeDonateForm = () => setShowDonateForm(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fungsi untuk deteksi device mobile
  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
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
        // Untuk mobile, gunakan pendekatan yang lebih robust
        if (isMobileDevice()) {
          // Tutup modal dulu untuk menghindari konflik
          setShowDonateForm(false);
          
          // Tunggu sebentar untuk memastikan modal tertutup
          setTimeout(() => {
            // Untuk mobile, buka di tab yang sama
            window.location.href = redirectUrl;
          }, 300);
        } else {
          // Untuk desktop, bisa menggunakan window.open jika diinginkan
          window.location.href = redirectUrl;
        }
      } else {
        alert("Redirect URL tidak tersedia");
      }
    } catch (error) {
      console.error("Error detail:", error);
      alert("Error saat membuat transaksi: " + error.message);
    } finally {
      setLoading(false);
      // Reset form data
      setFormData({ nama: "", email: "", notes: "", amount: "" });
    }
  };

  return (
    <>
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black bg-opacity-90 py-2 shadow-lg"
            : "bg-black bg-opacity-70 py-3 md:py-4"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={logoCMS} alt="YMP Logo" className="h-10 sm:h-12 md:h-14 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-4 xl:space-x-6 text-white font-medium">
            {["who", "what", "moving"].map((menu) => (
              <div key={menu} className="relative group">
                <button
                  onClick={() => toggleDropdown(menu)}
                  className="flex items-center gap-1 hover:text-blue-400 transition-colors text-sm xl:text-base px-2 py-1"
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
                    className="absolute top-full left-0 mt-2 w-48 rounded-lg shadow-lg bg-blue-900 z-50"
                    role="menu"
                  >
                    {menu === "who" && (
                      <>
                        <Link to="/about" className="block px-4 py-2 text-sm hover:bg-blue-700" role="menuitem">
                          About YMP
                        </Link>
                        <Link to="/contact" className="block px-4 py-2 text-sm hover:bg-blue-700" role="menuitem">
                          Contact
                        </Link>
                        <Link to="/" className="block px-4 py-2 text-sm hover:bg-blue-700" role="menuitem">
                          Home
                        </Link>
                      </>
                    )}

                    {menu === "what" && (
                      <>
                        <Link to="/program" className="block px-4 py-2 text-sm hover:bg-blue-700" role="menuitem">
                          Program
                        </Link>
                        <Link to="/focusareas" className="block px-4 py-2 text-sm hover:bg-blue-700" role="menuitem">
                          FocusAreas
                        </Link>
                      </>
                    )}

                    {menu === "moving" && (
                      <>
                        <Link to="/getinvolved" className="block px-4 py-2 text-sm hover:bg-blue-700" role="menuitem">
                          Get Involved
                        </Link>
                        <Link to="/faqs" className="block px-4 py-2 text-sm hover:bg-blue-700" role="menuitem">
                          FAQs
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Desktop Donate Button */}
            <button
              onClick={openDonateForm}
              className="ml-2 xl:ml-4 px-3 xl:px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold shadow-lg hover:brightness-110 transition text-sm xl:text-base"
            >
              Donate Now
            </button>
          </nav>

          {/* Mobile/Tablet Menu Button and Donate */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={openDonateForm}
              className="px-3 py-2 text-xs sm:text-sm rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold shadow-lg hover:brightness-110 transition"
            >
              Donate
            </button>
            <button 
              className="text-white p-1" 
              aria-label="Open menu"
              onClick={toggleMobileMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 sm:h-7 sm:w-7"
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
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-black bg-opacity-95 border-t border-gray-700">
            <div className="container mx-auto px-4 py-4">
              <nav className="space-y-4">
                {["who", "what", "moving"].map((menu) => (
                  <div key={menu}>
                    <button
                      onClick={() => toggleDropdown(menu)}
                      className="flex items-center justify-between w-full text-white hover:text-blue-400 transition-colors py-2"
                    >
                      <span>
                        {menu === "who" && "Who We Are"}
                        {menu === "what" && "What We Do"}
                        {menu === "moving" && "Moving Together"}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 transition-transform ${activeDropdown === menu ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {activeDropdown === menu && (
                      <div className="ml-4 mt-2 space-y-2">
                        {menu === "who" && (
                          <>
                            <Link to="/about" className="block text-blue-200 hover:text-white py-1">About YMP</Link>
                            <Link to="/contact" className="block text-blue-200 hover:text-white py-1">Contact</Link>
                            <Link to="/" className="block text-blue-200 hover:text-white py-1">Home</Link>
                          </>
                        )}
                        {menu === "what" && (
                          <>
                            <Link to="/program" className="block text-blue-200 hover:text-white py-1">Program</Link>
                            <Link to="/campaign" className="block text-blue-200 hover:text-white py-1">Campaign</Link>
                          </>
                        )}
                        {menu === "moving" && (
                          <>
                            <Link to="/volunteers" className="block text-blue-200 hover:text-white py-1">Volunteers</Link>
                            <Link to="/donationinnature" className="block text-blue-200 hover:text-white py-1">Donation in Nature</Link>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Modal Donate Form - Optimized for Mobile */}
      {showDonateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-sm sm:max-w-md mx-4 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeDonateForm}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-xl z-10"
              aria-label="Close"
              type="button"
            >
              &times;
            </button>
            <h2 className="text-lg sm:text-xl font-semibold mb-4 pr-8">Donate Now</h2>
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
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  disabled={loading}
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
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="notes">
                  Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none resize-none"
                  rows={3}
                  disabled={loading}
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
                  min="1000"
                  step="1000"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  placeholder="Minimum 1000"
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
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