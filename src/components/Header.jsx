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

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const res = await fetch("https://backendd-fundunity-production.up.railway.app/v1/content/transaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nama: formData.nama,
        email: formData.email,
        amount: Number(formData.amount),
        notes: formData.notes,
      }),
    });

    const data = await res.json();

    if (!res.ok || !data.snapToken) {
      alert("Transaksi gagal: " + (data.message || "Unknown error"));
      return;
    }

    // === GUNAKAN POPUP Snap ===
    window.snap.pay(data.snapToken, {
      onSuccess: (result) => {
        alert("Pembayaran berhasil!");
        console.log(result);
      },
      onPending: (result) => {
        alert("Menunggu pembayaran...");
        console.log(result);
      },
      onError: (error) => {
        alert("Terjadi kesalahan pembayaran!");
        console.error(error);
      },
      onClose: () => {
        alert("Popup ditutup tanpa menyelesaikan pembayaran.");
      },
    });

  } catch (err) {
    alert("Gagal terhubung ke server: " + err.message);
  } finally {
    setLoading(false);
    setShowDonateForm(false);
    setFormData({ nama: "", email: "", notes: "", amount: "" });
  }
};

  const desktopMenus = {
    who: [
      { label: "About YMP", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Home", to: "/" },
    ],
    what: [
      { label: "Program", to: "/program" },
      { label: "Focus Areas", to: "/focusareas" },
      { label: "More Gallery", to: "/moregallery" },
    ],
    moving: [
      { label: "Get Involved", to: "/getinvolved" },
      { label: "FAQs", to: "/faqs" },
    ],
  };

  const mobileMenus = {
    who: [
      { label: "About YMP", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Home", to: "/" },
    ],
    what: [
      { label: "Program", to: "/program" },
      { label: "Campaign", to: "/campaign" },
    ],
    moving: [
      { label: "Volunteers", to: "/volunteers" },
      { label: "Donation in Nature", to: "/donationinnature" },
    ],
  };

  return (
    <>
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-black bg-opacity-90 py-2 shadow-lg" : "bg-black bg-opacity-70 py-3 md:py-4"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
          <Link to="/" className="flex-shrink-0">
            <img src={logoCMS} alt="YMP Logo" className="h-10 sm:h-12 md:h-14 w-auto" />
          </Link>

          <nav className="hidden lg:flex space-x-4 xl:space-x-6 text-white font-medium">
            {Object.keys(desktopMenus).map((menu) => (
              <div key={menu} className="relative group">
                <button
                  onClick={() => toggleDropdown(menu)}
                  className="flex items-center gap-1 hover:text-blue-400 transition-colors text-sm xl:text-base px-2 py-1"
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {activeDropdown === menu && (
                  <div className="absolute top-full left-0 mt-2 w-48 rounded-lg shadow-lg bg-blue-900 z-50">
                    {desktopMenus[menu].map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="block px-4 py-2 text-sm hover:bg-blue-700"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={openDonateForm}
              className="ml-2 xl:ml-4 px-3 xl:px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold shadow-lg hover:brightness-110 transition text-sm xl:text-base"
            >
              Donate Now
            </button>
          </nav>

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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-black bg-opacity-95 border-t border-gray-700">
            <div className="container mx-auto px-4 py-4">
              <nav className="space-y-4">
                {Object.keys(mobileMenus).map((menu) => (
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
                        className={`h-4 w-4 transition-transform ${activeDropdown === menu ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {activeDropdown === menu && (
                      <div className="ml-4 mt-2 space-y-2">
                        {mobileMenus[menu].map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            className="block text-blue-200 hover:text-white py-1"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>

      {showDonateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-sm sm:max-w-md mx-4 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeDonateForm}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-xl"
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Donate Now</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="nama">Nama</label>
                <input
                  id="nama"
                  name="nama"
                  type="text"
                  value={formData.nama}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="notes">Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="amount">Amount (IDR)</label>
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  min="1"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition text-sm"
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