// File: src/pages/MovingTogether/Volunteers.jsx (lanjutan)
import React, { useState } from 'react';

function Volunteers() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    address: '',
    motivation: '',
    skills: [],
    availability: ''
  });

  // Daftar keterampilan yang dapat dipilih
  const skillOptions = [
    "Komunikasi", "Kepemimpinan", "Pengelolaan Acara", "Desain Grafis", 
    "Fotografi", "Videografi", "Penulisan", "Media Sosial", 
    "Pengajaran", "Analisis Data", "Pemrograman", "Fundraising"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSkillsChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        skills: [...formData.skills, value]
      });
    } else {
      setFormData({
        ...formData,
        skills: formData.skills.filter(skill => skill !== value)
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic untuk mengirim data pendaftaran volunteer
    console.log('Volunteer registration data:', formData);
    alert('Terima kasih! Data Anda telah terkirim. Kami akan menghubungi Anda segera.');
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      age: '',
      address: '',
      motivation: '',
      skills: [],
      availability: ''
    });
  };

  return (
    <div className="container mx-auto px-8 py-16 mt-20">
      <h1 className="text-3xl font-bold mb-6">Become a Volunteer</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-1">
          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Mengapa Menjadi Volunteer?</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Berkontribusi langsung dalam perubahan positif</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Mengembangkan keterampilan baru</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Memperluas jaringan profesional</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Pengalaman berharga untuk CV</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Bertemu dengan pemuda berpikiran serupa</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Area Volunteer</h2>
            <ul className="space-y-2">
              <li>Pendidikan & Pelatihan</li>
              <li>Kampanye Sosial & Lingkungan</li>
              <li>Penggalangan Dana</li>
              <li>Media & Komunikasi</li>
              <li>Manajemen Acara</li>
              <li>Penelitian & Dokumentasi</li>
            </ul>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Formulir Pendaftaran Volunteer</h2>
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="name" className="block mb-1">Nama Lengkap *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-1">Nomor Telepon *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="age" className="block mb-1">Usia *</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="15"
                  max="35"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="address" className="block mb-1">Alamat *</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="2"
                className="w-full p-2 border rounded-md"
                required
              ></textarea>
            </div>
            
            <div className="mb-4">
              <label htmlFor="motivation" className="block mb-1">Motivasi Menjadi Volunteer *</label>
              <textarea
                id="motivation"
                name="motivation"
                value={formData.motivation}
                onChange={handleChange}
                rows="3"
                className="w-full p-2 border rounded-md"
                required
              ></textarea>
            </div>
            
            <div className="mb-4">
              <label className="block mb-1">Keterampilan (pilih yang sesuai)</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {skillOptions.map((skill, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`skill-${index}`}
                      name="skills"
                      value={skill}
                      checked={formData.skills.includes(skill)}
                      onChange={handleSkillsChange}
                      className="mr-2"
                    />
                    <label htmlFor={`skill-${index}`}>{skill}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="availability" className="block mb-1">Ketersediaan Waktu *</label>
              <select
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">-- Pilih Ketersediaan --</option>
                <option value="weekday">Hari Kerja (Senin-Jumat)</option>
                <option value="weekend">Akhir Pekan (Sabtu-Minggu)</option>
                <option value="both">Keduanya</option>
                <option value="flexible">Fleksibel</option>
              </select>
            </div>
            
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
            >
              Kirim Pendaftaran
            </button>
          </form>
        </div>
      </div>
      
      <div className="mt-12 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Testimoni Volunteer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="italic mb-4">"Menjadi volunteer di YMP membuka mata saya terhadap banyak isu sosial dan memberikan saya kesempatan untuk berkontribusi. Keterampilan yang saya dapatkan sangat berharga untuk karir saya."</p>
            <div className="font-semibold">Anita Wijaya, 24</div>
            <div className="text-sm text-gray-600">Volunteer sejak 2022</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="italic mb-4">"Program volunteer YMP sangat terstruktur. Saya merasakan dampak nyata dari kontribusi saya dan juga mendapatkan mentoring dari profesional yang sangat membantu."</p>
            <div className="font-semibold">Budi Santoso, 22</div>
            <div className="text-sm text-gray-600">Volunteer sejak 2023</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="italic mb-4">"Pengalaman yang luar biasa! Saya belajar banyak tentang manajemen acara, kampanye sosial, dan mendapatkan teman-teman baru yang memiliki visi serupa."</p>
            <div className="font-semibold">Diana Putri, 20</div>
            <div className="text-sm text-gray-600">Volunteer sejak 2023</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Volunteers;