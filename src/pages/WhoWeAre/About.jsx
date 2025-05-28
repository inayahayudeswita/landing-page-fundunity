import React from "react";
import { Link } from "react-router-dom";
import video1 from "../../assets/images/video1.mp4";
import video2 from "../../assets/images/video1.mp4";
import video3 from "../../assets/images/video1.mp4";

function About() {
  const galleries = [
    {
      video: video1,
      story: "This moment captures our efforts in empowering local communities through education and skill development. Witness the transformative journey of individuals achieving new milestones."
    },
    {
      video: video2,
      story: "A glimpse into our environmental initiatives. This video showcases how sustainability projects are making a real impact in preserving nature for future generations."
    },
    {
      video: video3,
      story: "An unforgettable event where collaboration and innovation meet. Experience the inspiring stories of change-makers striving for a better world."
    }
  ];

  return (
    <section className="py-24 bg-gray-100">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-[#004f9f] mb-4">About Us</h2>
        <p className="text-gray-700 max-w-3xl mx-auto mb-6">
          Our mission is to create lasting impacts through education, sustainability, and innovation. We strive to empower communities by providing resources and opportunities that drive positive change.
        </p>
        <p className="text-gray-700 max-w-3xl mx-auto mb-12">
          Our vision is a world where individuals and communities thrive together, embracing knowledge and sustainable practices to build a better future for all.
        </p>
        
        <h2 className="text-4xl font-bold text-[#004f9f] mb-4">Gallery</h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-6">
          Discover our collection of inspiring moments, impactful stories, and transformative experiences captured through visuals.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
          {galleries.map((item, index) => (
            <div key={index} className="transform hover:scale-105 transition-all duration-300">
              <video 
                controls 
                className="w-full rounded-xl shadow-xl border-4 border-white"
                poster={`/api/placeholder/600/400?video${index+1}`}
              >
                <source src={item.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className="mt-4 text-gray-800 text-sm italic">{item.story}</p>
            </div>
          ))}
        </div>
       
      </div>
    </section>
  );
}

export default About;
