import React, { useState } from "react";

function DonationInNature() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    donationType: "",
    quantity: "",
    message: ""
  });

  const donationOptions = [
    "Bibit Pohon", "Pupuk Organik", "Air Bersih", "Bahan Makanan Sehat",
    "Alat Pertanian", "Obat-obatan Herbal", "Lainnya"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Donation data submitted:", formData);
    alert("Terima kasih atas donasi Anda! Kami akan segera menghubungi Anda.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      donationType: "",
      quantity: "",
      message: ""
    });
  };

  return (
    <div className="container mx-auto px-8 py-16 mt-20">
      <h1 className="text-3xl font-bold mb-6">Donasi dalam Bentuk Alam</h1>
      <p className="mb-6 text-gray-700">Bantu kami menjaga lingkungan dengan mendonasikan barang-barang alami atau sumber daya yang dapat membantu komunitas.</p>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="name" className="block mb-1">Nama Lengkap *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block mb-1">Nomor Telepon *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="donationType" className="block mb-1">Jenis Donasi *</label>
            <select
              id="donationType"
              name="donationType"
              value={formData.donationType}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">-- Pilih Jenis Donasi --</option>
              {donationOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="quantity" className="block mb-1">Jumlah / Spesifikasi *</label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block mb-1">Pesan Tambahan</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 border rounded-md"
          ></textarea>
        </div>
        
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition-colors"
        >
          Kirim Donasi
        </button>
      </form>
    </div>
  );
}

export default DonationInNature;
