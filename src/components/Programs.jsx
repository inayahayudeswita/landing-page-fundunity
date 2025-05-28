import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Programs() {
  const [programData, setProgramData] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch("https://backend-donatebank.vercel.app/v1/content/programs");
        const data = await res.json();
        setProgramData(data);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };
    fetchPrograms();
  }, []);

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-20 min-h-screen flex flex-col items-center px-6">
      <h2 className="text-center text-[#004f9f] font-extrabold text-4xl mb-16 max-w-4xl leading-tight drop-shadow-md">
        Melalui program-program yang bersinergi, <br /> Yuk Mari Project berusaha untuk menciptakan Indonesia yang bebas dari kelaparan.
      </h2>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl">
        {programData.map((program) => (
          <div
            key={program.id}
            className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-transform transform hover:-translate-y-2 duration-500 flex flex-col"
          >
            <div className="relative overflow-hidden h-48">
              {program.imageUrl ? (
                <img
                  src={program.imageUrl}
                  alt={`${program.title} Logo`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-red-600 bg-red-100">
                  <p className="text-center font-bold">No Image</p>
                </div>
              )}
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-[#004f9f] font-semibold text-2xl mb-3 tracking-wide">{program.title}</h3>
              <p className="text-gray-600 flex-grow mb-6 leading-relaxed">
                {program.description?.length > 100
                  ? `${program.description.slice(0, 100)}...`
                  : program.description}
              </p>
              <Link
                to={`/program/${program.id}`}
                className="self-start bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-8 rounded-full font-semibold shadow-lg hover:from-blue-700 hover:to-blue-900 transition-colors duration-300"
              >
                Detail
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14">
        <Link
          to="/program"
          className="inline-block bg-transparent border-2 border-blue-700 text-blue-700 font-semibold py-3 px-10 rounded-full hover:bg-blue-700 hover:text-white transition-colors duration-300 shadow-md"
        >
          Other Programs &gt;
        </Link>
      </div>
    </section>
  );
}

export default Programs;
