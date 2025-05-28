// File: src/pages/WhoWeAre/Partner.jsx
import React from 'react';

function Partner() {
  // Data partner untuk ditampilkan
  const partners = [
    { name: "Pemerintah Kota Jakarta", logo: "logo-pemkot.jpg", description: "Mendukung program pemberdayaan pemuda dalam kegiatan sosial." },
    { name: "PT Maju Bersama", logo: "logo-mb.jpg", description: "Sponsor utama untuk program pelatihan kepemimpinan." },
    { name: "Universitas Indonesia", logo: "logo-ui.jpg", description: "Menyediakan mentor dan fasilitas untuk program pendidikan." },
    { name: "Yayasan Peduli", logo: "logo-yp.jpg", description: "Berkolaborasi dalam program penggalangan dana untuk pendidikan." },
    { name: "Global Youth Network", logo: "logo-gyn.jpg", description: "Partner internasional untuk program pertukaran pemuda." },
  ];

  return (
    <div className="container mx-auto px-8 py-16 mt-20">
      <h1 className="text-3xl font-bold mb-6">Our Partners</h1>
      <p className="mb-8">
        YMP berkolaborasi dengan berbagai organisasi dan perusahaan untuk memperluas jangkauan dan dampak program kami. 
        Kami berterima kasih atas dukungan yang diberikan oleh partner-partner kami berikut ini:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner, index) => (
          <div key={index} className="border rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full mr-4">
                {/* Placeholder untuk logo partner */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">Logo</div>
              </div>
              <h3 className="text-xl font-semibold">{partner.name}</h3>
            </div>
            <p className="text-gray-600">{partner.description}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-12 bg-blue-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Menjadi Partner Kami</h2>
        <p className="mb-4">
          Kami selalu terbuka untuk kolaborasi dengan organisasi yang memiliki visi serupa untuk pemberdayaan generasi muda.
          Jika organisasi Anda tertarik untuk bermitra dengan YMP, silakan hubungi kami melalui formulir di bawah ini.
        </p>
        <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors">
          Hubungi Kami
        </button>
      </div>
    </div>
  );
}

export default Partner;
