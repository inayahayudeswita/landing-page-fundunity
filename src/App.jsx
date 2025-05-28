import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import ImageSlider from './components/ImageSlider';
import Programs from './components/Programs';
import Footer from './components/Footer';
import Partners from './components/Partners';

// Import pages for routing
import Program from './pages/WhatWeDo/Program';
import Campaign from './pages/WhatWeDo/Campaign';
import Volunteers from './pages/MovingTogether/Volunteers';
import Contact from './pages/WhoWeAre/Contact';
import About from './pages/WhoWeAre/About';
import ErrorBoundary from './components/ErrorBoundary';
import DonationInNature from './pages/MovingTogether/DonationInNature';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <div className="App">
          <Header />
          <main className="p-8">
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <Gallery />
                  <ImageSlider />
                  <Programs />
                  <Partners />
                </>
              } />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/program" element={<Program />} />
              <Route path="/campaign" element={<Campaign />} />
              <Route path="/volunteers" element={<Volunteers />} />
              <Route path="/donationinnature" element={<DonationInNature />} />
              <Route path="*" element={<div>Page Not Found</div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;