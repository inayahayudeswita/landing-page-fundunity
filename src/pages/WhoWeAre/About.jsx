import React, { useEffect, useState } from 'react';

const API_BASE_URL = 'https://backendd-fundunity.vercel.app/v1/content/aboutus';

const AboutUs = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        const response = await fetch(API_BASE_URL);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Gagal memuat data Tentang Kami:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutUs();
  }, []);

  return (
    <section className="bg-gradient-to-b from-emerald-50 to-white pt-28 pb-20 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-emerald-800 text-center mb-20 drop-shadow-md">
          Tentang Kami
        </h2>

        {loading ? (
          <p className="text-center text-emerald-600 text-lg animate-pulse">
            Memuat informasi...
          </p>
        ) : data.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            Tidak ada informasi saat ini.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {data.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {item.imageUrl && (
                  <div className="relative">
                    <img
                      src={item.imageUrl}
                      alt={item.nama}
                      className="w-full h-60 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-emerald-700 mb-3">
                    {item.nama}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed flex-grow">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutUs;
