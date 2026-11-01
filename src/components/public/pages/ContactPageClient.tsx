"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LanguageProvider, useLanguage } from "@/lib/i18n/LanguageContext";
import { PublicHeader } from "../PublicHeader";
import { ScrollMotion } from "../ScrollMotion";
import { PublicFooter } from "../PublicFooter";
import { VirtualTourModal } from "../VirtualTourModal";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Send,
  CheckCircle2,
  Building,
  LogIn,
  ArrowRight,
} from "lucide-react";

export function ContactPageClient({ user }: { user?: any }) {
  return (
    <LanguageProvider>
      <ContactContent user={user} />
    </LanguageProvider>
  );
}

function ContactContent({ user }: { user?: any }) {
  const { language, t } = useLanguage();
  const [tourOpen, setTourOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [inquiryRef, setInquiryRef] = useState("");

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Admissions & Intake 2026",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generated = "ENQ-2026-" + Math.floor(1000 + Math.random() * 9000);
    setInquiryRef(generated);
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#060E1E] text-white flex flex-col selection:bg-flectere-gold/30">
      <PublicHeader onOpenTour={() => setTourOpen(true)} user={user} />
      <ScrollMotion />

      {/* Hero Banner */}
      <section className="relative pt-36 pb-20 overflow-hidden bg-gradient-to-b from-[#081226] via-[#0A1734] to-[#060E1E]">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-flectere-gold/15 border border-flectere-gold/30 text-flectere-gold text-xs font-bold tracking-widest uppercase mb-4">
            {language === "en" ? "GET IN TOUCH" : "FALE CONNOSCO"}
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white">
            {language === "en"
              ? "We Are Here to Guide You"
              : "Estamos à Sua Disposição"}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {language === "en"
              ? "Our admissions concierge and academic leadership welcome your questions regarding enrollment, campus tours, and scholarship opportunities."
              : "A nossa equipa de admissões e corpo directivo estão disponíveis para responder a todas as suas questões sobre matrículas e visitas ao colégio."}
          </p>
        </div>
      </section>

      {/* Contact Cards & Form Grid */}
      <section className="py-20 bg-white text-flectere-navy flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Details Column (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-bold text-flectere-gold uppercase tracking-widest">
                  CAMPUS DIRECTORY
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-flectere-navy mt-1">
                  Sommerschield Campus
                </h3>
                <p className="text-xs sm:text-sm text-flectere-slate mt-2 leading-relaxed">
                  Located in Maputo&apos;s prime diplomatic and residential quarter, our secure 3.2-hectare campus offers serene academic surroundings.
                </p>
              </div>

              <div className="space-y-5 text-xs sm:text-sm">
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-flectere-light border border-flectere-slateLight">
                  <MapPin className="w-5 h-5 text-flectere-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-flectere-navy block font-serif text-base">
                      Physical Address:
                    </strong>
                    <span className="text-flectere-slate leading-relaxed">
                      Av. Kenneth Kaunda &bull; Sommerschield II, Maputo, Mozambique
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-flectere-light border border-flectere-slateLight">
                  <Phone className="w-5 h-5 text-flectere-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-flectere-navy block font-serif text-base">
                      Direct Telephone Lines:
                    </strong>
                    <span className="text-flectere-slate leading-relaxed">
                      General: +258 21 490 000<br />
                      Admissions Desk: +258 84 000 0000
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-flectere-light border border-flectere-slateLight">
                  <Mail className="w-5 h-5 text-flectere-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-flectere-navy block font-serif text-base">
                      Electronic Mail:
                    </strong>
                    <span className="text-flectere-slate leading-relaxed">
                      Admissions: admissions@prestige.ac.mz<br />
                      General Enquiries: info@prestige.ac.mz
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-flectere-light border border-flectere-slateLight">
                  <Clock className="w-5 h-5 text-flectere-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-flectere-navy block font-serif text-base">
                      Admissions Office Hours:
                    </strong>
                    <span className="text-flectere-slate leading-relaxed">
                      Monday &ndash; Friday: 07:30 &ndash; 16:30<br />
                      Saturday: 08:30 &ndash; 12:30 (By Appointment)
                    </span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick Action Button */}
              <div>
                <a
                  href="https://wa.me/258840000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-[#25D366] text-black font-bold text-sm hover:bg-[#20bd5a] transition-all shadow-md"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Start WhatsApp Chat with Admissions</span>
                </a>
              </div>
            </div>

            {/* Interactive Form Column (7 cols) */}
            <div className="lg:col-span-7 bg-flectere-light p-8 sm:p-10 rounded-3xl border border-flectere-slateLight shadow-lg flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-flectere-crimson uppercase tracking-widest">
                  ONLINE ENQUIRY DESK
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-flectere-navy mt-1">
                  Send Us an Institutional Enquiry
                </h3>
                <p className="text-xs sm:text-sm text-flectere-slate mt-1 mb-6">
                  Fill in your details below and an admissions officer will respond within one business day.
                </p>

                {formSubmitted ? (
                  <div className="bg-flectere-greenLight border border-flectere-green/40 p-8 rounded-2xl text-center animate-in fade-in duration-300">
                    <div className="w-12 h-12 rounded-full bg-flectere-green text-white flex items-center justify-center mx-auto mb-3 shadow-md">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-lg text-flectere-navy">
                      Enquiry Successfully Received!
                    </h4>
                    <p className="text-xs text-flectere-slate mt-2 leading-relaxed">
                      Thank you for contacting Prestige International Academy. An admissions advisor has been assigned to your request.
                    </p>
                    <div className="mt-4 p-3 rounded-xl bg-white border border-flectere-slateLight text-xs">
                      <span className="text-slate-400">Reference: </span>
                      <strong className="text-flectere-navy font-mono">
                        {inquiryRef}
                      </strong>
                    </div>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="mt-6 text-xs text-flectere-navy font-bold underline hover:text-flectere-gold"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-flectere-navy mb-1 uppercase tracking-wider">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dr. Alexandre Simbine"
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-white border border-flectere-slateLight text-flectere-navy text-xs sm:text-sm focus:outline-none focus:border-flectere-gold transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-flectere-navy mb-1 uppercase tracking-wider">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="alexandre@domain.mz"
                          value={formState.email}
                          onChange={(e) =>
                            setFormState({ ...formState, email: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl bg-white border border-flectere-slateLight text-flectere-navy text-xs sm:text-sm focus:outline-none focus:border-flectere-gold transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-flectere-navy mb-1 uppercase tracking-wider">
                          Phone / WhatsApp (+258)
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+258 84 000 0000"
                          value={formState.phone}
                          onChange={(e) =>
                            setFormState({ ...formState, phone: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl bg-white border border-flectere-slateLight text-flectere-navy text-xs sm:text-sm focus:outline-none focus:border-flectere-gold transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-flectere-navy mb-1 uppercase tracking-wider">
                        Inquiry Topic
                      </label>
                      <select
                        value={formState.subject}
                        onChange={(e) =>
                          setFormState({ ...formState, subject: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-white border border-flectere-slateLight text-flectere-navy text-xs sm:text-sm focus:outline-none focus:border-flectere-gold transition-colors"
                      >
                        <option>Admissions & Intake 2026/2027</option>
                        <option>Cambridge Curriculum & Dual-Stream Details</option>
                        <option>Scholarships & Financial Aid</option>
                        <option>Careers & Academic Faculty Recruitment</option>
                        <option>Corporate & Diplomatic Partnerships</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-flectere-navy mb-1 uppercase tracking-wider">
                        Message / Questions
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Please share your child's age, current school, and specific questions..."
                        value={formState.message}
                        onChange={(e) =>
                          setFormState({ ...formState, message: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-white border border-flectere-slateLight text-flectere-navy text-xs sm:text-sm focus:outline-none focus:border-flectere-gold transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-flectere-navy hover:bg-flectere-navyLight text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5 text-flectere-gold" />
                      <span>Dispatch Institutional Enquiry</span>
                    </button>
                  </form>
                )}
              </div>

              {/* Operations Portal Link */}
              <div className="mt-8 pt-6 border-t border-flectere-slateLight flex items-center justify-between text-xs text-flectere-slate">
                <span>Already an enrolled family or staff member?</span>
                <Link
                  href="/login"
                  className="font-bold text-flectere-navy hover:text-flectere-gold inline-flex items-center gap-1"
                >
                  <span>Portal Login</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />

      <VirtualTourModal isOpen={tourOpen} onClose={() => setTourOpen(false)} />
    </div>
  );
}
