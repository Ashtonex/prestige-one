"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LanguageProvider, useLanguage } from "@/lib/i18n/LanguageContext";
import { PublicHeader } from "../PublicHeader";
import { PublicFooter } from "../PublicFooter";
import { VirtualTourModal } from "../VirtualTourModal";
import { AdmissionsEngineSection } from "../AdmissionsEngineSection";
import {
  GraduationCap,
  FileCheck2,
  HelpCircle,
  MessageCircle,
  Calendar,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

export function AdmissionsPageClient({ user }: { user?: any }) {
  return (
    <LanguageProvider>
      <AdmissionsContent user={user} />
    </LanguageProvider>
  );
}

function AdmissionsContent({ user }: { user?: any }) {
  const { language, t } = useLanguage();
  const [tourOpen, setTourOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q:
        language === "en"
          ? "What are the language requirements for non-native English speakers?"
          : "Quais são os requisitos linguísticos para alunos não falantes de Inglês?",
      a:
        language === "en"
          ? "Prestige offers dedicated English as an Additional Language (EAL) and Portuguese as an Additional Language (PAL) immersion tracks. In Early Years and Primary, young learners acquire fluency naturally. In Secondary, students undergo a friendly diagnostic to ensure appropriate classroom support."
          : "A Prestige dispõe de programas de apoio intensivo para Inglês e Português língua não materna. No Pré-Escolar e Primário, a aprendizagem faz-se por imersão natural. No Secundário, realiza-se um diagnóstico para planear o acompanhamento pedagógico adequado.",
    },
    {
      q:
        language === "en"
          ? "When does the academic year start, and do you accept mid-year enrolments?"
          : "Quando começa o ano letivo e são aceites matrículas a meio do ano?",
      a:
        language === "en"
          ? "Our academic year begins in January and comprises three terms concluding in November/December. However, to accommodate international and diplomatic transfers, rolling admissions are accepted throughout the year subject to seat availability."
          : "O nosso ano letivo inicia em Janeiro e organiza-se em três períodos até Novembro/Dezembro. Contudo, para atender a famílias em transferência diplomática ou empresarial, acolhemos candidaturas ao longo de todo o ano letivo, conforme as vagas existentes.",
    },
    {
      q:
        language === "en"
          ? "What documents are required with the application form?"
          : "Que documentos são necessários apresentar com a candidatura?",
      a:
        language === "en"
          ? "A copy of the child's passport or birth certificate, the last two years of formal academic reports/transcripts, immunization records, two passport-sized photographs, and guardian identification."
          : "Cópia do passaporte ou certidão de nascimento da criança, boletins escolares dos últimos dois anos lectivos, boletim de vacinas actualizado, duas fotografias tipo passe e documento de identificação dos encarregados de educação.",
    },
    {
      q:
        language === "en"
          ? "Are academic scholarships or bursaries available?"
          : "Existem bolsas de mérito académico ou apoio financeiro?",
      a:
        language === "en"
          ? "Yes. Prestige awards merit-based scholarships for exceptional academic aptitude and sporting distinction in Grades 7, 9, and Sixth Form following an annual competitive assessment examination in October."
          : "Sim. A Prestige atribui bolsas de mérito académico e desportivo para ingressos na 7ª, 9ª classes e Sixth Form, mediante concurso e exame de avaliação realizado anualmente.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#060E1E] text-white flex flex-col selection:bg-flectere-gold/30">
      <PublicHeader onOpenTour={() => setTourOpen(true)} user={user} />

      {/* Hero Banner */}
      <section className="relative pt-36 pb-20 overflow-hidden bg-gradient-to-b from-[#081226] via-[#0A1734] to-[#060E1E]">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-flectere-gold/15 border border-flectere-gold/30 text-flectere-gold text-xs font-bold tracking-widest uppercase mb-4">
            {language === "en" ? "ADMISSIONS 2026 / 2027" : "MATRÍCULAS 2026 / 2027"}
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white">
            {language === "en"
              ? "Begin Your Child's Journey of Excellence"
              : "Inicie o Percurso de Excelência do Seu Filho"}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {language === "en"
              ? "Explore transparent tuition schedules, schedule a private walkthrough of our Sommerschield campus, and track intake progress online."
              : "Consulte propinas transparentes, agende uma visita privada ao nosso campus em Sommerschield e acompanhe a matrícula digitalmente."}
          </p>
        </div>
      </section>

      {/* Interactive Admissions Engine (Calculator + Booking + Status Tracker) */}
      <AdmissionsEngineSection />

      {/* Required Documentation Checklist */}
      <section className="py-20 bg-flectere-light text-flectere-navy">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-flectere-gold uppercase tracking-widest">
              {language === "en" ? "PREPARATION CHECKLIST" : "DOCUMENTAÇÃO NECESSÁRIA"}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-flectere-navy mt-1">
              {language === "en" ? "Application Requirements" : "Requisitos de Inscrição"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Identification Documents",
                desc: "Certified copy of child's passport / birth certificate and parent ID documents.",
              },
              {
                title: "Academic History (2 Years)",
                desc: "Official school reports, transcripts, and Cambridge or national diagnostic records.",
              },
              {
                title: "Health & Immunization Record",
                desc: "Up-to-date vaccination record and campus medical disclosure questionnaire.",
              },
              {
                title: "Confidential Reference Letter",
                desc: "A brief testimonial from current school principal or classroom teacher.",
              },
            ].map((doc, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-flectere-slateLight shadow-sm flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-flectere-greenLight text-flectere-green flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-flectere-navy">
                    {doc.title}
                  </h4>
                  <p className="text-xs text-flectere-slate mt-1 leading-relaxed">
                    {doc.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 bg-white text-flectere-navy border-t border-flectere-slateLight">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-flectere-gold uppercase tracking-widest">
              FAQ
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-flectere-navy mt-1">
              {language === "en"
                ? "Frequently Asked Questions"
                : "Perguntas Frequentes"}
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-flectere-slateLight overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 bg-flectere-light/60 hover:bg-flectere-light transition-colors flex items-center justify-between font-serif font-bold text-base text-flectere-navy"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-flectere-gold transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-5 bg-white text-xs sm:text-sm text-flectere-slate leading-relaxed border-t border-flectere-slateLight">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <PublicFooter />

      <VirtualTourModal isOpen={tourOpen} onClose={() => setTourOpen(false)} />
    </div>
  );
}
