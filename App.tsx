import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/pages/Home';
import { Services } from './components/pages/Services';
import { ContactPage } from './components/pages/ContactPage';
import { GeminiAmbassador } from './components/pages/GeminiAmbassador';
import { BlogList } from './components/pages/BlogList';
import { BlogPost } from './components/pages/BlogPost';
import './types';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gemini" element={<GeminiAmbassador />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogPost />} />
      </Routes>
    </Router>
  );
}

export default App;