"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  X,
  Compass,
  MapPin,
  Calendar,
  Maximize2,
  CheckCircle2,
  Info,
  ChevronRight,
} from "lucide-react";

interface VirtualTourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TourLocation {
  id: string;
  name: string;
  namePt: string;
  category: string;
  image: string;
  description: string;
  descriptionPt: string;
  specs: { label: string; value: string }[];
  hotspots: { title: string; desc: string; x: string; y: string }[];
}

export function VirtualTourModal({ isOpen, onClose }: VirtualTourModalProps) {
  const { language, t } = useLanguage();
  const [activeLocationId, setActiveLocationId] = useState("quad");
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  if (!isOpen) return null;

  const locations: TourLocation[] = [
    {
      id: "quad",
      name: "Main Academic Quadrangle & Gardens",
      namePt: "Pátio Académico Principal & Jardins",
      category: "Campus Architecture",
      image: "/images/campus-exterior.jpg",
      description:
        "The beating heart of our Sommerschield campus, featuring shaded colonial verandas, indigenous flora, reflecting ponds, and covered walkways connecting all divisions.",
      descriptionPt:
        "O coração do nosso campus em Sommerschield, com galerias sombreadas, flora autóctone, espelhos de água e passadiços cobertos ligando todos os ciclos escolares.",
      specs: [
        { label: "Campus Area", value: "3.2 Hectares" },
        { label: "Security", value: "24/7 Biometric Access & Controlled Gates" },
        { label: "Sustainability", value: "100% Solar-Backed Grid with Rain Harvesting" },
      ],
      hotspots: [
        {
          title: "Colonnade Walkway",
          desc: "All-weather covered colonnade providing sun and rain protection between buildings.",
          x: "30%",
          y: "55%",
        },
        {
          title: "Central Reflecting Pool",
          desc: "Acoustic passive cooling garden providing tranquil study and gathering spaces.",
          x: "65%",
          y: "75%",
        },
      ],
    },
    {
      id: "stem",
      name: "Ada Lovelace STEM & Robotics Centre",
      namePt: "Centro STEM & Robótica Ada Lovelace",
      category: "Innovation & Sciences",
      image: "/images/stem-lab.jpg",
      description:
        "A multi-zone laboratory engineered for university-calibre chemistry, molecular biology, robotics engineering, micro-circuit prototyping, and AI algorithm training.",
      descriptionPt:
        "Um laboratório multizona concebido para química de nível universitário, biologia molecular, robótica avançada, prototipagem electrónica e inteligência artificial.",
      specs: [
        { label: "Class Capacity", value: "16 Students Max per Lab" },
        { label: "Equipment", value: "Laser Cutters, 3D Printers, Digital Sensors" },
        { label: "Safety", value: "Fume Hoods, Emergency Showers, HEPA Airflow" },
      ],
      hotspots: [
        {
          title: "Autonomous Robotics Rig",
          desc: "Competition-grade test arena for pan-African robotics trials.",
          x: "45%",
          y: "40%",
        },
        {
          title: "Digital Sensor Workbench",
          desc: "Microcontroller interface stations for real-time physics data logging.",
          x: "70%",
          y: "60%",
        },
      ],
    },
    {
      id: "aquatics",
      name: "Olympic 25m Aquatics & Sports Complex",
      namePt: "Complexo Aquático Olímpico de 25m & Desporto",
      category: "Athletics & Physical Health",
      image: "/images/sports-complex.jpg",
      description:
        "Our state-of-the-art sports arena featuring an 8-lane FINA-certified heated pool, FIFA-standard artificial football turf, tennis courts, and spectator seating.",
      descriptionPt:
        "A nossa arena desportiva de referência com piscina aquecida de 8 pistas homologada para provas, campo de futebol relvado FIFA, campos de ténis e bancadas.",
      specs: [
        { label: "Pool Specs", value: "25 Metres &bull; 8 Lanes &bull; Geothermal Heating" },
        { label: "Pitch", value: "All-Weather FIFA Standard Turf" },
        { label: "Coaching", value: "FINA Certified Aquatics Masters" },
      ],
      hotspots: [
        {
          title: "FINA Timing System",
          desc: "Electronic touch pads and scoreboard for inter-school swimming meets.",
          x: "50%",
          y: "50%",
        },
      ],
    },
    {
      id: "library",
      name: "Learning Commons & Heritage Library",
      namePt: "Biblioteca & Centro de Recursos do Conhecimento",
      category: "Academic Research",
      image: "/images/library-study.jpg",
      description:
        "A double-height reading sanctuary featuring over 25,000 multilingual titles, JSTOR research terminal access, private silent study cubicles, and seminar presentation pods.",
      descriptionPt:
        "Um santuário de leitura com mais de 25.000 títulos bilingues, acesso a bases de dados JSTOR, cubículos de estudo individual em silêncio e salas de seminário.",
      specs: [
        { label: "Volumes", value: "25,000+ Print & Digital Licences" },
        { label: "Digital Terminals", value: "1:1 Touchscreens & Research iMacs" },
        { label: "Acoustics", value: "Slatted Oak Sound-Dampening Architecture" },
      ],
      hotspots: [
        {
          title: "Individual Research Pods",
          desc: "Acoustically isolated study booths for Sixth Form thesis preparation.",
          x: "40%",
          y: "65%",
        },
      ],
    },
    {
      id: "theatre",
      name: "Black Box Performing Arts Hall",
      namePt: "Grande Auditório & Teatro Black Box",
      category: "Creative Expression",
      image: "/images/arts-theatre.jpg",
      description:
        "450-seat professional auditorium with acoustic curved wood walls, computerised stage lighting, orchestral pit, and digital audio engineering recording booth.",
      descriptionPt:
        "Auditório profissional com 450 lugares, paredes acústicas de madeira nobre, iluminação cénica digital, fosso de orquestra e estúdio de gravação de som.",
      specs: [
        { label: "Seating", value: "450 Tiered Velour Seats" },
        { label: "Sound", value: "Dolby Surround & Live Multi-Track Recording" },
        { label: "Lighting", value: "DMX Programmable Moving Head Fixtures" },
      ],
      hotspots: [
        {
          title: "Orchestral Stage",
          desc: "Accommodates full 60-piece symphony orchestra and grand piano.",
          x: "55%",
          y: "50%",
        },
      ],
    },
    {
      id: "early",
      name: "Early Years Montessori Atelier",
      namePt: "Atelier Pré-Escolar de Inspiração Montessori",
      category: "Early Childhood",
      image: "/images/early-years.jpg",
      description:
        "A nurturing, light-filled environment designed for joyful foundational learning, sensory botany, wooden tactile math manipulatives, and secure outdoor discovery gardens.",
      descriptionPt:
        "Um ambiente luminoso e seguro concebido para aprendizagem pela descoberta, botânica sensorial, materiais tácteis de matemática e recreio privativo.",
      specs: [
        { label: "Ages", value: "3 to 5 Years Old" },
        { label: "Teacher Ratio", value: "1 Educator per 7 Children" },
        { label: "Safety", value: "Rounded Birch Furniture & Impact-Absorbing Floors" },
      ],
      hotspots: [
        {
          title: "Sensory Botany Station",
          desc: "Hands-on botanical specimen examination and natural world discovery.",
          x: "60%",
          y: "60%",
        },
      ],
    },
  ];

  const currentLoc =
    locations.find((l) => l.id === activeLocationId) || locations[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-[#081226] border border-white/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-[#060E1E] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-flectere-gold/20 text-flectere-gold flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-white">
                {t.tourModal.title}
              </h3>
              <p className="text-[11px] text-slate-400">
                Sommerschield Campus &bull; Maputo, Mozambique
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close Tour"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Main Visual Image & Hotspot Column (8 cols) */}
          <div className="lg:col-span-8 relative min-h-[320px] sm:min-h-[460px] bg-black">
            <div
              className="w-full h-full min-h-[320px] sm:min-h-[460px] bg-cover bg-center transition-all duration-700"
              style={{ backgroundImage: `url('${currentLoc.image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            {/* Hotspot Pins */}
            {currentLoc.hotspots.map((hs, i) => (
              <div
                key={i}
                className="absolute"
                style={{ left: hs.x, top: hs.y }}
              >
                <button
                  onClick={() =>
                    setActiveHotspot(activeHotspot === i ? null : i)
                  }
                  className="relative group w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-flectere-gold text-[#081226] font-bold text-xs flex items-center justify-center shadow-lg hover:scale-125 transition-transform"
                >
                  <span className="w-full h-full rounded-full bg-flectere-gold animate-ping absolute inset-0 opacity-40" />
                  <Info className="w-4 h-4" />
                </button>

                {/* Hotspot Tooltip */}
                {activeHotspot === i && (
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-60 p-3 rounded-xl bg-[#081226]/95 border border-flectere-gold text-white text-xs backdrop-blur-md shadow-2xl z-30 animate-in fade-in zoom-in-95">
                    <p className="font-bold text-flectere-gold">{hs.title}</p>
                    <p className="text-slate-300 text-[11px] mt-1">{hs.desc}</p>
                  </div>
                )}
              </div>
            ))}

            {/* Floating Title Pill over photo */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div>
                <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[10px] uppercase font-bold text-flectere-gold border border-white/20">
                  {currentLoc.category}
                </span>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1 drop-shadow-md">
                  {language === "en" ? currentLoc.name : currentLoc.namePt}
                </h4>
              </div>
            </div>
          </div>

          {/* Details & Room Selector Column (4 cols) */}
          <div className="lg:col-span-4 bg-[#0a1630] p-6 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-flectere-gold">
                {t.tourModal.exploreSpace}
              </span>

              {/* Selector Thumbnails */}
              <div className="space-y-2 mt-3 mb-6">
                {locations.map((loc) => {
                  const isCurrent = loc.id === activeLocationId;
                  return (
                    <button
                      key={loc.id}
                      onClick={() => {
                        setActiveLocationId(loc.id);
                        setActiveHotspot(null);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center gap-3 border ${
                        isCurrent
                          ? "bg-flectere-gold text-[#081226] border-flectere-gold font-bold shadow-md"
                          : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      <div
                        className="w-10 h-10 rounded-lg bg-cover bg-center shrink-0 border border-white/20"
                        style={{ backgroundImage: `url('${loc.image}')` }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold truncate">
                          {language === "en" ? loc.name : loc.namePt}
                        </p>
                        <p className="text-[10px] opacity-75 truncate">
                          {loc.category}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 shrink-0" />
                    </button>
                  );
                })}
              </div>

              {/* Description & Technical Specs */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === "en"
                    ? currentLoc.description
                    : currentLoc.descriptionPt}
                </p>

                <div className="mt-4 space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {t.tourModal.keyHighlights}:
                  </p>
                  {currentLoc.specs.map((sp, i) => (
                    <div
                      key={i}
                      className="text-xs flex items-start gap-2 text-slate-200"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-flectere-gold shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-white">{sp.label}:</strong>{" "}
                        <span dangerouslySetInnerHTML={{ __html: sp.value }} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <Link
                href="/admissions#visit"
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-flectere-gold to-[#B38F46] hover:from-[#d4af37] hover:to-flectere-gold text-[#081226] font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.tourModal.bookVisitForSpace}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
