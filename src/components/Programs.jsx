import React from "react";
import image1 from "../assets/images/image1.jpg";
import image2 from "../assets/images/image2.jpg";
import image3 from "../assets/images/image3.jpg";

function Programs() {
  const programData = [
    {
      title: "Yuk Mari Project",
      description: "Striving to create independent food security at the community level.",
      logo: image1,
      isQurban: false,
    },
    {
      title: "Yuk Mari Project",
      description: "A joint movement by the community donate Indonesia.",
      logo: image2,
      isQurban: false,
    },
    {
      title: "Yuk Mari Project",
      description: "To Remote Areas is an annual program of Community Donate of Indonesia.",
      logo: image3,
      isQurban: false,
    },
  ];

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-20 min-h-screen flex flex-col items-center px-6">
      {/* Slogan */}
      <h2 className="text-center text-[#004f9f] font-extrabold text-4xl mb-16 max-w-4xl leading-tight drop-shadow-md">
        Melalui program-program yang bersinergi, <br /> Yuk Mari Project berusaha untuk menciptakan Indonesia yang bebas dari kelaparan.
      </h2>

      {/* Program Cards */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl">
        {programData.map((program, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-transform transform hover:-translate-y-2 duration-500 flex flex-col"
          >
            <div className="relative overflow-hidden h-48">
              {!program.isQurban ? (
                <img
                  src={program.logo || "/api/placeholder/150/150"}
                  alt={`${program.title} Logo`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              ) : (
                <h3 className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-red-700 bg-red-50">
                  Qurban hingga Pelosok
                </h3>
              )}
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-[#004f9f] font-semibold text-2xl mb-3 tracking-wide">{program.title}</h3>
              <p className="text-gray-600 flex-grow mb-6 leading-relaxed">{program.description}</p>

              <a
                href="#detail"
                className="self-start bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-8 rounded-full font-semibold shadow-lg hover:from-blue-700 hover:to-blue-900 transition-colors duration-300"
              >
                Detail
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Other Programs Button */}
      <div className="mt-14">
        <button className="bg-transparent border-2 border-blue-700 text-blue-700 font-semibold py-3 px-10 rounded-full hover:bg-blue-700 hover:text-white transition-colors duration-300 shadow-md">
          Other Programs &gt;
        </button>
      </div>
    </section>
  );
}

export default Programs;
