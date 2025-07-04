import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AllPrograms() {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const fetchAllPrograms = async () => {
      try {
        const res = await fetch("https://backendd-fundunity.vercel.app/v1/content/program");
        const data = await res.json();
        setPrograms(data);
      } catch (error) {
        console.error("Error loading all programs:", error);
      }
    };
    fetchAllPrograms();
  }, []);

  return (
    <section className="min-h-screen py-20 px-6 bg-blue-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-16">Semua Program</h1>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          {programs.map((program) => (
            <div key={program.id} className="bg-white rounded-lg border border-blue-200 shadow hover:shadow-xl transition duration-300">
              {program.imageUrl ? (
                <img src={program.imageUrl} alt={program.title} className="h-48 w-full object-cover rounded-t-lg" />
              ) : (
                <div className="h-48 flex items-center justify-center text-red-600 bg-red-100 rounded-t-lg">
                  <p>No Image</p>
                </div>
              )}
              <div className="p-5">
                <h2 className="text-xl font-semibold text-blue-700 mb-3">{program.title}</h2>
                <p className="text-gray-600 mb-4 text-sm">
                  {program.description?.length > 80 ? program.description.slice(0, 80) + "..." : program.description}
                </p>
                <Link
                  to={`/program/${program.id}`}
                  className="text-blue-600 font-medium underline hover:text-blue-800"
                >
                  Lihat Detail →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/" className="text-blue-700 underline font-semibold hover:text-blue-900">
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AllPrograms;
