/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DEFAULT_PORTFOLIO_DATA,
  PortfolioData,
  DEFAULT_FESTIVAL_TICKET,
  DEFAULT_FESTIVAL_FNB,
  DEFAULT_FESTIVAL_STORAGE,
} from "./default_data";
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
  Image as ImageIcon,
  Play,
} from "lucide-react";

import { LightboxOverlay } from "./components/LightboxOverlay";

export const COUNTRY_LIST = [
  { code: "", name: "선택 안 함" },
  { code: "KR", name: "대한민국" },
  { code: "US", name: "미국" },
  { code: "JP", name: "일본" },
  { code: "CN", name: "중국" },
  { code: "FR", name: "프랑스" },
  { code: "GB", name: "영국" },
  { code: "DE", name: "독일" },
  { code: "CA", name: "캐나다" },
  { code: "AU", name: "호주" },
  { code: "SG", name: "싱가포르" },
  { code: "IT", name: "이탈리아" },
  { code: "ES", name: "스페인" },
  { code: "NL", name: "네덜란드" },
  { code: "CH", name: "스위스" },
];

export const FLOWER_PLANET_CONTENT_1_IMAGES = [
  "https://raw.githubusercontent.com/2green-lee/Portfolio/1372229816f6ab9e9217113ebe5e4b5d29cae9dc/intro1.png",
  "https://raw.githubusercontent.com/2green-lee/Portfolio/1372229816f6ab9e9217113ebe5e4b5d29cae9dc/intro2.png",
  "https://raw.githubusercontent.com/2green-lee/Portfolio/1372229816f6ab9e9217113ebe5e4b5d29cae9dc/intro3.png",
];

export const FLOWER_PLANET_CONTENT_2_IMAGES = [
  "https://raw.githubusercontent.com/2green-lee/Portfolio/1372229816f6ab9e9217113ebe5e4b5d29cae9dc/img%2046.jpg",
  "https://raw.githubusercontent.com/2green-lee/Portfolio/1372229816f6ab9e9217113ebe5e4b5d29cae9dc/img%2047.jpg",
  "https://raw.githubusercontent.com/2green-lee/Portfolio/1372229816f6ab9e9217113ebe5e4b5d29cae9dc/img%2048.jpg",
  "https://raw.githubusercontent.com/2green-lee/Portfolio/1372229816f6ab9e9217113ebe5e4b5d29cae9dc/img%2049.jpg",
];

export interface Project {
  title: string;
  category: string;
  year: string;
  image: string;
  representativeImages?: string[];
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
  ticketImages?: string[];
  fnbImages?: string[];
  storageImages?: string[];
  processTicket?: any;
  processFnB?: any;
  processStorage?: any;
  processHouse?: any;
  processConcert?: any;
}

export const formatCategory = (category: string) => {
  if (!category) return "";
  if (category === "Music") return "음악";
  if (category === "Concert") return "공연기획";
  return category;
};

export const SECTIONS = [
  { id: "about", label: "ABOUT ME", color: "bg-white text-black" },
  { id: "project1", label: "PROJECT", color: "bg-white text-black" },
  { id: "activities", label: "KEY ACTIVITIES", color: "bg-white text-black" },
];

export const AutoFitTitle: React.FC<{ children: string; className?: string }> = ({
  children,
  className,
}) => {
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
      text.style.display = "inline-block";
      text.style.whiteSpace = "nowrap";

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
    window.addEventListener("resize", adjustFontSize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", adjustFontSize);
    };
  }, [children]);

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <h2
        ref={textRef}
        className={className}
        style={{
          fontSize: fontSize ? `${fontSize}px` : "inherit",
          whiteSpace: "nowrap",
          display: "inline-block",
          lineHeight: "1.1",
        }}
      >
        {children}
      </h2>
    </div>
  );
};

