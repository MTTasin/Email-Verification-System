import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './Pages/HomePage';
import SignUpPage from './Pages/SignUpPage';
import LoginPage from './Pages/LoginPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

