/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DEFAULT_PORTFOLIO_DATA, PortfolioData, DEFAULT_FESTIVAL_TICKET, DEFAULT_FESTIVAL_FNB, DEFAULT_FESTIVAL_STORAGE } from "./default_data";
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
  FileText,
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
  wrapperClassName?: string;
  style?: React.CSSProperties;
  referrerPolicy?: "no-referrer" | "origin" | "unsafe-url" | "no-referrer-when-downgrade";
}> = ({ src, alt, className, wrapperClassName = "rounded-[8px] bg-neutral-100", style, referrerPolicy }) => {
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
    <div className={`relative w-full h-full overflow-hidden flex items-center justify-center ${wrapperClassName}`}>
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

const ModalCarousel: React.FC<{ images: string[]; project: Project }> = ({ images, project }) => {
  const [index, setIndex] = useState(0);
  return (
    <div className="relative w-full h-full group">
      <OptimizedImage
        src={images[index]}
        alt={`${project.title} - ${index + 1}`}
        className="w-full h-full object-contain"
        style={{ objectPosition: project.objectPosition || "center" }}
        referrerPolicy="no-referrer"
      />
      <button
        type="button"
        onClick={() => setIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-neutral-900/80 hover:bg-neutral-950 text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 shadow-sm transition-all"
      >
        <ArrowLeft size={16} />
      </button>
      <button
        type="button"
        onClick={() => setIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-neutral-900/80 hover:bg-neutral-950 text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 shadow-sm transition-all"
      >
        <ArrowRight size={16} />
      </button>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-neutral-950/80 px-2.5 py-1 text-[11px] font-mono font-bold text-white tracking-wider rounded-none select-none">
        {index + 1} / {images.length}
      </div>
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

const MIXED_POSTERS = [
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
    title: "Flower Planet",
    src: "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img4.jpg",
    period: "2022"
  },
  {
    title: "열대야",
    src: "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img3.jpg",
    period: "2022"
  }
];

const staggerItem = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const ProjectCard: React.FC<{ 
  project: Project; 
  onClick: (p: Project) => void; 
  imageAspect?: string; 
  isWide?: boolean;
}> = ({ project, onClick, imageAspect, isWide }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const posters = (project.title === "공연 운영" ? CONCERT_POSTERS : FESTIVAL_POSTERS).slice(0, 2);

  const repImages = project.representativeImages && project.representativeImages.length > 0
    ? project.representativeImages
    : project.image ? [project.image] : [];

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
            {project.image || repImages[0] ? (
              <OptimizedImage 
                src={project.image || repImages[0]} 
                alt={project.title} 
                className={`${imageAspect ? "w-full h-full object-cover" : "w-full h-auto"}`}
                style={{ objectPosition: project.objectPosition || "center" }}
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-400 bg-neutral-100 border border-neutral-200">
                <ImageIcon size={32} className="stroke-1" />
              </div>
            )}
          </div>
        )}
      </div>

    {/* Clean Information Table */}
    <div className="mt-2 border-t border-black/5 pt-3.5 space-y-3.5 opacity-90 group-hover:opacity-100 transition-all duration-300 w-full">
      {/* 1행: 분야 */}
      <div className="flex items-center justify-between text-xs text-neutral-600">
        <span className="font-sans text-[11px] text-neutral-400 font-semibold tracking-wider shrink-0 uppercase">분야</span>
        <div className="flex flex-wrap gap-1.5 justify-end">
          {(project.title === "페스티벌 운영" || project.title === "공연 운영") ? (
            (project.title === "공연 운영" 
              ? "하우스, 티켓, 안내, MD 판매, 컴플레인 응대" 
              : "종합 안내, 티켓, F&B, MD 판매, 물품보관소"
            ).split(", ").map((item, index) => (
              <span
                key={index}
                className="font-medium text-neutral-800 bg-neutral-50/75 border border-neutral-200/80 px-2.5 py-0.5 text-[11px] tracking-wide select-none transition-all duration-300 rounded-[6px] shadow-4xs"
              >
                {item}
              </span>
            ))
          ) : (
            (project.category || "").split(",").map((cat, idx) => (
              <span
                key={idx}
                className="font-medium text-neutral-800 bg-neutral-50/75 border border-neutral-200/80 px-2.5 py-0.5 text-[11px] tracking-wide select-none transition-all duration-300 rounded-[6px] shadow-4xs"
              >
                {formatCategory(cat.trim())}
              </span>
            ))
          )}
        </div>
      </div>

      {/* 2행: 기여도 및 담당역할 */}
      <div className="grid grid-cols-2 gap-x-6 items-center pt-3 border-t border-neutral-100 text-xs text-neutral-600">
        {/* 기여도 */}
        <div className="flex flex-col gap-1.5 w-full">
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

        {/* 담당역할 */}
        {project.role?.title ? (
          <div className="flex items-center justify-between h-full min-h-8">
            <span className="font-sans text-[11px] text-neutral-400 font-semibold tracking-wider shrink-0 uppercase">담당 역할</span>
            <div className="flex flex-col items-end gap-1.5 min-w-0 max-w-[70%] text-right ml-auto">
              {project.role.title.split(",").map((t, idx) => (
                <span 
                  key={idx}
                  className="font-semibold text-rose-600 bg-rose-50/60 border border-rose-500/10 px-2.5 py-0.5 rounded-[6px] text-[11px] tracking-wide select-none truncate max-w-full" 
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
    </div>
  </motion.div>
  );
};

const ProjectModal: React.FC<{
  project: Project | null;
  onClose: () => void;
}> = ({ project, onClose }) => {
  const [slidePage, setSlidePage] = useState(1);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const isFestival = project?.title === "페스티벌 운영";
  const isConcert = project?.title === "공연 운영";
  const isGreenery = project?.title === "GREENERY : 푸르게 푸르게 푸르러져라";
  const isFlowerPlanet = project?.title === "Flower Planet";
  const isYeoldaeya = project?.title === "열대야";
  const isAfternoon = project?.title === "오후의 향기";
  const isNightflight = project?.title === "야간비행";
  const tabs = isFestival ? [
    { page: 1, label: "개요" },
    { page: 2, label: "티켓 운영" },
    { page: 3, label: "F&B 운영" },
    { page: 4, label: "MD 판매 & 물품보관소" },
    { page: 5, label: "갤러리" }
  ] : isConcert ? [
    { page: 1, label: "개요" },
    { page: 2, label: "기획 공연" },
    { page: 3, label: "뮤지컬 하우스 운영" },
    { page: 4, label: "갤러리" }
  ] : isGreenery ? [
    { page: 1, label: "개요" },
    { page: 2, label: "내용" },
    { page: 3, label: "리뷰" },
    { page: 4, label: "갤러리" }
  ] : (isFlowerPlanet || isYeoldaeya || isAfternoon || isNightflight) ? [
    { page: 1, label: "개요" },
    { page: 2, label: "내용" },
    { page: 3, label: "갤러리" }
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
      setLightboxImage(null);
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
                <span className="text-[15px] font-sans text-neutral-900 font-extrabold tracking-tight hidden md:inline-block shrink-0">
                  {project.title}
                </span>
                <span className="h-4 w-px bg-neutral-200 hidden md:inline-block shrink-0" />
                
                {/* 탭 네비게이션 (번호 없이 탭 눌림 피드백) */}
                <div className="flex items-center gap-1 bg-neutral-100/80 p-1 rounded-full border border-neutral-200/50 shrink-0">
                  {tabs.map((tab) => (
                    <button
                      key={tab.page}
                      onClick={() => setSlidePage(tab.page)}
                      className={`px-4 py-1.5 text-[13px] md:text-[14px] font-bold tracking-tight transition-all duration-300 rounded-full cursor-pointer flex items-center justify-center shrink-0 relative ${
                        slidePage === tab.page
                          ? "bg-white text-rose-600 shadow-[0_2px_8px_rgba(0,0,0,0.06)] scale-[1.02]"
                          : "hover:text-neutral-900 text-neutral-500 hover:bg-white/40"
                      }`}
                    >
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
                              <div key={index} className="relative overflow-hidden transition-all duration-300 w-full h-full group/poster flex items-center justify-center rounded-none">
                                <OptimizedImage 
                                  src={poster.src} 
                                  alt={poster.title} 
                                  className="w-full h-full object-contain select-none transition-transform duration-700 group-hover/poster:scale-[1.04] rounded-none"
                                  wrapperClassName="rounded-none bg-white font-sans"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                            ))}
                          </div>
                        ) : (
                          (() => {
                            const repImages = project.representativeImages && project.representativeImages.length > 0
                              ? project.representativeImages
                              : project.image ? [project.image] : [];
                            
                            if (repImages.length > 1) {
                              return (
                                <div className="w-full max-w-sm mx-auto flex flex-col gap-0 max-h-[660px] overflow-y-auto pr-1 rounded-none">
                                  {repImages.map((imgUrl, i) => (
                                    <div key={i} className="w-full overflow-hidden flex items-center justify-center rounded-none">
                                      <OptimizedImage
                                        src={imgUrl}
                                        alt={`${project.title} rep-${i + 1}`}
                                        className="w-full h-auto block rounded-none"
                                        wrapperClassName="rounded-none bg-transparent"
                                        style={{ objectPosition: project.objectPosition || "center" }}
                                        referrerPolicy="no-referrer"
                                      />
                                    </div>
                                  ))}
                                </div>
                              );
                            }
                            
                            return (
                              <div className="max-w-sm mx-auto aspect-[4/5] overflow-hidden rounded-none w-full flex items-center justify-center bg-transparent">
                                <OptimizedImage
                                  src={project.image}
                                  alt={project.title}
                                  className="w-full h-full object-contain rounded-none"
                                  wrapperClassName="rounded-none bg-transparent"
                                  style={{ objectPosition: project.objectPosition || "center" }}
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                            );
                          })()
                        )}
                      </div>

                      {/* Right: Title, spec sheet & description */}
                      <div className="md:col-span-6 space-y-6 max-w-[530px] w-full md:mx-auto md:-mt-4">
                        <div>
                          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-900 font-sans leading-tight">
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
                          let splitIndex = desc.indexOf("[주요 운영 실적]");
                          if (splitIndex === -1) {
                            splitIndex = desc.indexOf("[주요 공연 실적]");
                          }
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
                                <div className="bg-neutral-50/70 border border-neutral-200/80 rounded-[15px] p-5 space-y-3.5 w-full">
                                  <div className="flex items-center gap-2 border-b border-neutral-200/80 pb-2">
                                    <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                                    <h4 className="text-xs font-bold tracking-wider text-neutral-800 uppercase font-sans">
                                      PROJECT SPECIFICATION
                                    </h4>
                                  </div>
                                  <dl className="grid grid-cols-3 gap-y-2.5 text-xs">
                                    {project.contribution && (
                                      <>
                                        <dt className="text-neutral-500 col-span-1 font-medium self-center">기여도</dt>
                                        <dd className="text-neutral-900 col-span-2 font-medium flex items-center gap-3">
                                          <span className="font-mono font-bold text-neutral-800 text-xs shrink-0 select-none">{project.contribution}</span>
                                          <div className="w-24 bg-neutral-200 h-1.5 rounded-full overflow-hidden inline-block relative shrink-0">
                                            <motion.div
                                              initial={{ width: 0 }}
                                              animate={{ width: project.contribution }}
                                              transition={{ duration: 0.8, ease: "easeOut" }}
                                              className="bg-neutral-800 h-full rounded-full"
                                            />
                                          </div>
                                        </dd>
                                      </>
                                    )}
                                    
                                    <dt className="text-neutral-500 col-span-1 font-medium">연도</dt>
                                    <dd className="text-neutral-900 col-span-2 font-mono font-bold">{project.year}</dd>

                                    <dt className="text-neutral-500 col-span-1 font-medium self-center">분야</dt>
                                    <dd className="text-neutral-900 col-span-2 font-bold flex flex-wrap gap-1.5 items-center font-sans">
                                      {(project.title === "페스티벌 운영" || project.title === "공연 운영") ? (
                                        (project.title === "공연 운영" 
                                          ? ["하우스", "티켓", "안내", "MD 판매", "컴플레인 응대"]
                                          : ["종합 안내", "티켓", "F&B", "MD 판매", "물품보관소"]
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
                                    
                                    {project.location && (
                                      <>
                                        <dt className="text-neutral-500 col-span-1 font-medium">장소</dt>
                                        <dd className="text-neutral-900 col-span-2 font-medium">{project.location}</dd>
                                      </>
                                    )}
                                  </dl>
                                </div>

                                {project.title === "공연 운영" && (
                                  <div className="bg-neutral-50/70 border border-neutral-200/80 rounded-[15px] p-5 space-y-3.5 w-full">
                                    <div className="flex items-center gap-2 border-b border-neutral-200/80 pb-2">
                                      <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                                      <h4 className="text-xs font-bold tracking-wider text-neutral-800 uppercase font-sans">
                                        주요 공연 실적
                                      </h4>
                                    </div>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-[13px] text-neutral-700 font-sans">
                                      {[
                                        "GREENERY 단독공연",
                                        "Flower Planet",
                                        "열대야",
                                        "오후의 향기",
                                        "야간비행",
                                        "뮤지컬 오페라의 유령 내한공연",
                                        "뮤지컬 위키드",
                                        "뮤지컬 맘마미아",
                                        "뮤지컬 싯다르타",
                                        "뮤지컬 레베카",
                                        "뮤지컬 라이온킹 내한 공연"
                                      ].map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-2.5 py-0.5 px-0.5 hover:text-rose-500 transition-colors duration-200">
                                          <span className="w-1 h-1 bg-rose-400 rounded-full shrink-0" />
                                          <span className="font-medium">{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {project.title !== "공연 운영" && (
                                  <div className="w-full">
                                    {(() => {
                                      const regex = /\[([^\]]+)\]/g;
                                      const rawMatches = [...part2.matchAll(regex)];
                                      const matches = rawMatches;
                                      
                                      if (matches.length > 0) {
                                        const sections: { title: string; items: string[] }[] = [];
                                        for (let i = 0; i < matches.length; i++) {
                                          const currentMatch = matches[i];
                                          const startIndex = currentMatch.index! + currentMatch[0].length;
                                          const endIndex = i + 1 < matches.length ? matches[i + 1].index : part2.length;
                                          const sectionContent = part2.substring(startIndex, endIndex).trim();
                                          const items = sectionContent.split("\n").map(l => l.trim()).filter(Boolean);
                                          sections.push({
                                            title: currentMatch[1],
                                            items
                                          });
                                        }
                                        
                                        return (
                                          <div className="space-y-4 w-full">
                                            {sections.map((sec, sIdx) => (
                                              <div key={sIdx} className="bg-neutral-50/70 border border-neutral-200/80 rounded-[15px] p-5 space-y-3.5 w-full">
                                                <div className="flex items-center gap-2 border-b border-neutral-200/80 pb-2">
                                                  <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                                                  <h4 className="text-xs font-bold tracking-wider text-neutral-800 uppercase font-sans">
                                                    {sec.title}
                                                  </h4>
                                                </div>
                                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-[13px] text-neutral-700 font-sans">
                                                  {sec.items.map((item, idx) => (
                                                    <li key={idx} className="flex items-center gap-2.5 py-0.5 px-0.5 hover:text-rose-500 transition-colors duration-200">
                                                      <span className="w-1 h-1 bg-rose-400 rounded-full shrink-0" />
                                                      <span className="font-medium">{item.replace(/^[•\s\-\*]+/g, "").trim()}</span>
                                                    </li>
                                                  ))}
                                                </ul>
                                              </div>
                                            ))}
                                          </div>
                                        );
                                      }

                                      const lines = part2.split("\n").map(l => l.trim()).filter(Boolean);
                                      if (lines.length > 0) {
                                        const rawTitle = lines[0];
                                        const title = rawTitle.replace(/[\[\]]/g, "");
                                        const items = lines.slice(1);
                                        return (
                                          <div className="bg-neutral-50/70 border border-neutral-200/80 rounded-[15px] p-5 space-y-3.5 w-full">
                                            <div className="flex items-center gap-2 border-b border-neutral-200/80 pb-2">
                                              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                                              <h4 className="text-xs font-bold tracking-wider text-neutral-800 uppercase font-sans">
                                                {title}
                                              </h4>
                                            </div>
                                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-[13px] text-neutral-700 font-sans">
                                              {items.map((item, idx) => (
                                                <li key={idx} className="flex items-center gap-2.5 py-0.5 px-0.5 hover:text-rose-500 transition-colors duration-200">
                                                  <span className="w-1 h-1 bg-rose-400 rounded-full shrink-0" />
                                                  <span className="font-medium">{item.replace(/^[•\s\-\*]+/g, "").trim()}</span>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        );
                                      }
                                      return (
                                        <p className="text-neutral-700 text-sm md:text-[15px] leading-relaxed tracking-normal whitespace-pre-line text-justify font-sans">
                                          {part2}
                                        </p>
                                      );
                                    })()}
                                  </div>
                                )}
                              </>
                            );
                          } else {
                            return (
                              <>
                                <div className="w-full">
                                  <p className="text-neutral-700 text-[15px] md:text-[16px] leading-relaxed tracking-normal whitespace-pre-line text-justify font-sans">
                                    {desc}
                                  </p>
                                </div>

                                {/* Specs Card */}
                                <div className="bg-neutral-50/70 border border-neutral-200/80 rounded-[15px] p-5 space-y-3.5 w-full">
                                  <div className="flex items-center gap-2 border-b border-neutral-200/80 pb-2">
                                    <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                                    <h4 className="text-xs font-bold tracking-wider text-neutral-800 uppercase font-sans">
                                      PROJECT SPECIFICATION
                                    </h4>
                                  </div>
                                  {(isGreenery || isFlowerPlanet || isYeoldaeya) ? (
                                    <dl className="grid grid-cols-3 gap-y-2.5 text-[14px]">
                                      <dt className="text-neutral-500 col-span-1 font-medium">장소</dt>
                                      <dd className="text-neutral-900 col-span-2 font-medium">
                                        {isGreenery ? "KT&G 상상마당 부산 3F LIVE HALL (공연)" :
                                         isFlowerPlanet ? "KT&G 상상마당 부산 3F LIVE HALL (공연)" :
                                         "KT&G 상상마당 부산 13F 루프탑 (공연)"}
                                      </dd>

                                      <dt className="text-neutral-500 col-span-1 font-medium">연도</dt>
                                      <dd className="text-neutral-900 col-span-2 font-mono font-bold">
                                        {isGreenery ? "2023" : "2022"}
                                      </dd>

                                      <dt className="text-neutral-500 col-span-1 font-medium self-center">분야</dt>
                                      <dd className="text-neutral-900 col-span-2 font-medium flex flex-wrap gap-1.5 items-center font-sans">
                                        {(isGreenery ? ["상품기획", "공연기획"] : ["공연기획"]).map((item, index) => (
                                          <span key={index} className="font-semibold text-neutral-800 bg-neutral-100/80 border border-neutral-200/80 px-2.5 py-0.5 text-[12px] tracking-wide rounded-[6px] shadow-4xs select-none">
                                            {item}
                                          </span>
                                        ))}
                                      </dd>

                                      <dt className="text-neutral-500 col-span-1 font-medium self-center">기여도</dt>
                                      <dd className="text-neutral-900 col-span-2 font-medium flex items-center gap-3">
                                        <span className="font-mono font-bold text-neutral-800 text-[14px] shrink-0 select-none">70%</span>
                                        <div className="w-24 bg-neutral-200 h-1.5 rounded-full overflow-hidden inline-block relative shrink-0">
                                          <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "70%" }}
                                            transition={{ duration: 0.8, ease: "easeOut" }}
                                            className="bg-neutral-800 h-full rounded-full"
                                          />
                                        </div>
                                      </dd>

                                      <dt className="text-neutral-500 col-span-1 font-medium pt-1">담당 업무</dt>
                                      <dd className="col-span-2 space-y-2 pt-1 font-sans">
                                        {(isGreenery ? [
                                          { role: "기획", desc: "텀블벅 프로젝트 기획" },
                                          { role: "섭외", desc: "출판사, 협력 업체 섭외" },
                                          { role: "홍보", desc: "오프라인 워크숍 기획, 온라인 마케팅" },
                                          { role: "제작", desc: "굿즈제작, 앨범 인디자인, 공연 홍보물 제작" },
                                          { role: "운영", desc: "전체 프로젝트 운영" }
                                        ] : isFlowerPlanet ? [
                                          { role: "기획", desc: "기획서 작성 및 공연 전체 컨셉 수립" },
                                          { role: "섭외", desc: "콜라보레이션 아티스트 및 공연장 조율" },
                                          { role: "홍보", desc: "SNS 마케팅 전략 수립 및 홍보 영상 기획" },
                                          { role: "제작", desc: "포스터, 굿즈 및 홍보 비주얼 에셋 제작 총괄" },
                                          { role: "운영", desc: "공연 당일 타임테이블 관리 및 현장 총괄 운영" }
                                        ] : [
                                          { role: "기획", desc: "도심 옥상 콘셉트 기획 및 프로젝트 기획서 작성" },
                                          { role: "섭외", desc: "인디 아티스트 섭외, 루프탑 공간 및 연계 프로모션 협의" },
                                          { role: "홍보", desc: "HAO 공식 SNS 온라인 마케팅 및 오프라인 배너 홍보" },
                                          { role: "제작", desc: "대관 루프탑 연출, 배너 및 공연 홍보 동영상 제작" },
                                          { role: "운영", desc: "와인/핑거푸드 연계 운영 최적화 및 현장 실질 운영" }
                                        ]).map((task, idx) => (
                                          <div key={idx} className="flex items-center text-[13px] leading-relaxed">
                                            <span className="text-neutral-900 font-bold w-9 shrink-0 select-none text-left tracking-tight">{task.role}</span>
                                            <div className="w-[1px] h-3.5 bg-neutral-200 shrink-0 mx-3" />
                                            <span className="text-neutral-700 font-medium flex-1 text-left">{task.desc}</span>
                                          </div>
                                        ))}
                                      </dd>
                                    </dl>
                                  ) : (
                                    <dl className="grid grid-cols-3 gap-y-2.5 text-xs">
                                      {project.contribution && (
                                        <>
                                          <dt className="text-neutral-500 col-span-1 font-medium self-center">기여도</dt>
                                          <dd className="text-neutral-900 col-span-2 font-medium flex items-center gap-3">
                                            <span className="font-mono font-bold text-neutral-800 text-xs shrink-0 select-none">{project.contribution}</span>
                                            <div className="w-24 bg-neutral-200 h-1.5 rounded-full overflow-hidden inline-block relative shrink-0">
                                              <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: project.contribution }}
                                                transition={{ duration: 0.8, ease: "easeOut" }}
                                                className="bg-neutral-800 h-full rounded-full"
                                              />
                                            </div>
                                          </dd>
                                        </>
                                      )}
                                      
                                      <dt className="text-neutral-500 col-span-1 font-medium">연도</dt>
                                      <dd className="text-neutral-900 col-span-2 font-mono font-bold">{project.year}</dd>

                                      <dt className="text-neutral-500 col-span-1 font-medium self-center">분야</dt>
                                      <dd className="text-neutral-900 col-span-2 font-bold flex flex-wrap gap-1.5 items-center font-sans">
                                        {(project.title === "페스티벌 운영" || project.title === "공연 운영") ? (
                                          (project.title === "공연 운영" 
                                            ? ["하우스", "티켓", "안내", "MD 판매", "컴플레인 응대"]
                                            : ["종합 안내", "티켓", "F&B", "MD 판매", "물품보관소"]
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
                                    </dl>
                                  )}
                                </div>
                              </>
                            );
                          }
                        })()}
                      </div>
                    </div>
                  )}

                  {slidePage === 2 && (
                    isGreenery ? (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start animate-fade-in font-sans">
                        {/* Left Column (lg:col-span-6): Designer Role & Production Details */}
                        <div className="lg:col-span-6 space-y-6">
                          <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
                            <span className="text-[9px] font-mono bg-[#E0115F] text-white px-1.5 py-0.5 rounded-none uppercase tracking-wider font-bold">Role & Execution</span>
                            <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider">주도적 역할 및 실행업무</h3>
                          </div>
                          <div className="border border-neutral-200/80 p-6 bg-white shadow-3xs rounded-[15px] space-y-5">
                            <div className="flex flex-col items-start gap-1.5 border-b border-neutral-150 pb-4">
                              <span className="text-[11px] font-mono text-neutral-400 font-bold uppercase tracking-wide">수행 역할</span>
                              <span className="inline-block font-extrabold text-[#E0115F] bg-[#E0115F]/5 border border-[#E0115F]/10 px-3 py-1 text-sm rounded-[6px]">
                                총괄 기획 & 크리에이티브 디렉터
                              </span>
                            </div>
                            <ul className="space-y-4">
                              {project.role?.items.map((item, i) => {
                                const anonymity = item.includes(": ");
                                const [label, desc] = anonymity ? item.split(": ") : [null, item];
                                return (
                                  <li key={i} className="text-xs sm:text-[13px] text-neutral-800 leading-relaxed flex items-start gap-3">
                                    <span className="mt-1.5 w-1.5 h-1.5 bg-[#E0115F] rounded-full shrink-0" />
                                    <div className="flex flex-col">
                                      {label ? (
                                        <>
                                          <strong className="text-neutral-950 font-bold text-[14px] mb-0.5">{label}</strong>
                                          <span className="font-normal text-neutral-600 leading-relaxed whitespace-pre-line">{desc}</span>
                                        </>
                                      ) : (
                                        <span className="font-normal text-neutral-800 leading-relaxed whitespace-pre-line">{desc}</span>
                                      )}
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>

                        {/* Right: Album Concept & Creation details */}
                        <div className="lg:col-span-6 space-y-6">
                          <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
                            <span className="text-[9px] font-mono bg-black text-white px-1.5 py-0.5 rounded-none uppercase tracking-wider font-bold">Album Concept</span>
                            <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider">북 형태의 새로운 피지컬 CD 패러다임</h3>
                          </div>
                          <div className="p-6 border border-neutral-200 bg-white shadow-3xs space-y-5 rounded-[15px]">
                            <h4 className="text-sm font-bold text-neutral-900 flex justify-between items-center border-b border-neutral-100 pb-2">
                              <span className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-black rounded-full" />
                                기획 배경 및 효용성 극대화
                              </span>
                              <span className="text-[9px] font-mono text-neutral-400 font-bold">CONCEPT</span>
                            </h4>
                            <div className="space-y-4 text-xs sm:text-[13px] text-neutral-750 font-sans leading-relaxed text-justify">
                              <p>
                                📀 <strong>기존 플라스틱 CD 앨범의 가치 회복:</strong> 단순 소장용으로 전락하여 쓰레기를 유발하는 일반 CD 대신, 인테리어적 조화와 아티스트의 작업 비하인드를 심도 깊게 느낄 수 있는 단행본 북(Book) 형태의 앨범을 정의했습니다.
                              </p>
                              <p>
                                🌿 <strong>전곡 작사작곡 및 프로듀싱:</strong> 전곡의 작사, 작곡, 편곡 기획 뿐만 아니라, 비주얼 연계 굿즈 제작과 팬들과 소통을 이어가는 라이브 쇼케이스 무대 디자인까지 일관된 컨셉(Greenery) 하에 정합되도록 연출을 주도했습니다.
                              </p>
                              <p>
                                🎨 <strong>디자인 & 유통망 관리:</strong> 앨범 아트, 텍스처, 지질 선정 등의 디자인 감수를 직접 조율하며 온·오프라인 10여 개의 유통 채널 입점을 이루어 냈습니다.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : isFlowerPlanet ? (
                      <div className="space-y-8 md:space-y-11 animate-fade-in font-sans text-neutral-800">
                        {/* Top Row: Role & Execution (Left) & Metrics & Outcomes (Right) */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
                          {/* 1. Role */}
                          <div className="flex flex-col h-full">
                            {project.role ? (
                              <div className="border border-neutral-200/85 p-5 bg-white shadow-3xs rounded-[12px] space-y-4 flex-1 flex flex-col">
                                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                                  <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full" />
                                    <h3 className="text-[18px] font-black text-neutral-900 tracking-tight uppercase">담당 업무</h3>
                                  </div>
                                </div>
                                <div className="space-y-3.5 flex-1">
                                  {project.role.items.map((item, i) => {
                                    let label: string | null = null;
                                    let desc = item;
                                    if (item.includes(":\n")) {
                                      const parts = item.split(":\n");
                                      label = parts[0];
                                      desc = parts[1];
                                    } else if (item.includes(": ")) {
                                      const parts = item.split(": ");
                                      label = parts[0];
                                      desc = parts[1];
                                    }
                                    return (
                                      <div key={i} className="border-b border-neutral-50 last:border-none pb-3 mb-3 last:pb-0 last:mb-0">
                                        <div className="flex items-start gap-2 mb-1.5">
                                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0" />
                                          <p className="text-sm md:text-[15px] font-bold text-neutral-950 leading-snug">{label || "업무"}</p>
                                        </div>
                                        <div className="ml-3.5 p-2.5 bg-neutral-50/70 border-l-2 border-blue-500 rounded-[6px]">
                                          <p className="text-sm md:text-[15px] font-medium text-blue-900 leading-relaxed whitespace-pre-line">{desc}</p>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            ) : null}
                          </div>

                          {/* 2. Metrics & Outcomes */}
                          <div className="flex flex-col h-full">
                            <div className="bg-white border border-neutral-200/85 p-5 shadow-3xs rounded-[12px] space-y-4 flex-1 flex flex-col">
                              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                                <div className="flex items-center gap-2">
                                  <span className="w-2 h-2 bg-amber-500 rounded-full" />
                                  <h3 className="text-[18px] font-black text-neutral-900 tracking-tight uppercase">목표 및 성과</h3>
                                </div>
                              </div>
                              <div className="space-y-3.5 flex-1">
                                {[
                                  {
                                    title: "지역 음악 씬 활성화 & 아티스트 교류 유치",
                                    desc: "지역 아티스트 '이그린'과 서울 아티스트 '우예린' 콜라보레이션 유치 및 공동 공연 성사"
                                  },
                                  {
                                    title: "관객 모객 규모 달성 (공간 수용 인원 100명 타겟)",
                                    desc: "적극적 사전 예매 촉진을 통해 유효 티켓 판매 총 50명 방문 달성"
                                  },
                                  {
                                    title: "체험 중심 콘텐츠 기획 및 미디어 연출",
                                    desc: "관객 몰입형 '헤나 체험 부스' 현장 운영 및 감성적인 '오프닝 콘셉트 영상' 자체 제작 및 상영"
                                  },
                                  {
                                    title: "온라인 홍보 다각화 및 타겟형 프로모션 전략 수립",
                                    desc: "인스타그램 전용 고감도 루틴 홍보 영상 배포 및 '티켓 2+1 이벤트' 프로모션을 통한 사전 모객 극대화"
                                  }
                                ].map((item, i) => (
                                  <div key={i} className="border-b border-neutral-50 last:border-none pb-3 mb-3 last:pb-0 last:mb-0">
                                    <div className="flex items-start gap-2 mb-1.5">
                                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 shrink-0" />
                                      <p className="text-sm md:text-[15px] font-bold text-neutral-950 leading-snug">{item.title}</p>
                                    </div>
                                    <div className="ml-3.5 p-2.5 bg-neutral-50/70 border-l-2 border-amber-500 rounded-[6px]">
                                      <p className="text-sm md:text-[15px] font-medium text-amber-900 leading-relaxed whitespace-pre-line">{item.desc}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Row: Content 1 (Left) & Content 2 (Right) */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
                          {/* 콘텐츠 1 */}
                          <div className="p-5 md:p-6 border border-neutral-200 bg-white shadow-3xs space-y-4 rounded-[15px]">
                            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-violet-500 rounded-full" />
                                <h3 className="text-[18px] font-black text-neutral-900 tracking-tight uppercase">콘텐츠 1 : 공연 오프닝 영상 제작</h3>
                              </div>
                            </div>
                            <p className="text-sm md:text-[15px] text-neutral-600 font-sans leading-relaxed text-justify">
                              두 아티스트의 서사와 우주적 세계관의 어우러짐을 아름답게 시각화한 오프닝 콘셉트 미디어 영상입니다. 세련되게 다듬어진 미장센과 깊고 감각적인 편집을 통해, 라이브 콘서트가 본격적으로 펼쳐지기 전 ‘Flower Planet’의 정체성과 특유의 몽환적인 감성을 관객에게 한층 밀착 전달하도록 연출을 주도했습니다.
                            </p>
                            
                            {/* Images Grid for Content 1 */}
                            {project.images && project.images.length > 0 ? (
                              <div className="grid grid-cols-2 gap-4">
                                {project.images.slice(0, 4).map((img, i) => (
                                  <div 
                                    key={i} 
                                    onClick={() => setLightboxImage(img)}
                                    className="group/img bg-neutral-50 border border-neutral-200/80 rounded-[8px] overflow-hidden aspect-[4/3] cursor-zoom-in relative hover:border-rose-400 hover:shadow-2xs transition-all duration-300"
                                  >
                                    <OptimizedImage 
                                      src={img} 
                                      alt={`오프닝 영상 이미지 ${i + 1}`} 
                                      className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-[1.06]" 
                                      referrerPolicy="no-referrer" 
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/15 transition-colors duration-300 flex items-center justify-center">
                                      <span className="opacity-0 group-hover/img:opacity-100 text-white font-sans text-[10px] font-bold bg-neutral-950/80 px-2.5 py-1 tracking-tight rounded-full transition-opacity duration-300">자세히 보기</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : null}
                          </div>

                          {/* 콘텐츠 2 */}
                          <div className="p-5 md:p-6 border border-neutral-200 bg-white shadow-3xs space-y-4 rounded-[15px]">
                            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                                <h3 className="text-[18px] font-black text-neutral-900 tracking-tight uppercase">콘텐츠 2 : 헤나 부스 운영</h3>
                              </div>
                            </div>
                            <p className="text-sm md:text-[15px] text-neutral-600 font-sans leading-relaxed text-justify">
                              공연 컨셉인 <strong className="text-neutral-950 font-bold">‘Flower Planet’</strong> 일치 구도를 한층 흥미로운 현장 오감 콘텐츠로 즐길 수 있도록 한 기획 콘텐츠입니다. 향기로운 꽃과 신비로운 은하를 결합한 독자 헤나 디자인 시안들을 수립하여, 관객이 직접 인체 및 손가락 등에 새겨 기억 속에 오랫동안 간직할 수 있는 꽃 헤나 체험 부스를 성공적으로 연출 및 현장 운영했습니다.
                            </p>
                            
                            {/* Images Grid for Content 2 */}
                            {project.images && project.images.length > 4 ? (
                              <div className="grid grid-cols-2 gap-4">
                                {project.images.slice(4).map((img, i) => (
                                  <div 
                                    key={i} 
                                    onClick={() => setLightboxImage(img)}
                                    className="group/img bg-neutral-50 border border-neutral-200/80 rounded-[8px] overflow-hidden aspect-[4/3] cursor-zoom-in relative hover:border-emerald-400 hover:shadow-2xs transition-all duration-300"
                                  >
                                    <OptimizedImage 
                                      src={img} 
                                      alt={`헤나 부스 이미지 ${i + 1}`} 
                                      className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-[1.06]" 
                                      referrerPolicy="no-referrer" 
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/15 transition-colors duration-300 flex items-center justify-center">
                                      <span className="opacity-0 group-hover/img:opacity-100 text-white font-sans text-[10px] font-bold bg-neutral-950/80 px-2.5 py-1 tracking-tight rounded-full transition-opacity duration-300">자세히 보기</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ) : (isYeoldaeya || isAfternoon || isNightflight) ? (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start animate-fade-in font-sans">
                        {/* Left Column (lg:col-span-6): Role & Execution */}
                        <div className="lg:col-span-6 space-y-6">
                          <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
                            <span className="text-[9px] font-mono bg-rose-600 text-white px-1.5 py-0.5 rounded-none uppercase tracking-wider font-bold">Role & Execution</span>
                            <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider">주도적 역할 및 실행업무</h3>
                          </div>
                          {project.role ? (
                            <div className="border border-neutral-200/85 p-6 bg-white shadow-3xs rounded-[15px] space-y-5">
                              <div className="flex flex-col items-start gap-1.5 border-b border-neutral-150 pb-4">
                                <span className="text-[11px] font-mono text-neutral-400 font-bold uppercase tracking-wide">수행 역할</span>
                                <span className="inline-block font-extrabold text-rose-600 bg-rose-50/60 border border-rose-500/10 px-3 py-1 text-sm rounded-[6px]">
                                  {project.role.title}
                                </span>
                              </div>
                              <ul className="space-y-4">
                                {project.role.items.map((item, i) => {
                                  const anonymity = item.includes(":\n") || item.includes(": ");
                                  let label: string | null = null;
                                  let desc = item;
                                  if (item.includes(":\n")) {
                                    const parts = item.split(":\n");
                                    label = parts[0];
                                    desc = parts[1];
                                  } else if (item.includes(": ")) {
                                    const parts = item.split(": ");
                                    label = parts[0];
                                    desc = parts[1];
                                  }
                                  return (
                                    <li key={i} className="text-xs sm:text-[13px] text-neutral-800 leading-relaxed flex items-start gap-3">
                                      <span className="mt-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0" />
                                      <div className="flex flex-col">
                                        {label ? (
                                          <>
                                            <strong className="text-neutral-950 font-bold text-[14px] mb-0.5">{label}</strong>
                                            <span className="font-normal text-neutral-600 leading-relaxed whitespace-pre-line">{desc}</span>
                                          </>
                                        ) : (
                                          <span className="font-normal text-neutral-800 leading-relaxed whitespace-pre-line">{desc}</span>
                                        )}
                                      </div>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          ) : (
                            <div className="p-6 border border-dashed border-neutral-200 bg-white/50 text-neutral-400 text-xs text-center font-sans">
                              등록된 실행 업무가 없습니다.
                            </div>
                          )}
                        </div>

                        {/* Right: Results */}
                        <div className="lg:col-span-6 space-y-6">
                          <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
                            <span className="text-[9px] font-mono bg-black text-white px-1.5 py-0.5 rounded-none uppercase tracking-wider font-bold">Metrics & Outcomes</span>
                            <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider">핵심 추진 성과</h3>
                          </div>
                          {isYeoldaeya ? (
                            <div className="space-y-4 bg-white border border-neutral-200/85 p-6 shadow-3xs rounded-[15px]">
                              {[
                                {
                                  title: "이색적인 도심 문화 공간 기획 및 제공",
                                  desc: "도심 빌딩 루프탑 공간과 로컬 인디 아티스트의 정취를 결합한 특별한 야외 라이브 축제를 성획하여 전석 매진 달성"
                                },
                                {
                                  title: "공간 및 브랜드 제휴 프로모션 다각화",
                                  desc: "KT&G 상상마당 루프탑 공간 대관 수립 및 야간 옥상 무드에 적합한 수제 와인, 핑거푸드 페어링 케이터링 협업 기획"
                                },
                                {
                                  title: "온라인 미디어 중심 다채널 홍보 성행",
                                  desc: "상상마당 및 HAO 공식 플랫폼 스팟 홍보 영상 릴리즈, 배너 및 세로형 전용 비주얼 에셋 제작 배포"
                                }
                              ].map((item, i) => (
                                <div key={i} className="border-b border-neutral-100 last:border-none pb-4 mb-4 last:pb-0 last:mb-0">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="text-[9px] font-mono text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-none border border-rose-200/50 font-bold">RESULT 0{i+1}</span>
                                    <p className="text-xs sm:text-[13px] font-bold text-neutral-950 leading-snug">{item.title}</p>
                                  </div>
                                  <div className="ml-7 p-3 bg-neutral-50/70 border-l-2 border-rose-500 rounded-[6px]">
                                    <p className="text-xs sm:text-[13px] font-medium text-rose-750 leading-relaxed whitespace-pre-line">{item.desc}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : project.results ? (
                            <div className="space-y-4 bg-white border border-neutral-200/85 p-6 shadow-3xs rounded-[15px]">
                              {project.results.map((result, i) => {
                                const hasArrow = result.includes(" -> ");
                                if (hasArrow) {
                                  const [goal, outcome] = result.split(" -> ");
                                  return (
                                    <div key={i} className="border-b border-neutral-100 last:border-none pb-4 mb-4 last:pb-0 last:mb-0">
                                      <div className="flex items-center gap-2 mb-2">
                                        <span className="text-[9px] font-mono text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-none border border-rose-200/50 font-bold">RESULT 0{i+1}</span>
                                        <p className="text-xs sm:text-[13px] font-bold text-neutral-950 leading-snug">{goal}</p>
                                      </div>
                                      <div className="ml-7 p-3 bg-neutral-50/70 border-l-2 border-rose-500 rounded-[6px]">
                                        <p className="text-xs sm:text-[13px] font-medium text-rose-750 leading-relaxed whitespace-pre-line">{outcome}</p>
                                      </div>
                                    </div>
                                  );
                                }
                                return (
                                  <div key={i} className="text-xs sm:text-[13px] font-normal flex items-start gap-3 py-2 border-b border-neutral-100 last:border-none">
                                    <span className="text-[9px] font-mono text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-none border border-rose-200/50 font-bold">RESULT 0{i+1}</span>
                                    <span className="flex-1 text-neutral-800 leading-relaxed">{result}</span>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="p-6 border border-dashed border-neutral-200 bg-white/50 text-neutral-400 text-xs text-center font-sans">
                              등록된 성과 지표가 없습니다.
                            </div>
                          )}
                        </div>
                      </div>
                    ) : project?.title === "페스티벌 운영" ? (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start animate-fade-in">
                        {/* Left Column (lg:col-span-5): Title & 2 Photos */}
                        <div className="lg:col-span-5 space-y-6">
                          <div className="p-5 md:p-6 border border-neutral-200/85 bg-white hover:border-rose-400/60 transition-all rounded-[15px] shadow-3xs flex flex-col gap-3 font-sans">
                            <p className="text-[15px] font-black uppercase text-neutral-900 tracking-wider font-sans flex items-center gap-2 border-b border-neutral-100 pb-2.5">
                              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0" />
                              참여 프로젝트
                            </p>
                            <ul className="space-y-2 pl-1.5 text-[13px] text-neutral-700 font-medium pb-1.5">
                              {(project.festivalProjects2 || [
                                "2024 WATERBOMB 서울",
                                "2024 WATERBOMB 대전",
                                "2024 WATERBOMB 대구",
                                "2024 WATERBOMB 부산",
                                "2024 WATERBOMB 인천",
                                "2024 WATERBOMB 수원",
                                "2024 WATERBOMB 여수"
                              ]).map((item, idx) => (
                                <li key={idx} className="flex items-center gap-2.5 transition-colors duration-200 hover:text-rose-500">
                                  <span className="w-1.5 h-1.5 bg-rose-400 rounded-full shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
 
                          {/* 2 Photos - Horizontal rectangles in 2 rows */}
                          <div className="flex flex-col gap-4">
                            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[15px] border border-neutral-200/60 shadow-3xs group/photo">
                              <OptimizedImage
                                src="https://raw.githubusercontent.com/2green-lee/Portfolio/9d41580d7739017f4b186f92faf6491a60264fd5/2024waterbomb.png"
                                alt="Waterbomb Tour"
                                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/photo:scale-105"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[15px] border border-neutral-200/60 shadow-3xs group/photo">
                              <OptimizedImage
                                src="https://raw.githubusercontent.com/2green-lee/Portfolio/301715e6090e002a7c306c6d76f35d8d78ed92f4/2024incheonrock.png"
                                alt="Incheon Pentaport"
                                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/photo:scale-105"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          </div>
                        </div>
 
                        {/* Right Column (lg:col-span-7): 3-Step Process in 3 Rows */}
                        <div className="lg:col-span-7 space-y-5">
                          {(project.processTicket || DEFAULT_FESTIVAL_TICKET).map((step, sIdx) => (
                            <div key={sIdx} className="p-5 md:p-6 border border-neutral-200/85 bg-white hover:border-rose-400/60 transition-all rounded-[15px] shadow-3xs flex flex-col gap-3 font-sans">
                              <div className="flex items-center justify-between border-b border-neutral-100 pb-2.5">
                                <h4 className="text-[15px] font-black text-neutral-900 flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                                  {step.phase}
                                </h4>
                                <span className="text-[10px] font-mono text-neutral-400 font-bold bg-neutral-50 px-2 py-0.5 rounded-md border border-neutral-100">
                                  {step.label || (sIdx === 0 ? "PRE-EVENT" : sIdx === 1 ? "ON-SITE" : "POST-EVENT")}
                                </span>
                              </div>
                              <ul className="space-y-3.5 text-xs sm:text-[13px] text-neutral-750 font-sans">
                                {step.items.map((item, iIdx) => (
                                  <li key={iIdx} className={`leading-relaxed ${iIdx > 0 ? "border-t border-neutral-100/60 pt-3" : ""}`}>
                                    <strong className="text-neutral-900 block font-bold mb-0.5">{item.title}</strong>
                                    <span className="text-neutral-650 font-sans">{item.body}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
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
                            <span className="text-[9px] font-mono bg-black text-white px-1.5 py-0.5 rounded-none uppercase tracking-wider font-bold">Preparation</span>
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
                    )
                  )}

                  {slidePage === 3 && (
                    isGreenery ? (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start animate-fade-in font-sans">
                        {/* Left Column (lg:col-span-6): Funding & Publishing Results */}
                        <div className="lg:col-span-6 space-y-6">
                          <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
                            <span className="text-[9px] font-mono bg-emerald-600 text-white px-1.5 py-0.5 rounded-none uppercase tracking-wider font-bold">Performance</span>
                            <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider">주요 성과 및 펀딩 지표</h3>
                          </div>
                          <div className="space-y-3.5 bg-white border border-neutral-200 p-6 shadow-3xs rounded-[15px]">
                            {project.results?.map((result, i) => {
                              const hasArrow = result.includes(" -> ");
                              if (hasArrow) {
                                const [goal, outcome] = result.split(" -> ");
                                return (
                                  <div key={i} className="border-b border-neutral-100 last:border-none pb-3.5 mb-3.5 last:pb-0 last:mb-0">
                                    <div className="flex items-center gap-2 mb-1.5">
                                      <span className="text-[9px] font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-none border border-emerald-200/50 font-bold">RESULT 0{i+1}</span>
                                      <p className="text-xs sm:text-[13px] font-bold text-neutral-950">{goal}</p>
                                    </div>
                                    <div className="ml-7 p-3 bg-neutral-50/70 border-l-2 border-emerald-500 rounded-none">
                                      <p className="text-xs sm:text-[13px] font-medium text-emerald-700 leading-relaxed whitespace-pre-line">{outcome}</p>
                                    </div>
                                  </div>
                                );
                              }
                              return (
                                <div key={i} className="text-xs sm:text-[13px] font-normal flex items-start gap-3 py-2 border-b border-neutral-100 last:border-none">
                                  <span className="text-[9px] font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-none border border-emerald-200/50 font-bold">RESULT 0{i+1}</span>
                                  <span className="flex-1 text-neutral-800 leading-relaxed">{result}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Right: Funding & Audience Feedbacks */}
                        <div className="lg:col-span-6 space-y-6">
                          <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
                            <span className="text-[9px] font-mono bg-blue-600 text-white px-1.5 py-0.5 rounded-none uppercase tracking-wider font-bold">Review</span>
                            <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider">크라우드 펀딩 사후 리뷰 & 반응</h3>
                          </div>
                          <div className="p-6 border border-neutral-200 bg-white shadow-3xs space-y-5 rounded-[15px]">
                            <h4 className="text-sm font-bold text-neutral-900 flex justify-between items-center border-b border-neutral-100 pb-2">
                              <span className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                펀딩 후기 및 독자/지표 평가
                              </span>
                              <span className="text-[9px] font-mono text-neutral-400 font-bold">196% OVER</span>
                            </h4>
                            <div className="space-y-4 text-xs sm:text-[13px] text-neutral-750 font-sans leading-relaxed">
                              <div className="bg-blue-50/50 p-4 border-l-2 border-blue-600 space-y-2 rounded-r-[8px]">
                                <span className="text-[10px] font-bold text-blue-700 uppercase block">텀블벅 최우수 추천 프로젝트 선정</span>
                                <p className="text-neutral-700 text-xs sm:text-[13px] font-medium leading-relaxed">
                                  "CD 플레이어가 없어도 영구히 간직할 수 있고, 악보와 아티스트의 고뇌가 그대로 묻어난 고품질 화집 가사북이었습니다." 라는 실구매자(후원자) 리뷰와 함께 평점 4.9/5 완벽 피드백 달성.
                                </p>
                              </div>
                              <div className="bg-neutral-50/70 p-4 border-l-2 border-neutral-800 space-y-1 rounded-r-[8px]">
                                <span className="text-[10px] font-bold text-neutral-850 uppercase block">온·오프라인 10개 서점/음반 배급처 연계</span>
                                <p className="text-neutral-700 text-xs sm:text-[13px] leading-relaxed">
                                  텀블벅 펀딩 종료 후, 전국 독립서점 10여 곳에 입점하여 도서 유통 계약을 체결하였으며 아티스트 기획 굿즈의 지속 유통 구조 확립.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (isFlowerPlanet || isYeoldaeya || isAfternoon || isNightflight) ? (
                      <div className="space-y-6 animate-fade-in font-sans text-neutral-850">
                        <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
                          <span className="text-[9px] font-mono bg-neutral-950 text-white px-1.5 py-0.5 rounded-none uppercase tracking-wider font-bold">Gallery Archive</span>
                          <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider">갤러리 아카이브</h3>
                        </div>
                        {project.images && project.images.length > 0 ? (
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {project.images.map((img, i) => (
                              <div key={i} className="bg-neutral-50 overflow-hidden border border-neutral-200/85 shadow-3xs transition-all duration-300 rounded-[12px] aspect-[4/3] flex items-center justify-center group/gallery">
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
                    ) : isFestival ? (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start animate-fade-in">
                        {/* Left Column (lg:col-span-5): Title & 2 Photos */}
                        <div className="lg:col-span-5 space-y-6">
                          <div className="p-5 md:p-6 border border-neutral-200/85 bg-white hover:border-rose-400/60 transition-all rounded-[15px] shadow-3xs flex flex-col gap-3 font-sans">
                            <p className="text-[15px] font-black uppercase text-neutral-900 tracking-wider font-sans flex items-center gap-2 border-b border-neutral-100 pb-2.5">
                              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0" />
                              참여 프로젝트
                            </p>
                            <ul className="space-y-2 pl-1.5 text-[13px] text-neutral-700 font-medium font-sans pb-1.5">
                              {(project.festivalProjects3 || [
                                "2024 인천펜타포트국제록페스티벌",
                                "2024 어썸뮤직페스티벌",
                                "2024 이슬라이브 페스티벌",
                                "2024 여수 썸머 뮤직 페스티벌",
                                "2024 로즈아워 페스티벌"
                              ]).map((item, idx) => (
                                <li key={idx} className="flex items-center gap-2.5 transition-colors duration-200 hover:text-rose-500">
                                  <span className="w-1.5 h-1.5 bg-rose-400 rounded-full shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* 2 Photos - Horizontal rectangles in 2 rows */}
                          <div className="flex flex-col gap-4">
                            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[15px] border border-neutral-200/60 shadow-3xs group/photo">
                              <OptimizedImage
                                src="https://raw.githubusercontent.com/2green-lee/Portfolio/9d41580d7739017f4b186f92faf6491a60264fd5/2024waterbomb.png"
                                alt="Waterbomb Tour"
                                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/photo:scale-105"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[15px] border border-neutral-200/60 shadow-3xs group/photo">
                              <OptimizedImage
                                src="https://raw.githubusercontent.com/2green-lee/Portfolio/301715e6090e002a7c306c6d76f35d8d78ed92f4/2024incheonrock.png"
                                alt="Incheon Pentaport"
                                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/photo:scale-105"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Right Column (lg:col-span-7): 3-Step Process in 3 Rows */}
                        <div className="lg:col-span-7 space-y-5">
                          {(project.processFnB || DEFAULT_FESTIVAL_FNB).map((step, sIdx) => (
                            <div key={sIdx} className="p-5 md:p-6 border border-neutral-200/85 bg-white hover:border-rose-400/60 transition-all rounded-[15px] shadow-3xs flex flex-col gap-3 font-sans">
                              <div className="flex items-center justify-between border-b border-neutral-100 pb-2.5">
                                <h4 className="text-[15px] font-black text-neutral-900 flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                                  {step.phase}
                                </h4>
                                <span className="text-[10px] font-mono text-neutral-400 font-bold bg-neutral-50 px-2 py-0.5 rounded-md border border-neutral-100">
                                  {step.label || (sIdx === 0 ? "PRE-EVENT" : sIdx === 1 ? "ON-SITE" : "POST-EVENT")}
                                </span>
                              </div>
                              <ul className="space-y-3.5 text-xs sm:text-[13px] text-neutral-750 font-sans">
                                {step.items.map((item, iIdx) => (
                                  <li key={iIdx} className={`leading-relaxed ${iIdx > 0 ? "border-t border-neutral-100/60 pt-3" : ""}`}>
                                    <strong className="text-neutral-900 block font-bold mb-0.5">{item.title}</strong>
                                    <span className="text-neutral-650 font-sans">{item.body}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
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
                                <span className="text-[9px] font-mono text-neutral-400 font-bold">STEP 02</span>
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
                    isGreenery ? (
                      <div className="space-y-6 animate-fade-in font-sans text-neutral-850">
                        <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
                          <span className="text-[9px] font-mono bg-neutral-950 text-white px-1.5 py-0.5 rounded-none uppercase tracking-wider font-bold">Gallery Archive</span>
                          <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider">갤러리 아카이브</h3>
                        </div>
                        {project.images && project.images.length > 0 ? (
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {project.images.map((img, i) => (
                              <div key={i} className="bg-neutral-50 overflow-hidden border border-neutral-200 shadow-3xs transition-all duration-300 rounded-[12px] aspect-[4/3] flex items-center justify-center group/gallery">
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
                    ) : isFestival ? (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start animate-fade-in font-sans">
                        {/* Left Column (lg:col-span-5): Title & 2 Photos */}
                        <div className="lg:col-span-5 space-y-6">
                          <div className="p-5 md:p-6 border border-neutral-200/85 bg-white hover:border-rose-400/60 transition-all rounded-[15px] shadow-3xs flex flex-col gap-3 font-sans max-w-full">
                            <p className="text-[15px] font-black uppercase text-neutral-900 tracking-wider font-sans flex items-center gap-2 border-b border-neutral-100 pb-2.5">
                              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0" />
                              참여 프로젝트
                            </p>
                            <ul className="space-y-2 pl-1.5 text-[13px] text-neutral-750 font-medium font-sans pb-1.5">
                              {(project.festivalProjects4 || [
                                "2024 부산 국제 록 페스티벌 (MD)",
                                "2024 WATERBOMB 제주 (물품보관소)",
                                "2024 WATERBOMB 속초 (물품보관소)",
                                "2024 그린캠프 페스티벌 (물품보관소)"
                              ]).map((item, idx) => (
                                <li key={idx} className="flex items-center gap-2.5 transition-colors duration-200 hover:text-rose-500">
                                  <span className="w-1.5 h-1.5 bg-rose-400 rounded-full shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* 2 Photos - Horizontal rectangles in 2 rows */}
                          <div className="flex flex-col gap-4">
                            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[15px] border border-neutral-200/60 shadow-3xs group/photo">
                              <OptimizedImage
                                src="https://raw.githubusercontent.com/2green-lee/Portfolio/9d41580d7739017f4b186f92faf6491a60264fd5/2024waterbomb.png"
                                alt="Waterbomb Tour"
                                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/photo:scale-105"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[15px] border border-neutral-200/60 shadow-3xs group/photo">
                              <OptimizedImage
                                src="https://raw.githubusercontent.com/2green-lee/Portfolio/301715e6090e002a7c306c6d76f35d8d78ed92f4/2024incheonrock.png"
                                alt="Incheon Pentaport"
                                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/photo:scale-105"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Right Column (lg:col-span-7): 3-Step Process in 3 Rows */}
                        <div className="lg:col-span-7 space-y-5">
                          {(project.processStorage || DEFAULT_FESTIVAL_STORAGE).map((step, sIdx) => (
                            <div key={sIdx} className="p-5 md:p-6 border border-neutral-200/85 bg-white hover:border-rose-400/60 transition-all rounded-[15px] shadow-3xs flex flex-col gap-3 font-sans">
                              <div className="flex items-center justify-between border-b border-neutral-100 pb-2.5">
                                <h4 className="text-[15px] font-black text-neutral-900 flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                                  {step.phase}
                                </h4>
                                <span className="text-[10px] font-mono text-neutral-400 font-bold bg-neutral-50 px-2 py-0.5 rounded-md border border-neutral-100 font-bold">
                                  {step.label || (sIdx === 0 ? "PRE-EVENT" : sIdx === 1 ? "LIVE-CONTROL" : "POST-EVENT")}
                                </span>
                              </div>
                              <ul className="space-y-3.5 text-xs sm:text-[13px] text-neutral-750 font-sans">
                                {step.items.map((item, iIdx) => (
                                  <li key={iIdx} className={`leading-relaxed ${iIdx > 0 ? "border-t border-neutral-100/60 pt-3" : ""}`}>
                                    <strong className="text-neutral-900 block font-bold mb-0.5">{item.title}</strong>
                                    <span className="text-neutral-650 font-sans">{item.body}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : isConcert ? (
                      // Render Gallery for Concert Management on page 4
                      <div className="space-y-6 animate-fade-in font-sans text-neutral-850">
                        <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
                          <span className="text-[9px] font-mono bg-neutral-950 text-white px-1.5 py-0.5 rounded-none uppercase tracking-wider font-bold font-sans">Gallery Archive</span>
                          <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider">갤러리 아카이브</h3>
                        </div>
                        {project.images && project.images.length > 0 ? (
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {project.images.map((img, i) => (
                              <div key={i} className="bg-neutral-50 overflow-hidden border border-neutral-200 shadow-3xs transition-all duration-300 rounded-[12px] aspect-[4/3] flex items-center justify-center group/gallery">
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
                    ) : (
                      // If not festival and not concert: Render Review (originally slidePage === 4) on Page 4
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
                                  <span className="text-[9px] font-mono text-neutral-400 font-bold">STEP 03</span>
                                </h4>
                                <ul className="space-y-3 font-sans">
                                  {project.process[2].items.map((item, j) => (
                                    <li key={j} className="text-xs sm:text-[13px] text-neutral-750 flex items-start gap-2 leading-relaxed">
                                      <span className="mt-1.5 w-1 h-1 bg-neutral-400 rounded-full shrink-0" />
                                      <span className="font-normal text-neutral-750">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ) : (
                              <div className="p-16 border border-dashed border-neutral-200 bg-neutral-50/50 text-neutral-400 text-xs text-center font-mono">
                                사후 관리 프로세스가 전산에 정합되지 않았습니다.
                              </div>
                            )}
                          </div>

                          {/* Right: Results list */}
                          <div className="lg:col-span-6 space-y-6">
                            <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
                              <span className="text-[9px] font-mono bg-neutral-950 text-white px-1.5 py-0.5 rounded-none uppercase tracking-wider font-bold font-sans">Results</span>
                              <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider font-sans">성과 및 기대 효과</h3>
                            </div>
                            {project.results && project.results.length > 0 ? (
                              <div className="space-y-4 font-sans">
                                {project.results.map((result, i) => {
                                  let mainPart = result;
                                  let subPart = "";
                                  if (result.includes("->")) {
                                    const parts = result.split("->");
                                    mainPart = parts[0].trim();
                                    subPart = parts[1].trim();
                                  }
                                  return (
                                    <div key={i} className="p-5 border border-neutral-200 bg-white shadow-3xs flex flex-col gap-1.5 rounded-none">
                                      <span className="text-xs sm:text-[13px] text-neutral-800 font-medium leading-relaxed">{mainPart}</span>
                                      {subPart && (
                                        <div className="text-xs font-sans text-rose-600 font-bold flex items-center gap-1.5 mt-1 font-sans">
                                          <span className="w-1 h-1 bg-rose-500 rounded-full shrink-0" />
                                          <span>{subPart}</span>
                                        </div>
                                      )}
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
                        </div>
                      </div>
                    )
                  )}

                  {slidePage === 5 && (
                    <div className="space-y-6 animate-fade-in font-sans text-neutral-850">
                      <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
                        <span className="text-[9px] font-mono bg-neutral-950 text-white px-1.5 py-0.5 rounded-none uppercase tracking-wider font-bold">Gallery Archive</span>
                        <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider">갤러리 아카이브</h3>
                      </div>
                      {project.images && project.images.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                          {project.images.map((img, i) => (
                            <div key={i} className="bg-neutral-50 overflow-hidden border border-neutral-200 shadow-3xs transition-all duration-300 rounded-[12px] aspect-[4/3] flex items-center justify-center group/gallery">
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
          {/* Lightbox Overlay */}
          <AnimatePresence>
            {lightboxImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-neutral-950/90 backdrop-blur-md z-[300] flex flex-col items-center justify-center p-4 cursor-zoom-out"
                onClick={() => setLightboxImage(null)}
              >
                <button
                  type="button"
                  onClick={() => setLightboxImage(null)}
                  className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full backdrop-blur-xs transition-all duration-200 cursor-pointer shadow-sm"
                  aria-label="Close Lightbox"
                >
                  <X size={20} />
                </button>
                <div className="max-w-[96vw] max-h-[92vh] flex items-center justify-center relative select-none">
                  <OptimizedImage
                    src={lightboxImage}
                    alt="Lightbox View"
                    className="max-w-full max-h-[92vh] object-contain rounded-lg shadow-2xl border border-white/10"
                    referrerPolicy="no-referrer"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <div className="mt-4 text-white/60 text-xs font-sans tracking-wide">
                  클릭 시 닫기
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
};

const ActivityModal: React.FC<{
  activity: any;
  onClose: () => void;
}> = ({ activity, onClose }) => {
  useEffect(() => {
    if (!activity) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activity, onClose]);

  return (
    <AnimatePresence>
      {activity && (
        <>
          {/* Overlay Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs z-[202]"
          />
          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-lg sm:max-w-xl w-full bg-white z-[203] overflow-hidden flex flex-col font-sans text-neutral-880 border border-neutral-200/50 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] rounded-[20px] p-8 md:p-10"
          >
            {/* Header / Subtitle */}
            <div className="flex justify-between items-start">
              <span className="text-[10px] uppercase tracking-widest font-mono text-neutral-800 font-bold bg-neutral-100 px-2.5 py-1 border border-neutral-200 rounded-[4px]">
                {activity.org}
              </span>
              <button 
                onClick={onClose} 
                className="p-1 px-1.5 hover:bg-neutral-950 hover:text-white transition-all rounded-md cursor-pointer text-neutral-400 outline-none border-none shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Title / Duration */}
            <div className="space-y-2 mt-4 font-sans font-bold">
              <h3 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight leading-tight">
                {activity.title}
              </h3>
              <p className="text-xs font-mono text-neutral-400 font-medium font-bold">
                {activity.period}
              </p>
            </div>

            {/* Divider Line with tiny neutral dot */}
            <div className="flex items-center gap-2 border-b border-neutral-100 pb-4 mt-4 font-sans font-bold">
              <span className="w-1.5 h-1.5 bg-neutral-950 rounded-full" />
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest font-bold tracking-wider">Activity Detail Spec</span>
            </div>

            {/* Inner Content Block: Clean grid & lists */}
            <div className="space-y-5 py-4 font-sans">
              <div className="bg-neutral-50/70 border border-neutral-200/80 rounded-[15px] p-5 space-y-4 w-full animate-fade-in">
                <div className="flex items-center gap-2 border-b border-neutral-200/80 pb-2">
                  <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full shrink-0 mt-1.5 group-hover/item:bg-neutral-850 transition-colors duration-200" />
                  <h4 className="text-xs font-bold tracking-wider text-neutral-800 uppercase font-sans">
                    주요 실행 업무 및 성과
                  </h4>
                </div>
                <ul className="space-y-3.5 text-xs sm:text-[13px] text-neutral-750 font-sans leading-relaxed">
                  {(activity.desc || []).map((d: string, j: number) => (
                    <li key={j} className="flex items-start gap-2.5 py-0.5 px-0.5 group/item hover:text-neutral-950 transition-colors duration-200">
                      <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full shrink-0 mt-1.5 group-hover/item:bg-neutral-850 transition-colors duration-200" />
                      <span className="font-medium text-neutral-700">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer Quote or Branding */}
            <div className="text-[10px] font-mono opacity-30 leading-tight uppercase tracking-tighter text-right pt-2 border-t border-neutral-150 font-sans">
              ©2026 Portfolio · key activities
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const roundTranslate = (_: any, generated: string) => {
  return generated.replace(/(-?\d+\.\d+)px/g, (_, p1) => {
    return `${Math.round(parseFloat(p1))}px`;
  });
};

export default function App() {
  const [time, setTime] = useState(new Date());
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
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
        const res = await fetch("/api/portfolio?t=" + Date.now(), {
          cache: "no-store",
          headers: {
            "Pragma": "no-cache",
            "Cache-Control": "no-cache"
          }
        });
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

  const educationData = portfolioData?.education || DEFAULT_PORTFOLIO_DATA.education;
  const workExperienceData = portfolioData?.workExperience || DEFAULT_PORTFOLIO_DATA.workExperience || [];
  const certificatesData = portfolioData?.certificates || DEFAULT_PORTFOLIO_DATA.certificates || [];
  const contactData = portfolioData?.contact || DEFAULT_PORTFOLIO_DATA.contact;
  const introductionText = portfolioData?.introduction || DEFAULT_PORTFOLIO_DATA.introduction;
  const profileImage = portfolioData?.profileImage || DEFAULT_PORTFOLIO_DATA.profileImage;

  const featuredProjects: Project[] = portfolioData?.featuredProjects || DEFAULT_PORTFOLIO_DATA.featuredProjects || [];
  const personalProjects: Project[] = portfolioData?.personalProjects || DEFAULT_PORTFOLIO_DATA.personalProjects || [];
  const activitiesData = portfolioData?.activities || DEFAULT_PORTFOLIO_DATA.activities || [];

  const activeIndex = SECTIONS.findIndex(s => s.id === activeSection);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
  };

  if (isAdmin) {
    return (
      <AdminPanel 
        dbData={portfolioData || DEFAULT_PORTFOLIO_DATA} 
        onSave={async (updatedData) => {
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
            console.error("Save error", err);
          }
          return false;
        }} 
      />
    );
  }

  const formattedTime = time.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });

  const staggerItem = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="h-screen max-h-screen overflow-hidden bg-white text-black flex flex-col font-sans selection:bg-rose-100 selection:text-rose-900">
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      <ActivityModal 
        activity={selectedActivity} 
        onClose={() => setSelectedActivity(null)} 
      />

      {/* Fixed Top Header */}
      <header className="h-[90px] w-full bg-white text-black z-[110] px-8 md:px-12 flex justify-between items-center border-b border-black/5 shrink-0">
        <div onClick={() => scrollTo("about")} className="flex flex-col items-center cursor-pointer hover:opacity-75 transition-opacity select-none">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter leading-none mb-1">
            Lee-Geunil<span className="text-xs align-top ml-0.5">®</span>
          </h1>
          <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest text-center translate-y-[2px]">PLANING & CTEATOR</span>
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
          const isActive = index === activeIndex;
          const navWidth = "w-[40px]";

          return (
            <React.Fragment key={section.id}>
              <motion.button
                layout="position"
                transformTemplate={roundTranslate}
                onClick={() => scrollTo(section.id)}
                animate={{
                  backgroundColor: isMoved ? "#000000" : "#ffffff",
                  color: isActive 
                    ? "#ffffff" 
                    : (isMoved ? "rgba(255, 255, 255, 0.85)" : "rgba(0, 0, 0, 0.85)"),
                  borderColor: isMoved ? "rgba(255,225,255,0.15)" : "rgba(163, 163, 163, 0.4)",
                }}
                whileHover={{
                  backgroundColor: isActive 
                    ? "#000000" 
                    : (isMoved ? "#141414" : "#fafafa"),
                  color: isActive
                    ? "#ffffff"
                    : (isMoved ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)"),
                }}
                transition={{ 
                  layout: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                  backgroundColor: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                  color: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                  borderColor: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
                }}
                className={`h-full ${navWidth} flex flex-col items-center justify-end pb-16 border-r last:border-r-0 relative z-20 shrink-0 outline-none focus:ring-0 cursor-pointer ${index === activeIndex + 1 ? "border-l" : ""}`}
              >
                <span className="whitespace-nowrap text-[11px] md:text-[13px] font-cooper font-black uppercase tracking-tighter vertical-text py-4 pointer-events-none">
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
                                className="mb-16 flex flex-col items-center justify-center text-center w-full"
                              >
                                <div className="flex flex-col justify-center items-center text-center w-full">
                                  {profileImage && (
                                    <div className="mb-0 flex select-none shrink-0 relative justify-center">
                                      <div className="w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] md:w-[300px] md:h-[300px] flex items-center justify-center transition-all duration-300 hover:scale-[1.05]">
                                        <OptimizedImage
                                          src={profileImage}
                                          alt="Profile Illustration"
                                          className="w-full h-full object-contain"
                                          referrerPolicy="no-referrer"
                                        />
                                      </div>
                                    </div>
                                  )}
                                  <div className="relative inline-block pb-1 pt-1 max-w-full overflow-visible text-center">
                                    <h2 className="font-hand font-light text-[24px] xs:text-[28px] sm:text-[32px] md:text-[40px] lg:text-[40px] xl:text-[40px] text-neutral-800/95 leading-snug pl-2 pr-2 relative z-10 select-text text-center">
                                      {introductionText}
                                    </h2>
                                  </div>
                                </div>
                              </motion.div>

                              {/* Section 1: Education, Contact, Certificates & Technical Stack (Merged Box) */}
                              <motion.div 
                                variants={staggerItem}
                                className="mb-12"
                              >
                                <div className="bg-white/80 backdrop-blur-sm border border-neutral-200/50 rounded-[18px] p-6 md:p-8 lg:p-10 shadow-3xs/50">
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-neutral-200/40">
                                    {/* Column 1: Education & Contact */}
                                    <div className="space-y-8 md:pr-8">
                                      <div className="space-y-4">
                                        <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-neutral-400 pb-1 border-b border-neutral-100/80 block">Education</p>
                                        <div className="space-y-3">
                                          <div>
                                            <h4 className="text-[14px] sm:text-[15px] font-bold text-neutral-800 tracking-tight leading-snug">{educationData?.name || "부산대학교"}</h4>
                                            <p className="text-[12px] sm:text-[13px] font-medium text-neutral-500 mt-1 leading-relaxed">{educationData?.major || "항공우주공학 & 예술문화영상학"}</p>
                                          </div>
                                          <div className="text-[11px] font-mono text-neutral-400 font-semibold tracking-wider">
                                            {educationData?.period || "2013 - 2021"}
                                          </div>
                                        </div>
                                      </div>

                                      <div className="space-y-4">
                                        <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-neutral-400 pb-1 border-b border-neutral-100/80 block">Contact</p>
                                        <div className="space-y-3">
                                          <div className="flex justify-between items-center pb-2 border-b border-dashed border-neutral-100/70">
                                            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-semibold">전화번호</span>
                                            <a href={`tel:${contactData?.phone || "010-9335-9620"}`} className="hover:text-rose-500 hover:underline transition-all font-sans text-neutral-700 font-medium text-[13px] sm:text-[14px] tracking-tight">
                                              {contactData?.phone || "010-9335-9620"}
                                            </a>
                                          </div>
                                          <div className="flex justify-between items-center pb-1">
                                            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-semibold">이메일</span>
                                            <a href={`mailto:${contactData?.email || "lgi12@naver.com"}`} className="hover:text-rose-500 hover:underline transition-all font-sans text-neutral-700 font-medium text-[13px] sm:text-[14px] tracking-tight">
                                              {contactData?.email || "lgi12@naver.com"}
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Column 2: Certificates */}
                                    <div className="space-y-4 md:px-8">
                                      <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-neutral-400 pb-1 border-b border-neutral-100/80 block">Certificates</p>
                                      <div className="space-y-1">
                                        {(certificatesData || []).map((cert: any, idx: number) => {
                                          return (
                                            <div 
                                              key={idx} 
                                              className="flex justify-between items-center py-2.5 border-b border-neutral-100/60 last:border-b-0 hover:bg-neutral-50/40 px-1 transition-all duration-200"
                                            >
                                              <span className="text-[11px] sm:text-[12px] font-medium text-neutral-800 tracking-tight leading-none">{cert.title}</span>
                                              <span className="text-[9px] sm:text-[10px] font-semibold text-neutral-500 font-mono tracking-wide leading-none select-all bg-neutral-100/60 px-2 py-1 rounded-[4px]">
                                                {cert.subtitle || cert.score || ""}
                                              </span>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>

                                    {/* Column 3: Technical Stack */}
                                    <div className="space-y-4 md:pl-8">
                                      <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-neutral-400 pb-1 border-b border-neutral-100/80 block">Skills & Tech Stack</p>
                                      <div className="space-y-4">
                                        {(portfolioData?.techStack || DEFAULT_PORTFOLIO_DATA.techStack || []).map((group: any) => (
                                          <div key={group.label} className="space-y-1.5">
                                            <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400/85">
                                              {(group.label || "").replace("_", " ")}
                                            </p>
                                            <div className="flex flex-wrap gap-1.5">
                                              {group.items.map(item => (
                                                <span key={item} className="px-2.5 py-1 rounded-[6px] border border-neutral-200/40 bg-neutral-50/30 text-[12px] font-sans font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 hover:border-neutral-300 transition-all cursor-default select-none shadow-[0_1px_1.5px_rgba(0,0,0,0.01)]">
                                                  {item}
                                                </span>
                                              ))}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>

                              {/* Section 3: Work Experience */}
                              <div className="mt-12">
                                <p className="text-xs font-mono font-medium uppercase text-neutral-400 mb-6 tracking-wider text-center">Work Experience</p>
                                <div className="space-y-6">
                                  {(workExperienceData || []).map((exp: any, i: number) => (
                                    <motion.div 
                                      key={i} 
                                      variants={staggerItem}
                                      className="bg-white/80 backdrop-blur-sm border border-neutral-200/60 rounded-none p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row items-start gap-y-4 gap-x-12 md:gap-x-16"
                                    >
                                      {/* Left Column: Timeline */}
                                      <div className="w-full md:w-44 shrink-0">
                                        <span className="text-xs font-mono text-neutral-800 font-normal bg-neutral-100 px-2.5 py-1.5 rounded-none inline-block">
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
                                <div className={`grid grid-cols-1 ${featuredProjects.length === 1 ? "max-w-4xl mx-auto" : "lg:grid-cols-2"} gap-x-8 gap-y-[90px]`}>
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
                        <div className="max-w-[1350px] w-full mx-auto">
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
                              <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 lg:gap-24">
                                <motion.div variants={staggerItem} className="max-h-[580px] overflow-y-auto pr-4 custom-scrollbar flex-1 w-full">
                                  <div className="space-y-4">
                                    {(activitiesData || []).map((act: any, i: number) => (
                                      <div 
                                        key={i} 
                                        onClick={() => setSelectedActivity(act)}
                                        className="group bg-white hover:bg-neutral-50/60 border border-neutral-200 hover:border-neutral-950 rounded-[15px] p-5.5 sm:p-6 transition-all duration-300 shadow-3xs hover:shadow-2xs cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden"
                                      >
                                        <div className="space-y-2.5 flex-1 min-w-0">
                                          {/* Organization Tag & Period */}
                                          <div className="flex items-center gap-2.5 pb-1.5 border-b border-neutral-100/40 text-xs sm:text-[13px] font-mono text-neutral-500 font-medium select-none">
                                            <span className="text-neutral-800 font-bold uppercase shrink-0">
                                              {act.org}
                                            </span>
                                            <span className="opacity-30 shrink-0">|</span>
                                            <span className="shrink-0">
                                              {act.period}
                                            </span>
                                          </div>
                                          
                                          {/* Title */}
                                          <h3 className="text-[17px] sm:text-[18px] font-black text-neutral-800 tracking-tight leading-snug group-hover:text-neutral-950 transition-colors duration-200 font-sans">
                                            {act.title}
                                          </h3>
                                          
                                          {/* Brief bullet points - preview 1st point */}
                                          {act.desc && act.desc.length > 0 && (
                                            <p className="text-[14px] text-neutral-500 font-sans line-clamp-1 leading-relaxed pt-1 select-none truncate">
                                              {act.desc[0]}
                                            </p>
                                          )}
                                        </div>

                                        {/* Click Link decorator */}
                                        <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-neutral-800 shrink-0 self-end sm:self-center pt-3 sm:pt-0 border-t border-neutral-100/60 sm:border-t-0 w-full sm:w-auto justify-end">
                                          <span>자세히 보기</span>
                                          <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                          </svg>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </motion.div>
                                <motion.div variants={staggerItem} className="flex justify-center lg:justify-end">
                                  {/* Vertical Business Card */}
                                  <div className="w-full max-w-[320px] aspect-[10/16] bg-white text-black p-10 flex flex-col justify-between border border-black/15 relative overflow-hidden group/card shadow-2xs">
                                    {/* Card Texture/Pattern */}
                                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                                      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '12px 12px' }} />
                                    </div>

                                    <div className="relative z-10">
                                      <div className="mb-14">
                                        <h3 className="text-3xl font-black tracking-tighter leading-none mb-2.5 uppercase">
                                          {(contactData?.name || "LEE GEUNIL").split(" ")[0]}<br />
                                          {(contactData?.name || "LEE GEUNIL").split(" ")[1] || ""}
                                        </h3>
                                        <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-500 font-bold">PLANING & CTEATOR</p>
                                      </div>
                                      
                                      <div className="space-y-6">
                                        <div>
                                          <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold mb-1.5">Contact</p>
                                          <p className="text-[13px] sm:text-[14px] font-bold text-neutral-800 tracking-tight">{contactData?.email || "lgi12@naver.com"}</p>
                                          <p className="text-[13px] sm:text-[14px] font-bold text-neutral-800 tracking-tight">{contactData?.phone || "010-9335-9620"}</p>
                                        </div>
                                        <div>
                                          <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold mb-1.5">Location</p>
                                          <p className="text-[13px] sm:text-[14px] font-bold text-neutral-800 tracking-tight">{contactData?.location || "Seoul, South Korea"}</p>
                                        </div>
                                        <div>
                                          <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold mb-1.5">Instagram</p>
                                          <a href={`https://www.instagram.com/${(contactData?.instagram || "darkreen___n").replace("@", "")}/`} target="_blank" rel="noopener noreferrer" className="text-[13px] sm:text-[14px] font-bold text-neutral-800 tracking-tight hover:text-neutral-500 transition-colors block">
                                            {contactData?.instagram || "@darkreen___n"}
                                          </a>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="relative z-10 flex justify-between items-end">
                                      <div className="text-[9px] font-mono text-neutral-400 font-bold leading-relaxed uppercase tracking-normal">
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
  const [activeTab, setActiveTab] = useState("about");
  const [projectSubTab, setProjectSubTab] = useState<"featured" | "personal">("featured");
  const [formData, setFormData] = useState<any>(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; url: string }[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [savingSections, setSavingSections] = useState<Record<string, "idle" | "saving" | "success" | "error">>({});
  const [profileUploadStatus, setProfileUploadStatus] = useState("");
  const [projectUploadStatus, setProjectUploadStatus] = useState<Record<string, string>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (dbData) {
      const parsed = JSON.parse(JSON.stringify(dbData));
      
      // Normalize or prepopulate techStack
      if (!parsed.techStack) {
        parsed.techStack = [];
      }
      
      const ensureGroup = (labelToEnsure: string, possibleAlts: string[]) => {
        let index = parsed.techStack.findIndex((g: any) => {
          const l = (g.label || "").toUpperCase();
          return l.includes(labelToEnsure.toUpperCase()) || possibleAlts.some(alt => l.includes(alt.toUpperCase()));
        });
        if (index !== -1) {
          parsed.techStack[index].label = labelToEnsure;
        } else {
          parsed.techStack.push({ label: labelToEnsure, items: [] });
        }
      };
      
      ensureGroup("DESIGN", ["DESIGN TOOL"]);
      ensureGroup("OFFICE", []);
      ensureGroup("TEAM WORK", ["COLLABORATION", "COLLAB"]);
      
      setFormData(parsed);
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

  const handleSaveSection = async (sectionId: string) => {
    setSavingSections(prev => ({ ...prev, [sectionId]: "saving" }));
    const success = await onSave(formData);
    if (success) {
      setSavingSections(prev => ({ ...prev, [sectionId]: "success" }));
      setTimeout(() => {
        setSavingSections(prev => ({ ...prev, [sectionId]: "idle" }));
      }, 2500);
    } else {
      setSavingSections(prev => ({ ...prev, [sectionId]: "error" }));
      setTimeout(() => {
        setSavingSections(prev => ({ ...prev, [sectionId]: "idle" }));
      }, 4000);
    }
  };

  const renderSaveButton = (sectionId: string) => {
    const status = savingSections[sectionId] || "idle";
    return (
      <button
        type="button"
        onClick={() => handleSaveSection(sectionId)}
        disabled={status === "saving"}
        className={`px-3.5 py-1.5 rounded-sm text-[11px] font-bold tracking-tight transition-all flex items-center gap-1.5 border shrink-0 cursor-pointer active:scale-95 shadow-xs ${
          status === "saving" ? "bg-neutral-100 border-neutral-200 text-neutral-400 cursor-not-allowed" :
          status === "success" ? "bg-emerald-600 border-emerald-600 text-white font-semibold hover:bg-emerald-700 shadow-sm" :
          status === "error" ? "bg-rose-600 border-rose-600 text-white font-semibold hover:bg-rose-700 shadow-sm" :
          "bg-neutral-900 border-neutral-900 text-white hover:bg-neutral-800 hover:border-neutral-800 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
        }`}
      >
        <Save size={11} className={status === "saving" ? "animate-pulse" : ""} />
        {status === "saving" ? "저장 중" :
         status === "success" ? "저장 완료" :
         status === "error" ? "실패" :
         "항목 저장"}
      </button>
    );
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

  const handleProjectImageUpload = async (file: File, section: "featuredProjects" | "personalProjects", idx: number) => {
    const key = `${section}-${idx}`;
    try {
      setProjectUploadStatus(prev => ({ ...prev, [key]: "업로드 중..." }));
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
            handleArrayChange(section, idx, "image", data.url);
            setProjectUploadStatus(prev => ({ ...prev, [key]: "업로드 완료" }));
            setTimeout(() => {
              setProjectUploadStatus(prev => {
                const next = { ...prev };
                delete next[key];
                return next;
              });
            }, 3000);
          } else {
            const errData = await res.json().catch(() => ({}));
            setProjectUploadStatus(prev => ({ ...prev, [key]: `실패: ${errData.error || res.statusText || "서버 에러"}` }));
            setTimeout(() => {
              setProjectUploadStatus(prev => {
                const next = { ...prev };
                delete next[key];
                return next;
              });
            }, 5000);
          }
        } catch (err: any) {
          console.error(err);
          setProjectUploadStatus(prev => ({ ...prev, [key]: `통신 오류: ${err.message || "오류"}` }));
          setTimeout(() => {
            setProjectUploadStatus(prev => {
              const next = { ...prev };
              delete next[key];
              return next;
            });
          }, 5000);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      setProjectUploadStatus(prev => ({ ...prev, [key]: "파일 파싱 오류" }));
      setTimeout(() => {
        setProjectUploadStatus(prev => {
          const next = { ...prev };
          delete next[key];
          return next;
        });
      }, 3000);
    }
  };

  const handleProjectMultipleImagesUpload = async (files: FileList, section: "featuredProjects" | "personalProjects", idx: number) => {
    const key = `${section}-${idx}-multi`;
    setProjectUploadStatus(prev => ({ ...prev, [key]: `0/${files.length} 추가 중...` }));
    
    const uploadedUrls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        setProjectUploadStatus(prev => ({ ...prev, [key]: `${i + 1}/${files.length} 추가 중...` }));
        const base64Content = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

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
          uploadedUrls.push(data.url);
        }
      } catch (err) {
        console.error("Error uploading file: ", file.name, err);
      }
    }

    if (uploadedUrls.length > 0) {
      setFormData((prev: any) => {
        const sectionData = [...(prev[section] || [])];
        const existingProject = sectionData[idx] || {};
        const currentImages = existingProject.representativeImages || (existingProject.image ? [existingProject.image] : []);
        const newImages = [...currentImages, ...uploadedUrls];
        
        sectionData[idx] = {
          ...existingProject,
          representativeImages: newImages,
          image: newImages[0] || ""
        };
        
        return {
          ...prev,
          [section]: sectionData
        };
      });
      
      setProjectUploadStatus(prev => ({ ...prev, [key]: "추가 완료!" }));
      setTimeout(() => {
        setProjectUploadStatus(prev => {
          const next = { ...prev };
          delete next[key];
          return next;
        });
      }, 3000);
    } else {
      setProjectUploadStatus(prev => ({ ...prev, [key]: "추가 실패" }));
      setTimeout(() => {
        setProjectUploadStatus(prev => {
          const next = { ...prev };
          delete next[key];
          return next;
        });
      }, 3000);
    }
  };

  const copyUrl = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="min-h-screen w-full bg-white text-neutral-800 flex flex-col font-sans select-none antialiased selection:bg-neutral-200 selection:text-black">
      {/* Top Admin Navigation Header */}
      <header className="h-[76px] px-8 border-b border-neutral-200 bg-white flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-3.5 h-3.5 bg-neutral-900 rounded-sm animate-pulse" />
          <div className="flex flex-col">
            <h1 className="text-lg font-bold tracking-tighter leading-none mb-1 text-neutral-900">이근일 포트폴리오 관리자</h1>
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest translate-y-[2px]">PLANING & CTEATOR</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[11px] font-sans text-neutral-500 hidden lg:inline mr-2 bg-neutral-50 border border-neutral-200 px-3 py-1.5 rounded-sm">
            💡 각 항목별 <strong className="text-neutral-900">[항목 저장]</strong> 버튼을 누르면 실시간 반영됩니다.
          </span>
          <button 
            onClick={() => window.location.href = "/"}
            className="px-4 py-2 border border-neutral-300 hover:bg-neutral-50 rounded-sm text-xs text-neutral-700 transition-all font-medium font-sans bg-white"
          >
            ← 포트폴리오 홈
          </button>
        </div>
      </header>

      {/* Main Panel layout wrapper */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Nav */}
        <aside className="w-64 border-r border-neutral-200 bg-white p-6 flex flex-col gap-1 shrink-0">
          <p className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider mb-3 px-3">Portfolio Tabs</p>
          {[
            { id: "about", label: "ABOUT ME", detail: "자기소개, 명함연락처 및 핵심역량/스택" },
            { id: "project", label: "PROJECT", detail: "운영 및 기획 프로젝트" },
            { id: "activities", label: "KEY ACTIVITIES", detail: "학력, 경력 이력 및 대외활동 아카이브" },
            { id: "media", label: "MEDIA UPLOADER", detail: "미디어 에셋 실시간 업로더" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-3 text-left rounded-sm transition-all flex flex-col gap-0.5 group outline-none focus:ring-0 ${
                activeTab === tab.id ? "bg-neutral-100 text-black border-l-2 border-black pl-4" : 
                "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 pl-3"
              }`}
            >
              <span className="text-[13px] font-bold">{tab.label}</span>
              <span className="text-[9px] font-mono text-neutral-400 group-hover:text-neutral-600 transition-opacity">{tab.detail}</span>
            </button>
          ))}
        </aside>

        {/* Workspace Form Frame */}
        <main className="flex-1 overflow-y-auto bg-white p-10">
          <div className="max-w-4xl w-full mx-auto space-y-8 pb-32">
            
            {/* TAB 1: ABOUT ME INFORMATION */}
            {activeTab === "about" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight mb-1 text-neutral-900">ABOUT ME 설정</h2>
                  <p className="text-xs text-neutral-500">포트폴리오의 핵심인 학력, 역량, 연락처 및 경력 사항을 일괄 조율하는 통합 관리 영역입니다.</p>
                </div>

                {/* INTRODUCTION PANEL */}
                <div className="p-4.5 border border-neutral-200 bg-neutral-50/50 rounded-sm shadow-xs animate-fadeIn space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-neutral-150">
                    <div className="flex items-center gap-2">
                      <FileText className="text-neutral-500 shrink-0" size={18} />
                      <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-800">INTRODUCTION (소개 설정)</h3>
                    </div>
                    {renderSaveButton("introduction")}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5 items-start">
                    {/* Left Column: Profile Image Upload & Preview */}
                    <div className="md:col-span-1 space-y-3">
                      <label className="text-xs font-mono uppercase text-neutral-500 block pb-1 border-b border-neutral-150">프로필 이미지 (Profile Image)</label>
                      <div className="flex flex-col items-center sm:items-start gap-4">
                        <div className="relative group w-28 h-28 bg-neutral-50 border border-neutral-205 rounded-sm overflow-hidden flex items-center justify-center shrink-0">
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
                                className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-xs text-red-400 font-bold"
                              >
                                제거하기
                              </button>
                            </>
                          ) : (
                            <div className="text-center p-3 text-neutral-400">
                              <ImageIcon size={24} className="mx-auto mb-1 opacity-60" />
                              <span className="text-[10px] font-mono">NO IMAGE</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="w-full">
                          <label className="cursor-pointer w-full justify-center px-4 py-2 bg-neutral-50 hover:bg-neutral-100 text-neutral-800 rounded-sm text-xs font-medium tracking-tight transition-all inline-flex items-center gap-2 border border-neutral-205">
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
                            <p className="text-[10px] font-mono text-neutral-600 animate-pulse mt-2 text-center sm:text-left">
                              {profileUploadStatus}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Introduction Message TextArea */}
                    <div className="md:col-span-2 space-y-3">
                      <label className="text-xs font-mono uppercase text-neutral-500 block pb-1 border-b border-neutral-150">한줄 소개 문구 (About 헤드라인)</label>
                      <textarea 
                        value={formData.introduction || ""} 
                        onChange={e => handleSimpleFieldChange("introduction", e.target.value)}
                        rows={5}
                        placeholder="기획자 소개 문구를 적어주세요."
                        className="w-full bg-white border border-neutral-205 rounded px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:border-neutral-400 font-sans leading-relaxed"
                      />
                      <p className="text-[11px] text-neutral-500 leading-relaxed font-sans">
                        자기소개 영역에 게재할 직무 타이틀 및 고유 강점을 표현하는 핵심 한줄 소개 문구를 입력합니다.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 1. EDUCATION */}
                <div className="p-4.5 border border-neutral-200 bg-neutral-50/55 rounded-sm space-y-3 shadow-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-neutral-150">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="text-neutral-500 shrink-0" size={18} />
                      <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-800">1. EDUCATION (학력)</h3>
                    </div>
                    {renderSaveButton("education")}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">출신 학교</span>
                      <input
                        type="text"
                        value={formData.education?.name || formData.education?.school || ""}
                        onChange={e => {
                          handleFieldChange("education", "name", e.target.value);
                          handleFieldChange("education", "school", e.target.value); // Sync with fallbacks
                        }}
                        className="w-full bg-white border border-neutral-205 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-400 font-medium"
                        placeholder="예: 부산대학교"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">전공 및 편입 여부</span>
                      <input
                        type="text"
                        value={formData.education?.major || ""}
                        onChange={e => handleFieldChange("education", "major", e.target.value)}
                        className="w-full bg-white border border-neutral-205 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-400"
                        placeholder="예: 항공우주공학 & 예술문화영상학"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">재학 기간</span>
                      <input
                        type="text"
                        value={formData.education?.period || ""}
                        onChange={e => handleFieldChange("education", "period", e.target.value)}
                        className="w-full bg-white border border-neutral-205 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-400 font-mono"
                        placeholder="예: 2013 - 2021"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. CONTACT */}
                <div className="p-4.5 border border-neutral-200 bg-neutral-50/55 rounded-sm space-y-4 shadow-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-neutral-150">
                    <div className="flex items-center gap-2">
                      <Mail className="text-neutral-500 shrink-0" size={18} />
                      <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-800">2. CONTACT (연락처 정보)</h3>
                    </div>
                    {renderSaveButton("contact")}
                  </div>

                  {/* Contact details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-neutral-500">한글/영문 이름</label>
                      <input 
                        type="text" 
                        value={formData.contact?.name || ""} 
                        onChange={e => handleFieldChange("contact", "name", e.target.value)}
                        className="w-full bg-white border border-neutral-205 rounded px-4 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-400 font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-neutral-500">이메일 주소</label>
                      <input 
                        type="text" 
                        value={formData.contact?.email || ""} 
                        onChange={e => handleFieldChange("contact", "email", e.target.value)}
                        className="w-full bg-white border border-neutral-205 rounded px-4 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-400 font-mono"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-neutral-500">연락처</label>
                      <input 
                        type="text" 
                        value={formData.contact?.phone || ""} 
                        onChange={e => handleFieldChange("contact", "phone", e.target.value)}
                        className="w-full bg-white border border-neutral-205 rounded px-4 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-400 font-mono"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-neutral-500">활동 기지 (위치)</label>
                      <input 
                        type="text" 
                        value={formData.contact?.location || ""} 
                        onChange={e => handleFieldChange("contact", "location", e.target.value)}
                        className="w-full bg-white border border-neutral-205 rounded px-4 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-400"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-mono uppercase text-neutral-500">인스타그램 핸들 (@)</label>
                      <input 
                        type="text" 
                        value={formData.contact?.instagram || ""} 
                        onChange={e => handleFieldChange("contact", "instagram", e.target.value)}
                        className="w-full bg-white border border-neutral-205 rounded px-4 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-400 font-mono"
                        placeholder="예: darkreen___n"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. CERTIFICATES */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-neutral-200">
                    <div className="flex items-center gap-2">
                       <Award className="text-neutral-500 shrink-0" size={18} />
                      <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-850">3. CERTIFICATES (자격증)</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      {renderSaveButton("certificates")}
                      <button
                        onClick={() => handleArrayAdd("certificates", { title: "새 자격증", subtitle: "점수/등급 정보" })}
                        className="px-3 py-1 bg-neutral-100 text-neutral-800 border border-neutral-300 text-xs rounded-sm hover:bg-neutral-200 font-semibold transition-all"
                      >
                        + 자격증 추가
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {(formData.certificates || []).map((cert: any, idx: number) => (
                      <div key={idx} className="p-3.5 border border-neutral-200 bg-neutral-50/30 rounded-sm flex flex-col md:flex-row gap-3 md:items-end shadow-3xs">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <input
                              type="text"
                              value={cert.title || ""}
                              onChange={e => handleArrayChange("certificates", idx, "title", e.target.value)}
                              className="w-full bg-white border border-neutral-205 rounded px-3 py-1.5 text-xs font-bold text-neutral-900 focus:outline-none focus:border-neutral-400"
                              placeholder="예: 컴퓨터활용능력 1급"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              value={cert.subtitle || ""}
                              onChange={e => handleArrayChange("certificates", idx, "subtitle", e.target.value)}
                              className="w-full bg-white border border-neutral-205 rounded px-3 py-1.5 text-xs text-neutral-700 focus:outline-none focus:border-neutral-400"
                              placeholder="예: 최우수 등급 (점수 등)"
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => handleArrayDelete("certificates", idx)}
                          className="px-3 py-2 border border-neutral-200 bg-white hover:bg-red-50 hover:border-red-200 text-neutral-400 hover:text-red-500 rounded-sm transition-all flex items-center justify-center gap-1 text-xs shrink-0 font-medium"
                          title="자격증 제거"
                        >
                          <Trash2 size={13} />
                          <span>제거</span>
                        </button>
                      </div>
                    ))}
                    {(formData.certificates || []).length === 0 && (
                      <div className="text-center p-6 border border-dashed border-neutral-300 rounded text-xs text-neutral-500 font-mono">
                        등록된 자격증 정보가 없습니다. 버튼을 늘러 첫 자격증을 등재해 보셔요!
                      </div>
                    )}
                  </div>
                </div>

                {/* 4. SKILLS & TOOLS */}
                <div className="p-4.5 border border-neutral-200 bg-neutral-50/55 rounded-sm space-y-4 shadow-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-neutral-150">
                    <div className="flex items-center gap-2">
                      <Wrench className="text-neutral-500 shrink-0" size={18} />
                      <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-850">4. SKILLS & TOOLS (기술 및 협업 도구)</h3>
                    </div>
                    {renderSaveButton("skills")}
                  </div>

                  <div className="space-y-4">
                    {/* DESIGN */}
                    {(() => {
                      const groupIdx = formData.techStack?.findIndex((g: any) => (g.label || "").toUpperCase() === "DESIGN") ?? -1;
                      if (groupIdx === -1) return null;
                      const group = formData.techStack[groupIdx];
                      return (
                        <div className="space-y-1.5 pb-3 border-b border-neutral-150">
                          <div className="flex justify-between items-center">
                            <h4 className="text-xs font-bold font-mono tracking-wide text-neutral-700 uppercase flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full" />
                              DESIGN (디자인 제작 및 레이아웃 툴)
                            </h4>
                            <button
                              onClick={() => {
                                const text = prompt("추가할 DESIGN 툴 이름을 입력하세요:");
                                if (text) {
                                  const updated = [...(group.items || []), text];
                                  handleArrayChange("techStack", groupIdx, "items", updated);
                                }
                              }}
                              className="text-xs text-neutral-600 hover:text-black hover:underline font-mono font-medium"
                            >
                              + 디자인 키워드 추가
                            </button>
                          </div>
                          
                          <div className="flex flex-wrap gap-1.5 p-3 bg-neutral-50 border border-neutral-200 rounded min-h-[40px]">
                            {(group.items || []).map((tag: string, tagIdx: number) => (
                              <span key={tagIdx} className="bg-neutral-100 text-neutral-800 border border-neutral-200 px-2.5 py-1 rounded text-xs font-mono flex items-center gap-1.5 shadow-sm">
                                {tag}
                                <button 
                                  onClick={() => {
                                    const updated = [...(group.items || [])];
                                    updated.splice(tagIdx, 1);
                                    handleArrayChange("techStack", groupIdx, "items", updated);
                                  }}
                                  className="text-neutral-400 hover:text-red-500 text-xs font-bold"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                            {(group.items || []).length === 0 && (
                              <span className="text-neutral-400 text-[11px] font-mono italic self-center">등록된 디자인 키워드가 없습니다.</span>
                            )}
                          </div>
                        </div>
                      );
                    })()}

                    {/* OFFICE */}
                    {(() => {
                      const groupIdx = formData.techStack?.findIndex((g: any) => (g.label || "").toUpperCase() === "OFFICE") ?? -1;
                      if (groupIdx === -1) return null;
                      const group = formData.techStack[groupIdx];
                      return (
                        <div className="space-y-1.5 pb-3 border-b border-neutral-150">
                          <div className="flex justify-between items-center">
                            <h4 className="text-xs font-bold font-mono tracking-wide text-neutral-700 uppercase flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full" />
                              OFFICE (행정 서류 및 슬라이드 제작 툴)
                            </h4>
                            <button
                              onClick={() => {
                                const text = prompt("추가할 OFFICE 툴 이름을 입력하세요:");
                                if (text) {
                                  const updated = [...(group.items || []), text];
                                  handleArrayChange("techStack", groupIdx, "items", updated);
                                }
                              }}
                              className="text-xs text-neutral-600 hover:text-black hover:underline font-mono font-medium"
                            >
                              + 오피스 키워드 추가
                            </button>
                          </div>
                          
                          <div className="flex flex-wrap gap-1.5 p-3 bg-neutral-50 border border-neutral-200 rounded min-h-[40px]">
                            {(group.items || []).map((tag: string, tagIdx: number) => (
                              <span key={tagIdx} className="bg-neutral-100 text-neutral-800 border border-neutral-200 px-2.5 py-1 rounded text-xs font-mono flex items-center gap-1.5 shadow-sm">
                                {tag}
                                <button 
                                  onClick={() => {
                                    const updated = [...(group.items || [])];
                                    updated.splice(tagIdx, 1);
                                    handleArrayChange("techStack", groupIdx, "items", updated);
                                  }}
                                  className="text-neutral-400 hover:text-red-500 text-xs font-bold"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                            {(group.items || []).length === 0 && (
                              <span className="text-neutral-400 text-[11px] font-mono italic self-center">등록된 오피스 키워드가 없습니다.</span>
                            )}
                          </div>
                        </div>
                      );
                    })()}

                    {/* TEAM WORK */}
                    {(() => {
                      const groupIdx = formData.techStack?.findIndex((g: any) => (g.label || "").toUpperCase() === "TEAM WORK") ?? -1;
                      if (groupIdx === -1) return null;
                      const group = formData.techStack[groupIdx];
                      return (
                        <div className="space-y-1.5 font-sans">
                          <div className="flex justify-between items-center">
                            <h4 className="text-xs font-bold font-mono tracking-wide text-neutral-700 uppercase flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full" />
                              TEAM WORK (협업 플랫폼 및 원주율 조율 전산 툴)
                            </h4>
                            <button
                              onClick={() => {
                                const text = prompt("추가할 TEAM WORK 툴 이름을 입력하세요:");
                                if (text) {
                                  const updated = [...(group.items || []), text];
                                  handleArrayChange("techStack", groupIdx, "items", updated);
                                }
                              }}
                              className="text-xs text-neutral-600 hover:text-black hover:underline font-mono font-medium"
                            >
                              + 팀워크 키워드 추가
                            </button>
                          </div>
                          
                          <div className="flex flex-wrap gap-1.5 p-3 bg-neutral-50 border border-neutral-200 rounded min-h-[40px]">
                            {(group.items || []).map((tag: string, tagIdx: number) => (
                              <span key={tagIdx} className="bg-neutral-100 text-neutral-800 border border-neutral-200 px-2.5 py-1 rounded text-xs font-mono flex items-center gap-1.5 shadow-sm">
                                {tag}
                                <button 
                                  onClick={() => {
                                    const updated = [...(group.items || [])];
                                    updated.splice(tagIdx, 1);
                                    handleArrayChange("techStack", groupIdx, "items", updated);
                                  }}
                                  className="text-neutral-400 hover:text-red-500 text-xs font-bold"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                            {(group.items || []).length === 0 && (
                              <span className="text-neutral-400 text-[11px] font-mono italic self-center">등록된 협업 키워드가 없습니다.</span>
                            )}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* 5. WORK EXPERIENCE */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-neutral-200">
                    <div className="flex items-center gap-2">
                      <Trophy className="text-neutral-500 shrink-0" size={18} />
                      <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-850">5. WORK EXPERIENCE (실무 경험)</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      {renderSaveButton("work_experience")}
                      <button
                        onClick={() => handleArrayAdd("workExperience", { company: "회사명", tags: "역할 및 소속팀 정보", period: "YYYY.MM ~ YYYY.MM", desc: [] })}
                        className="px-3 py-1.5 bg-neutral-100 text-neutral-800 border border-neutral-300 text-xs rounded-sm hover:bg-neutral-200 font-semibold"
                      >
                        + 실무 경력 추가
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {(formData.workExperience || []).map((exp: any, idx: number) => (
                      <div key={idx} className="p-4 border border-neutral-200 bg-neutral-50/30 rounded-sm space-y-3 animate-fadeIn shadow-3xs">
                        <div className="flex justify-between items-center border-b border-neutral-200 pb-2">
                          <code className="text-[11px] font-bold text-neutral-400 font-mono">#{idx + 1}</code>
                          <button
                            onClick={() => handleArrayDelete("workExperience", idx)}
                            className="text-neutral-400 hover:text-red-500 transition-all font-semibold text-xs flex items-center gap-1 hover:underline"
                          >
                            <Trash2 size={13} /> 제거
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono text-neutral-500 uppercase font-semibold">회사명 (Company)</span>
                            <input
                              type="text"
                              value={exp.company || ""}
                              onChange={e => handleArrayChange("workExperience", idx, "company", e.target.value)}
                              className="w-full bg-white border border-neutral-205 rounded px-3 py-2 text-xs font-bold text-neutral-900 focus:outline-none focus:border-neutral-400"
                              placeholder="예: 예담 기획실"
                            />
                          </div>
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono text-neutral-500 uppercase font-semibold">소속팀 / 직종 태그 (Tags)</span>
                            <input
                              type="text"
                              value={exp.tags || ""}
                              onChange={e => handleArrayChange("workExperience", idx, "tags", e.target.value)}
                              className="w-full bg-white border border-neutral-205 rounded px-3 py-2 text-xs text-neutral-850 focus:outline-none focus:border-neutral-400"
                              placeholder="예: 크리에이티브 디렉터 / 기획실장"
                            />
                          </div>
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono text-neutral-500 uppercase font-semibold">근무 기간 (Period)</span>
                            <input
                              type="text"
                              value={exp.period || ""}
                              onChange={e => handleArrayChange("workExperience", idx, "period", e.target.value)}
                              className="w-full bg-white border border-neutral-205 rounded px-3 py-2 text-xs font-mono text-neutral-900 focus:outline-none focus:border-neutral-400"
                              placeholder="예: 2018.04 ~ 2020.12"
                            />
                          </div>
                        </div>

                        {/* Bullets subform */}
                        <div className="space-y-2 border-t border-neutral-200 pt-3">
                          <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500 mb-1">
                            <span>상세 업무 및 내용 (Bullets)</span>
                            <button
                              onClick={() => handleArrayBulletAdd("workExperience", idx, "desc")}
                              className="text-neutral-700 hover:text-black hover:underline text-[10px]"
                            >
                              + 상세 항목 추가
                            </button>
                          </div>
                          <div className="space-y-2">
                            {(exp.desc || []).map((bullet: string, bulletIdx: number) => (
                              <div key={bulletIdx} className="flex items-center gap-2">
                                <span className="text-neutral-400 text-xs shrink-0 font-mono">•</span>
                                <input
                                  type="text"
                                  value={bullet}
                                  onChange={e => handleArrayBulletChange("workExperience", idx, "desc", bulletIdx, e.target.value)}
                                  className="w-full bg-white border border-neutral-205 rounded px-3 py-1.5 text-xs text-neutral-800 focus:outline-none focus:border-neutral-400"
                                />
                                <button
                                  onClick={() => handleArrayBulletDelete("workExperience", idx, "desc", bulletIdx)}
                                  className="text-neutral-400 hover:text-red-500 font-bold"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                    {(formData.workExperience || []).length === 0 && (
                      <div className="text-center p-6 border border-dashed border-neutral-200 rounded text-xs text-neutral-400 font-mono">
                        등록된 근무 경력이 없습니다. 실무 이력을 추가해 주셔요.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "activities" && (
              <div className="space-y-8 animate-fadeIn">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight mb-1 text-neutral-900">KEY ACTIVITIES 설정</h2>
                  <p className="text-xs text-neutral-500">대외 활동, 대외 협력단 활동 및 아카이브 목록을 조율해 보세요.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-neutral-200">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="text-neutral-500 shrink-0" size={18} />
                      <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-850">대외 활동 아카이브 (Activities)</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      {renderSaveButton("key_activities")}
                      <button
                        onClick={() => handleArrayAdd("activities", { title: "새 활동 제목", org: "주최 단체명", period: "YYYY.MM ~ YYYY.MM", desc: [] })}
                        className="px-3 py-1.5 bg-neutral-100 text-neutral-800 border border-neutral-300 text-xs rounded-sm hover:bg-neutral-200 font-semibold"
                      >
                        + 활동 추가
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {(formData.activities || []).map((act: any, idx: number) => (
                      <div key={idx} className="p-4 border border-neutral-200 bg-neutral-50/30 rounded-sm space-y-3 animate-fadeIn shadow-3xs">
                        <div className="flex justify-between items-center border-b border-neutral-200 pb-2">
                          <code className="text-[11px] font-bold text-neutral-400 font-mono">#{idx + 1}</code>
                          <button
                            onClick={() => handleArrayDelete("activities", idx)}
                            className="text-neutral-400 hover:text-red-500 transition-all font-semibold text-xs flex items-center gap-1 hover:underline"
                          >
                            <Trash2 size={13} /> 제거
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono text-neutral-500 uppercase">대외 활동명</span>
                            <input
                              type="text"
                              value={act.title || ""}
                              onChange={e => handleArrayChange("activities", idx, "title", e.target.value)}
                              className="w-full bg-white border border-neutral-205 rounded px-3 py-2 text-xs font-bold text-neutral-900 focus:outline-none focus:border-neutral-400"
                              placeholder="예: 대학 예술 가요제"
                            />
                          </div>
                          <div className="space-y-1 flex flex-col">
                            <span className="text-[9px] font-mono text-neutral-500 uppercase">소속/주최 단체</span>
                            <input
                              type="text"
                              value={act.org || ""}
                              onChange={e => handleArrayChange("activities", idx, "org", e.target.value)}
                              className="w-full bg-white border border-neutral-205 rounded px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:border-neutral-400"
                              placeholder="예: 예술조직위원회"
                            />
                          </div>
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono text-neutral-500 uppercase">활동 기간</span>
                            <input
                              type="text"
                              value={act.period || ""}
                              onChange={e => handleArrayChange("activities", idx, "period", e.target.value)}
                              className="w-full bg-white border border-neutral-205 rounded px-3 py-2 text-xs font-mono text-neutral-900 focus:outline-none focus:border-neutral-400"
                              placeholder="예: 2021.06 ~ 2021.12"
                            />
                          </div>
                        </div>

                        {/* Bullets subform */}
                        <div className="space-y-2 border-t border-neutral-150 pt-4">
                          <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500 mb-1">
                            <span>상세 성과 및 경험 (Bullets)</span>
                            <button
                              onClick={() => handleArrayBulletAdd("activities", idx, "desc")}
                              className="text-neutral-700 hover:text-black hover:underline text-[10px]"
                            >
                              + 상세 항목 추가
                            </button>
                          </div>
                          <div className="space-y-2">
                            {(act.desc || []).map((bullet: string, bulletIdx: number) => (
                              <div key={bulletIdx} className="flex items-center gap-2">
                                <span className="text-neutral-400 text-xs shrink-0 font-mono">•</span>
                                <input
                                  type="text"
                                  value={bullet}
                                  onChange={e => handleArrayBulletChange("activities", idx, "desc", bulletIdx, e.target.value)}
                                  className="w-full bg-white border border-neutral-205 rounded px-3 py-1.5 text-xs text-neutral-800 focus:outline-none focus:border-neutral-400"
                                />
                                <button
                                  onClick={() => handleArrayBulletDelete("activities", idx, "desc", bulletIdx)}
                                  className="text-neutral-400 hover:text-red-500"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                    {(formData.activities || []).length === 0 && (
                      <div className="text-center p-6 border border-dashed border-neutral-200 rounded text-xs text-neutral-400 font-mono">
                        등록된 활동 정보가 없습니다. 버튼을 늘러 등재해 주셔요.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: PROJECT (FEATURED PROJECTS & PERSONAL CREATIONS) */}
            {activeTab === "project" && (
              <div className="space-y-8">
                {/* Modern high-contrast Sub Tab switcher */}
                <div className="flex border-b border-neutral-200 pb-4 justify-between items-center flex-wrap gap-4">
                  <div className="flex items-center gap-1 bg-neutral-100 border border-neutral-200 p-1 rounded-sm">
                    <button
                      onClick={() => setProjectSubTab("featured")}
                      className={`px-4 py-2 text-xs font-bold font-mono uppercase tracking-wider transition-all rounded-[1px] ${
                        projectSubTab === "featured"
                          ? "bg-white text-neutral-900 shadow-3xs"
                          : "text-neutral-500 hover:text-neutral-800"
                      }`}
                    >
                      Ⅰ. 운영 (Operations)
                    </button>
                    <button
                      onClick={() => setProjectSubTab("personal")}
                      className={`px-4 py-2 text-xs font-bold font-mono uppercase tracking-wider transition-all rounded-[1px] ${
                        projectSubTab === "personal"
                          ? "bg-white text-neutral-900 shadow-3xs"
                          : "text-neutral-500 hover:text-neutral-800"
                      }`}
                    >
                      Ⅱ. 기획 (Planning)
                    </button>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-[0.2em] hidden md:inline">
                    PROJECT DATA MANAGER
                  </span>
                </div>

                {projectSubTab === "featured" && (
                  <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight mb-1 text-neutral-900">프로젝트 I (운영 목록)</h2>
                    <p className="text-xs text-neutral-500">페스티벌, 콘서트, 브랜드 쇼케이스 등 메이드온 현장 총괄 및 PM 이력 프로젝트입니다.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {renderSaveButton("featured_projects")}
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
                      className="px-3 py-1.5 bg-neutral-100 text-neutral-800 border border-neutral-300 text-xs rounded-sm hover:bg-neutral-200 font-semibold transition-all"
                    >
                      + 새 실무공연 추가
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {(formData.featuredProjects || []).map((project: any, idx: number) => (
                    <div key={idx} className="p-4 border border-neutral-200 bg-neutral-50/30 rounded-sm space-y-4 shadow-3xs animate-fadeIn">
                      <div className="flex justify-between items-center border-b border-neutral-200 pb-3">
                        <div className="flex items-center gap-4 text-xs font-mono">
                          <span className="bg-neutral-200 text-neutral-800 px-2 py-0.5 rounded uppercase font-bold text-[10px]">#{idx + 1}</span>
                          <span className="text-neutral-500 font-semibold text-[11px]">실무 기획 및 실행 프로젝트</span>
                        </div>
                        <button
                          onClick={() => handleArrayDelete("featuredProjects", idx)}
                          className="text-neutral-400 hover:text-red-500 transition-all font-mono text-xs flex items-center gap-1 hover:underline"
                        >
                          <Trash2 size={13} /> 제거
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-neutral-550 uppercase">공연/프로젝트 이름</span>
                          <input 
                            type="text"
                            value={project.title || ""}
                            onChange={e => handleArrayChange("featuredProjects", idx, "title", e.target.value)}
                            className="w-full bg-white border border-neutral-205 rounded px-3 py-2 text-xs font-bold text-neutral-900 focus:outline-none focus:border-neutral-400"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-neutral-550 uppercase">개최 연도</span>
                          <input 
                            type="text"
                            value={project.year || ""}
                            onChange={e => handleArrayChange("featuredProjects", idx, "year", e.target.value)}
                            className="w-full bg-white border border-neutral-205 rounded px-3 py-2 text-xs font-mono text-neutral-900 focus:outline-none focus:border-neutral-400"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-neutral-550 uppercase">카테고리 (분야) 슬라이드명</span>
                          <input 
                            type="text"
                            value={project.category || ""}
                            onChange={e => handleArrayChange("featuredProjects", idx, "category", e.target.value)}
                            className="w-full bg-white border border-neutral-205 rounded px-3 py-2 text-xs text-neutral-850 focus:outline-none focus:border-neutral-400"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-neutral-550 uppercase">참여도/기여도 (%)</span>
                          <input 
                            type="text"
                            value={project.contribution || ""}
                            onChange={e => handleArrayChange("featuredProjects", idx, "contribution", e.target.value)}
                            className="w-full bg-white border border-neutral-205 rounded px-3 py-2 text-xs font-mono text-neutral-900 focus:outline-none focus:border-neutral-400"
                          />
                        </div>
                        <div className="space-y-1.5 md:col-span-2">
                          <span className="text-[10px] font-mono text-neutral-550 uppercase font-semibold">대표 커버 이미지 (Cover Image)</span>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                            <div className="w-16 h-12 bg-neutral-100 border border-neutral-205 rounded-sm overflow-hidden flex items-center justify-center shrink-0">
                              {project.image ? (
                                <img src={project.image} alt="preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              ) : (
                                <ImageIcon size={18} className="text-neutral-400" />
                              )}
                            </div>
                            <div className="flex-1 w-full space-y-1">
                              <div className="flex items-center gap-2">
                                <label className="cursor-pointer px-3 py-1.5 bg-white hover:bg-neutral-50 text-neutral-800 rounded-sm border border-neutral-205 text-xs font-semibold inline-flex items-center gap-1.5 transition-all active:scale-95 shadow-3xs user-select-none">
                                  <Upload size={12} />
                                  <span>대표이미지 선택</span>
                                  <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="hidden" 
                                    onChange={(e) => {
                                      if (e.target.files && e.target.files[0]) {
                                        handleProjectImageUpload(e.target.files[0], "featuredProjects", idx);
                                      }
                                    }}
                                  />
                                </label>
                                {project.image && (
                                  <button
                                    type="button"
                                    onClick={() => handleArrayChange("featuredProjects", idx, "image", "")}
                                    className="px-3 py-1.5 text-rose-600 hover:bg-rose-50 rounded-sm text-xs font-semibold font-sans transition-all"
                                  >
                                    제거
                                  </button>
                                )}
                              </div>
                              {projectUploadStatus[`featuredProjects-${idx}`] ? (
                                <p className="text-[10px] font-mono text-neutral-600 animate-pulse bg-neutral-100/80 px-2 py-0.5 rounded inline-block">
                                  {projectUploadStatus[`featuredProjects-${idx}`]}
                                </p>
                              ) : (
                                <p className="text-[10px] text-neutral-450 font-sans leading-none">업로드 시 이미지 포트폴리오 대표 커버로 즉각 적용됩니다.</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 pt-4 border-t border-neutral-200">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-neutral-550">업무 요약 (About / Main List 카드용 설명)</span>
                          <input 
                            type="text"
                            value={project.description || ""}
                            onChange={e => handleArrayChange("featuredProjects", idx, "description", e.target.value)}
                            className="w-full bg-white border border-neutral-205 rounded px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:border-neutral-400"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-neutral-550">긴 상세 설명 (상세 모달 내부)</span>
                          <textarea 
                            value={project.fullDescription || ""}
                            onChange={e => handleArrayChange("featuredProjects", idx, "fullDescription", e.target.value)}
                            rows={3}
                            className="w-full bg-white border border-neutral-205 rounded px-3 py-2 text-xs font-sans text-neutral-850 leading-relaxed focus:outline-none focus:border-neutral-400"
                          />
                        </div>
                      </div>

                      {/* Process Sections (Pre-event, On-site, CS) */}
                      <div className="space-y-2 border-t border-neutral-200 pt-4">
                        <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500">
                          <span>기획 및 실행 프로세스단계 (Process Stages)</span>
                          <button
                            onClick={() => {
                              const updated = [...(project.process || []), { phase: "새 단계", items: [] }];
                              handleArrayChange("featuredProjects", idx, "process", updated);
                            }}
                            className="text-neutral-700 hover:text-black hover:underline font-semibold"
                          >
                            + 단계 단락 추가
                          </button>
                        </div>
                        
                        {(project.process || []).map((p: any, pIdx: number) => (
                          <div key={pIdx} className="p-3 border border-neutral-200 bg-white rounded gap-2 space-y-2 relative shadow-3xs">
                            <button
                              onClick={() => {
                                const updated = [...(project.process || [])];
                                updated.splice(pIdx, 1);
                                handleArrayChange("featuredProjects", idx, "process", updated);
                              }}
                              className="absolute right-3 top-3 text-[10px] text-neutral-400 hover:text-red-500 font-mono"
                            >
                              삭제
                            </button>
                            <div className="w-1/2">
                              <span className="text-[8px] font-mono text-neutral-500 pl-1 uppercase">단계명 (사전운영, 현장운영 등)</span>
                              <input 
                                type="text"
                                value={p.phase || ""}
                                onChange={e => {
                                  const updated = [...(project.process || [])];
                                  updated[pIdx] = { ...updated[pIdx], phase: e.target.value };
                                  handleArrayChange("featuredProjects", idx, "process", updated);
                                }}
                                className="w-full bg-white border border-neutral-205 rounded px-2 py-1 text-xs text-neutral-900 focus:outline-none focus:border-neutral-400"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <div className="flex justify-between items-center text-[8px] font-mono text-neutral-500">
                                <span>상세 내용 불렛</span>
                                <button
                                  onClick={() => {
                                    const updated = [...(project.process || [])];
                                    updated[pIdx].items = [...(updated[pIdx].items || []), ""];
                                    handleArrayChange("featuredProjects", idx, "process", updated);
                                  }}
                                  className="text-neutral-700 hover:text-black hover:underline"
                                >
                                  + 불렛 추가
                                </button>
                              </div>
                              {(p.items || []).map((bullet: string, bIdx: number) => (
                                <div key={bIdx} className="flex items-center gap-2">
                                  <span className="text-neutral-400 text-xs shrink-0 font-serif">-</span>
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
                                    className="w-full bg-white border border-neutral-205 rounded px-2 py-1 text-xs text-neutral-850 focus:outline-none focus:border-neutral-400"
                                  />
                                  <button
                                    onClick={() => {
                                      const updated = [...(project.process || [])];
                                      const bullets = [...(updated[pIdx].items || [])];
                                      bullets.splice(bIdx, 1);
                                      updated[pIdx].items = bullets;
                                      handleArrayChange("featuredProjects", idx, "process", updated);
                                    }}
                                    className="text-neutral-400 hover:text-red-500"
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
                      <div className="space-y-3 border-t border-neutral-200 pt-4">
                        <span className="text-[10px] font-mono text-neutral-550 block uppercase font-semibold">역할 및 총괄 내용 (Primary Role)</span>
                        <div className="space-y-2 p-3 bg-white rounded border border-neutral-200 shadow-3xs">
                          <div className="w-1/2">
                            <span className="text-[8px] font-mono text-neutral-500 font-semibold">역할 대표명 (예: 티켓 총괄 운영)</span>
                            <input 
                              type="text"
                              value={project.role?.title || ""}
                              onChange={e => {
                                const role = { ...(project.role || {}), title: e.target.value };
                                handleArrayChange("featuredProjects", idx, "role", role);
                              }}
                              className="w-full bg-white border border-neutral-205 rounded px-2 py-1 text-xs font-bold text-neutral-900 focus:outline-none focus:border-neutral-400"
                            />
                          </div>

                          <div className="space-y-1.5 pt-2">
                            <div className="flex justify-between items-center text-[8px] font-mono text-neutral-500 font-semibold">
                              <span>수행 역할 목록</span>
                              <button
                                onClick={() => {
                                  const roleItems = [...(project.role?.items || []), ""];
                                  const role = { ...(project.role || {}), items: roleItems };
                                  handleArrayChange("featuredProjects", idx, "role", role);
                                }}
                                className="text-neutral-700 hover:text-black hover:underline"
                              >
                                + 역할사항 추가
                              </button>
                            </div>
                            {(project.role?.items || []).map((roleBullet: string, rIdx: number) => (
                              <div key={rIdx} className="flex items-center gap-2">
                                <span className="text-neutral-400 text-xs font-bold">•</span>
                                <input 
                                  type="text"
                                  value={roleBullet}
                                  onChange={e => {
                                    const roleItems = [...(project.role?.items || [])];
                                    roleItems[rIdx] = e.target.value;
                                    const role = { ...(project.role || {}), items: roleItems };
                                    handleArrayChange("featuredProjects", idx, "role", role);
                                  }}
                                  className="w-full bg-white border border-neutral-205 rounded px-2 py-1 text-xs text-neutral-800 focus:outline-none focus:border-neutral-400 font-sans"
                                />
                                <button
                                  onClick={() => {
                                    const roleItems = [...(project.role?.items || [])];
                                    roleItems.splice(rIdx, 1);
                                    const role = { ...(project.role || {}), items: roleItems };
                                    handleArrayChange("featuredProjects", idx, "role", role);
                                  }}
                                  className="text-neutral-400 hover:text-red-500 font-bold transition-all text-sm shrink-0"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Performance Achievements (수행 성과) */}
                      <div className="space-y-2 border-t border-neutral-200 pt-4">
                        <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500">
                          <span>수행 성과 대항목 (Results & Achievements)</span>
                          <button
                            onClick={() => {
                              const updated = [...(project.results || []), ""];
                              handleArrayChange("featuredProjects", idx, "results", updated);
                            }}
                            className="text-neutral-700 hover:text-black hover:underline"
                          >
                            + 성과 항목 추가
                          </button>
                        </div>
                        <div className="space-y-2">
                          {(project.results || []).map((resBullet: string, rIdx: number) => (
                            <div key={rIdx} className="flex items-center gap-2">
                              <span className="text-neutral-400 font-mono text-xs">✓</span>
                              <input 
                                type="text"
                                value={resBullet}
                                onChange={e => {
                                  const updated = [...(project.results || [])];
                                  updated[rIdx] = e.target.value;
                                  handleArrayChange("featuredProjects", idx, "results", updated);
                                }}
                                className="w-full bg-white border border-neutral-205 rounded px-2 py-1.5 text-xs text-neutral-800 font-sans focus:outline-none focus:border-neutral-400"
                              />
                              <button
                                onClick={() => {
                                  const updated = [...(project.results || [])];
                                  updated.splice(rIdx, 1);
                                  handleArrayChange("featuredProjects", idx, "results", updated);
                                }}
                                className="text-neutral-400 hover:text-red-500 font-bold"
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

            {projectSubTab === "personal" && (
              <div className="space-y-8 animate-fadeIn">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight mb-1 text-neutral-900">프로젝트 II (기획 목록)</h2>
                    <p className="text-xs text-neutral-500">이그린(Lee Green) 인디음악 앨범 발매 크라우드 펀딩, 루프탑 및 콜라보 콘서트 관련 프로젝트입니다.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {renderSaveButton("personal_projects")}
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
                      className="px-3 py-1.5 bg-neutral-100 text-neutral-800 border border-neutral-300 text-xs rounded-sm hover:bg-neutral-200 font-semibold transition-all"
                    >
                      + 새 창작기획 추가
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {(formData.personalProjects || []).map((project: any, idx: number) => (
                    <div key={idx} className="p-4 border border-neutral-200 bg-neutral-50/30 rounded-sm space-y-4 shadow-3xs">
                      <div className="flex justify-between items-center border-b border-neutral-200/80 pb-3">
                        <div className="flex items-center gap-4 text-xs font-mono">
                          <span className="bg-neutral-100 text-neutral-800 border border-neutral-200 px-2 py-0.5 rounded uppercase font-bold text-[10px]">#{idx + 1}</span>
                          <span className="text-neutral-500 font-semibold text-[11px]">개인 창작 앨범 및 디자인 기획</span>
                        </div>
                        <button
                          onClick={() => handleArrayDelete("personalProjects", idx)}
                          className="text-neutral-400 hover:text-red-500 transition-all font-mono text-xs flex items-center gap-1 font-semibold hover:underline"
                        >
                          <Trash2 size={13} /> 제거
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-neutral-500 uppercase font-semibold">창작 프로젝트명/앨범명</span>
                          <input 
                            type="text"
                            value={project.title || ""}
                            onChange={e => handleArrayChange("personalProjects", idx, "title", e.target.value)}
                            className="w-full bg-white border border-neutral-205 rounded px-3 py-2 text-xs font-bold text-neutral-900 focus:outline-none focus:border-neutral-400 font-sans"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-neutral-500 uppercase font-semibold">발표 연도</span>
                          <input 
                            type="text"
                            value={project.year || ""}
                            onChange={e => handleArrayChange("personalProjects", idx, "year", e.target.value)}
                            className="w-full bg-white border border-neutral-205 rounded px-3 py-2 text-xs font-mono text-neutral-850 focus:outline-none focus:border-neutral-400"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-neutral-500 uppercase font-semibold">음악/디자인 카테고리 (Category)</span>
                          <input 
                            type="text"
                            value={project.category || ""}
                            onChange={e => handleArrayChange("personalProjects", idx, "category", e.target.value)}
                            className="w-full bg-white border border-neutral-205 rounded px-3 py-2 text-xs text-neutral-850 focus:outline-none focus:border-neutral-400 font-sans"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-neutral-500 uppercase font-semibold">개인 지분 기여도 (%)</span>
                          <input 
                            type="text"
                            value={project.contribution || ""}
                            onChange={e => handleArrayChange("personalProjects", idx, "contribution", e.target.value)}
                            className="w-full bg-white border border-neutral-205 rounded px-3 py-2 text-xs font-mono text-neutral-850 focus:outline-none focus:border-neutral-400"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-neutral-500 uppercase font-semibold">개최 및 판매장소 (Location)</span>
                          <input 
                            type="text"
                            value={project.location || ""}
                            onChange={e => handleArrayChange("personalProjects", idx, "location", e.target.value)}
                            className="w-full bg-white border border-neutral-205 rounded px-3 py-2 text-xs text-neutral-850 focus:outline-none focus:border-neutral-400 font-sans"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-neutral-500 uppercase font-semibold">아티스트 라인업 (Cast)</span>
                          <input 
                            type="text"
                            value={project.cast || ""}
                            onChange={e => handleArrayChange("personalProjects", idx, "cast", e.target.value)}
                            className="w-full bg-white border border-neutral-205 rounded px-3 py-2 text-xs text-neutral-850 focus:outline-none focus:border-neutral-400 font-sans"
                          />
                        </div>
                        <div className="space-y-1 md:col-span-2">
                          <span className="text-[10px] font-mono text-neutral-500 uppercase font-semibold">매체 크라우드펀딩/후원 (Support)</span>
                          <input 
                            type="text"
                            value={project.support || ""}
                            onChange={e => handleArrayChange("personalProjects", idx, "support", e.target.value)}
                            placeholder="예: 텀블벅 크라우드 펀딩 프로젝트"
                            className="w-full bg-white border border-neutral-205 rounded px-3 py-2 text-xs text-neutral-850 focus:outline-none focus:border-neutral-400 font-sans"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-1.5">
                            <span className="text-[10px] font-mono text-neutral-500 uppercase font-semibold">대표 커버 이미지 아카이브 (다중 이미지 지원)</span>
                            <label className="cursor-pointer px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 text-white rounded-md text-[11px] font-semibold inline-flex items-center gap-1.5 transition-all active:scale-95 shadow-3xs user-select-none">
                              <Upload size={11} />
                              <span>이미지 다중 추가</span>
                              <input 
                                type="file" 
                                accept="image/*" 
                                multiple
                                className="hidden" 
                                onChange={(e) => {
                                  if (e.target.files && e.target.files.length > 0) {
                                    handleProjectMultipleImagesUpload(e.target.files, "personalProjects", idx);
                                  }
                                }}
                              />
                            </label>
                          </div>

                          {projectUploadStatus[`personalProjects-${idx}-multi`] && (
                            <p className="text-[10px] font-mono text-rose-600 animate-pulse bg-rose-50 px-2 py-1 rounded border border-rose-100 inline-block font-sans">
                              {projectUploadStatus[`personalProjects-${idx}-multi`]}
                            </p>
                          )}

                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 pt-1">
                            {(project.representativeImages || (project.image ? [project.image] : [])).map((imgUrl: string, imgIdx: number) => {
                              const isCover = imgIdx === 0;
                              return (
                                <div key={imgIdx} className={`relative bg-neutral-50 p-1.5 rounded-lg border flex flex-col justify-between group/rep-img ${isCover ? 'border-neutral-900 shadow-sm bg-neutral-100/50' : 'border-neutral-200'}`}>
                                  <div className="aspect-[4/3] w-full rounded-sm overflow-hidden bg-neutral-100 relative">
                                    <img src={imgUrl} alt={`rep-${imgIdx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                    
                                    {isCover && (
                                      <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-neutral-900 text-[8px] font-bold text-white uppercase tracking-wider rounded-sm font-sans scale-90 origin-top-left">
                                        Main Cover
                                      </span>
                                    )}
                                  </div>
                                  
                                  <div className="flex items-center justify-between gap-1 mt-1.5 px-0.5">
                                    <div className="flex gap-1">
                                      {imgIdx > 0 && (
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const current = [...(project.representativeImages || (project.image ? [project.image] : []))];
                                            const item = current[imgIdx];
                                            current.splice(imgIdx, 1);
                                            current.unshift(item);
                                            
                                            const sectionData = [...(formData.personalProjects || [])];
                                            sectionData[idx] = {
                                              ...sectionData[idx],
                                              representativeImages: current,
                                              image: current[0] || ""
                                            };
                                            setFormData((prev: any) => ({ ...prev, personalProjects: sectionData }));
                                          }}
                                          className="px-1.5 py-0.5 bg-white hover:bg-neutral-100 text-neutral-800 rounded border border-neutral-200 transition-colors text-[9px] font-bold font-sans"
                                        >
                                          대표 지정
                                        </button>
                                      )}
                                    </div>
                                    
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const current = [...(project.representativeImages || (project.image ? [project.image] : []))];
                                        current.splice(imgIdx, 1);
                                        
                                        const sectionData = [...(formData.personalProjects || [])];
                                        sectionData[idx] = {
                                          ...sectionData[idx],
                                          representativeImages: current,
                                          image: current[0] || ""
                                        };
                                        setFormData((prev: any) => ({ ...prev, personalProjects: sectionData }));
                                      }}
                                      className="px-1.5 py-0.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded transition-colors text-[9px] font-bold font-sans"
                                    >
                                      제거
                                    </button>
                                  </div>
                                </div>
                              );
                            })}

                            {(project.representativeImages || (project.image ? [project.image] : [])).length === 0 && (
                              <div className="col-span-full py-8 text-center border border-dashed border-neutral-200 rounded-lg bg-neutral-50/50 flex flex-col justify-center items-center gap-1.5 text-neutral-400 font-sans">
                                <ImageIcon size={20} className="stroke-1.5 text-neutral-350" />
                                <span className="text-[11px]">지정된 대표이미지가 없습니다. 상단 '이미지 다중 추가'를 눌러 등록해 주세요.</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 pt-4 border-t border-neutral-200">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-neutral-500 font-semibold text-neutral-550">간단 기획 설명 (About / Main List 카드용)</span>
                          <input 
                            type="text"
                            value={project.description || ""}
                            onChange={e => handleArrayChange("personalProjects", idx, "description", e.target.value)}
                            className="w-full bg-white border border-neutral-205 rounded px-3 py-2 text-xs text-neutral-850 focus:outline-none focus:border-neutral-400 font-sans"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-neutral-500 font-semibold text-neutral-550">긴 상세 설명 (상세 모달 내부)</span>
                          <textarea 
                            value={project.fullDescription || ""}
                            onChange={e => handleArrayChange("personalProjects", idx, "fullDescription", e.target.value)}
                            rows={3}
                            className="w-full bg-white border border-neutral-205 rounded px-3 py-2 text-xs font-sans leading-relaxed text-neutral-850 focus:outline-none focus:border-neutral-400"
                          />
                        </div>
                      </div>

                      {/* Detail Images slider list */}
                      <div className="space-y-3 border-t border-neutral-200 pt-5">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                          <div>
                            <span className="text-[11px] font-bold tracking-tight text-neutral-800 font-sans block uppercase">
                              서브 슬라이드 이미지 목록 (Sub Images Carousel Block)
                            </span>
                            <span className="text-[10px] text-neutral-500 font-sans block">
                              작품 상세 모달 및 슬라이드 쇼에 출력될 보조 사진들을 업로드하여 구성합니다.
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {/* File Upload Button for multiple images */}
                            <label className="cursor-pointer px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-md text-[11px] font-semibold inline-flex items-center gap-1.5 transition-all active:scale-95 shadow-3xs user-select-none">
                              <Upload size={12} />
                              <span>사진 추가 (업로드)</span>
                              <input 
                                type="file" 
                                accept="image/*" 
                                multiple
                                className="hidden" 
                                onChange={async (e) => {
                                  if (e.target.files && e.target.files.length > 0) {
                                    const files = e.target.files;
                                    const key = `personalProjects-${idx}-sub-multi`;
                                    setProjectUploadStatus(prev => ({ ...prev, [key]: `0/${files.length} 추가 중...` }));
                                    const uploadedUrls: string[] = [];
                                    for (let i = 0; i < files.length; i++) {
                                      const file = files[i];
                                      try {
                                        setProjectUploadStatus(prev => ({ ...prev, [key]: `${i + 1}/${files.length} 추가 중...` }));
                                        const base64Content = await new Promise<string>((resolve, reject) => {
                                          const r = new FileReader();
                                          r.onload = () => resolve(r.result as string);
                                          r.onerror = reject;
                                          r.readAsDataURL(file);
                                        });
                                        const res = await fetch("/api/upload", {
                                          method: "POST",
                                          headers: { "Content-Type": "application/json" },
                                          body: JSON.stringify({ fileName: file.name, fileContent: base64Content })
                                        });
                                        if (res.ok) {
                                          const data = await res.json();
                                          uploadedUrls.push(data.url);
                                        }
                                      } catch (err) {
                                        console.error("Error uploading: ", file.name, err);
                                      }
                                    }
                                    if (uploadedUrls.length > 0) {
                                      const current = [...(project.images || [])];
                                      const updated = [...current, ...uploadedUrls];
                                      handleArrayChange("personalProjects", idx, "images", updated);
                                      setProjectUploadStatus(prev => ({ ...prev, [key]: "성공적으로 추가됨!" }));
                                    } else {
                                      setProjectUploadStatus(prev => ({ ...prev, [key]: "업로드 실패" }));
                                    }
                                    setTimeout(() => {
                                      setProjectUploadStatus(prev => {
                                        const next = { ...prev };
                                        delete next[key];
                                        return next;
                                      });
                                    }, 3000);
                                  }
                                }}
                              />
                            </label>
                          </div>
                        </div>

                        {projectUploadStatus[`personalProjects-${idx}-sub-multi`] && (
                          <div className="text-[10px] font-mono text-neutral-600 animate-pulse bg-neutral-100/80 px-2 py-1 rounded inline-block">
                            {projectUploadStatus[`personalProjects-${idx}-sub-multi`]}
                          </div>
                        )}

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 pt-1">
                          {(project.images || []).map((imgUrl: string, iIdx: number) => (
                            <div key={iIdx} className="relative group bg-neutral-50 p-2 rounded-lg border border-neutral-200 hover:border-neutral-400 transition-all flex flex-col justify-between shadow-3xs">
                              {/* Photo container */}
                              <div className="aspect-[4/3] w-full rounded-md overflow-hidden bg-neutral-100 relative border border-neutral-200">
                                {imgUrl ? (
                                  <img 
                                    src={imgUrl} 
                                    alt={`Slide ${iIdx}`} 
                                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300" 
                                    referrerPolicy="no-referrer" 
                                  />
                                ) : (
                                  <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center text-neutral-400">
                                    <ImageIcon size={18} className="mb-1 opacity-60" />
                                    <span className="text-[9px] font-sans">이미지 없음</span>
                                  </div>
                                )}
                                
                                <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-neutral-900/85 text-[8px] font-bold text-white tracking-wider rounded-sm font-sans scale-90 origin-top-left backdrop-blur-[2px]">
                                  #{iIdx + 1}
                                </span>
                              </div>

                              {/* Controls */}
                              <div className="mt-2 text-[10px]">
                                <div className="flex items-center justify-between gap-1">
                                  <div className="flex gap-1">
                                    {/* Move left */}
                                    {iIdx > 0 && (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const updated = [...(project.images || [])];
                                          const temp = updated[iIdx];
                                          updated[iIdx] = updated[iIdx - 1];
                                          updated[iIdx - 1] = temp;
                                          handleArrayChange("personalProjects", idx, "images", updated);
                                        }}
                                        className="px-1 py-0.5 bg-white hover:bg-neutral-100 text-neutral-700 hover:text-black rounded border border-neutral-200 text-[8px] font-bold"
                                        title="왼쪽으로 이동"
                                      >
                                        ◀
                                      </button>
                                    )}
                                    {/* Move right */}
                                    {iIdx < (project.images || []).length - 1 && (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const updated = [...(project.images || [])];
                                          const temp = updated[iIdx];
                                          updated[iIdx] = updated[iIdx + 1];
                                          updated[iIdx + 1] = temp;
                                          handleArrayChange("personalProjects", idx, "images", updated);
                                        }}
                                        className="px-1 py-0.5 bg-white hover:bg-neutral-100 text-neutral-700 hover:text-black rounded border border-neutral-200 text-[8px] font-bold"
                                        title="오른쪽으로 이동"
                                      >
                                        ▶
                                      </button>
                                    )}
                                  </div>

                                  <div className="flex gap-1 items-center">
                                    {/* Individual File Change Upload Button */}
                                    <label className="cursor-pointer px-1.5 py-0.5 bg-white hover:bg-neutral-100 text-neutral-800 rounded border border-neutral-200 text-[9px] font-semibold text-center font-sans tracking-tight">
                                      업로드
                                      <input 
                                        type="file" 
                                        accept="image/*" 
                                        className="hidden" 
                                        onChange={async (e) => {
                                          if (e.target.files && e.target.files[0]) {
                                            const file = e.target.files[0];
                                            const key = `personalProjects-${idx}-sub-${iIdx}`;
                                            setProjectUploadStatus(prev => ({ ...prev, [key]: "업로드 중..." }));
                                            try {
                                              const base64Content = await new Promise<string>((resolve, reject) => {
                                                const r = new FileReader();
                                                r.onload = () => resolve(r.result as string);
                                                r.onerror = reject;
                                                r.readAsDataURL(file);
                                              });
                                              const res = await fetch("/api/upload", {
                                                method: "POST",
                                                headers: { "Content-Type": "application/json" },
                                                body: JSON.stringify({ fileName: file.name, fileContent: base64Content })
                                              });
                                              if (res.ok) {
                                                const data = await res.json();
                                                const updated = [...(project.images || [])];
                                                updated[iIdx] = data.url;
                                                handleArrayChange("personalProjects", idx, "images", updated);
                                                setProjectUploadStatus(prev => ({ ...prev, [key]: "완료" }));
                                              } else {
                                                setProjectUploadStatus(prev => ({ ...prev, [key]: "실패" }));
                                              }
                                            } catch (err) {
                                              setProjectUploadStatus(prev => ({ ...prev, [key]: "에러" }));
                                            }
                                            setTimeout(() => {
                                              setProjectUploadStatus(prev => {
                                                const next = { ...prev };
                                                delete next[key];
                                                return next;
                                              });
                                            }, 2000);
                                          }
                                        }}
                                      />
                                    </label>

                                    {/* Remove button */}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const updated = [...(project.images || [])];
                                        updated.splice(iIdx, 1);
                                        handleArrayChange("personalProjects", idx, "images", updated);
                                      }}
                                      className="px-1.5 py-0.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded text-[9px] font-bold"
                                    >
                                      제거
                                    </button>
                                  </div>
                                </div>
                                {projectUploadStatus[`personalProjects-${idx}-sub-${iIdx}`] && (
                                  <span className="text-[8px] font-mono text-rose-600 block leading-none pt-0.5 text-center">
                                    {projectUploadStatus[`personalProjects-${idx}-sub-${iIdx}`]}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                          {(project.images || []).length === 0 && (
                            <div className="col-span-full py-10 text-center border border-dashed border-neutral-200 rounded-lg bg-neutral-50/50 flex flex-col justify-center items-center gap-1.5 text-neutral-400 font-sans">
                              <ImageIcon size={20} className="stroke-1.5 text-neutral-350" />
                              <span className="text-[11px] font-medium text-neutral-500">슬라이드 사진이 지정되지 않았습니다.</span>
                              <span className="text-[9px] text-neutral-400">상단의 '사진 다중 추가' 버튼으로 로컬 파일을 업로드하거나 '직접 링크 추가'를 누르세요.</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Role subform */}
                      <div className="space-y-3 border-t border-neutral-200 pt-4">
                        <span className="text-[10px] font-mono text-neutral-550 block uppercase font-semibold">역할 및 크레딧 (Primary Role)</span>
                        <div className="space-y-2 p-3 bg-white rounded border border-neutral-200 shadow-3xs">
                          <div className="w-1/2">
                            <span className="text-[8px] font-mono text-neutral-500 font-semibold">역할 대표명 (예: 담당 업무)</span>
                            <input 
                              type="text"
                              value={project.role?.title || ""}
                              onChange={e => {
                                const role = { ...(project.role || {}), title: e.target.value };
                                handleArrayChange("personalProjects", idx, "role", role);
                              }}
                              className="w-full bg-white border border-neutral-205 rounded px-2 py-1 text-xs font-bold text-neutral-900 focus:outline-none focus:border-neutral-400 font-sans"
                            />
                          </div>

                          <div className="space-y-1.5 pt-2">
                            <div className="flex justify-between items-center text-[8px] font-mono text-neutral-500">
                              <span>세부 역할 기여항목</span>
                              <button
                                onClick={() => {
                                  const roleItems = [...(project.role?.items || []), ""];
                                  const role = { ...(project.role || {}), items: roleItems };
                                  handleArrayChange("personalProjects", idx, "role", role);
                                }}
                                className="text-neutral-700 hover:text-black hover:underline"
                              >
                                + 항목 상세 추가
                              </button>
                            </div>
                            {(project.role?.items || []).map((roleBullet: string, rIdx: number) => (
                              <div key={rIdx} className="flex items-center gap-2">
                                <span className="text-neutral-400 text-xs font-bold">•</span>
                                <input 
                                  type="text"
                                  value={roleBullet}
                                  onChange={e => {
                                    const roleItems = [...(project.role?.items || [])];
                                    roleItems[rIdx] = e.target.value;
                                    const role = { ...(project.role || {}), items: roleItems };
                                    handleArrayChange("personalProjects", idx, "role", role);
                                  }}
                                  className="w-full bg-white border border-neutral-205 rounded px-2 py-1 text-xs text-neutral-850 focus:outline-none focus:border-neutral-400 font-sans"
                                />
                                <button
                                  onClick={() => {
                                    const roleItems = [...(project.role?.items || [])];
                                    roleItems.splice(rIdx, 1);
                                    const role = { ...(project.role || {}), items: roleItems };
                                    handleArrayChange("personalProjects", idx, "role", role);
                                  }}
                                  className="text-neutral-400 hover:text-red-500 font-bold shrink-0 text-sm"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Performance Achievements (수행 성과) */}
                      <div className="space-y-2 border-t border-neutral-200 pt-4">
                        <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500">
                          <span>지표 결과 및 달성 기여 (Results & Achievements)</span>
                          <button
                            onClick={() => {
                              const updated = [...(project.results || []), ""];
                              handleArrayChange("personalProjects", idx, "results", updated);
                            }}
                            className="text-neutral-700 hover:text-black hover:underline"
                          >
                            + 성과 항목 추가
                          </button>
                        </div>
                        <div className="space-y-2">
                          {(project.results || []).map((resBullet: string, rIdx: number) => (
                            <div key={rIdx} className="flex items-center gap-2">
                              <span className="text-neutral-400 font-mono text-xs">✓</span>
                              <input 
                                type="text"
                                value={resBullet}
                                onChange={e => {
                                  const updated = [...(project.results || [])];
                                  updated[rIdx] = e.target.value;
                                  handleArrayChange("personalProjects", idx, "results", updated);
                                }}
                                className="w-full bg-white border border-neutral-205 rounded px-2 py-1.5 text-xs text-neutral-800 font-sans focus:outline-none focus:border-neutral-400"
                              />
                              <button
                                onClick={() => {
                                  const updated = [...(project.results || [])];
                                  updated.splice(rIdx, 1);
                                  handleArrayChange("personalProjects", idx, "results", updated);
                                }}
                                className="text-neutral-400 hover:text-red-500 font-bold"
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
          </div>
        )}

            {/* TAB 5: MEDIA ASSETS UPLOAD DECK */}
            {activeTab === "media" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold tracking-tight mb-1 text-neutral-900">드래그 앤 드롭 미디어 업로더 (Media Uplink Deck)</h2>
                  <p className="text-xs text-neutral-500">깃허브에 번거롭게 이미지를 올리지 마세요! 로컬 컴퓨터의 사진이나 가이드 자료를 끌어놓는 순간, 즉각적인 라이브 URL이 생성됩니다.</p>
                </div>

                {/* Dropzone frame */}
                <div 
                  onDragOver={onDragOver}
                  onDrop={onDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-neutral-300 hover:border-neutral-500 transition-all bg-neutral-50/50 p-12 rounded-sm text-center cursor-pointer space-y-4 group/drop"
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={e => e.target.files && handleFileUpload(e.target.files[0])}
                    className="hidden" 
                  />
                  
                  <div className="w-14 h-14 bg-neutral-100 rounded-full flex items-center justify-center mx-auto group-hover/drop:scale-105 transition-transform border border-neutral-200">
                    <Upload className="text-neutral-500 group-hover/drop:text-neutral-950 transition-colors animate-bounce" size={22} />
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-bold text-neutral-800">여기에 파일을 드래그하여 옮겨놓거나 클릭하여 찾아보기</p>
                    <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest font-semibold">Supports PNG, JPG, JPEG, GIF, PDF</p>
                  </div>

                  {uploadStatus && (
                    <div className="text-xs text-neutral-600 font-bold font-mono pl-2 animate-pulse">
                      STATUS: {uploadStatus}
                    </div>
                  )}
                </div>

                {/* Uplink tables lists */}
                <div className="space-y-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold">업로드 완료된 자산 라이브러리 목록 (Assets List)</h3>
                  
                  <div className="space-y-2.5">
                    {uploadedFiles.map((file, idx) => (
                      <div key={idx} className="p-4 border border-neutral-200 bg-neutral-50/30 rounded-sm flex items-center justify-between gap-4 shadow-3xs">
                        <div className="flex items-center gap-3">
                          <ImageIcon className="text-neutral-500 shrink-0" size={18} />
                          <div>
                            <p className="text-xs font-bold leading-none mb-1 text-neutral-800 font-mono">{file.name}</p>
                            <p className="text-[10px] text-neutral-450 font-mono break-all">{file.url}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <img src={file.url} alt="thumbnail" referrerPolicy="no-referrer" className="w-10 h-10 object-cover border border-neutral-200 rounded" />
                          <button
                            onClick={() => copyUrl(file.url, idx)}
                            className="p-2 border border-neutral-300 hover:border-neutral-500 rounded bg-white text-neutral-600 hover:text-black transition-all outline-none focus:ring-0 shadow-3xs"
                            title="이미지 주소 복사"
                          >
                            {copiedIndex === idx ? (
                              <Check className="text-emerald-600 animate-scale" size={14} />
                            ) : (
                              <Copy size={13} />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}

                    {uploadedFiles.length === 0 && (
                      <div className="py-20 text-center border border-neutral-200 bg-neutral-50/50 rounded-sm">
                        <p className="text-xs text-neutral-400 font-mono italic">라이브러리가 비어 있습니다. 사진을 올려 주소를 빌드하세요.</p>
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
