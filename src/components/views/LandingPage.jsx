
import React from 'react';
import Navbar from '../layout/Navbar';
import HeroSection from '../sections/HeroSection';
import HowItWorksSection from '../sections/HowItWorksSection';
import OurWorksSection from '../sections/OurWorksSection';
import Footer from '../sections/Footer';
import Contact from '../sections/Contact';
import FeaturesSection from '../sections/FeaturesSection';
import EndingSection from '../sections/EndingSection';
import { StickyRocketTransition } from '../sections/StickyRocketTransition';

const LandingPage = () => {
  return (
    // The "overflow-x-hidden" class has been REMOVED from this div. This is crucial.
    <div className="bg-black">
      <Navbar />
      <div className="pt-20 sm:pt-24">
        <HeroSection />
        <div className="my-16 sm:my-24">
          <OurWorksSection />
        </div>

        {/* This component now handles the entire sticky animation sequence */}
        <StickyRocketTransition>
          <HowItWorksSection />
          <FeaturesSection />
        </StickyRocketTransition>

        <div className="my-16 sm:my-24">
          <Contact />
        </div>
        <div className="my-16 sm:my-24">
          <EndingSection />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;