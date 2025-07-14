
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ActiveSection from "@/components/ActiveSection";
import Trainers from "@/components/Trainers";
import Testimonials from "@/components/Testimonials";
import SuscribeSection from "@/components/SuscribeSection";
import FooterSection from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Services />
      <ActiveSection />
      <Trainers />
      <Testimonials/>
      <SuscribeSection />  
    </main>
  );
};

export default Index;
