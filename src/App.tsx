/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { 
  ArrowUpRight, 
  Mail, 
  Phone, 
  Clock, 
  MapPin, 
  ExternalLink, 
  Award, 
  Music, 
  Briefcase, 
  GraduationCap, 
  Wrench,
  ChevronRight,
  Trophy,
  X
} from "lucide-react";

interface Project {
  title: string;
  category: string;
  year: string;
  image: string;
  contribution?: string;
  description?: string;
  details?: string[];
  objectPosition?: string;
}

const SectionTitle = ({ children, id, sideLabel }: { children: React.ReactNode; id?: string; sideLabel?: string }) => (
  <div id={id} className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-12 border-t border-gray-100 pt-24">
    <div className="lg:col-span-3">
      <span className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.2em]">
        {sideLabel || children}
      </span>
    </div>
    <div className="lg:col-span-9">
      {sideLabel && <h2 className="text-sm font-mono text-gray-400 uppercase tracking-[0.2em]">{children}</h2>}
    </div>
  </div>
);

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  key?: React.Key;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="group cursor-pointer"
    onClick={() => onClick(project)}
  >
    <div className="relative aspect-[3/2] overflow-hidden bg-gray-100 mb-8">
      <img 
        src={project.image} 
        alt={project.title} 
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
        style={{ objectPosition: project.objectPosition || "center" }}
        referrerPolicy="no-referrer"
      />
      {project.contribution && (
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 text-[9px] font-mono uppercase tracking-[0.15em] shadow-sm">
          {project.contribution}
        </div>
      )}
    </div>
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-lg font-medium group-hover:text-gray-600 transition-colors leading-tight">{project.title}</h3>
        <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mt-1">{project.category}</p>
      </div>
      <span className="text-[10px] font-mono border border-gray-200 px-1.5 py-0.5">{project.year}</span>
    </div>
  </motion.div>
);

