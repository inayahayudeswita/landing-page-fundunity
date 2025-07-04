import React, { useEffect, useState } from 'react';

const API_BASE_URL = 'https://backendd-fundunity.vercel.app/v1/content/aboutus';

const AboutUs = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        const response = await fetch(API_BASE_URL);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Gagal memuat data Tentang Kami:', error);
      }
    };

    fetchAboutUs();
  }, []);

  return (
    <section className="bg-gradient-to-b from-emerald-50 to-white pt-28 pb-20 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-emerald-800 text-center mb-16 drop-shadow-sm">
          Tentang Kami
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {data.length === 0 ? (
            <p className="col-span-3 text-center text-gray-500 text-lg">
              Tidak ada informasi saat ini.
            </p>
          ) : (
            data.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
              >
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.nama}
                    className="w-full h-56 object-cover"
                  />
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-emerald-700 mb-2">
                    {item.nama}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed flex-grow">
                    {item.description}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
