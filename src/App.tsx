/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, 
  ChevronRight, 
  X,
  Mail,
  Phone,
  GraduationCap,
  Award,
  Wrench,
  Trophy
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
  fullDescription?: string;
  subtitle?: string;
  mainRole?: string;
  location?: string;
  support?: string;
  cast?: string;
  images?: string[];
  process?: {
    phase: string;
    items: string[];
  }[];
  role?: {
    title: string;
    items: string[];
  };
  results?: string[];
}

const SECTIONS = [
  { id: "about", label: "ABOUT ME", color: "bg-black text-white" },
  { id: "project1", label: "PROJECT I", color: "bg-white text-black" },
  { id: "project2", label: "PROJECT II", color: "bg-white text-black" },
  { id: "skills", label: "SUMMARY & SKILLS", color: "bg-white text-black" },
  { id: "activities", label: "KEY ACTIVITIES", color: "bg-black text-white" },
];

const AutoFitTitle: React.FC<{ children: string; className?: string }> = ({ children, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [fontSize, setFontSize] = useState<number | null>(null);

  useEffect(() => {
    const adjustFontSize = () => {
      if (!containerRef.current || !textRef.current) return;
      
      const container = containerRef.current;
      const text = textRef.current;
      
      // Base size for desktop is 72px (approx 6xl), for mobile 36px (approx 4xl)
      const isMobile = window.innerWidth < 768;
      const baseSize = isMobile ? 30 : 60;
      
      text.style.fontSize = `${baseSize}px`;
      text.style.display = 'inline-block';
      text.style.whiteSpace = 'nowrap';
      
      const containerWidth = container.offsetWidth;
      const textWidth = text.scrollWidth;
      
      if (textWidth > containerWidth) {
        const ratio = containerWidth / textWidth;
        setFontSize(Math.floor(baseSize * ratio));
      } else {
        setFontSize(baseSize);
      }
    };

    // Use a small timeout to ensure container width is correctly calculated after modal animation
    const timeoutId = setTimeout(adjustFontSize, 50);
    window.addEventListener('resize', adjustFontSize);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', adjustFontSize);
    };
  }, [children]);

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <h2 
        ref={textRef} 
        className={className}
        style={{ 
          fontSize: fontSize ? `${fontSize}px` : 'inherit', 
          whiteSpace: 'nowrap',
          display: 'inline-block',
          lineHeight: '1.1'
        }}
      >
        {children}
      </h2>
    </div>
  );
};

const ProjectCard: React.FC<{ project: Project; onClick: (p: Project) => void }> = ({ project, onClick }) => (
  <motion.div 
    variants={staggerItem}
    className="group cursor-pointer mb-16 last:mb-0 w-full"
    onClick={() => onClick(project)}
  >
    <div className="flex justify-between items-center mb-4 border-b border-black/5 pb-2 h-10">
      <h3 className="text-base md:text-lg font-bold tracking-tight truncate flex-1">{project.title}</h3>
    </div>
    <div className="relative overflow-hidden bg-gray-50 mb-3">
      <img 
        src={project.image} 
        alt={project.title} 
        className="w-full h-auto transition-all duration-1000 group-hover:scale-105"
        style={{ objectPosition: project.objectPosition || "center" }}
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
      </div>
    </div>
    <div className="flex justify-between items-center">
      <span className="text-[9px] font-mono uppercase tracking-widest opacity-40">{project.year}</span>
      <span className="px-1.5 py-0.5 bg-black text-white text-[8px] font-mono uppercase tracking-wider">{project.category}</span>
    </div>
  </motion.div>
);