const ProjectModal = ({ project, onClose }: { project: Project | null; onClose: () => void }) => (
  <AnimatePresence>
    {project && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] cursor-zoom-out"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed inset-4 md:inset-10 lg:inset-20 bg-white z-[101] overflow-hidden flex flex-col md:flex-row shadow-2xl rounded-sm"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-[102] p-2 bg-white/80 backdrop-blur-md rounded-full hover:bg-black hover:text-white transition-all shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-full md:w-fit max-w-[45%] h-64 md:h-auto overflow-hidden flex items-center bg-white">
              <img 
                src={project.image} 
                alt={project.title} 
                className="h-full w-auto object-contain"
                referrerPolicy="no-referrer"
              />
          </div>

          <div className="flex-1 p-10 md:p-16 lg:p-24 overflow-y-auto flex flex-col">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-mono bg-black text-white px-2 py-0.5">{project.year}</span>
                <span className="text-[10px] font-mono border border-black px-2 py-0.5 uppercase tracking-widest">{project.category}</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">{project.title}</h2>
              {project.description && (
                <p className="text-lg text-gray-600 leading-relaxed mb-8 font-serif italic">
                  {project.description}
                </p>
              )}
            </div>

            <div className="space-y-8 flex-1">
              {project.details && (
                <div>
                  <h4 className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.2em] mb-4">Key Achievements</h4>
                  <ul className="space-y-3">
                    {project.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                        <ChevronRight className="w-4 h-4 mt-0.5 text-gray-300 shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                <div>
                  <h4 className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.2em] mb-2">Contribution</h4>
                  <p className="text-2xl font-medium">{project.contribution}</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.2em] mb-2">Role</h4>
                  <p className="text-sm text-gray-600">Project Manager / Lead</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Lee Geun-il Portfolio</span>
              <button 
                onClick={onClose}
                className="text-sm font-medium hover:underline flex items-center gap-2"
              >
                Close Project
              </button>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

export default function App() {
  const [time, setTime] = useState(new Date());
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject]);

  const formattedTime = time.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: true 
  });

  const featuredProjects: Project[] = [
    {
      title: "WATERBOMB 2024 SEOUL",
      category: "Operation",
      year: "2024",
      image: "https://raw.githubusercontent.com/2green-lee/Portfolio/9d41580d7739017f4b186f92faf6491a60264fd5/2024waterbomb.png",
      contribution: "85%",
      description: "2024년 서울에서 개최된 대규모 워터 페스티벌의 통합 현장 운영 및 관리 시스템 구축.",
      details: [
        "서울 스테이지 및 관객 구역 통합 현장 운영 및 관리",
        "관객 접점 전반의 운영 프로세스 설계 및 실행",
        "자체 앱 및 키오스크를 연계한 온-오프라인 통합 결제 시스템 관리"
      ]
    },
    {
      title: "BUSAN INT'L ROCK FESTIVAL 2024",
      category: "Operation",
      year: "2024",
      image: "https://raw.githubusercontent.com/2green-lee/Portfolio/301715e6090e002a7c306c6d76f35d8d78ed92f4/2024bsrock.png",
      contribution: "90%",
      objectPosition: "top",
      description: "부산국제록페스티벌의 공식 MD 및 아티스트 굿즈 판매 부스 운영 총괄.",
      details: [
        "공식 MD 및 아티스트 굿즈 판매 부스 운영",
        "주최측과의 실시간 커뮤니케이션 및 재고 관리",
        "현장 인력 교육 및 효율적인 대기 라인 관리"
      ]
    },
    {
      title: "INCHEON PENTAPORT ROCK FESTIVAL 2024",
      category: "Operation",
      year: "2024",
      image: "https://raw.githubusercontent.com/2green-lee/Portfolio/301715e6090e002a7c306c6d76f35d8d78ed92f4/2024incheonrock.png",
      contribution: "80%",
      description: "국내 최대 규모의 록 페스티벌 F&B 사전 예약 시스템 구축 및 운영.",
      details: [
        "시간 단위 F&B 사전 예약 시스템 구축",
        "대기 시간 최소화를 위한 현장 운영 가이드라인 설계",
        "클라이언트 및 입점 업체 통합 관리"
      ]
    },
    {
      title: "CHAM FESTIVAL 2024",
      category: "Operation",
      year: "2024",
      image: "https://raw.githubusercontent.com/2green-lee/Portfolio/301715e6090e002a7c306c6d76f35d8d78ed92f4/2024cham.jpg",
      contribution: "75%",
      description: "대규모 페스티벌의 현장 운영 최적화 및 관객 서비스 관리.",
      details: [
        "현장 운영 프로세스 최적화",
        "관객 동선 및 안전 관리 시스템 구축",
        "F&B 및 편의시설 통합 운영 관리"
      ]
    }
  ];

  const personalProjects: Project[] = [
    {
      title: "GREENERY EP & Artbook",
      category: "Music",
      year: "2023",
      image: "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img5.png",
      contribution: "95%",
      description: "싱어송라이터 '이그린'의 EP 발매 및 작업기를 담은 아트북 형태의 앨범 제작.",
      details: [
        "EP 앨범 전곡 작사, 작곡 및 프로듀싱",
        "아트북 형태의 패키지 디자인 및 상품 기획",
        "크라우드펀딩을 통한 제작비 조달 및 마케팅"
      ]
    },
    {
      title: "Flower Planet",
      category: "Concert",
      year: "2022",
      image: "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img4.jpg",
      contribution: "100%",
      objectPosition: "top",
      description: "부산과 서울의 아티스트들이 협업하는 콜라보레이션 공연 기획 및 운영.",
      details: [
        "부산-서울 아티스트 콜라보레이션 공연 기획",
        "공연장 대관 및 기술 스태프 조율",
        "티켓 예매 시스템 관리 및 현장 운영"
      ]
    },
    {
      title: "Concept Performance Series",
      category: "Planning",
      year: "2021",
      image: "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img3.jpg",
      contribution: "100%",
      objectPosition: "top",
      description: "테마 중심의 인디 공연 시리즈 [열대야], [오후의 향기], [야간비행] 기획.",
      details: [
        "테마별 컨셉 설정 및 공간 연출 기획",
        "인디 아티스트 섭외 및 프로그램 구성",
        "공연 브랜딩 및 홍보 콘텐츠 제작"
      ]
    },
    {
      title: "Visual Content Archive",
      category: "Creative",
      year: "2021",
      image: "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img2.jpg",
      contribution: "100%",
      objectPosition: "top",
      description: "다양한 예술적 시각을 담은 개인 작업 및 콘텐츠 아카이빙.",
      details: [
        "시각적 스토리텔링을 위한 이미지 기획",
        "브랜드 아이덴티티를 반영한 콘텐츠 제작",
        "다양한 매체를 활용한 실험적 디자인"
      ]
    },
    {
      title: "Creative Direction Project",
      category: "Direction",
      year: "2020",
      image: "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img1.jpg",
      contribution: "100%",
      description: "초기 기획부터 최종 결과물까지의 크리에이티브 디렉션 작업.",
      details: [
        "프로젝트 전반의 비주얼 디렉팅",
        "컨셉 도출 및 전략적 기획 수립",
        "최종 결과물의 품질 관리 및 배포"
      ]
    }
  ];

  return (
    <div className="min-h-screen font-sans selection:bg-black selection:text-white">
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      {/* Navigation */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold tracking-tighter">Lee Geun-il®</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#projects" className="hover:text-gray-500 transition-colors">Projects</a>
            <a href="#about" className="hover:text-gray-500 transition-colors">About</a>
            <a href="#contact" className="hover:text-gray-500 transition-colors">Contact</a>
          </nav>

          <div className="hidden lg:flex items-center gap-8 text-[11px] font-mono text-gray-500 uppercase tracking-widest">
            <div className="flex flex-col">
              <span>Instagram</span>
              <a href="#" className="text-black hover:underline">@leegreen</a>
            </div>
            <div className="flex flex-col">
              <span>Location</span>
              <span className="text-black">Busan, KR</span>
            </div>
            <div className="flex flex-col text-right">
              <span>Local Time</span>
              <span className="text-black">{formattedTime}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-48 pb-48">
        {/* Hero Section */}
        <section className="mb-40 pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-end">
            <div className="lg:col-span-8">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.05] mb-12"
              >
                <span className="font-serif italic text-gray-400">Creative Strategist</span> & <span className="font-serif italic text-gray-400">Problem Solver</span>: Designing Solutions from Concept to Impact.
              </motion.h1>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-4">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg text-gray-600 leading-relaxed"
              >
                항공우주공학의 논리와 예술문화영상의 감각을 결합하여 대규모 페스티벌 운영부터 창의적인 콘텐츠 기획까지, 효율적이고 감각적인 결과물을 만들어냅니다.
              </motion.p>
              <div className="flex gap-8">
                <a href="#projects" className="flex items-center gap-2 text-sm font-medium hover:underline group">
                  Check all projects <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <a href="#contact" className="flex items-center gap-2 text-sm font-medium hover:underline group">
                  Contact Me <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <div id="projects" className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-40">
          <div className="lg:col-span-3">
            <div className="sticky top-32 space-y-4">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.2em]">
                Work & Projects
              </span>
              <nav className="flex flex-col gap-2 text-[10px] font-mono uppercase tracking-widest">
                <a href="#featured" className="hover:text-black transition-colors">01. Featured</a>
                <a href="#personal" className="hover:text-black transition-colors">02. Personal</a>
              </nav>
            </div>
          </div>
          
          <div className="lg:col-span-9">
            {/* Featured Projects */}
            <div id="featured" className="mb-24">
              <div className="flex justify-between items-end mb-6 border-b border-gray-100 pb-4">
                <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-gray-400">01. Featured Projects</h2>
                <span className="text-[10px] font-mono text-gray-400">Festival Operation</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-32">
                {featuredProjects.map((project, idx) => (
                  <ProjectCard 
                    key={idx}
                    project={project}
                    onClick={setSelectedProject}
                  />
                ))}
              </div>
            </div>

            {/* Personal Projects */}
            <div id="personal">
              <div className="flex justify-between items-end mb-6 border-b border-gray-100 pb-4">
                <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-gray-400">02. Personal Projects</h2>
                <span className="text-[10px] font-mono text-gray-400">Creative & Music</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-32">
                {personalProjects.map((project, idx) => (
                  <ProjectCard 
                    key={idx}
                    project={project}
                    onClick={setSelectedProject}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Professional Profile Section */}
        <section className="mb-40">
          <SectionTitle id="about" sideLabel="Profile">Professional Profile</SectionTitle>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            {/* Left: Display Intro */}
            <div className="lg:col-span-6">
              <div className="sticky top-32">
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-tight mb-6">
                  Engineering logic meets <br />
                  <span className="text-gray-400 italic font-serif">creative vision.</span>
                </h2>
                <div className="space-y-8 max-w-lg">
                  <p className="text-xl text-gray-600 leading-relaxed">
                    항공우주공학의 <span className="text-black font-medium">논리적 설계</span>와 예술문화영상의 <span className="text-black font-medium">감각적 기획</span>을 결합합니다. 대규모 페스티벌 운영부터 창의적인 콘텐츠 제작까지, 효율과 감각의 균형을 추구합니다.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {["Project Management", "Content Creation", "Operation Design", "Sound Engineering"].map(tag => (
                      <span key={tag} className="text-[10px] font-mono border border-gray-200 px-3 py-1 uppercase tracking-widest text-gray-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Experience Timeline */}
            <div className="lg:col-span-6">
              <div className="space-y-24">
                <div>
                  <h4 className="text-[10px] font-mono uppercase tracking-[0.4em] text-gray-300 mb-6 flex items-center gap-3">
                    <div className="w-8 h-[1px] bg-gray-200" /> Professional Experience
                  </h4>
                  <div className="space-y-20">
                    {[
                      {
                        company: "㈜ 퀸즈스마일",
                        role: "기획/운영 PM",
                        period: "2024.05 – 2024.11",
                        desc: [
                          "국내외 페스티벌 및 공연 기획·운영",
                          "자사 플랫폼 관리 및 고객 응대",
                          "UX/UI 개선 협업",
                          "고객 서비스 채널 운영 및 대응 프로세스 관리"
                        ]
                      },
                      {
                        company: "㈜ 드림씨어터",
                        role: "하우스 어텐던트",
                        period: "2019.10 – 2022.05",
                        desc: [
                          "대형 라이선스 공연 관객 서비스 및 운영 지원",
                          "좌석/티켓/지연 관객 등 현장 돌발 이슈 대응",
                          "공연장 운영 프로세스 이행 및 관객 경험 관리",
                          "공연 전/후 객석 및 시설 점검 등 현장 전반 지원"
                        ]
                      }
                    ].map((exp, i) => (
                      <div key={i} className="group relative">
                        <div className="flex flex-col mb-6">
                          <div className="flex justify-between items-baseline mb-2">
                            <h5 className="text-2xl font-medium group-hover:text-gray-600 transition-colors">{exp.company}</h5>
                            <span className="text-[10px] font-mono text-gray-400">{exp.period}</span>
                          </div>
                          <span className="text-[11px] font-mono text-gray-400 uppercase tracking-[0.2em]">{exp.role}</span>
                        </div>
                        <ul className="space-y-3">
                          {exp.desc.map((item, j) => (
                            <li key={j} className="text-sm text-gray-500 flex items-start gap-3">
                              <span className="mt-2 w-1 h-1 rounded-full bg-gray-200 shrink-0 group-hover:bg-black transition-colors" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SUMMARY & SKILLS Section */}
        <section className="mb-40">
          <SectionTitle id="skills" sideLabel="Specifications">Summary & Skills</SectionTitle>
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-12 border border-gray-100">
              {/* 01. Education & 02. Certificates Module */}
              <div className="lg:col-span-4 flex flex-col border-b lg:border-b-0 lg:border-r border-gray-100">
                {/* Education Sub-module */}
                <div className="p-12 border-b border-gray-100 flex-1">
                  <div className="flex items-center gap-3 mb-6">
                    <GraduationCap className="w-3 h-3 text-gray-400" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-400">01. Education</span>
                  </div>
                  <div className="space-y-4">
                    {[
                      { school: "부산대학교", period: "2013 – 2021", major: "항공우주공학 & 예술문화영상학" },
                      { school: "부산 중앙고등학교", period: "2010 – 2012", major: "졸업" }
                    ].map((edu, i) => (
                      <div key={i} className="flex justify-between items-start gap-4">
                        <div>
                          <h5 className="font-medium text-base mb-1">{edu.school}</h5>
                          <p className="text-xs text-gray-500 font-mono uppercase tracking-tighter">{edu.major}</p>
                        </div>
                        <span className="text-[10px] font-mono text-gray-400 bg-gray-50 px-2 py-1">{edu.period}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Certificates Sub-module */}
                <div className="p-12 bg-gray-50/30">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-3 h-3 text-gray-400" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-400">02. Certificates</span>
                  </div>
                  <div className="grid grid-cols-1 gap-8">
                    {[
                      { title: "TOEIC SPEAKING", sub: "Advanced Low (AL)", value: 9, max: 11, label: "Level 9 / 11" },
                      { title: "TOEIC", sub: "830", value: 830, max: 990, label: "830 / 990" },
                      { title: "워드프로세서", sub: "단일등급" },
                      { title: "자동차운전면허", sub: "1종" }
                    ].map((cert, i) => (
                      <div key={i} className="group">
                        <div className="flex justify-between items-end mb-2">
                          <h5 className="text-xs font-medium group-hover:translate-x-1 transition-transform duration-300">{cert.title}</h5>
                          <span className="text-[8px] font-mono text-gray-400 uppercase tracking-widest">{cert.sub}</span>
                        </div>
                        {cert.value ? (
                          <div className="space-y-1.5">
                            <div className="h-[1px] w-full bg-gray-100 overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: `${(cert.value / cert.max) * 100}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, ease: "circOut" }}
                                className="h-full bg-gray-900"
                              />
                            </div>
                            <div className="flex justify-end">
                              <span className="text-[8px] font-mono text-gray-500 uppercase tracking-tighter">{cert.label}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="h-[1px] w-full bg-gray-100" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 03. Technical Stack Module */}
              <div className="lg:col-span-4 p-12 border-b lg:border-b-0 lg:border-r border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <Wrench className="w-3 h-3 text-gray-400" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-400">03. Technical Stack</span>
                </div>
                <div className="space-y-6">
                  {[
                    { label: "Design & Creative", items: ["Illustrator", "Photoshop", "Premiere Pro"] },
                    { label: "Audio Engineering", items: ["Logic Pro"] },
                    { label: "Management", items: ["Notion", "Flow"] },
                  ].map((group) => (
                    <div key={group.label}>
                      <p className="text-[9px] font-mono text-gray-300 uppercase mb-4 tracking-widest">{group.label}</p>
                      <ul className="space-y-2">
                        {group.items.map(item => (
                          <li key={item} className="text-sm font-medium flex items-center gap-2 group/item cursor-default">
                            <div className="w-1 h-1 bg-gray-200 rounded-full group-hover/item:bg-black group-hover/item:scale-150 transition-all duration-300" />
                            <span className="group-hover/item:translate-x-1 transition-transform duration-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* 04. Awards Module */}
              <div className="lg:col-span-4 p-12 bg-white">
                <div className="flex items-center gap-3 mb-10">
                  <Trophy className="w-3 h-3 text-gray-400" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-400">04. Awards</span>
                </div>
                <div className="space-y-12">
                  {[
                    { title: "HF 희망 캠페인 송 챌린지 공모전", organizer: "주택금융공사", year: "2020", award: "우수상" },
                    { title: "내가 만난 도시재생 UCC 공모전", organizer: "부산도시공사", year: "2020", award: "금상" },
                    { title: "부산대학교 창의미래설계 디딤돌 사업", organizer: "부산대학교", year: "2020", award: "우수상" },
                    { title: "제 1회 한국숲사랑청소년단 영상 공모전", organizer: "(사) 한국 숲사랑청소년단", year: "2019", award: "장려상" }
                  ].map((item, i) => (
                    <div key={i} className="group relative">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-[9px] font-mono text-gray-300 uppercase tracking-widest">{item.year}</span>
                        <span className="text-[9px] font-mono border border-gray-100 px-2 py-0.5 text-gray-400 group-hover:border-black group-hover:text-black transition-colors">{item.award}</span>
                      </div>
                      <h5 className="text-sm font-medium leading-snug mb-1 group-hover:translate-x-1 transition-transform duration-300">{item.title}</h5>
                      <p className="text-[10px] font-mono text-gray-400 uppercase tracking-tighter">{item.organizer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Activities Section */}
        <section className="mb-40">
          <SectionTitle id="activities" sideLabel="Projects">Key Activities</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
            {/* 01. Panaka Note - Large Card */}
            <div className="md:col-span-2 p-12 border border-gray-100 group hover:border-black transition-all duration-700 flex flex-col justify-between bg-white">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.3em]">01 / 파나카노트</span>
                  <span className="text-[10px] font-mono text-gray-400">2023</span>
                </div>
                <h5 className="text-4xl font-medium leading-[1.1] mb-4 group-hover:text-gray-600 transition-colors">
                  복합문화공간 <span className="italic font-serif">&lt;파나카노트&gt;</span><br />
                  공연 기획 PD & 음향감독
                </h5>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-[1px] bg-gray-200 group-hover:w-16 group-hover:bg-black transition-all duration-500" />
                <p className="text-sm text-gray-500 font-serif italic">공연 기획 및 운영 총괄</p>
              </div>
            </div>

            {/* 02. University & Organism - Highlighted Black Card */}
            <div className="md:col-span-1 p-12 bg-black text-white group transition-all duration-700 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
              <div>
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em]">02 / 부산문화재단</span>
                  <span className="text-[10px] font-mono text-gray-500">2021-2022</span>
                </div>
                <h5 className="text-2xl font-medium leading-tight mb-2 relative z-10">
                  청년 UNIVERSITY <br />& 유기체
                </h5>
                <p className="text-xs text-gray-400 uppercase tracking-[0.2em] font-mono relative z-10">기획자 신규양성 프로그램</p>
              </div>
              <div className="w-full h-[1px] bg-white/10 relative z-10">
                <div className="w-0 h-full bg-white group-hover:w-full transition-all duration-1000" />
              </div>
            </div>

            {/* 03. Artmoa - Horizontal Card */}
            <div className="md:col-span-1 p-12 border border-gray-100 group hover:border-black transition-all duration-700 flex flex-col justify-between bg-white">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-gray-400">2022-2023</span>
                  <span className="w-1 h-1 rounded-full bg-gray-200" />
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">03 / 예술경영지원센터</span>
                </div>
                <h5 className="text-xl font-medium group-hover:translate-x-2 transition-transform duration-500 leading-snug">아트모아 기자단 2기</h5>
                <p className="text-sm text-gray-500 leading-relaxed">예술 산업 인터뷰 및 콘텐츠 기획</p>
              </div>
            </div>

            {/* 04. Japan-Korea Exchange - Minimal Card */}
            <div className="md:col-span-1 p-12 border border-gray-100 group hover:border-black transition-all duration-700 flex flex-col justify-center text-center bg-gray-50/30">
              <span className="text-[9px] font-mono text-gray-300 uppercase tracking-[0.5em] mb-4">04 / Global Network</span>
              <h5 className="text-xl font-medium mb-2">부산 한일 청년 교류회</h5>
              <p className="text-xs text-gray-400 mb-6">글로벌 문화 교류 및 네트워킹</p>
              <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-100">
                <span className="text-[10px] font-mono text-gray-400">2019-2020</span>
                <span className="text-[10px] font-mono text-gray-200">/</span>
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-tighter">부산한일문화교류협회</span>
              </div>
            </div>

            {/* 05. Creator - New Card */}
            <div className="md:col-span-1 p-12 border border-gray-100 group hover:border-black transition-all duration-700 flex flex-col justify-between bg-white relative overflow-hidden">
              <div className="absolute bottom-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="text-7xl font-bold font-mono tracking-tighter">CREATIVE</span>
              </div>
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.3em]">05 / 부산대학교 동아리</span>
                  <span className="text-[10px] font-mono text-gray-400">2019-2021</span>
                </div>
                <h5 className="text-2xl font-medium leading-tight mb-2">CREATOR</h5>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed border-l-2 border-gray-100 pl-6 group-hover:border-black transition-colors">
                광고 콘텐츠 및 카피라이팅 기획·제작
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <SectionTitle id="contact">Get in touch</SectionTitle>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter mb-8">
              Interested to work with me?
            </h2>
            <p className="text-gray-500 mb-12 max-w-md">
              새로운 프로젝트 제안이나 협업 문의는 언제든 환영합니다. 
              논리적인 설계와 감각적인 기획이 필요한 곳에 함께하겠습니다.
            </p>
            <div className="space-y-4">
              <a href="mailto:lgil2@naver.com" className="flex items-center gap-4 text-xl hover:underline group">
                <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                lgil2@naver.com
              </a>
              <div className="flex items-center gap-4 text-xl">
                <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                010-9335-9620
              </div>
            </div>
          </div>
          <div className="bg-black text-white p-12 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-8">Availability</h4>
              <p className="text-2xl font-serif italic mb-2">Open for new projects</p>
              <p className="text-gray-400 text-sm">평일 09:00 - 18:00 (KST)</p>
            </div>
            <div className="pt-12 border-t border-gray-800 flex justify-between items-end">
              <div className="space-y-1">
                <p className="text-[10px] font-mono text-gray-500 uppercase">Social</p>
                <div className="flex gap-4">
                  <a href="#" className="text-sm hover:text-gray-400">Instagram</a>
                  <a href="#" className="text-sm hover:text-gray-400">LinkedIn</a>
                  <a href="#" className="text-sm hover:text-gray-400">Youtube</a>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-mono text-gray-500 uppercase">Based in</p>
                <p className="text-sm">Busan, South Korea</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 pt-20 pb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-12">
            <div className="text-[11px] font-mono text-gray-400 uppercase tracking-widest space-y-2">
              <p>Lee Geun-il ©2026</p>
              <p>All rights reserved</p>
            </div>
            <div className="text-[11px] font-mono text-gray-400 uppercase tracking-widest space-y-2 text-right">
              <p>Made with Logic & Vision</p>
              <p>Built with React & Tailwind</p>
            </div>
          </div>
          
          <motion.div 
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[15vw] font-bold tracking-tighter leading-none select-none pointer-events-none whitespace-nowrap -mb-8 opacity-[0.03] lg:opacity-[0.05]"
          >
            LeeGeunIlLeeGeunIl
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
