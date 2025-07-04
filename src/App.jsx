import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import ImageSlider from './components/ImageSlider';
import Programs from './components/Programs'; // Daftar program
import Footer from './components/Footer';
import Partners from './components/Partners';

import ProgramDetail from './pages/WhatWeDo/ProgramDetail'; // Detail program
import FocusAreas from './pages/WhatWeDo/FocusAreas';
import AllPrograms from './pages/WhatWeDo/AllPrograms';
import MoreGallery from './pages/WhatWeDo/MoreGallery';
import Faqs from './pages/MovingTogether/Faqs';
import GetInvolved from './pages/MovingTogether/GetInvolved';
import Contact from './pages/WhoWeAre/Contact';
import PartnersPage from './pages/WhoWeAre/PartnersPage'; 
import About from './pages/WhoWeAre/About';
import ThankYou from './pages/ThankYou';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <div className="App">
          <Header />
          <main className="p-8">
            <Routes>
              {/* Beranda / Homepage */}
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

              {/* Halaman statis */}
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/partners" element={<PartnersPage />} />
              <Route path="/focusareas" element={<FocusAreas />} />
                            <Route path="/allprograms" element={<AllPrograms />} />
              <Route path="/moregallery" element={<MoreGallery />} />
              <Route path="/faqs" element={<Faqs />} />
              <Route path="/getinvolved" element={<GetInvolved />} />
              <Route path="/thankyou" element={<ThankYou />} />

              {/* Routing program */}
              <Route path="/program" element={<Programs />} /> {/* Daftar program */}
              <Route path="/program/:id" element={<ProgramDetail />} /> {/* Detail program */}

              {/* Halaman 404 */}
              <Route
                path="*"
                element={
                  <div className="text-center text-red-600 text-xl mt-10">
                    Halaman tidak ditemukan
                  </div>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
