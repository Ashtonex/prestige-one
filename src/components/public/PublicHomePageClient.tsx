"use client";

import React, { useState } from "react";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { PublicHeader } from "./PublicHeader";
import { HeroSection } from "./HeroSection";
import { AcademicExcellenceSection } from "./AcademicExcellenceSection";
import { PrestigeExperienceSection } from "./PrestigeExperienceSection";
import { AdmissionsEngineSection } from "./AdmissionsEngineSection";
import { EventsAndNewsSection } from "./EventsAndNewsSection";
import { ParentTestimonialsSection } from "./ParentTestimonialsSection";
import { PublicFooter } from "./PublicFooter";
import { VirtualTourModal } from "./VirtualTourModal";

interface PublicHomePageClientProps {
  user?: any;
}

export function PublicHomePageClient({ user }: PublicHomePageClientProps) {
  const [tourModalOpen, setTourModalOpen] = useState(false);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#060E1E] flex flex-col selection:bg-flectere-gold/30 selection:text-white">
        {/* Navigation Header */}
        <PublicHeader
          onOpenTour={() => setTourModalOpen(true)}
          user={user}
        />

        {/* Hero Section */}
        <HeroSection onOpenTour={() => setTourModalOpen(true)} />

        {/* Academic Excellence & Pathways */}
        <AcademicExcellenceSection />

        {/* The Prestige Experience & Campus Life */}
        <PrestigeExperienceSection />

        {/* Intelligent Admissions Suite (Calculator + Tour Booking + Status Tracker) */}
        <AdmissionsEngineSection />

        {/* Dynamic School Calendar & Announcements */}
        <EventsAndNewsSection />

        {/* Parent & Alumni Testimonials */}
        <ParentTestimonialsSection />

        {/* Luxury Institutional Footer */}
        <PublicFooter />

        {/* Interactive Virtual Campus Tour Modal */}
        <VirtualTourModal
          isOpen={tourModalOpen}
          onClose={() => setTourModalOpen(false)}
        />
      </div>
    </LanguageProvider>
  );
}
