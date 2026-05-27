/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DEFAULT_PORTFOLIO_DATA, PortfolioData } from "./default_data";
import { 
  ArrowUpRight, 
  ChevronRight, 
  ChevronLeft,
  X,
  Mail,
  Phone,
  GraduationCap,
  Award,
  Wrench,
  Trophy,
  Plus,
  Trash2,
  Upload,
  Check,
  ArrowLeft,
  ArrowRight,
  Copy,
  Save,
  Image as ImageIcon
} from "lucide-react";

export interface Project {
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

const formatCategory = (category: string) => {
  if (!category) return "";
  if (category === "Music") return "음악";
  if (category === "Concert") return "공연";
  return category;
};

const SECTIONS = [
  { id: "about", label: "ABOUT ME", color: "bg-white text-black" },
  { id: "project1", label: "PROJECT", color: "bg-white text-black" },
  { id: "activities", label: "KEY ACTIVITIES", color: "bg-white text-black" },
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

const OptimizedImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  referrerPolicy?: "no-referrer" | "origin" | "unsafe-url" | "no-referrer-when-downgrade";
}> = ({ src, alt, className, style, referrerPolicy }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoaded(true);
    };
  }, [src]);

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-neutral-100 rounded-[8px]">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100/80 animate-pulse">
          <div className="w-4 h-4 border border-neutral-300 border-t-neutral-800 rounded-full animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className || ""} transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={style}
        referrerPolicy={referrerPolicy}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

const FESTIVAL_POSTERS = [
  {
    title: "WATERBOMB",
    src: "https://raw.githubusercontent.com/2green-lee/Portfolio/9d41580d7739017f4b186f92faf6491a60264fd5/2024waterbomb.png",
    period: "2024"
  },
  {
    title: "인천펜타포트",
    src: "https://raw.githubusercontent.com/2green-lee/Portfolio/301715e6090e002a7c306c6d76f35d8d78ed92f4/2024incheonrock.png",
    period: "2024"
  },
  {
    title: "부산국제록페스티벌",
    src: "https://raw.githubusercontent.com/2green-lee/Portfolio/301715e6090e002a7c306c6d76f35d8d78ed92f4/2024bsrock.png",
    period: "2024"
  },
  {
    title: "이슬라이브페스티벌",
    src: "https://raw.githubusercontent.com/2green-lee/Portfolio/301715e6090e002a7c306c6d76f35d8d78ed92f4/2024cham.jpg",
    period: "2024"
  }
];

const CONCERT_POSTERS = [
  {
    title: "Flower Planet",
    src: "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img4.jpg",
    period: "2022"
  },
  {
    title: "열대야",
    src: "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img3.jpg",
    period: "2022"
  },
  {
    title: "Flower Planet 쇼케이스",
    src: "https://raw.githubusercontent.com/2green-lee/Portfolio/6aede115c9be14770644c83685839c915a9b2ae6/img%2041.jpg",
    period: "2022"
  },
  {
    title: "열대야 라이브",
    src: "https://raw.githubusercontent.com/2green-lee/Portfolio/7a0e467437190b36440c7c409f7d07a665b98d8d/Img%2031.jpg",
    period: "2022"
  }
];

