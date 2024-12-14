import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { Main, BlogPage, ProjectPage, Copier } from './pages';
import { BackToTop } from './components';
import ScrollToTop from './utils/ScrollToTop';

import './App.css';

function App() {
  return (
    <div className="app">
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/copier" element={<Copier />} />

          {/* Redirect all other routes to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <BackToTop />
      </Router>
    </div>
  );
}

export default App;
