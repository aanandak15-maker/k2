import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import TrustBar from './TrustBar';
import ProblemSolution from './ProblemSolution';
import FeaturesGrid from './FeaturesGrid';
import DataPromise from './DataPromise';
import ImpactStats from './ImpactStats';
import Testimonials from './Testimonials';
import CTASection from './CTASection';
import Footer from './Footer';

interface LandingPageProps {
  onLogin: () => void;
}

export default function LandingPage({ onLogin }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar onLogin={onLogin} />
      <main>
        <HeroSection onLogin={onLogin} />
        <TrustBar />
        <ProblemSolution />
        <FeaturesGrid />
        <ImpactStats />
        <DataPromise />
        <Testimonials />
        <CTASection onLogin={onLogin} />
      </main>
      <Footer />
    </div>
  );
}
