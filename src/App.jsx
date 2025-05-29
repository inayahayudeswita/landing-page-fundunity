import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import DebugDonation from './components/DebugDonation'
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import ImageSlider from './components/ImageSlider';
import Programs from './components/Programs'; // Daftar program
import Footer from './components/Footer';
import Partners from './components/Partners';

import ProgramDetail from './pages/WhatWeDo/ProgramDetail'; // Detail program

// Import komponen FocusAreas, Faqs, dan GetInvolved yang sudah kamu setuju dan aku buatkan:
import FocusAreas from './pages/WhatWeDo/FocusAreas';
import Faqs from './pages/MovingTogether/Faqs';
import GetInvolved from './pages/MovingTogether/GetInvolved';

import Contact from './pages/WhoWeAre/Contact';
import About from './pages/WhoWeAre/About';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <div className="App">
          <Header />
          <main className="p-8">
            <Routes>
              {/* Homepage */}
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <Gallery />
                    <ImageSlider />
                    <Programs />
                    <Partners />
                  </>
                }
              />

              {/* Static pages */}
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/focusareas" element={<FocusAreas />} />  {/* huruf kecil di URL lebih umum */}
              <Route path="/faqs" element={<Faqs />} />
              <Route path="/getinvolved" element={<GetInvolved />} />

              {/* Program routes */}
              <Route path="/program" element={<Programs />} />               {/* List of programs */}
              <Route path="/program/:id" element={<ProgramDetail />} />     {/* Detail program */}

              {/* 404 Fallback */}
              <Route path="*" element={<div className="text-center text-red-600 text-xl mt-10">Page Not Found</div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