const ProjectModal: React.FC<{ project: Project | null; onClose: () => void }> = ({ project, onClose }) => {
  const isPersonal = project?.category === "Concert" || project?.category === "Music" || project?.category === "Planning";

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-[200] cursor-zoom-out"
          />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-4 md:inset-12 bg-white z-[201] overflow-hidden flex flex-col shadow-2xl"
          >
            <button onClick={onClose} className="absolute top-8 right-8 z-[202] p-3 hover:bg-black hover:text-white transition-all rounded-full border border-black/5 bg-white/80 backdrop-blur-sm">
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex-1 overflow-y-auto">
              {!isPersonal ? (
                // Standard Layout (Project 1 Style)
                <div className="max-w-7xl mx-auto px-8 md:px-16 py-20">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                    {/* Left Label / Meta */}
                    <div className="lg:col-span-3 space-y-12">
                      <div>
                        <span className="text-[12px] font-mono uppercase tracking-[0.5em] opacity-60 block mb-6">프로젝트 정보</span>
                        <div className="space-y-8">
                          <div>
                            <p className="text-[11px] font-mono uppercase opacity-80 mb-2">연도</p>
                            <p className="text-base font-bold">{project.year}</p>
                          </div>
                          <div>
                            <p className="text-[11px] font-mono uppercase opacity-80 mb-2">카테고리</p>
                            <p className="text-base font-bold">{project.category}</p>
                          </div>
                          {project.location && (
                            <div>
                              <p className="text-[11px] font-mono uppercase opacity-80 mb-2">장소</p>
                              <p className="text-base font-bold">{project.location}</p>
                            </div>
                          )}
                          {project.support && (
                            <div>
                              <p className="text-[11px] font-mono uppercase opacity-80 mb-2">제작지원</p>
                              <p className="text-base font-bold">{project.support}</p>
                            </div>
                          )}
                          {project.cast && (
                            <div>
                              <p className="text-[11px] font-mono uppercase opacity-80 mb-2">출연진</p>
                              <p className="text-base font-bold">{project.cast}</p>
                            </div>
                          )}
                          {project.contribution && (
                            <div>
                              <p className="text-[11px] font-mono uppercase opacity-80 mb-3">기여도</p>
                              <div className="space-y-3">
                                <div className="h-[3px] w-full bg-black/10 relative overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: project.contribution }}
                                    transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    className="absolute inset-y-0 left-0 bg-black"
                                  />
                                </div>
                                <p className="text-base font-bold font-mono">{project.contribution}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right Content */}
                    <div className="lg:col-span-9">
                      <div className="mb-20">
                        <AutoFitTitle className="font-bold tracking-tight leading-none">
                          {project.title}
                        </AutoFitTitle>
                      </div>

                      {project.fullDescription ? (
                        <div className="space-y-24 mb-24">
                          {/* Project Description */}
                          <section>
                            <span className="text-[12px] font-mono uppercase tracking-[0.5em] opacity-60 block mb-8">01 / Project Description</span>
                            <p className="text-base md:text-lg leading-relaxed text-black/80 max-w-4xl whitespace-pre-line">
                              {project.fullDescription}
                            </p>
                          </section>

                          {/* Role */}
                          {project.role && (
                            <section>
                              <span className="text-[12px] font-mono uppercase tracking-[0.5em] opacity-60 block mb-8">02 / Personal Role</span>
                              <div className="bg-black text-white p-8 md:p-12">
                                <h4 className="text-lg font-bold mb-8">{project.role.title}</h4>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                                  {project.role.items.map((item, i) => (
                                    <li key={i} className="text-sm opacity-70 flex items-start gap-3">
                                      <span className="mt-1.5 w-1 h-1 bg-white/30 rounded-full shrink-0" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </section>
                          )}

                          {/* Process */}
                          {project.process && (
                            <section>
                              <span className="text-[12px] font-mono uppercase tracking-[0.5em] opacity-60 block mb-8">03 / Process</span>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                {project.process.map((p, i) => (
                                  <div key={i} className="space-y-6">
                                    <h4 className="text-sm font-bold uppercase tracking-widest border-b border-black/10 pb-4">{p.phase}</h4>
                                    <ul className="space-y-3">
                                      {p.items.map((item, j) => (
                                        <li key={j} className="text-sm opacity-60 flex items-start gap-3">
                                          <span className="mt-1.5 w-1 h-1 bg-black/20 rounded-full shrink-0" />
                                          {item}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </section>
                          )}

                          {/* Results */}
                          {project.results && (
                            <section>
                              <span className="text-[12px] font-mono uppercase tracking-[0.5em] opacity-60 block mb-8">04 / Key Results</span>
                              <ul className="space-y-6">
                                {project.results.map((result, i) => (
                                  <li key={i} className="text-base md:text-lg font-normal flex items-start gap-8 group">
                                    <span className="text-[10px] font-mono opacity-20 mt-2 group-hover:opacity-100 transition-opacity">RESULT_0{i+1}</span>
                                    <span className="border-b border-black/5 pb-4 flex-1">{result}</span>
                                  </li>
                                ))}
                              </ul>
                            </section>
                          )}

                          {/* Gallery */}
                          {project.images && (
                            <section>
                              <span className="text-[12px] font-mono uppercase tracking-[0.5em] opacity-60 block mb-8">05 / Gallery</span>
                              <div className="columns-1 md:columns-2 gap-4 space-y-4">
                                {project.images.map((img, i) => (
                                  <div key={i} className="break-inside-avoid bg-gray-100 overflow-hidden">
                                    <img 
                                      src={img} 
                                      alt={`${project.title} gallery ${i}`} 
                                      className="w-full h-auto block"
                                      referrerPolicy="no-referrer"
                                    />
                                  </div>
                                ))}
                              </div>
                            </section>
                          )}
                        </div>
                      ) : (
                        <>
                          <div className="aspect-[16/9] bg-gray-50 mb-20 overflow-hidden">
                            <img 
                              src={project.image} 
                              alt={project.title} 
                              className="w-full h-full object-cover" 
                              referrerPolicy="no-referrer" 
                            />
                          </div>

                          {project.details && (
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-black/5 pt-12">
                              <div className="md:col-span-4">
                                <span className="text-[10px] font-mono uppercase tracking-[0.5em] opacity-30 block">Key Achievements</span>
                              </div>
                              <div className="md:col-span-8">
                                <ul className="space-y-6">
                                  {project.details.map((detail, idx) => (
                                    <li key={idx} className="text-lg md:text-xl text-black/80 flex items-start gap-6">
                                      <span className="text-[10px] font-mono opacity-20 mt-2">0{idx + 1}</span>
                                      <span>{detail}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                // Editorial Layout (Personal/Concert Style)
                <div className="w-full">
                  {/* Hero Section */}
                  <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden bg-black">
                    <motion.img 
                      initial={{ scale: 1.1, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.6 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-20 bg-gradient-to-t from-black/80 to-transparent">
                      <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                      >
                        <span className="text-white/60 font-mono text-sm uppercase tracking-[0.3em] mb-4 block">{project.category} — {project.year}</span>
                        <AutoFitTitle className="text-white font-bold tracking-tighter leading-none mb-8">
                          {project.title}
                        </AutoFitTitle>
                      </motion.div>
                    </div>
                  </div>

                  <div className="max-w-7xl mx-auto px-8 md:px-16 py-20">
                    {/* Horizontal Meta Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 border-b border-black/10 pb-12">
                      <div>
                        <p className="text-[10px] font-mono uppercase opacity-40 mb-2">Location</p>
                        <p className="text-sm font-bold">{project.location || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-mono uppercase opacity-40 mb-2">Cast</p>
                        <p className="text-sm font-bold">{project.cast || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-mono uppercase opacity-40 mb-2">Support</p>
                        <p className="text-sm font-bold">{project.support || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-mono uppercase opacity-40 mb-2">기여도</p>
                        <div className="flex items-center gap-3">
                          <div className="h-1 w-32 bg-black/10 overflow-hidden">
                            <div className="h-full bg-black" style={{ width: project.contribution }} />
                          </div>
                          <p className="text-sm font-bold font-mono">{project.contribution}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                      {/* Main Content */}
                      <div className="lg:col-span-7 space-y-16">
                        <section>
                          <h3 className="text-xl md:text-2xl font-bold mb-6 tracking-tight">프로젝트 설명</h3>
                          <p className="text-base md:text-lg leading-relaxed text-black/70 whitespace-pre-line font-light">
                            {project.fullDescription}
                          </p>
                        </section>

                        {project.results && (
                          <section>
                            <h3 className="text-sm font-bold mb-10 uppercase tracking-widest opacity-30">Key Results</h3>
                            <div className="space-y-10">
                              {project.results.map((result, i) => {
                                const [goal, outcome] = result.split(" -> ");
                                return (
                                  <div key={i} className="group">
                                    <div className="flex items-baseline gap-6 mb-3">
                                      <span className="text-3xl font-mono opacity-10 group-hover:opacity-100 transition-opacity duration-500">0{i+1}</span>
                                      <p className="text-base font-medium">{goal}</p>
                                    </div>
                                    {outcome && (
                                      <div className="ml-14 p-5 bg-gray-50 border-l-2 border-black">
                                        <p className="text-sm md:text-base opacity-70 leading-relaxed whitespace-pre-line">{outcome}</p>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </section>
                        )}
                      </div>

                      {/* Sidebar Role */}
                      <div className="lg:col-span-5">
                        <div className="sticky top-12 space-y-12">
                          {project.role && (
                            <div className="p-10 border-2 border-black/10 bg-gray-50/50">
                              <h4 className="text-sm font-mono uppercase tracking-[0.3em] font-bold mb-10">{project.role.title}</h4>
                              <ul className="space-y-8">
                                {project.role.items.map((item, i) => {
                                  const [label, desc] = item.split(": ");
                                  return (
                                    <li key={i} className="space-y-2">
                                      <p className="text-base font-bold tracking-tight">{label}</p>
                                      {desc && <p className="text-sm opacity-60 leading-relaxed font-light whitespace-pre-line">{desc}</p>}
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Flexible Gallery */}
                    {project.images && (
                      <section className="mt-24">
                        <h3 className="text-xs font-mono uppercase tracking-[0.3em] opacity-40 mb-12">Visual Archive</h3>
                        <div className="columns-1 md:columns-2 gap-4 space-y-4">
                          {project.images.map((img, i) => (
                            <motion.div 
                              key={i}
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.1 }}
                              className="break-inside-avoid bg-gray-50 overflow-hidden"
                            >
                              <img 
                                src={img} 
                                alt={`${project.title} gallery ${i}`} 
                                className="w-full h-auto block hover:scale-[1.02] transition-transform duration-700" 
                                referrerPolicy="no-referrer" 
                              />
                            </motion.div>
                          ))}
                        </div>
                      </section>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.9 // 90% delay (0.9s / 1.2s)
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 15 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  }
};

const hanjaReveal = {
  hidden: { opacity: 0, scale: 0.95, filter: "blur(20px)" },
  show: { 
    opacity: 1, 
    scale: 1, 
    filter: "blur(0px)",
    transition: { 
      duration: 1.5, 
      ease: [0.16, 1, 0.3, 1],
      delay: 1.2
    } 
  }
};

const philosophyReveal = {
  hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
  show: { 
    opacity: 1, 
    clipPath: "inset(0 0% 0 0)",
    transition: { 
      duration: 1.5, 
      ease: [0.16, 1, 0.3, 1],
      delay: 2
    } 
  }
};

const floatingHanja = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function App() {
  const [time, setTime] = useState(new Date());
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      SECTIONS.forEach(section => {
        const el = document.getElementById(section.id);
        if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
          setActiveSection(section.id);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
  };

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const featuredProjects: Project[] = [
    {
      title: "2024 WATERBOMB",
      category: "Operation",
      year: "2024",
      image: "https://raw.githubusercontent.com/2green-lee/Portfolio/9d41580d7739017f4b186f92faf6491a60264fd5/2024waterbomb.png",
      contribution: "25%",
      description: "2024년 서울에서 개최된 대규모 워터 페스티벌의 통합 현장 운영 및 관리 시스템 구축.",
      fullDescription: "메이드온을 포함한 다수의 기획사가 고객사로 참여하였으며, 관객의 사전 구매부터 현장 체류 전 과정을 관리했습니다. 티켓 및 입장, F&B, 셔틀버스, 물품보관소 등 현장 운영 전반을 통합 수행하며 관객 접점의 서비스 품질을 높였습니다.",
      process: [
        {
          phase: "사전 운영",
          items: [
            "QueensSmile 앱 기반 서비스 및 티켓 판매 운영",
            "운영 정책 및 고객 응대 기준 정리",
            "현장 운영 인력 배치 및 가이드 공유"
          ]
        },
        {
          phase: "현장 운영",
          items: [
            "입장, F&B, 셔틀, 물품보관소 등 다영역 동시 운영",
            "관객 동선 관리 및 혼잡 최소화",
            "운영 영역 간 충돌 발생 시 즉각적인 조율 진행"
          ]
        },
        {
          phase: "이슈 대응",
          items: [
            "온라인 및 현장에서 발생하는 이슈를 신속히 공유",
            "운영 전반에 미치는 영향을 고려하여 우선순위 조정"
          ]
        }
      ],
      role: {
        title: "티켓 총괄 운영",
        items: [
          "QueensSmile 플랫폼 기반 티켓 판매 및 발권 운영",
          "온라인 고객 문의(CS) 직접 대응",
          "현장 티켓 부스 운영 및 스탭 인솔",
          "QR 코드 기반 입장 시스템 운영 및 오류 대응",
          "초대권 및 관계자 티켓 전체 관리",
          "현장 돌발 이슈 발생 시 즉각적인 판단 및 문제 해결 주도",
          "티켓 관련 이슈를 운영 전반 관점에서 공유 및 조율"
        ]
      },
      results: [
        "대규모 관객이 참여하는 페스티벌의 다영역 통합 운영을 안정적으로 수행",
        "온라인–오프라인 운영 연계를 통해 관객 경험의 일관성 확보",
        "운영 영역 간 협업을 통해 현장 혼선 최소화",
        "고객사로부터 운영 전반에 대한 신뢰도 확보",
        "자체 플랫폼을 활용한 서비스 운영 경험 축적"
      ],
      details: [
        "서울 스테이지 및 관객 구역 통합 현장 운영 및 관리",
        "관객 접점 전반의 운영 프로세스 설계 및 실행",
        "자체 앱 및 키오스크를 연계한 온-오프라인 통합 결제 시스템 관리"
      ]
    },
    {
      title: "2024 부산국제록페스티벌",
      category: "Operation",
      year: "2024",
      image: "https://raw.githubusercontent.com/2green-lee/Portfolio/301715e6090e002a7c306c6d76f35d8d78ed92f4/2024bsrock.png",
      contribution: "25%",
      objectPosition: "top",
      description: "부산국제록페스티벌의 공식 MD 및 아티스트 굿즈 판매 부스 운영 총괄.",
      fullDescription: "본 프로젝트에서 페스티벌 공식 MD 판매 부스 운영을 담당하였습니다.\n\nQueensSmile 앱을 활용한 MD 상품 사전 판매와 현장 판매를 병행하는 운영 구조를 구축하였으며, 페스티벌 기간 3일간 MD 판매 부스를 상시 운영하였습니다. 또한, 주최사인 부산축제조직위원회와 긴밀히 소통하며 페스티벌 공식 굿즈뿐만 아니라 아티스트 굿즈까지 포함한 복합 MD 운영을 수행하였습니다.",
      role: {
        title: "운영PM",
        items: [
          "QueensSmile 앱 내 페스티벌 전용 MD 상품 구성 및 사전 판매 운영",
          "현장 MD 판매 부스 운영 총괄",
          "주최사(부산축제조직위원회) 및 아티스트 소속사 커뮤니케이션",
          "아티스트 굿즈 입·출고 관리 및 반송 조율",
          "판매 스탭 선발, 관리 및 현장 인솔",
          "페스티벌 기간(3일) 현장 운영 이슈 대응 및 문제 해결"
        ]
      },
      process: [
        {
          phase: "사전 운영",
          items: [
            "QueensSmile 앱 내 페스티벌 전용 MD 상품 구성 및 사전 판매 오픈",
            "현장 판매 운영 프로세스 및 재고 관리 기준 수립",
            "주최사 및 아티스트 소속사와의 커뮤니케이션 창구 역할 수행"
          ]
        },
        {
          phase: "현장 운영",
          items: [
            "MD 판매 부스 설치 및 운영",
            "사전 구매 고객 및 현장 구매 고객 대응",
            "페스티벌 기간 3일간 상시 부스 운영",
            "판매 스탭 관리 및 현장 운영 총괄"
          ]
        },
        {
          phase: "사후 처리",
          items: [
            "잔여 아티스트 굿즈 정리 및 반출",
            "아티스트 소속사와의 정산 및 반송 커뮤니케이션"
          ]
        }
      ],
      results: [
        "플랫폼 기반 MD 사전 판매와 현장 판매의 안정적 병행 운영",
        "페스티벌 MD 및 다수 아티스트 굿즈의 통합 운영 성공",
        "주최사 및 아티스트 소속사와의 원활한 협업을 통한 운영 신뢰도 확보",
        "페스티벌 기간 동안 MD 판매 부스 안정적 운영",
        "굿즈 제작–판매–반출까지 이어지는 전 과정 운영 경험 축적"
      ],
      details: [
        "공식 MD 및 아티스트 굿즈 판매 부스 운영",
        "주최측과의 실시간 커뮤니케이션 및 재고 관리",
        "현장 인력 교육 및 효율적인 대기 라인 관리"
      ]
    },
    {
      title: "2024 인천펜타포트록페스티벌",
      category: "Operation",
      year: "2024",
      image: "https://raw.githubusercontent.com/2green-lee/Portfolio/301715e6090e002a7c306c6d76f35d8d78ed92f4/2024incheonrock.png",
      contribution: "25%",
      description: "본 프로젝트에서 관객 편의 시설 중심의 운영 영역을 담당하였습니다.",
      fullDescription: "F&B(Food & Beverage) 운영 및 물품보관소 운영을 수행하였으며, 사전 주문부터 현장 수령까지 이어지는 F&B 운영 구조를 구축하여 관객 대기 시간을 최소화하고 현장 혼선을 줄이는 것을 목표로 운영하였습니다.\n\n특히, 자체 플랫폼인 QueensSmile 앱을 활용하여 음식 상품을 시간 단위 사전 예약 방식으로 판매하고, 현장에서는 당사가 보유한 키오스크를 통해 추가 판매를 병행하는 온라인–오프라인 연계 운영을 진행하였습니다.",
      role: {
        title: "운영PM",
        items: [
          "F&B 업체 선정 및 협업 관리",
          "음식 상품 기획 및 QueensSmile 앱 상품 오픈",
          "시간 단위 사전 예약 판매 운영 총괄",
          "현장 키오스크 판매 운영 관리",
          "F&B 및 물품보관소 현장 운영 총괄",
          "운영 스탭 관리 및 인솔",
          "현장 이슈 발생 시 즉각 대응 및 문제 해결 주도"
        ]
      },
      results: [
        "시간 단위 F&B 사전 예약 운영을 통해 관객 대기 시간 최소화",
        "사전 판매와 현장 판매 병행으로 F&B 운영 효율성 확보",
        "현장 혼잡도 감소를 통한 관객 이용 만족도 향상",
        "대규모 페스티벌 환경에서 F&B 및 편의 시설 운영 안정화",
        "자체 플랫폼을 활용한 서비스 운영 강점 검증"
      ],
      details: [
        "시간 단위 F&B 사전 예약 시스템 구축",
        "대기 시간 최소화를 위한 현장 운영 가이드라인 설계",
        "클라이언트 및 입점 업체 통합 관리"
      ]
    },
    {
      title: "2024 이슬라이브페스티벌",
      category: "Operation",
      year: "2024",
      image: "https://raw.githubusercontent.com/2green-lee/Portfolio/301715e6090e002a7c306c6d76f35d8d78ed92f4/2024cham.jpg",
      contribution: "25%",
      description: "본 프로젝트에서 당사는 F&B 운영 전반을 담당하였습니다.",
      fullDescription: "본 프로젝트에서 당사는 F&B 운영 전반을 담당하였습니다.\n\n본 행사는 하이트진로를 클라이언트로 하여 진행되었으며, 관객 편의와 현장 운영 효율을 고려한 F&B 운영 구조를 설계 및 실행하였습니다. 다수 페스티벌에서의 운영 경험을 바탕으로, 사전 판매와 현장 판매를 병행하는 F&B 운영 방식을 적용하여 단일 일정의 페스티벌 환경에서도 안정적인 운영을 목표로 하였습니다.",
      role: {
        title: "운영PM",
        items: [
          "F&B 운영 구조 설계 및 실행",
          "상품 구성 및 판매 방식 운영 관리",
          "현장 F&B 부스 운영 총괄",
          "운영 스탭 관리 및 현장 인솔",
          "현장 이슈 발생 시 즉각적인 판단 및 문제 해결 주도",
          "클라이언트(하이트진로)와의 운영 관련 커뮤니케이션 지원"
        ]
      },
      process: [
        {
          phase: "사전 운영",
          items: [
            "F&B 운영 계획 수립",
            "상품 구성 및 판매 방식 정리",
            "현장 운영 가이드 및 스탭 배치 계획 수립"
          ]
        },
        {
          phase: "현장 운영",
          items: [
            "F&B 부스 설치 및 운영",
            "사전 구매 및 현장 구매 고객 대응",
            "관객 동선 관리 및 혼잡 대응",
            "스탭 관리 및 현장 운영 총괄"
          ]
        },
        {
          phase: "이슈 대응",
          items: [
            "주문·수령 과정에서 발생하는 현장 이슈 즉각 대응",
            "운영 방식 조정을 통한 현장 안정화"
          ]
        }
      ],
      results: [
        "단일 일정 대형 페스티벌에서 F&B 운영 안정적으로 수행",
        "관객 대기 시간 최소화를 통한 현장 이용 만족도 확보",
        "브랜드 행사에 적합한 운영 품질 유지",
        "이전 페스티벌 운영 경험을 성공적으로 확장 적용"
      ],
      details: [
        "현장 운영 프로세스 최적화",
        "관객 동선 및 안전 관리 시스템 구축",
        "F&B 및 편의시설 통합 운영 관리"
      ]
    }
  ];

  const personalProjects: Project[] = [
    {
      title: "GREENERY : 푸르게 푸르게 푸르러져라",
      category: "Music",
      year: "2023",
      image: "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img5.png",
      contribution: "70%",
      location: "Online & Offline Distribution",
      cast: "이그린 (Lee Green)",
      support: "텀블벅 크라우드 펀딩 프로젝트",
      description: "싱어송라이터 이그린 EP <GREENERY> 발매. 발매 작업기를 담은 책 형태의 새로운 앨범.",
      fullDescription: "싱어송라이터 ‘이그린’의 EP [GREENERY] 발매와 함께, 창작 과정과 영감을 기록한 아트북 형태의 피지컬 앨범을 기획·제작했습니다.\n\n효용성이 낮은 기존 플라스틱 CD의 한계를 문제로 정의하고, 이를 대체할 수 있는 새로운 형태의 앨범을 설계했습니다. 텀블벅 크라우드펀딩을 통해 목표 금액의 196%를 달성하며 프로젝트를 성공적으로 런칭했습니다.\n\n전곡 작사, 작곡, 프로듀싱은 물론, 디자인 디렉팅, 유통, 쇼케이스 기획까지 프로젝트 전반을 주도했습니다.",
      role: {
        title: "담당 업무",
        items: [
          "Planning: 프로젝트 전체 기획\n펀딩 전략 수립",
          "Production: 앨범 제작\n책 디자인 및 출판\n아티스트 굿즈 제작",
          "Promotion: 펀딩 홍보 영상 제작\nSNS 운영\n라이브 영상 제작",
          "Operation: 쇼케이스 기획 및 진행"
        ]
      },
      results: [
        "텀블벅 크라우드 펀딩을 통해 프로젝트 자금 확보 및 시장 반응 검증 -> 텀블벅 크라우드 펀딩 196% 초과 달성\n목표 금액 대비 높은 참여율과 지지 확보",
        "책 형태의 아티스트 앨범 제작 및 유통 구조 구축 -> 앨범 제작 및 출판 완료\n온·오프라인 10개 판매처 입점 및 판매 진행",
        "출판 콘텐츠를 확장한 관객 참여형 프로그램 기획 -> '하나의 생각이 노래가 되기까지' 출판 프로모션 워크숍 진행",
        "다채널 홍보를 통한 프로젝트 인지도 확대 -> 펀딩 홍보 영상 제작\n인스타그램, 팟캐스트 등 온라인 채널 중심 홍보 운영",
        "앨범 발매를 알리는 오프라인 이벤트 기획 및 실행 -> 발매 쇼케이스 기획 및 진행"
      ],
      images: [
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2052.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/013cde7d59ad00b704b19423085d2b9bfc269884/img%2051.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2054.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2055.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2056.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2057.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2053.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2058.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2059.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2060.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2061.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2063.jpg"
      ]
    },
    {
      title: "Flower Planet",
      category: "Concert",
      year: "2022",
      image: "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img4.jpg",
      contribution: "70%",
      location: "KT&G 상상마당 부산 3F 라이브홀",
      support: "KT&G 상상마당 부산",
      cast: "우예린, 이그린",
      objectPosition: "top",
      description: "부산 아티스트 이그린과 서울 아티스트 우예린의 콜라보레이션 공연.",
      fullDescription: "부산을 기반으로 활동하는 아티스트 '이그린'과 서울의 아티스트 '우예린'이 만나 음악적 교감을 나누는 특별한 콜라보레이션 무대를 기획했습니다.\n\n서로 다른 지역적 배경을 가진 두 아티스트의 조화를 통해 새로운 관객층을 유입시키고, 단순한 공연을 넘어 체험형 콘텐츠를 결합하여 관객들에게 잊지 못할 경험을 선사하는 것을 목표로 했습니다. 기획부터 제작, 홍보, 현장 운영까지 공연의 전 단계에 걸쳐 밀도 높은 작업을 수행했습니다.",
      role: {
        title: "담당 업무",
        items: [
          "Planning: 기획서 작성\n공연 전체 컨셉 수립",
          "Booking: 아티스트 섭외\n공연장(KT&G 상상마당) 조율",
          "Promotion: SNS 마케팅 전략 수립\n라이브 홍보 영상 기획",
          "Production: 포스터, 굿즈, 홍보 영상 등\n비주얼 에셋 제작 총괄",
          "Operation: 공연 당일 현장 운영\n타임테이블 관리"
        ]
      },
      results: [
        "관객 유입 확대 및 티켓 판매율 제고 -> 전체 티켓 매진",
        "온오프라인 콘텐츠 제작 -> 컨셉 영상 제작\n헤나 체험 부스 운영",
        "다채널 홍보를 통한 인지도 확산 -> SNS 영상 홍보물 배포\n티켓 2+1 프로모션 진행"
      ],
      images: [
        "https://raw.githubusercontent.com/2green-lee/Portfolio/6aede115c9be14770644c83685839c915a9b2ae6/img%2041.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/6aede115c9be14770644c83685839c915a9b2ae6/img%2042.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/6aede115c9be14770644c83685839c915a9b2ae6/img%2043.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/6aede115c9be14770644c83685839c915a9b2ae6/img%2044.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/6aede115c9be14770644c83685839c915a9b2ae6/img%2045.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/6aede115c9be14770644c83685839c915a9b2ae6/img%2046.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/6aede115c9be14770644c83685839c915a9b2ae6/img%2047.jpg"
      ]
    },
    {
      title: "열대야",
      category: "Concert",
      year: "2022",
      image: "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img3.jpg",
      contribution: "70%",
      location: "KT&G 상상마당 부산 13F 루프탑",
      support: "KT&G 상상마당 부산",
      cast: "From2020, Chilinkat, 이그린",
      objectPosition: "center",
      description: "도시에서 즐기는 한 여름 밤의 꿈. 도심의 건물 옥상에서 각양각색 인디 뮤지션의 음악을 즐긴다.",
      fullDescription: "도심 속 건물 옥상이라는 이색적인 공간에서 펼쳐지는 인디 음악 공연 시리즈입니다. '열대야'라는 테마에 맞춰 한여름 밤의 정취를 느낄 수 있는 아티스트 라인업과 공간 연출을 기획했습니다.\n\n관객들에게 일상 속 특별한 휴식을 선사하며, 지역 문화 공간의 활용도를 높이는 성공적인 사례를 만들었습니다. 기획부터 운영까지 전 과정을 주도하며 프로젝트의 완성도를 높였습니다.",
      role: {
        title: "담당 업무",
        items: [
          "Planning: 프로젝트 기획서 작성\n콘셉트 수립 및 협업 파트너 대상 제안",
          "Booking: 아티스트 및 공연/행사 장소 섭외\n일정 및 조건 협의",
          "Promotion: 온라인 홍보 전략 수립 및 실행\n오프라인 프로모션 기획 및 운영",
          "Production: 홍보물 및 콘텐츠 제작\n온·오프라인 홍보 자료 관리",
          "Operation: 행사 진행 및 운영 관리"
        ]
      },
      results: [
        "시민들이 주말 저녁에 향유할 수 있는 접근성 높은 공연 콘텐츠 기획 및 제공 -> 티켓 판매 전석 매진 달성",
        "공간 및 브랜드 협업을 통한 프로젝트 운영 효율 및 관객 경험 강화 -> KT&G 상상마당 루프탑 공간 대관 \n와인·핑거푸드 등 연계 프로모션 제공",
        "다채널 홍보를 통한 공연 인지도 확산 -> 상상마당 부산 및 HAO 공식 인스타그램을 활용한 온라인 홍보 진행 \n배너 및 공연 홍보 영상 제작·배포"
      ],
      images: [
        "https://raw.githubusercontent.com/2green-lee/Portfolio/7a0e467437190b36440c7c409f7d07a665b98d8d/Img%2031.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/7a0e467437190b36440c7c409f7d07a665b98d8d/Img%2032.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/7a0e467437190b36440c7c409f7d07a665b98d8d/Img%2033.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/7a0e467437190b36440c7c409f7d07a665b98d8d/img%2034.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/7a0e467437190b36440c7c409f7d07a665b98d8d/img%2035.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/7a0e467437190b36440c7c409f7d07a665b98d8d/img%2036.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/7a0e467437190b36440c7c409f7d07a665b98d8d/img%2037.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/7a0e467437190b36440c7c409f7d07a665b98d8d/img%2038.jpg"
      ]
    },
    {
      title: "오후의 향기",
      category: "Concert",
      year: "2021",
      image: "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img2.jpg",
      contribution: "70%",
      location: "파나카 B",
      support: "부산문화재단",
      cast: "모멘츠유미, 이공이공, 오느린윤혜린",
      objectPosition: "top",
      description: "평화로운 일요일 오후, 차한잔과 함께 관람할 수 있는 힐링 공연. 아티스트가 직접 만든 향과 음악을 통해 공감각적 형태의 공연을 향유한다.",
      fullDescription: "평화로운 일요일 오후, 차 한 잔과 함께 즐기는 힐링 공연 시리즈입니다. 아티스트가 직접 조향한 향기와 음악을 결합하여 관객들에게 공감각적인 경험을 선사하는 것을 목표로 했습니다.\n\n부산 지역의 소규모 편성 아티스트들에게 무대 기회를 제공하고, 아티스트의 정체성이 담긴 굿즈 제작을 통해 공연의 가치를 확장했습니다. 기획부터 제작, 홍보, 현장 운영까지 전 과정을 주도하며 따뜻한 감성의 브랜드 공연을 구축했습니다.",
      role: {
        title: "담당 업무",
        items: [
          "Planning: 기획서 작성\n프로젝트 전체 콘셉트 수립",
          "Booking: 출연 아티스트 섭외\n공연 베뉴(공간) 섭외 및 일정 조율",
          "Promotion: 인스타그램 기반 홍보 기획 및 운영\n라이브 영상 촬영 및 콘텐츠 활용",
          "Production: 메이킹·라이브 영상 제작\n포스터·향수·엽서 등 오프라인 홍보물 제작",
          "Operation: 공연 현장 운영 및 진행 관리"
        ]
      },
      results: [
        "소규모 편성 아티스트들이 무대 경험을 쌓을 수 있는 공연 기회 제공 -> 티켓 매진",
        "아티스트 정체성을 반영한 굿즈 제작을 통해 공연 경험의 확장 및 콘텐츠 자산화 -> 아티스트 향수 및 굿즈 제작\n굿즈 메이킹 영상 제작 및 공개",
        "다채널 홍보를 통한 공연 인지도 확대 및 관객 유입 -> 인스타그램 기반 온라인 홍보 운영\n현수막·포스터 등 오프라인 홍보물 제작·배포"
      ],
      images: [
        "https://raw.githubusercontent.com/2green-lee/Portfolio/363f29ea35ae49b89e8e7670969e860166d22fe8/img%2021.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/363f29ea35ae49b89e8e7670969e860166d22fe8/img%2022.JPG",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/363f29ea35ae49b89e8e7670969e860166d22fe8/img%2023.JPG",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/ab04817d40c06299b1492b3bc2a01bc0c5ed65ec/Img%2024.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/363f29ea35ae49b89e8e7670969e860166d22fe8/img%2025.JPG",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/ab04817d40c06299b1492b3bc2a01bc0c5ed65ec/img%2026.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/ab04817d40c06299b1492b3bc2a01bc0c5ed65ec/img%2027.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/ab04817d40c06299b1492b3bc2a01bc0c5ed65ec/img%2028.jpg"
      ]
    },
    {
      title: "야간비행",
      category: "Concert",
      year: "2020",
      image: "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img1.jpg",
      contribution: "70%",
      location: "김해 하라식당 루프탑",
      support: "경남음악창작소",
      cast: "이사흘, 온더그린, 반다, 밴드기린",
      objectPosition: "center",
      description: "어쿠스틱이라는 편안한 형태의 음악과 공연에 제공되는 체험 컨텐츠를 도구삼아 관객들은 각자의 고즈넉한 일상을 비행하고 탐험한다.",
      fullDescription: "어쿠스틱 음악과 체험형 콘텐츠를 결합하여 관객들이 자신의 일상을 돌아보고 탐험할 수 있는 특별한 공연 시리즈입니다. 김해의 루프탑이라는 이색적인 공간에서 고즈넉한 분위기를 연출했습니다.\n\n부산과 경남 지역에서 활동하는 인디 아티스트들에게 완성도 높은 무대를 제공하고, 관객들에게는 잊지 못할 시각적, 청각적 경험을 선사했습니다. 기획부터 제작, 홍보, 현장 운영까지 전 과정을 주도하며 프로젝트의 완성도를 높였습니다.",
      role: {
        title: "담당 업무",
        items: [
          "Planning: 기획서 작성\n전체 컨셉 기획",
          "Booking & Promotion: 아티스트 섭외\n베뉴 섭외\n인스타그램 홍보",
          "Production: 홍보 영상 제작\n공연 소품 준비",
          "Operation: 공연 운영 및 민원\n요청 사항 응대"
        ]
      },
      results: [
        "부산·경남 지역에서 활동하는 인디 아티스트들을 위한 완성도 있는 공연 무대 및 운영 환경 제공 -> 부산/경남 아티스트 섭외 및 공연 전석 매진",
        "콘텐츠 및 굿즈 제작 -> 티켓, 엽서, 우표 제작\n라이브 클립 영상 5편 제작·배포",
        "온라인 홍보 활성화 및 오프라인 홍보 -> 인스타그램 홍보\n현수막·포스터 등 오프라인 홍보물 제작 및 배포"
      ],
      images: [
        "https://raw.githubusercontent.com/2green-lee/Portfolio/e7d84bbdc228906326e2645347b5f44ad1a75293/img%2011.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/e7d84bbdc228906326e2645347b5f44ad1a75293/img%2012.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/e7d84bbdc228906326e2645347b5f44ad1a75293/img%2013.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/e7d84bbdc228906326e2645347b5f44ad1a75293/img%2014.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/2337ca8c54dd5f019a4869caceaea3d6036c6e12/img%2015.jpeg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/2337ca8c54dd5f019a4869caceaea3d6036c6e12/img%2016.jpeg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/2337ca8c54dd5f019a4869caceaea3d6036c6e12/img%2017.jpeg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/2337ca8c54dd5f019a4869caceaea3d6036c6e12/img%2018.JPG"
      ]
    }
  ];

  const activeIndex = SECTIONS.findIndex(s => s.id === activeSection);

  return (
    <div className="h-screen w-screen overflow-hidden font-sans selection:bg-black selection:text-white relative flex flex-col bg-white">
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      {/* Fixed Top Header */}
      <header className="w-full bg-white text-black z-[110] px-8 md:px-12 py-8 flex justify-between items-start border-b border-black/5 shrink-0">
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter leading-none mb-1">
            Lee-Geunil<span className="text-xs align-top ml-0.5">®</span>
          </h1>
          <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest">Creative Strategist</span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-4 text-[11px] font-medium">
          <div className="flex flex-col gap-1">
            <button onClick={() => scrollTo("about")} className="hover:opacity-40 transition-opacity text-left">About</button>
            <button onClick={() => scrollTo("project1")} className="hover:opacity-40 transition-opacity text-left">Projects</button>
            <button onClick={() => scrollTo("activities")} className="hover:opacity-40 transition-opacity text-left">Contact</button>
          </div>
          <div className="flex flex-col gap-1">
            <a href="https://www.instagram.com/darkreen___n/" target="_blank" rel="noopener noreferrer" className="hover:opacity-40 transition-opacity">Instagram</a>
            <a href="mailto:lgi12@naver.com" className="hover:opacity-40 transition-opacity">Mail</a>
          </div>
          <div className="hidden md:flex flex-col gap-1 items-end opacity-40">
            <span>Busan, KR</span>
            <span>{formattedTime}</span>
          </div>
        </div>
      </header>

      {/* Dynamic Flex Layout: [Left Tabs] - [Main Content] - [Right Tabs] */}
      <div className="flex-1 flex overflow-hidden w-full relative bg-white">
        {SECTIONS.map((section, index) => {
          const isMoved = index <= activeIndex;
          const navWidth = windowWidth < 768 ? "w-6" : "w-8";

          return (
            <React.Fragment key={section.id}>
              <motion.button
                layout
                onClick={() => scrollTo(section.id)}
                animate={{
                  backgroundColor: isMoved ? "#000000" : "#ffffff",
                  color: isMoved ? "#ffffff" : "rgba(0,0,0,0.4)",
                  borderColor: isMoved ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,1)",
                }}
                transition={{ 
                  layout: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                  backgroundColor: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                  color: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                  borderColor: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
                }}
                className={`h-full ${navWidth} flex flex-col items-center justify-end pb-16 border-r last:border-r-0 relative z-20 shrink-0 outline-none focus:ring-0`}
              >
                <span className="whitespace-nowrap text-[11px] md:text-[13px] font-cooper uppercase tracking-tighter vertical-text py-4 pointer-events-none">
                  {section.label}
                </span>
              </motion.button>

              {/* Insert Main Content between Left and Right Tabs */}
              {index === activeIndex && (
                <motion.main 
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ 
                    layout: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.4, delay: 0.8 }
                  }}
                  className="flex-1 h-full relative overflow-hidden bg-white z-10 flex flex-col"
                >
                  <AnimatePresence mode="wait">
                    {activeSection === "about" && (
                      <motion.section
                        key="about"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="show"
                        exit={{ opacity: 0 }}
                        className={`h-full w-full overflow-y-auto px-8 md:px-20 pt-12 md:pt-24 pb-40 md:pb-80 ${SECTIONS[0].color}`}
                      >
                        <div className="max-w-7xl w-full mx-auto h-full flex flex-col justify-start pt-4 lg:pt-8">
                          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                            {/* Left: Identity Label */}
                            <div className="lg:col-span-4">
                              <motion.div variants={staggerItem}>
                                <div className="mb-8 -mt-4 lg:-mt-8">
                                  <span className="text-[10px] font-mono uppercase tracking-[0.6em] opacity-40 block mb-1">Identity</span>
                                  <span className="text-[10px] font-mono uppercase tracking-[0.6em] opacity-20 block">2018 - 2025</span>
                                </div>
                              </motion.div>
                            </div>

                            {/* Right: Hanja Title & Philosophy */}
                            <div className="lg:col-span-8 flex flex-col items-start lg:pl-12">
                              <div className="w-full">
                                {/* Hanja Title - Adjusted Position */}
                                <motion.div 
                                  variants={hanjaReveal}
                                  initial="hidden"
                                  animate="show"
                                  className="relative inline-block mt-4 lg:mt-8"
                                >
                                  <motion.h1 
                                    variants={floatingHanja}
                                    animate="animate"
                                    className="text-7xl md:text-[10rem] lg:text-[12rem] font-serif leading-none text-white tracking-[0.1em]"
                                  >
                                    共生
                                  </motion.h1>
                                </motion.div>

                                {/* Philosophy - Adjusted Position */}
                                <motion.div 
                                  variants={philosophyReveal}
                                  initial="hidden"
                                  animate="show"
                                  className="mt-32 lg:mt-40 space-y-3 max-w-2xl"
                                >
                                  <span className="text-[10px] font-mono uppercase tracking-[0.4em] opacity-30 block border-b border-white/10 pb-2 w-fit pr-8">Philosophy</span>
                                  <p className="text-lg md:text-xl lg:text-2xl font-serif italic text-white/80 leading-tight whitespace-nowrap">
                                    공생; 연결 속에서 만들어지는 가치
                                  </p>
                                </motion.div>
                              </div>
                            </div>
                          </div>

                          {/* Bottom: Action Footer Removed */}
                        </div>
                      </motion.section>
                    )}

                    {activeSection === "project1" && (
                      <motion.section
                        key="project1"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="show"
                        exit={{ opacity: 0 }}
                        className={`h-full w-full overflow-y-auto px-8 md:px-20 pt-24 pb-80 ${SECTIONS[1].color}`}
                      >
                        <div className="max-w-7xl mx-auto">
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                            <div className="lg:col-span-3">
                              <motion.div variants={staggerItem} className="sticky top-0">
                                <span className="text-[10px] font-mono uppercase tracking-[0.6em] opacity-40 block mb-2">Featured Projects</span>
                                <span className="text-[10px] font-mono uppercase tracking-[0.6em] opacity-20 block">2020 - 2024</span>
                              </motion.div>
                            </div>
                            <div className="lg:col-span-9">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
                                {featuredProjects.map((project, idx) => (
                                  <ProjectCard key={idx} project={project} onClick={setSelectedProject} />
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="h-20" />
                        </div>
                      </motion.section>
                    )}

                    {activeSection === "project2" && (
                      <motion.section
                        key="project2"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="show"
                        exit={{ opacity: 0 }}
                        className={`h-full w-full overflow-y-auto px-8 md:px-20 pt-24 pb-80 ${SECTIONS[2].color}`}
                      >
                        <div className="max-w-7xl mx-auto">
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                            <div className="lg:col-span-3">
                              <motion.div variants={staggerItem} className="sticky top-0">
                                <span className="text-[10px] font-mono uppercase tracking-[0.6em] opacity-40 block mb-2">Personal Projects</span>
                                <span className="text-[10px] font-mono uppercase tracking-[0.6em] opacity-20 block">Creative Archive</span>
                              </motion.div>
                            </div>
                            <div className="lg:col-span-9">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
                                {personalProjects.map((project, idx) => (
                                  <ProjectCard key={idx} project={project} onClick={setSelectedProject} />
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="h-20" />
                        </div>
                      </motion.section>
                    )}

                    {activeSection === "skills" && (
                      <motion.section
                        key="skills"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="show"
                        exit={{ opacity: 0 }}
                        className={`h-full w-full overflow-y-auto px-8 md:px-20 pt-24 pb-80 ${SECTIONS[3].color}`}
                      >
                        <div className="max-w-7xl w-full mx-auto">
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                            {/* Left Label */}
                            <div className="lg:col-span-3">
                              <motion.div variants={staggerItem} className="sticky top-0">
                                <span className="text-[10px] font-mono uppercase tracking-[0.6em] opacity-40 block mb-2">Expertise</span>
                                <span className="text-[10px] font-mono uppercase tracking-[0.6em] opacity-20 block">Experience & Skills</span>
                              </motion.div>
                            </div>

                            {/* Right Content */}
                            <div className="lg:col-span-9">
                              {/* Section 1: Experience */}
                              <div className="mb-0">
                                <motion.div variants={staggerItem} className="mb-12">
                                  <span className="text-[10px] font-mono uppercase tracking-widest opacity-30 block mb-4">01 / Professional Experience</span>
                                </motion.div>

                                <div className="space-y-0">
                                  {[
                                    {
                                      company: "㈜ 퀸즈스마일",
                                      role: "프로젝트 매니저 (PM)",
                                      period: "2024.05 – 2024.11",
                                      desc: ["국내외 페스티벌 및 공연 기획·운영", "자사 플랫폼 관리 및 고객 응대", "UX/UI 개선 협업"]
                                    },
                                    {
                                      company: "㈜ 드림씨어터",
                                      role: "하우스 어텐던트",
                                      period: "2019.10 – 2022.05",
                                      desc: ["대형 라이선스 공연 관객 서비스 및 운영 지원", "현장 돌발 이슈 대응", "공연장 운영 프로세스 이행"]
                                    }
                                  ].map((exp, i) => (
                                    <motion.div 
                                      key={i} 
                                      variants={staggerItem}
                                      className="group grid grid-cols-1 md:grid-cols-12 gap-8 py-12 border-t border-black/10 hover:bg-black/[0.01] transition-colors"
                                    >
                                      <div className="md:col-span-4">
                                        <span className="text-[8px] font-mono uppercase tracking-widest opacity-30 block mb-2">{exp.period}</span>
                                        <h3 className="text-lg font-bold mb-3">{exp.company}</h3>
                                        <span className="inline-block px-2 py-0.5 bg-black text-white text-[8px] font-mono uppercase tracking-wider">
                                          {exp.role}
                                        </span>
                                      </div>
                                      <div className="md:col-span-8">
                                        <ul className="space-y-3">
                                          {exp.desc.map((d, j) => (
                                            <li key={j} className="text-sm opacity-50 flex items-start gap-3">
                                              <span className="mt-2 w-1 h-1 bg-black/20 rounded-full shrink-0" />
                                              {d}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>

                              {/* Section 2: Education, Awards & Skills */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-20 border-t border-black/10 pt-12">
                                {/* Left Column: Education & Awards */}
                                <motion.div variants={staggerItem} className="space-y-20">
                                  <div>
                                    <span className="text-[10px] font-mono uppercase tracking-widest opacity-30 block mb-8">02 / Background</span>
                                    <div className="space-y-12">
                                      <div>
                                        <p className="text-[9px] font-mono uppercase opacity-20 mb-3">Education</p>
                                        <h4 className="text-lg font-bold">부산대학교</h4>
                                        <p className="text-xs opacity-50 font-medium">항공우주공학 & 예술문화영상학</p>
                                      </div>
                                      
                                      <div>
                                        <p className="text-[9px] font-mono uppercase opacity-20 mb-6">Certificates</p>
                                        <div className="space-y-8">
                                          {/* TOEIC Speaking */}
                                          <div className="space-y-3">
                                            <div className="flex justify-between items-end">
                                              <div>
                                                <h5 className="text-[11px] font-bold tracking-tight">TOEIC SPEAKING</h5>
                                                <p className="text-xs font-medium opacity-60">AL (Advanced Low)</p>
                                              </div>
                                              <span className="text-[10px] font-mono opacity-30">Level 9/11</span>
                                            </div>
                                            <div className="h-1 w-full bg-black/5 overflow-hidden">
                                              <motion.div 
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${(9/11)*100}%` }}
                                                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                                className="h-full bg-black"
                                              />
                                            </div>
                                          </div>

                                          {/* TOEIC */}
                                          <div className="space-y-3">
                                            <div className="flex justify-between items-end">
                                              <div>
                                                <h5 className="text-[11px] font-bold tracking-tight">TOEIC</h5>
                                                <p className="text-xs font-medium opacity-60">830</p>
                                              </div>
                                              <span className="text-[10px] font-mono opacity-30">830/990</span>
                                            </div>
                                            <div className="h-1 w-full bg-black/5 overflow-hidden">
                                              <motion.div 
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${(830/990)*100}%` }}
                                                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                                className="h-full bg-black"
                                              />
                                            </div>
                                          </div>

                                          {/* Other Certificates */}
                                          <div className="pt-4 border-t border-black/5 space-y-6">
                                            <div>
                                              <h5 className="text-[11px] font-bold tracking-tight">워드프로세서</h5>
                                              <p className="text-xs font-medium opacity-60">단일 등급</p>
                                            </div>
                                            <div>
                                              <h5 className="text-[11px] font-bold tracking-tight">운전면허증</h5>
                                              <p className="text-xs font-medium opacity-60">1종보통</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                </motion.div>

                                {/* Right Column: Technical Stack */}
                                <motion.div variants={staggerItem}>
                                  <span className="text-[10px] font-mono uppercase tracking-widest opacity-30 block mb-8">03 / Technical Stack</span>
                                  <div className="space-y-12">
                                    {[
                                      { label: "Design Tools", items: ["Illustrator", "Photoshop", "Premiere Pro"] },
                                      { label: "Audio Engineering", items: ["Logic Pro"] },
                                      { label: "Project Management", items: ["Notion", "Flow", "Slack"] }
                                    ].map(group => (
                                      <div key={group.label} className="group">
                                        <p className="text-[9px] font-mono uppercase mb-4 opacity-40 group-hover:opacity-100 transition-opacity">{group.label}</p>
                                        <div className="flex flex-wrap gap-2">
                                          {group.items.map(item => (
                                            <span key={item} className="px-3 py-1.5 border border-black/10 text-[10px] font-mono uppercase hover:bg-black hover:text-white transition-all cursor-default">
                                              {item}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </motion.div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.section>
                    )}

                    {activeSection === "activities" && (
                      <motion.section
                        key="activities"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="show"
                        exit={{ opacity: 0 }}
                        className={`h-full w-full overflow-hidden px-8 md:px-20 pt-24 pb-80 ${SECTIONS[4].color}`}
                      >
                        <div className="max-w-7xl w-full mx-auto">
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-32">
                            <div className="lg:col-span-2">
                              <motion.div variants={staggerItem}>
                                <span className="text-[10px] font-mono uppercase tracking-[0.6em] opacity-40 block mb-2">Activities</span>
                                <span className="text-[10px] font-mono uppercase tracking-[0.6em] opacity-20 block">Archive</span>
                              </motion.div>
                            </div>
                            <div className="lg:col-span-10">
                              <div className="grid grid-cols-1 md:grid-cols-[1.3fr_0.7fr] gap-16">
                                <motion.div variants={staggerItem} className="space-y-12 max-h-[500px] overflow-y-auto pr-6 custom-scrollbar">
                                  {[
                                    { 
                                      title: "광고·마케팅 동아리 CREATOR", 
                                      period: "2019.03 ~ 2021.02", 
                                      org: "부산대학교",
                                      desc: ["영상 콘텐츠 및 카피라이팅 기획/제작", "마케팅 콘텐츠 기획 및 실행 경험", "공모전 수상"] 
                                    },
                                    { 
                                      title: "청년 UNIVERSITY 기획자 양성 프로그램", 
                                      period: "2021.06 ~ 2021.12", 
                                      org: "부산문화재단",
                                      desc: ["프로젝트 기획–운영–성과 분석 전 과정 수행", "결과 보고서 작성 및 발표"] 
                                    },
                                    { 
                                      title: "아트모아 기자단 2기", 
                                      period: "2022.09 ~ 2022.12", 
                                      org: "예술경영지원센터",
                                      desc: ["산업 리서치 및 전문가 인터뷰 기획/진행", "문화산업 관련 콘텐츠 작성 및 인사이트 도출"] 
                                    },
                                    { 
                                      title: "파나카노트 공연 기획 PD", 
                                      period: "2021", 
                                      org: "복합문화공간",
                                      desc: ["공연 기획 및 음향 총괄"] 
                                    },
                                    { 
                                      title: "한일청년 교류회", 
                                      period: "2019.03 ~ 2021.02", 
                                      org: "부산 한일문화교류협회",
                                      desc: ["한일 대학생 교류 프로그램 기획 및 운영 참여", "해외 프로그램 봉사활동"] 
                                    }
                                  ].map((act, i) => (
                                    <div key={i} className="group border-b border-white/10 pb-8">
                                      <div className="mb-2">
                                        <h3 className="text-xl font-bold group-hover:translate-x-2 transition-transform">{act.title}</h3>
                                      </div>
                                      <div className="flex items-center gap-3 mb-4">
                                        <p className="text-[10px] font-mono uppercase tracking-widest opacity-30">{act.org}</p>
                                        <span className="text-[10px] font-mono opacity-40">{act.period}</span>
                                      </div>
                                      <ul className="space-y-2">
                                        {act.desc.map((d, j) => (
                                          <li key={j} className="text-sm opacity-60 flex items-start gap-3">
                                            <span className="mt-2 w-1 h-1 bg-white/20 rounded-full shrink-0" />
                                            {d}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </motion.div>
                                <motion.div variants={staggerItem} className="flex justify-center md:justify-end">
                                  {/* Vertical Business Card */}
                                  <div className="w-64 aspect-[4/7] bg-white text-black p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group/card border border-black/5">
                                    {/* Card Texture/Pattern */}
                                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                                      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '12px 12px' }} />
                                    </div>

                                    <div className="relative z-10">
                                      <div className="mb-16">
                                        <h3 className="text-2xl font-bold tracking-tighter leading-none mb-2">LEE<br />GEUNIL</h3>
                                        <p className="text-[9px] font-mono uppercase tracking-[0.3em] opacity-40">Creative Strategist</p>
                                      </div>
                                      
                                      <div className="space-y-6">
                                        <div>
                                          <p className="text-[8px] font-mono uppercase opacity-60 mb-1">Contact</p>
                                          <p className="text-[11px] font-medium tracking-tight">lgi12@naver.com</p>
                                          <p className="text-[11px] font-medium tracking-tight">010-9335-9620</p>
                                        </div>
                                        <div>
                                          <p className="text-[8px] font-mono uppercase opacity-60 mb-1">Location</p>
                                          <p className="text-[11px] font-medium tracking-tight">Busan, South Korea</p>
                                        </div>
                                        <div>
                                          <p className="text-[8px] font-mono uppercase opacity-60 mb-1">Instagram</p>
                                          <a href="https://www.instagram.com/darkreen___n/" target="_blank" rel="noopener noreferrer" className="text-[11px] font-medium tracking-tight hover:opacity-40 transition-opacity block">@darkreen___n</a>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="relative z-10 flex justify-between items-end">
                                      <div className="text-[8px] font-mono opacity-50 leading-tight uppercase tracking-tighter">
                                        ©2026 Portfolio<br />All Rights Reserved
                                      </div>
                                    </div>

                                    {/* Interactive Shine Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000 ease-in-out" />
                                  </div>
                                </motion.div>
                              </div>
                            </div>
                          </div>

                          {/* Background text removed */}
                        </div>
                      </motion.section>
                    )}
                  </AnimatePresence>
                </motion.main>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