export const convertGithubUrl = (url: string): string => {
  if (!url || typeof url !== "string") return "";
  const trimmedUrl = url.trim();
  if (trimmedUrl.includes("github.com") && trimmedUrl.includes("/blob/")) {
    return trimmedUrl
      .replace("github.com", "raw.githubusercontent.com")
      .replace("/blob/", "/");
  }
  return trimmedUrl;
};

export const getEndDateFromPeriod = (periodStr: string): number => {
  if (!periodStr || typeof periodStr !== "string") return 0;
  const parts = periodStr.split(/[~-]/);
  const endPart = parts[parts.length - 1] ? parts[parts.length - 1].trim() : "";
  if (!endPart) return 0;

  const ongoingIndicators = ["현재", "진행", "present", "ongoing", "now"];
  if (
    ongoingIndicators.some((indicator) =>
      endPart.toLowerCase().includes(indicator),
    )
  ) {
    return Date.now();
  }

  const match = endPart.match(/(\d{4})(?:\.(\d{1,2}))?/);
  if (match) {
    const year = parseInt(match[1], 10);
    const month = match[2] ? parseInt(match[2], 10) : 12;
    return new Date(year, month - 1, 15).getTime();
  }

  const parsed = Date.parse(endPart);
  return isNaN(parsed) ? 0 : parsed;
};

