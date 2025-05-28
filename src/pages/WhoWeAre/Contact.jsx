// File: src/pages/WhoWeAre/Contact.jsx
import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic untuk mengirim pesan kontak
    console.log('Form submitted:', formData);
    alert('Pesan Anda telah dikirim!');
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="container mx-auto px-8 py-16 mt-20">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <p className="mb-6">
            Kami senang mendengar dari Anda! Apakah Anda memiliki pertanyaan tentang program kami, 
            ingin menjadi volunteer, atau membutuhkan informasi lebih lanjut? Jangan ragu untuk menghubungi kami.
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-start">
              <div className="text-blue-600 mr-3">
                <i className="fas fa-map-marker-alt text-xl"></i>
              </div>
              <div>
                <h3 className="font-semibold">Alamat:</h3>
                <p>Jl. Pemuda No. 123, Jakarta Pusat 10110, Indonesia</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="text-blue-600 mr-3">
                <i className="fas fa-phone text-xl"></i>
              </div>
              <div>
                <h3 className="font-semibold">Telepon:</h3>
                <p>0821 - 1923 - 1293</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="text-blue-600 mr-3">
                <i className="fas fa-envelope text-xl"></i>
              </div>
              <div>
                <h3 className="font-semibold">Email:</h3>
                <p>info@youthmovement.org</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Jam Operasional:</h3>
            <p>Senin - Jumat: 09.00 - 17.00 WIB</p>
            <p>Sabtu: 09.00 - 13.00 WIB</p>
            <p>Minggu & Hari Libur: Tutup</p>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Kirim Pesan</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-1">Nama Lengkap</label>
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
            
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1">Email</label>
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
            
            <div className="mb-4">
              <label htmlFor="subject" className="block mb-1">Subjek</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="message" className="block mb-1">Pesan</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full p-2 border rounded-md"
                required
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
            >
              Kirim Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;