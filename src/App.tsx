/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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
}

const SectionTitle = ({ children, id, sideLabel }: { children: React.ReactNode; id?: string; sideLabel?: string }) => (
  <div id={id} className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12 border-t border-gray-100 pt-12">
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
    <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 mb-4">
      <img 
        src={project.image} 
        alt={project.title} 
        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000 ease-out"
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

          <div className="w-full md:w-3/5 h-64 md:h-auto bg-gray-100 overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="flex-1 p-8 md:p-12 lg:p-16 overflow-y-auto flex flex-col">
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
      image: "https://picsum.photos/seed/waterbomb-seoul-2024-vibrant/1200/1600",
      contribution: "85%",
      description: "2024년 서울에서 개최된 대규모 워터 페스티벌의 통합 현장 운영 및 관리 시스템 구축.",
      details: [
        "서울 스테이지 및 관객 구역 통합 현장 운영 및 관리",
        "관객 접점 전반의 운영 프로세스 설계 및 실행",
        "자체 앱 및 키오스크를 연계한 온-오프라인 통합 결제 시스템 관리"
      ]
    },
    {
      title: "Busan Int'l Rock Festival",
      category: "Operation",
      year: "2024",
      image: "https://picsum.photos/seed/rockfest/1200/800",
      contribution: "90%",
      description: "부산국제록페스티벌의 공식 MD 및 아티스트 굿즈 판매 부스 운영 총괄.",
      details: [
        "공식 MD 및 아티스트 굿즈 판매 부스 운영",
        "주최측과의 실시간 커뮤니케이션 및 재고 관리",
        "현장 인력 교육 및 효율적인 대기 라인 관리"
      ]
    },
    {
      title: "Incheon Pentaport Rock",
      category: "Operation",
      year: "2024",
      image: "https://picsum.photos/seed/penta/1200/800",
      contribution: "80%",
      description: "국내 최대 규모의 록 페스티벌 F&B 사전 예약 시스템 구축 및 운영.",
      details: [
        "시간 단위 F&B 사전 예약 시스템 구축",
        "대기 시간 최소화를 위한 현장 운영 가이드라인 설계",
        "클라이언트 및 입점 업체 통합 관리"
      ]
    },
    {
      title: "Isul Live Festival",
      category: "Operation",
      year: "2024",
      image: "https://picsum.photos/seed/isul/1200/800",
      contribution: "75%",
      description: "하이트진로 클라이언트 대응 및 단일 일정 페스티벌 F&B 최적화 운영.",
      details: [
        "하이트진로 클라이언트 대응 및 요구사항 반영",
        "단일 일정 대규모 인파 대응을 위한 동선 설계",
        "F&B 부스 운영 효율성 극대화"
      ]
    }
  ];

  const personalProjects: Project[] = [
    {
      title: "GREENERY EP & Artbook",
      category: "Music",
      year: "2023",
      image: "https://picsum.photos/seed/greenery/1200/800",
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
      image: "https://picsum.photos/seed/flower/1200/800",
      contribution: "100%",
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
      image: "https://picsum.photos/seed/concert/1200/800",
      contribution: "100%",
      description: "테마 중심의 인디 공연 시리즈 [열대야], [오후의 향기], [야간비행] 기획.",
      details: [
        "테마별 컨셉 설정 및 공간 연출 기획",
        "인디 아티스트 섭외 및 프로그램 구성",
        "공연 브랜딩 및 홍보 콘텐츠 제작"
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
          
          <nav className="hidden md:flex items-center gap-12 text-sm font-medium">
            <a href="#projects" className="hover:text-gray-500 transition-colors">Projects</a>
            <a href="#about" className="hover:text-gray-500 transition-colors">About</a>
            <a href="#contact" className="hover:text-gray-500 transition-colors">Contact</a>
          </nav>

          <div className="hidden lg:flex items-center gap-12 text-[11px] font-mono text-gray-500 uppercase tracking-widest">
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

      <main className="max-w-7xl mx-auto px-6 pt-40 pb-32">
        {/* Hero Section */}
        <section className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.95] mb-8"
              >
                Lee Geun-il is a <span className="font-serif italic">Project Manager</span> & <span className="font-serif italic text-gray-400">Content Creator</span> bridging Engineering Logic and Creative Vision.
              </motion.h1>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-6">
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg text-gray-600 leading-relaxed"
              >
                항공우주공학의 논리와 예술문화영상의 감각을 결합하여 대규모 페스티벌 운영부터 창의적인 콘텐츠 기획까지, 효율적이고 감각적인 결과물을 만들어냅니다.
              </motion.p>
              <div className="flex gap-4">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32">
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
              <div className="flex justify-between items-end mb-12 border-b border-gray-100 pb-4">
                <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-gray-400">01. Featured Projects</h2>
                <span className="text-[10px] font-mono text-gray-400">Festival Operation</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
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
              <div className="flex justify-between items-end mb-12 border-b border-gray-100 pb-4">
                <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-gray-400">02. Personal Projects</h2>
                <span className="text-[10px] font-mono text-gray-400">Creative & Music</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
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

        {/* About Section */}
        <SectionTitle id="about" sideLabel="About me">Lee Geun-il</SectionTitle>
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32">
          <div className="lg:col-span-7">
            <h2 className="text-3xl md:text-4xl font-medium leading-tight mb-12 text-balance">
              I care about building seamless operational experiences and creative narratives that resonate. Whether it's a 30,000-person festival or a personal music project, my approach is guided by logic, curiosity, and a constant search for efficiency.
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                  <Briefcase className="w-3 h-3" /> Professional Experience
                </h4>
                <div className="space-y-8">
                  <div>
                    <h5 className="font-medium">㈜ 퀸즈스마일</h5>
                    <p className="text-sm text-gray-500 mb-2">Project Manager (PM) / 2024.05 – 2024.10</p>
                    <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                      <li>대형 페스티벌 통합 운영 프로세스 설계</li>
                      <li>IT 솔루션 연계 온-오프라인 결제 시스템 관리</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium">드림씨어터</h5>
                    <p className="text-sm text-gray-500 mb-2">House Attendant / 2019.10 – 2021.12</p>
                    <p className="text-sm text-gray-600">뮤지컬 전용 극장 관객 서비스 및 운영 지원</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                  <GraduationCap className="w-3 h-3" /> Education
                </h4>
                <div className="space-y-8">
                  <div>
                    <h5 className="font-medium">부산대학교</h5>
                    <p className="text-sm text-gray-500">항공우주공학 & 예술문화영상학 (복수전공)</p>
                    <p className="text-xs text-gray-400">2013 – 2021</p>
                  </div>
                  <div>
                    <h5 className="font-medium">부산 중앙고등학교</h5>
                    <p className="text-sm text-gray-500">졸업</p>
                    <p className="text-xs text-gray-400">2010 – 2012</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-12">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-6">Core Competencies</h4>
              <div className="flex flex-wrap gap-2">
                {["Project Management", "Content Creation", "Global Communication", "Process Optimization"].map(skill => (
                  <span key={skill} className="px-3 py-1 border border-gray-200 text-sm hover:bg-black hover:text-white transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                <Wrench className="w-3 h-3" /> Technical Tools
              </h4>
              <div className="grid grid-cols-2 gap-y-10 gap-x-8">
                <div>
                  <p className="text-[10px] font-mono text-gray-400 uppercase mb-3">Design</p>
                  <ul className="text-sm space-y-1">
                    <li>Adobe Illustrator</li>
                    <li>Adobe Photoshop</li>
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-gray-400 uppercase mb-3">Video</p>
                  <ul className="text-sm space-y-1">
                    <li>Adobe Premiere Pro</li>
                    <li>Capcut</li>
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-gray-400 uppercase mb-3">Audio</p>
                  <ul className="text-sm space-y-1">
                    <li>Logic Pro</li>
                    <li>Cubase</li>
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-gray-400 uppercase mb-3">Collaboration</p>
                  <ul className="text-sm space-y-1">
                    <li>Notion</li>
                    <li>Slack</li>
                    <li>Flow</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8">
              <h4 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-6">Certificates</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between">
                  <span>일반기계기사</span>
                  <span className="text-gray-400">2025</span>
                </li>
                <li className="flex justify-between">
                  <span>워드프로세서 (단일등급)</span>
                </li>
                <li className="flex justify-between">
                  <span>자동차운전면허 1종</span>
                </li>
                <li className="flex justify-between pt-4 border-t border-gray-200">
                  <span className="font-medium">TOEIC Speaking AL</span>
                  <span className="text-gray-400">English</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Discography & Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-32">
          <section>
            <SectionTitle>Discography / Artist 'Lee Green'</SectionTitle>
            <div className="space-y-6">
              {[
                { type: "EP", title: "GREENERY", year: "2023" },
                { type: "EP", title: "Color / Overcome", year: "2021" },
                { type: "Single", title: "Here, we are", year: "2022" },
                { type: "Single", title: "니가 떠난 순간", year: "2020" },
                { type: "Comp", title: "CAMPUS", year: "2022" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between group cursor-default">
                  <div className="flex items-center gap-4">
                    <Music className="w-4 h-4 text-gray-300 group-hover:text-black transition-colors" />
                    <div>
                      <h5 className="font-medium">{item.title}</h5>
                      <p className="text-xs text-gray-400 uppercase font-mono">{item.type}</p>
                    </div>
                  </div>
                  <span className="text-sm font-mono text-gray-400">{item.year}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionTitle>Awards & Activities</SectionTitle>
            <div className="space-y-8">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-4">Awards</h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Award className="w-5 h-5 shrink-0 text-yellow-500" />
                    <div>
                      <p className="font-medium">대상 - 미쳐버린파닭 영상 공모전</p>
                      <p className="text-xs text-gray-400">2019</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Award className="w-5 h-5 shrink-0 text-gray-400" />
                    <div>
                      <p className="font-medium">금상 - 내가 만난 도시재생 UCC 공모전</p>
                      <p className="text-xs text-gray-400">2020</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Award className="w-5 h-5 shrink-0 text-orange-400" />
                    <div>
                      <p className="font-medium">우수상 - HF 희망 캠페인 송 챌린지</p>
                      <p className="text-xs text-gray-400">2020</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-4">Key Activities</h4>
                <div className="space-y-4 text-sm">
                  <p className="flex items-center gap-2">
                    <ChevronRight className="w-3 h-3 text-gray-300" />
                    <span>복합문화공간 파나카노트 공연 기획 PD (2023)</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <ChevronRight className="w-3 h-3 text-gray-300" />
                    <span>예술경영지원센터 기자단 '아트모아' 2기 (2022-2023)</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <ChevronRight className="w-3 h-3 text-gray-300" />
                    <span>부산문화재단 청년예술가 창작활동지원 (2021-2023)</span>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Contact Section */}
        <SectionTitle id="contact">Get in touch</SectionTitle>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20">
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