const ProjectCard: React.FC<{ 
  project: Project; 
  onClick: (p: Project) => void; 
  imageAspect?: string; 
  isWide?: boolean;
}> = ({ project, onClick, imageAspect, isWide }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.7;
      scrollContainerRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const posters = project.title === "공연 운영" ? CONCERT_POSTERS : FESTIVAL_POSTERS;

  return (
    <motion.div 
      variants={staggerItem}
      className={`group cursor-pointer w-full bg-white border border-neutral-200/50 rounded-[15px] p-5 shadow-3xs hover:shadow-md hover:border-neutral-300 hover:-translate-y-1.5 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between ${isWide ? "" : ""}`}
      onClick={() => onClick(project)}
    >
      <div>
        <div className="flex justify-center items-center mb-4 border-b border-black/5 pb-2 h-10">
          <h3 className="text-base md:text-lg font-bold tracking-tight truncate flex-1 text-center text-neutral-800 group-hover:text-black transition-colors">{project.title}</h3>
        </div>
        {isWide ? (
          <div className="relative w-full mb-4 bg-neutral-50/50 border border-neutral-100/60 rounded-[12px] aspect-[600/390] flex items-center justify-center p-2 group/grid">
            <div className="grid grid-cols-2 gap-2 h-full w-full">
              {posters.map((poster, index) => (
                <div key={index} className="relative overflow-hidden rounded-[8px] flex items-center justify-center bg-neutral-100 h-full w-full">
                  <OptimizedImage 
                    src={poster.src} 
                    alt={poster.title} 
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={`relative overflow-hidden bg-gray-50 mb-4 rounded-[12px] ${imageAspect || ""}`}>
            <OptimizedImage 
              src={project.image} 
              alt={project.title} 
              className={`${imageAspect ? "w-full h-full object-cover" : "w-full h-auto"}`}
              style={{ objectPosition: project.objectPosition || "center" }}
              referrerPolicy="no-referrer"
            />
          </div>
        )}
      </div>

    {/* Clean Information Table */}
    <div className={`mt-2 border-t border-black/5 pt-3.5 space-y-3.5 opacity-90 group-hover:opacity-100 transition-all duration-300 ${isWide ? 'grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3 space-y-0' : ''}`}>
      <div className="flex flex-col gap-1.5 text-xs text-neutral-600">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[11px] text-neutral-400 font-semibold tracking-wider shrink-0 uppercase">기여도</span>
          <span className="font-mono font-bold text-neutral-800 text-[12px]">{project.contribution || "0%"}</span>
        </div>
        <div className="w-full bg-neutral-100 h-1 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: project.contribution || "0%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-neutral-800 h-full rounded-full"
          />
        </div>
      </div>
      {(project.title === "페스티벌 운영" || project.title === "공연 운영") ? (
        <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 pt-3 border-t border-neutral-100 text-xs text-neutral-600 w-full">
          {/* Left: 분야 */}
          <div className="flex items-center justify-between">
            <span className="font-sans text-[11px] text-neutral-400 font-semibold tracking-wider shrink-0 uppercase">분야</span>
            <div className="flex flex-wrap gap-1.5 justify-end">
              {(project.title === "공연 운영" 
                ? "하우스, 티켓, 안내, MD 판매, 컴플레인 응대" 
                : "종합 안내, 티켓, F&B, 물품보관소, 셔틀버스"
              ).split(", ").map((item, index) => (
                <span
                  key={index}
                  className="font-medium text-neutral-800 bg-neutral-50/75 border border-neutral-200/80 px-2 py-0.5 text-[11px] tracking-wide select-none transition-all duration-300 rounded-[6px] shadow-4xs"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          
          {/* Right: 담당 역할 */}
          {project.role?.title ? (
            <div className="flex items-start justify-between">
              <span className="font-sans text-[11px] text-neutral-400 font-semibold tracking-wider shrink-0 uppercase mt-[5px]">담당 역할</span>
              <div className="flex flex-col items-end gap-1.5 min-w-0 max-w-[70%] text-right">
                {project.role.title.split(",").map((t, idx) => (
                  <span 
                    key={idx}
                    className="inline-block font-semibold text-rose-600 bg-rose-50/60 border border-rose-500/10 px-2 py-0.5 rounded-[6px] text-[11px] tracking-wide select-none truncate max-w-full" 
                    title={t.trim()}
                  >
                    {t.trim()}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div />
          )}
        </div>
      ) : (
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 pt-3 border-t border-neutral-100 text-xs text-neutral-600 w-full ${isWide ? 'sm:col-span-2' : ''}`}>
          {/* Left: 분야 */}
          <div className="flex items-center justify-between">
            <span className="font-sans text-[11px] text-neutral-400 font-semibold tracking-wider shrink-0 uppercase">분야</span>
            <div className="flex flex-wrap gap-1.5 justify-end">
              {(project.category || "").split(",").map((cat, idx) => (
                <span
                  key={idx}
                  className="font-medium text-neutral-800 bg-neutral-50/75 border border-neutral-200/80 px-2 py-0.5 text-[11px] tracking-wide select-none transition-all duration-300 rounded-[6px] shadow-4xs"
                >
                  {formatCategory(cat.trim())}
                </span>
              ))}
            </div>
          </div>

          {/* Right: 담당 역할 */}
          {project.role?.title && (
            <div className="flex items-start justify-between">
              <span className="font-sans text-[11px] text-neutral-400 font-semibold tracking-wider shrink-0 uppercase mt-[5px]">담당 역할</span>
              <div className="flex flex-col items-end gap-1.5 min-w-0 max-w-[70%] text-right">
                {project.role.title.split(",").map((t, idx) => (
                  <span 
                    key={idx}
                    className="inline-block font-semibold text-rose-600 bg-rose-50/60 border border-rose-500/10 px-2 py-0.5 rounded-[6px] text-[11px] select-none truncate max-w-full" 
                    title={t.trim()}
                  >
                    {t.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  </motion.div>
  );
};

const ProjectModal: React.FC<{
  project: Project | null;
  onClose: () => void;
}> = ({ project, onClose }) => {
  const [slidePage, setSlidePage] = useState(1);

  const isFestival = project?.title === "페스티벌 운영";
  const tabs = isFestival ? [
    { page: 1, label: "개요" },
    { page: 2, label: "티켓 운영" },
    { page: 3, label: "상품 관리" },
    { page: 4, label: "현장 운영" },
    { page: 5, label: "사후 관리" },
    { page: 6, label: "갤러리" }
  ] : [
    { page: 1, label: "개요" },
    { page: 2, label: "티켓 운영" },
    { page: 3, label: "현장 운영" },
    { page: 4, label: "사후 관리" },
    { page: 5, label: "갤러리" }
  ];
  const maxPages = tabs.length;

  // Reset page when a new project is opened
  useEffect(() => {
    if (project) {
      setSlidePage(1);
    }
  }, [project]);

  // keyboard navigation (Left/Right arrows for PPT experience within the modal)
  useEffect(() => {
    if (!project) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setSlidePage(p => Math.max(1, p - 1));
      } else if (e.key === "ArrowRight") {
        setSlidePage(p => Math.min(maxPages, p + 1));
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, onClose, maxPages]);

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs z-[200]"
          />
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className="fixed inset-2 sm:inset-4 md:inset-6 lg:inset-8 xl:inset-12 xl:max-w-[1450px] xl:mx-auto bg-white z-[201] overflow-hidden flex flex-col font-sans text-neutral-800 border border-transparent shadow-[0_15px_40px_-5px_rgba(0,0,0,0.1)] rounded-[15px] xl:h-[calc(100vh-96px)]"
          >
            {/* Upper Action Bar / Info Panel */}
            <div className="h-[75px] border-b border-neutral-100 px-4 sm:px-8 flex items-center justify-between shrink-0 select-none bg-white">
              <div className="flex items-center gap-3 sm:gap-6 overflow-x-auto no-scrollbar py-1">
                <span className="text-[14px] font-mono text-neutral-400 font-bold hidden md:inline-block shrink-0">
                  {project.title}
                </span>
                <span className="h-4 w-px bg-neutral-200 hidden md:inline-block shrink-0" />
                
                {/* 1개요, 2티켓, 3상품 관리/기타 탭 네비게이션 */}
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  {tabs.map((tab) => (
                    <button
                      key={tab.page}
                      onClick={() => setSlidePage(tab.page)}
                      className={`px-3 py-1 text-[14px] font-semibold tracking-tight transition-all duration-200 rounded-[15px] cursor-pointer flex items-center justify-center gap-1.5 shrink-0 ${
                        slidePage === tab.page
                          ? "bg-neutral-950 text-white font-bold"
                          : "bg-neutral-50 hover:bg-neutral-100 text-neutral-500 border border-neutral-200/40"
                      }`}
                    >
                      <span className={`text-[11px] font-mono opacity-80 leading-none relative ${slidePage === tab.page ? "text-rose-400" : "text-neutral-400"}`}>0{tab.page}</span>
                      <span className="leading-none">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Close Button - Sharp Modern Layout WITH NO BORDER */}
              <button 
                onClick={onClose} 
                className="p-2 hover:bg-neutral-950 hover:text-white transition-all rounded-none cursor-pointer text-neutral-650 outline-none border-none shrink-0"
                aria-label="닫기"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Floating Left/Right Arrow Buttons (Sharp Rectangles with no borders, shadows, or outlines) */}
            {slidePage > 1 && (
              <button
                onClick={() => setSlidePage(p => Math.max(1, p - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-[205] w-12 h-12 bg-white/95 text-neutral-900 hover:bg-neutral-950 hover:text-white transition-all duration-300 rounded-none cursor-pointer flex items-center justify-center outline-none border-none select-none group/prev"
                title="이전 슬라이드 (←)"
              >
                <ChevronLeft className="w-5 h-5 group-hover/prev:-translate-x-0.5 transition-transform" />
              </button>
            )}
            {slidePage < maxPages && (
              <button
                onClick={() => setSlidePage(p => Math.min(maxPages, p + 1))}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-[205] w-12 h-12 bg-white/95 text-neutral-900 hover:bg-neutral-950 hover:text-white transition-all duration-300 rounded-none cursor-pointer flex items-center justify-center outline-none border-none select-none group/next"
                title="다음 슬라이드 (→)"
              >
                <ChevronRight className="w-5 h-5 group-hover/next:translate-x-0.5 transition-transform" />
              </button>
            )}

            {/* Main Content Area with Page Slide Animations */}
            <div className="flex-1 overflow-y-auto select-text scrollbar-thin bg-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slidePage}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-6xl xl:max-w-[1300px] mx-auto px-6 sm:px-12 py-12 md:py-16"
                >
                  {/* Slide Content rendering depends on slidePage */}
                  {slidePage === 1 && (
                    <div className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 ${(project.title === "페스티벌 운영" || project.title === "공연 운영") ? "items-stretch" : "items-center"}`}>
                      {/* Left: Beautiful Hero photo frame or 2*2 posters */}
                      <div className={`md:col-span-6 w-full flex justify-center ${(project.title === "페스티벌 운영" || project.title === "공연 운영") ? "self-stretch" : ""}`}>
                        {(project.title === "페스티벌 운영" || project.title === "공연 운영") ? (
                          <div className="grid grid-cols-2 gap-4 w-full md:w-[499px] md:h-[660px] h-full min-h-[460px] md:min-h-[660px] mx-auto bg-transparent">
                            {(project.title === "공연 운영" ? CONCERT_POSTERS : FESTIVAL_POSTERS).map((poster, index) => (
                              <div key={index} className="relative overflow-hidden transition-all duration-300 w-full h-full group/poster flex items-center justify-center">
                                <OptimizedImage 
                                  src={poster.src} 
                                  alt={poster.title} 
                                  className="w-full h-full object-contain select-none transition-transform duration-700 group-hover/poster:scale-[1.04]"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="max-w-sm mx-auto aspect-[4/5] overflow-hidden border border-neutral-200 shadow-sm bg-neutral-50 rounded-none w-full flex items-center justify-center">
                            <OptimizedImage
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-contain"
                              style={{ objectPosition: project.objectPosition || "center" }}
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        )}
                      </div>

                      {/* Right: Title, spec sheet & description */}
                      <div className="md:col-span-6 space-y-6 max-w-[530px] w-full md:mx-auto">
                        <div>
                          <span className="text-[10px] uppercase tracking-widest font-mono text-rose-500 font-bold bg-rose-50/50 px-2 py-1 border border-rose-100/40">
                            {formatCategory(project.category)} / {project.year}
                          </span>
                          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-900 font-sans leading-tight mt-3">
                             {project.title}
                          </h2>
                          {project.subtitle && (
                            <p className="text-sm text-neutral-500 font-normal mt-1.5">
                              {project.subtitle}
                            </p>
                          )}
                        </div>

                        {(() => {
                          const desc = project.fullDescription || project.description || "";
                          const splitIndex = desc.indexOf("[주요 운영 실적]");
                          if (splitIndex !== -1) {
                            const part1 = desc.substring(0, splitIndex).trim();
                            const part2 = desc.substring(splitIndex).trim();
                            return (
                              <>
                                <div className="w-full">
                                  <p className="text-neutral-700 text-sm md:text-[15px] leading-relaxed tracking-normal whitespace-pre-line text-justify font-sans">
                                    {part1}
                                  </p>
                                </div>

                                {/* Specs Card */}
                                <div className="bg-[#F8F9FA] p-5 border border-neutral-200/60 rounded-[15px] space-y-3 w-full">
                                  <h4 className="text-[9px] font-mono font-bold tracking-widest text-neutral-400 uppercase border-b border-neutral-200 pb-1.5">
                                    PROJECT SPECIFICATION
                                  </h4>
                                  <dl className="grid grid-cols-3 gap-y-2.5 text-xs">
                                    <dt className="text-neutral-500 col-span-1 font-medium self-center">분야</dt>
                                    <dd className="text-neutral-900 col-span-2 font-bold flex flex-wrap gap-1.5 items-center font-sans">
                                      {(project.title === "페스티벌 운영" || project.title === "공연 운영") ? (
                                        (project.title === "공연 운영" 
                                          ? ["하우스", "티켓", "안내", "MD 판매", "컴플레인 응대"]
                                          : ["종합 안내", "티켓", "F&B", "물품보관소", "셔틀버스"]
                                        ).map((item, index) => (
                                          <span key={index} className="font-medium text-neutral-800 bg-neutral-50/75 border border-neutral-200/80 px-2.5 py-0.5 text-[11px] tracking-wide rounded-[6px] shadow-4xs select-none">
                                            {item}
                                          </span>
                                        ))
                                      ) : (
                                        (project.category || "").split(",").map((cat, index) => (
                                          <span key={index} className="font-medium text-neutral-800 bg-neutral-50/75 border border-neutral-200/80 px-2.5 py-0.5 text-[11px] tracking-wide rounded-none shadow-4xs select-none">
                                            {formatCategory(cat.trim())}
                                          </span>
                                        ))
                                      )}
                                    </dd>
                                    
                                    <dt className="text-neutral-500 col-span-1 font-medium">연도</dt>
                                    <dd className="text-neutral-900 col-span-2 font-mono font-bold">{project.year}</dd>
                                    
                                    {project.contribution && (
                                      <>
                                        <dt className="text-neutral-500 col-span-1 font-medium">기여도</dt>
                                        <dd className="text-neutral-900 col-span-2 font-medium">{project.contribution}</dd>
                                      </>
                                    )}
                                    
                                    {project.location && (
                                      <>
                                        <dt className="text-neutral-500 col-span-1 font-medium">장소</dt>
                                        <dd className="text-neutral-900 col-span-2 font-medium">{project.location}</dd>
                                      </>
                                    )}
                                  </dl>
                                </div>

                                <div className="w-full">
                                  <p className="text-neutral-700 text-sm md:text-[15px] leading-relaxed tracking-normal whitespace-pre-line text-justify font-sans">
                                    {part2}
                                  </p>
                                </div>
                              </>
                            );
                          } else {
                            return (
                              <>
                                <div className="w-full">
                                  <p className="text-neutral-700 text-sm md:text-[15px] leading-relaxed tracking-normal whitespace-pre-line text-justify font-sans">
                                    {desc}
                                  </p>
                                </div>

                                {/* Specs Card */}
                                <div className="bg-[#F8F9FA] p-5 border border-neutral-200/60 rounded-[15px] space-y-3 w-full">
                                  <h4 className="text-[9px] font-mono font-bold tracking-widest text-neutral-400 uppercase border-b border-neutral-200 pb-1.5">
                                    PROJECT SPECIFICATION
                                  </h4>
                                  <dl className="grid grid-cols-3 gap-y-2.5 text-xs">
                                    <dt className="text-neutral-500 col-span-1 font-medium self-center">분야</dt>
                                    <dd className="text-neutral-900 col-span-2 font-bold flex flex-wrap gap-1.5 items-center font-sans">
                                      {(project.title === "페스티벌 운영" || project.title === "공연 운영") ? (
                                        (project.title === "공연 운영" 
                                          ? ["하우스", "티켓", "안내", "MD 판매", "컴플레인 응대"]
                                          : ["종합 안내", "티켓", "F&B", "물품보관소", "셔틀버스"]
                                        ).map((item, index) => (
                                          <span key={index} className="font-medium text-neutral-800 bg-neutral-50/75 border border-neutral-200/80 px-2.5 py-0.5 text-[11px] tracking-wide rounded-[6px] shadow-4xs select-none">
                                            {item}
                                          </span>
                                        ))
                                      ) : (
                                        (project.category || "").split(",").map((cat, index) => (
                                          <span key={index} className="font-medium text-neutral-800 bg-neutral-50/75 border border-neutral-200/80 px-2.5 py-0.5 text-[11px] tracking-wide rounded-none shadow-4xs select-none">
                                            {formatCategory(cat.trim())}
                                          </span>
                                        ))
                                      )}
                                    </dd>
                                    
                                    <dt className="text-neutral-500 col-span-1 font-medium">연도</dt>
                                    <dd className="text-neutral-900 col-span-2 font-mono font-bold">{project.year}</dd>
                                    
                                    {project.contribution && (
                                      <>
                                        <dt className="text-neutral-500 col-span-1 font-medium">기여도</dt>
                                        <dd className="text-neutral-900 col-span-2 font-medium">{project.contribution}</dd>
                                      </>
                                    )}
                                    
                                    {project.location && (
                                      <>
                                        <dt className="text-neutral-500 col-span-1 font-medium">장소</dt>
                                        <dd className="text-neutral-900 col-span-2 font-medium">{project.location}</dd>
                                      </>
                                    )}
                                  </dl>
                                </div>
                              </>
                            );
                          }
                        })()}
                      </div>
                    </div>
                  )}

                  {slidePage === 2 && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start animate-fade-in">
                      {/* Left: Role Block (담당 역할 / 티켓 운영 총괄 등) */}
                      <div className="lg:col-span-6 space-y-6">
                        <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
                          <span className="text-[9px] font-mono bg-[#E0115F] text-white px-1.5 py-0.5 rounded-none uppercase tracking-wider font-bold">Ticket & Role</span>
                          <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider">담당 역할 및 실행 업무</h3>
                        </div>
                        {project.role ? (
                          <div className="border border-neutral-200/80 p-6 bg-white shadow-3xs rounded-none">
                            <div className="flex flex-col items-start gap-1.5 mb-4">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="w-2 h-2 bg-[#E0115F] rounded-full shrink-0" />
                                <span className="text-[11px] font-mono text-neutral-400 font-bold uppercase tracking-wide">역할 및 분장</span>
                              </div>
                              <div className="flex flex-col items-start gap-1.5 pl-4">
                                {project.role.title.split(",").map((t, idx) => (
                                  <span 
                                    key={idx}
                                    className="inline-block font-extrabold text-rose-600 bg-rose-50/60 border border-rose-500/10 px-2.5 py-0.5 text-xs rounded-[6px] text-left select-none"
                                  >
                                    {t.trim()}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <ul className="space-y-3.5">
                              {project.role.items.map((item, i) => {
                                const anonymity = item.includes(": ");
                                const [label, desc] = anonymity ? item.split(": ") : [null, item];
                                return (
                                  <li key={i} className="text-xs sm:text-[13px] text-neutral-800 leading-relaxed flex items-start gap-2.5">
                                    <span className="mt-2 w-1.5 h-1.5 bg-neutral-400 rounded-full shrink-0" />
                                    <span className="text-neutral-900">
                                      {label ? (
                                        <>
                                          <strong className="text-neutral-950 font-bold">{label}: </strong>
                                          <span className="font-normal text-neutral-800">{desc}</span>
                                        </>
                                      ) : (
                                        <span className="font-normal text-neutral-800">{desc}</span>
                                      )}
                                    </span>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ) : (
                          <div className="p-6 border border-dashed border-neutral-200 bg-white/50 text-neutral-400 text-xs text-center font-sans">
                            담당 역할 정보가 등록되지 않았습니다.
                          </div>
                        )}
                      </div>

                      {/* Right: Prep Process Block (사전 기획 & 준비 프로세스) */}
                      <div className="lg:col-span-6 space-y-6">
                        <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
                          <span className="text-[9px] font-mono bg-black text-white px-1.5 py-0.5 rounded-none uppercase tracking-wider font-bold font-bold">Preparation</span>
                          <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider">사전 기획 및 운영 설계</h3>
                        </div>
                        {project.process && project.process[0] ? (
                          <div className="p-6 border border-neutral-200 bg-white shadow-3xs space-y-4 rounded-none">
                            <h4 className="text-sm font-bold text-neutral-900 flex justify-between items-center border-b border-neutral-100 pb-2">
                              <span className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-black rounded-full" />
                                {project.process[0].phase}
                              </span>
                              <span className="text-[9px] font-mono text-neutral-400 font-bold">STEP 01</span>
                            </h4>
                            <ul className="space-y-3">
                              {project.process[0].items.map((item, j) => (
                                <li key={j} className="text-xs sm:text-[13px] text-neutral-750 flex items-start gap-2 leading-relaxed">
                                  <span className="mt-1.5 w-1 h-1 bg-neutral-400 rounded-full shrink-0" />
                                  <span className="font-normal text-neutral-800">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <div className="p-6 border border-dashed border-neutral-200 bg-white/50 text-neutral-400 text-xs text-center font-sans">
                            사전 기획 프로세스가 등록되지 않았습니다.
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {slidePage === 3 && (
                    isFestival ? (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start animate-fade-in">
                        {/* Left: Product Results Block (상품 관리 성과) */}
                        <div className="lg:col-span-6 space-y-6">
                          <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
                            <span className="text-[9px] font-mono bg-[#E0115F] text-white px-1.5 py-0.5 rounded-none uppercase tracking-wider font-bold">Product Strategy</span>
                            <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider">상품 관리 핵심 성과</h3>
                          </div>
                          <div className="space-y-3.5 bg-white border border-neutral-200 p-6 shadow-3xs rounded-none">
                            {[
                              "시간 단위 모바일 선주문 -> 현장 대기 제로에 수렴하는 하이브리드 주문 처리 정합성 확보",
                              "한정판 MD 및 아티스트 공식 굿즈 사전 예약 분배율 산출 -> 조기 완판 및 정산 자동화 연동",
                              "메이드온 자사 POS 인프라 연계 -> 오프라인 즉시 판매 정산 소요 시간 단축 및 수작업 혼선 예방"
                            ].map((result, i) => {
                              const hasArrow = result.includes(" -> ");
                              if (hasArrow) {
                                const [goal, outcome] = result.split(" -> ");
                                return (
                                  <div key={i} className="border-b border-neutral-100 last:border-none pb-3.5 mb-3.5 last:pb-0 last:mb-0">
                                    <div className="flex items-center gap-2 mb-1.5">
                                      <span className="text-[9px] font-mono text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded-none border border-neutral-200/50 font-bold">0{i+1}</span>
                                      <p className="text-xs sm:text-[13px] font-bold text-neutral-900">{goal}</p>
                                    </div>
                                    <div className="ml-7 p-3 bg-neutral-50/70 border-l-2 border-neutral-800 rounded-none">
                                      <p className="text-xs sm:text-[13px] text-neutral-800 leading-relaxed whitespace-pre-line font-normal">{outcome}</p>
                                    </div>
                                  </div>
                                );
                              }
                              return (
                                <div key={i} className="text-xs sm:text-[13px] font-normal flex items-start gap-3 py-2 border-b border-neutral-100 last:border-none">
                                  <span className="text-[9px] font-mono text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded-none border border-neutral-200/50 font-bold">0{i+1}</span>
                                  <span className="flex-1 text-neutral-800 font-normal leading-relaxed">{result}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Right: Product Setup Block */}
                        <div className="lg:col-span-6 space-y-6">
                          <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
                            <span className="text-[9px] font-mono bg-black text-white px-1.5 py-0.5 rounded-none uppercase tracking-wider font-bold">Product Setup</span>
                            <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider">상품 관리 및 실무 가동</h3>
                          </div>
                          <div className="p-6 border border-neutral-200 bg-white shadow-3xs space-y-4 rounded-none">
                            <h4 className="text-sm font-bold text-neutral-900 flex justify-between items-center border-b border-neutral-100 pb-2">
                              <span className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-black rounded-full" />
                                상품 기획 및 품목 등록 설정
                              </span>
                              <span className="text-[9px] font-mono text-neutral-400 font-bold">STEP 03</span>
                            </h4>
                            <ul className="space-y-3">
                              {[
                                "F&B 부스 입점 메뉴 단가율 테이블 수집 및 플랫폼 결제 환율 테이블 반영",
                                "QueensSmile 디지털 어플 가상 입점 스토어 생성 및 시간대별 한정 재고 전산 등록",
                                "아티스트 머천다이즈 현장 적치 공간 분류 및 고유 식별 바코드 POS 조율 검증"
                              ].map((item, j) => (
                                <li key={j} className="text-xs sm:text-[13px] text-neutral-750 flex items-start gap-2 leading-relaxed">
                                  <span className="mt-1.5 w-1 h-1 bg-neutral-400 rounded-full shrink-0" />
                                  <span className="font-normal text-neutral-800">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // If not festival: Render on-site operation (originally on-site results & process)
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start animate-fade-in">
                        {/* Left: Onsite Results Block (현장 운영 성과) */}
                        <div className="lg:col-span-6 space-y-6">
                          <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
                            <span className="text-[9px] font-mono bg-emerald-600 text-white px-1.5 py-0.5 rounded-none uppercase tracking-wider font-bold">Performance</span>
                            <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider">현장 운영 핵심 성과</h3>
                          </div>
                          {project.results ? (
                            <div className="space-y-3.5 bg-white border border-neutral-200 p-6 shadow-3xs rounded-none">
                              {project.results.map((result, i) => {
                                const hasArrow = result.includes(" -> ");
                                if (hasArrow) {
                                  const [goal, outcome] = result.split(" -> ");
                                  return (
                                    <div key={i} className="border-b border-neutral-100 last:border-none pb-3.5 mb-3.5 last:pb-0 last:mb-0">
                                      <div className="flex items-center gap-2 mb-1.5">
                                        <span className="text-[9px] font-mono text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded-none border border-neutral-200/50 font-bold">0{i+1}</span>
                                        <p className="text-xs sm:text-[13px] font-bold text-neutral-900">{goal}</p>
                                      </div>
                                      <div className="ml-7 p-3 bg-neutral-50/70 border-l-2 border-neutral-800 rounded-none">
                                        <p className="text-xs sm:text-[13px] text-neutral-800 leading-relaxed whitespace-pre-line font-normal">{outcome}</p>
                                      </div>
                                    </div>
                                  );
                                }
                                return (
                                  <div key={i} className="text-xs sm:text-[13px] font-normal flex items-start gap-3 py-2 border-b border-neutral-100 last:border-none">
                                    <span className="text-[9px] font-mono text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded-none border border-neutral-200/50 font-bold">0{i+1}</span>
                                    <span className="flex-1 text-neutral-800 font-normal leading-relaxed">{result}</span>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="p-6 border border-dashed border-neutral-200 bg-white/50 text-neutral-400 text-xs text-center font-sans">
                              등록된 운영 성과 데이터가 없습니다.
                            </div>
                          )}
                        </div>

                        {/* Right: Onsite Process Block (현장 실무 실행) */}
                        <div className="lg:col-span-6 space-y-6">
                          <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
                            <span className="text-[9px] font-mono bg-black text-white px-1.5 py-0.5 rounded-none uppercase tracking-wider font-bold">On-Site Operation</span>
                            <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider">현장 실행 및 통제</h3>
                          </div>
                          {project.process && project.process[1] ? (
                            <div className="p-6 border border-neutral-200 bg-white shadow-3xs space-y-4 rounded-none">
                              <h4 className="text-sm font-bold text-neutral-900 flex justify-between items-center border-b border-neutral-100 pb-2">
                                <span className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 bg-black rounded-full" />
                                  {project.process[1].phase}
                                </span>
                                <span className="text-[9px] font-mono text-neutral-400 font-bold">STEP 03</span>
                              </h4>
                              <ul className="space-y-3">
                                {project.process[1].items.map((item, j) => (
                                  <li key={j} className="text-xs sm:text-[13px] text-neutral-750 flex items-start gap-2 leading-relaxed">
                                    <span className="mt-1.5 w-1 h-1 bg-neutral-400 rounded-full shrink-0" />
                                    <span className="font-normal text-neutral-800">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : (
                            <div className="p-6 border border-dashed border-neutral-200 bg-white/50 text-neutral-400 text-xs text-center font-sans">
                              현장 운영 프로세스가 등록되지 않았습니다.
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  )}

                  {slidePage === 4 && (
                    isFestival ? (
                      // If festival: Render On-site operation (from slidePage === 3 previously) on Page 4
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start animate-fade-in">
                        {/* Left: Onsite Results Block (현장 운영 성과) */}
                        <div className="lg:col-span-6 space-y-6">
                          <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
                            <span className="text-[9px] font-mono bg-emerald-600 text-white px-1.5 py-0.5 rounded-none uppercase tracking-wider font-bold">Performance</span>
                            <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider">현장 운영 핵심 성과</h3>
                          </div>
                          {project.results ? (
                            <div className="space-y-3.5 bg-white border border-neutral-200 p-6 shadow-3xs rounded-none">
                              {project.results.map((result, i) => {
                                const hasArrow = result.includes(" -> ");
                                if (hasArrow) {
                                  const [goal, outcome] = result.split(" -> ");
                                  return (
                                    <div key={i} className="border-b border-neutral-100 last:border-none pb-3.5 mb-3.5 last:pb-0 last:mb-0">
                                      <div className="flex items-center gap-2 mb-1.5">
                                        <span className="text-[9px] font-mono text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded-none border border-neutral-200/50 font-bold">0{i+1}</span>
                                        <p className="text-xs sm:text-[13px] font-bold text-neutral-950">{goal}</p>
                                      </div>
                                      <div className="ml-7 p-3 bg-neutral-50/70 border-l-2 border-neutral-800 rounded-none">
                                        <p className="text-xs sm:text-[13px] text-neutral-800 leading-relaxed whitespace-pre-line font-normal">{outcome}</p>
                                      </div>
                                    </div>
                                  );
                                }
                                return (
                                  <div key={i} className="text-xs sm:text-[13px] font-normal flex items-start gap-3 py-2 border-b border-neutral-100 last:border-none">
                                    <span className="text-[9px] font-mono text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded-none border border-neutral-200/50 font-bold">0{i+1}</span>
                                    <span className="flex-1 text-neutral-850 font-normal leading-relaxed">{result}</span>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="p-6 border border-dashed border-neutral-200 bg-white/50 text-neutral-400 text-xs text-center font-sans">
                              등록된 운영 성과 데이터가 없습니다.
                            </div>
                          )}
                        </div>

                        {/* Right: Onsite Process Block (현장 실무 실행) */}
                        <div className="lg:col-span-6 space-y-6">
                          <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
                            <span className="text-[9px] font-mono bg-black text-white px-1.5 py-0.5 rounded-none uppercase tracking-wider font-bold font-bold">On-Site Operation</span>
                            <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider">현장 실행 및 통제</h3>
                          </div>
                          {project.process && project.process[1] ? (
                            <div className="p-6 border border-neutral-200 bg-white shadow-3xs space-y-4 rounded-none">
                              <h4 className="text-sm font-bold text-neutral-900 flex justify-between items-center border-b border-neutral-100 pb-2">
                                <span className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 bg-black rounded-full" />
                                  {project.process[1].phase}
                                </span>
                                <span className="text-[9px] font-mono text-neutral-400 font-bold">STEP 04</span>
                              </h4>
                              <ul className="space-y-3">
                                {project.process[1].items.map((item, j) => (
                                  <li key={j} className="text-xs sm:text-[13px] text-neutral-750 flex items-start gap-2 leading-relaxed">
                                    <span className="mt-1.5 w-1 h-1 bg-neutral-400 rounded-full shrink-0" />
                                    <span className="font-normal text-neutral-800">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : (
                            <div className="p-6 border border-dashed border-neutral-200 bg-white/50 text-neutral-400 text-xs text-center font-sans">
                              현장 운영 프로세스가 등록되지 않았습니다.
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      // If not festival: Render Review (originally slidePage === 4) on Page 4
                      <div className="space-y-8 animate-fade-in">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
                          <div className="lg:col-span-6 space-y-6">
                            <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
                              <span className="text-[9px] font-mono bg-blue-600 text-white px-1.5 py-0.5 rounded-none uppercase tracking-wider font-bold">Review</span>
                              <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider">사후 관리 및 피드백</h3>
                            </div>
                            {project.process && project.process[2] ? (
                              <div className="p-6 border border-neutral-200 bg-white shadow-3xs space-y-4 rounded-none">
                                <h4 className="text-sm font-bold text-neutral-950 flex justify-between items-center border-b border-neutral-100 pb-2">
                                  <span className="flex items-center gap-2 font-bold">
                                    <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full" />
                                    {project.process[2].phase}
                                  </span>
                                  <span className="text-[9px] font-mono text-neutral-400 font-bold">STEP 04</span>
                                </h4>
                                <ul className="space-y-3">
                                  {project.process[2].items.map((item, j) => (
                                    <li key={j} className="text-xs sm:text-[13px] text-neutral-750 flex items-start gap-2 leading-relaxed">
                                      <span className="mt-1.5 w-1 h-1 bg-neutral-400 rounded-full shrink-0" />
                                      <span className="font-normal text-neutral-850">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ) : (
                              <div className="p-6 border border-dashed border-neutral-200 bg-white/50 text-neutral-500 text-xs text-left leading-relaxed rounded-none space-y-3">
                                <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-widest border-b border-neutral-100 pb-1 flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 bg-neutral-950 rounded-full" />
                                  사후 성과 분석 및 리포팅
                                </h4>
                                <p className="font-normal text-neutral-700">
                                  프로젝트 공식 완수 후 축제 사무국 및 입점 업체들과의 최종 정산 업무를 차질 없이 마무리하였습니다. 현장에서 도출된 피드백 및 정합성 데이터를 체계화하여 차기 페스티벌 기획 및 매뉴얼 강화에 반영하였습니다.
                                </p>
                              </div>
                            )}
                          </div>

                          <div className="lg:col-span-6 space-y-6">
                            <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
                              <span className="text-[9px] font-mono bg-neutral-950 text-white px-1.5 py-0.5 rounded-none uppercase tracking-wider font-bold">Summary</span>
                              <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider">프로젝트 운영 총평</h3>
                            </div>
                            <div className="bg-[#FAF9F6] p-6 border border-neutral-200/60 rounded-none space-y-4">
                              <p className="text-xs sm:text-[13px] text-neutral-700 leading-relaxed text-justify font-sans">
                                본 프로젝트는 전사적 협업 체계와 철저한 모니터링을 바탕으로 현장 돌발 리스크를 완벽하게 최소화하였습니다. 대기 동선의 효과적인 통합 제어 및 고정밀 데이터 검증 프로세스를 구축하여 관중 및 파트너 모두에게 검증된 신뢰를 선사했습니다.
                              </p>
                              <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500">
                                <span className="font-medium">준수 여부</span>
                                <span className="font-bold text-neutral-900 bg-neutral-100 px-2.5 py-0.5 border border-neutral-200">100% 완수 및 이행</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}

                  {slidePage === 5 && (
                    isFestival ? (
                      // If festival: Render Review (originally slidePage === 4) on Page 5
                      <div className="space-y-8 animate-fade-in">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
                          <div className="lg:col-span-6 space-y-6">
                            <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
                              <span className="text-[9px] font-mono bg-blue-600 text-white px-1.5 py-0.5 rounded-none uppercase tracking-wider font-bold">Review</span>
                              <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider">사후 관리 및 피드백</h3>
                            </div>
                            {project.process && project.process[2] ? (
                              <div className="p-6 border border-neutral-200 bg-white shadow-3xs space-y-4 rounded-none">
                                <h4 className="text-sm font-bold text-neutral-950 flex justify-between items-center border-b border-neutral-100 pb-2">
                                  <span className="flex items-center gap-2 font-bold">
                                    <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full" />
                                    {project.process[2].phase}
                                  </span>
                                  <span className="text-[9px] font-mono text-neutral-400 font-bold">STEP 05</span>
                                </h4>
                                <ul className="space-y-3">
                                  {project.process[2].items.map((item, j) => (
                                    <li key={j} className="text-xs sm:text-[13px] text-neutral-750 flex items-start gap-2 leading-relaxed">
                                      <span className="mt-1.5 w-1 h-1 bg-neutral-400 rounded-full shrink-0" />
                                      <span className="font-normal text-neutral-850">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ) : (
                              <div className="p-6 border border-dashed border-neutral-200 bg-white/50 text-neutral-500 text-xs text-left leading-relaxed rounded-none space-y-3">
                                <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-widest border-b border-neutral-100 pb-1 flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 bg-neutral-950 rounded-full" />
                                  사후 성과 분석 및 리포팅
                                </h4>
                                <p className="font-normal text-neutral-700">
                                  프로젝트 공식 완수 후 축제 사무국 및 입점 업체들과의 최종 정산 업무를 차질 없이 마무리하였습니다. 현장에서 도출된 피드백 및 정합성 데이터를 체계화하여 차기 페스티벌 기획 및 매뉴얼 강화에 반영하였습니다.
                                </p>
                              </div>
                            )}
                          </div>

                          <div className="lg:col-span-6 space-y-6">
                            <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
                              <span className="text-[9px] font-mono bg-neutral-950 text-white px-1.5 py-0.5 rounded-none uppercase tracking-wider font-bold font-bold">Summary</span>
                              <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider">프로젝트 운영 총평</h3>
                            </div>
                            <div className="bg-[#FAF9F6] p-6 border border-neutral-200/60 rounded-none space-y-4">
                              <p className="text-xs sm:text-[13px] text-neutral-700 leading-relaxed text-justify font-sans">
                                본 프로젝트는 전사적 협업 체계와 철저한 모니터링을 바탕으로 현장 돌발 리스크를 완벽하게 최소화하였습니다. 대기 동선의 효과적인 통합 제어 및 고정밀 데이터 검증 프로세스를 구축하여 관중 및 파트너 모두에게 검증된 신뢰를 선사했습니다.
                              </p>
                              <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500">
                                <span className="font-medium">준수 여부</span>
                                <span className="font-bold text-neutral-900 bg-neutral-100 px-2.5 py-0.5 border border-neutral-200">100% 완수 및 이행</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // If not festival: Render Gallery (originally slidePage === 5) on Page 5
                      <div className="space-y-6 animate-fade-in font-sans text-neutral-850">
                        <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
                          <span className="text-[9px] font-mono bg-neutral-950 text-white px-1.5 py-0.5 rounded-none uppercase tracking-wider font-bold">Gallery Archive</span>
                          <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider">갤러리 아카이브</h3>
                        </div>
                        {project.images && project.images.length > 0 ? (
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {project.images.map((img, i) => (
                              <div key={i} className="bg-neutral-50 overflow-hidden border border-neutral-200 shadow-3xs transition-all duration-300 rounded-none aspect-[4/3] flex items-center justify-center group/gallery">
                                <OptimizedImage 
                                  src={img} 
                                  alt={`${project.title} gallery ${i}`} 
                                  className="w-full h-full object-cover select-none transition-transform duration-500 group-hover/gallery:scale-[1.04]" 
                                  referrerPolicy="no-referrer" 
                                />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-16 border border-dashed border-neutral-200 bg-neutral-50/50 text-neutral-400 text-xs text-center font-mono">
                            등록된 갤러리 아카이브 이미지가 없습니다.
                          </div>
                        )}
                      </div>
                    )
                  )}

                  {slidePage === 6 && isFestival && (
                    // If festival: Render Gallery on Page 6
                    <div className="space-y-6 animate-fade-in font-sans text-neutral-800">
                      <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
                         <span className="text-[9px] font-mono bg-neutral-950 text-white px-1.5 py-0.5 rounded-none uppercase tracking-wider font-bold">Gallery Archive</span>
                        <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider">갤러리 아카이브</h3>
                      </div>
                      {project.images && project.images.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                          {project.images.map((img, i) => (
                            <div key={i} className="bg-neutral-50 overflow-hidden border border-neutral-200 shadow-3xs transition-all duration-300 rounded-none aspect-[4/3] flex items-center justify-center group/gallery">
                              <OptimizedImage 
                                src={img} 
                                alt={`${project.title} gallery ${i}`} 
                                className="w-full h-full object-cover select-none transition-transform duration-500 group-hover/gallery:scale-[1.04]" 
                                referrerPolicy="no-referrer" 
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-16 border border-dashed border-neutral-200 bg-neutral-50/50 text-neutral-400 text-xs text-center font-mono">
                          등록된 갤러리 아카이브 이미지가 없습니다.
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
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
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [activeSection]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [portfolioData, setPortfolioData] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAdmin(window.location.pathname === "/admin");
    }
  }, []);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch("/api/portfolio");
        if (res.ok) {
          const json = await res.json();
          setPortfolioData(json);
        }
      } catch (err) {
        console.error("Failed to fetch dynamic portfolio", err);
      }
    };
    fetchPortfolio();
  }, []);

  useEffect(() => {
    const featuredList = portfolioData?.featuredProjects || DEFAULT_PORTFOLIO_DATA.featuredProjects || [];
    const personalList = portfolioData?.personalProjects || DEFAULT_PORTFOLIO_DATA.personalProjects || [];
    const allImages = [
      ...FESTIVAL_POSTERS.map(p => p.src),
      ...CONCERT_POSTERS.map(p => p.src),
      ...featuredList.map(p => p.image).filter(Boolean),
      ...personalList.map(p => p.image).filter(Boolean),
      ...featuredList.flatMap(p => p.images || []).filter(Boolean),
      ...personalList.flatMap(p => p.images || []).filter(Boolean)
    ];
    // Remove duplicates
    const uniqueImages = Array.from(new Set(allImages));
    // Asynchronously prefetch so browsers keep them cached
    uniqueImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, [portfolioData]);

  const handleSavePortfolio = async (updatedData: any) => {
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData)
      });
      if (res.ok) {
        setPortfolioData(updatedData);
        return true;
      }
    } catch (err) {
      console.error("Failed to save portfolio state:", err);
    }
    return false;
  };

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

  // Dynamic portfolio elements fallback to high-fidelity defaults
  const featuredProjects: Project[] = portfolioData?.featuredProjects || DEFAULT_PORTFOLIO_DATA.featuredProjects;
  const personalProjects: Project[] = portfolioData?.personalProjects || DEFAULT_PORTFOLIO_DATA.personalProjects;
  const introductionText = portfolioData?.introduction || DEFAULT_PORTFOLIO_DATA.introduction;
  const profileImage = portfolioData?.profileImage || DEFAULT_PORTFOLIO_DATA.profileImage;
  const educationData = portfolioData?.education || DEFAULT_PORTFOLIO_DATA.education;
  const certificatesData = portfolioData?.certificates || DEFAULT_PORTFOLIO_DATA.certificates;
  const workExperienceData = portfolioData?.workExperience || DEFAULT_PORTFOLIO_DATA.workExperience;
  const activitiesData = portfolioData?.activities || DEFAULT_PORTFOLIO_DATA.activities;
  const contactData = portfolioData?.contact || DEFAULT_PORTFOLIO_DATA.contact;

  if (isAdmin) {
    return (
      <AdminPanel 
        dbData={portfolioData || DEFAULT_PORTFOLIO_DATA} 
        onSave={handleSavePortfolio} 
      />
    );
  }

  const dummyProjects: any[] = [];
  /* Legacy duplicate arrays commented out:
  const dummyProjects_discard: any = [
    {
      title: "2024 WATERBOMB",
      category: "운영",
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
      category: "운영",
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
      category: "운영",
      year: "2024",
      image: "https://raw.githubusercontent.com/2green-lee/Portfolio/301715e6090e002a7c306c6d76f35d8d78ed92f4/2024incheonrock.png",
      contribution: "25%",
      objectPosition: "top",
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
      category: "운영",
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
        title: "기획, 운영",
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
        title: "기획, 운영",
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
        title: "기획, 운영",
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
      description: "평화로운 일요일 오후, 차한잔과 함께 관람할 수 있는 힐링 공연. 아티스트가 직접 만든 향과 음악을 통해 공감각적 형태 공연을 향유한다.",
      fullDescription: "평화로운 일요일 오후, 차 한 잔과 함께 즐기는 힐링 공연 시리즈입니다. 아티스트가 직접 조향한 향기와 음악을 결합하여 관객들에게 공감각적인 경험을 선사하는 것을 목표로 했습니다.\n\n부산 지역의 소규모 편성 아티스트들에게 무대 기회를 제공하고, 아티스트의 정체성이 담긴 굿즈 제작을 통해 공연의 가치를 확장했습니다. 기획부터 제작, 홍보, 현장 운영까지 전 과정을 주도하며 따뜻한 감성의 브랜드 공연을 구축했습니다.",
      role: {
        title: "기획, 운영",
        items: [
          "Planning: 기획서 작성\n프로젝트 전체 콘셉트 수립",
          "Booking: 출연 아티스트 섭외\n공연 베뉴(공간) 섭외 및 일정 조율",
          "Promotion: 인스타그램 기반 홍보 기획 및 운영\n라이브 영상 촬영 및 콘텐츠 활용",
          "Production: 메이킹·라이브 영상 제작 및 유통"
        ]
      },
      results: [
        "아티스트 섭외 및 공연 전석 매진",
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
  */

  const featuredList = portfolioData?.featuredProjects || DEFAULT_PORTFOLIO_DATA.featuredProjects || [];
  const personalList = portfolioData?.personalProjects || DEFAULT_PORTFOLIO_DATA.personalProjects || [];
  const allProjects = [...featuredList, ...personalList];

  const currentProjectIndex = selectedProject ? allProjects.findIndex(p => p.title === selectedProject.title) : -1;
  const hasPrev = currentProjectIndex > 0;
  const hasNext = currentProjectIndex >= 0 && currentProjectIndex < allProjects.length - 1;

  const handlePrevProject = () => {
    if (hasPrev) {
      setSelectedProject(allProjects[currentProjectIndex - 1]);
    }
  };

  const handleNextProject = () => {
    if (hasNext) {
      setSelectedProject(allProjects[currentProjectIndex + 1]);
    }
  };

  const activeIndex = SECTIONS.findIndex(s => s.id === activeSection);

  return (
    <div className="h-screen w-screen overflow-hidden font-sans selection:bg-black selection:text-white relative flex flex-col bg-white">
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
        onPrev={handlePrevProject}
        onNext={handleNextProject}
        hasPrev={hasPrev}
        hasNext={hasNext}
        currentIndex={currentProjectIndex}
        totalCount={allProjects.length}
      />

      {/* Fixed Top Header */}
      <header className="h-[90px] w-full bg-white text-black z-[110] px-8 md:px-12 flex justify-between items-center border-b border-black/5 shrink-0">
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter leading-none mb-1">
            Lee-Geunil<span className="text-xs align-top ml-0.5">®</span>
          </h1>
          <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest">Creative Strategist</span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-4 text-[11px] font-medium">
          <div className="flex flex-col gap-1">
            <button onClick={() => scrollTo("about")} className="hover:opacity-40 transition-opacity text-left">About</button>
            <button onClick={() => scrollTo("project1")} className="hover:opacity-40 transition-opacity text-left">Project</button>
            <button onClick={() => scrollTo("activities")} className="hover:opacity-40 transition-opacity text-left">Contact</button>
          </div>
          <div className="flex flex-col gap-1">
            <a href="https://www.instagram.com/darkreen___n/" target="_blank" rel="noopener noreferrer" className="hover:opacity-40 transition-opacity">Instagram</a>
            <a href="mailto:lgi12@naver.com" className="hover:opacity-40 transition-opacity">Mail</a>
          </div>
          <div className="hidden md:flex flex-col gap-1 items-end opacity-40">
            <span>Seoul, KR</span>
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
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className={`h-full w-full overflow-y-auto px-8 md:px-20 pt-[46px] pb-80 ${SECTIONS[0].color}`}
                      >
                        <div className="max-w-[1200px] w-full mx-auto">
                          {isTransitioning ? (
                            <div className="flex items-center justify-center min-h-[400px]">
                              <div className="w-5 h-5 border-2 border-neutral-300 border-t-neutral-800 rounded-full animate-spin" />
                            </div>
                          ) : (
                            <>
                              {/* Introduction Headline */}
                              <motion.div 
                                variants={staggerItem}
                                className="mb-16 flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-center"
                              >
                                <div className="flex-1 flex flex-col justify-center items-center md:items-start w-full">
                                  <div className="relative inline-block pb-1.5 max-w-full overflow-visible">
                                    <h2 className="font-sans font-light text-[6vw] xs:text-[5.2vw] sm:text-[4.2vw] md:text-[3.2vw] lg:text-[38px] xl:text-[44px] text-neutral-900 leading-relaxed tracking-tight pl-2 pr-2 relative z-10 select-text">
                                      {introductionText}
                                    </h2>
                                  </div>
                                </div>
                              </motion.div>

                              {/* Section 1: Education & Contact */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                {/* Left Column: Education */}
                                <motion.div variants={staggerItem}>
                                  <div className="bg-white/80 backdrop-blur-sm border border-neutral-200/60 rounded-none p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300">
                                    <p className="text-xs font-mono font-medium uppercase text-neutral-400 mb-4 tracking-wider">Education</p>
                                    <div className="flex justify-between items-start gap-4">
                                      <div>
                                        <h4 className="text-base md:text-lg font-bold text-neutral-800">{educationData?.name || "부산대학교"}</h4>
                                        <p className="text-xs font-medium text-neutral-500 mt-1">{educationData?.major || "항공우주공학 & 예술문화영상학"}</p>
                                      </div>
                                      <span className="text-xs font-mono text-neutral-400 bg-neutral-100 px-2.5 py-1 rounded-none shrink-0">{educationData?.period || "2013 - 2021"}</span>
                                    </div>
                                  </div>
                                </motion.div>

                                {/* Right Column: Contact */}
                                <motion.div variants={staggerItem}>
                                  <div className="bg-white/80 backdrop-blur-sm border border-neutral-200/60 rounded-none p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300">
                                    <p className="text-xs font-mono font-medium uppercase text-neutral-400 mb-4 tracking-wider">Contact</p>
                                    <div className="space-y-3">
                                      <div className="flex items-center gap-3 text-sm text-neutral-600">
                                        <span className="font-medium text-neutral-400 w-16 text-xs font-mono uppercase tracking-wider">전화번호</span>
                                        <a href="tel:010-9335-9620" className="hover:text-rose-500 hover:underline transition-colors font-sans text-neutral-700 font-medium">010-9335-9620</a>
                                      </div>
                                      <div className="flex items-center gap-3 text-sm text-neutral-600">
                                        <span className="font-medium text-neutral-400 w-16 text-xs font-mono uppercase tracking-wider">이메일</span>
                                        <a href="mailto:lgi12@naver.com" className="hover:text-rose-500 hover:underline transition-colors font-sans text-neutral-700 font-medium">lgi12@naver.com</a>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              </div>

                              {/* Section 2: Certificates & Technical Stack */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 items-stretch">
                                {/* Left Column: Certificates */}
                                <motion.div variants={staggerItem} className="h-full flex flex-col">
                                  <div className="bg-white/80 backdrop-blur-sm border border-neutral-200/60 rounded-none p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between">
                                    <div>
                                      <p className="text-xs font-mono font-medium uppercase text-neutral-400 mb-6 tracking-wider">Certificates</p>
                                      <div className="space-y-4">
                                        {(certificatesData || []).map((cert: any, idx: number) => {
                                          const hasBar = cert.score && cert.maxScale;
                                          if (hasBar) {
                                            return (
                                              <div 
                                                key={idx} 
                                                className="space-y-2.5 p-3.5 rounded-none border border-neutral-100 bg-neutral-50/50 hover:bg-neutral-900 group/cert transition-all duration-300 cursor-default shadow-3xs"
                                              >
                                                <div className="flex justify-between items-end">
                                                  <div>
                                                    <h5 className="text-[13px] font-bold tracking-tight text-neutral-800 group-hover/cert:text-white transition-colors duration-300">{cert.title}</h5>
                                                    <p className="text-xs font-medium text-neutral-500 group-hover/cert:text-neutral-300 transition-colors duration-300">{cert.subtitle || cert.score}</p>
                                                  </div>
                                                  <span className="text-[10px] font-mono text-neutral-400 group-hover/cert:text-neutral-300 transition-colors duration-300">{cert.score}/{cert.maxScale}</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-neutral-200/65 group-hover/cert:bg-neutral-800 rounded-none overflow-hidden transition-colors duration-300">
                                                  <motion.div 
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${(cert.score / cert.maxScale) * 100}%` }}
                                                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                                    className="h-full bg-neutral-800 group-hover/cert:bg-rose-400 rounded-none transition-colors duration-300"
                                                  />
                                                </div>
                                              </div>
                                            );
                                          }
                                          return null;
                                        })}

                                        <div className="pt-4 border-t border-neutral-100 space-y-3">
                                          {(certificatesData || []).map((cert: any, idx: number) => {
                                            const hasBar = cert.score && cert.maxScale;
                                            if (!hasBar) {
                                              return (
                                                <div 
                                                  key={idx} 
                                                  className="flex justify-between items-center bg-neutral-50/50 p-3.5 rounded-none border border-neutral-100 hover:bg-neutral-900 group/cert transition-all duration-300 cursor-default shadow-3xs"
                                                >
                                                  <h5 className="text-[13px] font-bold tracking-tight text-neutral-800 group-hover/cert:text-white transition-colors duration-300">{cert.title}</h5>
                                                  <p className="text-xs font-medium text-neutral-500 group-hover/cert:text-neutral-300 transition-colors duration-300">{cert.subtitle || cert.score}</p>
                                                </div>
                                              );
                                            }
                                            return null;
                                          })}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>

                                {/* Right Column: Technical Stack */}
                                <motion.div variants={staggerItem} className="h-full flex flex-col">
                                  <div className="bg-white/80 backdrop-blur-sm border border-neutral-200/60 rounded-none p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between">
                                    <div className="space-y-8 w-full">
                                      {(portfolioData?.techStack || DEFAULT_PORTFOLIO_DATA.techStack || []).map((group: any) => (
                                        <div key={group.label} className="group">
                                          <p className="text-xs font-mono font-medium uppercase mb-6 text-neutral-400 tracking-wider">{group.label}</p>
                                          <div className="flex flex-wrap gap-2.5">
                                            {group.items.map(item => (
                                              <span key={item} className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-none border border-neutral-200/70 bg-neutral-50/50 text-xs sm:text-[13px] md:text-[14px] font-sans font-medium hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all cursor-default text-neutral-900 shadow-3xs">
                                                {item}
                                              </span>
                                            ))}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </motion.div>
                              </div>

                              {/* Section 3: Work Experience */}
                              <div className="mt-12">
                                <p className="text-xs font-mono font-medium uppercase text-neutral-400 mb-6 tracking-wider">Work Experience</p>
                                <div className="space-y-6">
                                  {(workExperienceData || []).map((exp: any, i: number) => (
                                    <motion.div 
                                      key={i} 
                                      variants={staggerItem}
                                      className="bg-white/80 backdrop-blur-sm border border-neutral-200/60 rounded-none p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row items-start gap-y-4 gap-x-12 md:gap-x-16"
                                    >
                                      {/* Left Column: Timeline */}
                                      <div className="w-full md:w-44 shrink-0">
                                        <span className="text-xs font-mono text-neutral-400 bg-neutral-100 px-2.5 py-1.5 rounded-none inline-block">
                                          {exp.period}
                                        </span>
                                      </div>

                                      {/* Right Column: Company, Role Tags & Bullets */}
                                      <div className="flex-1 space-y-4">
                                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                          <h3 className="text-base md:text-[17px] font-bold text-neutral-900">{exp.company}</h3>
                                          <span className="text-[11px] md:text-xs text-neutral-500 font-normal">
                                            {exp.tags}
                                          </span>
                                        </div>

                                        <ul className="space-y-2 md:space-y-2.5">
                                          {(exp.desc || []).map((bullet: string, idx: number) => (
                                            <li 
                                              key={idx} 
                                              className="text-[13px] md:text-sm text-neutral-700 leading-relaxed flex items-start"
                                            >
                                              <span className="mr-2 text-neutral-400 select-none">•</span>
                                              <span>{bullet}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </motion.section>
                    )}

                    {activeSection === "project1" && (
                      <motion.section
                        key="project1"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className={`h-full w-full overflow-y-auto px-8 md:px-20 pt-[46px] pb-80 ${SECTIONS[1].color}`}
                      >
                        <div className="max-w-[1200px] mx-auto space-y-24">
                          {isTransitioning ? (
                            <div className="flex items-center justify-center min-h-[400px]">
                              <div className="w-5 h-5 border-2 border-neutral-300 border-t-neutral-800 rounded-full animate-spin" />
                            </div>
                          ) : (
                            <>
                              {/* Segment 1: Operation */}
                          <div className="space-y-12">
                            <motion.div variants={staggerItem} className="border-b border-black/10 pb-4 flex items-baseline justify-between select-none">
                              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900 flex items-baseline gap-2">
                                <span>운영</span>
                                <span className="text-[11px] font-mono font-medium text-neutral-400 uppercase tracking-widest pl-1">Operations</span>
                              </h3>
                            </motion.div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-[90px]">
                              {featuredProjects.map((project, idx) => {
                                const isWide = project.title === "페스티벌 운영" || project.title === "공연 운영";
                                return (
                                  <div key={idx} className="col-span-1">
                                    <ProjectCard project={project} onClick={setSelectedProject} imageAspect="aspect-[300/220]" isWide={isWide} />
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Segment 2: Planning */}
                          <div className="space-y-12">
                            <motion.div variants={staggerItem} className="border-b border-black/10 pb-4 flex items-baseline justify-between select-none">
                              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900 flex items-baseline gap-2">
                                <span>기획</span>
                                <span className="text-[11px] font-mono font-medium text-neutral-400 uppercase tracking-widest pl-1">Planning</span>
                              </h3>
                            </motion.div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-[90px]">
                              {personalProjects.map((project, idx) => (
                                <ProjectCard key={idx} project={project} onClick={setSelectedProject} imageAspect="aspect-[300/220]" />
                              ))}
                            </div>
                          </div>
                            </>
                          )}
                        </div>
                      </motion.section>
                    )}

                    {activeSection === "activities" && (
                      <motion.section
                        key="activities"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className={`h-full w-full overflow-hidden px-8 md:px-20 pt-[46px] pb-80 ${SECTIONS[2].color}`}
                      >
                        <div className="max-w-[1200px] w-full mx-auto">
                          {isTransitioning ? (
                            <div className="flex items-center justify-center min-h-[400px]">
                              <div className="w-5 h-5 border-2 border-neutral-300 border-t-neutral-800 rounded-full animate-spin" />
                            </div>
                          ) : (
                            <>
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
                                  {(activitiesData || []).map((act: any, i: number) => (
                                    <div key={i} className="group border-b border-black/10 pb-8">
                                      <div className="mb-2">
                                        <h3 className="text-xl font-bold group-hover:translate-x-2 transition-transform">{act.title}</h3>
                                      </div>
                                      <div className="flex items-center gap-3 mb-4">
                                        <p className="text-[10px] font-mono uppercase tracking-widest opacity-30">{act.org}</p>
                                        <span className="text-[10px] font-mono opacity-40">{act.period}</span>
                                      </div>
                                      <ul className="space-y-2">
                                        {(act.desc || []).map((d: string, j: number) => (
                                          <li key={j} className="text-sm opacity-60 flex items-start gap-3">
                                            <span className="mt-2 w-1 h-1 bg-black/20 rounded-full shrink-0" />
                                            {d}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </motion.div>
                                <motion.div variants={staggerItem} className="flex justify-center md:justify-end">
                                  {/* Vertical Business Card */}
                                  <div className="w-64 aspect-[4/7] bg-white text-black p-8 flex flex-col justify-between border border-black/15 relative overflow-hidden group/card">
                                    {/* Card Texture/Pattern */}
                                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                                      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '12px 12px' }} />
                                    </div>

                                    <div className="relative z-10">
                                      <div className="mb-16">
                                        <h3 className="text-2xl font-bold tracking-tighter leading-none mb-2 uppercase">
                                          {(contactData?.name || "LEE GEUNIL").split(" ")[0]}<br />
                                          {(contactData?.name || "LEE GEUNIL").split(" ")[1] || ""}
                                        </h3>
                                        <p className="text-[9px] font-mono uppercase tracking-[0.3em] opacity-40">Creative Strategist</p>
                                      </div>
                                      
                                      <div className="space-y-6">
                                        <div>
                                          <p className="text-[8px] font-mono uppercase opacity-60 mb-1">Contact</p>
                                          <p className="text-[11px] font-medium tracking-tight">{contactData?.email || "lgi12@naver.com"}</p>
                                          <p className="text-[11px] font-medium tracking-tight">{contactData?.phone || "010-9335-9620"}</p>
                                        </div>
                                        <div>
                                          <p className="text-[8px] font-mono uppercase opacity-60 mb-1">Location</p>
                                          <p className="text-[11px] font-medium tracking-tight">{contactData?.location || "Seoul, South Korea"}</p>
                                        </div>
                                        <div>
                                          <p className="text-[8px] font-mono uppercase opacity-60 mb-1">Instagram</p>
                                          <a href={`https://www.instagram.com/${(contactData?.instagram || "darkreen___n").replace("@", "")}/`} target="_blank" rel="noopener noreferrer" className="text-[11px] font-medium tracking-tight hover:opacity-40 transition-opacity block">
                                            {contactData?.instagram || "@darkreen___n"}
                                          </a>
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
                            </>
                          )}
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

// ============================================================================
// ADMIN PANEL (포트폴리오 관리 시스템)
// ============================================================================
function AdminPanel({ dbData, onSave }: { dbData: any; onSave: (data: any) => Promise<boolean> }) {
  const [activeTab, setActiveTab] = useState("common");
  const [formData, setFormData] = useState<any>(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; url: string }[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [profileUploadStatus, setProfileUploadStatus] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (dbData) {
      setFormData(JSON.parse(JSON.stringify(dbData)));
    }
  }, [dbData]);

  if (!formData) {
    return (
      <div className="min-h-screen bg-zinc-950 text-neutral-300 flex items-center justify-center font-mono p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-t-white border-zinc-800 rounded-full animate-spin" />
          <p className="text-sm">관리자 데이터 테이블 로딩 중...</p>
        </div>
      </div>
    );
  }

  const handleSimpleFieldChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFieldChange = (section: string, field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (section: string, index: number, field: string, value: any) => {
    setFormData((prev: any) => {
      const arr = [...(prev[section] || [])];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, [section]: arr };
    });
  };

  const handleArrayDelete = (section: string, index: number) => {
    setFormData((prev: any) => {
      const arr = [...(prev[section] || [])];
      arr.splice(index, 1);
      return { ...prev, [section]: arr };
    });
  };

  const handleArrayAdd = (section: string, defaultValue: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [section]: [...(prev[section] || []), defaultValue]
    }));
  };

  const handleArrayBulletAdd = (section: string, index: number, listField: string, defaultValue = "") => {
    setFormData((prev: any) => {
      const arr = [...(prev[section] || [])];
      const item = { ...arr[index] };
      item[listField] = [...(item[listField] || []), defaultValue];
      arr[index] = item;
      return { ...prev, [section]: arr };
    });
  };

  const handleArrayBulletChange = (section: string, index: number, listField: string, bulletIndex: number, value: any) => {
    setFormData((prev: any) => {
      const arr = [...(prev[section] || [])];
      const item = { ...arr[index] };
      const bullets = [...(item[listField] || [])];
      bullets[bulletIndex] = value;
      item[listField] = bullets;
      arr[index] = item;
      return { ...prev, [section]: arr };
    });
  };

  const handleArrayBulletDelete = (section: string, index: number, listField: string, bulletIndex: number) => {
    setFormData((prev: any) => {
      const arr = [...(prev[section] || [])];
      const item = { ...arr[index] };
      const bullets = [...(item[listField] || [])];
      bullets.splice(bulletIndex, 1);
      item[listField] = bullets;
      arr[index] = item;
      return { ...prev, [section]: arr };
    });
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSave = async () => {
    setSaveStatus("saving");
    const success = await onSave(formData);
    if (success) {
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 2500);
    } else {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 4000);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      setUploadStatus("업로드 중...");
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Content = reader.result as string;
        try {
          const res = await fetch("/api/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fileName: file.name,
              fileContent: base64Content
            })
          });
          if (res.ok) {
            const data = await res.json();
            setUploadedFiles(prev => [
              { name: file.name, url: data.url },
              ...prev
            ]);
            setUploadStatus("성공!");
            setTimeout(() => setUploadStatus(""), 3000);
          } else {
            const errData = await res.json().catch(() => ({}));
            setUploadStatus(`실패: ${errData.error || res.statusText || "서버 에러"}`);
            setTimeout(() => setUploadStatus(""), 5000);
          }
        } catch (err: any) {
          console.error(err);
          setUploadStatus(`통신 오류: ${err.message || "오류"}`);
          setTimeout(() => setUploadStatus(""), 5000);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      setUploadStatus("파일 파싱 오류");
      setTimeout(() => setUploadStatus(""), 3000);
    }
  };

  const handleProfileImageUpload = async (file: File) => {
    try {
      setProfileUploadStatus("업로드 중...");
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Content = reader.result as string;
        try {
          const res = await fetch("/api/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fileName: file.name,
              fileContent: base64Content
            })
          });
          if (res.ok) {
            const data = await res.json();
            setFormData((prev: any) => ({
              ...prev,
              profileImage: data.url
            }));
            setProfileUploadStatus("성공!");
            setTimeout(() => setProfileUploadStatus(""), 3000);
          } else {
            const errData = await res.json().catch(() => ({}));
            setProfileUploadStatus(`실패: ${errData.error || res.statusText || "서버 에러"}`);
            setTimeout(() => setProfileUploadStatus(""), 5000);
          }
        } catch (err: any) {
          console.error(err);
          setProfileUploadStatus(`통신 오류: ${err.message || "오류"}`);
          setTimeout(() => setProfileUploadStatus(""), 5000);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      setProfileUploadStatus("파일 파싱 오류");
      setTimeout(() => setProfileUploadStatus(""), 3000);
    }
  };

  const copyUrl = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="min-h-screen w-full bg-zinc-950 text-zinc-100 flex flex-col font-sans select-none antialiased selection:bg-neutral-200 selection:text-black">
      {/* Top Admin Navigation Header */}
      <header className="h-[76px] px-8 border-b border-zinc-900 bg-zinc-950 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-3.5 h-3.5 bg-neutral-200 rounded-sm animate-pulse" />
          <div>
            <h1 className="text-lg font-bold tracking-tight">이근일 포트폴리오 관리자</h1>
            <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest">Dynamic Database Control Room</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.location.href = "/"}
            className="px-4 py-2 border border-zinc-800 rounded-sm text-xs hover:bg-zinc-900 hover:text-white transition-all font-medium"
          >
            ← 포트폴리오 홈
          </button>
          
          <button
            onClick={handleSave}
            disabled={saveStatus === "saving"}
            className={`px-5 py-2 rounded-sm text-xs font-bold font-mono tracking-tight flex items-center gap-2 transition-all ${
              saveStatus === "saving" ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" :
              saveStatus === "success" ? "bg-emerald-600 text-white" :
              saveStatus === "error" ? "bg-red-600 text-white" :
              "bg-white text-black hover:bg-zinc-200"
            }`}
          >
            <Save size={14} />
            {saveStatus === "saving" ? "저장 중..." :
             saveStatus === "success" ? "성공적으로 저장됨!" :
             saveStatus === "error" ? "저장 실패" :
             "저장 및 반영"}
          </button>
        </div>
      </header>

      {/* Main Panel layout wrapper */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Nav */}
        <aside className="w-64 border-r border-zinc-900 bg-zinc-950/80 p-6 flex flex-col gap-1 shrink-0">
          <p className="text-[10px] font-mono uppercase opacity-35 tracking-wider mb-3 px-3">Category Tabs</p>
          {[
            { id: "common", label: "공통 설정 (소개 & 스택)", detail: "Introduction, core stack" },
            { id: "career", label: "대외 활동 & 학력 & 경력", detail: "Timeline, certificates" },
            { id: "projects1", label: "프로젝트 I (수행 실무)", detail: "Featured projects list" },
            { id: "projects2", label: "프로젝트 II (개인 창작)", detail: "Personal artistic projects" },
            { id: "media", label: "미디어 자료 업로드", detail: "Asset drag-drop upload" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-3 text-left rounded-sm transition-all flex flex-col gap-0.5 group outline-none focus:ring-0 ${
                activeTab === tab.id ? "bg-zinc-900 text-white border-l-2 border-white pl-4" : 
                "text-zinc-400 hover:bg-zinc-900/30 hover:text-zinc-200 pl-3"
              }`}
            >
              <span className="text-[13px] font-bold">{tab.label}</span>
              <span className="text-[9px] font-mono opacity-40 group-hover:opacity-60 transition-opacity">{tab.detail}</span>
            </button>
          ))}
        </aside>

        {/* Workspace Form Frame */}
        <main className="flex-1 overflow-y-auto bg-zinc-900/10 p-10">
          <div className="max-w-4xl w-full mx-auto space-y-8 pb-32">
            
            {/* TAB 1: COMMON INFORMATION */}
            {activeTab === "common" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold tracking-tight mb-1">인사말 및 기본 연락처 설정</h2>
                  <p className="text-xs text-neutral-400">네비게이션 탑 헤더, 자기소개 및 명함 영역에 동적으로 바인딩되는 텍스트 세트입니다.</p>
                </div>

                <div className="grid grid-cols-1 gap-6 p-6 border border-zinc-900 bg-zinc-950/45 rounded-sm">
                  {/* Profile Image Section */}
                  <div className="pb-6 border-b border-zinc-900 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    <div className="md:col-span-1 space-y-2">
                      <label className="text-xs font-mono uppercase text-zinc-400 block">프로필 이미지 (Profile Image)</label>
                      <div className="relative group w-28 h-28 bg-zinc-900 border border-zinc-805 rounded-sm overflow-hidden flex items-center justify-center">
                        {formData.profileImage ? (
                          <>
                            <img 
                              src={formData.profileImage} 
                              alt="Profile Preview" 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <button
                              type="button"
                              onClick={() => handleSimpleFieldChange("profileImage", "")}
                              className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-xs text-red-400 font-medium font-mono"
                            >
                              제거하기
                            </button>
                          </>
                        ) : (
                          <div className="text-center p-3 text-zinc-600">
                            <ImageIcon size={24} className="mx-auto mb-1 opacity-60" />
                            <span className="text-[10px] font-mono">NO IMAGE</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="md:col-span-2 space-y-3">
                      <span className="text-xs text-neutral-400 block leading-relaxed">
                        소개글 옆에 표시될 프로필 사진을 업로드하거나 이미지 주소(URL)를 직접 입력할 수 있습니다.
                      </span>
                      
                      <div className="flex flex-wrap items-center gap-3">
                        <label className="cursor-pointer px-4 py-2 bg-zinc-850 hover:bg-zinc-800 text-white rounded-sm text-xs font-medium tracking-tight transition-all inline-flex items-center gap-2 border border-zinc-750">
                          <ImageIcon size={14} />
                          <span>이미지 업로드</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleProfileImageUpload(e.target.files[0]);
                              }
                            }}
                          />
                        </label>
                        
                        {profileUploadStatus && (
                          <span className="text-xs font-mono text-neutral-300 animate-pulse">
                            {profileUploadStatus}
                          </span>
                        )}
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase">또는 직접 이미지 주소(URL) 입력</span>
                        <input 
                          type="text" 
                          value={formData.profileImage || ""} 
                          onChange={e => handleSimpleFieldChange("profileImage", e.target.value)}
                          placeholder="https://example.com/image.jpg"
                          className="w-full bg-zinc-900/70 border border-zinc-800 rounded px-4 py-2 text-xs text-neutral-200 focus:outline-none focus:border-neutral-500 font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Introduction text */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-zinc-400">한줄 소개 문구 (About 헤드라인)</label>
                    <textarea 
                      value={formData.introduction || ""} 
                      onChange={e => handleSimpleFieldChange("introduction", e.target.value)}
                      rows={3}
                      placeholder="기획자 소개 문구를 적어주세요."
                      className="w-full bg-zinc-900/70 border border-zinc-800 rounded px-4 py-3 text-sm focus:outline-none focus:border-neutral-500 font-sans leading-relaxed"
                    />
                  </div>

                  {/* Contact details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-zinc-900">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-zinc-400">한글/영문 이름</label>
                      <input 
                        type="text" 
                        value={formData.contact?.name || ""} 
                        onChange={e => handleFieldChange("contact", "name", e.target.value)}
                        className="w-full bg-zinc-900/70 border border-zinc-800 rounded px-4 py-2 text-sm focus:outline-none focus:border-neutral-500 font-mono"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-zinc-400">이메일 주소</label>
                      <input 
                        type="text" 
                        value={formData.contact?.email || ""} 
                        onChange={e => handleFieldChange("contact", "email", e.target.value)}
                        className="w-full bg-zinc-900/70 border border-zinc-800 rounded px-4 py-2 text-sm focus:outline-none focus:border-neutral-500 font-mono"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-zinc-400">연락처</label>
                      <input 
                        type="text" 
                        value={formData.contact?.phone || ""} 
                        onChange={e => handleFieldChange("contact", "phone", e.target.value)}
                        className="w-full bg-zinc-900/70 border border-zinc-800 rounded px-4 py-2 text-sm focus:outline-none focus:border-neutral-500 font-mono"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-zinc-400">활동 기지 (위치)</label>
                      <input 
                        type="text" 
                        value={formData.contact?.location || ""} 
                        onChange={e => handleFieldChange("contact", "location", e.target.value)}
                        className="w-full bg-zinc-900/70 border border-zinc-800 rounded px-4 py-2 text-sm focus:outline-none focus:border-neutral-500"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-mono uppercase text-zinc-400">인스타그램 핸들 (@)</label>
                      <input 
                        type="text" 
                        value={formData.contact?.instagram || ""} 
                        onChange={e => handleFieldChange("contact", "instagram", e.target.value)}
                        className="w-full bg-zinc-900/70 border border-zinc-850 rounded px-4 py-2 text-sm focus:outline-none focus:border-neutral-500 font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Tech Stacks section */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-400">역량 및 전문성 분야 (Technical Stack)</h3>
                    <button
                      onClick={() => handleArrayAdd("techStack", { label: "새 카테고리", items: [] })}
                      className="px-3 py-1.5 bg-zinc-800 text-white text-xs rounded-sm hover:bg-zinc-700 transition-all font-medium"
                    >
                      + 분야 추가
                    </button>
                  </div>

                  <div className="space-y-4">
                    {(formData.techStack || []).map((group: any, idx: number) => (
                      <div key={idx} className="p-5 border border-zinc-900 bg-zinc-950/45 rounded-sm space-y-4 relative">
                        <button
                          onClick={() => handleArrayDelete("techStack", idx)}
                          className="absolute right-4 top-4 text-zinc-500 hover:text-red-400 transition-all"
                        >
                          <Trash2 size={15} />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                          <div className="space-y-1 md:col-span-1">
                            <span className="text-[10px] font-mono text-zinc-500 uppercase">기술 카테고리 이름</span>
                            <input
                              type="text"
                              value={group.label || ""}
                              onChange={e => handleArrayChange("techStack", idx, "label", e.target.value)}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 text-xs text-white"
                            />
                          </div>
                          
                          <div className="md:col-span-2 space-y-2">
                            <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
                              <span>키워드 목록 (예: Illustrator, Photoshop, Slack)</span>
                              <button
                                onClick={() => {
                                  const text = prompt("추가할 키워드를 입력하세요:");
                                  if (text) {
                                    const updated = [...(group.items || []), text];
                                    handleArrayChange("techStack", idx, "items", updated);
                                  }
                                }}
                                className="text-white hover:underline"
                              >
                                + 키워드 추가
                              </button>
                            </div>
                            <div className="flex flex-wrap gap-1.5 p-2 bg-zinc-900/60 border border-zinc-800/80 rounded min-h-[36px]">
                              {(group.items || []).map((tag: string, tagIdx: number) => (
                                <span key={tagIdx} className="bg-zinc-800 text-neutral-300 px-2 py-0.5 rounded text-[10px] font-mono flex items-center gap-1.5">
                                  {tag}
                                  <button 
                                    onClick={() => {
                                      const updated = [...(group.items || [])];
                                      updated.splice(tagIdx, 1);
                                      handleArrayChange("techStack", idx, "items", updated);
                                    }}
                                    className="text-zinc-500 hover:text-white"
                                  >
                                    ×
                                  </button>
                                </span>
                              ))}
                              {(group.items || []).length === 0 && (
                                <span className="text-zinc-600 text-[10px] font-mono italic self-center pl-2">등록된 키워드가 없습니다.</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: EDUCATION, CERTIFICATES, EXPERIENCE */}
            {activeTab === "career" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold tracking-tight mb-1">학력, 이력, 자격증 및 대외활동 설계</h2>
                  <p className="text-xs text-neutral-400">About 및 Activities 카드 구성에 노출되는 세부 테이블 목록을 실시간 변경할 수 있습니다.</p>
                </div>

                {/* Part 1: Education */}
                <div className="p-6 border border-zinc-900 bg-zinc-950/45 rounded-sm space-y-4">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="text-zinc-400 shrink-0" size={18} />
                    <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-200">학력 정보 (Education)</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">출신 학교</span>
                      <input
                        type="text"
                        value={formData.education?.school || ""}
                        onChange={e => handleFieldChange("education", "school", e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-zinc-400 uppercase">취득 학위 및 학과</span>
                      <input
                        type="text"
                        value={formData.education?.major || ""}
                        onChange={e => handleFieldChange("education", "major", e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-zinc-400 uppercase">재학 기간</span>
                      <input
                        type="text"
                        value={formData.education?.period || ""}
                        onChange={e => handleFieldChange("education", "period", e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Part 2: Certificates list */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Award className="text-zinc-400 shrink-0" size={18} />
                      <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-400">보유 자격증 (Certificates)</h3>
                    </div>
                    <button
                      onClick={() => handleArrayAdd("certificates", { title: "새 자격증", subtitle: "점수/등급 정보" })}
                      className="px-3 py-1 bg-zinc-800 text-white text-xs rounded-sm hover:bg-zinc-700 font-medium"
                    >
                      + 자격증 추가
                    </button>
                  </div>

                  <div className="space-y-3">
                    {(formData.certificates || []).map((cert: any, idx: number) => (
                      <div key={idx} className="p-4 border border-zinc-900 bg-zinc-950/45 rounded-sm relative grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                        <button
                          onClick={() => handleArrayDelete("certificates", idx)}
                          className="absolute right-4 top-4 text-zinc-500 hover:text-red-400 transition-all font-mono"
                        >
                          <Trash2 size={14} />
                        </button>

                        <div className="space-y-1 col-span-1">
                          <span className="text-[9px] font-mono text-zinc-500">자격증 이름</span>
                          <input
                            type="text"
                            value={cert.title || ""}
                            onChange={e => handleArrayChange("certificates", idx, "title", e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 text-xs font-bold"
                          />
                        </div>
                        <div className="space-y-1 col-span-1">
                          <span className="text-[9px] font-mono text-zinc-500">결과/점수 (subtitle)</span>
                          <input
                            type="text"
                            value={cert.subtitle || ""}
                            onChange={e => handleArrayChange("certificates", idx, "subtitle", e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 text-xs text-neutral-300"
                          />
                        </div>
                        <div className="space-y-1 col-span-1">
                          <span className="text-[9px] font-mono text-zinc-500">획득 수치 (막대 그래프)</span>
                          <input
                            type="number"
                            value={cert.score || ""}
                            onChange={e => handleArrayChange("certificates", idx, "score", e.target.value ? Number(e.target.value) : undefined)}
                            placeholder="없음"
                            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 text-xs font-mono"
                          />
                        </div>
                        <div className="space-y-1 col-span-1 md:pr-8">
                          <span className="text-[9px] font-mono text-zinc-500">그래프 만점 스케일</span>
                          <input
                            type="number"
                            value={cert.maxScale || ""}
                            onChange={e => handleArrayChange("certificates", idx, "maxScale", e.target.value ? Number(e.target.value) : undefined)}
                            placeholder="없음"
                            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 text-xs font-mono"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Part 3: Work Experience list */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-400">경력 사항 (Work Experience)</h3>
                    <button
                      onClick={() => handleArrayAdd("workExperience", { company: "회사명", tags: "직무 역할명", period: "YYYY.MM ~ YYYY.MM", desc: [] })}
                      className="px-3 py-1 bg-zinc-800 text-white text-xs rounded-sm hover:bg-zinc-700 font-medium"
                    >
                      + 경력 추가
                    </button>
                  </div>

                  <div className="space-y-4">
                    {(formData.workExperience || []).map((exp: any, idx: number) => (
                      <div key={idx} className="p-6 border border-zinc-900 bg-zinc-950/45 rounded-sm relative space-y-4">
                        <button
                          onClick={() => handleArrayDelete("workExperience", idx)}
                          className="absolute right-4 top-4 text-zinc-500 hover:text-red-400 transition-all"
                        >
                          <Trash2 size={15} />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono text-zinc-500 uppercase">회사/프로젝트 명</span>
                            <input
                              type="text"
                              value={exp.company || ""}
                              onChange={e => handleArrayChange("workExperience", idx, "company", e.target.value)}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs font-bold"
                            />
                          </div>
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono text-zinc-500 uppercase">직무 태그 정보</span>
                            <input
                              type="text"
                              value={exp.tags || ""}
                              onChange={e => handleArrayChange("workExperience", idx, "tags", e.target.value)}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs text-indigo-400"
                            />
                          </div>
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono text-zinc-500 uppercase">근무 기간</span>
                            <input
                              type="text"
                              value={exp.period || ""}
                              onChange={e => handleArrayChange("workExperience", idx, "period", e.target.value)}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs font-mono"
                            />
                          </div>
                        </div>

                        {/* Bullets subform */}
                        <div className="space-y-2 border-t border-zinc-900 pt-4">
                          <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 mb-1">
                            <span>수행 세부 업무 (Bullets)</span>
                            <button
                              onClick={() => handleArrayBulletAdd("workExperience", idx, "desc")}
                              className="text-white hover:underline"
                            >
                              + 항목 추가
                            </button>
                          </div>
                          <div className="space-y-2">
                            {(exp.desc || []).map((bullet: string, bulletIdx: number) => (
                              <div key={bulletIdx} className="flex items-center gap-2">
                                <span className="text-zinc-500 text-xs shrink-0 font-mono">•</span>
                                <input
                                  type="text"
                                  value={bullet}
                                  onChange={e => handleArrayBulletChange("workExperience", idx, "desc", bulletIdx, e.target.value)}
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 text-xs text-neutral-300"
                                />
                                <button
                                  onClick={() => handleArrayBulletDelete("workExperience", idx, "desc", bulletIdx)}
                                  className="text-zinc-500 hover:text-red-400"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>

                {/* Part 4: Activities Archive list */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-400">대외 활동 아카이브 (Activities)</h3>
                    <button
                      onClick={() => handleArrayAdd("activities", { title: "새 활동 제목", org: "주최 단체명", period: "YYYY.MM ~ YYYY.MM", desc: [] })}
                      className="px-3 py-1 bg-zinc-800 text-white text-xs rounded-sm hover:bg-zinc-700 font-medium"
                    >
                      + 활동 추가
                    </button>
                  </div>

                  <div className="space-y-4">
                    {(formData.activities || []).map((act: any, idx: number) => (
                      <div key={idx} className="p-6 border border-zinc-900 bg-zinc-950/45 rounded-sm relative space-y-4">
                        <button
                          onClick={() => handleArrayDelete("activities", idx)}
                          className="absolute right-4 top-4 text-zinc-500 hover:text-red-400 transition-all"
                        >
                          <Trash2 size={15} />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono text-zinc-500 uppercase">활동 프로젝트 명</span>
                            <input
                              type="text"
                              value={act.title || ""}
                              onChange={e => handleArrayChange("activities", idx, "title", e.target.value)}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs font-bold"
                            />
                          </div>
                          <div className="space-y-1 flex flex-col">
                            <span className="text-[9px] font-mono text-zinc-500 uppercase">주최 단체/소속</span>
                            <input
                              type="text"
                              value={act.org || ""}
                              onChange={e => handleArrayChange("activities", idx, "org", e.target.value)}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs text-zinc-300"
                            />
                          </div>
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono text-zinc-500 uppercase">활동 기간</span>
                            <input
                              type="text"
                              value={act.period || ""}
                              onChange={e => handleArrayChange("activities", idx, "period", e.target.value)}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs font-mono"
                            />
                          </div>
                        </div>

                        {/* Bullets subform */}
                        <div className="space-y-2 border-t border-zinc-900 pt-4">
                          <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 mb-1">
                            <span>상세 설명 (Bullets)</span>
                            <button
                              onClick={() => handleArrayBulletAdd("activities", idx, "desc")}
                              className="text-white hover:underline"
                            >
                              + 항목 추가
                            </button>
                          </div>
                          <div className="space-y-2">
                            {(act.desc || []).map((bullet: string, bulletIdx: number) => (
                              <div key={bulletIdx} className="flex items-center gap-2">
                                <span className="text-zinc-500 text-xs shrink-0 font-mono">•</span>
                                <input
                                  type="text"
                                  value={bullet}
                                  onChange={e => handleArrayBulletChange("activities", idx, "desc", bulletIdx, e.target.value)}
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 text-xs text-neutral-300"
                                />
                                <button
                                  onClick={() => handleArrayBulletDelete("activities", idx, "desc", bulletIdx)}
                                  className="text-zinc-500 hover:text-red-400"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: FEATURED PROJECTS */}
            {activeTab === "projects1" && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight mb-1">프로젝트 I (수행 실무 목록)</h2>
                    <p className="text-xs text-neutral-400">페스티벌, 콘서트, 브랜드 쇼케이스 등 메이드온 현장 총괄 및 PM 이력 프로젝트입니다.</p>
                  </div>
                  <button
                    onClick={() => handleArrayAdd("featuredProjects", {
                      title: "새 기획 페스티벌",
                      category: "운영",
                      year: "2024",
                      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
                      contribution: "25%",
                      description: "수행한 업무에 대한 간단요약 설명",
                      fullDescription: "모달에 출력되는 긴 상세 문안",
                      details: ["세부 사항 1", "세부 사항 2"],
                      process: [],
                      results: [],
                      role: { title: "티켓 총괄 운영", items: [] }
                    })}
                    className="px-4 py-2 bg-neutral-100 text-black text-xs font-bold rounded-sm hover:bg-neutral-200 font-mono"
                  >
                    + 새 실무공연 추가
                  </button>
                </div>

                <div className="space-y-8">
                  {(formData.featuredProjects || []).map((project: any, idx: number) => (
                    <div key={idx} className="p-6 border border-zinc-900 bg-zinc-950/45 rounded-sm relative space-y-6">
                      <button
                        onClick={() => handleArrayDelete("featuredProjects", idx)}
                        className="absolute right-4 top-4 text-zinc-500 hover:text-red-400 transition-all font-mono text-xs flex items-center gap-1.5"
                      >
                        <Trash2 size={14} /> 제거
                      </button>

                      <div className="flex items-center gap-4 text-xs font-mono border-b border-zinc-900 pb-3">
                        <span className="bg-neutral-200 text-black px-2 py-0.5 rounded uppercase font-bold text-[10px]">#{idx + 1}</span>
                        <span className="opacity-40">프로젝트 코드 제어</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-zinc-400 uppercase">공연/프로젝트 이름</span>
                          <input 
                            type="text"
                            value={project.title || ""}
                            onChange={e => handleArrayChange("featuredProjects", idx, "title", e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs font-bold"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-zinc-400 uppercase">개최 연도</span>
                          <input 
                            type="text"
                            value={project.year || ""}
                            onChange={e => handleArrayChange("featuredProjects", idx, "year", e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs font-mono"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-zinc-400 uppercase">카테고리 (분야) 슬라이드명</span>
                          <input 
                            type="text"
                            value={project.category || ""}
                            onChange={e => handleArrayChange("featuredProjects", idx, "category", e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-zinc-400 uppercase">참여도/기여도 (%)</span>
                          <input 
                            type="text"
                            value={project.contribution || ""}
                            onChange={e => handleArrayChange("featuredProjects", idx, "contribution", e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs font-mono"
                          />
                        </div>
                        <div className="space-y-1 md:col-span-2">
                          <span className="text-[10px] font-mono text-zinc-400 uppercase">대표 커버 이미지 주소 (URL)</span>
                          <div className="flex gap-2">
                            <input 
                              type="text"
                              value={project.image || ""}
                              onChange={e => handleArrayChange("featuredProjects", idx, "image", e.target.value)}
                              className="flex-1 bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs font-mono"
                            />
                            {project.image && (
                              <img src={project.image} alt="preview" className="w-12 h-10 object-cover border border-zinc-800 rounded shrink-0" />
                            )}
                          </div>
                          <p className="text-[10px] text-zinc-500 font-mono">※ 미디어 업로드 탭에서 올린 이미지 주소를 복사해 이곳에 입력하세요.</p>
                        </div>
                      </div>

                      <div className="space-y-3 pt-4 border-t border-zinc-900">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-zinc-400">업무 요약 (About / Main List 카드용 설명)</span>
                          <input 
                            type="text"
                            value={project.description || ""}
                            onChange={e => handleArrayChange("featuredProjects", idx, "description", e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-zinc-400">긴 상세 설명 (상세 모달 내부)</span>
                          <textarea 
                            value={project.fullDescription || ""}
                            onChange={e => handleArrayChange("featuredProjects", idx, "fullDescription", e.target.value)}
                            rows={3}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs font-sans leading-relaxed"
                          />
                        </div>
                      </div>

                      {/* Process Sections (Pre-event, On-site, CS) */}
                      <div className="space-y-2 border-t border-zinc-900 pt-4">
                        <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                          <span>기획 및 실행 프로세스단계 (Process Stages)</span>
                          <button
                            onClick={() => {
                              const updated = [...(project.process || []), { phase: "새 단계", items: [] }];
                              handleArrayChange("featuredProjects", idx, "process", updated);
                            }}
                            className="text-white hover:underline"
                          >
                            + 단계 단락 추가
                          </button>
                        </div>
                        
                        {(project.process || []).map((p: any, pIdx: number) => (
                          <div key={pIdx} className="p-3 border border-zinc-900 bg-zinc-900/50 rounded gap-2 space-y-2 relative">
                            <button
                              onClick={() => {
                                const updated = [...(project.process || [])];
                                updated.splice(pIdx, 1);
                                handleArrayChange("featuredProjects", idx, "process", updated);
                              }}
                              className="absolute right-3 top-3 text-[10px] text-zinc-500 hover:text-red-400 font-mono"
                            >
                              삭제
                            </button>
                            <div className="w-1/2">
                              <span className="text-[8px] font-mono text-zinc-500 pl-1 uppercase">단계명 (사전운영, 현장운영 등)</span>
                              <input 
                                type="text"
                                value={p.phase || ""}
                                onChange={e => {
                                  const updated = [...(project.process || [])];
                                  updated[pIdx] = { ...updated[pIdx], phase: e.target.value };
                                  handleArrayChange("featuredProjects", idx, "process", updated);
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <div className="flex justify-between items-center text-[8px] font-mono text-zinc-500">
                                <span>상세 내용 불렛</span>
                                <button
                                  onClick={() => {
                                    const updated = [...(project.process || [])];
                                    updated[pIdx].items = [...(updated[pIdx].items || []), ""];
                                    handleArrayChange("featuredProjects", idx, "process", updated);
                                  }}
                                  className="text-white hover:underline hover:text-neutral-300"
                                >
                                  + 불렛 추가
                                </button>
                              </div>
                              {(p.items || []).map((bullet: string, bIdx: number) => (
                                <div key={bIdx} className="flex items-center gap-2">
                                  <span className="text-zinc-600 text-xs shrink-0 font-serif">-</span>
                                  <input 
                                    type="text"
                                    value={bullet}
                                    onChange={e => {
                                      const updated = [...(project.process || [])];
                                      const bullets = [...(updated[pIdx].items || [])];
                                      bullets[bIdx] = e.target.value;
                                      updated[pIdx].items = bullets;
                                      handleArrayChange("featuredProjects", idx, "process", updated);
                                    }}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-neutral-300"
                                  />
                                  <button
                                    onClick={() => {
                                      const updated = [...(project.process || [])];
                                      const bullets = [...(updated[pIdx].items || [])];
                                      bullets.splice(bIdx, 1);
                                      updated[pIdx].items = bullets;
                                      handleArrayChange("featuredProjects", idx, "process", updated);
                                    }}
                                    className="text-zinc-600 hover:text-red-400"
                                  >
                                    ×
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Primary Role (담당 업무 총괄) */}
                      <div className="space-y-3 border-t border-zinc-900 pt-4">
                        <span className="text-[10px] font-mono text-zinc-400 block uppercase">역할 및 총괄 내용 (Primary Role)</span>
                        <div className="space-y-2 p-3 bg-zinc-900/60 rounded border border-zinc-900">
                          <div className="w-1/2">
                            <span className="text-[8px] font-mono text-zinc-500">역할 대표명 (예: 티켓 총괄 운영)</span>
                            <input 
                              type="text"
                              value={project.role?.title || ""}
                              onChange={e => {
                                const role = { ...(project.role || {}), title: e.target.value };
                                handleArrayChange("featuredProjects", idx, "role", role);
                              }}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs font-bold text-neutral-200"
                            />
                          </div>

                          <div className="space-y-1.5 pt-2">
                            <div className="flex justify-between items-center text-[8px] font-mono text-zinc-500">
                              <span>수행 역할 목록</span>
                              <button
                                onClick={() => {
                                  const roleItems = [...(project.role?.items || []), ""];
                                  const role = { ...(project.role || {}), items: roleItems };
                                  handleArrayChange("featuredProjects", idx, "role", role);
                                }}
                                className="text-white hover:underline"
                              >
                                + 역할사항 추가
                              </button>
                            </div>
                            {(project.role?.items || []).map((roleBullet: string, rIdx: number) => (
                              <div key={rIdx} className="flex items-center gap-2">
                                <span className="text-zinc-600 text-xs text-neutral-300">•</span>
                                <input 
                                  type="text"
                                  value={roleBullet}
                                  onChange={e => {
                                    const roleItems = [...(project.role?.items || [])];
                                    roleItems[rIdx] = e.target.value;
                                    const role = { ...(project.role || {}), items: roleItems };
                                    handleArrayChange("featuredProjects", idx, "role", role);
                                  }}
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs"
                                />
                                <button
                                  onClick={() => {
                                    const roleItems = [...(project.role?.items || [])];
                                    roleItems.splice(rIdx, 1);
                                    const role = { ...(project.role || {}), items: roleItems };
                                    handleArrayChange("featuredProjects", idx, "role", role);
                                  }}
                                  className="text-zinc-600 hover:text-red-400"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Performance Achievements (수행 성과) */}
                      <div className="space-y-2 border-t border-zinc-900 pt-4">
                        <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                          <span>수행 성과 대항목 (Results & Achievements)</span>
                          <button
                            onClick={() => {
                              const updated = [...(project.results || []), ""];
                              handleArrayChange("featuredProjects", idx, "results", updated);
                            }}
                            className="text-white hover:underline"
                          >
                            + 성과 항목 추가
                          </button>
                        </div>
                        <div className="space-y-2">
                          {(project.results || []).map((resBullet: string, rIdx: number) => (
                            <div key={rIdx} className="flex items-center gap-2">
                              <span className="text-zinc-500 font-mono text-xs">✓</span>
                              <input 
                                type="text"
                                value={resBullet}
                                onChange={e => {
                                  const updated = [...(project.results || [])];
                                  updated[rIdx] = e.target.value;
                                  handleArrayChange("featuredProjects", idx, "results", updated);
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1.5 text-xs text-neutral-200 font-sans"
                              />
                              <button
                                onClick={() => {
                                  const updated = [...(project.results || [])];
                                  updated.splice(rIdx, 1);
                                  handleArrayChange("featuredProjects", idx, "results", updated);
                                }}
                                className="text-zinc-500 hover:text-red-400"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: PERSONAL PROJECTS (CREATIONS) */}
            {activeTab === "projects2" && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight mb-1">프로젝트 II (개인 창작/공연)</h2>
                    <p className="text-xs text-neutral-400">이그린(Lee Green) 인디음악 앨범 발매 크라우드 펀딩, 루프탑 및 콜라보 콘서트 관련 프로젝트입니다.</p>
                  </div>
                  <button
                    onClick={() => handleArrayAdd("personalProjects", {
                      title: "새 개인 아트 워크숍",
                      category: "Concert",
                      year: "2023",
                      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b",
                      contribution: "70%",
                      location: "KT&G 상상마당",
                      support: "자체 제작",
                      cast: "이그린",
                      description: "새 수록 앨범 및 특별 콘서트 런칭",
                      fullDescription: "상세 모달 내부에서 지원하는 설명 데이터입니다.",
                      images: [],
                      role: { title: "담당 업무", items: [] },
                      results: []
                    })}
                    className="px-4 py-2 bg-neutral-100 text-black text-xs font-bold rounded-sm hover:bg-neutral-200 font-mono"
                  >
                    + 새 창작기획 추가
                  </button>
                </div>

                <div className="space-y-8">
                  {(formData.personalProjects || []).map((project: any, idx: number) => (
                    <div key={idx} className="p-6 border border-zinc-900 bg-zinc-950/45 rounded-sm relative space-y-6">
                      <button
                        onClick={() => handleArrayDelete("personalProjects", idx)}
                        className="absolute right-4 top-4 text-zinc-500 hover:text-red-400 transition-all font-mono text-xs flex items-center gap-1.5"
                      >
                        <Trash2 size={14} /> 제거
                      </button>

                      <div className="flex items-center gap-4 text-xs font-mono border-b border-zinc-900 pb-3">
                        <span className="bg-neutral-200 text-black px-2 py-0.5 rounded uppercase font-bold text-[10px]">#{idx + 1}</span>
                        <span className="opacity-40">앨범 및 디자인 기획 제어</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-zinc-400 uppercase">창작 프로젝트명/앨범명</span>
                          <input 
                            type="text"
                            value={project.title || ""}
                            onChange={e => handleArrayChange("personalProjects", idx, "title", e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs font-bold"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-zinc-400 uppercase">발표 연도</span>
                          <input 
                            type="text"
                            value={project.year || ""}
                            onChange={e => handleArrayChange("personalProjects", idx, "year", e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs font-mono"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-zinc-400 uppercase">음악/디자인 카테고리 (Category)</span>
                          <input 
                            type="text"
                            value={project.category || ""}
                            onChange={e => handleArrayChange("personalProjects", idx, "category", e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-zinc-400 uppercase">개인 지분 기여도 (%)</span>
                          <input 
                            type="text"
                            value={project.contribution || ""}
                            onChange={e => handleArrayChange("personalProjects", idx, "contribution", e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs font-mono"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-zinc-400 uppercase">개최 및 판매장소 (Location)</span>
                          <input 
                            type="text"
                            value={project.location || ""}
                            onChange={e => handleArrayChange("personalProjects", idx, "location", e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-zinc-400 uppercase">아티스트 라인업 (Cast)</span>
                          <input 
                            type="text"
                            value={project.cast || ""}
                            onChange={e => handleArrayChange("personalProjects", idx, "cast", e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs"
                          />
                        </div>
                        <div className="space-y-1 md:col-span-2">
                          <span className="text-[10px] font-mono text-zinc-400 uppercase">매체 크라우드펀딩/후원 (Support)</span>
                          <input 
                            type="text"
                            value={project.support || ""}
                            onChange={e => handleArrayChange("personalProjects", idx, "support", e.target.value)}
                            placeholder="예: 텀블벅 크라우드 펀딩 프로젝트"
                            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs"
                          />
                        </div>
                        <div className="space-y-1 md:col-span-2">
                          <span className="text-[10px] font-mono text-zinc-400 uppercase">대표 커버 이미지 주소 (URL)</span>
                          <div className="flex gap-2">
                            <input 
                              type="text"
                              value={project.image || ""}
                              onChange={e => handleArrayChange("personalProjects", idx, "image", e.target.value)}
                              className="flex-1 bg-zinc-900 border border-zinc-850 rounded px-3 py-2 text-xs font-mono"
                            />
                            {project.image && (
                              <img src={project.image} alt="preview" className="w-12 h-10 object-cover border border-zinc-800 rounded shrink-0" />
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 pt-4 border-t border-zinc-900">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-zinc-400">간단 기획 설명 (About / Main List 카드용)</span>
                          <input 
                            type="text"
                            value={project.description || ""}
                            onChange={e => handleArrayChange("personalProjects", idx, "description", e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-zinc-400">긴 상세 설명 (상세 모달 내부)</span>
                          <textarea 
                            value={project.fullDescription || ""}
                            onChange={e => handleArrayChange("personalProjects", idx, "fullDescription", e.target.value)}
                            rows={3}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs font-sans leading-relaxed"
                          />
                        </div>
                      </div>

                      {/* Detail Images slider list */}
                      <div className="space-y-2 border-t border-zinc-900 pt-4">
                        <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                          <span>서브 아트북 자켓/현장 디자인 포토 목록 (Images Carousel Block)</span>
                          <button
                            onClick={() => {
                              const updated = [...(project.images || []), ""];
                              handleArrayChange("personalProjects", idx, "images", updated);
                            }}
                            className="text-white hover:underline"
                          >
                            + 서브 슬라이드 이미지 추가
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-3">
                          {(project.images || []).map((imgUrl: string, iIdx: number) => (
                            <div key={iIdx} className="space-y-1 relative bg-zinc-900/40 p-2.5 rounded border border-zinc-900">
                              <span className="text-[8px] font-mono text-zinc-600 block pl-1 uppercase">슬라이드 포토 #{iIdx+1}</span>
                              <div className="flex gap-2">
                                <input 
                                  type="text"
                                  value={imgUrl}
                                  onChange={e => {
                                    const updated = [...(project.images || [])];
                                    updated[iIdx] = e.target.value;
                                    handleArrayChange("personalProjects", idx, "images", updated);
                                  }}
                                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs font-mono"
                                />
                                <button
                                  onClick={() => {
                                    const updated = [...(project.images || [])];
                                    updated.splice(iIdx, 1);
                                    handleArrayChange("personalProjects", idx, "images", updated);
                                  }}
                                  className="text-[10px] text-zinc-500 hover:text-red-400 font-mono"
                                >
                                  ×
                                </button>
                              </div>
                              {imgUrl && (
                                <img src={imgUrl} alt="slide preview" className="w-full h-16 object-cover border border-zinc-800/80 rounded mt-1.5" />
                              )}
                            </div>
                          ))}
                          {(project.images || []).length === 0 && (
                            <span className="text-zinc-600 text-[10px] font-mono italic pl-2">서브 슬라이드 사진이 지정되지 않았습니다.</span>
                          )}
                        </div>
                      </div>

                      {/* Role subform */}
                      <div className="space-y-3 border-t border-zinc-900 pt-4">
                        <span className="text-[10px] font-mono text-zinc-400 block uppercase">역할 및 크레딧 (Primary Role)</span>
                        <div className="space-y-2 p-3 bg-zinc-900/60 rounded border border-zinc-900">
                          <div className="w-1/2">
                            <span className="text-[8px] font-mono text-zinc-500">역할 대표명 (예: 담당 업무)</span>
                            <input 
                              type="text"
                              value={project.role?.title || ""}
                              onChange={e => {
                                const role = { ...(project.role || {}), title: e.target.value };
                                handleArrayChange("personalProjects", idx, "role", role);
                              }}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs font-bold text-neutral-200"
                            />
                          </div>

                          <div className="space-y-1.5 pt-2">
                            <div className="flex justify-between items-center text-[8px] font-mono text-zinc-500">
                              <span>세부 역할 기여항목</span>
                              <button
                                onClick={() => {
                                  const roleItems = [...(project.role?.items || []), ""];
                                  const role = { ...(project.role || {}), items: roleItems };
                                  handleArrayChange("personalProjects", idx, "role", role);
                                }}
                                className="text-white hover:underline"
                              >
                                + 항목 상세 추가
                              </button>
                            </div>
                            {(project.role?.items || []).map((roleBullet: string, rIdx: number) => (
                              <div key={rIdx} className="flex items-center gap-2">
                                <span className="text-zinc-600 text-xs text-neutral-300">•</span>
                                <input 
                                  type="text"
                                  value={roleBullet}
                                  onChange={e => {
                                    const roleItems = [...(project.role?.items || [])];
                                    roleItems[rIdx] = e.target.value;
                                    const role = { ...(project.role || {}), items: roleItems };
                                    handleArrayChange("personalProjects", idx, "role", role);
                                  }}
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs"
                                />
                                <button
                                  onClick={() => {
                                    const roleItems = [...(project.role?.items || [])];
                                    roleItems.splice(rIdx, 1);
                                    const role = { ...(project.role || {}), items: roleItems };
                                    handleArrayChange("personalProjects", idx, "role", role);
                                  }}
                                  className="text-zinc-600 hover:text-red-400"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Performance Achievements (수행 성과) */}
                      <div className="space-y-2 border-t border-zinc-900 pt-4">
                        <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                          <span>지표 결과 및 달성 기여 (Results & Achievements)</span>
                          <button
                            onClick={() => {
                              const updated = [...(project.results || []), ""];
                              handleArrayChange("personalProjects", idx, "results", updated);
                            }}
                            className="text-white hover:underline"
                          >
                            + 성과 항목 추가
                          </button>
                        </div>
                        <div className="space-y-2">
                          {(project.results || []).map((resBullet: string, rIdx: number) => (
                            <div key={rIdx} className="flex items-center gap-2">
                              <span className="text-zinc-500 font-mono text-xs">✓</span>
                              <input 
                                type="text"
                                value={resBullet}
                                onChange={e => {
                                  const updated = [...(project.results || [])];
                                  updated[rIdx] = e.target.value;
                                  handleArrayChange("personalProjects", idx, "results", updated);
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1.5 text-xs text-neutral-200 font-sans"
                              />
                              <button
                                onClick={() => {
                                  const updated = [...(project.results || [])];
                                  updated.splice(rIdx, 1);
                                  handleArrayChange("personalProjects", idx, "results", updated);
                                }}
                                className="text-zinc-500 hover:text-red-400"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: MEDIA ASSETS UPLOAD DECK */}
            {activeTab === "media" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold tracking-tight mb-1">드래그 앤 드롭 미디어 업로더 (Media Uplink Deck)</h2>
                  <p className="text-xs text-neutral-400">깃허브에 번거롭게 이미지를 올리지 마세요! 로컬 컴퓨터의 사진이나 가이드 자료를 끌어놓는 순간, 즉각적인 라이브 URL이 생성됩니다.</p>
                </div>

                {/* Dropzone frame */}
                <div 
                  onDragOver={onDragOver}
                  onDrop={onDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-zinc-800 hover:border-zinc-500 transition-all bg-zinc-950/40 p-12 rounded-sm text-center cursor-pointer space-y-4 group/drop"
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={e => e.target.files && handleFileUpload(e.target.files[0])}
                    className="hidden" 
                  />
                  
                  <div className="w-14 h-14 bg-zinc-900 rounded-full flex items-center justify-center mx-auto group-hover/drop:scale-105 transition-transform border border-zinc-800">
                    <Upload className="text-zinc-400 group-hover/drop:text-white transition-colors animate-bounce" size={22} />
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-bold">여기에 파일을 드래그하여 옮겨놓거나 클릭하여 찾아보기</p>
                    <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Supports PNG, JPG, JPEG, GIF, PDF</p>
                  </div>

                  {uploadStatus && (
                    <div className="text-xs text-zinc-300 font-bold font-mono pl-2 animate-pulse">
                      STATUS: {uploadStatus}
                    </div>
                  )}
                </div>

                {/* Uplink tables lists */}
                <div className="space-y-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">업로드 완료된 자산 라이브러리 목록 (Assets List)</h3>
                  
                  <div className="space-y-2.5">
                    {uploadedFiles.map((file, idx) => (
                      <div key={idx} className="p-4 border border-zinc-900 bg-zinc-950/45 rounded-sm flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <ImageIcon className="text-zinc-500 shrink-0" size={18} />
                          <div>
                            <p className="text-xs font-bold leading-none mb-1 text-zinc-300 font-mono">{file.name}</p>
                            <p className="text-[10px] text-zinc-500 font-mono break-all">{file.url}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <img src={file.url} alt="thumbnail" className="w-10 h-10 object-cover border border-zinc-800 rounded" />
                          <button
                            onClick={() => copyUrl(file.url, idx)}
                            className="p-2 border border-zinc-800 hover:border-zinc-600 rounded bg-zinc-900/40 text-neutral-300 hover:text-white transition-all outline-none focus:ring-0"
                            title="이미지 주소 복사"
                          >
                            {copiedIndex === idx ? (
                              <Check className="text-emerald-400 animate-scale" size={14} />
                            ) : (
                              <Copy size={13} />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}

                    {uploadedFiles.length === 0 && (
                      <div className="py-20 text-center border border-zinc-900/60 bg-zinc-950/20 rounded-sm">
                        <p className="text-xs text-zinc-600 font-mono italic">라이브러리가 비어 있습니다. 사진을 올려 주소를 빌드하세요.</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
