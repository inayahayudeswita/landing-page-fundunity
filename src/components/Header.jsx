import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LogoFix from "../assets/images/LogoFix.png";

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
      const response = await fetch(
        "https://backendd-fundunity.vercel.app/v1/content/transaction",
        {
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
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert("Gagal membuat transaksi: " + (data.error || "Error tidak diketahui"));
        setLoading(false);
        return;
      }

      const { redirectUrl } = data;

      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        alert("URL pengalihan tidak tersedia");
      }
    } catch (error) {
      alert("Terjadi kesalahan saat membuat transaksi: " + error.message);
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
            : "bg-black bg-opacity-70 py-3 md:py-4"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={LogoFix} alt="Logo" className="h-12 sm:h-12 md:h-20 w-auto" />
          </Link>

          {/* Navigasi Desktop */}
          <nav className="hidden lg:flex space-x-4 xl:space-x-6 text-white font-medium">
            {["who", "what", "moving"].map((menu) => (
              <div key={menu} className="relative group">
                <button
                  onClick={() => toggleDropdown(menu)}
                  className="flex items-center gap-1 hover:text-blue-400 transition-colors text-sm xl:text-base px-2 py-1"
                  aria-expanded={activeDropdown === menu}
                >
                  {menu === "who" && "Siapa Kami"}
                  {menu === "what" && "Apa Yang Kami Lakukan"}
                  {menu === "moving" && "Bersama Bergerak"}
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
                  <div
                    className="absolute top-full left-0 mt-2 w-48 rounded-lg shadow-lg bg-blue-900 z-50"
                    role="menu"
                  >
                    {menu === "who" && (
                      <>
                        <Link
                          to="/about"
                          className="block px-4 py-2 text-sm hover:bg-blue-700"
                          role="menuitem"
                        >
                          Tentang KRB
                        </Link>
                        <Link
                          to="/contact"
                          className="block px-4 py-2 text-sm hover:bg-blue-700"
                          role="menuitem"
                        >
                          Kontak
                        </Link>
                        <Link
                          to="/"
                          className="block px-4 py-2 text-sm hover:bg-blue-700"
                          role="menuitem"
                        >
                          Beranda
                        </Link>
                      </>
                    )}

                    {menu === "what" && (
                      <>
                        <Link
                          to="/allprograms"
                          className="block px-4 py-2 text-sm hover:bg-blue-700"
                          role="menuitem"
                        >
                          Program
                        </Link>
                        <Link
                          to="/focusareas"
                          className="block px-4 py-2 text-sm hover:bg-blue-700"
                          role="menuitem"
                        >
                          Fokus Area
                        </Link>
                        <Link
                          to="/moregallery"
                          className="block px-4 py-2 text-sm hover:bg-blue-700"
                          role="menuitem"
                        >
                          Galeri Lainnya
                        </Link>
                      </>
                    )}

                    {menu === "moving" && (
                      <>
                        <Link
                          to="/getinvolved"
                          className="block px-4 py-2 text-sm hover:bg-blue-700"
                          role="menuitem"
                        >
                          Terlibat
                        </Link>
                        <Link
                          to="/faqs"
                          className="block px-4 py-2 text-sm hover:bg-blue-700"
                          role="menuitem"
                        >
                          FAQ
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Tombol Donate Desktop */}
            <button
              onClick={openDonateForm}
              className="ml-2 xl:ml-4 px-3 xl:px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold shadow-lg hover:brightness-110 transition text-sm xl:text-base"
            >
              Donasi Sekarang
            </button>
          </nav>

          {/* Tombol Mobile & Donate */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={openDonateForm}
              className="px-3 py-2 text-xs sm:text-sm rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold shadow-lg hover:brightness-110 transition"
            >
              Donasi
            </button>
            <button
              className="text-white p-1"
              aria-label="Buka menu"
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

        {/* Menu Mobile */}
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
                        {menu === "who" && "Siapa Kami"}
                        {menu === "what" && "Apa Yang Kami Lakukan"}
                        {menu === "moving" && "Bergerak Bersama"}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 transition-transform ${
                          activeDropdown === menu ? "rotate-180" : ""
                        }`}
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
                            <Link to="/about" className="block text-blue-200 hover:text-white py-1">
                              Tentang KRB
                            </Link>
                            <Link to="/contact" className="block text-blue-200 hover:text-white py-1">
                              Kontak
                            </Link>
                            <Link to="/" className="block text-blue-200 hover:text-white py-1">
                              Beranda
                            </Link>
                          </>
                        )}
                        {menu === "what" && (
                          <>
                            <Link to="/program" className="block text-blue-200 hover:text-white py-1">
                              Program
                            </Link>
                            <Link to="/focusareas" className="block text-blue-200 hover:text-white py-1">
                              Fokus Area
                            </Link>
                            <Link to="/moregallery" className="block text-blue-200 hover:text-white py-1">
                              Galeri Lainnya
                            </Link>
                          </>
                        )}
                        {menu === "moving" && (
                          <>
                            <Link to="/getinvolved" className="block text-blue-200 hover:text-white py-1">
                              Terlibat
                            </Link>
                            <Link to="/faqs" className="block text-blue-200 hover:text-white py-1">
                              FAQ
                            </Link>
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

      {/* Modal Form Donasi */}
      {showDonateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className="bg-white rounded-xl max-w-md w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tombol Tutup */}
            <button
              onClick={closeDonateForm}
              className="absolute top-3 sm:top-4 right-3 sm:right-4 text-gray-600 hover:text-gray-900 font-bold text-xl sm:text-2xl"
              aria-label="Tutup modal"
            >
              &times;
            </button>

            {/* Judul */}
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-blue-700">
              Donasi Sekarang
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                name="nama"
                type="text"
                value={formData.nama}
                onChange={handleChange}
                placeholder="Nama Lengkap"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <input
                required
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Alamat Email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <input
                required
                name="amount"
                type="number"
                min="1"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Jumlah Donasi (IDR)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Tambahkan pesan atau catatan (opsional)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                rows={3}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg font-bold hover:brightness-110 transition text-sm"
              >
                {loading ? "Memproses..." : "Bayar Sekarang"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
