import React from "react";
import partner1 from "../assets/images/partner1.png";
import partner2 from "../assets/images/partner2.png";
import partner3 from "../assets/images/partner3.png";
import partner4 from "../assets/images/partner4.png";
import partner5 from "../assets/images/partner5.png";
import partner6 from "../assets/images/partner6.png";
import logoCMS from "../assets/images/logoCMS.jpg";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

const colors = {
  primary: "#1a73e8",
  secondary: "#4285f4",
  accent: "#34a853",
  highlight: "#ea4335",
  neutral: "#fbbc05",
  background: "linear-gradient(135deg, #e8f0fe 0%, #d2e3fc 100%)",
  cardBg: "#ffffff",
  dark: "#1a237e",
  text: "#202124",
  lightText: "#5f6368",
};

const partners = [
  { name: "UPI", logo: partner1 },
  { name: "UIN", logo: partner2 },
  { name: "BAJAX", logo: partner3 },
  { name: "Kraft Heinz", logo: partner4 },
  { name: "Unilever", logo: partner5 },
  { name: "Nestle", logo: partner6 },
];

const Partners = () => {
  return (
    <section
      style={{
        background: colors.background,
        borderRadius: "0 0 40px 40px",
        padding: "80px 0 100px",
        boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
        position: "relative",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "8px",
          background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.accent} 50%, ${colors.neutral} 100%)`,
          borderRadius: "40px 40px 0 0",
          boxShadow: "0 4px 8px rgba(26, 115, 232, 0.3)",
          zIndex: 10,
        }}
      ></div>

      {/* Main Logo */}
      <div
        style={{
          marginBottom: "60px",
          display: "flex",
          justifyContent: "center",
          filter: "drop-shadow(0 6px 15px rgba(0,0,0,0.12))",
          transition: "transform 0.3s ease",
        }}
      >
        <div
          style={{
            padding: "24px",
            backgroundColor: colors.cardBg,
            borderRadius: "24px",
            boxShadow: `0 20px 50px rgba(26, 115, 232, 0.15)`,
            border: `3px solid ${colors.primary}`,
            transform: "translateY(-12px)",
            width: "320px",
          }}
        >
          <img
            src={logoCMS}
            alt="Partner Banner"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "16px",
              objectFit: "cover",
            }}
          />
        </div>
      </div>

      {/* Title */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "50px",
          position: "relative",
          maxWidth: "650px",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "0 16px",
        }}
      >
        <h2
          style={{
            fontSize: "44px",
            fontWeight: "900",
            color: colors.dark,
            margin: "0 auto",
            letterSpacing: "2px",
            textTransform: "uppercase",
            position: "relative",
            userSelect: "none",
          }}
        >
          Trusted Partners
          <span
            style={{
              position: "absolute",
              bottom: "-16px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "100px",
              height: "6px",
              background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
              borderRadius: "6px",
              boxShadow: `0 0 14px ${colors.accent}`,
            }}
          ></span>
        </h2>
        <p
          style={{
            color: colors.lightText,
            maxWidth: "600px",
            margin: "20px auto 0",
            fontSize: "19px",
            fontWeight: "600",
            lineHeight: "1.6",
            letterSpacing: "0.04em",
            userSelect: "none",
          }}
        >
          We collaborate with industry leaders to deliver the best solutions.
        </p>
      </div>

      {/* Partner Logos Slider */}
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        <Swiper
          modules={[Autoplay, Navigation]}
          slidesPerView={4}
          spaceBetween={32}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 25,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 32,
            },
          }}
          style={{
            paddingBottom: "48px",
          }}
        >
          {partners.map((partner, i) => (
            <SwiperSlide key={i}>
              <div
                style={{
                  backgroundColor: colors.cardBg,
                  borderRadius: "20px",
                  padding: "30px",
                  height: "180px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 22px rgba(0, 0, 0, 0.08)",
                  border: `1.5px solid ${colors.secondary}33`,
                  transition: "transform 0.4s ease, box-shadow 0.4s ease",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  userSelect: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px) scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 22px 50px rgba(26, 115, 232, 0.22)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "0 8px 22px rgba(0, 0, 0, 0.08)";
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "90px",
                    height: "90px",
                    marginBottom: "22px",
                    filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.05))",
                  }}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      borderRadius: "12px",
                      transition: "filter 0.3s ease",
                    }}
                  />
                </div>
                <h4
                  style={{
                    margin: "0",
                    fontSize: "20px",
                    fontWeight: "700",
                    color: colors.text,
                    letterSpacing: "0.06em",
                    userSelect: "none",
                    transition: "color 0.3s ease",
                  }}
                >
                  {partner.name}
                </h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* View All Button */}
      <div style={{ textAlign: "center", marginTop: "48px" }}>
        <button
          style={{
            padding: "16px 40px",
            fontSize: "17px",
            fontWeight: "700",
            borderRadius: "36px",
            border: "none",
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
            color: "#fff",
            cursor: "pointer",
            boxShadow: `0 8px 30px rgba(26, 115, 232, 0.4)`,
            transition: "all 0.35s ease",
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            userSelect: "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 12px 40px rgba(26, 115, 232, 0.7)";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = `0 8px 30px rgba(26, 115, 232, 0.4)`;
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          View All Partners
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginLeft: "8px" }}
          >
            <path d="M9 18L15 12L9 6" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Partners;
