import React from 'react';
import Header from '../Components/Header'; // Corrected the capitalization of "Components"
import Hero from '../Components/Hero';
import Features from '../Components/Features';
import HowItWorks from '../Components/HowItWorks';
import Pricing from '../Components/Pricing';
import Comparison from '../Components/Comparison';
import FAQ from '../Components/FAQ';
import Footer from '../Components/Footer';

export default function HomePage() {
  return (
    <div className="bg-white min-h-screen">
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <Comparison />
        <FAQ />
      </main>
    </div>
  );
}

