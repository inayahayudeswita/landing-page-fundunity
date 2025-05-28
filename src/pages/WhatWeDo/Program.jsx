import React from 'react';
import { Link } from 'react-router-dom';

function Program() {
  const programs = [
    {
      title: "Leadership Academy",
      description: "Program pelatihan kepemimpinan intensif selama 3 bulan untuk pemuda usia 18-25 tahun.",
      schedule: "Maret - Mei & Agustus - Oktober",
      participants: "30 orang per batch",
    },
    {
      title: "Digital Literacy",
      description: "Pelatihan keterampilan digital dasar hingga lanjutan untuk pemuda dari daerah terpencil.",
      schedule: "Setiap bulan, kelas mingguan",
      participants: "20 orang per kelas",
    },
    {
      title: "Environmental Awareness",
      description: "Program edukasi dan aksi nyata untuk penyelamatan lingkungan, termasuk penanaman pohon dan pembersihan pantai.",
      schedule: "Februari, Juni, Oktober",
      participants: "Tidak terbatas",
    },
    {
      title: "Career Preparation",
      description: "Workshop persiapan karir termasuk pembuatan CV, teknik wawancara, dan pengembangan soft skills.",
      schedule: "April & September",
      participants: "50 orang per workshop",
    }
  ];

  return (
    <div className="container mx-auto px-8 py-16 mt-20">
      <h1 className="text-3xl font-bold mb-6">Our Programs</h1>
      <p className="mb-8">
        YMP menawarkan berbagai program yang dirancang untuk mengembangkan potensi pemuda Indonesia.
        Program-program kami berfokus pada pengembangan kepemimpinan, keterampilan digital, kesadaran lingkungan, dan persiapan karir.
      </p>
      
      <div className="space-y-12">
        {programs.map((program, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-2/3 p-6">
                <h2 className="text-2xl font-semibold mb-3">{program.title}</h2>
                <p className="mb-4">{program.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-700">Jadwal:</h3>
                    <p>{program.schedule}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Peserta:</h3>
                    <p>{program.participants}</p>
                  </div>
                </div>
                <div className="mt-6">
                  {/* Link for navigating to Program Details Page */}
                  <Link 
                    to={`/program/${program.title}`} 
                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Detail Program
                  </Link>
                  <button className="ml-4 border border-blue-600 text-blue-600 py-2 px-4 rounded-md hover:bg-blue-50 transition-colors">
                    Daftar Sekarang
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 bg-blue-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Program Khusus</h2>
        <p className="mb-4">
          Selain program reguler di atas, YMP juga menawarkan program khusus yang disesuaikan dengan kebutuhan komunitas atau organisasi tertentu.
          Jika Anda tertarik untuk mengadakan program khusus, silakan hubungi kami untuk diskusi lebih lanjut.
        </p>
        <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors">
          Tanya Program Khusus
        </button>
      </div>
    </div>
  );
}

export default Program;
