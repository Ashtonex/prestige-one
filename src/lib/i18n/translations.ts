export type Language = "en" | "pt";

export interface Translations {
  nav: {
    discover: string;
    aboutUs: string;
    visionMission: string;
    leadership: string;
    campusFacilities: string;
    virtualTour: string;
    academics: string;
    curriculum: string;
    stages: string;
    philosophy: string;
    outcomes: string;
    admissions: string;
    howToApply: string;
    feeCalculator: string;
    scheduleVisit: string;
    applicationTracker: string;
    campusLife: string;
    sportsAthletics: string;
    clubsSocieties: string;
    artsCulture: string;
    achievements: string;
    newsCommunity: string;
    calendar: string;
    schoolStories: string;
    alumni: string;
    connect: string;
    contactUs: string;
    portalLogin: string;
    applyNow: string;
  };
  hero: {
    tagline: string;
    title: string;
    subtitle: string;
    scheduleVisit: string;
    explorePrograms: string;
    virtualTourBtn: string;
    stats: {
      curriculumTitle: string;
      curriculumDesc: string;
      nationalitiesTitle: string;
      nationalitiesDesc: string;
      universityTitle: string;
      universityDesc: string;
      stemTitle: string;
      stemDesc: string;
      safetyTitle: string;
      safetyDesc: string;
    };
  };
  academics: {
    badge: string;
    heading: string;
    subheading: string;
    stagesTitle: string;
    stagesSubtitle: string;
    stages: {
      id: string;
      name: string;
      age: string;
      focus: string;
      description: string;
      highlights: string[];
      keySubjects: string[];
      classRatio: string;
      credentials: string;
    }[];
    pillars: {
      title: string;
      desc: string;
    }[];
  };
  experience: {
    badge: string;
    heading: string;
    subheading: string;
    tabs: {
      id: string;
      label: string;
      title: string;
      description: string;
      stats: string;
      features: string[];
    }[];
    housesTitle: string;
    housesDesc: string;
  };
  admissions: {
    badge: string;
    heading: string;
    subheading: string;
    stepsTitle: string;
    steps: {
      step: string;
      title: string;
      desc: string;
    }[];
    calculator: {
      title: string;
      subtitle: string;
      selectStage: string;
      dayVsBoarding: string;
      dayStudent: string;
      boardingStudent: string;
      transportOption: string;
      transportLabel: string;
      cateringOption: string;
      cateringLabel: string;
      termlyTuition: string;
      annualTuition: string;
      disclaimer: string;
    };
    tourBooking: {
      title: string;
      subtitle: string;
      parentName: string;
      parentEmail: string;
      parentPhone: string;
      studentStage: string;
      preferredDate: string;
      timeSlot: string;
      focusArea: string;
      submitBtn: string;
      successMsg: string;
    };
    tracker: {
      title: string;
      subtitle: string;
      placeholder: string;
      checkBtn: string;
      demoHint: string;
    };
  };
  calendar: {
    badge: string;
    heading: string;
    subheading: string;
    filterAll: string;
    filterAcademic: string;
    filterSports: string;
    filterArts: string;
    filterCommunity: string;
    rsvpBtn: string;
    downloadCal: string;
  };
  news: {
    badge: string;
    heading: string;
    subheading: string;
    readMore: string;
  };
  testimonials: {
    badge: string;
    heading: string;
    subheading: string;
  };
  tourModal: {
    title: string;
    subtitle: string;
    close: string;
    exploreSpace: string;
    keyHighlights: string;
    bookVisitForSpace: string;
  };
  footer: {
    aboutText: string;
    accreditations: string;
    quickLinks: string;
    admissionsHeading: string;
    contactHeading: string;
    portalAccess: string;
    copyright: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      discover: "Discover Prestige",
      aboutUs: "About the Academy",
      visionMission: "Vision & Ethos",
      leadership: "Executive Leadership",
      campusFacilities: "Campus & Facilities",
      virtualTour: "Virtual Campus Tour",
      academics: "Academics",
      curriculum: "Cambridge & National Dual-Stream",
      stages: "Academic Stages (Ages 3–18)",
      philosophy: "Teaching Philosophy",
      outcomes: "University Outcomes & Placements",
      admissions: "Admissions",
      howToApply: "How to Apply",
      feeCalculator: "Tuition & Fee Calculator",
      scheduleVisit: "Schedule a Campus Tour",
      applicationTracker: "Track Application Status",
      campusLife: "Campus Life",
      sportsAthletics: "Sports & Athletics",
      clubsSocieties: "Clubs & Societies",
      artsCulture: "Arts & Performing Studio",
      achievements: "Student Honors & Distinction",
      newsCommunity: "News & Community",
      calendar: "School Calendar & Events",
      schoolStories: "Stories & Publications",
      alumni: "Alumni Network",
      connect: "Connect",
      contactUs: "Contact Admissions",
      portalLogin: "Portal Login",
      applyNow: "Apply Now",
    },
    hero: {
      tagline: "A WORLD OF OPPORTUNITY",
      title: "Where Global Minds Grow",
      subtitle:
        "Nurturing future leaders through academic excellence, innovation, and a truly international education in Sommerschield, Maputo.",
      scheduleVisit: "Schedule a Visit",
      explorePrograms: "Explore Programs",
      virtualTourBtn: "Interactive Campus Tour",
      stats: {
        curriculumTitle: "Cambridge & National Dual-Stream",
        curriculumDesc: "Accredited IGCSE, A-Levels & National Diploma",
        nationalitiesTitle: "35+ Nationalities",
        nationalitiesDesc: "A vibrant, truly multicultural community",
        universityTitle: "100% University Guidance",
        universityDesc: "Personalized pathways to top universities worldwide",
        stemTitle: "STEM + Arts Innovation",
        stemDesc: "Robotics labs, AI research & performing arts",
        safetyTitle: "Safe, Inspiring Campus",
        safetyDesc: "Nurturing pastoral care where every learner thrives",
      },
    },
    academics: {
      badge: "ACADEMIC EXCELLENCE",
      heading: "Dual-Stream Mastery Built for Global Impact",
      subheading:
        "From early curiosity to pre-university specialization, our rigorous curriculum pairs Cambridge International standards with the rich heritage of Mozambique.",
      stagesTitle: "Explore Academic Stages",
      stagesSubtitle:
        "Select an academic division below to inspect curriculum focus, student-faculty ratios, and international benchmarks.",
      stages: [
        {
          id: "eyfs",
          name: "Early Years Foundation",
          age: "Ages 3 – 5 (Pré-Escolar)",
          focus: "Inquiry, Bilingual Literacy & Creative Sensory Discovery",
          description:
            "Reggio-Emilia and Montessori inspired early childhood development, igniting wonder, foundational literacy in Portuguese and English, and social-emotional confidence.",
          highlights: [
            "Bilingual immersion environment",
            "Sensory exploration & outdoor nature atelier",
            "Early mathematical concepts through guided play",
            "Dedicated secure early-years playground & pool",
          ],
          keySubjects: ["Early Literacy & Phonics", "Numeracy Play", "Art & Music", "Discovery Science", "Motor Development"],
          classRatio: "1:7 Teacher to Student",
          credentials: "Early Years International Milestone Framework",
        },
        {
          id: "primary",
          name: "Cambridge Primary",
          age: "Ages 6 – 10 (Grades 1 – 5)",
          focus: "Critical Thinking, Bilingual Fluency & Core Mastery",
          description:
            "A structured, vibrant dual-language academic foundation cultivating disciplined problem-solving, reading fluency, hands-on scientific investigation, and digital literacy.",
          highlights: [
            "Cambridge Primary Checkpoint Preparation",
            "Bilingual dual-stream instruction (PT / EN)",
            "Junior robotics and coding curriculum",
            "Extensive music, visual arts, and swimming",
          ],
          keySubjects: ["Mathematics", "English & Portuguese", "Science & Discovery", "Computing & Robotics", "Global Perspectives"],
          classRatio: "1:12 Teacher to Student",
          credentials: "Cambridge Primary Checkpoint & National Stage Certifications",
        },
        {
          id: "lower-secondary",
          name: "Lower Secondary",
          age: "Ages 11 – 14 (Grades 6 – 8)",
          focus: "Academic Breadth, Scientific Rigour & Emerging Leadership",
          description:
            "Students transition to specialist-led learning across comprehensive humanities, mathematical sciences, and technological innovation, developing independent research habits.",
          highlights: [
            "Laboratory-based Biology, Chemistry, and Physics",
            "Model United Nations & formal debate society",
            "Cambridge Lower Secondary Checkpoint examinations",
            "House leadership and community service initiatives",
          ],
          keySubjects: ["Integrated Sciences", "Advanced Algebra & Geometry", "World History & African Geography", "Design & Tech", "French / Mandarin Options"],
          classRatio: "1:15 Teacher to Student",
          credentials: "Cambridge Lower Secondary Checkpoint Diagnostic Reports",
        },
        {
          id: "upper-secondary",
          name: "Upper Secondary & Sixth Form",
          age: "Ages 15 – 18 (IGCSE & A-Levels)",
          focus: "World-Class University Preparation & Pre-Professional Mastery",
          description:
            "The pinnacle of secondary education. Rigorous Cambridge IGCSE and International A-Level curricula coupled with tailored university admissions counselling for top global institutions.",
          highlights: [
            "100% university admission rate across 5 continents",
            "Individual Ivy League, Oxbridge & European guidance",
            "Specialized research dissertations & Olympiad coaching",
            "Senior prefects and executive student council governance",
          ],
          keySubjects: ["Pure Mathematics & Mechanics", "Advanced Physics & Chemistry", "Economics & Business Strategy", "Computer Science & AI", "Literature in English"],
          classRatio: "1:10 Seminar Ratio",
          credentials: "Cambridge IGCSE & International A-Levels / Certificado Pré-Universitário",
        },
      ],
      pillars: [
        {
          title: "Bilingual Cognitive Advantage",
          desc: "Our dual-stream model produces students who switch with effortless fluency between Portuguese and English, unlocking premier universities and multinational careers.",
        },
        {
          title: "State-of-the-Art STEM Laboratories",
          desc: "From algorithmic programming and robotics to university-calibre chemistry and biological spectrometry, our learners apply theory to tangible challenges.",
        },
        {
          title: "Individualized University Advisory",
          desc: "Every Sixth Form student receives 1-on-1 mentorship starting in Grade 10: SAT/IELTS preparation, personal statement clinics, and portfolio curation.",
        },
        {
          title: "Character & Ethical Stewardship",
          desc: "Academic intellect without character is incomplete. Prestige instills resilience, cross-cultural empathy, and leadership dedicated to African and global progress.",
        },
      ],
    },
    experience: {
      badge: "THE PRESTIGE EXPERIENCE",
      heading: "A Living, Breathing Campus Where Passions Ignite",
      subheading:
        "Education at Prestige extends far beyond textbooks. We cultivate confident communicators, athletic champions, visionary artists, and compassionate community leaders.",
      tabs: [
        {
          id: "athletics",
          label: "Sports & Aquatics",
          title: "Championship Athletics & Physical Wellbeing",
          description:
            "Our world-class sports complex features an Olympic 25-metre heated competition pool, FIFA-grade football pitch, tennis courts, and high-performance strength facility.",
          stats: "14 Varsity Sports &bull; 8 Regional Championship Trophies",
          features: [
            "Prestige Swimming Academy with certified FINA coaches",
            "Competitive Football, Basketball, Volleyball & Tennis teams",
            "Inter-school Maputo League tournaments and travel fixtures",
            "Daily physical health, yoga, and athletic conditioning",
          ],
        },
        {
          id: "stem-robotics",
          label: "Robotics & Innovation",
          title: "Inventing Tomorrow in the Ada Lovelace Lab",
          description:
            "Students design micro-controllers, write autonomous navigation algorithms, build 3D prototypes, and compete in international robotics challenges.",
          stats: "Pan-African Robotics Olympiad Finalists &bull; 1:1 Device Policy",
          features: [
            "Autonomous robotics with Arduino and Raspberry Pi",
            "Python, C++, and AI machine-learning fundamentals",
            "3D printing, laser cutting, and architectural prototyping",
            "Annual Prestige Tech Expo & Shark Tank innovation pitch",
          ],
        },
        {
          id: "arts",
          label: "Performing Arts & Music",
          title: "Creative Expression on the World Stage",
          description:
            "From youth symphony orchestra performances to classical drama and digital media arts, students unleash their creative courage in our 450-seat auditorium.",
          stats: "2 Full-Scale Theatrical Productions Per Year &bull; 6 Instrumental Ensembles",
          features: [
            "Chamber orchestra, jazz band, and choral academy",
            "Annual Broadway-calibre musical theatre production",
            "Fine arts atelier: oil painting, ceramics & digital sculpture",
            "Sound engineering and digital music production studio",
          ],
        },
        {
          id: "leadership",
          label: "Model UN & Oratory",
          title: "Diplomacy, Debate & Global Citizenship",
          description:
            "Fostering articulate orators and compassionate diplomats who analyze international geopolitics, negotiate treaties, and champion community transformation.",
          stats: "Maputo Model UN Hosts &bull; 12 Best Delegate Awards",
          features: [
            "Prestige Debate Union competing internationally",
            "Model United Nations delegations to Geneva and Nairobi",
            "Student Prefect Executive Board & Student Court",
            "Weekly public speaking masterclasses and TEDx-style events",
          ],
        },
        {
          id: "expeditions",
          label: "Expeditions & Service",
          title: "Learning Beyond the Classroom Walls",
          description:
            "From marine ecology conservation along the Mozambican coastline to biodiversity research in Gorongosa National Park, learning is grounded in real-world responsibility.",
          stats: "5,000+ Annual Hours of Community Impact",
          features: [
            "Gorongosa Ecology & Conservation Field Expedition",
            "Maputo Bay Coral & Mangrove restoration project",
            "Community literacy outreach with local partner schools",
            "Duke of Edinburgh International Award Scheme",
          ],
        },
      ],
      housesTitle: "The Prestige House System",
      housesDesc:
        "Fostering camaraderie, mentorship across age groups, and spirited inter-house competitions in academics, athletics, and the arts.",
    },
    admissions: {
      badge: "AN INTELLIGENT ADMISSIONS JOURNEY",
      heading: "Your Gateway to World-Class Learning",
      subheading:
        "We have reimagined the enrollment experience to be transparent, responsive, and tailored for discerning families. Calculate fees, schedule visits, and track your application in real-time.",
      stepsTitle: "Our 6-Step Admission Journey",
      steps: [
        {
          step: "01",
          title: "Initial Enquiry",
          desc: "Submit an online enquiry or contact our admissions team on WhatsApp for prompt, personalized guidance.",
        },
        {
          step: "02",
          title: "Campus Experience & Tour",
          desc: "Walk our Sommerschield grounds, observe live classes, inspect our laboratories, and meet our academic leaders.",
        },
        {
          step: "03",
          title: "Online Application",
          desc: "Complete our streamlined application portal with previous academic records and student interests.",
        },
        {
          step: "04",
          title: "Assessment & Family Interview",
          desc: "Friendly age-appropriate diagnostic assessment and an informal leadership conversation with parents and student.",
        },
        {
          step: "05",
          title: "Formal Offer of Admission",
          desc: "Receive an official letter of acceptance outlining class allocation, fee schedules, and enrollment terms.",
        },
        {
          step: "06",
          title: "Onboarding & Welcome Week",
          desc: "Uniform fitting, iPad & LMS account setup, buddy pairing, and orientation for an effortless start.",
        },
      ],
      calculator: {
        title: "Tuition & Fee Estimator",
        subtitle: "Customize your child's academic stage and optional services to calculate transparent termly and annual fees.",
        selectStage: "Select Academic Division",
        dayVsBoarding: "Enrollment Type",
        dayStudent: "Day Scholar (8:00 - 15:30)",
        boardingStudent: "Weekly Boarding Scholar",
        transportOption: "Campus Transportation Service",
        transportLabel: "Air-conditioned secure shuttle (Maputo / Matola routes)",
        cateringOption: "Chef-Prepared Nutrition Plan",
        cateringLabel: "Organic morning tea, balanced hot lunch & afternoon snack",
        termlyTuition: "Estimated Termly Fee (3 Terms / Year)",
        annualTuition: "Estimated Annual Investment",
        disclaimer: "Figures are indicative for the 2026/2027 academic year and exclude registration deposit and Cambridge external exam fees.",
      },
      tourBooking: {
        title: "Book a Personalized Campus Tour",
        subtitle: "Experience Prestige firsthand. Guided private tours are held Monday through Friday with our admissions officers.",
        parentName: "Parent / Guardian Full Name",
        parentEmail: "Email Address",
        parentPhone: "Phone / WhatsApp Number (+258)",
        studentStage: "Target Grade / Academic Stage",
        preferredDate: "Preferred Visit Date",
        timeSlot: "Preferred Time Slot",
        focusArea: "Primary Area of Interest",
        submitBtn: "Confirm Campus Tour Reservation",
        successMsg: "Tour reservation confirmed! An admissions counselor will reach out via WhatsApp with your visitor security pass.",
      },
      tracker: {
        title: "Track Application Status",
        subtitle: "Already applied? Enter your reference number below to view your real-time enrollment progress.",
        placeholder: "e.g. PIA-2026-4081",
        checkBtn: "Check Status",
        demoHint: "Try demo codes: PIA-2026-4081, PIA-2026-9214, or PIA-2026-1105",
      },
    },
    calendar: {
      badge: "DYNAMIC EVENTS & NOTICES",
      heading: "School Life in Motion",
      subheading:
        "Stay informed on academic milestones, sporting tournaments, theatrical debuts, and parent briefing sessions.",
      filterAll: "All Events",
      filterAcademic: "Academic",
      filterSports: "Sports & Galas",
      filterArts: "Arts & Concerts",
      filterCommunity: "Community & Parents",
      rsvpBtn: "RSVP / Reserve Seat",
      downloadCal: "Export to Calendar",
    },
    news: {
      badge: "STORIES & ACADEMIC ACHIEVEMENTS",
      heading: "The Prestige Chronicle",
      subheading: "Celebrating student victories, faculty innovations, and campus milestones.",
      readMore: "Read Full Story",
    },
    testimonials: {
      badge: "TESTIMONIALS OF EXCELLENCE",
      heading: "Trusted by Discerning Families",
      subheading:
        "What ambassadors, corporate leaders, alumni, and proud parents say about their journey with Prestige International Academy.",
    },
    tourModal: {
      title: "Interactive Virtual Campus Experience",
      subtitle: "Explore our state-of-the-art Sommerschield campus facilities in 360° detail.",
      close: "Close Tour",
      exploreSpace: "Select Campus Location",
      keyHighlights: "Facility Specifications & Highlights",
      bookVisitForSpace: "Schedule an In-Person Tour of this Facility",
    },
    footer: {
      aboutText:
        "Prestige International Academy is Mozambique's flagship dual-stream day and boarding institution, empowering inquisitive minds to lead with integrity, academic distinction, and global purpose.",
      accreditations: "Accredited Cambridge International School &bull; Ministry of Education Mozambique Approved &bull; COBIS Member",
      quickLinks: "Quick Navigation",
      admissionsHeading: "Admissions Office",
      contactHeading: "Campus Location",
      portalAccess: "Prestige ONE Operations Platform",
      copyright: "Prestige International Academy. All rights reserved. Powered by Flectēre.",
    },
  },
  pt: {
    nav: {
      discover: "Conheça a Prestige",
      aboutUs: "Sobre a Academia",
      visionMission: "Visão & Princípios",
      leadership: "Corpo Directivo",
      campusFacilities: "Campus & Instalações",
      virtualTour: "Visita Virtual ao Campus",
      academics: "Área Académica",
      curriculum: "Currículo Cambridge & Nacional",
      stages: "Fases Académicas (3 aos 18 Anos)",
      philosophy: "Filosofia de Ensino",
      outcomes: "Colocações Universitárias Globais",
      admissions: "Admissões",
      howToApply: "Como Candidatar-se",
      feeCalculator: "Calculadora de Propinas",
      scheduleVisit: "Agendar Visita ao Campus",
      applicationTracker: "Acompanhar Candidatura",
      campusLife: "Vida no Campus",
      sportsAthletics: "Desporto & Complexo Aquático",
      clubsSocieties: "Clubes & Sociedades",
      artsCulture: "Artes & Estúdio Cénico",
      achievements: "Distinções & Prémios",
      newsCommunity: "Notícias & Comunidade",
      calendar: "Calendário Escolar & Eventos",
      schoolStories: "Notícias & Publicações",
      alumni: "Rede de Ex-Alunos",
      connect: "Contacto",
      contactUs: "Contactar Admissões",
      portalLogin: "Entrar no Portal",
      applyNow: "Candidatar-se",
    },
    hero: {
      tagline: "UMA JANELA PARA O FUTURO",
      title: "Onde Mentes Globais Florescem",
      subtitle:
        "Cultivando os líderes de amanhã através da excelência académica, inovação científica e uma educação internacional de referência em Sommerschield, Maputo.",
      scheduleVisit: "Agendar Visita ao Campus",
      explorePrograms: "Explorar Programas",
      virtualTourBtn: "Visita Virtual Interactiva",
      stats: {
        curriculumTitle: "Currículo Cambridge & Nacional",
        curriculumDesc: "Certificações IGCSE, A-Levels e Diploma Nacional",
        nationalitiesTitle: "35+ Nacionalidades",
        nationalitiesDesc: "Uma comunidade cosmopolita e vibrante",
        universityTitle: "100% Encaminhamento Universitário",
        universityDesc: "Acesso orientado às melhores universidades do mundo",
        stemTitle: "Inovação STEM & Artes",
        stemDesc: "Laboratórios de robótica, IA e expressão cénica",
        safetyTitle: "Campus Seguro & Inspirador",
        safetyDesc: "Apoio pastoral dedicado ao florescimento do aluno",
      },
    },
    academics: {
      badge: "EXCELÊNCIA ACADÉMICA",
      heading: "Ensino Bilingue de Padrão Internacional",
      subheading:
        "Da curiosidade infantil à especialização pré-universitária, o nosso currículo combina o rigor dos padrões de Cambridge com a herança cultural de Moçambique.",
      stagesTitle: "Explore os Ciclos de Ensino",
      stagesSubtitle:
        "Selecione um ciclo abaixo para consultar o foco curricular, proporção professor-aluno e certificações internacionais.",
      stages: [
        {
          id: "eyfs",
          name: "Educação Pré-Escolar",
          age: "3 aos 5 Anos (Infantil)",
          focus: "Investigação, Literacia Bilingue & Descoberta Sensorial",
          description:
            "Desenvolvimento infantil inspirado em Reggio-Emilia e Montessori, estimulando o maravilhamento, literacia em Português e Inglês, e segurança socioemocional.",
          highlights: [
            "Ambiente de imersão bilingue diário",
            "Atelier sensorial ao ar livre e contacto botânico",
            "Conceitos numéricos iniciais através de exploração lúdica",
            "Área recreativa e piscina infantil exclusivas e seguras",
          ],
          keySubjects: ["Literacia Inicial & Fonética", "Matemática Lúdica", "Expressão Artística", "Ciências do Meio", "Psicomotricidade"],
          classRatio: "1:7 Professor por Alunos",
          credentials: "Quadro Internacional de Marcos de Desenvolvimento Infantil",
        },
        {
          id: "primary",
          name: "Ensino Primário Cambridge",
          age: "6 aos 10 Anos (1ª à 5ª Classe)",
          focus: "Pensamento Crítico, Fluência Bilingue & Domínio Matemático",
          description:
            "Uma base académica sólida e estimulante que desenvolve resolução de problemas, leitura compreensiva, investigação científica prática e literacia digital.",
          highlights: [
            "Preparação para o exame Cambridge Primary Checkpoint",
            "Instrução bilingue dual-stream (Português / Inglês)",
            "Currículo precoce de robótica e programação",
            "Natação regular, educação musical e artes visuais",
          ],
          keySubjects: ["Matemática", "Inglês & Português", "Ciências Naturais", "Computação & Robótica", "Perspectivas Globais"],
          classRatio: "1:12 Professor por Alunos",
          credentials: "Cambridge Primary Checkpoint & Certificação Nacional",
        },
        {
          id: "lower-secondary",
          name: "Ensino Secundário Geral",
          age: "11 aos 14 Anos (6ª à 8ª Classe)",
          focus: "Amplitude Científica, Humanidades & Liderança Emergente",
          description:
            "Transição para aulas leccionadas por professores especialistas em ciências laboratoriais, humanidades e tecnologia, desenvolvendo hábitos de pesquisa independente.",
          highlights: [
            "Laboratórios especializados de Biologia, Química e Física",
            "Sociedade de Debate e Modelo das Nações Unidas (MUN)",
            "Exames de diagnóstico Cambridge Lower Secondary",
            "Sistema de Casas e iniciativas de impacto comunitário",
          ],
          keySubjects: ["Ciências Integradas", "Álgebra & Geometria Avançada", "História Mundial & Geografia", "Design & Tecnologia", "Opção de Francês / Mandarim"],
          classRatio: "1:15 Professor por Alunos",
          credentials: "Relatórios de Diagnóstico Cambridge Lower Secondary Checkpoint",
        },
        {
          id: "upper-secondary",
          name: "Secundário Superior & Sixth Form",
          age: "15 aos 18 Anos (IGCSE & A-Levels)",
          focus: "Preparação Universitária de Topo & Rigor Pré-Profissional",
          description:
            "O culminar da jornada escolar. Currículos Cambridge IGCSE e International A-Levels com mentoria individualizada para admissão nas mais conceituadas universidades do mundo.",
          highlights: [
            "100% de admissão universitária em 5 continentes",
            "Mentoria individual para Oxbridge, Ivy League e Europa",
            "Dissertações de pesquisa orientadas e preparação para Olimpíadas",
            "Quadro executivo de prefeitos e governo estudantil",
          ],
          keySubjects: ["Matemática Pura & Mecânica", "Física & Química Avançada", "Economia & Gestão Estratégica", "Ciência da Computação & IA", "Literatura"],
          classRatio: "1:10 Formato Seminário",
          credentials: "Cambridge IGCSE & International A-Levels / Certificado Pré-Universitário",
        },
      ],
      pillars: [
        {
          title: "Vantagem Cognitiva Bilingue",
          desc: "O nosso modelo dual-stream forma alunos com fluência natural em Português e Inglês, abrindo portas para universidades de prestígio e carreiras internacionais.",
        },
        {
          title: "Laboratórios STEM de Última Geração",
          desc: "Da robótica autónoma e programação de IA à espectrometria biológica e química avançada, os alunos transformam teoria em inovação tangível.",
        },
        {
          title: "Aconselhamento Universitário Personalizado",
          desc: "Cada aluno do Sixth Form beneficia de aconselhamento individual a partir do 10º ano: preparação para SAT/IELTS, cartas de motivação e portefólios.",
        },
        {
          title: "Ética, Carácter e Liderança Cívica",
          desc: "O intelecto sem carácter está incompleto. A Prestige incute valores de empatia, integridade moral e liderança comprometida com Moçambique e o mundo.",
        },
      ],
    },
    experience: {
      badge: "A EXPERIÊNCIA PRESTIGE",
      heading: "Um Campus Vivo Onde o Talento se Transforma em Excelência",
      subheading:
        "A educação na Prestige vai muito além dos manuais escolares. Formamos comunicadores seguros, atletas disciplinados, artistas criativos e líderes solidários.",
      tabs: [
        {
          id: "athletics",
          label: "Desporto & Aquática",
          title: "Desporto de Alta Competição & Saúde Integral",
          description:
            "O nosso complexo desportivo inclui piscina olímpica de 25 metros aquecida, campo de futebol com relva sintética padrão FIFA, campos de ténis e ginásio de condicionamento.",
          stats: "14 Modalidades Desportivas &bull; 8 Troféus Regionais",
          features: [
            "Academia de Natação com treinadores certificados pela FINA",
            "Equipas de Futebol, Basquetebol, Voleibol e Ténis",
            "Torneios regulares na Liga Escolar de Maputo e viagens competitivas",
            "Sessões diárias de condição física, mobilidade e bem-estar",
          ],
        },
        {
          id: "stem-robotics",
          label: "Robótica & Inovação",
          title: "Inventar o Futuro no Laboratório Ada Lovelace",
          description:
            "Os alunos desenham microcontroladores, programam algoritmos de navegação autónoma, imprimem protótipos em 3D e participam em competições internacionais de robótica.",
          stats: "Finalistas da Olimpíada Pan-Africana de Robótica &bull; Política 1:1 de Dispositivos",
          features: [
            "Robótica avançada com plataformas Arduino e Raspberry Pi",
            "Fundamentos de Python, C++ e aprendizagem automática (IA)",
            "Impressão tridimensional, corte a laser e desenho arquitetónico",
            "Feira anual Prestige Tech Expo e concurso de empreendedorismo juvenil",
          ],
        },
        {
          id: "arts",
          label: "Música & Artes Cénicas",
          title: "Expressão Criativa nos Grandes Palcos",
          description:
            "De concertos da orquestra juvenil a clássicos do teatro dramático e artes visuais digitais, os alunos cultivam coragem artística no nosso auditório com 450 lugares.",
          stats: "2 Grandes Produções Teatrais Anuais &bull; 6 Grupos Instrumentais",
          features: [
            "Orquestra de câmara, ensemble de jazz e coro polifónico",
            "Grande musical escolar anual com padrões cénicos profissionais",
            "Atelier de artes: pintura a óleo, cerâmica e escultura digital",
            "Estúdio de captação e produção áudio digital",
          ],
        },
        {
          id: "leadership",
          label: "Modelo ONU & Debate",
          title: "Diplomacia, Oratória & Cidadania Global",
          description:
            "Capacitamos oradores articulados e diplomatas conscientes que debatem geopolítica internacional, redigem resoluções e lideram causas comunitárias.",
          stats: "Anfitriões do Maputo MUN &bull; 12 Prémios de Melhor Delegado",
          features: [
            "Clube de Debate Prestige com participações internacionais",
            "Delegações para conferências Modelo ONU em Genebra e Nairobi",
            "Conselho Executivo de Prefeitos e Tribunal Estudantil",
            "Masterclasses semanais de retórica e formato conferência TEDx",
          ],
        },
        {
          id: "expeditions",
          label: "Expedições & Serviço",
          title: "Aprendizagem Fora dos Muros da Sala de Aula",
          description:
            "Da preservação ecológica marinha ao longo do Índico à investigação de biodiversidade no Parque Nacional da Gorongosa, o conhecimento traduz-se em ação responsável.",
          stats: "Mais de 5.000 Horas Anuais de Voluntariado e Impacto Social",
          features: [
            "Expedição científica e ecológica ao Parque Nacional da Gorongosa",
            "Projecto de reflorestação de mangais e corais na Baía de Maputo",
            "Programa de apoio e literacia com escolas primárias parceiras",
            "Prémio Internacional Duque de Edimburgo",
          ],
        },
      ],
      housesTitle: "O Sistema de Casas Prestige",
      housesDesc:
        "Estimulando o espírito de equipa, a mentoria entre diferentes faixas etárias e competições amigáveis nos domínios académico, desportivo e artístico.",
    },
    admissions: {
      badge: "PROCESSO DE ADMISSÃO INTELIGENTE",
      heading: "A Sua Porta de Entrada para um Futuro de Excelência",
      subheading:
        "Transformámos o processo de matrícula numa experiência ágil, transparente e atenta às necessidades das famílias. Calcule propinas, agende a sua visita e acompanhe o processo online.",
      stepsTitle: "O Nosso Itinerário de Admissão em 6 Passos",
      steps: [
        {
          step: "01",
          title: "Contacto Inicial",
          desc: "Submeta o formulário online ou fale connosco pelo WhatsApp para atendimento personalizado e esclarecimento de dúvidas.",
        },
        {
          step: "02",
          title: "Visita Privada ao Campus",
          desc: "Venha conhecer as nossas instalações em Sommerschield, assistir a aulas, ver os laboratórios e conversar com os directores.",
        },
        {
          step: "03",
          title: "Candidatura Digital",
          desc: "Preencha a candidatura no portal, anexando o historial escolar e interesses do candidato de forma rápida e segura.",
        },
        {
          step: "04",
          title: "Avaliação & Entrevista Familiar",
          desc: "Pequena avaliação diagnóstica adequada à idade e uma conversa amigável entre a direcção, os pais e o estudante.",
        },
        {
          step: "05",
          title: "Carta de Admissão Formal",
          desc: "Receba a confirmação oficial de vaga com a atribuição de turma, calendário de pagamentos e documentação final.",
        },
        {
          step: "06",
          title: "Semana de Acolhimento",
          desc: "Prova de fardamento, atribuição de contas digitais e iPad escolar, ligação a um aluno-padrinho e integração feliz.",
        },
      ],
      calculator: {
        title: "Estimador de Propinas e Serviços",
        subtitle: "Personalize o ciclo escolar e os serviços opcionais para obter o cálculo transparente por período e anual.",
        selectStage: "Selecione o Ciclo de Ensino",
        dayVsBoarding: "Regime de Matrícula",
        dayStudent: "Externato (8h00 às 15h30)",
        boardingStudent: "Internato Semanal",
        transportOption: "Serviço de Transporte Escolar",
        transportLabel: "Frota moderna climatizada com monitor (Rotas Maputo e Matola)",
        cateringOption: "Plano Alimentar Saudável do Chef",
        cateringLabel: "Lanche da manhã biológico, almoço quente equilibrado e lanche da tarde",
        termlyTuition: "Valor Estimado por Período (3 Períodos / Ano)",
        annualTuition: "Investimento Global Anual",
        disclaimer: "Valores indicativos para o ano letivo de 2026/2027, sujeitos a confirmação final. Não incluem taxa de inscrição nem exames externos de Cambridge.",
      },
      tourBooking: {
        title: "Agende a Sua Visita Personalizada ao Campus",
        subtitle: "Descubra a energia do nosso campus. As visitas guiadas decorrem de segunda a sexta-feira com a equipa de admissões.",
        parentName: "Nome Completo do Encarregado de Educação",
        parentEmail: "Endereço de E-mail",
        parentPhone: "Contacto Telefónico / WhatsApp (+258)",
        studentStage: "Classe / Ciclo Pretendido",
        preferredDate: "Data de Preferência",
        timeSlot: "Horário de Preferência",
        focusArea: "Área de Maior Interesse na Visita",
        submitBtn: "Confirmar Reserva da Visita",
        successMsg: "Visita confirmada com sucesso! A nossa equipa entrará em contacto via WhatsApp com o seu passe de acesso ao campus.",
      },
      tracker: {
        title: "Acompanhar Estado da Candidatura",
        subtitle: "Já submeteu a sua candidatura? Insira o código de referência para consultar a evolução em tempo real.",
        placeholder: "ex: PIA-2026-4081",
        checkBtn: "Consultar Estado",
        demoHint: "Códigos de teste demonstrativos: PIA-2026-4081, PIA-2026-9214 ou PIA-2026-1105",
      },
    },
    calendar: {
      badge: "AGENDA ESCOLAR EM TEMPO REAL",
      heading: "A Vida Escolar em Movimento",
      subheading:
        "Mantenha-se informado sobre datas de exames, galas desportivas, estreias cénicas e encontros de encarregados de educação.",
      filterAll: "Todos os Eventos",
      filterAcademic: "Académico",
      filterSports: "Desporto & Torneios",
      filterArts: "Artes & Concertos",
      filterCommunity: "Comunidade & Pais",
      rsvpBtn: "Confirmar Presença",
      downloadCal: "Exportar para Calendário",
    },
    news: {
      badge: "HISTÓRIAS & CONQUISTAS ESCOLARES",
      heading: "A Crónica da Prestige",
      subheading: "Notícias, conquistas dos alunos e avanços no nosso ecossistema de ensino.",
      readMore: "Ler Notícia Completa",
    },
    testimonials: {
      badge: "TESTEMUNHOS DE EXCELÊNCIA",
      heading: "A Confiança das Famílias que Nos Escolhem",
      subheading:
        "Depoimentos de diplomatas, empresários, antigos alunos e encarregados de educação sobre a experiência na Prestige International Academy.",
    },
    tourModal: {
      title: "Visita Virtual Interactiva ao Campus",
      subtitle: "Explore em detalhe as instalações modernas do nosso campus em Sommerschield.",
      close: "Fechar Visita",
      exploreSpace: "Escolha o Espaço a Visitar",
      keyHighlights: "Especificações & Destaques da Instalação",
      bookVisitForSpace: "Agendar Visita Presencial a Este Espaço",
    },
    footer: {
      aboutText:
        "A Prestige International Academy é uma instituição de ensino de referência em Moçambique, oferecendo regime de externato e internato, capacitando mentes curiosas a liderar com integridade e distinção global.",
      accreditations: "Escola Internacional Acreditada por Cambridge &bull; Homologada pelo Ministério da Educação e Desenvolvimento Humano de Moçambique &bull; Membro COBIS",
      quickLinks: "Navegação Rápida",
      admissionsHeading: "Gabinete de Admissões",
      contactHeading: "Localização do Campus",
      portalAccess: "Plataforma de Gestão Prestige ONE",
      copyright: "Prestige International Academy. Todos os direitos reservados. Desenvolvido por Flectēre.",
    },
  },
};