export const OptimizedImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  style?: React.CSSProperties;
  referrerPolicy?:
    | "no-referrer"
    | "origin"
    | "unsafe-url"
    | "no-referrer-when-downgrade";
}> = ({
  src,
  alt,
  className,
  wrapperClassName = "rounded-[8px] bg-neutral-100",
  style,
  referrerPolicy,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const convertedSrc = convertGithubUrl(src);

  useEffect(() => {
    setIsLoaded(false);
    const img = new Image();
    img.src = convertedSrc;
    img.onload = () => {
      setIsLoaded(true);
    };
  }, [convertedSrc]);

  return (
    <div
      className={`relative w-full h-full overflow-hidden flex items-center justify-center ${wrapperClassName}`}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100/80 animate-pulse">
          <div className="w-4 h-4 border border-neutral-300 border-t-neutral-800 rounded-full animate-spin" />
        </div>
      )}
      <img loading="lazy" src={convertedSrc}
        alt={alt}
        className={`${className || ""} transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={style}
        referrerPolicy={referrerPolicy}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

export const ModalCarousel: React.FC<{ images: string[]; project: Project }> = ({
  images,
  project,
}) => {
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
        onClick={() =>
          setIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
        }
        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-neutral-900/80 hover:bg-neutral-950 text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 shadow-sm transition-all"
      >
        <ArrowLeft size={16} />
      </button>
      <button
        type="button"
        onClick={() =>
          setIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
        }
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

export const FESTIVAL_POSTERS = [
  {
    title: "WATERBOMB",
    src: "https://raw.githubusercontent.com/2green-lee/Portfolio/9d41580d7739017f4b186f92faf6491a60264fd5/2024waterbomb.png",
    period: "2024",
  },
  {
    title: "인천펜타포트",
    src: "https://raw.githubusercontent.com/2green-lee/Portfolio/301715e6090e002a7c306c6d76f35d8d78ed92f4/2024incheonrock.png",
    period: "2024",
  },
  {
    title: "부산국제록페스티벌",
    src: "https://raw.githubusercontent.com/2green-lee/Portfolio/301715e6090e002a7c306c6d76f35d8d78ed92f4/2024bsrock.png",
    period: "2024",
  },
  {
    title: "이슬라이브페스티벌",
    src: "https://raw.githubusercontent.com/2green-lee/Portfolio/301715e6090e002a7c306c6d76f35d8d78ed92f4/2024cham.jpg",
    period: "2024",
  },
];

export const MUSICAL_POSTERS = [
  "https://raw.githubusercontent.com/2green-lee/Portfolio/d839994db20cd3c5be8d5fda0fd0b93a6fb98b4c/m1.jpg",
  "https://raw.githubusercontent.com/2green-lee/Portfolio/d839994db20cd3c5be8d5fda0fd0b93a6fb98b4c/m2.jpg",
  "https://raw.githubusercontent.com/2green-lee/Portfolio/d839994db20cd3c5be8d5fda0fd0b93a6fb98b4c/m3.jpeg",
  "https://raw.githubusercontent.com/2green-lee/Portfolio/d839994db20cd3c5be8d5fda0fd0b93a6fb98b4c/m4.jpg",
  "https://raw.githubusercontent.com/2green-lee/Portfolio/d839994db20cd3c5be8d5fda0fd0b93a6fb98b4c/m5.jpg",
  "https://raw.githubusercontent.com/2green-lee/Portfolio/d839994db20cd3c5be8d5fda0fd0b93a6fb98b4c/m6.jpg",
  "https://raw.githubusercontent.com/2green-lee/Portfolio/d839994db20cd3c5be8d5fda0fd0b93a6fb98b4c/m7.jpg",
  "https://raw.githubusercontent.com/2green-lee/Portfolio/d839994db20cd3c5be8d5fda0fd0b93a6fb98b4c/m8.jpg",
  "https://raw.githubusercontent.com/2green-lee/Portfolio/d839994db20cd3c5be8d5fda0fd0b93a6fb98b4c/m9.jpg",
];

export const CONCERT_POSTERS = [
  {
    title: "2023.12.01 GREENERY (RGB 저용량)",
    src: "https://raw.githubusercontent.com/2green-lee/Portfolio/9f6965d51fef5cfaa731486e1b9da1888d9df101/2023.12.01%20GREENERY%20(RGB%20%E1%84%8C%E1%85%A5%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%85%E1%85%A3%E1%86%BC).jpg",
    period: "2023",
  },
  {
    title: "오페라의 유령 내한공연",
    src: "https://raw.githubusercontent.com/2green-lee/Portfolio/d839994db20cd3c5be8d5fda0fd0b93a6fb98b4c/m6.jpg",
    period: "2021",
  },
  {
    title: "Flower Planet",
    src: "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img4.jpg",
    period: "2022",
  },
  {
    title: "라이온킹 내한 공연",
    src: "https://raw.githubusercontent.com/2green-lee/Portfolio/d839994db20cd3c5be8d5fda0fd0b93a6fb98b4c/m1.jpg",
    period: "2022",
  },
];

export const CREATIVE_CONCERT_POSTERS = [
  {
    title: "2023.12.01 GREENERY (RGB 저용량)",
    src: "https://raw.githubusercontent.com/2green-lee/Portfolio/9f6965d51fef5cfaa731486e1b9da1888d9df101/2023.12.01%20GREENERY%20(RGB%20%E1%84%8C%E1%85%A5%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%85%E1%85%A3%E1%86%BC).jpg",
    period: "2023",
  },
  {
    title: "Flower Planet",
    src: "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img4.jpg",
    period: "2022",
  },
  {
    title: "오후의 향기",
    src: "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img2.jpg",
    period: "2021",
  },
  {
    title: "야간비행",
    src: "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img1.jpg",
    period: "2021",
  },
];

export const MIXED_POSTERS = [
  {
    title: "WATERBOMB",
    src: "https://raw.githubusercontent.com/2green-lee/Portfolio/9d41580d7739017f4b186f92faf6491a60264fd5/2024waterbomb.png",
    period: "2024",
  },
  {
    title: "인천펜타포트",
    src: "https://raw.githubusercontent.com/2green-lee/Portfolio/301715e6090e002a7c306c6d76f35d8d78ed92f4/2024incheonrock.png",
    period: "2024",
  },
  {
    title: "Flower Planet",
    src: "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img4.jpg",
    period: "2022",
  },
  {
    title: "열대야",
    src: "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img3.jpg",
    period: "2022",
  },
];

export const staggerItem = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export const ProjectCard: React.FC<{
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
        left:
          direction === "left"
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const posters = (
    project.title === "공연 운영" ? CONCERT_POSTERS : FESTIVAL_POSTERS
  ).slice(0, 4);

  const repImages =
    project.representativeImages && project.representativeImages.length > 0
      ? project.representativeImages
      : project.image
        ? [project.image]
        : [];

  return (
    <motion.div
      variants={staggerItem}
      className={`group cursor-pointer w-full h-auto sm:h-[340px] md:h-[270px] lg:h-[300px] xl:h-[330px] 2xl:h-[370px] bg-white border border-neutral-200/50 rounded-[15px] p-5 shadow-3xs hover:shadow-md hover:border-neutral-300 hover:-translate-y-1.5 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between ${isWide ? "" : ""}`}
      onClick={() => onClick(project)}
    >
      <div>
        <div className="flex justify-center items-center mb-3 border-b border-black/5 pb-2 h-9">
          <h3 className="text-base font-bold tracking-tight truncate flex-1 text-center text-neutral-800 group-hover:text-black transition-colors">
            {project.title}
          </h3>
        </div>
        {isWide ? (
          <div className="relative w-full mb-3 bg-neutral-50/50 border border-neutral-100/60 rounded-[12px] aspect-[600/160] sm:aspect-[600/190] md:aspect-[600/115] lg:aspect-[600/180] xl:aspect-[600/190] 2xl:aspect-[600/200] flex items-center justify-center p-2 group/grid">
            <div className="grid grid-cols-4 gap-2 h-full w-full">
              {posters.map((poster, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-[8px] flex items-center justify-center bg-neutral-100 h-full w-full"
                >
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
          <div
            className={`relative overflow-hidden bg-gray-50 mb-3 rounded-[12px] ${imageAspect || ""}`}
          >
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
      <div className="mt-1 border-t border-black/5 pt-2.5 space-y-2.5 xl:space-y-3 2xl:space-y-3.5 opacity-90 group-hover:opacity-100 transition-all duration-300 w-full">
        {/* 1행: 분야 */}
        <div className="flex items-center justify-between text-xs text-neutral-600">
          <span className="font-sans text-[11px] text-neutral-400 font-semibold tracking-wider shrink-0 uppercase">
            분야
          </span>
          <div className="flex flex-wrap gap-1.5 justify-end">
            {project.title === "페스티벌 운영" || project.title === "공연 운영"
              ? (project.title === "공연 운영"
                  ? "하우스, 티켓, 안내, MD 판매, 컴플레인 응대"
                  : "종합 안내, 티켓, F&B, MD 판매, 물품보관소"
                )
                  .split(", ")
                  .map((item, index) => (
                    <span
                      key={index}
                      className="font-medium text-neutral-800 bg-neutral-50/75 border border-neutral-200/80 px-2.5 py-0.5 text-[11px] tracking-wide select-none transition-all duration-300 rounded-[6px] shadow-4xs"
                    >
                      {item}
                    </span>
                  ))
              : (project.category || "").split(",").map((cat, idx) => (
                  <span
                    key={idx}
                    className="font-medium text-neutral-800 bg-neutral-50/75 border border-neutral-200/80 px-2.5 py-0.5 text-[11px] tracking-wide select-none transition-all duration-300 rounded-[6px] shadow-4xs"
                  >
                    {formatCategory(cat.trim())}
                  </span>
                ))}
          </div>
        </div>

        {/* 2행: 기여도 및 담당역할 */}
        <div className="grid grid-cols-2 gap-x-6 items-center border-t border-white text-xs text-neutral-600">
          {/* 기여도 */}
          <div className="flex flex-col gap-1.5 w-full">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[11px] text-neutral-400 font-semibold tracking-wider shrink-0 uppercase">
                기여도
              </span>
              <span className="font-mono font-bold text-neutral-800 text-[12px]">
                {project.contribution || "0%"}
              </span>
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
              <span className="font-sans text-[11px] text-neutral-400 font-semibold tracking-wider shrink-0 uppercase">
                담당 역할
              </span>
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

