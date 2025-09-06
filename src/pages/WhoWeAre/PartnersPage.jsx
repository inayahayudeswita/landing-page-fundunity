import React, { useEffect, useState } from "react";

const API_URL = "https://backendd-fundunity.onrender.com/v1/content/ourpartner";

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
    <section className="bg-blue-50 pt-28 pb-20 px-6 sm:px-10 min-h-screen font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-blue-800 mb-6">
          Mitra Kami
        </h1>
        <p className="text-center text-gray-600 text-lg mb-12">
          Kami bekerja sama dengan mitra terbaik untuk menciptakan dampak positif.
        </p>

        {loading ? (
          <p className="text-center text-gray-500 text-lg animate-pulse">
            Memuat daftar mitra...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center p-6"
              >
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-24 h-24 object-contain mb-4"
                  />
                ) : (
                  <div className="w-24 h-24 flex items-center justify-center mb-4 bg-gray-100 text-gray-400 border rounded-full">
                    Tidak Ada Gambar
                  </div>
                )}
                <h3 className="text-lg font-semibold text-gray-800">
                  {partner.name}
                </h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PartnersPage;
