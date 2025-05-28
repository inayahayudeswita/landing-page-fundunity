// File: src/pages/WhatWeDo/Campaign.jsx
import React from 'react';

function Campaign() {
  // Data kampanye untuk ditampilkan
  const campaigns = [
    {
      title: "Youth for Climate Action",
      description: "Kampanye nasional untuk meningkatkan kesadaran dan aksi nyata pemuda terhadap perubahan iklim.",
      status: "Aktif",
      period: "Januari - Desember 2025",
      target: "1 juta pemuda di seluruh Indonesia",
      progress: "65%"
    },
    {
      title: "Digital Literacy for All",
      description: "Kampanye untuk memastikan semua pemuda Indonesia memiliki akses ke pendidikan digital dasar.",
      status: "Aktif",
      period: "Maret 2024 - Maret 2025",
      target: "500 sekolah di daerah terpencil",
      progress: "70%"
    },
    {
      title: "Stop Bullying Movement",
      description: "Kampanye anti-perundungan di sekolah dan media sosial untuk menciptakan lingkungan yang aman bagi semua anak dan remaja.",
      status: "Persiapan",
      period: "April - Oktober 2025",
      target: "2000 sekolah di 34 provinsi",
      progress: "15%"
    }
  ];

  return (
    <div className="container mx-auto px-8 py-16 mt-20">
      <h1 className="text-3xl font-bold mb-6">Our Campaigns</h1>
      <p className="mb-8">
        YMP menjalankan berbagai kampanye untuk mempromosikan isu-isu penting yang mempengaruhi generasi muda.
        Kampanye kami bertujuan untuk meningkatkan kesadaran, mendorong partisipasi, dan menciptakan perubahan positif di masyarakat.
      </p>
      
      <div className="space-y-8">
        {campaigns.map((campaign, index) => (
          <div key={index} className="border rounded-lg overflow-hidden shadow-md">
            <div className="bg-blue-600 px-6 py-4">
              <h2 className="text-2xl font-semibold text-white">{campaign.title}</h2>
            </div>
            <div className="p-6">
              <p className="mb-6">{campaign.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700">Status:</h3>
                  <p className={campaign.status === "Aktif" ? "text-green-600 font-medium" : "text-yellow-600 font-medium"}>
                    {campaign.status}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700">Periode:</h3>
                  <p>{campaign.period}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700">Target:</h3>
                  <p>{campaign.target}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">Progress:</h3>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-blue-600 h-4 rounded-full" 
                    style={{ width: campaign.progress }}
                  ></div>
                </div>
                <p className="text-right mt-1">{campaign.progress}</p>
              </div>
              
              <div className="mt-6 flex">
                <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                  Detail Kampanye
                </button>
                <button className="ml-4 border border-blue-600 text-blue-600 py-2 px-4 rounded-md hover:bg-blue-50 transition-colors">
                  Berpartisipasi
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 bg-blue-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Usulkan Kampanye Baru</h2>
        <p className="mb-4">
          Apakah Anda memiliki ide untuk kampanye yang dapat membantu pemuda Indonesia? 
          Kami selalu terbuka untuk ide-ide baru dan kolaborasi. Bagikan ide Anda dengan kami!
        </p>
        <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors">
          Ajukan Ide Kampanye
        </button>
      </div>
    </div>
  );
}

export default Campaign;