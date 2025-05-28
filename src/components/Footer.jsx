import React, { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');

  // Modern RGB color theme
  const colors = {
    primary: "#1a73e8",       // Modern Google-style blue
    primaryHover: "#1557b0",  // Darker blue for hover states
    secondary: "#4285f4",     // Secondary blue (lighter)
    accent: "#34a853",        // Accent green for contrast
    light: "#e8f0fe",         // Very light blue for backgrounds
    dark: "#1a237e",          // Very dark blue for text
    darkBg: "#202124",        // Dark background
    grayBg: "#303134",        // Slightly lighter gray for sections
    textLight: "#ffffff",
    textMuted: "#9aa0a6"
  };

  return (
    <footer className="text-white" style={{ backgroundColor: colors.darkBg }}>
      
      {/* Subscription Bar (bisa ditambahkan konten subscription nanti) */}
      <div style={{ backgroundColor: colors.grayBg }} className="py-6">
        <div className="container mx-auto flex flex-wrap justify-between items-center px-6 gap-6">
          {/* Kosong dulu, bisa isi form subscription/email */}
        </div>
      </div>

      {/* Footer Main Content */}
      <div className="py-16 px-6">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">

          {/* About Us */}
          <div>
            <h3
              className="font-extrabold text-2xl mb-5"
              style={{ color: colors.primary, letterSpacing: '1.2px' }}
            >
              About Us
            </h3>
            <p
              className="mb-6 leading-relaxed"
              style={{ color: colors.textLight, fontSize: '1.05rem' }}
            >
              FundUnity CMS is dedicated to helping individuals and organizations come together to fund and support important causes.
            </p>

            {/* Contact Info */}
            <div style={{ color: colors.textMuted }} className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <i className="fas fa-phone mt-[6px]" aria-hidden="true"></i>
                <span>0852 - 1310 - 3997</span>
              </div>
              <div className="flex items-start gap-3">
                <i className="fas fa-envelope mt-[6px]" aria-hidden="true"></i>
                <span>yukmariproject@gmail.com</span>
              </div>
              <div className="flex items-start gap-3">
                <i className="fas fa-map-marker-alt mt-[6px]" aria-hidden="true"></i>
                <span>
                  PT. Yuk Mari Project Indonesia, Komplek Bandung Indah Raya, Blok C13/No.17, Kelurahan Mekarjaya, Kecamatan Rancasari, Kota Bandung, Jawa Barat 40286
                </span>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="mt-8 rounded-xl overflow-hidden shadow-lg border border-gray-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.4104645402554!2d107.67505759999999!3d-6.9608114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68c300070c60c1%3A0xddd74453cb6ef1a!2sPT.%20YUKMARI%20PROJECT%20INDONESIA!5e0!3m2!1sid!2sid!4v1740843636608!5m2!1sid!2sid"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Yuk Mari Project Location"
              ></iframe>
            </div>
            <div className="text-center mt-4">
              <a
                href="https://maps.app.goo.gl/7pdXU75EiCQLyc746"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-secondary hover:underline transition-colors duration-300"
                style={{ color: colors.secondary }}
              >
                <span>View larger map</span>
                <i className="fas fa-external-link-alt text-xs"></i>
              </a>
            </div>
          </div>

          {/* Who We Are */}
          <div>
            <h3
              className="font-extrabold text-2xl mb-6"
              style={{ color: colors.primary, letterSpacing: '1.2px' }}
            >
              Who We Are
            </h3>
            <ul className="space-y-4" style={{ color: colors.textLight, fontSize: '1rem' }}>
              {['About YMP', 'Partners', 'Contact'].map((item, i) => (
                <li key={i} className="group cursor-pointer transition-transform duration-300 hover:translate-x-3 flex items-center gap-2">
                  <i
                    className="fas fa-chevron-right opacity-0 group-hover:opacity-100 text-primary text-sm"
                    style={{ color: colors.primary }}
                    aria-hidden="true"
                  ></i>
                  <span className="hover:text-blue-400">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Moving Together */}
          <div>
            <h3
              className="font-extrabold text-2xl mb-6"
              style={{ color: colors.primary, letterSpacing: '1.2px' }}
            >
              Moving Together
            </h3>
            <ul className="space-y-4" style={{ color: colors.textLight, fontSize: '1rem' }}>
              {['Volunteers', 'Donation in Nature'].map((item, i) => (
                <li key={i} className="group cursor-pointer transition-transform duration-300 hover:translate-x-3 flex items-center gap-2">
                  <i
                    className="fas fa-chevron-right opacity-0 group-hover:opacity-100 text-primary text-sm"
                    style={{ color: colors.primary }}
                    aria-hidden="true"
                  ></i>
                  <span className="hover:text-blue-400">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What We Do */}
          <div>
            <h3
              className="font-extrabold text-2xl mb-6"
              style={{ color: colors.primary, letterSpacing: '1.2px' }}
            >
              What We Do
            </h3>
            <ul className="space-y-4" style={{ color: colors.textLight, fontSize: '1rem' }}>
              {['Program', 'Campaign'].map((item, i) => (
                <li key={i} className="group cursor-pointer transition-transform duration-300 hover:translate-x-3 flex items-center gap-2">
                  <i
                    className="fas fa-chevron-right opacity-0 group-hover:opacity-100 text-primary text-sm"
                    style={{ color: colors.primary }}
                    aria-hidden="true"
                  ></i>
                  <span className="hover:text-blue-400">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div
        className="py-5 text-center"
        style={{ backgroundColor: 'rgba(0,0,0,0.22)', fontSize: '0.9rem', color: colors.textMuted }}
      >
        <div className="container mx-auto px-6">
          © {new Date().getFullYear()} FundUnity CMS. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
