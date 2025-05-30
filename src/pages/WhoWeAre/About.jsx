import React, { useEffect, useState } from 'react';

const API_BASE_URL = 'https://backend-donatebank.vercel.app/v1/content/aboutus';

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
    <section className="bg-emerald-50 py-16 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-emerald-800 text-center mb-12">
          Tentang Kami
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {data.length === 0 ? (
            <p className="col-span-2 text-center text-gray-500">
              Tidak ada informasi saat ini.
            </p>
          ) : (
            data.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
              >
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.nama}
                    className="w-full h-64 object-cover rounded-xl mb-6"
                  />
                )}
                <h3 className="text-2xl font-semibold text-emerald-700 mb-2">
                  {item.nama}
                </h3>
                <p className="text-gray-700 leading-relaxed">{item.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
