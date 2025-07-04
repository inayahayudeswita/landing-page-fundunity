import React, { useEffect, useState } from "react";

const API_URL = "https://backendd-fundunity.vercel.app/v1/content/ourpartner";

const PartnersPage = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const formatted = data.map(item => ({
          name: item.name,
          logo: item.imageUrl || ""
        }));

        setPartners(formatted);
      } catch (error) {
        console.error("Gagal memuat mitra:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 px-4 py-10 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-6">
          Mitra Kami
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Kami bekerja sama dengan mitra terbaik untuk menciptakan dampak positif.
        </p>

        {loading ? (
          <p className="text-center text-gray-500">Memuat daftar mitra...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center hover:shadow-xl transition"
              >
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-24 h-24 object-contain mb-4"
                  />
                ) : (
                  <div className="w-24 h-24 mb-4 flex items-center justify-center bg-gray-100 text-gray-400 border rounded-full">
                    Tidak Ada Gambar
                  </div>
                )}
                <h3 className="text-lg font-semibold text-gray-800 text-center">
                  {partner.name}
                </h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnersPage;
