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

const FLOWER_PLANET_CONTENT_1_IMAGES = [
  "https://raw.githubusercontent.com/2green-lee/Portfolio/1372229816f6ab9e9217113ebe5e4b5d29cae9dc/intro1.png",
  "https://raw.githubusercontent.com/2green-lee/Portfolio/1372229816f6ab9e9217113ebe5e4b5d29cae9dc/intro2.png",
  "https://raw.githubusercontent.com/2green-lee/Portfolio/1372229816f6ab9e9217113ebe5e4b5d29cae9dc/intro3.png",
];

const FLOWER_PLANET_CONTENT_2_IMAGES = [
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
}

const formatCategory = (category: string) => {
  if (!category) return "";
  if (category === "Music") return "음악";
  if (category === "Concert") return "공연기획";
  return category;
};

const SECTIONS = [
  { id: "about", label: "ABOUT ME", color: "bg-white text-black" },
  { id: "project1", label: "PROJECT", color: "bg-white text-black" },
  { id: "activities", label: "KEY ACTIVITIES", color: "bg-white text-black" },
];

const AutoFitTitle: React.FC<{ children: string; className?: string }> = ({
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

const convertGithubUrl = (url: string): string => {
  if (!url || typeof url !== "string") return "";
  const trimmedUrl = url.trim();
  if (trimmedUrl.includes("github.com") && trimmedUrl.includes("/blob/")) {
    return trimmedUrl
      .replace("github.com", "raw.githubusercontent.com")
      .replace("/blob/", "/");
  }
  return trimmedUrl;
};

const getEndDateFromPeriod = (periodStr: string): number => {
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

const OptimizedImage: React.FC<{
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
      <img
        src={convertedSrc}
        alt={alt}
        className={`${className || ""} transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={style}
        referrerPolicy={referrerPolicy}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

const ModalCarousel: React.FC<{ images: string[]; project: Project }> = ({
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

const FESTIVAL_POSTERS = [
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

const MUSICAL_POSTERS = [
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

const CONCERT_POSTERS = [
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

const CREATIVE_CONCERT_POSTERS = [
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

const MIXED_POSTERS = [
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

const staggerItem = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
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

const ProjectModal: React.FC<{
  project: Project | null;
  onClose: () => void;
}> = ({ project, onClose }) => {
  const [slidePage, setSlidePage] = useState(1);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxImages, setLightboxImages] = useState<string[] | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  useEffect(() => {
    if (!lightboxImages) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxImages(null);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev > 0 ? prev - 1 : lightboxImages.length - 1));
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev < lightboxImages.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxImages]);

  const isFestival = project?.title === "페스티벌 운영";
  const isConcert = project?.title === "공연 운영";
  const isGreenery = project?.title === "GREENERY : 푸르게 푸르게 푸르러져라";
  const isFlowerPlanet = project?.title === "Flower Planet";
  const isYeoldaeya = project?.title === "열대야";
  const isAfternoon = project?.title === "오후의 향기";
  const isNightflight = project?.title === "야간비행";
  const tabs = isFestival
    ? [
        { page: 1, label: "개요" },
        { page: 2, label: "티켓 운영" },
        { page: 3, label: "F&B 운영" },
        { page: 4, label: "MD 판매 & 물품보관소" },
      ]
    : isConcert
      ? [
          { page: 1, label: "개요" },
          { page: 2, label: "공연 운영" },
          { page: 3, label: "하우스 운영 보조" },
        ]
      : isGreenery
        ? [
            { page: 1, label: "개요" },
            { page: 2, label: "내용" },
            { page: 3, label: "리뷰" },
            { page: 4, label: "갤러리" },
          ]
        : isFlowerPlanet || isYeoldaeya || isAfternoon || isNightflight
          ? [
              { page: 1, label: "개요" },
              { page: 2, label: "내용" },
              { page: 3, label: "갤러리" },
            ]
          : [
              { page: 1, label: "개요" },
              { page: 2, label: "티켓 운영" },
              { page: 3, label: "현장 운영" },
              { page: 4, label: "사후 관리" },
              { page: 5, label: "갤러리" },
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
        setSlidePage((p) => Math.max(1, p - 1));
      } else if (e.key === "ArrowRight") {
        setSlidePage((p) => Math.min(maxPages, p + 1));
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
                onClick={() => setSlidePage((p) => Math.max(1, p - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-[205] w-12 h-12 bg-white/95 text-neutral-900 hover:bg-neutral-950 hover:text-white transition-all duration-300 rounded-none cursor-pointer flex items-center justify-center outline-none border-none select-none group/prev"
                title="이전 슬라이드 (←)"
              >
                <ChevronLeft className="w-5 h-5 group-hover/prev:-translate-x-0.5 transition-transform" />
              </button>
            )}
            {slidePage < maxPages && (
              <button
                onClick={() => setSlidePage((p) => Math.min(maxPages, p + 1))}
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
                    <div
                      className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 ${project.title === "페스티벌 운영" || project.title === "공연 운영" ? "items-stretch" : "items-center"}`}
                    >
                      {/* Left: Beautiful Hero photo frame or 2*2 posters */}
                      <div
                        className={`md:col-span-6 w-full flex justify-center ${project.title === "페스티벌 운영" || project.title === "공연 운영" ? "self-stretch" : ""}`}
                      >
                        {project.title === "페스티벌 운영" ||
                        project.title === "공연 운영" ? (
                          <div className="grid grid-cols-2 gap-4 w-full md:w-[499px] md:h-[660px] h-full min-h-[460px] md:min-h-[660px] mx-auto bg-transparent">
                            {(project.title === "공연 운영"
                              ? CONCERT_POSTERS
                              : FESTIVAL_POSTERS
                            ).map((poster, index) => (
                              <div
                                key={index}
                                className="relative overflow-hidden transition-all duration-300 w-full h-full group/poster flex items-center justify-center rounded-none"
                              >
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
                            const repImages =
                              project.representativeImages &&
                              project.representativeImages.length > 0
                                ? project.representativeImages
                                : project.image
                                  ? [project.image]
                                  : [];

                            if (repImages.length > 1) {
                              return (
                                <div className="w-full max-w-sm mx-auto flex flex-col gap-4 max-h-[660px] overflow-y-auto pr-1 rounded-none">
                                  {repImages.map((imgUrl, i) => (
                                    <div
                                      key={i}
                                      className="w-full overflow-hidden flex items-center justify-center rounded-none"
                                    >
                                      <OptimizedImage
                                        src={imgUrl}
                                        alt={`${project.title} rep-${i + 1}`}
                                        className="w-full h-auto block rounded-none"
                                        wrapperClassName="rounded-none bg-transparent"
                                        style={{
                                          objectPosition:
                                            project.objectPosition || "center",
                                        }}
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
                                  style={{
                                    objectPosition:
                                      project.objectPosition || "center",
                                  }}
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
                          const desc =
                            project.fullDescription ||
                            project.description ||
                            "";
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
                                  <p className="text-neutral-700 text-[12px] md:text-[13px] leading-relaxed tracking-normal whitespace-pre-line text-justify font-sans">
                                    {part1}
                                  </p>
                                </div>

                                {/* Specs Card */}
                                <div className="bg-white border border-neutral-200/80 rounded-[15px] p-5 space-y-3.5 w-full">
                                  <div className="flex items-center gap-2 border-b border-neutral-200/80 pb-2">
                                    <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                                    <h4 className="text-xs font-bold tracking-wider text-neutral-800 uppercase font-sans">
                                      PROJECT SPECIFICATION
                                    </h4>
                                  </div>
                                  <dl className="grid grid-cols-3 gap-y-2.5 text-xs">
                                    {project.contribution && (
                                      <>
                                        <dt className="text-neutral-500 col-span-1 font-medium self-center">
                                          기여도
                                        </dt>
                                        <dd className="text-neutral-900 col-span-2 font-medium flex items-center gap-3 relative -left-[10px]">
                                          <span className="font-mono font-bold text-neutral-800 text-xs shrink-0 select-none">
                                            {project.contribution}
                                          </span>
                                          <div className="w-24 bg-neutral-200 h-1.5 rounded-full overflow-hidden inline-block relative shrink-0">
                                            <motion.div
                                              initial={{ width: 0 }}
                                              animate={{
                                                width: project.contribution,
                                              }}
                                              transition={{
                                                duration: 0.8,
                                                ease: "easeOut",
                                              }}
                                              className="bg-neutral-800 h-full rounded-full"
                                            />
                                          </div>
                                        </dd>
                                      </>
                                    )}

                                    <dt className="text-neutral-500 col-span-1 font-medium">
                                      연도
                                    </dt>
                                    <dd className="text-neutral-900 col-span-2 font-mono font-bold relative -left-[10px]">
                                      {project.year}
                                    </dd>

                                    <dt className="text-neutral-500 col-span-1 font-medium self-center">
                                      분야
                                    </dt>
                                    <dd className="text-neutral-900 col-span-2 font-bold flex flex-wrap gap-1.5 items-center font-sans relative -left-[10px]">
                                      {project.title === "페스티벌 운영" ||
                                      project.title === "공연 운영"
                                        ? (project.title === "공연 운영"
                                            ? [
                                                "하우스",
                                                "티켓",
                                                "안내",
                                                "MD 판매",
                                                "컴플레인 응대",
                                              ]
                                            : [
                                                "종합 안내",
                                                "티켓",
                                                "F&B",
                                                "MD 판매",
                                                "물품보관소",
                                              ]
                                          ).map((item, index) => (
                                            <span
                                              key={index}
                                              className="font-medium text-neutral-800 bg-neutral-50/75 border border-neutral-200/80 px-2.5 py-0.5 text-[11px] tracking-wide rounded-[6px] shadow-4xs select-none"
                                            >
                                              {item}
                                            </span>
                                          ))
                                        : (project.category || "")
                                            .split(",")
                                            .map((cat, index) => (
                                              <span
                                                key={index}
                                                className="font-medium text-neutral-800 bg-neutral-50/75 border border-neutral-200/80 px-2.5 py-0.5 text-[11px] tracking-wide rounded-none shadow-4xs select-none"
                                              >
                                                {formatCategory(cat.trim())}
                                              </span>
                                            ))}
                                    </dd>

                                    {project.location && (
                                      <>
                                        <dt className="text-neutral-500 col-span-1 font-medium">
                                          장소
                                        </dt>
                                        <dd className="text-neutral-900 col-span-2 font-medium relative -left-[10px]">
                                          {project.location}
                                        </dd>
                                      </>
                                    )}

                                    {project.support && (
                                      <>
                                        <dt className="text-neutral-500 col-span-1 font-medium">
                                          제작 지원
                                        </dt>
                                        <dd className="text-neutral-900 col-span-2 font-medium relative -left-[10px]">
                                          {project.support}
                                        </dd>
                                      </>
                                    )}
                                  </dl>
                                </div>

                                {project.title === "공연 운영" && (
                                  <div className="bg-white border border-neutral-200/80 rounded-[15px] p-5 space-y-3.5 w-full">
                                    <div className="flex items-center gap-2 border-b border-neutral-200/80 pb-2">
                                      <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                                      <h4 className="text-[13px] font-bold tracking-wider text-neutral-800 uppercase font-sans">
                                        공연 운영 실적
                                      </h4>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                      {/* Left column */}
                                      <ul className="space-y-1.5 text-[13px] text-neutral-700 font-sans">
                                        {[
                                          "GREENERY 단독공연",
                                          "Flower Planet",
                                          "열대야",
                                          "오후의 향기",
                                          "야간비행",
                                        ].map((item, idx) => (
                                          <li
                                            key={idx}
                                            className="flex items-center gap-2.5 py-0.5 px-0.5 hover:text-rose-500 transition-colors duration-200"
                                          >
                                            <span className="w-1 h-1 bg-rose-400 rounded-full shrink-0" />
                                            <span className="font-medium text-neutral-800">
                                              {item}
                                            </span>
                                          </li>
                                        ))}
                                      </ul>

                                      {/* Right column */}
                                      <ul className="space-y-1.5 text-[13px] text-neutral-700 font-sans">
                                        {[
                                          "오페라의 유령 내한공연",
                                          "위키드",
                                          "캣츠 내한 공연",
                                          "라이온킹 내한 공연",
                                          "레베카",
                                          "맘마미아",
                                          "싯다르타",
                                          "백조의 호수",
                                          "시카고",
                                        ].map((item, idx) => (
                                          <li
                                            key={idx}
                                            className="flex items-center gap-2.5 py-0.5 px-0.5 hover:text-rose-500 transition-colors duration-200"
                                          >
                                            <span className="w-1 h-1 bg-rose-400 rounded-full shrink-0" />
                                            <span className="font-medium text-neutral-800">
                                              {item}
                                            </span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                )}

                                {project.title !== "공연 운영" && (
                                  <div className="w-full">
                                    {(() => {
                                      const regex = /\[([^\]]+)\]/g;
                                      const rawMatches = [
                                        ...part2.matchAll(regex),
                                      ];
                                      const matches = rawMatches;

                                      if (matches.length > 0) {
                                        const sections: {
                                          title: string;
                                          items: string[];
                                        }[] = [];
                                        for (
                                          let i = 0;
                                          i < matches.length;
                                          i++
                                        ) {
                                          const currentMatch = matches[i];
                                          const startIndex =
                                            currentMatch.index! +
                                            currentMatch[0].length;
                                          const endIndex =
                                            i + 1 < matches.length
                                              ? matches[i + 1].index
                                              : part2.length;
                                          const sectionContent = part2
                                            .substring(startIndex, endIndex)
                                            .trim();
                                          const items = sectionContent
                                            .split("\n")
                                            .map((l) => l.trim())
                                            .filter(Boolean);
                                          sections.push({
                                            title: currentMatch[1],
                                            items,
                                          });
                                        }

                                        return (
                                          <div className="space-y-4 w-full">
                                            {sections.map((sec, sIdx) => (
                                              <div
                                                key={sIdx}
                                                className="bg-white border border-neutral-200/80 rounded-[15px] p-5 space-y-3.5 w-full"
                                              >
                                                <div className="flex items-center gap-2 border-b border-neutral-200/80 pb-2">
                                                  <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                                                  <h4 className="text-xs font-bold tracking-wider text-neutral-800 uppercase font-sans">
                                                    {sec.title}
                                                  </h4>
                                                </div>
                                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-[13px] text-neutral-700 font-sans">
                                                  {sec.items.map(
                                                    (item, idx) => (
                                                      <li
                                                        key={idx}
                                                        className="flex items-center gap-2.5 py-0.5 px-0.5 hover:text-rose-500 transition-colors duration-200"
                                                      >
                                                        <span className="w-1 h-1 bg-rose-400 rounded-full shrink-0" />
                                                        <span className="font-medium">
                                                          {item
                                                            .replace(
                                                              /^[•\s\-\*]+/g,
                                                              "",
                                                            )
                                                            .trim()}
                                                        </span>
                                                      </li>
                                                    ),
                                                  )}
                                                </ul>
                                              </div>
                                            ))}
                                          </div>
                                        );
                                      }

                                      const lines = part2
                                        .split("\n")
                                        .map((l) => l.trim())
                                        .filter(Boolean);
                                      if (lines.length > 0) {
                                        const rawTitle = lines[0];
                                        const title = rawTitle.replace(
                                          /[\[\]]/g,
                                          "",
                                        );
                                        const items = lines.slice(1);
                                        return (
                                          <div className="bg-white border border-neutral-200/80 rounded-[15px] p-5 space-y-3.5 w-full">
                                            <div className="flex items-center gap-2 border-b border-neutral-200/80 pb-2">
                                              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                                              <h4 className="text-xs font-bold tracking-wider text-neutral-800 uppercase font-sans">
                                                {title}
                                              </h4>
                                            </div>
                                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-[13px] text-neutral-700 font-sans">
                                              {items.map((item, idx) => (
                                                <li
                                                  key={idx}
                                                  className="flex items-center gap-2.5 py-0.5 px-0.5 hover:text-rose-500 transition-colors duration-200"
                                                >
                                                  <span className="w-1 h-1 bg-rose-400 rounded-full shrink-0" />
                                                  <span className="font-medium">
                                                    {item
                                                      .replace(
                                                        /^[•\s\-\*]+/g,
                                                        "",
                                                      )
                                                      .trim()}
                                                  </span>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        );
                                      }
                                      return (
                                        <p className="text-neutral-700 text-[12px] md:text-[13px] leading-relaxed tracking-normal whitespace-pre-line text-justify font-sans">
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
                                  <p className="text-neutral-700 text-[13px] md:text-[14px] leading-relaxed tracking-normal whitespace-pre-line text-justify font-sans">
                                    {desc}
                                  </p>
                                </div>

                                {/* Specs Card */}
                                <div className="bg-white border border-neutral-200/80 rounded-[15px] p-5 space-y-3.5 w-full">
                                  <div className="flex items-center gap-2 border-b border-neutral-200/80 pb-2">
                                    <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                                    <h4 className="text-xs font-bold tracking-wider text-neutral-800 uppercase font-sans">
                                      PROJECT SPECIFICATION
                                    </h4>
                                  </div>
                                  {isGreenery ||
                                  isFlowerPlanet ||
                                  isYeoldaeya ||
                                  isAfternoon ||
                                  isNightflight ? (
                                    <dl className="grid grid-cols-3 gap-y-2.5 text-[14px]">
                                      <dt className="text-neutral-500 col-span-1 font-medium">
                                        장소
                                      </dt>
                                      <dd className="text-neutral-900 col-span-2 font-medium font-sans relative -left-[10px]">
                                        {isGreenery
                                          ? "KT&G 상상마당 부산 3F LIVE HALL"
                                          : isFlowerPlanet
                                            ? "KT&G 상상마당 부산 3F LIVE HALL"
                                            : isYeoldaeya
                                              ? "KT&G 상상마당 부산 13F 루프탑"
                                              : isAfternoon
                                                ? "파나카 F (Panaca F)"
                                                : isNightflight
                                                  ? "김해 하라식당 루프탑"
                                                  : project.location || ""}
                                      </dd>

                                      <dt className="text-neutral-500 col-span-1 font-medium">
                                        연도
                                      </dt>
                                      <dd className="text-neutral-900 col-span-2 font-mono font-bold relative -left-[10px]">
                                        {isGreenery
                                          ? "2023"
                                          : isFlowerPlanet || isYeoldaeya
                                            ? "2022"
                                            : isAfternoon || isNightflight
                                              ? "2021"
                                              : project.year || ""}
                                      </dd>

                                      {(isAfternoon ||
                                        isNightflight ||
                                        project.support) && (
                                        <>
                                          <dt className="text-neutral-500 col-span-1 font-medium">
                                            제작 지원
                                          </dt>
                                          <dd className="text-neutral-900 col-span-2 font-medium font-sans relative -left-[10px]">
                                            {isAfternoon
                                              ? "부산문화재단"
                                              : isNightflight
                                                ? "경남음악창작소"
                                                : project.support || ""}
                                          </dd>
                                        </>
                                      )}

                                      <dt className="text-neutral-500 col-span-1 font-medium self-center">
                                        분야
                                      </dt>
                                      <dd className="text-neutral-900 col-span-2 font-medium flex flex-wrap gap-1.5 items-center font-sans relative -left-[10px]">
                                        {(isGreenery
                                          ? ["상품기획", "공연기획"]
                                          : ["공연기획"]
                                        ).map((item, index) => (
                                          <span
                                            key={index}
                                            className="font-semibold text-neutral-800 bg-neutral-100/80 border border-neutral-200/80 px-2.5 py-0.5 text-[12px] tracking-wide rounded-[6px] shadow-4xs select-none"
                                          >
                                            {item}
                                          </span>
                                        ))}
                                      </dd>

                                      <dt className="text-neutral-500 col-span-1 font-medium self-center">
                                        기여도
                                      </dt>
                                      <dd className="text-neutral-900 col-span-2 font-medium flex items-center gap-3 relative -left-[10px]">
                                        <span className="font-mono font-bold text-neutral-800 text-[14px] shrink-0 select-none">
                                          70%
                                        </span>
                                        <div className="w-24 bg-neutral-200 h-1.5 rounded-full overflow-hidden inline-block relative shrink-0">
                                          <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "70%" }}
                                            transition={{
                                              duration: 0.8,
                                              ease: "easeOut",
                                            }}
                                            className="bg-neutral-800 h-full rounded-full"
                                          />
                                        </div>
                                      </dd>

                                      <dt className="text-neutral-500 col-span-1 font-medium pt-1">
                                        담당 업무
                                      </dt>
                                      <dd className="col-span-2 space-y-2 pt-1 font-sans relative -left-[10px]">
                                        {(isGreenery
                                          ? [
                                              {
                                                role: "기획",
                                                desc: "텀블벅 프로젝트 기획",
                                              },
                                              {
                                                role: "섭외",
                                                desc: "출판사, 협력 업체 섭외",
                                              },
                                              {
                                                role: "홍보",
                                                desc: "오프라인 워크숍 기획, 온라인 마케팅",
                                              },
                                              {
                                                role: "제작",
                                                desc: "굿즈제작, 앨범 인디자인, 공연 홍보물 제작",
                                              },
                                              {
                                                role: "운영",
                                                desc: "전체 프로젝트 운영",
                                              },
                                            ]
                                          : isFlowerPlanet
                                            ? [
                                                {
                                                  role: "기획",
                                                  desc: "기획서 작성 및 공연 전체 컨셉 수립",
                                                },
                                                {
                                                  role: "섭외",
                                                  desc: "콜라보레이션 아티스트 및 공연장 조율",
                                                },
                                                {
                                                  role: "홍보",
                                                  desc: "SNS 마케팅 전략 수립 및 홍보 영상 기획",
                                                },
                                                {
                                                  role: "제작",
                                                  desc: "포스터, 굿즈 및 홍보 비주얼 에셋 제작 총괄",
                                                },
                                                {
                                                  role: "운영",
                                                  desc: "공연 당일 타임테이블 관리 및 현장 총괄 운영",
                                                },
                                              ]
                                            : isYeoldaeya
                                              ? [
                                                  {
                                                    role: "기획",
                                                    desc: "루프탑 컨셉 기획 및 프로젝트 기획서 작성",
                                                  },
                                                  {
                                                    role: "섭외",
                                                    desc: "아티스트 섭외, 공간 및 연계 프로모션 협의",
                                                  },
                                                  {
                                                    role: "홍보",
                                                    desc: "공식 SNS 온라인 마케팅 및 오프라인 배너 홍보",
                                                  },
                                                  {
                                                    role: "제작",
                                                    desc: "루프탑 연출, 배너 및 공연 홍보 동영상 제작",
                                                  },
                                                  {
                                                    role: "운영",
                                                    desc: "와인/핑거푸드 연계 운영 및 현장 운영",
                                                  },
                                                ]
                                              : isAfternoon
                                                ? [
                                                    {
                                                      role: "기획",
                                                      desc: "기획서 작성, 전체 컨셉 기획",
                                                    },
                                                    {
                                                      role: "섭외",
                                                      desc: "아티스트 및 공연 베뉴 섭외",
                                                    },
                                                    {
                                                      role: "홍보",
                                                      desc: "인스타그램 홍보, 라이브 영상 촬영",
                                                    },
                                                    {
                                                      role: "제작",
                                                      desc: "홍보 영상 제작, 오프라인 디자인 제작",
                                                    },
                                                    {
                                                      role: "운영",
                                                      desc: "현장 운영 및 이슈 관리",
                                                    },
                                                  ]
                                                : isNightflight
                                                  ? [
                                                      {
                                                        role: "기획",
                                                        desc: "전체 공연 기획",
                                                      },
                                                      {
                                                        role: "섭외",
                                                        desc: "아티스트 및 공연 베뉴 섭외",
                                                      },
                                                      {
                                                        role: "홍보",
                                                        desc: "인스타그램 계정 관리 및 홍보",
                                                      },
                                                      {
                                                        role: "제작",
                                                        desc: "홍보 영상 제작, 공연 소품 준비",
                                                      },
                                                      {
                                                        role: "운영",
                                                        desc: "현장 운영 및 이슈 관리",
                                                      },
                                                    ]
                                                  : []
                                        ).map((roleItem, index) => (
                                          <div
                                            key={index}
                                            className="flex gap-2 text-[13px] text-neutral-700"
                                          >
                                            <span className="font-semibold text-rose-500 shrink-0 w-10">
                                              {roleItem.role}
                                            </span>
                                            <span className="leading-relaxed">
                                              {roleItem.desc}
                                            </span>
                                          </div>
                                        ))}
                                      </dd>
                                    </dl>
                                  ) : (
                                    <dl className="grid grid-cols-3 gap-y-2.5 text-xs">
                                      {project.location && (
                                        <>
                                          <dt className="text-neutral-500 col-span-1 font-medium">
                                            장소
                                          </dt>
                                          <dd className="text-neutral-950 col-span-2 font-medium font-sans relative -left-[10px]">
                                            {project.location}
                                          </dd>
                                        </>
                                      )}

                                      {project.support && (
                                        <>
                                          <dt className="text-neutral-500 col-span-1 font-medium">
                                            제작 지원
                                          </dt>
                                          <dd className="text-neutral-900 col-span-2 font-medium font-sans relative -left-[10px]">
                                            {project.support}
                                          </dd>
                                        </>
                                      )}

                                      {project.contribution && (
                                        <>
                                          <dt className="text-neutral-500 col-span-1 font-medium self-center">
                                            기여도
                                          </dt>
                                          <dd className="text-neutral-900 col-span-2 font-medium flex items-center gap-3 relative -left-[10px]">
                                            <span className="font-mono font-bold text-neutral-800 text-xs shrink-0 select-none">
                                              {project.contribution}
                                            </span>
                                            <div className="w-24 bg-neutral-200 h-1.5 rounded-full overflow-hidden inline-block relative shrink-0">
                                              <motion.div
                                                initial={{ width: 0 }}
                                                animate={{
                                                  width: project.contribution,
                                                }}
                                                transition={{
                                                  duration: 0.8,
                                                  ease: "easeOut",
                                                }}
                                                className="bg-neutral-800 h-full rounded-full"
                                              />
                                            </div>
                                          </dd>
                                        </>
                                      )}

                                      <dt className="text-neutral-500 col-span-1 font-medium">
                                        연도
                                      </dt>
                                      <dd className="text-neutral-900 col-span-2 font-mono font-bold relative -left-[10px]">
                                        {project.year}
                                      </dd>

                                      <dt className="text-neutral-500 col-span-1 font-medium self-center">
                                        분야
                                      </dt>
                                      <dd className="text-neutral-900 col-span-2 font-bold flex flex-wrap gap-1.5 items-center font-sans relative -left-[10px]">
                                        {project.title === "페스티벌 운영" ||
                                        project.title === "공연 운영"
                                          ? (project.title === "공연 운영"
                                              ? [
                                                  "하우스",
                                                  "티켓",
                                                  "안내",
                                                  "MD 판매",
                                                  "컴플레인 응대",
                                                ]
                                              : [
                                                  "종합 안내",
                                                  "티켓",
                                                  "F&B",
                                                  "MD 판매",
                                                  "물품보관소",
                                                ]
                                            ).map((item, index) => (
                                              <span
                                                key={index}
                                                className="font-medium text-neutral-800 bg-neutral-50/75 border border-neutral-200/80 px-2.5 py-0.5 text-[11px] tracking-wide rounded-[6px] shadow-4xs select-none"
                                              >
                                                {item}
                                              </span>
                                            ))
                                          : (project.category || "")
                                              .split(",")
                                              .map((cat, index) => (
                                                <span
                                                  key={index}
                                                  className="font-medium text-neutral-800 bg-neutral-50/75 border border-neutral-200/80 px-2.5 py-0.5 text-[11px] tracking-wide rounded-none shadow-4xs select-none"
                                                >
                                                  {formatCategory(cat.trim())}
                                                </span>
                                              ))}
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

                  {slidePage === 2 &&
                    (isGreenery ? (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start animate-fade-in font-sans">
                        {/* Left Column (lg:col-span-6): Metrics & Outcomes */}
                        <div className="lg:col-span-6 space-y-6">
                          <div className="bg-white border border-neutral-200/85 p-5 shadow-3xs rounded-[12px] space-y-4">
                            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-amber-600 rounded-full" />
                                <h3 className="text-[18px] font-black text-neutral-900 tracking-tight uppercase font-sans">
                                  목표 및 성과
                                </h3>
                              </div>
                            </div>
                            <div className="space-y-3.5">
                              {project.results
                                ? project.results.map((result, i) => {
                                    let title = result;
                                    let desc = "";
                                    if (result.includes(" -> ")) {
                                      const parts = result.split(" -> ");
                                      title = parts[0];
                                      desc = parts[1];
                                    }
                                    return (
                                      <div
                                        key={i}
                                        className="border-b border-neutral-50 last:border-none pb-3 mb-3 last:pb-0 last:mb-0"
                                      >
                                        <div className="flex items-start gap-2 mb-1.5 font-sans">
                                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 shrink-0" />
                                          <p className="text-sm md:text-[15px] font-bold text-neutral-950 leading-snug">
                                            {title}
                                          </p>
                                        </div>
                                        {desc && (
                                          <div className="ml-3.5 p-2.5 bg-neutral-50/70 border-l-2 border-amber-400 rounded-[6px] font-sans">
                                            <p className="text-xs sm:text-[13px] font-medium text-neutral-700 leading-relaxed whitespace-pre-line">
                                              {desc}
                                            </p>
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })
                                : null}
                            </div>
                          </div>
                        </div>

                        {/* Right Column (lg:col-span-6): Contents Stack */}
                        <div className="lg:col-span-6 flex flex-col gap-6 md:gap-8 font-sans">
                          {/* 콘텐츠 1 */}
                          <div className="p-5 md:p-6 border border-neutral-200 bg-white shadow-3xs space-y-4 rounded-[15px]">
                            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-emerald-600 rounded-full" />
                                <h3 className="text-[18px] font-black text-neutral-900 tracking-tight uppercase font-sans">
                                  콘텐츠 1 : 책 형태의 EP 앨범 제작
                                </h3>
                              </div>
                            </div>
                            <div className="space-y-3.5 text-sm md:text-[15px] text-neutral-600 font-sans leading-relaxed text-justify">
                              <p>
                                싱어송라이터 이그린의 EP [GREENERY] 발매와
                                연계하여 설계된 책 형태의 음반입니다. 단순
                                소장용으로 전락하기 쉬운 기존 플라스틱 CD
                                패키지의 한계를 보완하고 심미성을 확장하여,
                                손으로 직접 넘겨보며 고품질 화보 가사집을 질감
                                그대로 소장할 수 있도록 제작했습니다.
                              </p>
                              <p>
                                아티스트의 정체성과 음악이 가진 분위기를 오롯이
                                담아낸 한 권의 이야기를 지면 위에 배열하고
                                어울리는 지질과 가공 방식을 적용해 책 형태의
                                피지컬 가치를 높였습니다.
                              </p>
                            </div>

                            {/* Images Grid for Content 1 */}
                            <div className="grid grid-cols-3 gap-4 pt-1">
                              {[
                                project.images?.find((img) => img.includes("img%2051") || img.includes("img 51")) ||
                                  "https://raw.githubusercontent.com/2green-lee/Portfolio/013cde7d59ad00b704b19423085d2b9bfc269884/img%2051.jpg",
                                project.images?.find((img) => img.includes("img%2052") || img.includes("img 52")) ||
                                  "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2052.jpg",
                                project.images?.find((img) => img.includes("img%2056") || img.includes("img 56")) ||
                                  "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2056.jpg",
                              ].map((img, i) => (
                                <div
                                  key={i}
                                  onClick={() => setLightboxImage(img)}
                                  className="group/img bg-neutral-50 border border-neutral-200/80 rounded-[8px] overflow-hidden aspect-[4/3] cursor-zoom-in relative hover:border-emerald-400 hover:shadow-2xs transition-all duration-300"
                                >
                                  <OptimizedImage
                                    src={img}
                                    alt={`책 형태 앨범 이미지 ${i + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-[1.06]"
                                    referrerPolicy="no-referrer"
                                  />
                                  <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/15 transition-colors duration-300 flex items-center justify-center">
                                    <span className="opacity-0 group-hover/img:opacity-100 text-white font-sans text-[10px] font-bold bg-neutral-950/80 px-2.5 py-1 tracking-tight rounded-full transition-opacity duration-300">
                                      자세히 보기
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* 콘텐츠 2 */}
                          <div className="p-5 md:p-6 border border-neutral-200 bg-white shadow-3xs space-y-4 rounded-[15px]">
                            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-teal-500 rounded-full" />
                                <h3 className="text-[18px] font-black text-neutral-900 tracking-tight uppercase font-sans">
                                  콘텐츠 2 : 텀블벅 프로젝트 상품 제작
                                </h3>
                              </div>
                            </div>
                            <div className="space-y-3.5 text-sm md:text-[15px] text-neutral-600 font-sans leading-relaxed text-justify">
                              <p>
                                텀블벅 크라우드 펀딩 한정 패키지로 기획·제작된
                                고유 굿즈입니다. 친환경 패브릭 포스터, 소장용
                                엽서북 등 실물 창작물을 기획하고 인쇄 질감을
                                수려하게 제작하여 펀딩 가치를 실물로 가깝게
                                다가오도록 유도했습니다.
                              </p>
                              <p>
                                실사용성과 장식성을 고루 갖춤으로써 평점 4.9점의
                                만족스러운 후원평을 이끌었으며 크라우드 펀딩
                                프로젝트 흥행에 크게 기여했습니다.
                              </p>
                            </div>

                            {/* Images Grid for Content 2 */}
                            <div className="grid grid-cols-3 gap-4 pt-1">
                              {[
                                project.images?.find((img) => img.includes("img%2054") || img.includes("img 54")) ||
                                  "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2054.jpg",
                                project.images?.find((img) => img.includes("img%2055") || img.includes("img 55")) ||
                                  "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2055.jpg",
                                project.images?.find((img) => img.includes("img%2058") || img.includes("img 58")) ||
                                  "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2058.jpg",
                              ].map((img, i) => (
                                <div
                                  key={i}
                                  onClick={() => setLightboxImage(img)}
                                  className="group/img bg-neutral-50 border border-neutral-200/80 rounded-[8px] overflow-hidden aspect-[4/3] cursor-zoom-in relative hover:border-teal-400 hover:shadow-2xs transition-all duration-300"
                                >
                                  <OptimizedImage
                                    src={img}
                                    alt={`텀블벅 굿즈 이미지 ${i + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-[1.06]"
                                    referrerPolicy="no-referrer"
                                  />
                                  <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/15 transition-colors duration-300 flex items-center justify-center">
                                    <span className="opacity-0 group-hover/img:opacity-100 text-white font-sans text-[10px] font-bold bg-neutral-950/80 px-2.5 py-1 tracking-tight rounded-full transition-opacity duration-300">
                                      자세히 보기
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : isFlowerPlanet ? (
                      <div className="space-y-8 md:space-y-11 animate-fade-in font-sans text-neutral-800">
                        {/* Two Column Layout: Metrics & Outcomes (Left) & Contents Stack (Right) */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
                          {/* Left Column: Metrics & Outcomes */}
                          <div className="bg-white border border-neutral-200/85 p-5 shadow-3xs rounded-[12px] space-y-4">
                            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-amber-600 rounded-full" />
                                <h3 className="text-[18px] font-black text-neutral-900 tracking-tight uppercase">
                                  목표 및 성과
                                </h3>
                              </div>
                            </div>
                            <div className="space-y-3.5">
                              {[
                                {
                                  title:
                                    "지역 음악 씬 활성화 & 아티스트 교류 유치",
                                  desc: "지역 아티스트 '이그린'과 서울 아티스트 '우예린' 콜라보레이션 유치 및 공동 공연 성사",
                                },
                                {
                                  title:
                                    "관객 모객 규모 달성 (공간 수용 인원 100명 타겟)",
                                  desc: "적극적 사전 예매 촉진을 통해 유효 티켓 판매 총 50명 방문 달성",
                                },
                                {
                                  title: "체험 중심 콘텐츠 기획 및 미디어 연출",
                                  desc: "관객 몰입형 '헤나 체험 부스' 현장 운영 및 감성적인 '오프닝 콘셉트 영상' 자체 제작 및 상영",
                                },
                                {
                                  title:
                                    "온라인 홍보 다각화 및 타겟형 프로모션 전략 수립",
                                  desc: "인스타그램 전용 고감도 루틴 홍보 영상 배포 및 '티켓 2+1 이벤트' 프로모션을 통한 사전 모객 극대화",
                                },
                              ].map((item, i) => (
                                <div
                                  key={i}
                                  className="border-b border-neutral-50 last:border-none pb-3 mb-3 last:pb-0 last:mb-0"
                                >
                                  <div className="flex items-start gap-2 mb-1.5">
                                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 shrink-0" />
                                    <p className="text-sm md:text-[15px] font-bold text-neutral-950 leading-snug">
                                      {item.title}
                                    </p>
                                  </div>
                                  <div className="ml-3.5 p-2.5 bg-neutral-50/70 border-l-2 border-amber-400 rounded-[6px]">
                                    <p className="text-sm md:text-[15px] font-medium text-neutral-700 leading-relaxed whitespace-pre-line">
                                      {item.desc}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Right Column: Contents Stack */}
                          <div className="flex flex-col gap-6 md:gap-8">
                            {/* 콘텐츠 1 */}
                            <div className="p-5 md:p-6 border border-neutral-200 bg-white shadow-3xs space-y-4 rounded-[15px]">
                              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                                <div className="flex items-center gap-2">
                                  <span className="w-2 h-2 bg-violet-600 rounded-full" />
                                  <h3 className="text-[18px] font-black text-neutral-900 tracking-tight uppercase">
                                    콘텐츠 1 : 오프닝 영상 제작
                                  </h3>
                                </div>
                              </div>
                              <div className="space-y-3.5 text-sm md:text-[15px] text-neutral-600 font-sans leading-relaxed text-justify">
                                <p>
                                  공연의 시작과 함께 관객들이 ‘Flower
                                  Planet’으로 향하는 여정을 경험할 수 있도록
                                  제작한 오프닝 영상입니다. 공연이 시작되기 전,
                                  관객들이 현실의 공연장을 벗어나 하나의 새로운
                                  행성에 도착한다는 설정을 시각적으로 구현하고자
                                  했습니다.
                                </p>
                                <p>
                                  우주를 배경으로 한 영상 소스와 우주선 파일럿의
                                  교신 음성, 묵직한 서브베이스 사운드를 결합하여
                                  탐험의 시작을 연상시키는 연출을 구성했습니다.
                                </p>
                              </div>

                              <div className="pt-1.5 flex justify-start">
                                <a
                                  href="https://youtu.be/xJMtbbBhi6U"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white font-bold text-[13px] rounded-[10px] shadow-sm transition-all hover:scale-[1.02] focus:ring-2 focus:ring-violet-500/20 active:scale-[0.98]"
                                >
                                  <Play size={13} className="fill-current" />
                                  영상 보러가기
                                </a>
                              </div>

                              {/* Images Grid for Content 1 */}
                              <div className="grid grid-cols-3 gap-4 pt-1">
                                {FLOWER_PLANET_CONTENT_1_IMAGES.map(
                                  (img, i) => (
                                    <div
                                      key={i}
                                      onClick={() => setLightboxImage(img)}
                                      className="group/img bg-neutral-50 border border-neutral-200/80 rounded-[8px] overflow-hidden aspect-[4/3] cursor-zoom-in relative hover:border-violet-400 hover:shadow-2xs transition-all duration-300"
                                    >
                                      <OptimizedImage
                                        src={img}
                                        alt={`오프닝 영상 이미지 ${i + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-[1.06]"
                                        referrerPolicy="no-referrer"
                                      />
                                      <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/15 transition-colors duration-300 flex items-center justify-center">
                                        <span className="opacity-0 group-hover/img:opacity-100 text-white font-sans text-[10px] font-bold bg-neutral-950/80 px-2.5 py-1 tracking-tight rounded-full transition-opacity duration-300">
                                          자세히 보기
                                        </span>
                                      </div>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>

                            {/* 콘텐츠 2 */}
                            <div className="p-5 md:p-6 border border-neutral-200 bg-white shadow-3xs space-y-4 rounded-[15px]">
                              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                                <div className="flex items-center gap-2">
                                  <span className="w-2 h-2 bg-rose-500 rounded-full" />
                                  <h3 className="text-[18px] font-black text-neutral-900 tracking-tight uppercase">
                                    콘텐츠 2 : 헤나 부스 운영
                                  </h3>
                                </div>
                              </div>
                              <p className="text-sm md:text-[15px] text-neutral-600 font-sans leading-relaxed text-justify">
                                공연 콘셉트인 ‘Flower Planet’을 관객이 더욱
                                입체적으로 경험할 수 있도록 기획한 체험형
                                콘텐츠입니다. 관객들이 손목이나 손가락 등에
                                헤나를 새기며 공연의 세계관에 자연스럽게 참여할
                                수 있도록 구성했습니다.
                              </p>

                              {/* Images Grid for Content 2 */}
                              <div className="grid grid-cols-3 gap-4">
                                {FLOWER_PLANET_CONTENT_2_IMAGES.slice(1).map(
                                  (img, i) => (
                                    <div
                                      key={i}
                                      onClick={() => setLightboxImage(img)}
                                      className="group/img bg-neutral-50 border border-neutral-200/80 rounded-[8px] overflow-hidden aspect-[4/3] cursor-zoom-in relative hover:border-rose-400 hover:shadow-2xs transition-all duration-300"
                                    >
                                      <OptimizedImage
                                        src={img}
                                        alt={`헤나 부스 이미지 ${i + 2}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-[1.06]"
                                        referrerPolicy="no-referrer"
                                      />
                                      <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/15 transition-colors duration-300 flex items-center justify-center">
                                        <span className="opacity-0 group-hover/img:opacity-100 text-white font-sans text-[10px] font-bold bg-neutral-950/80 px-2.5 py-1 tracking-tight rounded-full transition-opacity duration-300">
                                          자세히 보기
                                        </span>
                                      </div>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : isYeoldaeya ? (
                      <div className="space-y-8 md:space-y-11 animate-fade-in font-sans text-neutral-800">
                        {/* Two Column Layout: Metrics & Outcomes (Left) & Contents Stack (Right) */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
                          {/* Left Column: Metrics & Outcomes */}
                          <div className="bg-white border border-neutral-200/85 p-5 shadow-3xs rounded-[12px] space-y-4">
                            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-amber-600 rounded-full" />
                                <h3 className="text-[18px] font-black text-neutral-900 tracking-tight uppercase">
                                  목표 및 성과
                                </h3>
                              </div>
                            </div>
                            <div className="space-y-3.5">
                              {[
                                {
                                  title:
                                    "주말 명품 콘텐츠 제공 & 전석 매진 달성",
                                  desc: "시민들이 주말 저녁에 향유할 수 있는 접근성 높은 공연 콘텐츠를 기획 및 제공하여 전석 매진 달성",
                                },
                                {
                                  title:
                                    "루프탑 대관 및 공간·브랜드 연계 프로모션 제공",
                                  desc: "KT&G 상상마당 루프탑 공간 대관 및 와인·핑거푸드 연계 파트너십을 통해 관객 경험 극대화",
                                },
                                {
                                  title:
                                    "온라인 공식 채널 및 홍보 콘텐츠 배포 강화",
                                  desc: "상상마당 부산 및 HAO 공식 인스타그램을 통해 정밀 타겟 홍보 배너와 고감도 무드 릴스 영상을 제작·배포",
                                },
                              ].map((item, i) => (
                                <div
                                  key={i}
                                  className="border-b border-neutral-50 last:border-none pb-3 mb-3 last:pb-0 last:mb-0"
                                >
                                  <div className="flex items-start gap-2 mb-1.5">
                                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 shrink-0" />
                                    <p className="text-sm md:text-[15px] font-bold text-neutral-950 leading-snug">
                                      {item.title}
                                    </p>
                                  </div>
                                  <div className="ml-3.5 p-2.5 bg-neutral-50/70 border-l-2 border-amber-400 rounded-[6px]">
                                    <p className="text-sm md:text-[15px] font-medium text-neutral-700 leading-relaxed whitespace-pre-line">
                                      {item.desc}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Right Column: Contents Stack */}
                          <div className="flex flex-col gap-6 md:gap-8">
                            {/* 콘텐츠 1 */}
                            <div className="p-5 md:p-6 border border-neutral-200 bg-white shadow-3xs space-y-4 rounded-[15px]">
                              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                                <div className="flex items-center gap-2">
                                  <span className="w-2 h-2 bg-violet-600 rounded-full" />
                                  <h3 className="text-[18px] font-black text-neutral-900 tracking-tight uppercase">
                                    콘텐츠 1 : 루프탑 연출 및 와인/푸드 프로모션
                                  </h3>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <p className="text-sm md:text-[15px] text-neutral-600 font-sans leading-relaxed text-justify">
                                  도심 속 건물 옥상(KT&G 상상마당 부산 13F
                                  루프탑)이라는 이색적인 공간을 활용해, 관객들이
                                  여름 밤의 여유와 휴식을 즐길 수 있는 공연
                                  환경을 조성했습니다.
                                </p>
                                <p className="text-sm md:text-[15px] text-neutral-600 font-sans leading-relaxed text-justify">
                                  또한 상상마당 부산에 입점한 업체들과 협업하여
                                  와인과 핑거푸드를 제공함으로써, 음악과 함께
                                  다양한 즐길 거리를 경험할 수 있는 콘텐츠를
                                  기획했습니다.
                                </p>
                              </div>

                              {/* Images Grid for Content 1 */}
                              {project.images && project.images.length > 0 ? (
                                <div className="grid grid-cols-2 gap-4">
                                  {project.images.slice(0, 4).map((img, i) => (
                                    <div
                                      key={i}
                                      onClick={() => setLightboxImage(img)}
                                      className="group/img bg-neutral-50 border border-neutral-200/80 rounded-[8px] overflow-hidden aspect-[4/3] cursor-zoom-in relative hover:border-violet-400 hover:shadow-2xs transition-all duration-300"
                                    >
                                      <OptimizedImage
                                        src={img}
                                        alt={`루프탑 현장 이미지 ${i + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-[1.06]"
                                        referrerPolicy="no-referrer"
                                      />
                                      <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/15 transition-colors duration-300 flex items-center justify-center">
                                        <span className="opacity-0 group-hover/img:opacity-100 text-white font-sans text-[10px] font-bold bg-neutral-950/80 px-2.5 py-1 tracking-tight rounded-full transition-opacity duration-300">
                                          자세히 보기
                                        </span>
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
                                  <span className="w-2 h-2 bg-rose-500 rounded-full" />
                                  <h3 className="text-[18px] font-black text-neutral-900 tracking-tight uppercase">
                                    콘텐츠 2 : 협찬 경품 이벤트
                                  </h3>
                                </div>
                              </div>
                              <p className="text-sm md:text-[15px] text-neutral-600 font-sans leading-relaxed text-justify">
                                지역 브랜드 및 협찬사와 협업하여 외식권, 호텔
                                숙박권, 와인 등을 경품으로 제공하는 추첨
                                이벤트를 기획·운영했습니다. 공연 관람 외에도
                                관객들이 적극적으로 참여할 수 있는 콘텐츠를
                                마련하여 현장 분위기와 만족도를 높였습니다.
                              </p>

                              {/* Images Grid for Content 2 */}
                              {project.images && project.images.length > 4 ? (
                                <div className="grid grid-cols-2 gap-4">
                                  {project.images.slice(4, 8).map((img, i) => (
                                    <div
                                      key={i}
                                      onClick={() => setLightboxImage(img)}
                                      className="group/img bg-neutral-50 border border-neutral-200/80 rounded-[8px] overflow-hidden aspect-[4/3] cursor-zoom-in relative hover:border-rose-400 hover:shadow-2xs transition-all duration-300"
                                    >
                                      <OptimizedImage
                                        src={img}
                                        alt={`홍보 미디어 이미지 ${i + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-[1.06]"
                                        referrerPolicy="no-referrer"
                                      />
                                      <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/15 transition-colors duration-300 flex items-center justify-center">
                                        <span className="opacity-0 group-hover/img:opacity-100 text-white font-sans text-[10px] font-bold bg-neutral-950/80 px-2.5 py-1 tracking-tight rounded-full transition-opacity duration-300">
                                          자세히 보기
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : isAfternoon ? (
                      <div className="space-y-8 md:space-y-11 animate-fade-in font-sans text-neutral-850">
                        {/* Two Column Layout: Metrics & Outcomes (Left) & Contents Stack (Right) */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
                          {/* Left Column: Metrics & Outcomes */}
                          <div className="bg-white border border-neutral-200/85 p-5 shadow-3xs rounded-[12px] space-y-4">
                            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-amber-600 rounded-full" />
                                <h3 className="text-[18px] font-black text-neutral-900 tracking-tight uppercase">
                                  목표 및 성과
                                </h3>
                              </div>
                            </div>
                            <div className="space-y-3.5">
                              {project.results
                                ? project.results.map((result, i) => {
                                    let title = result;
                                    let desc = "";
                                    if (result.includes(" -> ")) {
                                      const parts = result.split(" -> ");
                                      title = parts[0];
                                      desc = parts[1];
                                    }
                                    return (
                                      <div
                                        key={i}
                                        className="border-b border-neutral-50 last:border-none pb-3 mb-3 last:pb-0 last:mb-0"
                                      >
                                        <div className="flex items-start gap-2 mb-1.5">
                                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 shrink-0" />
                                          <p className="text-sm md:text-[15px] font-bold text-neutral-950 leading-snug">
                                            {title}
                                          </p>
                                        </div>
                                        {desc && (
                                          <div className="ml-3.5 p-2.5 bg-neutral-50/70 border-l-2 border-amber-400 rounded-[6px]">
                                            <p className="text-sm md:text-[15px] font-medium text-neutral-700 leading-relaxed whitespace-pre-line">
                                              {desc}
                                            </p>
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })
                                : null}
                            </div>
                          </div>

                          {/* Right Column: Contents Stack */}
                          <div className="flex flex-col gap-6 md:gap-8">
                            {/* 콘텐츠 1 */}
                            <div className="p-5 md:p-6 border border-neutral-200 bg-white shadow-3xs space-y-4 rounded-[15px]">
                              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                                <div className="flex items-center gap-2">
                                  <span className="w-2 h-2 bg-violet-600 rounded-full" />
                                  <h3 className="text-[18px] font-black text-neutral-900 tracking-tight uppercase">
                                    콘텐츠 1 : 공간 특화 힐링 콘셉트 및 음료
                                    패키지 기획
                                  </h3>
                                </div>
                              </div>
                              <p className="text-sm md:text-[15px] text-neutral-600 font-sans leading-relaxed text-justify">
                                도심 속 소음을 벗어날 수 있는 복합문화공간
                                파나카 F의 탁 트인 야외 테라스 지리적 특징을
                                적극 반영하여, "나른한 오후를 채우는 향기로운
                                일탈"이라는 힐링 콘셉트를 명확히 기획했습니다.
                                브랜드 커피와 특색 디저트를 공연 관람 티켓 연계
                                패키지로 독자 구성해, 단순한 감상을 넘어 미각과
                                청각을 완벽히 아우르는 프리미엄 가치 제공에
                                성공했습니다.
                              </p>

                              {/* Image 1 */}
                              {project.images && project.images.length > 0 ? (
                                <div className="grid grid-cols-2 gap-4">
                                  {project.images.slice(0, 1).map((img, i) => (
                                    <div
                                      key={i}
                                      onClick={() => setLightboxImage(img)}
                                      className="group/img bg-neutral-50 border border-neutral-200/80 rounded-[8px] overflow-hidden aspect-[4/3] cursor-zoom-in relative hover:border-violet-400 hover:shadow-2xs transition-all duration-300 col-span-2"
                                    >
                                      <OptimizedImage
                                        src={img}
                                        alt="야외 테라스 현장 이미지"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-[1.06]"
                                        referrerPolicy="no-referrer"
                                      />
                                      <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/15 transition-colors duration-300 flex items-center justify-center">
                                        <span className="opacity-0 group-hover/img:opacity-100 text-white font-sans text-[10px] font-bold bg-neutral-950/80 px-2.5 py-1 tracking-tight rounded-full transition-opacity duration-305">
                                          자세히 보기
                                        </span>
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
                                  <span className="w-2 h-2 bg-rose-500 rounded-full" />
                                  <h3 className="text-[18px] font-black text-neutral-900 tracking-tight uppercase">
                                    콘텐츠 2 : 야외 하우스 동선 수립 및 고강도
                                    매니아층 모객
                                  </h3>
                                </div>
                              </div>
                              <p className="text-sm md:text-[15px] text-neutral-600 font-sans leading-relaxed text-justify">
                                야외 테라스 특성상 나타날 수 있는 음향 손실 및
                                소음 유입 한계를 선제 제어하기 위해 고선명 소형
                                시스템 셋업을 주도하고, 일관된 무드 연출에
                                뛰어난 인디 아티스트 이그린 및 감성 재즈
                                라인업을 매칭했습니다. 소형 규모 타겟에 완전히
                                집중한 감각적 SNS 모바일 마케팅 및 오프라인 배너
                                홍보를 전개하여 완전 모객 및 매진을
                                성취했습니다.
                              </p>

                              {/* Image 2 */}
                              {project.images && project.images.length > 1 ? (
                                <div className="grid grid-cols-2 gap-4">
                                  {project.images.slice(1, 2).map((img, i) => (
                                    <div
                                      key={i}
                                      onClick={() => setLightboxImage(img)}
                                      className="group/img bg-neutral-50 border border-neutral-200/80 rounded-[8px] overflow-hidden aspect-[4/3] cursor-zoom-in relative hover:border-rose-400 hover:shadow-2xs transition-all duration-300 col-span-2"
                                    >
                                      <OptimizedImage
                                        src={img}
                                        alt="공연 포스터 및 홍보 이미지"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-[1.06]"
                                        referrerPolicy="no-referrer"
                                      />
                                      <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/15 transition-colors duration-300 flex items-center justify-center">
                                        <span className="opacity-0 group-hover/img:opacity-100 text-white font-sans text-[10px] font-bold bg-neutral-950/80 px-2.5 py-1 tracking-tight rounded-full transition-opacity duration-305">
                                          자세히 보기
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : isNightflight ? (
                      <div className="space-y-8 md:space-y-11 animate-fade-in font-sans text-neutral-850">
                        {/* Two Column Layout: Metrics & Outcomes (Left) & Contents Stack (Right) */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
                          {/* Left Column: Metrics & Outcomes */}
                          <div className="bg-white border border-neutral-200/85 p-5 shadow-3xs rounded-[12px] space-y-4">
                            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-amber-600 rounded-full" />
                                <h3 className="text-[18px] font-black text-neutral-900 tracking-tight uppercase">
                                  목표 및 성과
                                </h3>
                              </div>
                            </div>
                            <div className="space-y-3.5">
                              {project.results
                                ? project.results.map((result, i) => {
                                    let title = result;
                                    let desc = "";
                                    if (result.includes(" -> ")) {
                                      const parts = result.split(" -> ");
                                      title = parts[0];
                                      desc = parts[1];
                                    }
                                    return (
                                      <div
                                        key={i}
                                        className="border-b border-neutral-50 last:border-none pb-3 mb-3 last:pb-0 last:mb-0"
                                      >
                                        <div className="flex items-start gap-2 mb-1.5">
                                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 shrink-0" />
                                          <p className="text-sm md:text-[15px] font-bold text-neutral-950 leading-snug">
                                            {title}
                                          </p>
                                        </div>
                                        {desc && (
                                          <div className="ml-3.5 p-2.5 bg-neutral-50/70 border-l-2 border-amber-400 rounded-[6px]">
                                            <p className="text-sm md:text-[15px] font-medium text-neutral-700 leading-relaxed whitespace-pre-line">
                                              {desc}
                                            </p>
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })
                                : null}
                            </div>
                          </div>

                          {/* Right Column: Contents Stack */}
                          <div className="flex flex-col gap-6 md:gap-8">
                            {/* 콘텐츠 1 */}
                            <div className="p-5 md:p-6 border border-neutral-200 bg-white shadow-3xs space-y-4 rounded-[15px]">
                              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                                <div className="flex items-center gap-2">
                                  <span className="w-2 h-2 bg-violet-600 rounded-full" />
                                  <h3 className="text-[18px] font-black text-neutral-900 tracking-tight uppercase">
                                    콘텐츠 1 : 문학 콘셉트 기반 옴니버스 연출 및
                                    프로젝션 맵핑
                                  </h3>
                                </div>
                              </div>
                              <p className="text-sm md:text-[15px] text-neutral-600 font-sans leading-relaxed text-justify">
                                '야간비행'은 늦은 밤 비행을 떠나는 여행자의
                                시선에서 착안하여, 관객이 일상에서 잠시 벗어나
                                음악과 낭만을 느낄 수 있는 기획 공연으로
                                연출했습니다. 김해 하라식당 루프탑 특유의 열린
                                구조와 하늘을 마주할 수 있는 구조적 이점을
                                반영하여 감성적인 조명 연출과 공간 디자인을
                                접목했고, 관객들이 완전히 몰입하여 음악과 밤의
                                평화로움을 경험할 수 있는 도심 속 힐링 공간을
                                성공적으로 완수했습니다.
                              </p>

                              {/* Image 1 */}
                              {project.images && project.images.length > 0 ? (
                                <div className="grid grid-cols-2 gap-4">
                                  {project.images.slice(0, 1).map((img, i) => (
                                    <div
                                      key={i}
                                      onClick={() => setLightboxImage(img)}
                                      className="group/img bg-neutral-50 border border-neutral-200/80 rounded-[8px] overflow-hidden aspect-[4/3] cursor-zoom-in relative hover:border-violet-400 hover:shadow-2xs transition-all duration-300 col-span-2"
                                    >
                                      <OptimizedImage
                                        src={img}
                                        alt="야간비행 무대 연출 이미지"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-[1.06]"
                                        referrerPolicy="no-referrer"
                                      />
                                      <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/15 transition-colors duration-300 flex items-center justify-center">
                                        <span className="opacity-0 group-hover/img:opacity-100 text-white font-sans text-[10px] font-bold bg-neutral-950/80 px-2.5 py-1 tracking-tight rounded-full transition-opacity duration-305">
                                          자세히 보기
                                        </span>
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
                                  <span className="w-2 h-2 bg-rose-500 rounded-full" />
                                  <h3 className="text-[18px] font-black text-neutral-900 tracking-tight uppercase">
                                    콘텐츠 2 : 낭독 라이브 기획 및 안전형 심야
                                    하우스 운영
                                  </h3>
                                </div>
                              </div>
                              <p className="text-sm md:text-[15px] text-neutral-600 font-sans leading-relaxed text-justify">
                                낭독과 앰비언트 비주얼 사운드가 결합한 실험적
                                소형 무대를 실현하기 위해 완벽한 연출 큐시트를
                                수립하고, 고감도의 전용 한정 포스터 디자인을
                                기획/감수하여 SNS 공유를 자연스럽게
                                유입시켰습니다. 극도로 차분함과 암전이 동반되는
                                공연의 물리적 한계를 선제 통제하기 위해, 하우스
                                크루의 신속 비상 통로 가이드라인을 확보해 무사고
                                운영을 이끌었습니다.
                              </p>

                              {/* Image 2 */}
                              {project.images && project.images.length > 1 ? (
                                <div className="grid grid-cols-2 gap-4">
                                  {project.images.slice(1, 2).map((img, i) => (
                                    <div
                                      key={i}
                                      onClick={() => setLightboxImage(img)}
                                      className="group/img bg-neutral-50 border border-neutral-200/80 rounded-[8px] overflow-hidden aspect-[4/3] cursor-zoom-in relative hover:border-rose-400 hover:shadow-2xs transition-all duration-300 col-span-2"
                                    >
                                      <OptimizedImage
                                        src={img}
                                        alt="포스터 및 하우스 이미지"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-[1.06]"
                                        referrerPolicy="no-referrer"
                                      />
                                      <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/15 transition-colors duration-300 flex items-center justify-center">
                                        <span className="opacity-0 group-hover/img:opacity-100 text-white font-sans text-[10px] font-bold bg-neutral-950/80 px-2.5 py-1 tracking-tight rounded-full transition-opacity duration-305">
                                          자세히 보기
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : null}
                            </div>
                          </div>
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
                              {(
                                project.festivalProjects2 || [
                                  "2024 WATERBOMB 서울",
                                  "2024 WATERBOMB 대전",
                                  "2024 WATERBOMB 대구",
                                  "2024 WATERBOMB 부산",
                                  "2024 WATERBOMB 인천",
                                  "2024 WATERBOMB 수원",
                                  "2024 WATERBOMB 여수",
                                ]
                              ).map((item, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-center gap-2.5 transition-colors duration-200 hover:text-rose-500"
                                >
                                  <span className="w-1.5 h-1.5 bg-rose-400 rounded-full shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Photos - Horizontal rectangles - 2x2 Grid Layout */}
                          <div className="grid grid-cols-2 gap-3 md:gap-4">
                            {(() => {
                              const currentImages = project.ticketImages && project.ticketImages.length > 0
                                ? project.ticketImages
                                : [
                                    "https://raw.githubusercontent.com/2green-lee/Portfolio/56c4f5445b717b306b75e71ace91b475a1d6d8cf/ticket%201.jpeg",
                                    "https://raw.githubusercontent.com/2green-lee/Portfolio/56c4f5445b717b306b75e71ace91b475a1d6d8cf/ticket%202.jpeg",
                                    "https://raw.githubusercontent.com/2green-lee/Portfolio/26d00476109ec84b3d9f253c464088f278d4051b/ticket3.jpg",
                                    "https://raw.githubusercontent.com/2green-lee/Portfolio/26d00476109ec84b3d9f253c464088f278d4051b/ticket4.jpg"
                                  ];
                              return currentImages.map((imgUrl, imgIdx) => (
                                <div
                                  key={imgIdx}
                                  onClick={() => {
                                    setLightboxImages(currentImages);
                                    setLightboxIndex(imgIdx);
                                  }}
                                  className="relative aspect-[16/9] w-full overflow-hidden rounded-[15px] border border-neutral-200/60 shadow-3xs group/photo cursor-zoom-in hover:brightness-95 transition-all"
                                  title="클릭하여 확대보기"
                                >
                                  <OptimizedImage
                                    src={imgUrl}
                                    alt={`Ticket operation step image ${imgIdx + 1}`}
                                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/photo:scale-105"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                              ));
                            })()}
                          </div>
                        </div>

                        {/* Right Column (lg:col-span-7): 3-Step Process in 3 Rows */}
                        <div className="lg:col-span-7 space-y-5">
                          {(
                            project.processTicket || DEFAULT_FESTIVAL_TICKET
                          ).map((step, sIdx) => (
                            <div
                              key={sIdx}
                              className="p-5 md:p-6 border border-neutral-200/85 bg-white hover:border-rose-400/60 transition-all rounded-[15px] shadow-3xs flex flex-col gap-3 font-sans"
                            >
                              <div className="flex items-center justify-between border-b border-neutral-100 pb-2.5">
                                <h4 className="text-[15px] font-black text-neutral-900 flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                                  {step.phase}
                                </h4>
                                <span className="text-[10px] font-mono text-neutral-400 font-bold bg-neutral-50 px-2 py-0.5 rounded-md border border-neutral-100">
                                  {step.label ||
                                    (sIdx === 0
                                      ? "PRE-EVENT"
                                      : sIdx === 1
                                        ? "ON-SITE"
                                        : "POST-EVENT")}
                                </span>
                              </div>
                              <ul className="space-y-3.5 text-xs sm:text-[13px] text-neutral-750 font-sans">
                                {step.items.map((item, iIdx) => (
                                  <li
                                    key={iIdx}
                                    className={`leading-relaxed ${iIdx > 0 ? "border-t border-neutral-100/60 pt-3" : ""}`}
                                  >
                                    <strong className="text-neutral-900 block font-bold mb-0.5">
                                      {item.title}
                                    </strong>
                                    <span className="text-neutral-650 font-sans">
                                      {item.body}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : isConcert ? (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-11 items-start animate-fade-in font-sans">
                        {/* Left Column (lg:col-span-5): Curated Concert Performances and Small posters */}
                        <div className="lg:col-span-5 space-y-6">
                          <div className="p-5 md:p-6 border border-neutral-200/85 bg-white hover:border-rose-400/60 transition-all rounded-[15px] shadow-3xs flex flex-col gap-3 font-sans">
                            <p className="text-[15px] font-black uppercase text-neutral-900 tracking-wider font-sans flex items-center gap-2 border-b border-neutral-100 pb-2.5">
                              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0" />
                              공연 기획 및 운영 실적
                            </p>
                            <ul className="space-y-2.5 pl-1.5 text-[13px] text-neutral-750 font-sans font-medium pb-1">
                              {(
                                project.concertProjects || [
                                  "GREENERY 단독공연",
                                  "Flower Planet",
                                  "열대야",
                                  "오후의 향기",
                                  "야간비행",
                                ]
                              ).map((item, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-center gap-2.5 transition-colors duration-200 hover:text-rose-500"
                                >
                                  <span className="w-1.5 h-1.5 bg-rose-400 rounded-full shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* 4 Photos - Grid of Concert Posters */}
                          <div className="grid grid-cols-2 gap-4">
                            {CREATIVE_CONCERT_POSTERS.map(
                              (poster, index) => (
                                <div
                                  key={index}
                                  className="relative aspect-[3/4] w-full overflow-hidden rounded-[15px] border border-neutral-200/60 shadow-3xs group/photo cursor-zoom-in"
                                  onClick={() => setLightboxImage(poster.src)}
                                >
                                  <OptimizedImage
                                    src={poster.src}
                                    alt={poster.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover/photo:scale-105"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                              ),
                            )}
                          </div>
                        </div>

                        {/* Right Column (lg:col-span-7): Custom 3-step Concert Process */}
                        <div className="lg:col-span-7 space-y-5">
                          {(
                            project.processConcert || [
                              {
                                phase: "공연 기획 및 총괄",
                                items: [
                                  {
                                    title: "공연 컨셉 및 프로그램 기획",
                                    body: "각 공연의 타이틀(열대야, 야간비행 등)에 맞는 무대 컨셉 디자인",
                                  },
                                ],
                              },
                              {
                                phase: "비주얼 디렉팅 및 마케팅",
                                items: [
                                  {
                                    title: "홍보물 기획 및 디자인",
                                    body: "일러스트레이터, 미리캔버스 등을 활용해 공연 포스터, 웹 플라이어, SNS 홍보물 등 디자인 기획 및 제작",
                                  },
                                  {
                                    title: "영상 콘텐츠 제작",
                                    body: "프리미어 프로를 활용해 아티스트 인터뷰, 공연 홍보 숏츠 등 부가 영상 콘텐츠 제작",
                                  },
                                ],
                              },
                              {
                                phase: "무대 연출 및 현장 진행",
                                items: [
                                  {
                                    title: "현장 연출 및 큐시트 관리",
                                    body: "전체 공연 진행 큐시트 작성 및 음향/조명 스태프와의 현장 커뮤니케이션",
                                  },
                                  {
                                    title: "참여진 매니지먼트",
                                    body: "참여 아티스트 및 밴드 세션들과 커뮤니케이션, 무대 동선 및 대기실 관리",
                                  },
                                  {
                                    title: "수익금 정산 및 마감",
                                    body: "티켓 판매 및 펀딩 수익금 최종 정산, 대관료 및 세션 페이 지급 등 프로젝트 정산",
                                  },
                                ],
                              },
                            ]
                          ).map((step, sIdx) => (
                            <div
                              key={sIdx}
                              className="p-5 md:p-6 border border-neutral-200/85 bg-white hover:border-rose-400/60 transition-all rounded-[15px] shadow-3xs flex flex-col gap-3 font-sans"
                            >
                              <div className="flex items-center justify-between border-b border-neutral-100 pb-2.5">
                                <h4 className="text-[15px] font-black text-neutral-900 flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                                  {step.phase}
                                </h4>
                                <span className="text-[10px] font-mono text-neutral-400 font-bold bg-neutral-50 px-2 py-0.5 rounded-md border border-neutral-100 uppercase tracking-widest font-black">
                                  STAGE 0{sIdx + 1}
                                </span>
                              </div>
                              <ul className="space-y-3.5 text-xs sm:text-[13px] text-neutral-750 font-sans">
                                {step.items.map((item, iIdx) => (
                                  <li
                                    key={iIdx}
                                    className={`leading-relaxed ${iIdx > 0 ? "border-t border-neutral-100/60 pt-3" : ""}`}
                                  >
                                    <strong className="text-neutral-900 block font-bold mb-0.5">
                                      {item.title}
                                    </strong>
                                    <span className="text-neutral-650 font-sans">
                                      {item.body}
                                    </span>
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
                            <span className="text-[9px] font-mono bg-[#E0115F] text-white px-1.5 py-0.5 rounded-none uppercase tracking-wider font-bold">
                              Ticket & Role
                            </span>
                            <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider">
                              담당 역할 및 실행 업무
                            </h3>
                          </div>
                          {project.role ? (
                            <div className="border border-neutral-200/80 p-6 bg-white shadow-3xs rounded-none">
                              <div className="flex flex-col items-start gap-1.5 mb-4">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="w-2 h-2 bg-[#E0115F] rounded-full shrink-0" />
                                  <span className="text-[11px] font-mono text-neutral-400 font-bold uppercase tracking-wide">
                                    역할 및 분장
                                  </span>
                                </div>
                                <div className="flex flex-col items-start gap-1.5 pl-4">
                                  {project.role.title
                                    .split(",")
                                    .map((t, idx) => (
                                      <span
                                        key={idx}
                                        className="inline-block font-extrabold text-rose-600 bg-rose-50/60 border border-rose-500/10 px-2.5 py-0.5 text-xs rounded-[6px] text-left select-none"
                                      >
                                        {t.trim()}
                                      </span>
                                    ))}
                                </div>
                              </div>
                              <ul
                                className="space-y-[35px]"
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "35px",
                                }}
                              >
                                {project.role.items.map((item, i) => {
                                  const anonymity = item.includes(": ");
                                  const [label, desc] = anonymity
                                    ? item.split(": ")
                                    : [null, item];
                                  return (
                                    <li
                                      key={i}
                                      className="text-xs sm:text-[13px] text-neutral-800 leading-relaxed flex items-start gap-2.5"
                                    >
                                      <span className="mt-2 w-1.5 h-1.5 bg-neutral-400 rounded-full shrink-0" />
                                      <span className="text-neutral-900">
                                        {label ? (
                                          <>
                                            <strong className="text-neutral-950 font-bold">
                                              {label}:{" "}
                                            </strong>
                                            <span className="font-normal text-neutral-800">
                                              {desc}
                                            </span>
                                          </>
                                        ) : (
                                          <span className="font-normal text-neutral-800">
                                            {desc}
                                          </span>
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
                            <span className="text-[9px] font-mono bg-black text-white px-1.5 py-0.5 rounded-none uppercase tracking-wider font-bold">
                              Preparation
                            </span>
                            <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider">
                              사전 기획 및 운영 설계
                            </h3>
                          </div>
                          {project.process && project.process[0] ? (
                            <div className="p-6 border border-neutral-200 bg-white shadow-3xs space-y-4 rounded-none">
                              <h4 className="text-sm font-bold text-neutral-900 flex justify-between items-center border-b border-neutral-100 pb-2">
                                <span className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 bg-black rounded-full" />
                                  {project.process[0].phase}
                                </span>
                                <span className="text-[9px] font-mono text-neutral-400 font-bold">
                                  STEP 01
                                </span>
                              </h4>
                              <ul className="space-y-3">
                                {project.process[0].items.map((item, j) => (
                                  <li
                                    key={j}
                                    className="text-xs sm:text-[13px] text-neutral-750 flex items-start gap-2 leading-relaxed"
                                  >
                                    <span className="mt-1.5 w-1 h-1 bg-neutral-400 rounded-full shrink-0" />
                                    <span className="font-normal text-neutral-800">
                                      {item}
                                    </span>
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
                    ))}

                  {slidePage === 3 &&
                    (isGreenery ? (
                      <div className="w-full max-w-4xl mx-auto animate-fade-in font-sans flex flex-col items-center justify-center gap-6">
                        {/* Book Information Card */}
                        <div className="w-full max-w-3xl bg-white border border-neutral-200/80 rounded-[16px] p-5 md:p-6 shadow-3xs flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                          {/* Book cover thumbnail */}
                          <div className="relative w-24 h-24 bg-white border border-neutral-200/80 rounded-[8px] flex items-center justify-center overflow-hidden shrink-0 shadow-3xs">
                            <OptimizedImage
                              src="https://raw.githubusercontent.com/2green-lee/Portfolio/bcd31e69646986fdc534bc4332df67bef5c6002b/greenery%20%E1%84%8E%E1%85%A2%E1%86%A8%E1%84%91%E1%85%AD%E1%84%8C%E1%85%B5.jpg"
                              alt="GREENERY Book Cover"
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          {/* Info fields */}
                          <div className="flex-1 space-y-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded-[4px] border border-emerald-250 font-sans">
                                  도서 정보
                                </span>
                              </div>
                              <h3 className="text-lg font-bold text-neutral-900 mt-1 flex items-baseline gap-2">
                                <span>GREENERY</span>
                                <span className="text-xs font-normal text-neutral-500">저자. 이그린</span>
                              </h3>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-[12px] text-neutral-650">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-neutral-400 w-16 shrink-0">ISBN</span>
                                <span className="font-mono text-neutral-800">9791197648403</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-neutral-400 w-16 shrink-0">출판사</span>
                                <span className="text-neutral-800">이야기모란단</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-neutral-400 w-16 shrink-0">발행일자</span>
                                <span className="text-neutral-800">2023년 12월 01일</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-neutral-400 w-16 shrink-0">쪽수</span>
                                <span className="text-neutral-800">116쪽</span>
                              </div>

                            </div>
                          </div>

                          {/* Purchase Link CTA */}
                          <div className="w-full sm:w-auto shrink-0 self-stretch sm:self-center flex sm:flex-col items-stretch justify-center">
                            <a
                              href="https://product.kyobobook.co.kr/detail/S000211970709"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-sans text-xs font-bold rounded-[8px] shadow-sm hover:shadow transition-all duration-200"
                            >
                              <span>교보문고 구매링크</span>
                              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                            </a>
                          </div>
                        </div>

                        <div
                          className="w-full max-w-3xl overflow-hidden border border-neutral-200 bg-white hover:border-neutral-300 shadow-sm transition-all duration-300 rounded-[12px] cursor-zoom-in group/review relative"
                          onClick={() =>
                            setLightboxImage(
                              "https://raw.githubusercontent.com/2green-lee/Portfolio/45b33670a58a6610d7f27fdb5264d34028edfd28/review.png",
                            )
                          }
                        >
                          <OptimizedImage
                            src="https://raw.githubusercontent.com/2green-lee/Portfolio/45b33670a58a6610d7f27fdb5264d34028edfd28/review.png"
                            alt="GREENERY 리뷰 및 후기"
                            className="w-full h-auto select-none transition-transform duration-500 group-hover/review:scale-[1.01]"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover/review:bg-black/5 transition-colors duration-300 flex items-center justify-center">
                            <span className="opacity-0 group-hover/review:opacity-100 text-white font-sans text-xs font-bold bg-neutral-950/80 px-3.5 py-1.5 tracking-tight rounded-full transition-opacity duration-300 shadow-md">
                              원본 크기로 보기
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : isFlowerPlanet ||
                      isYeoldaeya ||
                      isAfternoon ||
                      isNightflight ? (
                      <div className="space-y-6 animate-fade-in font-sans text-neutral-850">
                        <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
                          <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider">
                            갤러리 아카이브
                          </h3>
                        </div>
                        {project.images && project.images.length > 0 ? (
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {project.images.map((img, i) => (
                              <div
                                key={i}
                                className="bg-neutral-50 overflow-hidden border border-neutral-200/85 shadow-3xs transition-all duration-300 rounded-[12px] aspect-[4/3] flex items-center justify-center group/gallery"
                              >
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
                              {(
                                project.festivalProjects3 || [
                                  "2024 인천펜타포트국제록페스티벌",
                                  "2024 어썸뮤직페스티벌",
                                  "2024 이슬라이브 페스티벌",
                                  "2024 여수 썸머 뮤직 페스티벌",
                                  "2024 로즈아워 페스티벌",
                                ]
                              ).map((item, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-center gap-2.5 transition-colors duration-200 hover:text-rose-500"
                                >
                                  <span className="w-1.5 h-1.5 bg-rose-400 rounded-full shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Photos - 2x2 Grid Layout */}
                          <div className="grid grid-cols-2 gap-3 md:gap-4">
                            {(() => {
                              const currentImages = project.fnbImages && project.fnbImages.length > 0
                                ? project.fnbImages
                                : [
                                    "https://raw.githubusercontent.com/2green-lee/Portfolio/bfe56c116e09a1caaea1b2ccf474a1498975af18/kiosk%201.jpg",
                                    "https://raw.githubusercontent.com/2green-lee/Portfolio/bfe56c116e09a1caaea1b2ccf474a1498975af18/kiosk%202.jpg",
                                    "https://raw.githubusercontent.com/2green-lee/Portfolio/bfe56c116e09a1caaea1b2ccf474a1498975af18/food4.jpeg",
                                    "https://raw.githubusercontent.com/2green-lee/Portfolio/1f77a94cdeca5069b8f04f33d81f2b7a323a4c07/food5.jpg"
                                  ];
                              return currentImages.map((imgUrl, imgIdx) => (
                                <div
                                  key={imgIdx}
                                  onClick={() => {
                                    setLightboxImages(currentImages);
                                    setLightboxIndex(imgIdx);
                                  }}
                                  className="relative aspect-[16/9] w-full overflow-hidden rounded-[15px] border border-neutral-200/60 shadow-3xs group/photo cursor-zoom-in hover:brightness-95 transition-all"
                                  title="클릭하여 확대보기"
                                >
                                  <OptimizedImage
                                    src={imgUrl}
                                    alt={`F&B operation step image ${imgIdx + 1}`}
                                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/photo:scale-105"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                              ));
                            })()}
                          </div>
                        </div>

                        {/* Right Column (lg:col-span-7): 3-Step Process in 3 Rows */}
                        <div className="lg:col-span-7 space-y-5">
                          {(project.processFnB || DEFAULT_FESTIVAL_FNB).map(
                            (step, sIdx) => (
                              <div
                                key={sIdx}
                                className="p-5 md:p-6 border border-neutral-200/85 bg-white hover:border-rose-400/60 transition-all rounded-[15px] shadow-3xs flex flex-col gap-3 font-sans"
                              >
                                <div className="flex items-center justify-between border-b border-neutral-100 pb-2.5">
                                  <h4 className="text-[15px] font-black text-neutral-900 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                                    {step.phase}
                                  </h4>
                                  <span className="text-[10px] font-mono text-neutral-400 font-bold bg-neutral-50 px-2 py-0.5 rounded-md border border-neutral-100">
                                    {step.label ||
                                      (sIdx === 0
                                        ? "PRE-EVENT"
                                        : sIdx === 1
                                          ? "ON-SITE"
                                          : "POST-EVENT")}
                                  </span>
                                </div>
                                <ul className="space-y-3.5 text-xs sm:text-[13px] text-neutral-750 font-sans">
                                  {step.items.map((item, iIdx) => (
                                    <li
                                      key={iIdx}
                                      className={`leading-relaxed ${iIdx > 0 ? "border-t border-neutral-100/60 pt-3" : ""}`}
                                    >
                                      <strong className="text-neutral-900 block font-bold mb-0.5">
                                        {item.title}
                                      </strong>
                                      <span className="text-neutral-650 font-sans">
                                        {item.body}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    ) : isConcert ? (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-11 items-start animate-fade-in font-sans">
                        {/* Left Column (lg:col-span-5): Curated Concert Performances and Small posters */}
                        <div className="lg:col-span-5 space-y-6">
                          <div className="p-5 md:p-6 border border-neutral-200/85 bg-white hover:border-rose-400/60 transition-all rounded-[15px] shadow-3xs flex flex-col gap-3 font-sans">
                            <p className="text-[15px] font-black uppercase text-neutral-900 tracking-wider font-sans flex items-center gap-2 border-b border-neutral-100 pb-2.5">
                              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0" />
                              하우스 운영 보조 실적
                            </p>
                            <ul className="space-y-2.5 pl-1.5 text-[13px] text-neutral-750 font-sans font-medium pb-1">
                              {(
                                project.houseProjects || [
                                  "오페라의 유령 내한공연",
                                  "위키드",
                                  "캣츠 내한 공연",
                                  "라이온킹 내한 공연",
                                  "레베카",
                                  "맘마미아",
                                  "싯다르타",
                                  "백조의 호수",
                                  "시카고",
                                ]
                              ).map((item, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-center gap-2.5 transition-colors duration-200 hover:text-rose-500"
                                >
                                  <span className="w-1.5 h-1.5 bg-rose-400 rounded-full shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* 9 Photos - Grid of Musical Posters (3*3) */}
                          <div className="grid grid-cols-3 gap-3">
                            {MUSICAL_POSTERS.map((src, index) => (
                              <div
                                key={index}
                                className="relative aspect-[3/4] w-full overflow-hidden rounded-[8px] border border-neutral-200/60 shadow-4xs group/photo cursor-zoom-in bg-white"
                                onClick={() => setLightboxImage(src)}
                              >
                                <OptimizedImage
                                  src={src}
                                  alt={`Musical Poster ${index + 1}`}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover/photo:scale-105"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Right Column (lg:col-span-7): Custom 3-step House operation Process */}
                        <div className="lg:col-span-7 space-y-5">
                          {(
                            project.processHouse || [
                              {
                                phase: "사전 준비 및 객석 세팅",
                                items: [
                                  {
                                    title: "공연장 컨디션 점검",
                                    body: "관객 입장 전 객석 청결 상태, 좌석 이상 유무 및 비상 대피 동선 사전 점검",
                                  },
                                  {
                                    title: "당일 운영 매뉴얼 숙지",
                                    body: "러닝타임, 인터미션(휴식 시간), 지연 관객 입장 타이밍 등 당일 공연 특이사항 숙지 및 스태프 회의",
                                  },
                                  {
                                    title: "로비 편의시설 오픈 준비",
                                    body: "로비 내 물품보관소, 오페라글라스 대여소, 주차 정산소 등 관객 서비스 데스크 오픈 및 세팅",
                                  },
                                ],
                              },
                              {
                                phase: "현장 및 객석 운영",
                                items: [
                                  {
                                    title: "객석 안내 및 지연 관객 통제",
                                    body: "관객 티켓 확인 후 정확한 좌석 안내, 공연 시작 후 늦게 도착한 지연 관객들을 정해진 타이밍에 맞춰 안전하게 입장 유도",
                                  },
                                  {
                                    title: "객석 내 돌발 상황 대응",
                                    body: "공연 중 불법 사진/영상 촬영 통제, 소음 발생이나 응급 환자 발생 등 객석 내 돌발 상황 실시간 대처",
                                  },
                                  {
                                    title: "인터미션(휴식 시간) 로비 통제",
                                    body: "짧은 휴식 시간 동안 로비 및 화장실로 몰리는 인파 혼잡도 관리 및 안전 통제",
                                  },
                                ],
                              },
                              {
                                phase: "사후 및 안전 관리",
                                items: [
                                  {
                                    title: "안전 퇴장 유도",
                                    body: "공연 종료 후 수천 명의 관객이 한 번에 몰리지 않도록 구역별 퇴장 동선 안내 및 병목 현상 방지",
                                  },
                                  {
                                    title: "분실물 관리",
                                    body: "전체 관객 퇴장 후 객석 내 분실물 꼼꼼히 확인 및 유실물 센터 인계",
                                  },
                                  {
                                    title: "운영 리포트",
                                    body: "당일 객석 내 특이사항 및 접수된 관객 컴플레인 내역을 하우스 매니저에게 최종 보고",
                                  },
                                ],
                              },
                            ]
                          ).map((step, sIdx) => (
                            <div
                              key={sIdx}
                              className="p-5 md:p-6 border border-neutral-200/85 bg-white hover:border-rose-400/60 transition-all rounded-[15px] shadow-3xs flex flex-col gap-3 font-sans"
                            >
                              <div className="flex items-center justify-between border-b border-neutral-100 pb-2.5">
                                <h4 className="text-[15px] font-black text-neutral-900 flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                                  {step.phase}
                                </h4>
                                <span className="text-[10px] font-mono text-neutral-400 font-bold bg-neutral-50 px-2 py-0.5 rounded-md border border-neutral-100 uppercase tracking-widest font-black">
                                  STAGE 0{sIdx + 1}
                                </span>
                              </div>
                              <ul className="space-y-3.5 text-xs sm:text-[13px] text-neutral-750 font-sans">
                                {step.items.map((item, iIdx) => (
                                  <li
                                    key={iIdx}
                                    className={`leading-relaxed ${iIdx > 0 ? "border-t border-neutral-100/60 pt-3" : ""}`}
                                  >
                                    <strong className="text-neutral-900 block font-bold mb-0.5">
                                      {item.title}
                                    </strong>
                                    <span className="text-neutral-650 font-sans">
                                      {item.body}
                                    </span>
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
                            <span className="text-[9px] font-mono bg-emerald-600 text-white px-1.5 py-0.5 rounded-none uppercase tracking-wider font-bold">
                              Performance
                            </span>
                            <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider">
                              현장 운영 핵심 성과
                            </h3>
                          </div>
                          {project.results ? (
                            <div className="space-y-3.5 bg-white border border-neutral-200 p-6 shadow-3xs rounded-none">
                              {project.results.map((result, i) => {
                                const hasArrow = result.includes(" -> ");
                                if (hasArrow) {
                                  const [goal, outcome] = result.split(" -> ");
                                  return (
                                    <div
                                      key={i}
                                      className="border-b border-neutral-100 last:border-none pb-3.5 mb-3.5 last:pb-0 last:mb-0"
                                    >
                                      <div className="flex items-center gap-2 mb-1.5">
                                        <span className="text-[9px] font-mono text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded-none border border-neutral-200/50 font-bold">
                                          0{i + 1}
                                        </span>
                                        <p className="text-xs sm:text-[13px] font-bold text-neutral-900">
                                          {goal}
                                        </p>
                                      </div>
                                      <div className="ml-7 p-3 bg-neutral-50/70 border-l-2 border-neutral-800 rounded-none">
                                        <p className="text-xs sm:text-[13px] text-neutral-800 leading-relaxed whitespace-pre-line font-normal">
                                          {outcome}
                                        </p>
                                      </div>
                                    </div>
                                  );
                                }
                                return (
                                  <div
                                    key={i}
                                    className="text-xs sm:text-[13px] font-normal flex items-start gap-3 py-2 border-b border-neutral-100 last:border-none"
                                  >
                                    <span className="text-[9px] font-mono text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded-none border border-neutral-200/50 font-bold">
                                      0{i + 1}
                                    </span>
                                    <span className="flex-1 text-neutral-800 font-normal leading-relaxed">
                                      {result}
                                    </span>
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
                            <span className="text-[9px] font-mono bg-black text-white px-1.5 py-0.5 rounded-none uppercase tracking-wider font-bold">
                              On-Site Operation
                            </span>
                            <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider">
                              현장 실행 및 통제
                            </h3>
                          </div>
                          {project.process && project.process[1] ? (
                            <div className="p-6 border border-neutral-200 bg-white shadow-3xs space-y-4 rounded-none">
                              <h4 className="text-sm font-bold text-neutral-900 flex justify-between items-center border-b border-neutral-100 pb-2">
                                <span className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 bg-black rounded-full" />
                                  {project.process[1].phase}
                                </span>
                                <span className="text-[9px] font-mono text-neutral-400 font-bold">
                                  STEP 02
                                </span>
                              </h4>
                              <ul className="space-y-3">
                                {project.process[1].items.map((item, j) => (
                                  <li
                                    key={j}
                                    className="text-xs sm:text-[13px] text-neutral-750 flex items-start gap-2 leading-relaxed"
                                  >
                                    <span className="mt-1.5 w-1 h-1 bg-neutral-400 rounded-full shrink-0" />
                                    <span className="font-normal text-neutral-800">
                                      {item}
                                    </span>
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
                    ))}

                  {slidePage === 4 &&
                    (isGreenery ? (
                      <div className="space-y-6 animate-fade-in font-sans text-neutral-850">
                        <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
                          <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider">
                            갤러리 아카이브
                          </h3>
                        </div>
                        {project.images && project.images.length > 0 ? (
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {project.images.map((img, i) => (
                              <div
                                key={i}
                                className="bg-neutral-50 overflow-hidden border border-neutral-200 shadow-3xs transition-all duration-300 rounded-[12px] aspect-[4/3] flex items-center justify-center group/gallery"
                              >
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
                              {(
                                project.festivalProjects4 || [
                                  "2024 부산 국제 록 페스티벌 (MD)",
                                  "2024 WATERBOMB 제주 (물품보관소)",
                                  "2024 WATERBOMB 속초 (물품보관소)",
                                  "2024 그린캠프 페스티벌 (물품보관소)",
                                ]
                              ).map((item, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-center gap-2.5 transition-colors duration-200 hover:text-rose-500"
                                >
                                  <span className="w-1.5 h-1.5 bg-rose-400 rounded-full shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Photos - 2x3 Grid Layout */}
                          <div className="grid grid-cols-2 gap-3 md:gap-4">
                            {(() => {
                              const currentImages = project.storageImages && project.storageImages.length > 0
                                ? project.storageImages
                                : [
                                    "https://raw.githubusercontent.com/2green-lee/Portfolio/4446a5d2c5b32572cad3167985cfa66c83cf632d/lock%202.jpeg",
                                    "https://raw.githubusercontent.com/2green-lee/Portfolio/4446a5d2c5b32572cad3167985cfa66c83cf632d/lock%203.jpeg",
                                    "https://raw.githubusercontent.com/2green-lee/Portfolio/4446a5d2c5b32572cad3167985cfa66c83cf632d/lock%205.jpg",
                                    "https://raw.githubusercontent.com/2green-lee/Portfolio/4446a5d2c5b32572cad3167985cfa66c83cf632d/lcok%206.jpg",
                                    "https://raw.githubusercontent.com/2green-lee/Portfolio/4446a5d2c5b32572cad3167985cfa66c83cf632d/MD1.jpg",
                                    "https://raw.githubusercontent.com/2green-lee/Portfolio/4446a5d2c5b32572cad3167985cfa66c83cf632d/MD2.jpg"
                                  ];
                              return currentImages.map((imgUrl, imgIdx) => (
                                <div
                                  key={imgIdx}
                                  onClick={() => {
                                    setLightboxImages(currentImages);
                                    setLightboxIndex(imgIdx);
                                  }}
                                  className="relative aspect-[16/9] w-full overflow-hidden rounded-[15px] border border-neutral-200/60 shadow-3xs group/photo cursor-zoom-in hover:brightness-95 transition-all"
                                  title="클릭하여 확대보기"
                                >
                                  <OptimizedImage
                                    src={imgUrl}
                                    alt={`Storage/MD operation step image ${imgIdx + 1}`}
                                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/photo:scale-105"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                              ));
                            })()}
                          </div>
                        </div>

                        {/* Right Column (lg:col-span-7): 3-Step Process in 3 Rows */}
                        <div className="lg:col-span-7 space-y-5">
                          {(
                            project.processStorage || DEFAULT_FESTIVAL_STORAGE
                          ).map((step, sIdx) => (
                            <div
                              key={sIdx}
                              className="p-5 md:p-6 border border-neutral-200/85 bg-white hover:border-rose-400/60 transition-all rounded-[15px] shadow-3xs flex flex-col gap-3 font-sans"
                            >
                              <div className="flex items-center justify-between border-b border-neutral-100 pb-2.5">
                                <h4 className="text-[15px] font-black text-neutral-900 flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                                  {step.phase}
                                </h4>
                                <span className="text-[10px] font-mono text-neutral-400 font-bold bg-neutral-50 px-2 py-0.5 rounded-md border border-neutral-100 font-bold">
                                  {step.label ||
                                    (sIdx === 0
                                      ? "PRE-EVENT"
                                      : sIdx === 1
                                        ? "LIVE-CONTROL"
                                        : "POST-EVENT")}
                                </span>
                              </div>
                              <ul className="space-y-3.5 text-xs sm:text-[13px] text-neutral-750 font-sans">
                                {step.items.map((item, iIdx) => (
                                  <li
                                    key={iIdx}
                                    className={`leading-relaxed ${iIdx > 0 ? "border-t border-neutral-100/60 pt-3" : ""}`}
                                  >
                                    <strong className="text-neutral-900 block font-bold mb-0.5">
                                      {item.title}
                                    </strong>
                                    <span className="text-neutral-650 font-sans">
                                      {item.body}
                                    </span>
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
                          <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider">
                            갤러리 아카이브
                          </h3>
                        </div>
                        {project.images && project.images.length > 0 ? (
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {project.images.map((img, i) => (
                              <div
                                key={i}
                                className="bg-neutral-50 overflow-hidden border border-neutral-200 shadow-3xs transition-all duration-300 rounded-[12px] aspect-[4/3] flex items-center justify-center group/gallery"
                              >
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
                              <span className="text-[9px] font-mono bg-blue-600 text-white px-1.5 py-0.5 rounded-none uppercase tracking-wider font-bold">
                                Review
                              </span>
                              <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider">
                                사후 관리 및 피드백
                              </h3>
                            </div>
                            {project.process && project.process[2] ? (
                              <div className="p-6 border border-neutral-200 bg-white shadow-3xs space-y-4 rounded-none">
                                <h4 className="text-sm font-bold text-neutral-950 flex justify-between items-center border-b border-neutral-100 pb-2">
                                  <span className="flex items-center gap-2 font-bold">
                                    <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full" />
                                    {project.process[2].phase}
                                  </span>
                                  <span className="text-[9px] font-mono text-neutral-400 font-bold">
                                    STEP 03
                                  </span>
                                </h4>
                                <ul className="space-y-3 font-sans">
                                  {project.process[2].items.map((item, j) => (
                                    <li
                                      key={j}
                                      className="text-xs sm:text-[13px] text-neutral-750 flex items-start gap-2 leading-relaxed"
                                    >
                                      <span className="mt-1.5 w-1 h-1 bg-neutral-400 rounded-full shrink-0" />
                                      <span className="font-normal text-neutral-750">
                                        {item}
                                      </span>
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
                              <span className="text-[9px] font-mono bg-neutral-950 text-white px-1.5 py-0.5 rounded-none uppercase tracking-wider font-bold">
                                Results
                              </span>
                              <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider">
                                성과 및 기대 효과
                              </h3>
                            </div>
                            {project.results && project.results.length > 0 ? (
                              <div className="space-y-4 font-sans">
                                {project.results.map(
                                  (result: any, i: number) => {
                                    let mainPart = result;
                                    let subPart = "";
                                    if (result.includes("->")) {
                                      const parts = result.split("->");
                                      mainPart = parts[0].trim();
                                      subPart = parts[1].trim();
                                    }
                                    return (
                                      <div
                                        key={i}
                                        className="p-5 border border-neutral-200 bg-white shadow-3xs flex flex-col gap-1.5 rounded-none"
                                      >
                                        <span className="text-xs sm:text-[13px] text-neutral-800 font-medium leading-relaxed">
                                          {mainPart}
                                        </span>
                                        {subPart && (
                                          <div className="text-xs font-sans text-rose-600 font-bold flex items-center gap-1.5 mt-1">
                                            <span className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0" />
                                            <span>{subPart}</span>
                                          </div>
                                        )}
                                      </div>
                                    );
                                  },
                                )}
                              </div>
                            ) : (
                              <div className="p-6 border border-dashed border-neutral-200 bg-white/50 text-neutral-400 text-xs text-center font-sans">
                                등록된 운영 성과 데이터가 없습니다.
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
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
                className="fixed inset-0 bg-neutral-950/95 backdrop-blur-md z-[300] flex flex-col items-center justify-start overflow-y-auto cursor-zoom-out py-8 px-2 sm:px-6"
                onClick={() => setLightboxImage(null)}
              >
                <button
                  type="button"
                  onClick={() => setLightboxImage(null)}
                  className="fixed top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer shadow-md z-[310] border border-white/5"
                  aria-label="Close Lightbox"
                >
                  <X size={20} />
                </button>
                <div
                  className="w-full max-w-5xl my-auto flex flex-col items-center justify-center relative select-none"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={lightboxImage}
                    alt="Lightbox View"
                    className="w-full h-auto max-w-full rounded-md shadow-2xl border border-white/10 cursor-default"
                    referrerPolicy="no-referrer"
                  />
                  <div className="mt-4 text-white/60 text-xs font-sans tracking-wide">
                    클릭 또는 우측 상단 X 버튼을 누르면 닫힙니다 (마우스 스크롤
                    지원)
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Slider Gallery Lightbox Overlay */}
          {lightboxImages && lightboxImages.length > 0 && (
            <div
              onClick={() => setLightboxImages(null)}
              className="fixed inset-0 bg-neutral-950/92 backdrop-blur-md z-[9999] flex flex-col items-center justify-center p-4 select-none animate-fade-in"
            >
              {/* Top Panel */}
              <div className="absolute top-0 inset-x-0 h-16 flex items-center justify-between px-6 z-10 pointer-events-none">
                <span className="text-white/60 font-mono text-[11px] uppercase tracking-wider font-semibold">
                  티켓 운영 이미지 갤러리
                </span>
                <button
                  onClick={() => setLightboxImages(null)}
                  className="pointer-events-auto bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all border border-white/15 outline-none hover:rotate-90 duration-305"
                  title="Close (ESC)"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Core Image Framer */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-[800px] w-full bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center aspect-[16/10] md:aspect-[16/9]"
              >
                {/* Image display */}
                <div className="w-full h-full flex items-center justify-center p-2 bg-neutral-950">
                  <img
                    src={lightboxImages[lightboxIndex]}
                    alt={`Expanded Ticket Screen ${lightboxIndex + 1}`}
                    className="max-h-[80vh] max-w-full object-contain pointer-events-none rounded-lg animate-fade-in"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Left Button */}
                {lightboxImages.length > 1 && (
                  <button
                    onClick={() => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : lightboxImages.length - 1))}
                    className="absolute left-4 bg-black/45 hover:bg-black/75 hover:scale-105 border border-white/5 text-white p-3 rounded-full transition-all outline-none"
                    title="이전 사진 (Left Arrow)"
                  >
                    <ChevronLeft size={22} />
                  </button>
                )}

                {/* Right Button */}
                {lightboxImages.length > 1 && (
                  <button
                    onClick={() => setLightboxIndex((prev) => (prev < lightboxImages.length - 1 ? prev + 1 : 0))}
                    className="absolute right-4 bg-black/45 hover:bg-black/75 hover:scale-105 border border-white/10 text-white p-3 rounded-full transition-all outline-none"
                    title="다음 사진 (Right Arrow)"
                  >
                    <ChevronRight size={22} />
                  </button>
                )}
              </div>

              {/* Bottom Info Panel */}
              <div className="mt-4 flex flex-col items-center gap-1.5 pointer-events-none">
                <span className="bg-white/10 text-white px-3.5 py-1 rounded-full text-[11px] font-mono font-medium border border-white/10">
                  {lightboxIndex + 1} / {lightboxImages.length}
                </span>
                <span className="text-white/40 text-[10px] tracking-wide font-medium">
                  키보드 방향키(←, →) 및 ESC 키로 이동/종료가 가능합니다
                </span>
              </div>
            </div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

const ActivityModal: React.FC<{
  activity: any;
  onClose: () => void;
}> = ({ activity, onClose }) => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
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
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-lg sm:max-w-4xl md:max-w-5xl lg:max-w-5xl xl:max-w-6xl w-[94%] max-h-[90vh] overflow-y-auto bg-white z-[203] flex flex-col font-sans text-neutral-880 border border-neutral-200/50 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] rounded-[24px] p-6 sm:p-8 md:p-10 custom-scrollbar"
          >
            {/* Modal Header */}
            <div className="flex justify-end items-center mb-4 shrink-0">
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-neutral-950 hover:text-white transition-all rounded-md cursor-pointer text-neutral-400 outline-none border-none flex items-center justify-center"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Unified Info & Achievements Container */}
            <div className="bg-slate-50/50 border border-slate-200 rounded-[20px] p-6 sm:p-8 md:p-8 space-y-6 md:space-y-0 md:grid md:grid-cols-12 md:gap-8 items-stretch mb-6 select-none">
              {/* Left Side: Meta Info */}
              <div className="md:col-span-5 flex flex-col justify-between space-y-6 md:space-y-0 pr-0 md:pr-6 md:border-r md:border-slate-200 text-left">
                <div className="space-y-3.5 min-w-0">
                  <div>
                    <span className="inline-block text-[10px] uppercase tracking-widest font-mono text-slate-800 font-bold bg-white px-2.5 py-1 border border-slate-200 rounded-[4px] shadow-3xs">
                      {activity.org}
                    </span>
                  </div>
                  <h3
                    className="text-base sm:text-lg md:text-xl lg:text-[22px] font-black text-neutral-900 tracking-tight break-keep"
                    title={activity.title}
                  >
                    {activity.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2 flex-wrap text-xs font-mono font-bold text-neutral-400 pt-2 md:pt-0">
                  <span className="text-slate-650 font-sans">
                    {activity.period}
                  </span>
                  {activity.country?.name && (
                    <>
                      <span className="text-slate-350">•</span>
                      <span className="font-sans font-bold text-slate-500">
                        {activity.country.name}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Right Side: Key Achievements List */}
              <div className="md:col-span-7 flex flex-col justify-center pl-0 md:pl-2 pt-6 md:pt-0 border-t border-dashed border-slate-200 md:border-none text-left">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-2.5">
                    <h4 className="text-[13px] sm:text-[14px] font-bold tracking-wider text-black uppercase font-sans">
                      주요 실행 업무 및 성과
                    </h4>
                  </div>
                  <ul className="space-y-3.5 text-xs sm:text-[13px] text-neutral-600 font-sans leading-relaxed">
                    {(activity.desc || []).map((d: string, j: number) => (
                      <li
                        key={j}
                        className="flex items-start gap-2.5 py-0.5 group/item hover:text-neutral-900 transition-colors duration-150"
                      >
                        <span className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0 mt-1.5 group-hover/item:bg-rose-600 transition-colors duration-150" />
                        <span className="font-medium text-neutral-500 group-hover/item:text-neutral-900 transition-colors duration-150 leading-normal">
                          {d}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Awards section */}
            {activity.awards && activity.awards.length > 0 && (
              <div className="pt-2 pb-6 font-sans text-left">
                <div className="flex items-center gap-2 border-b border-rose-100 pb-2.5 mb-5 select-none">
                  <h4 className="text-xs font-bold tracking-wider text-neutral-800 uppercase font-sans flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-rose-500" />
                    공모전 수상 내역 (총 {activity.awards.length}개)
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                  {activity.awards.map((award: any, j: number) => (
                    <div
                      key={j}
                      className="group flex flex-col justify-between bg-slate-50/50 hover:bg-slate-50 border border-slate-200 hover:border-neutral-900 rounded-[16px] p-5 transition-all duration-300 shadow-3xs"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 bg-rose-50 border border-rose-100/50 px-2.5 py-0.5 rounded-full tracking-tight select-none">
                            <Award className="w-3 h-3" />
                            {award.title.indexOf("/") !== -1
                              ? award.title.split("/")[0].trim()
                              : "수상"}
                          </span>
                          <span className="text-[11px] font-mono font-bold text-neutral-400 select-none">
                            {award.date}
                          </span>
                        </div>
                        <h5 className="text-[14px] sm:text-[15px] font-black text-neutral-800 tracking-tight leading-snug group-hover:text-neutral-950 transition-colors duration-200">
                          {award.title.indexOf("/") !== -1
                            ? award.title.split("/").slice(1).join("/").trim()
                            : award.title}
                        </h5>
                      </div>
                      <div className="text-[11px] font-mono font-bold text-neutral-400 mt-4 border-t border-dashed border-neutral-200 pt-2.5 flex items-center justify-between select-none">
                        <span className="text-neutral-400 flex items-center gap-1">
                          <span>수여기관:</span>
                          <span className="text-neutral-600 font-semibold">
                            {award.org}
                          </span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery Section */}
            {activity.images && activity.images.length > 0 && (
              <div className="pt-2 pb-6 font-sans text-left">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {activity.images.map((img: string, idx: number) => (
                    <div
                      key={idx}
                      className={`relative aspect-square w-full overflow-hidden border border-slate-200 shadow-3xs cursor-pointer ${
                        activity.title?.includes("CREATOR") ||
                        activity.title?.includes("광고") ||
                        activity.title?.includes("한일청년") ||
                        activity.title?.includes("파나카노트")
                          ? "rounded-xl"
                          : "rounded-none"
                      }`}
                      onClick={() => setLightboxImage(convertGithubUrl(img))}
                    >
                      <img
                        src={convertGithubUrl(img)}
                        alt={
                          activity.title?.includes("CREATOR") ||
                          activity.title?.includes("광고")
                            ? `CREATOR 이미지 ${idx + 1}`
                            : `공연 및 활동 이미지 ${idx + 1}`
                        }
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Lower Section: Full Width Articles Archive */}
            {activity.articles && activity.articles.length > 0 ? (
              <div className="pt-6 font-sans">
                <div className="flex items-center gap-2 border-b border-indigo-100 pb-2.5 mb-5">
                  <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full shrink-0" />
                  <h4 className="text-xs font-bold tracking-wider text-neutral-800 uppercase font-sans">
                    발행 기사 (총 {activity.articles.length}건)
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                  {[...activity.articles]
                    .sort(
                      (a: any, b: any) =>
                        new Date(b.date || "").getTime() -
                        new Date(a.date || "").getTime(),
                    )
                    .map((art: any, j: number) => (
                      <a
                        key={j}
                        href={art.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col justify-between bg-white hover:bg-neutral-50/60 border border-neutral-200 hover:border-neutral-850 rounded-[16px] p-4 transition-all duration-300 shadow-3xs hover:-translate-y-0.5"
                      >
                        <div className="space-y-3">
                          <div className="w-full aspect-[16/10] rounded-lg overflow-hidden bg-neutral-100 relative">
                            <img
                              src={art.thumbnail}
                              alt={art.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                            />
                          </div>
                          <div className="space-y-1.5">
                            {art.date && (
                              <span className="text-[10px] font-mono leading-none font-bold text-neutral-400">
                                {art.date}
                              </span>
                            )}
                            {art.title.indexOf("\n") !== -1 ? (
                              <div className="space-y-1">
                                <h5 className="text-[13px] sm:text-[14px] font-black text-neutral-800 tracking-tight leading-snug group-hover:text-indigo-600 transition-colors duration-200 line-clamp-2">
                                  {art.title.split("\n")[0]}
                                </h5>
                                <p className="text-[11px] sm:text-[12.5px] font-medium text-neutral-500/90 tracking-tight leading-snug group-hover:text-neutral-600 transition-colors duration-200 line-clamp-1">
                                  {art.title.split("\n")[1]}
                                </p>
                              </div>
                            ) : (
                              <h5 className="text-[13px] sm:text-[14px] font-black text-neutral-800 tracking-tight leading-snug group-hover:text-indigo-600 transition-colors duration-200 line-clamp-3 whitespace-pre-line">
                                {art.title}
                              </h5>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-indigo-600 group-hover:text-neutral-900 transition-colors duration-200 self-end mt-5">
                          <span>기사 읽기</span>
                          <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                      </a>
                    ))}
                </div>
              </div>
            ) : null}

            {/* Footer Quote or Branding */}
            <div className="text-[10px] font-mono opacity-30 leading-tight uppercase tracking-tighter text-right pt-4 mt-8 border-t border-neutral-150 font-sans">
              ©2026 Portfolio · key activities
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
                className="fixed inset-0 bg-neutral-950/95 backdrop-blur-md z-[300] flex flex-col items-center justify-start overflow-y-auto cursor-zoom-out py-8 px-2 sm:px-6"
                onClick={() => setLightboxImage(null)}
              >
                <button
                  type="button"
                  onClick={() => setLightboxImage(null)}
                  className="fixed top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer shadow-md z-[310] border border-white/5 flex items-center justify-center"
                  aria-label="Close Lightbox"
                >
                  <X size={20} />
                </button>
                <div
                  className="w-full max-w-5xl my-auto flex flex-col items-center justify-center relative select-none"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={lightboxImage}
                    alt="Lightbox View"
                    className="w-full h-auto max-w-full rounded-md shadow-2xl border border-white/10 cursor-default"
                    referrerPolicy="no-referrer"
                  />
                  <div className="mt-4 text-white/60 text-xs font-sans tracking-wide">
                    클릭 또는 우측 상단 X 버튼을 누르면 닫힙니다 (마우스 스크롤
                    지원)
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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

const getContributionPct = (label: string | null): string => {
  if (!label) return "100%";
  const l = label.toLowerCase().trim();
  if (l.includes("planning") || l.includes("기획")) return "100%";
  if (l.includes("booking") || l.includes("섭외")) return "100%";
  if (l.includes("promotion") || l.includes("홍보")) return "80%";
  if (l.includes("production") || l.includes("제작")) return "70%";
  if (l.includes("operation") || l.includes("운영")) return "100%";
  return "100%";
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
            Pragma: "no-cache",
            "Cache-Control": "no-cache",
          },
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

  const educationData =
    portfolioData?.education || DEFAULT_PORTFOLIO_DATA.education;
  const workExperienceData =
    portfolioData?.workExperience ||
    DEFAULT_PORTFOLIO_DATA.workExperience ||
    [];
  const certificatesData =
    portfolioData?.certificates || DEFAULT_PORTFOLIO_DATA.certificates || [];
  const contactData = portfolioData?.contact || DEFAULT_PORTFOLIO_DATA.contact;
  const introductionText =
    portfolioData?.introduction || DEFAULT_PORTFOLIO_DATA.introduction;
  const profileImage =
    portfolioData?.profileImage || DEFAULT_PORTFOLIO_DATA.profileImage;

  const featuredProjects: Project[] =
    portfolioData?.featuredProjects ||
    DEFAULT_PORTFOLIO_DATA.featuredProjects ||
    [];
  const personalProjects: Project[] =
    portfolioData?.personalProjects ||
    DEFAULT_PORTFOLIO_DATA.personalProjects ||
    [];
  const activitiesData = [
    ...(portfolioData?.activities || DEFAULT_PORTFOLIO_DATA.activities || []),
  ].sort(
    (a, b) => getEndDateFromPeriod(b.period) - getEndDateFromPeriod(a.period),
  );

  const activeIndex = SECTIONS.findIndex((s) => s.id === activeSection);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );

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
              body: JSON.stringify(updatedData),
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
    hour12: false,
  });

  const staggerItem = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
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
        <div
          onClick={() => scrollTo("about")}
          className="flex flex-col items-center cursor-pointer hover:opacity-75 transition-opacity select-none"
        >
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter leading-none mb-1">
            Lee-Geunil<span className="text-xs align-top ml-0.5">®</span>
          </h1>
          <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest text-center translate-y-[2px]">
            PLANNING & CREATOR
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-4 text-[11px] font-medium">
          <div className="flex flex-col gap-1">
            <button
              onClick={() => scrollTo("about")}
              className="hover:opacity-40 transition-opacity text-left"
            >
              About
            </button>
            <button
              onClick={() => scrollTo("project1")}
              className="hover:opacity-40 transition-opacity text-left"
            >
              Project
            </button>
            <button
              onClick={() => scrollTo("activities")}
              className="hover:opacity-40 transition-opacity text-left"
            >
              Contact
            </button>
          </div>
          <div className="flex flex-col gap-1">
            <a
              href="https://www.instagram.com/darkreen___n/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-40 transition-opacity"
            >
              Instagram
            </a>
            <a
              href="mailto:lgi12@naver.com"
              className="hover:opacity-40 transition-opacity"
            >
              Mail
            </a>
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
                    : isMoved
                      ? "rgba(255, 255, 255, 0.85)"
                      : "rgba(0, 0, 0, 0.85)",
                  borderColor: isMoved
                    ? "rgba(255,225,255,0.15)"
                    : "rgba(163, 163, 163, 0.4)",
                }}
                whileHover={{
                  backgroundColor: isActive
                    ? "#000000"
                    : isMoved
                      ? "#141414"
                      : "#fafafa",
                  color: isActive
                    ? "#ffffff"
                    : isMoved
                      ? "rgba(255, 255, 255, 1)"
                      : "rgba(0, 0, 0, 1)",
                }}
                transition={{
                  layout: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                  backgroundColor: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                  color: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                  borderColor: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
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
                    opacity: { duration: 0.4, delay: 0.8 },
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
                        className={`h-full w-full overflow-y-auto px-8 md:px-20 pt-[46px] pb-[46px] ${SECTIONS[0].color}`}
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
                                      <div className="w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] md:w-[220px] md:h-[220px] flex items-center justify-center transition-all duration-300 hover:scale-[1.05]">
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
                                        <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-neutral-400 pb-1 border-b border-neutral-100/80 block">
                                          Education
                                        </p>
                                        <div className="space-y-3">
                                          <div>
                                            <h4 className="text-[14px] sm:text-[15px] font-bold text-neutral-800 tracking-tight leading-snug">
                                              {educationData?.name ||
                                                "부산대학교"}
                                            </h4>
                                            <p className="text-[12px] sm:text-[13px] font-medium text-neutral-500 mt-1 leading-relaxed">
                                              {educationData?.major ||
                                                "항공우주공학 & 예술문화영상학"}
                                            </p>
                                          </div>
                                          <div className="text-[11px] font-mono text-neutral-400 font-semibold tracking-wider">
                                            {educationData?.period ||
                                              "2013 - 2021"}
                                          </div>
                                        </div>
                                      </div>

                                      <div className="space-y-4">
                                        <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-neutral-400 pb-1 border-b border-neutral-100/80 block">
                                          Contact
                                        </p>
                                        <div className="space-y-3">
                                          <div className="flex justify-between items-center pb-2 border-b border-dashed border-neutral-100/70">
                                            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-semibold">
                                              전화번호
                                            </span>
                                            <a
                                              href={`tel:${contactData?.phone || "010-9335-9620"}`}
                                              className="hover:text-rose-500 hover:underline transition-all font-sans text-neutral-700 font-medium text-[13px] sm:text-[14px] tracking-tight"
                                            >
                                              {contactData?.phone ||
                                                "010-9335-9620"}
                                            </a>
                                          </div>
                                          <div className="flex justify-between items-center pb-1">
                                            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-semibold">
                                              이메일
                                            </span>
                                            <a
                                              href={`mailto:${contactData?.email || "lgi12@naver.com"}`}
                                              className="hover:text-rose-500 hover:underline transition-all font-sans text-neutral-700 font-medium text-[13px] sm:text-[14px] tracking-tight"
                                            >
                                              {contactData?.email ||
                                                "lgi12@naver.com"}
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Column 2: Certificates */}
                                    <div className="space-y-4 md:px-8">
                                      <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-neutral-400 pb-1 border-b border-neutral-100/80 block">
                                        Certificates
                                      </p>
                                      <div className="space-y-1">
                                        {(certificatesData || []).map(
                                          (cert: any, idx: number) => {
                                            return (
                                              <div
                                                key={idx}
                                                className="flex justify-between items-center py-2.5 border-b border-neutral-100/60 last:border-b-0 hover:bg-neutral-50/40 px-1 transition-all duration-200"
                                              >
                                                <span className="text-[11px] sm:text-[12px] font-medium text-neutral-800 tracking-tight leading-none">
                                                  {cert.title}
                                                </span>
                                                <span className="text-[9px] sm:text-[10px] font-semibold text-neutral-500 font-mono tracking-wide leading-none select-all bg-neutral-100/60 px-2 py-1 rounded-[4px]">
                                                  {cert.subtitle ||
                                                    cert.score ||
                                                    ""}
                                                </span>
                                              </div>
                                            );
                                          },
                                        )}
                                      </div>
                                    </div>

                                    {/* Column 3: Technical Stack */}
                                    <div className="space-y-4 md:pl-8">
                                      <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-neutral-400 pb-1 border-b border-neutral-100/80 block">
                                        SKILLS
                                      </p>
                                      <div className="space-y-4">
                                        {(
                                          portfolioData?.techStack ||
                                          DEFAULT_PORTFOLIO_DATA.techStack ||
                                          []
                                        ).map((group: any) => (
                                          <div
                                            key={group.label}
                                            className="space-y-1.5"
                                          >
                                            <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400/85">
                                              {(group.label || "").replace(
                                                "_",
                                                " ",
                                              )}
                                            </p>
                                            <div className="flex flex-wrap gap-1.5">
                                              {group.items.map((item) => (
                                                <span
                                                  key={item}
                                                  className="px-2.5 py-1 rounded-[6px] border border-neutral-200/40 bg-neutral-50/30 text-[12px] font-sans font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 hover:border-neutral-300 transition-all cursor-default select-none shadow-[0_1px_1.5px_rgba(0,0,0,0.01)]"
                                                >
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
                                <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-neutral-400 mb-6 text-center">
                                  Work Experience
                                </p>
                                <div className="space-y-6">
                                  {(workExperienceData || []).map(
                                    (exp: any, i: number) => (
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
                                            <h3 className="text-base md:text-[17px] font-bold text-neutral-900">
                                              {exp.company}
                                            </h3>
                                            <span className="text-[11px] md:text-xs text-neutral-500 font-normal">
                                              {exp.tags}
                                            </span>
                                          </div>

                                          <ul className="space-y-2 md:space-y-2.5">
                                            {(exp.desc || []).map(
                                              (bullet: string, idx: number) => (
                                                <li
                                                  key={idx}
                                                  className="text-[13px] md:text-sm text-neutral-700 leading-relaxed flex items-start"
                                                >
                                                  <span className="mr-2 text-neutral-400 select-none">
                                                    •
                                                  </span>
                                                  <span>{bullet}</span>
                                                </li>
                                              ),
                                            )}
                                          </ul>
                                        </div>
                                      </motion.div>
                                    ),
                                  )}
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
                        className={`h-full w-full overflow-y-auto px-8 md:px-20 pt-[46px] pb-[46px] ${SECTIONS[1].color}`}
                      >
                        <div className="max-w-[1300px] mx-auto">
                          {isTransitioning ? (
                            <div className="flex items-center justify-center min-h-[400px]">
                              <div className="w-5 h-5 border-2 border-neutral-300 border-t-neutral-800 rounded-full animate-spin" />
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-12 xl:gap-x-16 items-start">
                              {/* Left Column: Operations (운영) */}
                              <div className="lg:col-span-6 space-y-8">
                                <motion.div
                                  variants={staggerItem}
                                  className="border-b border-black/10 pb-4 flex items-baseline justify-between select-none"
                                >
                                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900 flex items-baseline gap-2">
                                    <span>운영</span>
                                    <span className="text-[11px] font-mono font-medium text-neutral-400 uppercase tracking-widest pl-1">
                                      Operations
                                    </span>
                                  </h3>
                                </motion.div>
                                <div className="grid grid-cols-1 gap-y-[35px]">
                                  {featuredProjects.map((project, idx) => {
                                    const isWide =
                                      project.title === "페스티벌 운영" ||
                                      project.title === "공연 운영";
                                    return (
                                      <div key={idx} className="col-span-1">
                                        <ProjectCard
                                          project={project}
                                          onClick={setSelectedProject}
                                          imageAspect="aspect-[300/220]"
                                          isWide={isWide}
                                        />
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Right Column: Planning (기획) */}
                              <div className="lg:col-span-6 space-y-8">
                                <motion.div
                                  variants={staggerItem}
                                  className="border-b border-black/10 pb-4 flex items-baseline justify-between select-none"
                                >
                                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900 flex items-baseline gap-2">
                                    <span>기획</span>
                                    <span className="text-[11px] font-mono font-medium text-neutral-400 uppercase tracking-widest pl-1">
                                      Planning
                                    </span>
                                  </h3>
                                </motion.div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-[35px]">
                                  {personalProjects.map((project, idx) => (
                                    <ProjectCard
                                      key={idx}
                                      project={project}
                                      onClick={setSelectedProject}
                                      imageAspect="aspect-[290/160] sm:aspect-[290/190] md:aspect-[290/115] lg:aspect-[290/200] xl:aspect-[290/215]"
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
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
                        className={`h-full w-full overflow-y-auto px-8 md:px-20 pt-[46px] pb-[46px] ${SECTIONS[2].color}`}
                      >
                        <div className="max-w-[1350px] w-full mx-auto">
                          {isTransitioning ? (
                            <div className="flex items-center justify-center min-h-[400px]">
                              <div className="w-5 h-5 border-2 border-neutral-300 border-t-neutral-800 rounded-full animate-spin" />
                            </div>
                          ) : (
                            <>
                              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-0">
                                <div className="lg:col-span-2">
                                  <motion.div variants={staggerItem}>
                                    <span className="text-[10px] font-mono uppercase tracking-[0.6em] opacity-40 block mb-2">
                                      Activities
                                    </span>
                                    <span className="text-[10px] font-mono uppercase tracking-[0.6em] opacity-20 block">
                                      Archive
                                    </span>
                                  </motion.div>
                                </div>
                                <div className="lg:col-span-10">
                                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_255px] xl:grid-cols-[1fr_255px] gap-6 lg:gap-8 xl:gap-10">
                                    <motion.div
                                      variants={staggerItem}
                                      className="flex-1 w-full"
                                    >
                                      <div className="space-y-4">
                                        {(activitiesData || []).map(
                                          (act: any, i: number) => (
                                            <div
                                              key={i}
                                              onClick={() =>
                                                setSelectedActivity(act)
                                              }
                                              className="group bg-white hover:bg-neutral-50/60 border border-neutral-200 hover:border-neutral-950 rounded-[15px] p-5.5 sm:p-6 transition-all duration-300 shadow-3xs hover:shadow-2xs cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden"
                                            >
                                              <div className="space-y-2.5 flex-1 min-w-0">
                                                {/* Organization Tag & Period */}
                                                <div className="flex items-center gap-2.5 pb-1.5 border-b border-neutral-100/40 text-xs sm:text-[13px] font-mono text-neutral-500 font-medium select-none flex-wrap">
                                                  <span className="text-neutral-800 font-bold uppercase shrink-0">
                                                    {act.org}
                                                  </span>
                                                  {act.country?.name && (
                                                    <>
                                                      <span className="opacity-30 shrink-0">
                                                        |
                                                      </span>
                                                      <span className="text-neutral-600 font-semibold shrink-0">
                                                        {act.country.name}
                                                      </span>
                                                    </>
                                                  )}
                                                  <span className="opacity-30 shrink-0">
                                                    |
                                                  </span>
                                                  <span className="shrink-0">
                                                    {act.period}
                                                  </span>
                                                </div>

                                                {/* Title */}
                                                <h3 className="text-[17px] sm:text-[18px] font-black text-neutral-800 tracking-tight leading-snug group-hover:text-neutral-950 transition-colors duration-200 font-sans">
                                                  {act.title}
                                                </h3>

                                                {/* Brief bullet points - preview 1st point */}
                                                {act.desc &&
                                                  act.desc.length > 0 && (
                                                    <div className="text-[13px] sm:text-[14px] text-neutral-400 font-sans pt-1 select-none overflow-hidden">
                                                      <p className="truncate leading-normal">
                                                        {act.desc[0]}
                                                      </p>
                                                    </div>
                                                  )}
                                              </div>

                                              {/* Click Link decorator */}
                                              <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-neutral-800 shrink-0 self-end sm:self-center pt-3 sm:pt-0 border-t border-neutral-100/60 sm:border-t-0 w-full sm:w-auto justify-end">
                                                <span>자세히 보기</span>
                                                <svg
                                                  className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform"
                                                  fill="none"
                                                  viewBox="0 0 24 24"
                                                  stroke="currentColor"
                                                >
                                                  <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={3}
                                                    d="M9 5l7 7-7 7"
                                                  />
                                                </svg>
                                              </div>
                                            </div>
                                          ),
                                        )}
                                      </div>
                                    </motion.div>
                                    <motion.div
                                      variants={staggerItem}
                                      className="flex justify-center lg:justify-end w-full"
                                    >
                                      {/* Vertical Business Card */}
                                      <div className="w-[255px] h-[415px] bg-white text-black p-6 md:p-8 flex flex-col justify-between border border-black/15 relative overflow-hidden group/card shadow-2xs hover:shadow-sm transition-all duration-300 shrink-0">
                                        {/* Card Texture/Pattern */}
                                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                                          <div
                                            className="absolute inset-0"
                                            style={{
                                              backgroundImage:
                                                "radial-gradient(circle at 2px 2px, black 1px, transparent 0)",
                                              backgroundSize: "12px 12px",
                                            }}
                                          />
                                        </div>

                                        <div className="relative z-10">
                                          <div className="mb-8 lg:mb-10 xl:mb-14">
                                            <h3 className="text-2xl sm:text-3xl lg:text-2.5xl xl:text-3xl font-black tracking-tighter leading-none mb-2.5 uppercase">
                                              {
                                                (
                                                  contactData?.name ||
                                                  "LEE GEUNIL"
                                                ).split(" ")[0]
                                              }
                                              <br />
                                              {(
                                                contactData?.name ||
                                                "LEE GEUNIL"
                                              ).split(" ")[1] || ""}
                                            </h3>
                                            <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-500 font-bold">
                                              PLANNING & CREATOR
                                            </p>
                                          </div>

                                          <div className="space-y-4 lg:space-y-5 xl:space-y-6">
                                            <div>
                                              <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold mb-1.5">
                                                Contact
                                              </p>
                                              <p className="text-xs sm:text-[13px] xl:text-[14px] font-normal text-neutral-800 tracking-tight">
                                                {contactData?.email ||
                                                  "lgi12@naver.com"}
                                              </p>
                                              <p className="text-xs sm:text-[13px] xl:text-[14px] font-normal text-neutral-800 tracking-tight">
                                                {contactData?.phone ||
                                                  "010-9335-9620"}
                                              </p>
                                            </div>
                                            <div>
                                              <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold mb-1.5">
                                                Location
                                              </p>
                                              <p className="text-xs sm:text-[13px] xl:text-[14px] font-normal text-neutral-800 tracking-tight">
                                                {contactData?.location ||
                                                  "Seoul, South Korea"}
                                              </p>
                                            </div>
                                            <div>
                                              <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold mb-1.5">
                                                Instagram
                                              </p>
                                              <a
                                                href={`https://www.instagram.com/${(contactData?.instagram || "darkreen___n").replace("@", "")}/`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs sm:text-[13px] xl:text-[14px] font-normal text-neutral-800 tracking-tight hover:text-neutral-500 transition-colors block truncate"
                                              >
                                                {contactData?.instagram ||
                                                  "@darkreen___n"}
                                              </a>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="relative z-10 flex justify-between items-end">
                                          <div className="text-[9px] font-mono text-neutral-400 font-bold leading-relaxed uppercase tracking-normal">
                                            ©2026 Portfolio
                                            <br />
                                            All Rights Reserved
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
function AdminPanel({
  dbData,
  onSave,
}: {
  dbData: any;
  onSave: (data: any) => Promise<boolean>;
}) {
  const [activeTab, setActiveTab] = useState("about");
  const [projectSubTab, setProjectSubTab] = useState<"featured" | "personal">(
    "featured",
  );
  const [festivalActiveTab, setFestivalActiveTab] = useState<
    "summary" | "ticket" | "fnb" | "storage" | "gallery"
  >("summary");
  const [concertActiveTab, setConcertActiveTab] = useState<
    "summary" | "concert" | "house" | "gallery"
  >("summary");
  const [formData, setFormData] = useState<any>(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<
    { name: string; url: string }[]
  >([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "success" | "error"
  >("idle");
  const [savingSections, setSavingSections] = useState<
    Record<string, "idle" | "saving" | "success" | "error">
  >({});
  const [profileUploadStatus, setProfileUploadStatus] = useState("");
  const [projectUploadStatus, setProjectUploadStatus] = useState<
    Record<string, string>
  >({});

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
          return (
            l.includes(labelToEnsure.toUpperCase()) ||
            possibleAlts.some((alt) => l.includes(alt.toUpperCase()))
          );
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
      [field]: value,
    }));
  };

  const handleFieldChange = (section: string, field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleArrayChange = (
    section: string,
    index: number,
    field: string,
    value: any,
  ) => {
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
      [section]: [...(prev[section] || []), defaultValue],
    }));
  };

  const handleArrayBulletAdd = (
    section: string,
    index: number,
    listField: string,
    defaultValue = "",
  ) => {
    setFormData((prev: any) => {
      const arr = [...(prev[section] || [])];
      const item = { ...arr[index] };
      item[listField] = [...(item[listField] || []), defaultValue];
      arr[index] = item;
      return { ...prev, [section]: arr };
    });
  };

  const handleArrayBulletChange = (
    section: string,
    index: number,
    listField: string,
    bulletIndex: number,
    value: any,
  ) => {
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

  const handleArrayBulletDelete = (
    section: string,
    index: number,
    listField: string,
    bulletIndex: number,
  ) => {
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
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleMultipleFilesUpload(e.dataTransfer.files);
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
    setSavingSections((prev) => ({ ...prev, [sectionId]: "saving" }));
    const success = await onSave(formData);
    if (success) {
      setSavingSections((prev) => ({ ...prev, [sectionId]: "success" }));
      setTimeout(() => {
        setSavingSections((prev) => ({ ...prev, [sectionId]: "idle" }));
      }, 2500);
    } else {
      setSavingSections((prev) => ({ ...prev, [sectionId]: "error" }));
      setTimeout(() => {
        setSavingSections((prev) => ({ ...prev, [sectionId]: "idle" }));
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
          status === "saving"
            ? "bg-neutral-100 border-neutral-200 text-neutral-400 cursor-not-allowed"
            : status === "success"
              ? "bg-emerald-600 border-emerald-600 text-white font-semibold hover:bg-emerald-700 shadow-sm"
              : status === "error"
                ? "bg-rose-600 border-rose-600 text-white font-semibold hover:bg-rose-700 shadow-sm"
                : "bg-neutral-900 border-neutral-900 text-white hover:bg-neutral-800 hover:border-neutral-800 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
        }`}
      >
        <Save
          size={11}
          className={status === "saving" ? "animate-pulse" : ""}
        />
        {status === "saving"
          ? "저장 중"
          : status === "success"
            ? "저장 완료"
            : status === "error"
              ? "실패"
              : "항목 저장"}
      </button>
    );
  };

  const handleMultipleFilesUpload = async (files: FileList | File[]) => {
    try {
      const fileList = Array.from(files);
      if (fileList.length === 0) return;

      setUploadStatus(`${fileList.length}개 파일 업로드 준비 중...`);

      let uploadedCount = 0;
      const results: { name: string; url: string }[] = [];

      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        setUploadStatus(
          `업로드 중: ${i + 1}/${fileList.length} (${file.name})`,
        );

        try {
          const base64Content = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = () => reject(new Error("파일 읽기 실패"));
            reader.readAsDataURL(file);
          });

          const res = await fetch("/api/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fileName: file.name,
              fileContent: base64Content,
            }),
          });

          if (res.ok) {
            const data = await res.json();
            results.push({ name: file.name, url: data.url });
            uploadedCount++;
          } else {
            const errData = await res.json().catch(() => ({}));
            console.error(`Failed to upload ${file.name}:`, errData);
          }
        } catch (err) {
          console.error(`Error uploading ${file.name}:`, err);
        }
      }

      if (results.length > 0) {
        setUploadedFiles((prev) => [...results, ...prev]);
      }

      if (uploadedCount === fileList.length) {
        setUploadStatus(`성공: 총 ${uploadedCount}개 업로드 완료!`);
      } else {
        setUploadStatus(
          `완료: ${uploadedCount}/${fileList.length}개 업로드 성공`,
        );
      }
      setTimeout(() => setUploadStatus(""), 4000);
    } catch (err) {
      console.error(err);
      setUploadStatus("다중 파일 업로드 프로세스 오류");
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
              fileContent: base64Content,
            }),
          });
          if (res.ok) {
            const data = await res.json();
            setFormData((prev: any) => ({
              ...prev,
              profileImage: data.url,
            }));
            setProfileUploadStatus("성공!");
            setTimeout(() => setProfileUploadStatus(""), 3000);
          } else {
            const errData = await res.json().catch(() => ({}));
            setProfileUploadStatus(
              `실패: ${errData.error || res.statusText || "서버 에러"}`,
            );
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

  const handleProjectImageUpload = async (
    file: File,
    section: "featuredProjects" | "personalProjects",
    idx: number,
  ) => {
    const key = `${section}-${idx}`;
    try {
      setProjectUploadStatus((prev) => ({ ...prev, [key]: "업로드 중..." }));
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Content = reader.result as string;
        try {
          const res = await fetch("/api/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fileName: file.name,
              fileContent: base64Content,
            }),
          });
          if (res.ok) {
            const data = await res.json();
            handleArrayChange(section, idx, "image", data.url);
            setProjectUploadStatus((prev) => ({
              ...prev,
              [key]: "업로드 완료",
            }));
            setTimeout(() => {
              setProjectUploadStatus((prev) => {
                const next = { ...prev };
                delete next[key];
                return next;
              });
            }, 3000);
          } else {
            const errData = await res.json().catch(() => ({}));
            setProjectUploadStatus((prev) => ({
              ...prev,
              [key]: `실패: ${errData.error || res.statusText || "서버 에러"}`,
            }));
            setTimeout(() => {
              setProjectUploadStatus((prev) => {
                const next = { ...prev };
                delete next[key];
                return next;
              });
            }, 5000);
          }
        } catch (err: any) {
          console.error(err);
          setProjectUploadStatus((prev) => ({
            ...prev,
            [key]: `통신 오류: ${err.message || "오류"}`,
          }));
          setTimeout(() => {
            setProjectUploadStatus((prev) => {
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
      setProjectUploadStatus((prev) => ({ ...prev, [key]: "파일 파싱 오류" }));
      setTimeout(() => {
        setProjectUploadStatus((prev) => {
          const next = { ...prev };
          delete next[key];
          return next;
        });
      }, 3000);
    }
  };

  const handleProjectMultipleImagesUpload = async (
    files: FileList,
    section: "featuredProjects" | "personalProjects",
    idx: number,
  ) => {
    const key = `${section}-${idx}-multi`;
    setProjectUploadStatus((prev) => ({
      ...prev,
      [key]: `0/${files.length} 추가 중...`,
    }));

    const uploadedUrls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        setProjectUploadStatus((prev) => ({
          ...prev,
          [key]: `${i + 1}/${files.length} 추가 중...`,
        }));
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
            fileContent: base64Content,
          }),
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
        const currentImages =
          existingProject.representativeImages ||
          (existingProject.image ? [existingProject.image] : []);
        const newImages = [...currentImages, ...uploadedUrls];

        sectionData[idx] = {
          ...existingProject,
          representativeImages: newImages,
          image: newImages[0] || "",
        };

        return {
          ...prev,
          [section]: sectionData,
        };
      });

      setProjectUploadStatus((prev) => ({ ...prev, [key]: "추가 완료!" }));
      setTimeout(() => {
        setProjectUploadStatus((prev) => {
          const next = { ...prev };
          delete next[key];
          return next;
        });
      }, 3000);
    } else {
      setProjectUploadStatus((prev) => ({ ...prev, [key]: "추가 실패" }));
      setTimeout(() => {
        setProjectUploadStatus((prev) => {
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
            <h1 className="text-lg font-bold tracking-tighter leading-none mb-1 text-neutral-900">
              이근일 포트폴리오 관리자
            </h1>
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest translate-y-[2px]">
              PLANNING & CREATOR
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[11px] font-sans text-neutral-500 hidden lg:inline mr-2 bg-neutral-50 border border-neutral-200 px-3 py-1.5 rounded-sm">
            💡 각 항목별{" "}
            <strong className="text-neutral-900">[항목 저장]</strong> 버튼을
            누르면 실시간 반영됩니다.
          </span>
          <button
            onClick={() => (window.location.href = "/")}
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
          <p className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider mb-3 px-3">
            Portfolio Tabs
          </p>
          {[
            {
              id: "about",
              label: "ABOUT ME",
              detail: "자기소개, 명함연락처 및 핵심역량/스택",
            },
            {
              id: "project",
              label: "PROJECT",
              detail: "운영 및 기획 프로젝트",
            },
            {
              id: "activities",
              label: "KEY ACTIVITIES",
              detail: "학력, 경력 이력 및 대외활동 아카이브",
            },
            {
              id: "media",
              label: "MEDIA UPLOADER",
              detail: "미디어 에셋 실시간 업로더",
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-3 text-left rounded-sm transition-all flex flex-col gap-0.5 group outline-none focus:ring-0 ${
                activeTab === tab.id
                  ? "bg-neutral-100 text-black border-l-2 border-black pl-4"
                  : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 pl-3"
              }`}
            >
              <span className="text-[13px] font-bold">{tab.label}</span>
              <span className="text-[9px] font-mono text-neutral-400 group-hover:text-neutral-600 transition-opacity">
                {tab.detail}
              </span>
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
                  <h2 className="text-2xl font-bold tracking-tight mb-1 text-neutral-900">
                    ABOUT ME 설정
                  </h2>
                  <p className="text-xs text-neutral-500">
                    포트폴리오의 핵심인 학력, 역량, 연락처 및 경력 사항을 일괄
                    조율하는 통합 관리 영역입니다.
                  </p>
                </div>

                {/* INTRODUCTION PANEL */}
                <div className="p-4.5 border border-neutral-200 bg-neutral-50/50 rounded-sm shadow-xs animate-fadeIn space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-neutral-150">
                    <div className="flex items-center gap-2">
                      <FileText
                        className="text-neutral-500 shrink-0"
                        size={18}
                      />
                      <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-800">
                        INTRODUCTION (소개 설정)
                      </h3>
                    </div>
                    {renderSaveButton("introduction")}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5 items-start">
                    {/* Left Column: Profile Image Upload & Preview */}
                    <div className="md:col-span-1 space-y-3">
                      <label className="text-xs font-mono uppercase text-neutral-500 block pb-1 border-b border-neutral-150">
                        프로필 이미지 (Profile Image)
                      </label>
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
                                onClick={() =>
                                  handleSimpleFieldChange("profileImage", "")
                                }
                                className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-xs text-red-400 font-bold"
                              >
                                제거하기
                              </button>
                            </>
                          ) : (
                            <div className="text-center p-3 text-neutral-400">
                              <ImageIcon
                                size={24}
                                className="mx-auto mb-1 opacity-60"
                              />
                              <span className="text-[10px] font-mono">
                                NO IMAGE
                              </span>
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
                      <label className="text-xs font-mono uppercase text-neutral-500 block pb-1 border-b border-neutral-150">
                        한줄 소개 문구 (About 헤드라인)
                      </label>
                      <textarea
                        value={formData.introduction || ""}
                        onChange={(e) =>
                          handleSimpleFieldChange(
                            "introduction",
                            e.target.value,
                          )
                        }
                        rows={5}
                        placeholder="기획자 소개 문구를 적어주세요."
                        className="w-full bg-white border border-neutral-205 rounded px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:border-neutral-400 font-sans leading-relaxed"
                      />
                      <p className="text-[11px] text-neutral-500 leading-relaxed font-sans">
                        자기소개 영역에 게재할 직무 타이틀 및 고유 강점을
                        표현하는 핵심 한줄 소개 문구를 입력합니다.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 1. EDUCATION */}
                <div className="p-4.5 border border-neutral-200 bg-neutral-50/55 rounded-sm space-y-3 shadow-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-neutral-150">
                    <div className="flex items-center gap-2">
                      <GraduationCap
                        className="text-neutral-500 shrink-0"
                        size={18}
                      />
                      <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-800">
                        1. EDUCATION (학력)
                      </h3>
                    </div>
                    {renderSaveButton("education")}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">
                        출신 학교
                      </span>
                      <input
                        type="text"
                        value={
                          formData.education?.name ||
                          formData.education?.school ||
                          ""
                        }
                        onChange={(e) => {
                          handleFieldChange(
                            "education",
                            "name",
                            e.target.value,
                          );
                          handleFieldChange(
                            "education",
                            "school",
                            e.target.value,
                          ); // Sync with fallbacks
                        }}
                        className="w-full bg-white border border-neutral-205 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-400 font-medium"
                        placeholder="예: 부산대학교"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">
                        전공 및 편입 여부
                      </span>
                      <input
                        type="text"
                        value={formData.education?.major || ""}
                        onChange={(e) =>
                          handleFieldChange(
                            "education",
                            "major",
                            e.target.value,
                          )
                        }
                        className="w-full bg-white border border-neutral-205 rounded px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-400"
                        placeholder="예: 항공우주공학 & 예술문화영상학"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">
                        재학 기간
                      </span>
                      <input
                        type="text"
                        value={formData.education?.period || ""}
                        onChange={(e) =>
                          handleFieldChange(
                            "education",
                            "period",
                            e.target.value,
                          )
                        }
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
                      <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-800">
                        2. CONTACT (연락처 정보)
                      </h3>
                    </div>
                    {renderSaveButton("contact")}
                  </div>

                  {/* Contact details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-neutral-500">
                        한글/영문 이름
                      </label>
                      <input
                        type="text"
                        value={formData.contact?.name || ""}
                        onChange={(e) =>
                          handleFieldChange("contact", "name", e.target.value)
                        }
                        className="w-full bg-white border border-neutral-205 rounded px-4 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-400 font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-neutral-500">
                        이메일 주소
                      </label>
                      <input
                        type="text"
                        value={formData.contact?.email || ""}
                        onChange={(e) =>
                          handleFieldChange("contact", "email", e.target.value)
                        }
                        className="w-full bg-white border border-neutral-205 rounded px-4 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-400 font-mono"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-neutral-500">
                        연락처
                      </label>
                      <input
                        type="text"
                        value={formData.contact?.phone || ""}
                        onChange={(e) =>
                          handleFieldChange("contact", "phone", e.target.value)
                        }
                        className="w-full bg-white border border-neutral-205 rounded px-4 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-400 font-mono"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-neutral-500">
                        활동 기지 (위치)
                      </label>
                      <input
                        type="text"
                        value={formData.contact?.location || ""}
                        onChange={(e) =>
                          handleFieldChange(
                            "contact",
                            "location",
                            e.target.value,
                          )
                        }
                        className="w-full bg-white border border-neutral-205 rounded px-4 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-400"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-mono uppercase text-neutral-500">
                        인스타그램 핸들 (@)
                      </label>
                      <input
                        type="text"
                        value={formData.contact?.instagram || ""}
                        onChange={(e) =>
                          handleFieldChange(
                            "contact",
                            "instagram",
                            e.target.value,
                          )
                        }
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
                      <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-850">
                        3. CERTIFICATES (자격증)
                      </h3>
                    </div>
                    <div className="flex items-center gap-3">
                      {renderSaveButton("certificates")}
                      <button
                        onClick={() =>
                          handleArrayAdd("certificates", {
                            title: "새 자격증",
                            subtitle: "점수/등급 정보",
                          })
                        }
                        className="px-3 py-1 bg-neutral-100 text-neutral-800 border border-neutral-300 text-xs rounded-sm hover:bg-neutral-200 font-semibold transition-all"
                      >
                        + 자격증 추가
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {(formData.certificates || []).map(
                      (cert: any, idx: number) => (
                        <div
                          key={idx}
                          className="p-3.5 border border-neutral-200 bg-neutral-50/30 rounded-sm flex flex-col md:flex-row gap-3 md:items-end shadow-3xs"
                        >
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <input
                                type="text"
                                value={cert.title || ""}
                                onChange={(e) =>
                                  handleArrayChange(
                                    "certificates",
                                    idx,
                                    "title",
                                    e.target.value,
                                  )
                                }
                                className="w-full bg-white border border-neutral-205 rounded px-3 py-1.5 text-xs font-bold text-neutral-900 focus:outline-none focus:border-neutral-400"
                                placeholder="예: 컴퓨터활용능력 1급"
                              />
                            </div>
                            <div>
                              <input
                                type="text"
                                value={cert.subtitle || ""}
                                onChange={(e) =>
                                  handleArrayChange(
                                    "certificates",
                                    idx,
                                    "subtitle",
                                    e.target.value,
                                  )
                                }
                                className="w-full bg-white border border-neutral-205 rounded px-3 py-1.5 text-xs text-neutral-700 focus:outline-none focus:border-neutral-400"
                                placeholder="예: 최우수 등급 (점수 등)"
                              />
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              handleArrayDelete("certificates", idx)
                            }
                            className="px-3 py-2 border border-neutral-200 bg-white hover:bg-red-50 hover:border-red-200 text-neutral-400 hover:text-red-500 rounded-sm transition-all flex items-center justify-center gap-1 text-xs shrink-0 font-medium"
                            title="자격증 제거"
                          >
                            <Trash2 size={13} />
                            <span>제거</span>
                          </button>
                        </div>
                      ),
                    )}
                    {(formData.certificates || []).length === 0 && (
                      <div className="text-center p-6 border border-dashed border-neutral-300 rounded text-xs text-neutral-500 font-mono">
                        등록된 자격증 정보가 없습니다. 버튼을 늘러 첫 자격증을
                        등재해 보셔요!
                      </div>
                    )}
                  </div>
                </div>

                {/* 4. SKILLS & TOOLS */}
                <div className="p-4.5 border border-neutral-200 bg-neutral-50/55 rounded-sm space-y-4 shadow-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-neutral-150">
                    <div className="flex items-center gap-2">
                      <Wrench className="text-neutral-500 shrink-0" size={18} />
                      <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-850">
                        4. SKILLS & TOOLS (기술 및 협업 도구)
                      </h3>
                    </div>
                    {renderSaveButton("skills")}
                  </div>

                  <div className="space-y-4">
                    {/* DESIGN */}
                    {(() => {
                      const groupIdx =
                        formData.techStack?.findIndex(
                          (g: any) =>
                            (g.label || "").toUpperCase() === "DESIGN",
                        ) ?? -1;
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
                                const text = prompt(
                                  "추가할 DESIGN 툴 이름을 입력하세요:",
                                );
                                if (text) {
                                  const updated = [
                                    ...(group.items || []),
                                    text,
                                  ];
                                  handleArrayChange(
                                    "techStack",
                                    groupIdx,
                                    "items",
                                    updated,
                                  );
                                }
                              }}
                              className="text-xs text-neutral-600 hover:text-black hover:underline font-mono font-medium"
                            >
                              + 디자인 키워드 추가
                            </button>
                          </div>

                          <div className="flex flex-wrap gap-1.5 p-3 bg-neutral-50 border border-neutral-200 rounded min-h-[40px]">
                            {(group.items || []).map(
                              (tag: string, tagIdx: number) => (
                                <span
                                  key={tagIdx}
                                  className="bg-neutral-100 text-neutral-800 border border-neutral-200 px-2.5 py-1 rounded text-xs font-mono flex items-center gap-1.5 shadow-sm"
                                >
                                  {tag}
                                  <button
                                    onClick={() => {
                                      const updated = [...(group.items || [])];
                                      updated.splice(tagIdx, 1);
                                      handleArrayChange(
                                        "techStack",
                                        groupIdx,
                                        "items",
                                        updated,
                                      );
                                    }}
                                    className="text-neutral-400 hover:text-red-500 text-xs font-bold"
                                  >
                                    ×
                                  </button>
                                </span>
                              ),
                            )}
                            {(group.items || []).length === 0 && (
                              <span className="text-neutral-400 text-[11px] font-mono italic self-center">
                                등록된 디자인 키워드가 없습니다.
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })()}

                    {/* OFFICE */}
                    {(() => {
                      const groupIdx =
                        formData.techStack?.findIndex(
                          (g: any) =>
                            (g.label || "").toUpperCase() === "OFFICE",
                        ) ?? -1;
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
                                const text = prompt(
                                  "추가할 OFFICE 툴 이름을 입력하세요:",
                                );
                                if (text) {
                                  const updated = [
                                    ...(group.items || []),
                                    text,
                                  ];
                                  handleArrayChange(
                                    "techStack",
                                    groupIdx,
                                    "items",
                                    updated,
                                  );
                                }
                              }}
                              className="text-xs text-neutral-600 hover:text-black hover:underline font-mono font-medium"
                            >
                              + 오피스 키워드 추가
                            </button>
                          </div>

                          <div className="flex flex-wrap gap-1.5 p-3 bg-neutral-50 border border-neutral-200 rounded min-h-[40px]">
                            {(group.items || []).map(
                              (tag: string, tagIdx: number) => (
                                <span
                                  key={tagIdx}
                                  className="bg-neutral-100 text-neutral-800 border border-neutral-200 px-2.5 py-1 rounded text-xs font-mono flex items-center gap-1.5 shadow-sm"
                                >
                                  {tag}
                                  <button
                                    onClick={() => {
                                      const updated = [...(group.items || [])];
                                      updated.splice(tagIdx, 1);
                                      handleArrayChange(
                                        "techStack",
                                        groupIdx,
                                        "items",
                                        updated,
                                      );
                                    }}
                                    className="text-neutral-400 hover:text-red-500 text-xs font-bold"
                                  >
                                    ×
                                  </button>
                                </span>
                              ),
                            )}
                            {(group.items || []).length === 0 && (
                              <span className="text-neutral-400 text-[11px] font-mono italic self-center">
                                등록된 오피스 키워드가 없습니다.
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })()}

                    {/* TEAM WORK */}
                    {(() => {
                      const groupIdx =
                        formData.techStack?.findIndex(
                          (g: any) =>
                            (g.label || "").toUpperCase() === "TEAM WORK",
                        ) ?? -1;
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
                                const text = prompt(
                                  "추가할 TEAM WORK 툴 이름을 입력하세요:",
                                );
                                if (text) {
                                  const updated = [
                                    ...(group.items || []),
                                    text,
                                  ];
                                  handleArrayChange(
                                    "techStack",
                                    groupIdx,
                                    "items",
                                    updated,
                                  );
                                }
                              }}
                              className="text-xs text-neutral-600 hover:text-black hover:underline font-mono font-medium"
                            >
                              + 팀워크 키워드 추가
                            </button>
                          </div>

                          <div className="flex flex-wrap gap-1.5 p-3 bg-neutral-50 border border-neutral-200 rounded min-h-[40px]">
                            {(group.items || []).map(
                              (tag: string, tagIdx: number) => (
                                <span
                                  key={tagIdx}
                                  className="bg-neutral-100 text-neutral-800 border border-neutral-200 px-2.5 py-1 rounded text-xs font-mono flex items-center gap-1.5 shadow-sm"
                                >
                                  {tag}
                                  <button
                                    onClick={() => {
                                      const updated = [...(group.items || [])];
                                      updated.splice(tagIdx, 1);
                                      handleArrayChange(
                                        "techStack",
                                        groupIdx,
                                        "items",
                                        updated,
                                      );
                                    }}
                                    className="text-neutral-400 hover:text-red-500 text-xs font-bold"
                                  >
                                    ×
                                  </button>
                                </span>
                              ),
                            )}
                            {(group.items || []).length === 0 && (
                              <span className="text-neutral-400 text-[11px] font-mono italic self-center">
                                등록된 협업 키워드가 없습니다.
                              </span>
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
                      <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-850">
                        5. WORK EXPERIENCE (실무 경험)
                      </h3>
                    </div>
                    <div className="flex items-center gap-3">
                      {renderSaveButton("work_experience")}
                      <button
                        onClick={() =>
                          handleArrayAdd("workExperience", {
                            company: "회사명",
                            tags: "역할 및 소속팀 정보",
                            period: "YYYY.MM ~ YYYY.MM",
                            desc: [],
                          })
                        }
                        className="px-3 py-1.5 bg-neutral-100 text-neutral-800 border border-neutral-300 text-xs rounded-sm hover:bg-neutral-200 font-semibold"
                      >
                        + 실무 경력 추가
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {(formData.workExperience || []).map(
                      (exp: any, idx: number) => (
                        <div
                          key={idx}
                          className="p-4 border border-neutral-200 bg-neutral-50/30 rounded-sm space-y-3 animate-fadeIn shadow-3xs"
                        >
                          <div className="flex justify-between items-center border-b border-neutral-200 pb-2">
                            <code className="text-[11px] font-bold text-neutral-400 font-mono">
                              #{idx + 1}
                            </code>
                            <button
                              onClick={() =>
                                handleArrayDelete("workExperience", idx)
                              }
                              className="text-neutral-400 hover:text-red-500 transition-all font-semibold text-xs flex items-center gap-1 hover:underline"
                            >
                              <Trash2 size={13} /> 제거
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="space-y-1">
                              <span className="text-[9px] font-mono text-neutral-500 uppercase font-semibold">
                                회사명 (Company)
                              </span>
                              <input
                                type="text"
                                value={exp.company || ""}
                                onChange={(e) =>
                                  handleArrayChange(
                                    "workExperience",
                                    idx,
                                    "company",
                                    e.target.value,
                                  )
                                }
                                className="w-full bg-white border border-neutral-205 rounded px-3 py-2 text-xs font-bold text-neutral-900 focus:outline-none focus:border-neutral-400"
                                placeholder="예: 예담 기획실"
                              />
                            </div>
                            <div className="space-y-1">
                              <span className="text-[9px] font-mono text-neutral-500 uppercase font-semibold">
                                소속팀 / 직종 태그 (Tags)
                              </span>
                              <input
                                type="text"
                                value={exp.tags || ""}
                                onChange={(e) =>
                                  handleArrayChange(
                                    "workExperience",
                                    idx,
                                    "tags",
                                    e.target.value,
                                  )
                                }
                                className="w-full bg-white border border-neutral-205 rounded px-3 py-2 text-xs text-neutral-850 focus:outline-none focus:border-neutral-400"
                                placeholder="예: 크리에이티브 디렉터 / 기획실장"
                              />
                            </div>
                            <div className="space-y-1">
                              <span className="text-[9px] font-mono text-neutral-500 uppercase font-semibold">
                                근무 기간 (Period)
                              </span>
                              <input
                                type="text"
                                value={exp.period || ""}
                                onChange={(e) =>
                                  handleArrayChange(
                                    "workExperience",
                                    idx,
                                    "period",
                                    e.target.value,
                                  )
                                }
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
                                onClick={() =>
                                  handleArrayBulletAdd(
                                    "workExperience",
                                    idx,
                                    "desc",
                                  )
                                }
                                className="text-neutral-700 hover:text-black hover:underline text-[10px]"
                              >
                                + 상세 항목 추가
                              </button>
                            </div>
                            <div className="space-y-2">
                              {(exp.desc || []).map(
                                (bullet: string, bulletIdx: number) => (
                                  <div
                                    key={bulletIdx}
                                    className="flex items-center gap-2"
                                  >
                                    <span className="text-neutral-400 text-xs shrink-0 font-mono">
                                      •
                                    </span>
                                    <input
                                      type="text"
                                      value={bullet}
                                      onChange={(e) =>
                                        handleArrayBulletChange(
                                          "workExperience",
                                          idx,
                                          "desc",
                                          bulletIdx,
                                          e.target.value,
                                        )
                                      }
                                      className="w-full bg-white border border-neutral-205 rounded px-3 py-1.5 text-xs text-neutral-800 focus:outline-none focus:border-neutral-400"
                                    />
                                    <button
                                      onClick={() =>
                                        handleArrayBulletDelete(
                                          "workExperience",
                                          idx,
                                          "desc",
                                          bulletIdx,
                                        )
                                      }
                                      className="text-neutral-400 hover:text-red-500 font-bold"
                                    >
                                      ×
                                    </button>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        </div>
                      ),
                    )}
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
                  <h2 className="text-2xl font-bold tracking-tight mb-1 text-neutral-900">
                    KEY ACTIVITIES 설정
                  </h2>
                  <p className="text-xs text-neutral-500">
                    대외 활동, 대외 협력단 활동 및 아카이브 목록을 조율해
                    보세요.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-neutral-200">
                    <div className="flex items-center gap-2">
                      <GraduationCap
                        className="text-neutral-500 shrink-0"
                        size={18}
                      />
                      <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-850">
                        대외 활동 아카이브 (Activities)
                      </h3>
                    </div>
                    <div className="flex items-center gap-3">
                      {renderSaveButton("key_activities")}
                      <button
                        onClick={() =>
                          handleArrayAdd("activities", {
                            title: "새 활동 제목",
                            org: "주최 단체명",
                            period: "YYYY.MM ~ YYYY.MM",
                            desc: [],
                          })
                        }
                        className="px-3 py-1.5 bg-neutral-100 text-neutral-800 border border-neutral-300 text-xs rounded-sm hover:bg-neutral-200 font-semibold"
                      >
                        + 활동 추가
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {(formData.activities || []).map(
                      (act: any, idx: number) => (
                        <div
                          key={idx}
                          className="p-4 border border-neutral-200 bg-neutral-50/30 rounded-sm space-y-3 animate-fadeIn shadow-3xs"
                        >
                          <div className="flex justify-between items-center border-b border-neutral-200 pb-2">
                            <code className="text-[11px] font-bold text-neutral-400 font-mono">
                              #{idx + 1}
                            </code>
                            <button
                              onClick={() =>
                                handleArrayDelete("activities", idx)
                              }
                              className="text-neutral-400 hover:text-red-500 transition-all font-semibold text-xs flex items-center gap-1 hover:underline"
                            >
                              <Trash2 size={13} /> 제거
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                            <div className="space-y-1">
                              <span className="text-[9px] font-mono text-neutral-500 uppercase">
                                대외 활동명
                              </span>
                              <input
                                type="text"
                                value={act.title || ""}
                                onChange={(e) =>
                                  handleArrayChange(
                                    "activities",
                                    idx,
                                    "title",
                                    e.target.value,
                                  )
                                }
                                className="w-full bg-white border border-neutral-205 rounded px-3 py-2 text-xs font-bold text-neutral-900 focus:outline-none focus:border-neutral-400"
                                placeholder="예: 대학 예술 가요제"
                              />
                            </div>
                            <div className="space-y-1 flex flex-col">
                              <span className="text-[9px] font-mono text-neutral-500 uppercase">
                                소속/주최 단체
                              </span>
                              <input
                                type="text"
                                value={act.org || ""}
                                onChange={(e) =>
                                  handleArrayChange(
                                    "activities",
                                    idx,
                                    "org",
                                    e.target.value,
                                  )
                                }
                                className="w-full bg-white border border-neutral-205 rounded px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:border-neutral-400"
                                placeholder="예: 예술조직위원회"
                              />
                            </div>
                            <div className="space-y-1">
                              <span className="text-[9px] font-mono text-neutral-500 uppercase">
                                활동 기간
                              </span>
                              <input
                                type="text"
                                value={act.period || ""}
                                onChange={(e) =>
                                  handleArrayChange(
                                    "activities",
                                    idx,
                                    "period",
                                    e.target.value,
                                  )
                                }
                                className="w-full bg-white border border-neutral-205 rounded px-3 py-2 text-xs font-mono text-neutral-900 focus:outline-none focus:border-neutral-400"
                                placeholder="예: 2021.06 ~ 2021.12"
                              />
                            </div>
                            <div className="space-y-1 flex flex-col">
                              <span className="text-[9px] font-mono text-neutral-500 uppercase">
                                국가 (Country)
                              </span>
                              <select
                                value={act.country?.code || ""}
                                onChange={(e) => {
                                  const selectedCode = e.target.value;
                                  const found = COUNTRY_LIST.find(
                                    (c) => c.code === selectedCode,
                                  );
                                  if (found && selectedCode !== "") {
                                    handleArrayChange(
                                      "activities",
                                      idx,
                                      "country",
                                      { code: found.code, name: found.name },
                                    );
                                  } else {
                                    handleArrayChange(
                                      "activities",
                                      idx,
                                      "country",
                                      null,
                                    );
                                  }
                                }}
                                className="w-full bg-white border border-neutral-205 rounded px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:border-neutral-400 h-[34px]"
                              >
                                {COUNTRY_LIST.map((c) => (
                                  <option key={c.code} value={c.code}>
                                    {c.name} {c.code ? `(${c.code})` : ""}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* Bullets subform */}
                          <div className="space-y-2 border-t border-neutral-150 pt-4">
                            <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500 mb-1">
                              <span>상세 성과 및 경험 (Bullets)</span>
                              <button
                                onClick={() =>
                                  handleArrayBulletAdd(
                                    "activities",
                                    idx,
                                    "desc",
                                  )
                                }
                                className="text-neutral-700 hover:text-black hover:underline text-[10px]"
                              >
                                + 상세 항목 추가
                              </button>
                            </div>
                            <div className="space-y-2">
                              {(act.desc || []).map(
                                (bullet: string, bulletIdx: number) => (
                                  <div
                                    key={bulletIdx}
                                    className="flex items-center gap-2"
                                  >
                                    <span className="text-neutral-400 text-xs shrink-0 font-mono">
                                      •
                                    </span>
                                    <input
                                      type="text"
                                      value={bullet}
                                      onChange={(e) =>
                                        handleArrayBulletChange(
                                          "activities",
                                          idx,
                                          "desc",
                                          bulletIdx,
                                          e.target.value,
                                        )
                                      }
                                      className="w-full bg-white border border-neutral-205 rounded px-3 py-1.5 text-xs text-neutral-800 focus:outline-none focus:border-neutral-400"
                                    />
                                    <button
                                      onClick={() =>
                                        handleArrayBulletDelete(
                                          "activities",
                                          idx,
                                          "desc",
                                          bulletIdx,
                                        )
                                      }
                                      className="text-neutral-400 hover:text-red-500"
                                    >
                                      ×
                                    </button>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        </div>
                      ),
                    )}
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
                      운영 (Operations)
                    </button>
                    <button
                      onClick={() => setProjectSubTab("personal")}
                      className={`px-4 py-2 text-xs font-bold font-mono uppercase tracking-wider transition-all rounded-[1px] ${
                        projectSubTab === "personal"
                          ? "bg-white text-neutral-900 shadow-3xs"
                          : "text-neutral-500 hover:text-neutral-800"
                      }`}
                    >
                      기획 (Planning)
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
                        <h2 className="text-xl font-bold tracking-tight mb-1 text-neutral-900">
                          프로젝트 목록
                        </h2>
                        <p className="text-xs text-neutral-500">
                          페스티벌, 콘서트, 브랜드 쇼케이스 등 메이드온 현장
                          총괄 및 PM 이력 프로젝트입니다.
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        {renderSaveButton("featured_projects")}
                        <button
                          onClick={() =>
                            handleArrayAdd("featuredProjects", {
                              title: "새 기획 페스티벌",
                              category: "운영",
                              year: "2024",
                              image:
                                "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
                              contribution: "25%",
                              description: "수행한 업무에 대한 간단요약 설명",
                              fullDescription: "모달에 출력되는 긴 상세 문안",
                              details: ["세부 사항 1", "세부 사항 2"],
                              process: [],
                              results: [],
                              role: { title: "티켓 총괄 운영", items: [] },
                            })
                          }
                          className="px-3 py-1.5 bg-neutral-100 text-neutral-800 border border-neutral-300 text-xs rounded-sm hover:bg-neutral-200 font-semibold transition-all"
                        >
                          + 새 프로젝트 추가
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {(formData.featuredProjects || []).map(
                        (project: any, idx: number) => {
                          if (idx === 0) {
                            const descVal =
                              project.fullDescription ||
                              project.description ||
                              "";
                            let introText = descVal;
                            let achievements: string[] = [];

                            const marker = "[주요 운영 실적]";
                            const splitIdx = descVal.indexOf(marker);
                            if (splitIdx !== -1) {
                              introText = descVal.substring(0, splitIdx).trim();
                              const rest = descVal
                                .substring(splitIdx + marker.length)
                                .trim();
                              achievements = rest
                                .split("\n")
                                .map((l: string) =>
                                  l.trim().replace(/^[\-\•\*\s]+/g, ""),
                                )
                                .filter(Boolean);
                            } else {
                              achievements = [
                                "2024 WATERBOMB 전국",
                                "2024 인천펜타포트국제록페스티벌",
                                "2524 어썸뮤직페스티벌",
                                "2024 이슬라이브 페스티벌",
                                "2024 여수 썸머 뮤직 페스티벌",
                                "2024 로즈아워 페스티벌",
                                "2024 부산 국제 록 페스티벌",
                                "2024 그린캠프 페스티벌",
                              ];
                            }

                            const syncFestivalDesc = (
                              newIntro: string,
                              newAch: string[],
                            ) => {
                              const trimmedIntro = (newIntro || "").trim();
                              const formattedAch = newAch
                                .map((a) => a.trim())
                                .filter(Boolean)
                                .map((a) => `- ${a}`)
                                .join("\n");
                              const combined = `${trimmedIntro}\n\n[주요 운영 실적]\n${formattedAch}`;
                              handleArrayChange(
                                "featuredProjects",
                                0,
                                "fullDescription",
                                combined,
                              );
                            };

                            const participatingProjects =
                              project.festivalProjects2 || [
                                "2024 WATERBOMB 서울",
                                "2024 WATERBOMB 대전",
                                "2024 WATERBOMB 대구",
                                "2024 WATERBOMB 부산",
                                "2024 WATERBOMB 인천",
                                "2024 WATERBOMB 수원",
                                "2024 WATERBOMB 여수",
                              ];

                            const ticketImages = project.ticketImages || [
                              "https://raw.githubusercontent.com/2green-lee/Portfolio/56c4f5445b717b306b75e71ace91b475a1d6d8cf/ticket%201.jpeg",
                              "https://raw.githubusercontent.com/2green-lee/Portfolio/56c4f5445b717b306b75e71ace91b475a1d6d8cf/ticket%202.jpeg",
                              "https://raw.githubusercontent.com/2green-lee/Portfolio/26d00476109ec84b3d9f253c464088f278d4051b/ticket3.jpg",
                              "https://raw.githubusercontent.com/2green-lee/Portfolio/26d00476109ec84b3d9f253c464088f278d4051b/ticket4.jpg",
                            ];

                            let processTicketObj = project.processTicket;
                            if (
                              !processTicketObj ||
                              processTicketObj.length === 0
                            ) {
                              processTicketObj = JSON.parse(
                                JSON.stringify(DEFAULT_FESTIVAL_TICKET),
                              );
                            }

                            const handleTicketImageUploadLocal = async (
                              file: File,
                              imgIdx: number,
                            ) => {
                              const key = `ticketImage-${imgIdx}`;
                              try {
                                setProjectUploadStatus((prev) => ({
                                  ...prev,
                                  [key]: "업로드 중...",
                                }));
                                const reader = new FileReader();
                                reader.onloadend = async () => {
                                  const base64Content = reader.result as string;
                                  try {
                                    const res = await fetch("/api/upload", {
                                      method: "POST",
                                      headers: {
                                        "Content-Type": "application/json",
                                      },
                                      body: JSON.stringify({
                                        fileName: file.name,
                                        fileContent: base64Content,
                                      }),
                                    });
                                    if (res.ok) {
                                      const data = await res.json();
                                      const currentImages = [...ticketImages];
                                      currentImages[imgIdx] = data.url;
                                      handleArrayChange(
                                        "featuredProjects",
                                        0,
                                        "ticketImages",
                                        currentImages,
                                      );
                                      setProjectUploadStatus((prev) => ({
                                        ...prev,
                                        [key]: "업로드 완료",
                                      }));
                                      setTimeout(() => {
                                        setProjectUploadStatus((prev) => {
                                          const next = { ...prev };
                                          delete next[key];
                                          return next;
                                        });
                                      }, 3000);
                                    } else {
                                      setProjectUploadStatus((prev) => ({
                                        ...prev,
                                        [key]: "실패",
                                      }));
                                    }
                                  } catch (err) {
                                    setProjectUploadStatus((prev) => ({
                                      ...prev,
                                      [key]: "에러",
                                    }));
                                  }
                                };
                                reader.readAsDataURL(file);
                              } catch (err) {
                                setProjectUploadStatus((prev) => ({
                                  ...prev,
                                  [key]: "파일 에러",
                                }));
                              }
                            };

                            const fnbProjects = project.festivalProjects3 || [
                              "2024 인천펜타포트국제록페스티벌",
                              "2024 어썸뮤직페스티벌",
                              "2024 이슬라이브 페스티벌",
                              "2024 여수 썸머 뮤직 페스티벌",
                              "2024 로즈아워 페스티벌",
                            ];

                            const fnbImages = project.fnbImages || [
                              "https://raw.githubusercontent.com/2green-lee/Portfolio/bfe56c116e09a1caaea1b2ccf474a1498975af18/kiosk%201.jpg",
                              "https://raw.githubusercontent.com/2green-lee/Portfolio/bfe56c116e09a1caaea1b2ccf474a1498975af18/kiosk%202.jpg",
                              "https://raw.githubusercontent.com/2green-lee/Portfolio/bfe56c116e09a1caaea1b2ccf474a1498975af18/food4.jpeg",
                              "https://raw.githubusercontent.com/2green-lee/Portfolio/1f77a94cdeca5069b8f04f33d81f2b7a323a4c07/food5.jpg"
                            ];

                            let processFnBObj = project.processFnB;
                            if (!processFnBObj || processFnBObj.length === 0) {
                              processFnBObj = JSON.parse(
                                JSON.stringify(DEFAULT_FESTIVAL_FNB),
                              );
                            }

                            const storageProjects =
                              project.festivalProjects4 || [
                                "2024 부산 국제 록 페스티벌 (MD)",
                                "2024 WATERBOMB 제주 (물품보관소)",
                                "2024 WATERBOMB 속초 (물품보관소)",
                                "2024 그린캠프 페스티벌 (물품보관소)",
                              ];

                            const storageImages = project.storageImages || [
                              "https://raw.githubusercontent.com/2green-lee/Portfolio/4446a5d2c5b32572cad3167985cfa66c83cf632d/lock%202.jpeg",
                              "https://raw.githubusercontent.com/2green-lee/Portfolio/4446a5d2c5b32572cad3167985cfa66c83cf632d/lock%203.jpeg",
                              "https://raw.githubusercontent.com/2green-lee/Portfolio/4446a5d2c5b32572cad3167985cfa66c83cf632d/lock%205.jpg",
                              "https://raw.githubusercontent.com/2green-lee/Portfolio/4446a5d2c5b32572cad3167985cfa66c83cf632d/lcok%206.jpg",
                              "https://raw.githubusercontent.com/2green-lee/Portfolio/4446a5d2c5b32572cad3167985cfa66c83cf632d/MD1.jpg",
                              "https://raw.githubusercontent.com/2green-lee/Portfolio/4446a5d2c5b32572cad3167985cfa66c83cf632d/MD2.jpg"
                            ];

                            const galleryImages = project.images || [];

                            let processStorageObj = project.processStorage;
                            if (
                              !processStorageObj ||
                              processStorageObj.length === 0
                            ) {
                              processStorageObj = JSON.parse(
                                JSON.stringify(DEFAULT_FESTIVAL_STORAGE),
                              );
                            }

                            const handleFestivalImageUploadLocal = async (
                              file: File,
                              arrayKey: "fnbImages" | "storageImages",
                              imgIdx: number,
                            ) => {
                              const key = `${arrayKey}-${imgIdx}`;
                              try {
                                setProjectUploadStatus((prev) => ({
                                  ...prev,
                                  [key]: "업로드 중...",
                                }));
                                const reader = new FileReader();
                                reader.onloadend = async () => {
                                  const base64Content = reader.result as string;
                                  try {
                                    const res = await fetch("/api/upload", {
                                      method: "POST",
                                      headers: {
                                        "Content-Type": "application/json",
                                      },
                                      body: JSON.stringify({
                                        fileName: file.name,
                                        fileContent: base64Content,
                                      }),
                                    });
                                    if (res.ok) {
                                      const data = await res.json();
                                      const currentImages =
                                        arrayKey === "fnbImages"
                                          ? [...fnbImages]
                                          : [...storageImages];
                                      currentImages[imgIdx] = data.url;
                                      handleArrayChange(
                                        "featuredProjects",
                                        idx,
                                        arrayKey,
                                        currentImages,
                                      );
                                      setProjectUploadStatus((prev) => ({
                                        ...prev,
                                        [key]: "업로드 완료",
                                      }));
                                      setTimeout(() => {
                                        setProjectUploadStatus((prev) => {
                                          const next = { ...prev };
                                          delete next[key];
                                          return next;
                                        });
                                      }, 3000);
                                    } else {
                                      setProjectUploadStatus((prev) => ({
                                        ...prev,
                                        [key]: "실패",
                                      }));
                                    }
                                  } catch (err) {
                                    setProjectUploadStatus((prev) => ({
                                      ...prev,
                                      [key]: "에러",
                                    }));
                                  }
                                };
                                reader.readAsDataURL(file);
                              } catch (err) {
                                setProjectUploadStatus((prev) => ({
                                  ...prev,
                                  [key]: "파일 에러",
                                }));
                              }
                            };

                            const handleGalleryImageUploadLocal = async (
                              file: File,
                            ) => {
                              const key = `galleryImage-new`;
                              try {
                                setProjectUploadStatus((prev) => ({
                                  ...prev,
                                  [key]: "업로드 중...",
                                }));
                                const reader = new FileReader();
                                reader.onloadend = async () => {
                                  const base64Content = reader.result as string;
                                  try {
                                    const res = await fetch("/api/upload", {
                                      method: "POST",
                                      headers: {
                                        "Content-Type": "application/json",
                                      },
                                      body: JSON.stringify({
                                        fileName: file.name,
                                        fileContent: base64Content,
                                      }),
                                    });
                                    if (res.ok) {
                                      const data = await res.json();
                                      const currentImages = [
                                        ...galleryImages,
                                        data.url,
                                      ];
                                      handleArrayChange(
                                        "featuredProjects",
                                        0,
                                        "images",
                                        currentImages,
                                      );
                                      setProjectUploadStatus((prev) => ({
                                        ...prev,
                                        [key]: "업로드 완료",
                                      }));
                                      setTimeout(() => {
                                        setProjectUploadStatus((prev) => {
                                          const next = { ...prev };
                                          delete next[key];
                                          return next;
                                        });
                                      }, 3000);
                                    } else {
                                      setProjectUploadStatus((prev) => ({
                                        ...prev,
                                        [key]: "실패",
                                      }));
                                    }
                                  } catch (err) {
                                    setProjectUploadStatus((prev) => ({
                                      ...prev,
                                      [key]: "에러",
                                    }));
                                  }
                                };
                                reader.readAsDataURL(file);
                              } catch (err) {
                                setProjectUploadStatus((prev) => ({
                                  ...prev,
                                  [key]: "파일 에러",
                                }));
                              }
                            };

                            return (
                              <div
                                key={idx}
                                className="p-6 border border-neutral-300 bg-white rounded-[15px] space-y-6 shadow-sm animate-fadeIn text-neutral-900 font-sans"
                              >
                                {/* Header Title with Custom Indicators */}
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b-2 border-neutral-800 pb-4">
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="bg-neutral-900 border border-neutral-900 hover:bg-neutral-800 text-white font-mono font-black text-[10px] px-2.5 py-1 rounded">
                                        프로젝트 번호 #1
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 pr-1">
                                    {renderSaveButton("featured_projects")}
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleArrayDelete(
                                          "featuredProjects",
                                          idx,
                                        )
                                      }
                                      className="text-neutral-400 hover:text-red-500 transition-all font-mono text-xs flex items-center gap-1 hover:underline ml-2"
                                    >
                                      <Trash2 size={13} /> 제거
                                    </button>
                                  </div>
                                </div>

                                {/* *는 상위 탭 (Tab selection) */}
                                <div className="flex flex-wrap border-b border-neutral-200 gap-1 select-none">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setFestivalActiveTab("summary")
                                    }
                                    className={`px-5 py-2.5 text-xs font-black tracking-wider transition-all flex items-center gap-2 border-t border-x rounded-t-[10px] -mb-px ${
                                      festivalActiveTab === "summary"
                                        ? "border-neutral-800 border-b-white bg-white text-neutral-900 font-extrabold scale-[1.01]"
                                        : "border-transparent bg-neutral-50 hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700"
                                    }`}
                                  >
                                    <span className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0" />
                                    <span>개요</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setFestivalActiveTab("ticket")
                                    }
                                    className={`px-5 py-2.5 text-xs font-black tracking-wider transition-all flex items-center gap-2 border-t border-x rounded-t-[10px] -mb-px ${
                                      festivalActiveTab === "ticket"
                                        ? "border-neutral-800 border-b-white bg-white text-neutral-900 font-extrabold scale-[1.01]"
                                        : "border-transparent bg-neutral-50 hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700"
                                    }`}
                                  >
                                    <span className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0" />
                                    <span>티켓 운영</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setFestivalActiveTab("fnb")}
                                    className={`px-5 py-2.5 text-xs font-black tracking-wider transition-all flex items-center gap-2 border-t border-x rounded-t-[10px] -mb-px ${
                                      festivalActiveTab === "fnb"
                                        ? "border-neutral-800 border-b-white bg-white text-neutral-900 font-extrabold scale-[1.01]"
                                        : "border-transparent bg-neutral-50 hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700"
                                    }`}
                                  >
                                    <span className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0" />
                                    <span>F&B 운영</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setFestivalActiveTab("storage")
                                    }
                                    className={`px-5 py-2.5 text-xs font-black tracking-wider transition-all flex items-center gap-2 border-t border-x rounded-t-[10px] -mb-px ${
                                      festivalActiveTab === "storage"
                                        ? "border-neutral-800 border-b-white bg-white text-neutral-900 font-extrabold scale-[1.01]"
                                        : "border-transparent bg-neutral-50 hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700"
                                    }`}
                                  >
                                    <span className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0" />
                                    <span>MD판매 & 물품보관소</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setFestivalActiveTab("gallery")
                                    }
                                    className={`px-5 py-2.5 text-xs font-black tracking-wider transition-all flex items-center gap-2 border-t border-x rounded-t-[10px] -mb-px ${
                                      festivalActiveTab === "gallery"
                                        ? "border-neutral-800 border-b-white bg-white text-neutral-900 font-extrabold scale-[1.01]"
                                        : "border-transparent bg-neutral-50 hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700"
                                    }`}
                                  >
                                    <span className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0" />
                                    <span>갤러리</span>
                                  </button>
                                </div>

                                {/* TAB CONTENT: 개요 (Summary) */}
                                {festivalActiveTab === "summary" && (
                                  <div className="space-y-5 pt-2 animate-fadeIn text-neutral-900 font-sans">
                                    {/* - 공연/프로젝트 이름 */}
                                    <div className="p-4.5 border border-neutral-200 bg-neutral-50/50 rounded-[12px] space-y-2">
                                      <div className="flex items-center gap-2 text-xs font-bold text-neutral-800">
                                        <span className="text-neutral-400 font-mono text-[14px] font-bold shrink-0">
                                          -
                                        </span>
                                        <span>공연/프로젝트 이름</span>
                                      </div>
                                      <input
                                        type="text"
                                        value={project.title || ""}
                                        onChange={(e) =>
                                          handleArrayChange(
                                            "featuredProjects",
                                            idx,
                                            "title",
                                            e.target.value,
                                          )
                                        }
                                        className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs font-bold text-neutral-900 focus:outline-none focus:border-neutral-400"
                                      />
                                    </div>

                                    {/* - 소개 */}
                                    <div className="p-4.5 border border-neutral-200 bg-neutral-50/50 rounded-[12px] space-y-2">
                                      <div className="flex items-center gap-2 text-xs font-bold text-neutral-800">
                                        <span className="text-neutral-400 font-mono text-[14px] font-bold shrink-0">
                                          -
                                        </span>
                                        <span>소개</span>
                                      </div>
                                      <textarea
                                        value={introText}
                                        onChange={(e) =>
                                          syncFestivalDesc(
                                            e.target.value,
                                            achievements,
                                          )
                                        }
                                        rows={5}
                                        className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs text-neutral-850 leading-relaxed focus:outline-none focus:border-neutral-400 font-sans"
                                        placeholder="모달 소개란 문구를 작성해 주세요."
                                      />
                                    </div>

                                    {/* - 세부사항 */}
                                    <div className="p-4.5 border border-neutral-200 bg-neutral-50/50 rounded-[12px] space-y-3.5">
                                      <div className="flex items-center gap-2 text-xs font-bold text-neutral-800 pb-1.5 border-b border-neutral-200/65">
                                        <span className="text-neutral-400 font-mono text-[14px] font-bold shrink-0">
                                          -
                                        </span>
                                        <span>세부사항</span>
                                      </div>

                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                          <span className="text-[10px] font-bold font-mono text-neutral-500 uppercase">
                                            기여도
                                          </span>
                                          <input
                                            type="text"
                                            value={project.contribution || ""}
                                            onChange={(e) =>
                                              handleArrayChange(
                                                "featuredProjects",
                                                idx,
                                                "contribution",
                                                e.target.value,
                                              )
                                            }
                                            className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs font-mono font-bold text-neutral-900 focus:outline-none focus:border-neutral-400"
                                            placeholder="예: 25%"
                                          />
                                        </div>
                                        <div className="space-y-1">
                                          <span className="text-[10px] font-bold font-mono text-neutral-500 uppercase">
                                            연도
                                          </span>
                                          <input
                                            type="text"
                                            value={project.year || ""}
                                            onChange={(e) =>
                                              handleArrayChange(
                                                "featuredProjects",
                                                idx,
                                                "year",
                                                e.target.value,
                                              )
                                            }
                                            className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs font-mono font-bold text-neutral-900 focus:outline-none focus:border-neutral-400"
                                            placeholder="예: 2024"
                                          />
                                        </div>
                                      </div>

                                      {/* 분야 (버튼) 종합안내 / 티켓 / F&B / MD 판매 / 물품보관소 */}
                                      <div className="space-y-2 pt-2">
                                        <span className="text-[10px] font-bold font-mono text-neutral-500 uppercase">
                                          분야 (실감형 태그 버튼)
                                        </span>
                                        <div className="flex flex-wrap gap-2">
                                          {[
                                            "종합안내",
                                            "티켓",
                                            "F&B",
                                            "MD 판매",
                                            "물품보관소",
                                          ].map((fieldBtn, bIdx) => (
                                            <span
                                              key={bIdx}
                                              className="px-3 py-1.5 bg-[#FFF0F2] text-[#E0115F] border border-rose-200/60 text-[11px] font-extrabold rounded-[6px] select-none hover:bg-rose-100/50 transition-colors"
                                            >
                                              {fieldBtn}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    </div>

                                    {/* - 주요 운영실적 */}
                                    <div className="p-4.5 border border-neutral-200 bg-neutral-50/50 rounded-[12px] space-y-3.5">
                                      <div className="flex justify-between items-center pb-1.5 border-b border-neutral-200/65">
                                        <div className="flex items-center gap-2 text-xs font-bold text-neutral-800">
                                          <span className="text-neutral-400 font-mono text-[14px] font-bold shrink-0">
                                            -
                                          </span>
                                          <span>주요 운영실적</span>
                                        </div>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const updated = [
                                              ...achievements,
                                              "새로운 페스티벌 실적",
                                            ];
                                            syncFestivalDesc(
                                              introText,
                                              updated,
                                            );
                                          }}
                                          className="text-xs text-rose-600 hover:text-rose-700 font-bold hover:underline flex items-center gap-0.5"
                                        >
                                          <Plus size={11} /> 실적 추가
                                        </button>
                                      </div>

                                      <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
                                        {achievements.map((item, aIdx) => (
                                          <div
                                            key={aIdx}
                                            className="flex items-center gap-2 animate-fadeIn bg-white p-1 rounded border border-neutral-200 shadow-4xs"
                                          >
                                            <span className="text-neutral-400 font-mono text-[11px] font-bold pl-2 shrink-0">
                                              {String(aIdx + 1).padStart(
                                                2,
                                                "0",
                                              )}
                                              .
                                            </span>
                                            <input
                                              type="text"
                                              value={item}
                                              onChange={(e) => {
                                                const updated = [
                                                  ...achievements,
                                                ];
                                                updated[aIdx] = e.target.value;
                                                syncFestivalDesc(
                                                  introText,
                                                  updated,
                                                );
                                              }}
                                              className="w-full bg-transparent border-none text-xs text-neutral-850 font-bold focus:outline-none focus:ring-0"
                                            />
                                            <button
                                              type="button"
                                              onClick={() => {
                                                const updated = [
                                                  ...achievements,
                                                ];
                                                updated.splice(aIdx, 1);
                                                syncFestivalDesc(
                                                  introText,
                                                  updated,
                                                );
                                              }}
                                              className="text-neutral-400 hover:text-red-500 font-bold pr-2 transition-transform active:scale-90 animate-fadeIn"
                                            >
                                              ×
                                            </button>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* TAB CONTENT: 티켓운영 (Ticket Operation) */}
                                {festivalActiveTab === "ticket" && (
                                  <div className="space-y-5 pt-2 animate-fadeIn text-neutral-900 font-sans">
                                    {/* - 참여프로젝트 */}
                                    <div className="p-4.5 border border-neutral-200 bg-neutral-50/50 rounded-[12px] space-y-3.5">
                                      <div className="flex justify-between items-center pb-1.5 border-b border-neutral-200/65">
                                        <div className="flex items-center gap-2 text-xs font-bold text-neutral-800">
                                          <span className="text-neutral-400 font-mono text-[14px] font-bold shrink-0">
                                            -
                                          </span>
                                          <span>참여프로젝트</span>
                                        </div>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const updated = [
                                              ...participatingProjects,
                                              "2024 WATERBOMB 새투어",
                                            ];
                                            handleArrayChange(
                                              "featuredProjects",
                                              idx,
                                              "festivalProjects2",
                                              updated,
                                            );
                                          }}
                                          className="text-xs text-rose-600 hover:text-rose-700 font-bold hover:underline flex items-center gap-0.5"
                                        >
                                          <Plus size={11} /> 프로젝트 추가
                                        </button>
                                      </div>

                                      <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
                                        {participatingProjects.map(
                                          (item, pIdx) => (
                                            <div
                                              key={pIdx}
                                              className="flex items-center gap-2 animate-fadeIn bg-white p-1 rounded border border-neutral-200 shadow-4xs"
                                            >
                                              <span className="text-rose-500 font-mono text-[11px] font-bold pl-2 shrink-0">
                                                ●
                                              </span>
                                              <input
                                                type="text"
                                                value={item}
                                                onChange={(e) => {
                                                  const updated = [
                                                    ...participatingProjects,
                                                  ];
                                                  updated[pIdx] =
                                                    e.target.value;
                                                  handleArrayChange(
                                                    "featuredProjects",
                                                    idx,
                                                    "festivalProjects2",
                                                    updated,
                                                  );
                                                }}
                                                className="w-full bg-transparent border-none text-xs text-neutral-850 font-bold focus:outline-none focus:ring-0"
                                              />
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  const updated = [
                                                    ...participatingProjects,
                                                  ];
                                                  updated.splice(pIdx, 1);
                                                  handleArrayChange(
                                                    "featuredProjects",
                                                    idx,
                                                    "festivalProjects2",
                                                    updated,
                                                  );
                                                }}
                                                className="text-neutral-400 hover:text-red-500 font-bold pr-2 transition-transform active:scale-90"
                                              >
                                                ×
                                              </button>
                                            </div>
                                          ),
                                        )}
                                      </div>
                                    </div>

                                    {/* - 이미지 업로드 , 이미지 */}
                                    <div className="p-4.5 border border-neutral-200 bg-neutral-50/50 rounded-[12px] space-y-4">
                                      <div className="flex items-center gap-2 text-xs font-bold text-neutral-800 pb-1.5 border-b border-neutral-200/65">
                                        <span className="text-neutral-400 font-mono text-[14px] font-bold shrink-0">
                                          -
                                        </span>
                                        <span>이미지 업로드 , 이미지</span>
                                      </div>

                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[0, 1, 2, 3].map((idx) => (
                                          <div key={idx} className="p-3 bg-white rounded border border-neutral-250 shadow-4xs flex flex-col gap-2.5">
                                            <span className="text-[10px] font-mono text-neutral-500 font-bold uppercase block border-b border-neutral-100 pb-1">
                                              IMAGE #{idx + 1} {idx === 0 ? "(메인 스냅)" : idx === 1 ? "(서브 스냅)" : ""}
                                            </span>
                                            <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-50 rounded border border-neutral-200 flex items-center justify-center shrink-0">
                                              {ticketImages[idx] ? (
                                                <img
                                                  src={ticketImages[idx]}
                                                  alt={`snap ${idx + 1}`}
                                                  className="w-full h-full object-cover"
                                                  referrerPolicy="no-referrer"
                                                />
                                              ) : (
                                                <ImageIcon
                                                  size={22}
                                                  className="text-neutral-300"
                                                />
                                              )}
                                            </div>
                                            <div className="flex items-center justify-between gap-2">
                                              <label className="cursor-pointer px-2.5 py-1.5 bg-neutral-900 override-bg border border-neutral-900 hover:bg-neutral-800 text-white font-black text-[10px] rounded-sm flex items-center gap-1 transition-all select-none">
                                                <Upload size={10} />
                                                <span>이미지 업로드</span>
                                                <input
                                                  type="file"
                                                  accept="image/*"
                                                  className="hidden"
                                                  onChange={(e) => {
                                                    if (
                                                      e.target.files &&
                                                      e.target.files[0]
                                                    ) {
                                                      handleTicketImageUploadLocal(
                                                        e.target.files[0],
                                                        idx,
                                                      );
                                                    }
                                                  }}
                                                />
                                              </label>
                                              <span className="text-[9px] font-mono text-neutral-450 truncate max-w-[130px]">
                                                {projectUploadStatus[
                                                  `ticketImage-${idx}`
                                                ] || `스냅 이미지 ${idx + 1}`}
                                              </span>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                    {/* 내용 단계 편집기 */}
                                    <div className="space-y-4">
                                      <div className="text-xs font-bold text-rose-800 px-1 pb-1">
                                        티켓운영 단계별 마크업/내용 편집
                                      </div>
                                      {processTicketObj.map(
                                        (step: any, sIdx: number) => (
                                          <div
                                            key={sIdx}
                                            className="p-4.5 border border-rose-200/60 bg-rose-50/10 rounded-[12px] space-y-3.5"
                                          >
                                            <div className="flex justify-between items-center border-b border-rose-100 pb-2">
                                              <span className="text-xs font-black text-rose-800">
                                                실행 단계 {sIdx + 1} (
                                                {step.label ||
                                                  (sIdx === 0
                                                    ? "PRE-EVENT"
                                                    : sIdx === 1
                                                      ? "ON-SITE"
                                                      : "POST-EVENT")}
                                                )
                                              </span>
                                            </div>
                                            <div className="space-y-1">
                                              <span className="text-[10px] font-bold text-neutral-500 font-mono uppercase">
                                                단계 이름
                                              </span>
                                              <input
                                                type="text"
                                                value={step.phase || ""}
                                                onChange={(e) => {
                                                  const cloned = [
                                                    ...processTicketObj,
                                                  ];
                                                  cloned[sIdx] = {
                                                    ...cloned[sIdx],
                                                    phase: e.target.value,
                                                  };
                                                  handleArrayChange(
                                                    "featuredProjects",
                                                    idx,
                                                    "processTicket",
                                                    cloned,
                                                  );
                                                }}
                                                className="w-full bg-white border border-neutral-300 rounded px-2.5 py-1.5 text-xs text-neutral-900 font-bold focus:outline-none focus:border-neutral-400 font-sans"
                                              />
                                            </div>
                                            <div className="space-y-3 pl-3 border-l-2 border-rose-200">
                                              {(step.items || []).map(
                                                (item: any, iIdx: number) => (
                                                  <div
                                                    key={iIdx}
                                                    className="space-y-2"
                                                  >
                                                    <div className="space-y-1">
                                                      <span className="text-[10px] font-bold text-neutral-500 font-mono uppercase">
                                                        항목 {iIdx + 1} 소제목
                                                      </span>
                                                      <input
                                                        type="text"
                                                        value={item.title || ""}
                                                        onChange={(e) => {
                                                          const cloned = [
                                                            ...processTicketObj,
                                                          ];
                                                          const clonedItems = [
                                                            ...cloned[sIdx]
                                                              .items,
                                                          ];
                                                          clonedItems[iIdx] = {
                                                            ...clonedItems[
                                                              iIdx
                                                            ],
                                                            title:
                                                              e.target.value,
                                                          };
                                                          cloned[sIdx].items =
                                                            clonedItems;
                                                          handleArrayChange(
                                                            "featuredProjects",
                                                            idx,
                                                            "processTicket",
                                                            cloned,
                                                          );
                                                        }}
                                                        className="w-full bg-white border border-neutral-300 rounded px-2.5 py-1.5 text-xs text-neutral-850 font-bold focus:outline-none focus:border-neutral-400 font-sans"
                                                      />
                                                    </div>
                                                    <div className="space-y-1">
                                                      <span className="text-[10px] font-bold text-neutral-500 font-mono uppercase">
                                                        항목 {iIdx + 1} 상세
                                                      </span>
                                                      <textarea
                                                        value={item.body || ""}
                                                        onChange={(e) => {
                                                          const cloned = [
                                                            ...processTicketObj,
                                                          ];
                                                          const clonedItems = [
                                                            ...cloned[sIdx]
                                                              .items,
                                                          ];
                                                          clonedItems[iIdx] = {
                                                            ...clonedItems[
                                                              iIdx
                                                            ],
                                                            body: e.target
                                                              .value,
                                                          };
                                                          cloned[sIdx].items =
                                                            clonedItems;
                                                          handleArrayChange(
                                                            "featuredProjects",
                                                            idx,
                                                            "processTicket",
                                                            cloned,
                                                          );
                                                        }}
                                                        rows={3}
                                                        className="w-full bg-white border border-neutral-300 rounded px-2.5 py-1.5 text-xs text-neutral-750 focus:outline-none focus:border-neutral-400 font-sans leading-relaxed"
                                                      />
                                                    </div>
                                                  </div>
                                                ),
                                              )}
                                            </div>
                                          </div>
                                        ),
                                      )}
                                    </div>
                                  </div>
                                )}

                                {/* TAB CONTENT: F&B운영 (F&B Operation) */}
                                {festivalActiveTab === "fnb" && (
                                  <div className="space-y-5 pt-2 animate-fadeIn text-neutral-900 font-sans">
                                    {/* - 참여프로젝트 */}
                                    <div className="p-4.5 border border-neutral-200 bg-neutral-50/50 rounded-[12px] space-y-3.5">
                                      <div className="flex justify-between items-center pb-1.5 border-b border-neutral-200/65">
                                        <div className="flex items-center gap-2 text-xs font-bold text-neutral-800">
                                          <span className="text-neutral-400 font-mono text-[14px] font-bold shrink-0">
                                            -
                                          </span>
                                          <span>참여프로젝트</span>
                                        </div>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const updated = [
                                              ...fnbProjects,
                                              "새로운 F&B 페스티벌",
                                            ];
                                            handleArrayChange(
                                              "featuredProjects",
                                              idx,
                                              "festivalProjects3",
                                              updated,
                                            );
                                          }}
                                          className="text-xs text-rose-600 hover:text-rose-700 font-bold hover:underline flex items-center gap-0.5"
                                        >
                                          <Plus size={11} /> 프로젝트 추가
                                        </button>
                                      </div>

                                      <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
                                        {fnbProjects.map((item, pIdx) => (
                                          <div
                                            key={pIdx}
                                            className="flex items-center gap-2 animate-fadeIn bg-white p-1 rounded border border-neutral-200 shadow-4xs"
                                          >
                                            <span className="text-rose-500 font-mono text-[11px] font-bold pl-2 shrink-0">
                                              ●
                                            </span>
                                            <input
                                              type="text"
                                              value={item}
                                              onChange={(e) => {
                                                const updated = [
                                                  ...fnbProjects,
                                                ];
                                                updated[pIdx] = e.target.value;
                                                handleArrayChange(
                                                  "featuredProjects",
                                                  idx,
                                                  "festivalProjects3",
                                                  updated,
                                                );
                                              }}
                                              className="w-full bg-transparent border-none text-xs text-neutral-850 font-bold focus:outline-none focus:ring-0"
                                            />
                                            <button
                                              type="button"
                                              onClick={() => {
                                                const updated = [
                                                  ...fnbProjects,
                                                ];
                                                updated.splice(pIdx, 1);
                                                handleArrayChange(
                                                  "featuredProjects",
                                                  idx,
                                                  "festivalProjects3",
                                                  updated,
                                                );
                                              }}
                                              className="text-neutral-400 hover:text-red-500 font-bold pr-2 transition-transform active:scale-90"
                                            >
                                              ×
                                            </button>
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                    {/* - 이미지 업로드 */}
                                    <div className="p-4.5 border border-neutral-200 bg-neutral-50/50 rounded-[12px] space-y-4">
                                      <div className="flex items-center gap-2 text-xs font-bold text-neutral-800 pb-1.5 border-b border-neutral-200/65">
                                        <span className="text-neutral-400 font-mono text-[14px] font-bold shrink-0">
                                          -
                                        </span>
                                        <span>이미지 업로드 , 이미지</span>
                                      </div>

                                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {/* Image Card 1 */}
                                        <div className="p-3 bg-white rounded border border-neutral-250 shadow-4xs flex flex-col gap-2.5">
                                          <span className="text-[10px] font-mono text-neutral-550 font-bold uppercase block border-b border-neutral-100 pb-1">
                                            IMAGE #1 (메인 스냅)
                                          </span>
                                          <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-50 rounded border border-neutral-200 flex items-center justify-center shrink-0">
                                            {fnbImages[0] ? (
                                              <img
                                                src={fnbImages[0]}
                                                alt="snap 1"
                                                className="w-full h-full object-cover"
                                                referrerPolicy="no-referrer"
                                              />
                                            ) : (
                                              <ImageIcon
                                                size={22}
                                                className="text-neutral-300"
                                              />
                                            )}
                                          </div>
                                          <div className="flex items-center justify-between gap-2">
                                            <label className="cursor-pointer px-2.5 py-1.5 bg-neutral-900 override-bg border border-neutral-900 hover:bg-neutral-800 text-white font-black text-[10px] rounded-sm flex items-center gap-1 transition-all select-none">
                                              <Upload size={10} />
                                              <span>이미지 업로드</span>
                                              <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => {
                                                  if (
                                                    e.target.files &&
                                                    e.target.files[0]
                                                  ) {
                                                    handleFestivalImageUploadLocal(
                                                      e.target.files[0],
                                                      "fnbImages",
                                                      0,
                                                    );
                                                  }
                                                }}
                                              />
                                            </label>
                                            <span className="text-[9px] font-mono text-neutral-450 truncate max-w-[130px]">
                                              {projectUploadStatus[
                                                `fnbImages-0`
                                              ] || "스냅 이미지 1"}
                                            </span>
                                          </div>
                                        </div>

                                        {/* Image Card 2 */}
                                        <div className="p-3 bg-white rounded border border-neutral-250 shadow-4xs flex flex-col gap-2.5">
                                          <span className="text-[10px] font-mono text-neutral-555 font-bold uppercase block border-b border-neutral-100 pb-1">
                                            IMAGE #2 (서브 스냅)
                                          </span>
                                          <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-50 rounded border border-neutral-200 flex items-center justify-center shrink-0">
                                            {fnbImages[1] ? (
                                              <img
                                                src={fnbImages[1]}
                                                alt="snap 2"
                                                className="w-full h-full object-cover"
                                                referrerPolicy="no-referrer"
                                              />
                                            ) : (
                                              <ImageIcon
                                                size={22}
                                                className="text-neutral-300"
                                              />
                                            )}
                                          </div>
                                          <div className="flex items-center justify-between gap-2">
                                            <label className="cursor-pointer px-2.5 py-1.5 bg-neutral-900 override-bg border border-neutral-900 hover:bg-neutral-800 text-white font-black text-[10px] rounded-sm flex items-center gap-1 transition-all select-none">
                                              <Upload size={10} />
                                              <span>이미지 업로드</span>
                                              <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => {
                                                  if (
                                                    e.target.files &&
                                                    e.target.files[0]
                                                  ) {
                                                    handleFestivalImageUploadLocal(
                                                      e.target.files[0],
                                                      "fnbImages",
                                                      1,
                                                    );
                                                  }
                                                }}
                                              />
                                            </label>
                                            <span className="text-[9px] font-mono text-neutral-450 truncate max-w-[130px]">
                                              {projectUploadStatus[
                                                `fnbImages-1`
                                              ] || "스냅 이미지 2"}
                                            </span>
                                          </div>
                                        </div>

                                        {/* Image Card 3 */}
                                        <div className="p-3 bg-white rounded border border-neutral-250 shadow-4xs flex flex-col gap-2.5">
                                          <span className="text-[10px] font-mono text-neutral-550 font-bold uppercase block border-b border-neutral-100 pb-1">
                                            IMAGE #3 (현장 스냅)
                                          </span>
                                          <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-50 rounded border border-neutral-200 flex items-center justify-center shrink-0">
                                            {fnbImages[2] ? (
                                              <img
                                                src={fnbImages[2]}
                                                alt="snap 3"
                                                className="w-full h-full object-cover"
                                                referrerPolicy="no-referrer"
                                              />
                                            ) : (
                                              <ImageIcon
                                                size={22}
                                                className="text-neutral-300"
                                              />
                                            )}
                                          </div>
                                          <div className="flex items-center justify-between gap-2">
                                            <label className="cursor-pointer px-2.5 py-1.5 bg-neutral-900 override-bg border border-neutral-900 hover:bg-neutral-800 text-white font-black text-[10px] rounded-sm flex items-center gap-1 transition-all select-none">
                                              <Upload size={10} />
                                              <span>이미지 업로드</span>
                                              <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => {
                                                  if (
                                                    e.target.files &&
                                                    e.target.files[0]
                                                  ) {
                                                    handleFestivalImageUploadLocal(
                                                      e.target.files[0],
                                                      "fnbImages",
                                                      2,
                                                    );
                                                  }
                                                }}
                                              />
                                            </label>
                                            <span className="text-[9px] font-mono text-neutral-450 truncate max-w-[130px]">
                                              {projectUploadStatus[
                                                `fnbImages-2`
                                              ] || "스냅 이미지 3"}
                                            </span>
                                          </div>
                                        </div>

                                        {/* Image Card 4 */}
                                        <div className="p-3 bg-white rounded border border-neutral-250 shadow-4xs flex flex-col gap-2.5">
                                          <span className="text-[10px] font-mono text-neutral-550 font-bold uppercase block border-b border-neutral-100 pb-1">
                                            IMAGE #4 (현장 스냅)
                                          </span>
                                          <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-50 rounded border border-neutral-200 flex items-center justify-center shrink-0">
                                            {fnbImages[3] ? (
                                              <img
                                                src={fnbImages[3]}
                                                alt="snap 4"
                                                className="w-full h-full object-cover"
                                                referrerPolicy="no-referrer"
                                              />
                                            ) : (
                                              <ImageIcon
                                                size={22}
                                                className="text-neutral-300"
                                              />
                                            )}
                                          </div>
                                          <div className="flex items-center justify-between gap-2">
                                            <label className="cursor-pointer px-2.5 py-1.5 bg-neutral-900 override-bg border border-neutral-900 hover:bg-neutral-800 text-white font-black text-[10px] rounded-sm flex items-center gap-1 transition-all select-none">
                                              <Upload size={10} />
                                              <span>이미지 업로드</span>
                                              <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => {
                                                  if (
                                                    e.target.files &&
                                                    e.target.files[0]
                                                  ) {
                                                    handleFestivalImageUploadLocal(
                                                      e.target.files[0],
                                                      "fnbImages",
                                                      3,
                                                    );
                                                  }
                                                }}
                                              />
                                            </label>
                                            <span className="text-[9px] font-mono text-neutral-450 truncate max-w-[130px]">
                                              {projectUploadStatus[
                                                `fnbImages-3`
                                              ] || "스냅 이미지 4"}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* 내용 단계 편집기 */}
                                    <div className="space-y-4">
                                      <div className="text-xs font-bold text-rose-800 px-1 pb-1">
                                        F&B운영 단계별 마크업/내용 편집
                                      </div>
                                      {processFnBObj.map((step, sIdx) => (
                                        <div
                                          key={sIdx}
                                          className="p-4.5 border border-rose-200/60 bg-rose-50/10 rounded-[12px] space-y-3.5"
                                        >
                                          <div className="flex justify-between items-center border-b border-rose-100 pb-2">
                                            <span className="text-xs font-black text-rose-800">
                                              실행 단계 {sIdx + 1} (
                                              {step.label ||
                                                (sIdx === 0
                                                  ? "PRE-EVENT"
                                                  : sIdx === 1
                                                    ? "ON-SITE"
                                                    : "POST-EVENT")}
                                              )
                                            </span>
                                          </div>
                                          <div className="space-y-1">
                                            <span className="text-[10px] font-bold text-neutral-500 font-mono uppercase">
                                              단계 이름
                                            </span>
                                            <input
                                              type="text"
                                              value={step.phase || ""}
                                              onChange={(e) => {
                                                const cloned = [
                                                  ...processFnBObj,
                                                ];
                                                cloned[sIdx] = {
                                                  ...cloned[sIdx],
                                                  phase: e.target.value,
                                                };
                                                handleArrayChange(
                                                  "featuredProjects",
                                                  idx,
                                                  "processFnB",
                                                  cloned,
                                                );
                                              }}
                                              className="w-full bg-white border border-neutral-300 rounded px-2.5 py-1.5 text-xs text-neutral-900 font-bold focus:outline-none focus:border-neutral-400 font-sans"
                                            />
                                          </div>
                                          <div className="space-y-3 pl-3 border-l-2 border-rose-200">
                                            {(step.items || []).map(
                                              (item, iIdx) => (
                                                <div
                                                  key={iIdx}
                                                  className="space-y-2"
                                                >
                                                  <div className="space-y-1">
                                                    <span className="text-[10px] font-bold text-neutral-500 font-mono uppercase">
                                                      항목 {iIdx + 1} 소제목
                                                    </span>
                                                    <input
                                                      type="text"
                                                      value={item.title || ""}
                                                      onChange={(e) => {
                                                        const cloned = [
                                                          ...processFnBObj,
                                                        ];
                                                        const clonedItems = [
                                                          ...cloned[sIdx].items,
                                                        ];
                                                        clonedItems[iIdx] = {
                                                          ...clonedItems[iIdx],
                                                          title: e.target.value,
                                                        };
                                                        cloned[sIdx].items =
                                                          clonedItems;
                                                        handleArrayChange(
                                                          "featuredProjects",
                                                          idx,
                                                          "processFnB",
                                                          cloned,
                                                        );
                                                      }}
                                                      className="w-full bg-white border border-neutral-300 rounded px-2.5 py-1.5 text-xs text-neutral-850 font-bold focus:outline-none focus:border-neutral-400 font-sans"
                                                    />
                                                  </div>
                                                  <div className="space-y-1">
                                                    <span className="text-[10px] font-bold text-neutral-500 font-mono uppercase">
                                                      항목 {iIdx + 1} 상세
                                                    </span>
                                                    <textarea
                                                      value={item.body || ""}
                                                      onChange={(e) => {
                                                        const cloned = [
                                                          ...processFnBObj,
                                                        ];
                                                        const clonedItems = [
                                                          ...cloned[sIdx].items,
                                                        ];
                                                        clonedItems[iIdx] = {
                                                          ...clonedItems[iIdx],
                                                          body: e.target.value,
                                                        };
                                                        cloned[sIdx].items =
                                                          clonedItems;
                                                        handleArrayChange(
                                                          "featuredProjects",
                                                          idx,
                                                          "processFnB",
                                                          cloned,
                                                        );
                                                      }}
                                                      rows={3}
                                                      className="w-full bg-white border border-neutral-300 rounded px-2.5 py-1.5 text-xs text-neutral-750 focus:outline-none focus:border-neutral-400 font-sans leading-relaxed"
                                                    />
                                                  </div>
                                                </div>
                                              ),
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* TAB CONTENT: MD 및 물품보관소 (Storage) */}
                                {festivalActiveTab === "storage" && (
                                  <div className="space-y-5 pt-2 animate-fadeIn text-neutral-900 font-sans">
                                    {/* - 참여프로젝트 */}
                                    <div className="p-4.5 border border-neutral-200 bg-neutral-50/50 rounded-[12px] space-y-3.5">
                                      <div className="flex justify-between items-center pb-1.5 border-b border-neutral-200/65">
                                        <div className="flex items-center gap-2 text-xs font-bold text-neutral-800">
                                          <span className="text-neutral-400 font-mono text-[14px] font-bold shrink-0">
                                            -
                                          </span>
                                          <span>참여프로젝트</span>
                                        </div>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const updated = [
                                              ...storageProjects,
                                              "새로운 물품보관소 페스티벌",
                                            ];
                                            handleArrayChange(
                                              "featuredProjects",
                                              idx,
                                              "festivalProjects4",
                                              updated,
                                            );
                                          }}
                                          className="text-xs text-rose-600 hover:text-rose-700 font-bold hover:underline flex items-center gap-0.5"
                                        >
                                          <Plus size={11} /> 프로젝트 추가
                                        </button>
                                      </div>

                                      <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
                                        {storageProjects.map((item, pIdx) => (
                                          <div
                                            key={pIdx}
                                            className="flex items-center gap-2 animate-fadeIn bg-white p-1 rounded border border-neutral-200 shadow-4xs"
                                          >
                                            <span className="text-rose-500 font-mono text-[11px] font-bold pl-2 shrink-0">
                                              ●
                                            </span>
                                            <input
                                              type="text"
                                              value={item}
                                              onChange={(e) => {
                                                const updated = [
                                                  ...storageProjects,
                                                ];
                                                updated[pIdx] = e.target.value;
                                                handleArrayChange(
                                                  "featuredProjects",
                                                  idx,
                                                  "festivalProjects4",
                                                  updated,
                                                );
                                              }}
                                              className="w-full bg-transparent border-none text-xs text-neutral-850 font-bold focus:outline-none focus:ring-0"
                                            />
                                            <button
                                              type="button"
                                              onClick={() => {
                                                const updated = [
                                                  ...storageProjects,
                                                ];
                                                updated.splice(pIdx, 1);
                                                handleArrayChange(
                                                  "featuredProjects",
                                                  idx,
                                                  "festivalProjects4",
                                                  updated,
                                                );
                                              }}
                                              className="text-neutral-400 hover:text-red-500 font-bold pr-2 transition-transform active:scale-90"
                                            >
                                              ×
                                            </button>
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                    {/* - 이미지 업로드 */}
                                    <div className="p-4.5 border border-neutral-200 bg-neutral-50/50 rounded-[12px] space-y-4">
                                      <div className="flex items-center gap-2 text-xs font-bold text-neutral-800 pb-1.5 border-b border-neutral-200/65">
                                        <span className="text-neutral-400 font-mono text-[14px] font-bold shrink-0">
                                          -
                                        </span>
                                        <span>이미지 업로드 , 이미지</span>
                                      </div>

                                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {/* Image Card 1 */}
                                        <div className="p-3 bg-white rounded border border-neutral-250 shadow-4xs flex flex-col gap-2.5">
                                          <span className="text-[10px] font-mono text-neutral-555 font-bold uppercase block border-b border-neutral-100 pb-1">
                                            IMAGE #1 (메인 스냅)
                                          </span>
                                          <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-50 rounded border border-neutral-200 flex items-center justify-center shrink-0">
                                            {storageImages[0] ? (
                                              <img
                                                src={storageImages[0]}
                                                alt="snap 1"
                                                className="w-full h-full object-cover"
                                                referrerPolicy="no-referrer"
                                              />
                                            ) : (
                                              <ImageIcon
                                                size={22}
                                                className="text-neutral-300"
                                              />
                                            )}
                                          </div>
                                          <div className="flex items-center justify-between gap-2">
                                            <label className="cursor-pointer px-2.5 py-1.5 bg-neutral-900 override-bg border border-neutral-900 hover:bg-neutral-800 text-white font-black text-[10px] rounded-sm flex items-center gap-1 transition-all select-none">
                                              <Upload size={10} />
                                              <span>이미지 업로드</span>
                                              <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => {
                                                  if (
                                                    e.target.files &&
                                                    e.target.files[0]
                                                  ) {
                                                    handleFestivalImageUploadLocal(
                                                      e.target.files[0],
                                                      "storageImages",
                                                      0,
                                                    );
                                                  }
                                                }}
                                              />
                                            </label>
                                            <span className="text-[9px] font-mono text-neutral-450 truncate max-w-[130px]">
                                              {projectUploadStatus[
                                                `storageImages-0`
                                              ] || "스냅 이미지 1"}
                                            </span>
                                          </div>
                                        </div>

                                        {/* Image Card 2 */}
                                        <div className="p-3 bg-white rounded border border-neutral-250 shadow-4xs flex flex-col gap-2.5">
                                          <span className="text-[10px] font-mono text-neutral-555 font-bold uppercase block border-b border-neutral-100 pb-1">
                                            IMAGE #2 (서브 스냅)
                                          </span>
                                          <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-50 rounded border border-neutral-200 flex items-center justify-center shrink-0">
                                            {storageImages[1] ? (
                                              <img
                                                src={storageImages[1]}
                                                alt="snap 2"
                                                className="w-full h-full object-cover"
                                                referrerPolicy="no-referrer"
                                              />
                                            ) : (
                                              <ImageIcon
                                                size={22}
                                                className="text-neutral-300"
                                              />
                                            )}
                                          </div>
                                          <div className="flex items-center justify-between gap-2">
                                            <label className="cursor-pointer px-2.5 py-1.5 bg-neutral-900 override-bg border border-neutral-900 hover:bg-neutral-800 text-white font-black text-[10px] rounded-sm flex items-center gap-1 transition-all select-none">
                                              <Upload size={10} />
                                              <span>이미지 업로드</span>
                                              <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => {
                                                  if (
                                                    e.target.files &&
                                                    e.target.files[0]
                                                  ) {
                                                    handleFestivalImageUploadLocal(
                                                      e.target.files[0],
                                                      "storageImages",
                                                      1,
                                                    );
                                                  }
                                                }}
                                              />
                                            </label>
                                            <span className="text-[9px] font-mono text-neutral-450 truncate max-w-[130px]">
                                              {projectUploadStatus[
                                                `storageImages-1`
                                              ] || "스냅 이미지 2"}
                                            </span>
                                          </div>
                                        </div>

                                        {/* Image Card 3 */}
                                        <div className="p-3 bg-white rounded border border-neutral-250 shadow-4xs flex flex-col gap-2.5">
                                          <span className="text-[10px] font-mono text-neutral-555 font-bold uppercase block border-b border-neutral-100 pb-1">
                                            IMAGE #3 (서브 스냅)
                                          </span>
                                          <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-50 rounded border border-neutral-200 flex items-center justify-center shrink-0">
                                            {storageImages[2] ? (
                                              <img
                                                src={storageImages[2]}
                                                alt="snap 3"
                                                className="w-full h-full object-cover"
                                                referrerPolicy="no-referrer"
                                              />
                                            ) : (
                                              <ImageIcon
                                                size={22}
                                                className="text-neutral-300"
                                              />
                                            )}
                                          </div>
                                          <div className="flex items-center justify-between gap-2">
                                            <label className="cursor-pointer px-2.5 py-1.5 bg-neutral-900 override-bg border border-neutral-900 hover:bg-neutral-800 text-white font-black text-[10px] rounded-sm flex items-center gap-1 transition-all select-none">
                                              <Upload size={10} />
                                              <span>이미지 업로드</span>
                                              <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => {
                                                  if (
                                                    e.target.files &&
                                                    e.target.files[0]
                                                  ) {
                                                    handleFestivalImageUploadLocal(
                                                      e.target.files[0],
                                                      "storageImages",
                                                      2,
                                                    );
                                                  }
                                                }}
                                              />
                                            </label>
                                            <span className="text-[9px] font-mono text-neutral-450 truncate max-w-[130px]">
                                              {projectUploadStatus[
                                                `storageImages-2`
                                              ] || "스냅 이미지 3"}
                                            </span>
                                          </div>
                                        </div>

                                        {/* Image Card 4 */}
                                        <div className="p-3 bg-white rounded border border-neutral-250 shadow-4xs flex flex-col gap-2.5">
                                          <span className="text-[10px] font-mono text-neutral-555 font-bold uppercase block border-b border-neutral-100 pb-1">
                                            IMAGE #4 (서브 스냅)
                                          </span>
                                          <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-50 rounded border border-neutral-200 flex items-center justify-center shrink-0">
                                            {storageImages[3] ? (
                                              <img
                                                src={storageImages[3]}
                                                alt="snap 4"
                                                className="w-full h-full object-cover"
                                                referrerPolicy="no-referrer"
                                              />
                                            ) : (
                                              <ImageIcon
                                                size={22}
                                                className="text-neutral-300"
                                              />
                                            )}
                                          </div>
                                          <div className="flex items-center justify-between gap-2">
                                            <label className="cursor-pointer px-2.5 py-1.5 bg-neutral-900 override-bg border border-neutral-900 hover:bg-neutral-800 text-white font-black text-[10px] rounded-sm flex items-center gap-1 transition-all select-none">
                                              <Upload size={10} />
                                              <span>이미지 업로드</span>
                                              <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => {
                                                  if (
                                                    e.target.files &&
                                                    e.target.files[0]
                                                  ) {
                                                    handleFestivalImageUploadLocal(
                                                      e.target.files[0],
                                                      "storageImages",
                                                      3,
                                                    );
                                                  }
                                                }}
                                              />
                                            </label>
                                            <span className="text-[9px] font-mono text-neutral-450 truncate max-w-[130px]">
                                              {projectUploadStatus[
                                                `storageImages-3`
                                              ] || "스냅 이미지 4"}
                                            </span>
                                          </div>
                                        </div>

                                        {/* Image Card 5 */}
                                        <div className="p-3 bg-white rounded border border-neutral-250 shadow-4xs flex flex-col gap-2.5">
                                          <span className="text-[10px] font-mono text-neutral-555 font-bold uppercase block border-b border-neutral-100 pb-1">
                                            IMAGE #5 (서브 스냅)
                                          </span>
                                          <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-50 rounded border border-neutral-200 flex items-center justify-center shrink-0">
                                            {storageImages[4] ? (
                                              <img
                                                src={storageImages[4]}
                                                alt="snap 5"
                                                className="w-full h-full object-cover"
                                                referrerPolicy="no-referrer"
                                              />
                                            ) : (
                                              <ImageIcon
                                                size={22}
                                                className="text-neutral-300"
                                              />
                                            )}
                                          </div>
                                          <div className="flex items-center justify-between gap-2">
                                            <label className="cursor-pointer px-2.5 py-1.5 bg-neutral-900 override-bg border border-neutral-900 hover:bg-neutral-800 text-white font-black text-[10px] rounded-sm flex items-center gap-1 transition-all select-none">
                                              <Upload size={10} />
                                              <span>이미지 업로드</span>
                                              <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => {
                                                  if (
                                                    e.target.files &&
                                                    e.target.files[0]
                                                  ) {
                                                    handleFestivalImageUploadLocal(
                                                      e.target.files[0],
                                                      "storageImages",
                                                      4,
                                                    );
                                                  }
                                                }}
                                              />
                                            </label>
                                            <span className="text-[9px] font-mono text-neutral-450 truncate max-w-[130px]">
                                              {projectUploadStatus[
                                                `storageImages-4`
                                              ] || "스냅 이미지 5"}
                                            </span>
                                          </div>
                                        </div>

                                        {/* Image Card 6 */}
                                        <div className="p-3 bg-white rounded border border-neutral-250 shadow-4xs flex flex-col gap-2.5">
                                          <span className="text-[10px] font-mono text-neutral-555 font-bold uppercase block border-b border-neutral-100 pb-1">
                                            IMAGE #6 (서브 스냅)
                                          </span>
                                          <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-50 rounded border border-neutral-200 flex items-center justify-center shrink-0">
                                            {storageImages[5] ? (
                                              <img
                                                src={storageImages[5]}
                                                alt="snap 6"
                                                className="w-full h-full object-cover"
                                                referrerPolicy="no-referrer"
                                              />
                                            ) : (
                                              <ImageIcon
                                                size={22}
                                                className="text-neutral-300"
                                              />
                                            )}
                                          </div>
                                          <div className="flex items-center justify-between gap-2">
                                            <label className="cursor-pointer px-2.5 py-1.5 bg-neutral-900 override-bg border border-neutral-900 hover:bg-neutral-800 text-white font-black text-[10px] rounded-sm flex items-center gap-1 transition-all select-none">
                                              <Upload size={10} />
                                              <span>이미지 업로드</span>
                                              <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => {
                                                  if (
                                                    e.target.files &&
                                                    e.target.files[0]
                                                  ) {
                                                    handleFestivalImageUploadLocal(
                                                      e.target.files[0],
                                                      "storageImages",
                                                      5,
                                                    );
                                                  }
                                                }}
                                              />
                                            </label>
                                            <span className="text-[9px] font-mono text-neutral-450 truncate max-w-[130px]">
                                              {projectUploadStatus[
                                                `storageImages-5`
                                              ] || "스냅 이미지 6"}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* 내용 단계 편집기 */}
                                    <div className="space-y-4">
                                      <div className="text-xs font-bold text-rose-800 px-1 pb-1">
                                        MD/물품보관소 단계별 마크업/내용 편집
                                      </div>
                                      {processStorageObj.map((step, sIdx) => (
                                        <div
                                          key={sIdx}
                                          className="p-4.5 border border-rose-200/60 bg-rose-50/10 rounded-[12px] space-y-3.5"
                                        >
                                          <div className="flex justify-between items-center border-b border-rose-100 pb-2">
                                            <span className="text-xs font-black text-rose-800">
                                              실행 단계 {sIdx + 1} (
                                              {step.label ||
                                                (sIdx === 0
                                                  ? "PRE-EVENT"
                                                  : sIdx === 1
                                                    ? "LIVE-CONTROL"
                                                    : "POST-EVENT")}
                                              )
                                            </span>
                                          </div>
                                          <div className="space-y-1">
                                            <span className="text-[10px] font-bold text-neutral-500 font-mono uppercase">
                                              단계 이름
                                            </span>
                                            <input
                                              type="text"
                                              value={step.phase || ""}
                                              onChange={(e) => {
                                                const cloned = [
                                                  ...processStorageObj,
                                                ];
                                                cloned[sIdx] = {
                                                  ...cloned[sIdx],
                                                  phase: e.target.value,
                                                };
                                                handleArrayChange(
                                                  "featuredProjects",
                                                  idx,
                                                  "processStorage",
                                                  cloned,
                                                );
                                              }}
                                              className="w-full bg-white border border-neutral-300 rounded px-2.5 py-1.5 text-xs text-neutral-900 font-bold focus:outline-none focus:border-neutral-400 font-sans"
                                            />
                                          </div>
                                          <div className="space-y-3 pl-3 border-l-2 border-rose-200">
                                            {(step.items || []).map(
                                              (item, iIdx) => (
                                                <div
                                                  key={iIdx}
                                                  className="space-y-2"
                                                >
                                                  <div className="space-y-1">
                                                    <span className="text-[10px] font-bold text-neutral-500 font-mono uppercase">
                                                      항목 {iIdx + 1} 소제목
                                                    </span>
                                                    <input
                                                      type="text"
                                                      value={item.title || ""}
                                                      onChange={(e) => {
                                                        const cloned = [
                                                          ...processStorageObj,
                                                        ];
                                                        const clonedItems = [
                                                          ...cloned[sIdx].items,
                                                        ];
                                                        clonedItems[iIdx] = {
                                                          ...clonedItems[iIdx],
                                                          title: e.target.value,
                                                        };
                                                        cloned[sIdx].items =
                                                          clonedItems;
                                                        handleArrayChange(
                                                          "featuredProjects",
                                                          idx,
                                                          "processStorage",
                                                          cloned,
                                                        );
                                                      }}
                                                      className="w-full bg-white border border-neutral-300 rounded px-2.5 py-1.5 text-xs text-neutral-850 font-bold focus:outline-none focus:border-neutral-400 font-sans"
                                                    />
                                                  </div>
                                                  <div className="space-y-1">
                                                    <span className="text-[10px] font-bold text-neutral-500 font-mono uppercase">
                                                      항목 {iIdx + 1} 상세
                                                    </span>
                                                    <textarea
                                                      value={item.body || ""}
                                                      onChange={(e) => {
                                                        const cloned = [
                                                          ...processStorageObj,
                                                        ];
                                                        const clonedItems = [
                                                          ...cloned[sIdx].items,
                                                        ];
                                                        clonedItems[iIdx] = {
                                                          ...clonedItems[iIdx],
                                                          body: e.target.value,
                                                        };
                                                        cloned[sIdx].items =
                                                          clonedItems;
                                                        handleArrayChange(
                                                          "featuredProjects",
                                                          idx,
                                                          "processStorage",
                                                          cloned,
                                                        );
                                                      }}
                                                      rows={3}
                                                      className="w-full bg-white border border-neutral-300 rounded px-2.5 py-1.5 text-xs text-neutral-750 focus:outline-none focus:border-neutral-400 font-sans leading-relaxed"
                                                    />
                                                  </div>
                                                </div>
                                              ),
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* TAB CONTENT: 갤러리 (Gallery Archive) */}
                                {festivalActiveTab === "gallery" && (
                                  <div className="space-y-5 pt-2 animate-fadeIn text-neutral-900 font-sans">
                                    {/* 갤러리 안내 및 업로드 단추 */}
                                    <div className="p-4.5 border border-neutral-200 bg-neutral-50/50 rounded-[12px] space-y-3.5">
                                      <div className="flex justify-between items-center pb-1.5 border-b border-neutral-200/65">
                                        <div className="flex items-center gap-2 text-xs font-bold text-neutral-800">
                                          <span className="text-neutral-400 font-mono text-[14px] font-bold shrink-0">
                                            -
                                          </span>
                                          <span>
                                            갤러리 이미지 추가 및 관리
                                          </span>
                                        </div>
                                        <label className="cursor-pointer px-3 py-1.5 bg-[#FFF0F2] text-[#E0115F] border border-rose-200 text-xs font-bold rounded-[6px] transition-all hover:bg-rose-50 flex items-center gap-1 select-none">
                                          <Plus size={12} />
                                          <span>새 갤러리 사진 추가</span>
                                          <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => {
                                              if (
                                                e.target.files &&
                                                e.target.files[0]
                                              ) {
                                                handleGalleryImageUploadLocal(
                                                  e.target.files[0],
                                                );
                                              }
                                            }}
                                          />
                                        </label>
                                      </div>
                                      <p className="text-[11px] text-neutral-550 font-medium">
                                        참여했던 다양한 페스티벌 및 현장 스냅
                                        사진을 업로드하세요. 업로드된 이미지는
                                        갤러리 탭 슬라이드에 리프레시
                                        배포됩니다.
                                      </p>
                                      <span className="text-[10px] font-mono text-rose-500 font-black animate-pulse animate-fadeIn">
                                        {projectUploadStatus[
                                          `galleryImage-new`
                                        ] &&
                                          `[상태]: ${projectUploadStatus[`galleryImage-new`]}`}
                                      </span>
                                    </div>

                                    {/* 등록된 이미지 목록 그리드 */}
                                    <div className="p-4.5 border border-neutral-200 bg-white rounded-[12px] space-y-4">
                                      <div className="text-xs font-bold text-neutral-800 pb-1 border-b border-neutral-100">
                                        등록 완료된 이미지 목록 (
                                        {galleryImages.length}개)
                                      </div>
                                      {galleryImages.length === 0 ? (
                                        <div className="text-center py-8 text-xs text-neutral-400 font-bold">
                                          등록된 갤러리 미디어 사진이 없습니다.
                                          추가해 보세요!
                                        </div>
                                      ) : (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                          {galleryImages.map((imgUrl, gIdx) => (
                                            <div
                                              key={gIdx}
                                              className="group relative aspect-square bg-neutral-50 rounded-[8px] border border-neutral-200 overflow-hidden shadow-4xs animate-fadeIn"
                                            >
                                              <img
                                                src={imgUrl}
                                                alt={`gallery-${gIdx}`}
                                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                                referrerPolicy="no-referrer"
                                              />
                                              <div className="absolute inset-x-0 bottom-0 bg-neutral-900/60 p-1 flex justify-center backdrop-blur-xs transition-transform transform translate-y-1 group-hover:translate-y-0 text-white select-none">
                                                <button
                                                  type="button"
                                                  onClick={() => {
                                                    const updated = [
                                                      ...galleryImages,
                                                    ];
                                                    updated.splice(gIdx, 1);
                                                    handleArrayChange(
                                                      "featuredProjects",
                                                      idx,
                                                      "images",
                                                      updated,
                                                    );
                                                  }}
                                                  className="text-[9px] font-extrabold font-mono hover:text-red-350 flex items-center gap-0.5 justify-center py-0.5"
                                                >
                                                  <Trash2 size={9} /> 삭제
                                                </button>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          }

                          if (idx === 1) {
                            const descVal =
                              project.fullDescription ||
                              project.description ||
                              "";
                            let introText = descVal;
                            let achievements: string[] = [];

                            const marker = "[주요 공연 실적]";
                            const splitIdx = descVal.indexOf(marker);
                            if (splitIdx !== -1) {
                              introText = descVal.substring(0, splitIdx).trim();
                              const rest = descVal
                                .substring(splitIdx + marker.length)
                                .trim();
                              achievements = rest
                                .split("\n")
                                .map((l: string) =>
                                  l.trim().replace(/^[\-\•\*\s]+/g, ""),
                                )
                                .filter(Boolean);
                            } else {
                              achievements = [
                                "GREENERY 단독공연",
                                "Flower Planet",
                                "열대야",
                                "오후의 향기",
                                "야간비행",
                                "오페라의 유령 내한공연",
                                "위키드",
                                "캣츠 내한 공연",
                                "라이온킹 내한 공연",
                                "레베카",
                                "맘마미아",
                                "싯다르타",
                                "백조의 호수",
                                "시카고",
                              ];
                            }

                            const syncConcertDesc = (
                              newIntro: string,
                              newAch: string[],
                            ) => {
                              const trimmedIntro = (newIntro || "").trim();
                              const formattedAch = newAch
                                .map((a) => a.trim())
                                .filter(Boolean)
                                .map((a) => `• ${a}`)
                                .join("\n");
                              const combined = `${trimmedIntro}\n\n[주요 공연 실적]\n${formattedAch}`;
                              handleArrayChange(
                                "featuredProjects",
                                1,
                                "fullDescription",
                                combined,
                              );
                            };

                            const concertProjectsList =
                              project.concertProjects || [
                                "GREENERY 단독공연",
                                "Flower Planet",
                                "열대야",
                                "오후의 향기",
                                "야간비행",
                              ];

                            const houseProjectsList = project.houseProjects || [
                              "오페라의 유령 내한공연",
                              "위키드",
                              "캣츠 내한 공연",
                              "라이온킹 내한 공연",
                              "레베카",
                              "맘마미아",
                              "싯다르타",
                              "백조의 호수",
                              "시카고",
                            ];

                            let processConcertObj = project.processConcert;
                            if (
                              !processConcertObj ||
                              processConcertObj.length === 0
                            ) {
                              processConcertObj = [
                                {
                                  phase: "공연 기획 및 총괄",
                                  items: [
                                    {
                                      title: "공연 컨셉 및 프로그램 기획",
                                      body: "각 공연의 타이틀(열대야, 야간비행 등)에 맞는 무대 컨셉 디자인",
                                    },
                                  ],
                                },
                                {
                                  phase: "비주얼 디렉팅 및 마케팅",
                                  items: [
                                    {
                                      title: "홍보물 기획 및 디자인",
                                      body: "일러스트레이터, 미리캔버스 등을 활용해 공연 포스터, 웹 플라이어, SNS 홍보물 등 디자인 기획 및 제작",
                                    },
                                    {
                                      title: "영상 콘텐츠 제작",
                                      body: "프리미어 프로를 활용해 아티스트 인터뷰, 공연 홍보 숏츠 등 부가 영상 콘텐츠 제작",
                                    },
                                  ],
                                },
                                {
                                  phase: "무대 연출 및 현장 진행",
                                  items: [
                                    {
                                      title: "현장 연출 및 큐시트 관리",
                                      body: "전체 공연 진행 큐시트 작성 및 음향/조명 스태프와의 현장 커뮤니케이션",
                                    },
                                    {
                                      title: "참여진 매니지먼트",
                                      body: "참여 아티스트 및 밴드 세션들과 커뮤니케이션, 무대 동선 및 대기실 관리",
                                    },
                                    {
                                      title: "수익금 정산 및 마감",
                                      body: "티켓 판매 및 펀딩 수익금 최종 정산, 대관료 및 세션 페이 지급 등 프로젝트 정산",
                                    },
                                  ],
                                },
                              ];
                            }

                            let processHouseObj = project.processHouse;
                            if (
                              !processHouseObj ||
                              processHouseObj.length === 0
                            ) {
                              processHouseObj = [
                                {
                                  phase: "사전 준비 및 객석 세팅",
                                  items: [
                                    {
                                      title: "공연장 컨디션 점검",
                                      body: "관객 입장 전 객석 청결 상태, 좌석 이상 유무 및 비상 대피 동선 사전 점검",
                                    },
                                    {
                                      title: "당일 운영 매뉴얼 숙지",
                                      body: "러닝타임, 인터미션(휴식 시간), 지연 관객 입장 타이밍 등 당일 공연 특이사항 숙지 및 스태프 회의",
                                    },
                                    {
                                      title: "로비 편의시설 오픈 준비",
                                      body: "로비 내 물품보관소, 오페라글라스 대여소, 주차 정산소 등 관객 서비스 데스크 오픈 및 세팅",
                                    },
                                  ],
                                },
                                {
                                  phase: "현장 및 객석 운영",
                                  items: [
                                    {
                                      title: "객석 안내 및 지연 관객 통제",
                                      body: "관객 티켓 확인 후 정확한 좌석 안내, 공연 시작 후 늦게 도착한 지연 관객들을 정해진 타이밍에 맞춰 안전하게 입장 유도",
                                    },
                                    {
                                      title: "객석 내 돌발 상황 대응",
                                      body: "공연 중 불법 사진/영상 촬영 통제, 소음 발생이나 응급 환자 발생 등 객석 내 돌발 상황 실시간 대처",
                                    },
                                    {
                                      title: "인터미션(휴식 시간) 로비 통제",
                                      body: "짧은 휴식 시간 동안 로비 및 화장실로 몰리는 인파 혼잡도 관리 및 안전 통제",
                                    },
                                  ],
                                },
                                {
                                  phase: "사후 및 안전 관리",
                                  items: [
                                    {
                                      title: "안전 퇴장 유도",
                                      body: "공연 종료 후 수천 명의 관객이 한 번에 몰리지 않도록 구역별 퇴장 동선 안내 및 병목 현상 방지",
                                    },
                                    {
                                      title: "분실물 관리",
                                      body: "전체 관객 퇴장 후 객석 내 분실물 꼼꼼히 확인 및 유실물 센터 인계",
                                    },
                                    {
                                      title: "운영 리포트",
                                      body: "당일 객석 내 특이사항 및 접수된 관객 컴플레인 내역을 하우스 매니저에게 최종 보고",
                                    },
                                  ],
                                },
                              ];
                            }

                            const galleryImages = project.images || [];

                            const handleGalleryImageUploadLocal = async (
                              file: File,
                            ) => {
                              const key = `galleryImage-new-concert`;
                              try {
                                setProjectUploadStatus((prev) => ({
                                  ...prev,
                                  [key]: "업로드 중...",
                                }));
                                const reader = new FileReader();
                                reader.onloadend = async () => {
                                  const base64Content = reader.result as string;
                                  try {
                                    const res = await fetch("/api/upload", {
                                      method: "POST",
                                      headers: {
                                        "Content-Type": "application/json",
                                      },
                                      body: JSON.stringify({
                                        fileName: file.name,
                                        fileContent: base64Content,
                                      }),
                                    });
                                    if (res.ok) {
                                      const data = await res.json();
                                      const currentImages = [
                                        ...galleryImages,
                                        data.url,
                                      ];
                                      handleArrayChange(
                                        "featuredProjects",
                                        1,
                                        "images",
                                        currentImages,
                                      );
                                      setProjectUploadStatus((prev) => ({
                                        ...prev,
                                        [key]: "업로드 완료",
                                      }));
                                      setTimeout(() => {
                                        setProjectUploadStatus((prev) => {
                                          const next = { ...prev };
                                          delete next[key];
                                          return next;
                                        });
                                      }, 3000);
                                    } else {
                                      setProjectUploadStatus((prev) => ({
                                        ...prev,
                                        [key]: "실패",
                                      }));
                                    }
                                  } catch (err) {
                                    setProjectUploadStatus((prev) => ({
                                      ...prev,
                                      [key]: "에러",
                                    }));
                                  }
                                };
                                reader.readAsDataURL(file);
                              } catch (err) {
                                setProjectUploadStatus((prev) => ({
                                  ...prev,
                                  [key]: "파일 에러",
                                }));
                              }
                            };

                            return (
                              <div
                                key={idx}
                                className="p-6 border border-neutral-300 bg-white rounded-[15px] space-y-6 shadow-sm animate-fadeIn text-neutral-900 font-sans"
                              >
                                {/* Header Title with Custom Indicators */}
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b-2 border-neutral-800 pb-4">
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="bg-neutral-900 border border-neutral-900 hover:bg-neutral-800 text-white font-mono font-black text-[10px] px-2.5 py-1 rounded">
                                        프로젝트 번호 #2
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 pr-1">
                                    {renderSaveButton("featured_projects")}
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleArrayDelete(
                                          "featuredProjects",
                                          idx,
                                        )
                                      }
                                      className="text-neutral-400 hover:text-red-500 transition-all font-mono text-xs flex items-center gap-1 hover:underline ml-2"
                                    >
                                      <Trash2 size={13} /> 제거
                                    </button>
                                  </div>
                                </div>

                                {/* Tab selectors for Concert Admin */}
                                <div className="flex flex-wrap border-b border-neutral-200 gap-1 select-none">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setConcertActiveTab("summary")
                                    }
                                    className={`px-5 py-2.5 text-xs font-black tracking-wider transition-all flex items-center gap-2 border-t border-x rounded-t-[10px] -mb-px ${
                                      concertActiveTab === "summary"
                                        ? "border-neutral-800 border-b-white bg-white text-neutral-900 font-extrabold scale-[1.01]"
                                        : "border-transparent bg-neutral-50 hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700"
                                    }`}
                                  >
                                    <span className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0" />
                                    <span>개요</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setConcertActiveTab("concert")
                                    }
                                    className={`px-5 py-2.5 text-xs font-black tracking-wider transition-all flex items-center gap-2 border-t border-x rounded-t-[10px] -mb-px ${
                                      concertActiveTab === "concert"
                                        ? "border-neutral-800 border-b-white bg-white text-neutral-900 font-extrabold scale-[1.01]"
                                        : "border-transparent bg-neutral-50 hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700"
                                    }`}
                                  >
                                    <span className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0" />
                                    <span>공연 운영</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setConcertActiveTab("house")}
                                    className={`px-5 py-2.5 text-xs font-black tracking-wider transition-all flex items-center gap-2 border-t border-x rounded-t-[10px] -mb-px ${
                                      concertActiveTab === "house"
                                        ? "border-neutral-800 border-b-white bg-white text-neutral-900 font-extrabold scale-[1.01]"
                                        : "border-transparent bg-neutral-50 hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700"
                                    }`}
                                  >
                                    <span className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0" />
                                    <span>하우스 운영 보조</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setConcertActiveTab("gallery")
                                    }
                                    className={`px-5 py-2.5 text-xs font-black tracking-wider transition-all flex items-center gap-2 border-t border-x rounded-t-[10px] -mb-px ${
                                      concertActiveTab === "gallery"
                                        ? "border-neutral-800 border-b-white bg-white text-neutral-900 font-extrabold scale-[1.01]"
                                        : "border-transparent bg-neutral-50 hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700"
                                    }`}
                                  >
                                    <span className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0" />
                                    <span>갤러리</span>
                                  </button>
                                </div>

                                {/* Tab Contents */}
                                {concertActiveTab === "summary" && (
                                  <div className="space-y-5 pt-2 animate-fadeIn text-neutral-900 font-sans">
                                    {/* - 공연/프로젝트 이름 */}
                                    <div className="p-4.5 border border-neutral-200 bg-neutral-50/50 rounded-[12px] space-y-2">
                                      <div className="flex items-center gap-2 text-xs font-bold text-neutral-800">
                                        <span className="text-neutral-400 font-mono text-[14px] font-bold shrink-0">
                                          -
                                        </span>
                                        <span>공연/프로젝트 이름</span>
                                      </div>
                                      <input
                                        type="text"
                                        value={project.title || ""}
                                        onChange={(e) =>
                                          handleArrayChange(
                                            "featuredProjects",
                                            idx,
                                            "title",
                                            e.target.value,
                                          )
                                        }
                                        className="w-full bg-white border border-neutral-300 rounded px-2.5 py-2 text-xs font-bold text-neutral-900 focus:outline-none focus:border-neutral-400"
                                      />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div className="p-4.5 border border-neutral-200 bg-neutral-50/50 rounded-[12px] space-y-2">
                                        <span className="text-[10px] font-bold font-mono text-neutral-500 uppercase">
                                          개최 연도
                                        </span>
                                        <input
                                          type="text"
                                          value={project.year || ""}
                                          onChange={(e) =>
                                            handleArrayChange(
                                              "featuredProjects",
                                              idx,
                                              "year",
                                              e.target.value,
                                            )
                                          }
                                          className="w-full bg-white border border-neutral-300 rounded px-2.5 py-2 text-xs font-mono font-bold text-neutral-900 focus:outline-none focus:border-neutral-400"
                                        />
                                      </div>
                                      <div className="p-4.5 border border-neutral-200 bg-neutral-50/50 rounded-[12px] space-y-2">
                                        <span className="text-[10px] font-bold font-mono text-neutral-500 uppercase">
                                          기여도 (%)
                                        </span>
                                        <input
                                          type="text"
                                          value={project.contribution || ""}
                                          onChange={(e) =>
                                            handleArrayChange(
                                              "featuredProjects",
                                              idx,
                                              "contribution",
                                              e.target.value,
                                            )
                                          }
                                          className="w-full bg-white border border-neutral-300 rounded px-2.5 py-2 text-xs font-mono font-bold text-neutral-900 focus:outline-none focus:border-neutral-400"
                                        />
                                      </div>
                                    </div>

                                    {/* - 긴 한 줄 소개 */}
                                    <div className="p-4.5 border border-neutral-200 bg-neutral-50/50 rounded-[12px] space-y-2">
                                      <span className="text-[10px] font-bold font-mono text-neutral-500 uppercase">
                                        대표 요약설명
                                      </span>
                                      <textarea
                                        value={project.description || ""}
                                        onChange={(e) =>
                                          handleArrayChange(
                                            "featuredProjects",
                                            idx,
                                            "description",
                                            e.target.value,
                                          )
                                        }
                                        className="w-full bg-white border border-neutral-300 rounded px-2.5 py-2 text-xs font-medium text-neutral-800 focus:outline-none focus:border-neutral-400 min-h-[60px]"
                                      />
                                    </div>

                                    {/* - 상세 소개 */}
                                    <div className="p-4.5 border border-neutral-200 bg-neutral-50/50 rounded-[12px] space-y-3">
                                      <div className="space-y-1.5">
                                        <span className="text-[10px] font-bold font-mono text-neutral-500 uppercase block">
                                          회사 소개 및 상세 개요
                                        </span>
                                        <textarea
                                          value={introText}
                                          onChange={(e) =>
                                            syncConcertDesc(
                                              e.target.value,
                                              achievements,
                                            )
                                          }
                                          className="w-full bg-white border border-neutral-300 rounded px-2.5 py-2 text-xs font-medium text-neutral-800 focus:outline-none focus:border-neutral-400 min-h-[140px]"
                                          placeholder="상세 설명"
                                        />
                                      </div>

                                      <div className="space-y-2.5 pt-2.5 border-t border-neutral-200/60">
                                        <div className="flex justify-between items-center">
                                          <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase">
                                            등록 아카이브 실적 (
                                            {achievements.length}개)
                                          </span>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              syncConcertDesc(introText, [
                                                ...achievements,
                                                "새로운 공연 실적",
                                              ])
                                            }
                                            className="px-2 py-1 bg-neutral-900 text-white text-[10px] font-extrabold rounded-[4px] hover:bg-neutral-850"
                                          >
                                            + 실적 추가
                                          </button>
                                        </div>
                                        <div className="space-y-2">
                                          {achievements.map((ach, aIdx) => (
                                            <div
                                              key={aIdx}
                                              className="flex gap-2 items-center"
                                            >
                                              <input
                                                type="text"
                                                value={ach}
                                                onChange={(e) => {
                                                  const updated = [
                                                    ...achievements,
                                                  ];
                                                  updated[aIdx] =
                                                    e.target.value;
                                                  syncConcertDesc(
                                                    introText,
                                                    updated,
                                                  );
                                                }}
                                                className="flex-1 bg-white border border-neutral-300 rounded px-2.5 py-1.5 text-xs text-neutral-900 font-bold focus:outline-none focus:border-neutral-400"
                                              />
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  const updated = [
                                                    ...achievements,
                                                  ];
                                                  updated.splice(aIdx, 1);
                                                  syncConcertDesc(
                                                    introText,
                                                    updated,
                                                  );
                                                }}
                                                className="text-neutral-400 hover:text-red-500 text-xs shrink-0 p-1"
                                              >
                                                삭제
                                              </button>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {concertActiveTab === "concert" && (
                                  <div className="space-y-5 pt-2 animate-fadeIn text-neutral-900 font-sans">
                                    {/* 1. 공연 운영 실적 아카이브 요약 */}
                                    <div className="p-4.5 border border-neutral-200 bg-neutral-50/50 rounded-[12px] space-y-3">
                                      <div className="flex justify-between items-center pb-1.5 border-b border-neutral-200/60">
                                        <span className="text-xs font-bold text-neutral-800">
                                          공연 운영 실적 목록
                                        </span>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const updated = [
                                              ...concertProjectsList,
                                              "새로운 공연 운영 실적",
                                            ];
                                            handleArrayChange(
                                              "featuredProjects",
                                              1,
                                              "concertProjects",
                                              updated,
                                            );
                                          }}
                                          className="px-2 py-1 bg-neutral-900 text-white text-[10px] font-extrabold rounded-[4px] hover:bg-neutral-850"
                                        >
                                          + 추가
                                        </button>
                                      </div>
                                      <div className="space-y-2">
                                        {concertProjectsList.map(
                                          (cp, cpIdx) => (
                                            <div
                                              key={cpIdx}
                                              className="flex gap-2 items-center"
                                            >
                                              <input
                                                type="text"
                                                value={cp}
                                                onChange={(e) => {
                                                  const updated = [
                                                    ...concertProjectsList,
                                                  ];
                                                  updated[cpIdx] =
                                                    e.target.value;
                                                  handleArrayChange(
                                                    "featuredProjects",
                                                    1,
                                                    "concertProjects",
                                                    updated,
                                                  );
                                                }}
                                                className="flex-1 bg-white border border-neutral-300 rounded px-2.5 py-1.5 text-xs text-neutral-900 font-bold focus:outline-none"
                                              />
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  const updated = [
                                                    ...concertProjectsList,
                                                  ];
                                                  updated.splice(cpIdx, 1);
                                                  handleArrayChange(
                                                    "featuredProjects",
                                                    1,
                                                    "concertProjects",
                                                    updated,
                                                  );
                                                }}
                                                className="text-neutral-400 hover:text-red-500 text-xs shrink-0 p-1"
                                              >
                                                삭제
                                              </button>
                                            </div>
                                          ),
                                        )}
                                      </div>
                                    </div>

                                    {/* 2. 공연 운영 프로세스 편집 */}
                                    <div className="p-4.5 border border-neutral-200 bg-neutral-50/50 rounded-[12px] space-y-4">
                                      <div className="text-xs font-bold text-neutral-800 pb-1.5 border-b border-neutral-200/60">
                                        공연 운영 및 진행 프로세스 (3단계)
                                      </div>
                                      <div className="space-y-5">
                                        {processConcertObj.map(
                                          (step: any, sIdx: number) => (
                                            <div
                                              key={sIdx}
                                              className="p-4 border border-neutral-200 bg-white rounded-[8px] space-y-3 shadow-3xs"
                                            >
                                              <div className="flex justify-between items-center border-b border-neutral-100 pb-2">
                                                <div className="flex items-center gap-1.5">
                                                  <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                                                  <span className="text-xs font-black text-neutral-950">
                                                    STAGE 0{sIdx + 1}
                                                  </span>
                                                </div>
                                                <input
                                                  type="text"
                                                  value={step.phase || ""}
                                                  onChange={(e) => {
                                                    const cloned = JSON.parse(
                                                      JSON.stringify(
                                                        processConcertObj,
                                                      ),
                                                    );
                                                    cloned[sIdx].phase =
                                                      e.target.value;
                                                    handleArrayChange(
                                                      "featuredProjects",
                                                      1,
                                                      "processConcert",
                                                      cloned,
                                                    );
                                                  }}
                                                  className="text-xs font-bold text-rose-600 bg-transparent text-right border-none outline-none focus:underline"
                                                  placeholder="단계 이름 (예: 준비 단계)"
                                                />
                                              </div>
                                              <div className="space-y-2.5">
                                                {(step.items || []).map(
                                                  (item: any, iIdx: number) => (
                                                    <div
                                                      key={iIdx}
                                                      className="space-y-1 bg-neutral-50/50 p-2.5 border border-neutral-150 rounded-[6px]"
                                                    >
                                                      <input
                                                        type="text"
                                                        value={item.title || ""}
                                                        onChange={(e) => {
                                                          const cloned =
                                                            JSON.parse(
                                                              JSON.stringify(
                                                                processConcertObj,
                                                              ),
                                                            );
                                                          cloned[sIdx].items[
                                                            iIdx
                                                          ].title =
                                                            e.target.value;
                                                          handleArrayChange(
                                                            "featuredProjects",
                                                            1,
                                                            "processConcert",
                                                            cloned,
                                                          );
                                                        }}
                                                        className="w-full bg-transparent border-none text-xs font-bold text-neutral-900 focus:outline-none mb-1 text-left"
                                                        placeholder="세부 타이틀"
                                                      />
                                                      <textarea
                                                        value={item.body || ""}
                                                        onChange={(e) => {
                                                          const cloned =
                                                            JSON.parse(
                                                              JSON.stringify(
                                                                processConcertObj,
                                                              ),
                                                            );
                                                          cloned[sIdx].items[
                                                            iIdx
                                                          ].body =
                                                            e.target.value;
                                                          handleArrayChange(
                                                            "featuredProjects",
                                                            1,
                                                            "processConcert",
                                                            cloned,
                                                          );
                                                        }}
                                                        className="w-full bg-white border border-neutral-200 rounded p-1.5 text-xs text-neutral-700 focus:outline-none min-h-[40px]"
                                                        placeholder="세부 설명 내용"
                                                      />
                                                    </div>
                                                  ),
                                                )}
                                              </div>
                                            </div>
                                          ),
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {concertActiveTab === "house" && (
                                  <div className="space-y-5 pt-2 animate-fadeIn text-neutral-900 font-sans">
                                    {/* 1. 하우스 운영 보조 실적 목록 */}
                                    <div className="p-4.5 border border-neutral-200 bg-neutral-50/50 rounded-[12px] space-y-3">
                                      <div className="flex justify-between items-center pb-1.5 border-b border-neutral-200/60">
                                        <span className="text-xs font-bold text-neutral-800">
                                          하우스 운영 보조 실적 목록
                                        </span>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const updated = [
                                              ...houseProjectsList,
                                              "새로운 뮤지컬 공연",
                                            ];
                                            handleArrayChange(
                                              "featuredProjects",
                                              1,
                                              "houseProjects",
                                              updated,
                                            );
                                          }}
                                          className="px-2 py-1 bg-neutral-900 text-white text-[10px] font-extrabold rounded-[4px] hover:bg-neutral-850"
                                        >
                                          + 추가
                                        </button>
                                      </div>
                                      <div className="space-y-2">
                                        {houseProjectsList.map((hp, hpIdx) => (
                                          <div
                                            key={hpIdx}
                                            className="flex gap-2 items-center"
                                          >
                                            <input
                                              type="text"
                                              value={hp}
                                              onChange={(e) => {
                                                const updated = [
                                                  ...houseProjectsList,
                                                ];
                                                updated[hpIdx] = e.target.value;
                                                handleArrayChange(
                                                  "featuredProjects",
                                                  1,
                                                  "houseProjects",
                                                  updated,
                                                );
                                              }}
                                              className="flex-1 bg-white border border-neutral-300 rounded px-2.5 py-1.5 text-xs text-neutral-900 font-bold focus:outline-none"
                                            />
                                            <button
                                              type="button"
                                              onClick={() => {
                                                const updated = [
                                                  ...houseProjectsList,
                                                ];
                                                updated.splice(hpIdx, 1);
                                                handleArrayChange(
                                                  "featuredProjects",
                                                  1,
                                                  "houseProjects",
                                                  updated,
                                                );
                                              }}
                                              className="text-neutral-400 hover:text-red-500 text-xs shrink-0 p-1"
                                            >
                                              삭제
                                            </button>
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                    {/* 2. 하우스 운영 보조 프로세스 편집 */}
                                    <div className="p-4.5 border border-neutral-200 bg-neutral-50/50 rounded-[12px] space-y-4">
                                      <div className="text-xs font-bold text-neutral-800 pb-1.5 border-b border-neutral-200/60">
                                        하우스 서비스 및 고객 응대 제어 프로세스
                                        (3단계)
                                      </div>
                                      <div className="space-y-5">
                                        {processHouseObj.map(
                                          (step: any, sIdx: number) => (
                                            <div
                                              key={sIdx}
                                              className="p-4 border border-neutral-200 bg-white rounded-[8px] space-y-3 shadow-3xs"
                                            >
                                              <div className="flex justify-between items-center border-b border-neutral-100 pb-2">
                                                <div className="flex items-center gap-1.5">
                                                  <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                                                  <span className="text-xs font-black text-neutral-950">
                                                    STAGE 0{sIdx + 1}
                                                  </span>
                                                </div>
                                                <input
                                                  type="text"
                                                  value={step.phase || ""}
                                                  onChange={(e) => {
                                                    const cloned = JSON.parse(
                                                      JSON.stringify(
                                                        processHouseObj,
                                                      ),
                                                    );
                                                    cloned[sIdx].phase =
                                                      e.target.value;
                                                    handleArrayChange(
                                                      "featuredProjects",
                                                      1,
                                                      "processHouse",
                                                      cloned,
                                                    );
                                                  }}
                                                  className="text-xs font-bold text-rose-600 bg-transparent text-right border-none outline-none focus:underline"
                                                  placeholder="단계 이름 (예: 사전 정비)"
                                                />
                                              </div>
                                              <div className="space-y-2.5">
                                                {(step.items || []).map(
                                                  (item: any, iIdx: number) => (
                                                    <div
                                                      key={iIdx}
                                                      className="space-y-1 bg-neutral-50/50 p-2.5 border border-neutral-150 rounded-[6px]"
                                                    >
                                                      <input
                                                        type="text"
                                                        value={item.title || ""}
                                                        onChange={(e) => {
                                                          const cloned =
                                                            JSON.parse(
                                                              JSON.stringify(
                                                                processHouseObj,
                                                              ),
                                                            );
                                                          cloned[sIdx].items[
                                                            iIdx
                                                          ].title =
                                                            e.target.value;
                                                          handleArrayChange(
                                                            "featuredProjects",
                                                            1,
                                                            "processHouse",
                                                            cloned,
                                                          );
                                                        }}
                                                        className="w-full bg-transparent border-none text-xs font-bold text-neutral-900 focus:outline-none mb-1 text-left"
                                                        placeholder="세부 타이틀"
                                                      />
                                                      <textarea
                                                        value={item.body || ""}
                                                        onChange={(e) => {
                                                          const cloned =
                                                            JSON.parse(
                                                              JSON.stringify(
                                                                processHouseObj,
                                                              ),
                                                            );
                                                          cloned[sIdx].items[
                                                            iIdx
                                                          ].body =
                                                            e.target.value;
                                                          handleArrayChange(
                                                            "featuredProjects",
                                                            1,
                                                            "processHouse",
                                                            cloned,
                                                          );
                                                        }}
                                                        className="w-full bg-white border border-neutral-200 rounded p-1.5 text-xs text-neutral-700 focus:outline-none min-h-[40px]"
                                                        placeholder="세부 설명 내용"
                                                      />
                                                    </div>
                                                  ),
                                                )}
                                              </div>
                                            </div>
                                          ),
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {concertActiveTab === "gallery" && (
                                  <div className="space-y-5 pt-2 animate-fadeIn text-neutral-900 font-sans">
                                    {/* 갤러리 이미지 업로드 */}
                                    <div className="p-4.5 border border-neutral-200 bg-neutral-50/50 rounded-[12px] space-y-3.5">
                                      <div className="flex justify-between items-center pb-1.5 border-b border-neutral-200/65">
                                        <span className="text-xs font-bold text-neutral-850">
                                          갤러리 사진 추가 및 업로드
                                        </span>
                                        <label className="cursor-pointer px-3 py-1.5 bg-[#FFF0F2] text-[#E0115F] border border-rose-200 text-xs font-bold rounded-[6px] transition-all hover:bg-rose-50 flex items-center gap-1 select-none">
                                          <Plus size={12} />
                                          <span>새 갤러리 사진 추가</span>
                                          <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => {
                                              if (
                                                e.target.files &&
                                                e.target.files[0]
                                              ) {
                                                handleGalleryImageUploadLocal(
                                                  e.target.files[0],
                                                );
                                              }
                                            }}
                                          />
                                        </label>
                                      </div>
                                      <p className="text-[11px] text-neutral-550 font-medium">
                                        참여했던 다양한 공연 운영 및 대극장 작품
                                        촬영 컷을 업로드하십시오. 4번째 탭
                                        [갤러리] 화면에 슬라이드로 배포됩니다.
                                      </p>
                                      <span className="text-[10px] font-mono text-rose-500 font-black animate-pulse">
                                        {projectUploadStatus[
                                          `galleryImage-new-concert`
                                        ] &&
                                          `[상태]: ${projectUploadStatus[`galleryImage-new-concert`]}`}
                                      </span>
                                    </div>

                                    {/* 등록된 사진 그리드 */}
                                    <div className="p-4.5 border border-neutral-200 bg-white rounded-[12px] space-y-4">
                                      <div className="text-xs font-bold text-neutral-800 pb-1 border-b border-neutral-100">
                                        등록 완료 이미지 목록 (
                                        {galleryImages.length}개)
                                      </div>
                                      {galleryImages.length === 0 ? (
                                        <div className="text-center py-8 text-xs text-neutral-400 font-bold">
                                          등록된 갤러리 아카이브 사진이
                                          없습니다. 추가해 보십시오!
                                        </div>
                                      ) : (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                          {galleryImages.map((imgUrl, gIdx) => (
                                            <div
                                              key={gIdx}
                                              className="group relative aspect-square bg-neutral-50 rounded-[8px] border border-neutral-200 overflow-hidden shadow-4xs animate-fadeIn"
                                            >
                                              <img
                                                src={imgUrl}
                                                alt={`gallery-${gIdx}`}
                                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                                referrerPolicy="no-referrer"
                                              />
                                              <div className="absolute inset-x-0 bottom-0 bg-neutral-900/60 p-1 flex justify-center backdrop-blur-xs transition-transform transform translate-y-1 group-hover:translate-y-0 text-white select-none">
                                                <button
                                                  type="button"
                                                  onClick={() => {
                                                    const updated = [
                                                      ...galleryImages,
                                                    ];
                                                    updated.splice(gIdx, 1);
                                                    handleArrayChange(
                                                      "featuredProjects",
                                                      1,
                                                      "images",
                                                      updated,
                                                    );
                                                  }}
                                                  className="text-[9px] font-extrabold font-mono hover:text-red-350 flex items-center gap-0.5 justify-center py-0.5"
                                                >
                                                  <Trash2 size={9} /> 삭제
                                                </button>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          }

                          return (
                            <div
                              key={idx}
                              className="p-6 border border-neutral-300 bg-white rounded-[15px] space-y-6 shadow-sm animate-fadeIn text-neutral-900 font-sans"
                            >
                              {/* Header Title with Custom Indicators */}
                              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b-2 border-neutral-800 pb-4">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="bg-neutral-900 border border-neutral-900 hover:bg-neutral-800 text-white font-mono font-black text-[10px] px-2.5 py-1 rounded">
                                      프로젝트 번호 #{idx + 1}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 pr-1">
                                  {renderSaveButton("featured_projects")}
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleArrayDelete("featuredProjects", idx)
                                    }
                                    className="text-neutral-400 hover:text-red-500 transition-all font-mono text-xs flex items-center gap-1 hover:underline ml-2"
                                  >
                                    <Trash2 size={13} /> 제거
                                  </button>
                                </div>
                              </div>

                              {/* - 기본 정보 */}
                              <div className="p-4.5 border border-neutral-200 bg-neutral-50/50 rounded-[12px] space-y-4">
                                <div className="flex items-center gap-2 text-xs font-bold text-neutral-800 pb-1.5 border-b border-neutral-200/65">
                                  <span className="text-neutral-400 font-mono text-[14px] font-bold shrink-0">
                                    -
                                  </span>
                                  <span>기본 정보</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-1">
                                    <span className="text-[10px] font-bold font-mono text-neutral-500 uppercase">
                                      공연/프로젝트 이름
                                    </span>
                                    <input
                                      type="text"
                                      value={project.title || ""}
                                      onChange={(e) =>
                                        handleArrayChange(
                                          "featuredProjects",
                                          idx,
                                          "title",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full bg-white border border-neutral-300 rounded px-2.5 py-2 text-xs font-bold text-neutral-900 focus:outline-none focus:border-neutral-400"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <span className="text-[10px] font-bold font-mono text-neutral-500 uppercase">
                                      개최 연도
                                    </span>
                                    <input
                                      type="text"
                                      value={project.year || ""}
                                      onChange={(e) =>
                                        handleArrayChange(
                                          "featuredProjects",
                                          idx,
                                          "year",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full bg-white border border-neutral-300 rounded px-2.5 py-2 text-xs font-mono font-bold text-neutral-900 focus:outline-none focus:border-neutral-400"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <span className="text-[10px] font-bold font-mono text-neutral-500 uppercase">
                                      카테고리 (분야) 슬라이드명
                                    </span>
                                    <input
                                      type="text"
                                      value={project.category || ""}
                                      onChange={(e) =>
                                        handleArrayChange(
                                          "featuredProjects",
                                          idx,
                                          "category",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full bg-white border border-neutral-300 rounded px-2.5 py-2 text-xs font-bold text-neutral-900 focus:outline-none focus:border-neutral-400"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <span className="text-[10px] font-bold font-mono text-neutral-500 uppercase">
                                      참여도/기여도 (%)
                                    </span>
                                    <input
                                      type="text"
                                      value={project.contribution || ""}
                                      onChange={(e) =>
                                        handleArrayChange(
                                          "featuredProjects",
                                          idx,
                                          "contribution",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full bg-white border border-neutral-300 rounded px-2.5 py-2 text-xs font-mono font-bold text-neutral-900 focus:outline-none focus:border-neutral-400"
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* - 대표 커버 이미지 */}
                              <div className="p-4.5 border border-neutral-200 bg-neutral-50/50 rounded-[12px] space-y-4">
                                <div className="flex items-center gap-2 text-xs font-bold text-neutral-800 pb-1.5 border-b border-neutral-200/65">
                                  <span className="text-neutral-400 font-mono text-[14px] font-bold shrink-0">
                                    -
                                  </span>
                                  <span>대표 커버 이미지 (Cover Image)</span>
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                  <div className="w-24 h-16 bg-white border border-neutral-300 rounded-[8px] overflow-hidden flex items-center justify-center shrink-0 shadow-4xs">
                                    {project.image ? (
                                      <img
                                        src={project.image}
                                        alt="preview"
                                        className="w-full h-full object-cover"
                                        referrerPolicy="no-referrer"
                                      />
                                    ) : (
                                      <ImageIcon
                                        size={22}
                                        className="text-neutral-300"
                                      />
                                    )}
                                  </div>
                                  <div className="flex-1 w-full space-y-1">
                                    <div className="flex items-center gap-2">
                                      <label className="cursor-pointer px-3 py-1.5 bg-white hover:bg-neutral-50 text-neutral-800 rounded-sm border border-neutral-300 text-xs font-semibold inline-flex items-center gap-1.5 transition-all active:scale-95 shadow-3xs user-select-none">
                                        <Upload size={12} />
                                        <span>대표이미지 선택</span>
                                        <input
                                          type="file"
                                          accept="image/*"
                                          className="hidden"
                                          onChange={(e) => {
                                            if (
                                              e.target.files &&
                                              e.target.files[0]
                                            ) {
                                              handleProjectImageUpload(
                                                e.target.files[0],
                                                "featuredProjects",
                                                idx,
                                              );
                                            }
                                          }}
                                        />
                                      </label>
                                      {project.image && (
                                        <button
                                          type="button"
                                          onClick={() =>
                                            handleArrayChange(
                                              "featuredProjects",
                                              idx,
                                              "image",
                                              "",
                                            )
                                          }
                                          className="px-3 py-1.5 text-rose-600 hover:bg-rose-50 rounded-sm text-xs font-semibold font-sans transition-all"
                                        >
                                          제거
                                        </button>
                                      )}
                                    </div>
                                    {projectUploadStatus[
                                      `featuredProjects-${idx}`
                                    ] ? (
                                      <p className="text-[10px] font-mono text-neutral-600 animate-pulse bg-neutral-100/80 px-2 py-0.5 rounded inline-block">
                                        {
                                          projectUploadStatus[
                                            `featuredProjects-${idx}`
                                          ]
                                        }
                                      </p>
                                    ) : (
                                      <p className="text-[10px] text-neutral-500 font-sans leading-none">
                                        업로드 시 이미지 포트폴리오 대표 커버로
                                        즉각 적용됩니다.
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* - 프로젝트 설명 */}
                              <div className="p-4.5 border border-neutral-200 bg-neutral-50/50 rounded-[12px] space-y-4">
                                <div className="flex items-center gap-2 text-xs font-bold text-neutral-800 pb-1.5 border-b border-neutral-200/65">
                                  <span className="text-neutral-400 font-mono text-[14px] font-bold shrink-0">
                                    -
                                  </span>
                                  <span>프로젝트 설명</span>
                                </div>
                                <div className="space-y-3.5">
                                  <div className="space-y-1">
                                    <span className="text-[10px] font-bold font-mono text-neutral-500">
                                      업무 요약 (About / Main List 카드용 설명)
                                    </span>
                                    <input
                                      type="text"
                                      value={project.description || ""}
                                      onChange={(e) =>
                                        handleArrayChange(
                                          "featuredProjects",
                                          idx,
                                          "description",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full bg-white border border-neutral-300 rounded px-2.5 py-2 text-xs text-neutral-800 focus:outline-none focus:border-neutral-400 font-sans font-medium"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <span className="text-[10px] font-bold font-mono text-neutral-500">
                                      긴 상세 설명 (상세 모달 내부)
                                    </span>
                                    <textarea
                                      value={project.fullDescription || ""}
                                      onChange={(e) =>
                                        handleArrayChange(
                                          "featuredProjects",
                                          idx,
                                          "fullDescription",
                                          e.target.value,
                                        )
                                      }
                                      rows={4}
                                      className="w-full bg-white border border-neutral-300 rounded px-2.5 py-2 text-xs font-sans text-neutral-850 leading-relaxed focus:outline-none focus:border-neutral-400 font-medium"
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Process Sections (Pre-event, On-site, CS) */}
                              <div className="p-4.5 border border-neutral-200 bg-neutral-50/50 rounded-[12px] space-y-3.5">
                                <div className="flex justify-between items-center pb-1.5 border-b border-neutral-200/65">
                                  <div className="flex items-center gap-2 text-xs font-bold text-neutral-800">
                                    <span className="text-neutral-400 font-mono text-[14px] font-bold shrink-0">
                                      -
                                    </span>
                                    <span>
                                      기획 및 실행 프로세스단계 (Process Stages)
                                    </span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updated = [
                                        ...(project.process || []),
                                        { phase: "새 단계", items: [] },
                                      ];
                                      handleArrayChange(
                                        "featuredProjects",
                                        idx,
                                        "process",
                                        updated,
                                      );
                                    }}
                                    className="text-xs text-rose-600 hover:text-rose-700 font-bold hover:underline flex items-center gap-0.5"
                                  >
                                    <Plus size={11} /> 단계 단락 추가
                                  </button>
                                </div>

                                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                                  {(project.process || []).map(
                                    (p: any, pIdx: number) => (
                                      <div
                                        key={pIdx}
                                        className="p-3.5 border border-neutral-200 bg-white rounded-[8px] gap-2 space-y-2 relative shadow-4xs animate-fadeIn"
                                      >
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const updated = [
                                              ...(project.process || []),
                                            ];
                                            updated.splice(pIdx, 1);
                                            handleArrayChange(
                                              "featuredProjects",
                                              idx,
                                              "process",
                                              updated,
                                            );
                                          }}
                                          className="absolute right-3.5 top-3.5 text-[10px] text-neutral-400 hover:text-red-500 font-mono font-bold"
                                        >
                                          삭제
                                        </button>
                                        <div className="w-full sm:w-2/3">
                                          <span className="text-[10px] font-bold font-mono text-neutral-500 pl-1 uppercase">
                                            단계명 (사전운영, 현장운영 등)
                                          </span>
                                          <input
                                            type="text"
                                            value={p.phase || ""}
                                            onChange={(e) => {
                                              const updated = [
                                                ...(project.process || []),
                                              ];
                                              updated[pIdx] = {
                                                ...updated[pIdx],
                                                phase: e.target.value,
                                              };
                                              handleArrayChange(
                                                "featuredProjects",
                                                idx,
                                                "process",
                                                updated,
                                              );
                                            }}
                                            className="w-full bg-white border border-neutral-300 rounded px-2.5 py-1.5 text-xs text-neutral-900 font-bold focus:outline-none focus:border-neutral-400"
                                          />
                                        </div>
                                        <div className="space-y-1.5 pt-1.5">
                                          <div className="flex justify-between items-center text-[10px] font-bold font-mono text-neutral-500">
                                            <span>상세 내용 불렛</span>
                                            <button
                                              type="button"
                                              onClick={() => {
                                                const updated = [
                                                  ...(project.process || []),
                                                ];
                                                updated[pIdx].items = [
                                                  ...(updated[pIdx].items ||
                                                    []),
                                                  "",
                                                ];
                                                handleArrayChange(
                                                  "featuredProjects",
                                                  idx,
                                                  "process",
                                                  updated,
                                                );
                                              }}
                                              className="text-neutral-700 hover:text-neutral-900 hover:underline font-extrabold text-[10px]"
                                            >
                                              + 불렛 추가
                                            </button>
                                          </div>
                                          {(p.items || []).map(
                                            (bullet: string, bIdx: number) => (
                                              <div
                                                key={bIdx}
                                                className="flex items-center gap-2 animate-fadeIn"
                                              >
                                                <span className="text-neutral-400 text-xs shrink-0 font-serif font-bold">
                                                  -
                                                </span>
                                                <input
                                                  type="text"
                                                  value={bullet}
                                                  onChange={(e) => {
                                                    const updated = [
                                                      ...(project.process ||
                                                        []),
                                                    ];
                                                    const bullets = [
                                                      ...(updated[pIdx].items ||
                                                        []),
                                                    ];
                                                    bullets[bIdx] =
                                                      e.target.value;
                                                    updated[pIdx].items =
                                                      bullets;
                                                    handleArrayChange(
                                                      "featuredProjects",
                                                      idx,
                                                      "process",
                                                      updated,
                                                    );
                                                  }}
                                                  className="w-full bg-white border border-neutral-300 rounded px-2.5 py-1 text-xs text-neutral-850 font-medium focus:outline-none focus:border-neutral-400"
                                                />
                                                <button
                                                  type="button"
                                                  onClick={() => {
                                                    const updated = [
                                                      ...(project.process ||
                                                        []),
                                                    ];
                                                    const bullets = [
                                                      ...(updated[pIdx].items ||
                                                        []),
                                                    ];
                                                    bullets.splice(bIdx, 1);
                                                    updated[pIdx].items =
                                                      bullets;
                                                    handleArrayChange(
                                                      "featuredProjects",
                                                      idx,
                                                      "process",
                                                      updated,
                                                    );
                                                  }}
                                                  className="text-neutral-400 hover:text-red-500 text-sm font-bold pl-1"
                                                >
                                                  ×
                                                </button>
                                              </div>
                                            ),
                                          )}
                                        </div>
                                      </div>
                                    ),
                                  )}
                                </div>
                              </div>

                              {/* Primary Role (담당 업무 총괄) */}
                              <div className="p-4.5 border border-neutral-200 bg-neutral-50/50 rounded-[12px] space-y-3.5">
                                <div className="flex items-center gap-2 text-xs font-bold text-neutral-800 pb-1.5 border-b border-neutral-200/65">
                                  <span className="text-neutral-400 font-mono text-[14px] font-bold shrink-0">
                                    -
                                  </span>
                                  <span>역할 및 총괄 내용 (Primary Role)</span>
                                </div>
                                <div className="space-y-3 p-3.5 bg-white rounded-[8px] border border-neutral-200 shadow-4xs">
                                  <div className="w-full sm:w-2/3">
                                    <span className="text-[10px] font-bold font-mono text-neutral-500 pl-1 uppercase">
                                      역할 대표명 (예: 티켓 총괄 운영)
                                    </span>
                                    <input
                                      type="text"
                                      value={project.role?.title || ""}
                                      onChange={(e) => {
                                        const role = {
                                          ...(project.role || {}),
                                          title: e.target.value,
                                        };
                                        handleArrayChange(
                                          "featuredProjects",
                                          idx,
                                          "role",
                                          role,
                                        );
                                      }}
                                      className="w-full bg-white border border-neutral-300 rounded px-2.5 py-1.5 text-xs font-bold text-neutral-900 focus:outline-none focus:border-neutral-400"
                                    />
                                  </div>

                                  <div className="space-y-1.5 pt-2">
                                    <div className="flex justify-between items-center text-[10px] font-bold font-mono text-neutral-500">
                                      <span>수행 역할 목록</span>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const roleItems = [
                                            ...(project.role?.items || []),
                                            "",
                                          ];
                                          const role = {
                                            ...(project.role || {}),
                                            items: roleItems,
                                          };
                                          handleArrayChange(
                                            "featuredProjects",
                                            idx,
                                            "role",
                                            role,
                                          );
                                        }}
                                        className="text-neutral-700 hover:text-black hover:underline text-[10px] font-extrabold"
                                      >
                                        + 역할사항 추가
                                      </button>
                                    </div>
                                    {(project.role?.items || []).map(
                                      (roleBullet: string, rIdx: number) => (
                                        <div
                                          key={rIdx}
                                          className="flex items-center gap-2 animate-fadeIn"
                                        >
                                          <span className="text-rose-500 text-xs font-bold">
                                            •
                                          </span>
                                          <input
                                            type="text"
                                            value={roleBullet}
                                            onChange={(e) => {
                                              const roleItems = [
                                                ...(project.role?.items || []),
                                              ];
                                              roleItems[rIdx] = e.target.value;
                                              const role = {
                                                ...(project.role || {}),
                                                items: roleItems,
                                              };
                                              handleArrayChange(
                                                "featuredProjects",
                                                idx,
                                                "role",
                                                role,
                                              );
                                            }}
                                            className="w-full bg-white border border-neutral-300 rounded px-2.5 py-1 text-xs text-neutral-800 focus:outline-none focus:border-neutral-400 font-sans font-medium"
                                          />
                                          <button
                                            type="button"
                                            onClick={() => {
                                              const roleItems = [
                                                ...(project.role?.items || []),
                                              ];
                                              roleItems.splice(rIdx, 1);
                                              const role = {
                                                ...(project.role || {}),
                                                items: roleItems,
                                              };
                                              handleArrayChange(
                                                "featuredProjects",
                                                idx,
                                                "role",
                                                role,
                                              );
                                            }}
                                            className="text-neutral-400 hover:text-red-500 font-bold transition-all text-sm shrink-0 pl-1"
                                          >
                                            ×
                                          </button>
                                        </div>
                                      ),
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Performance Achievements (수행 성과) */}
                              <div className="p-4.5 border border-neutral-200 bg-neutral-50/50 rounded-[12px] space-y-3.5">
                                <div className="flex justify-between items-center pb-1.5 border-b border-neutral-200/65">
                                  <div className="flex items-center gap-2 text-xs font-bold text-neutral-800">
                                    <span className="text-[#E0115F] font-mono text-xs font-bold shrink-0">
                                      ✓
                                    </span>
                                    <span>
                                      수행 성과 대항목 (Results & Achievements)
                                    </span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updated = [
                                        ...(project.results || []),
                                        "",
                                      ];
                                      handleArrayChange(
                                        "featuredProjects",
                                        idx,
                                        "results",
                                        updated,
                                      );
                                    }}
                                    className="text-xs text-rose-600 hover:text-rose-700 font-bold hover:underline flex items-center gap-0.5"
                                  >
                                    <Plus size={11} /> 성과 항목 추가
                                  </button>
                                </div>
                                <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
                                  {(project.results || []).map(
                                    (resBullet: string, rIdx: number) => (
                                      <div
                                        key={rIdx}
                                        className="flex items-center gap-2 animate-fadeIn"
                                      >
                                        <span className="text-[#E0115F] font-mono text-xs font-black">
                                          ✓
                                        </span>
                                        <input
                                          type="text"
                                          value={resBullet}
                                          onChange={(e) => {
                                            const updated = [
                                              ...(project.results || []),
                                            ];
                                            updated[rIdx] = e.target.value;
                                            handleArrayChange(
                                              "featuredProjects",
                                              idx,
                                              "results",
                                              updated,
                                            );
                                          }}
                                          className="w-full bg-white border border-neutral-300 rounded px-2.5 py-1.5 text-xs text-neutral-850 font-sans font-medium focus:outline-none focus:border-neutral-400"
                                        />
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const updated = [
                                              ...(project.results || []),
                                            ];
                                            updated.splice(rIdx, 1);
                                            handleArrayChange(
                                              "featuredProjects",
                                              idx,
                                              "results",
                                              updated,
                                            );
                                          }}
                                          className="text-neutral-400 hover:text-red-500 font-bold pl-1"
                                        >
                                          ×
                                        </button>
                                      </div>
                                    ),
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        },
                      )}
                    </div>
                  </div>
                )}

                {projectSubTab === "personal" && (
                  <div className="space-y-8 animate-fadeIn">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-xl font-bold tracking-tight mb-1 text-neutral-900">
                          프로젝트 II (기획 목록)
                        </h2>
                        <p className="text-xs text-neutral-500">
                          이그린(Lee Green) 인디음악 앨범 발매 크라우드 펀딩,
                          루프탑 및 콜라보 콘서트 관련 프로젝트입니다.
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        {renderSaveButton("personal_projects")}
                        <button
                          onClick={() =>
                            handleArrayAdd("personalProjects", {
                              title: "새 개인 아트 워크숍",
                              category: "Concert",
                              year: "2023",
                              image:
                                "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b",
                              contribution: "70%",
                              location: "KT&G 상상마당",
                              support: "자체 제작",
                              cast: "이그린",
                              description: "새 수록 앨범 및 특별 콘서트 런칭",
                              fullDescription:
                                "상세 모달 내부에서 지원하는 설명 데이터입니다.",
                              images: [],
                              role: { title: "담당 업무", items: [] },
                              results: [],
                            })
                          }
                          className="px-3 py-1.5 bg-neutral-100 text-neutral-800 border border-neutral-300 text-xs rounded-sm hover:bg-neutral-200 font-semibold transition-all"
                        >
                          + 새 창작기획 추가
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {(formData.personalProjects || []).map(
                        (project: any, idx: number) => (
                          <div
                            key={idx}
                            className="p-4 border border-neutral-200 bg-neutral-50/30 rounded-sm space-y-4 shadow-3xs"
                          >
                            <div className="flex justify-between items-center border-b border-neutral-200/80 pb-3">
                              <div className="flex items-center gap-4 text-xs font-mono">
                                <span className="bg-neutral-100 text-neutral-800 border border-neutral-200 px-2 py-0.5 rounded uppercase font-bold text-[10px]">
                                  #{idx + 1}
                                </span>
                                <span className="text-neutral-500 font-semibold text-[11px]">
                                  개인 창작 앨범 및 디자인 기획
                                </span>
                              </div>
                              <button
                                onClick={() =>
                                  handleArrayDelete("personalProjects", idx)
                                }
                                className="text-neutral-400 hover:text-red-500 transition-all font-mono text-xs flex items-center gap-1 font-semibold hover:underline"
                              >
                                <Trash2 size={13} /> 제거
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <span className="text-[10px] font-mono text-neutral-500 uppercase font-semibold">
                                  창작 프로젝트명/앨범명
                                </span>
                                <input
                                  type="text"
                                  value={project.title || ""}
                                  onChange={(e) =>
                                    handleArrayChange(
                                      "personalProjects",
                                      idx,
                                      "title",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full bg-white border border-neutral-205 rounded px-3 py-2 text-xs font-bold text-neutral-900 focus:outline-none focus:border-neutral-400 font-sans"
                                />
                              </div>
                              <div className="space-y-1">
                                <span className="text-[10px] font-mono text-neutral-500 uppercase font-semibold">
                                  발표 연도
                                </span>
                                <input
                                  type="text"
                                  value={project.year || ""}
                                  onChange={(e) =>
                                    handleArrayChange(
                                      "personalProjects",
                                      idx,
                                      "year",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full bg-white border border-neutral-205 rounded px-3 py-2 text-xs font-mono text-neutral-850 focus:outline-none focus:border-neutral-400"
                                />
                              </div>
                              <div className="space-y-1">
                                <span className="text-[10px] font-mono text-neutral-500 uppercase font-semibold">
                                  음악/디자인 카테고리 (Category)
                                </span>
                                <input
                                  type="text"
                                  value={project.category || ""}
                                  onChange={(e) =>
                                    handleArrayChange(
                                      "personalProjects",
                                      idx,
                                      "category",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full bg-white border border-neutral-205 rounded px-3 py-2 text-xs text-neutral-850 focus:outline-none focus:border-neutral-400 font-sans"
                                />
                              </div>
                              <div className="space-y-1">
                                <span className="text-[10px] font-mono text-neutral-500 uppercase font-semibold">
                                  개인 지분 기여도 (%)
                                </span>
                                <input
                                  type="text"
                                  value={project.contribution || ""}
                                  onChange={(e) =>
                                    handleArrayChange(
                                      "personalProjects",
                                      idx,
                                      "contribution",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full bg-white border border-neutral-205 rounded px-3 py-2 text-xs font-mono text-neutral-850 focus:outline-none focus:border-neutral-400"
                                />
                              </div>
                              <div className="space-y-1">
                                <span className="text-[10px] font-mono text-neutral-500 uppercase font-semibold">
                                  개최 및 판매장소 (Location)
                                </span>
                                <input
                                  type="text"
                                  value={project.location || ""}
                                  onChange={(e) =>
                                    handleArrayChange(
                                      "personalProjects",
                                      idx,
                                      "location",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full bg-white border border-neutral-205 rounded px-3 py-2 text-xs text-neutral-850 focus:outline-none focus:border-neutral-400 font-sans"
                                />
                              </div>
                              <div className="space-y-1">
                                <span className="text-[10px] font-mono text-neutral-500 uppercase font-semibold">
                                  아티스트 라인업 (Cast)
                                </span>
                                <input
                                  type="text"
                                  value={project.cast || ""}
                                  onChange={(e) =>
                                    handleArrayChange(
                                      "personalProjects",
                                      idx,
                                      "cast",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full bg-white border border-neutral-205 rounded px-3 py-2 text-xs text-neutral-850 focus:outline-none focus:border-neutral-400 font-sans"
                                />
                              </div>
                              <div className="space-y-1 md:col-span-2">
                                <span className="text-[10px] font-mono text-neutral-500 uppercase font-semibold">
                                  매체 크라우드펀딩/후원 (Support)
                                </span>
                                <input
                                  type="text"
                                  value={project.support || ""}
                                  onChange={(e) =>
                                    handleArrayChange(
                                      "personalProjects",
                                      idx,
                                      "support",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="예: 텀블벅 크라우드 펀딩 프로젝트"
                                  className="w-full bg-white border border-neutral-205 rounded px-3 py-2 text-xs text-neutral-850 focus:outline-none focus:border-neutral-400 font-sans"
                                />
                              </div>
                              <div className="space-y-2 md:col-span-2">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-1.5">
                                  <span className="text-[10px] font-mono text-neutral-500 uppercase font-semibold">
                                    대표 커버 이미지 아카이브 (다중 이미지 지원)
                                  </span>
                                  <label className="cursor-pointer px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 text-white rounded-md text-[11px] font-semibold inline-flex items-center gap-1.5 transition-all active:scale-95 shadow-3xs user-select-none">
                                    <Upload size={11} />
                                    <span>이미지 다중 추가</span>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      multiple
                                      className="hidden"
                                      onChange={(e) => {
                                        if (
                                          e.target.files &&
                                          e.target.files.length > 0
                                        ) {
                                          handleProjectMultipleImagesUpload(
                                            e.target.files,
                                            "personalProjects",
                                            idx,
                                          );
                                        }
                                      }}
                                    />
                                  </label>
                                </div>

                                {projectUploadStatus[
                                  `personalProjects-${idx}-multi`
                                ] && (
                                  <p className="text-[10px] font-mono text-rose-600 animate-pulse bg-rose-50 px-2 py-1 rounded border border-rose-100 inline-block font-sans">
                                    {
                                      projectUploadStatus[
                                        `personalProjects-${idx}-multi`
                                      ]
                                    }
                                  </p>
                                )}

                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 pt-1">
                                  {(
                                    project.representativeImages ||
                                    (project.image ? [project.image] : [])
                                  ).map((imgUrl: string, imgIdx: number) => {
                                    const isCover = imgIdx === 0;
                                    return (
                                      <div
                                        key={imgIdx}
                                        className={`relative bg-neutral-50 p-1.5 rounded-lg border flex flex-col justify-between group/rep-img ${isCover ? "border-neutral-900 shadow-sm bg-neutral-100/50" : "border-neutral-200"}`}
                                      >
                                        <div className="aspect-[4/3] w-full rounded-sm overflow-hidden bg-neutral-100 relative">
                                          <img
                                            src={imgUrl}
                                            alt={`rep-${imgIdx}`}
                                            className="w-full h-full object-cover"
                                            referrerPolicy="no-referrer"
                                          />

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
                                                  const current = [
                                                    ...(project.representativeImages ||
                                                      (project.image
                                                        ? [project.image]
                                                        : [])),
                                                  ];
                                                  const item = current[imgIdx];
                                                  current.splice(imgIdx, 1);
                                                  current.unshift(item);

                                                  const sectionData = [
                                                    ...(formData.personalProjects ||
                                                      []),
                                                  ];
                                                  sectionData[idx] = {
                                                    ...sectionData[idx],
                                                    representativeImages:
                                                      current,
                                                    image: current[0] || "",
                                                  };
                                                  setFormData((prev: any) => ({
                                                    ...prev,
                                                    personalProjects:
                                                      sectionData,
                                                  }));
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
                                              const current = [
                                                ...(project.representativeImages ||
                                                  (project.image
                                                    ? [project.image]
                                                    : [])),
                                              ];
                                              current.splice(imgIdx, 1);

                                              const sectionData = [
                                                ...(formData.personalProjects ||
                                                  []),
                                              ];
                                              sectionData[idx] = {
                                                ...sectionData[idx],
                                                representativeImages: current,
                                                image: current[0] || "",
                                              };
                                              setFormData((prev: any) => ({
                                                ...prev,
                                                personalProjects: sectionData,
                                              }));
                                            }}
                                            className="px-1.5 py-0.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded transition-colors text-[9px] font-bold font-sans"
                                          >
                                            제거
                                          </button>
                                        </div>
                                      </div>
                                    );
                                  })}

                                  {(
                                    project.representativeImages ||
                                    (project.image ? [project.image] : [])
                                  ).length === 0 && (
                                    <div className="col-span-full py-8 text-center border border-dashed border-neutral-200 rounded-lg bg-neutral-50/50 flex flex-col justify-center items-center gap-1.5 text-neutral-400 font-sans">
                                      <ImageIcon
                                        size={20}
                                        className="stroke-1.5 text-neutral-350"
                                      />
                                      <span className="text-[11px]">
                                        지정된 대표이미지가 없습니다. 상단
                                        '이미지 다중 추가'를 눌러 등록해 주세요.
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-neutral-200">
                              <div className="space-y-1">
                                <span className="text-[10px] font-mono text-neutral-500 font-semibold text-neutral-550">
                                  간단 기획 설명 (About / Main List 카드용)
                                </span>
                                <input
                                  type="text"
                                  value={project.description || ""}
                                  onChange={(e) =>
                                    handleArrayChange(
                                      "personalProjects",
                                      idx,
                                      "description",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full bg-white border border-neutral-205 rounded px-3 py-2 text-xs text-neutral-850 focus:outline-none focus:border-neutral-400 font-sans"
                                />
                              </div>
                              <div className="space-y-1">
                                <span className="text-[10px] font-mono text-neutral-500 font-semibold text-neutral-550">
                                  긴 상세 설명 (상세 모달 내부)
                                </span>
                                <textarea
                                  value={project.fullDescription || ""}
                                  onChange={(e) =>
                                    handleArrayChange(
                                      "personalProjects",
                                      idx,
                                      "fullDescription",
                                      e.target.value,
                                    )
                                  }
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
                                    서브 슬라이드 이미지 목록 (Sub Images
                                    Carousel Block)
                                  </span>
                                  <span className="text-[10px] text-neutral-500 font-sans block">
                                    작품 상세 모달 및 슬라이드 쇼에 출력될 보조
                                    사진들을 업로드하여 구성합니다.
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
                                        if (
                                          e.target.files &&
                                          e.target.files.length > 0
                                        ) {
                                          const files = e.target.files;
                                          const key = `personalProjects-${idx}-sub-multi`;
                                          setProjectUploadStatus((prev) => ({
                                            ...prev,
                                            [key]: `0/${files.length} 추가 중...`,
                                          }));
                                          const uploadedUrls: string[] = [];
                                          for (
                                            let i = 0;
                                            i < files.length;
                                            i++
                                          ) {
                                            const file = files[i];
                                            try {
                                              setProjectUploadStatus(
                                                (prev) => ({
                                                  ...prev,
                                                  [key]: `${i + 1}/${files.length} 추가 중...`,
                                                }),
                                              );
                                              const base64Content =
                                                await new Promise<string>(
                                                  (resolve, reject) => {
                                                    const r = new FileReader();
                                                    r.onload = () =>
                                                      resolve(
                                                        r.result as string,
                                                      );
                                                    r.onerror = reject;
                                                    r.readAsDataURL(file);
                                                  },
                                                );
                                              const res = await fetch(
                                                "/api/upload",
                                                {
                                                  method: "POST",
                                                  headers: {
                                                    "Content-Type":
                                                      "application/json",
                                                  },
                                                  body: JSON.stringify({
                                                    fileName: file.name,
                                                    fileContent: base64Content,
                                                  }),
                                                },
                                              );
                                              if (res.ok) {
                                                const data = await res.json();
                                                uploadedUrls.push(data.url);
                                              }
                                            } catch (err) {
                                              console.error(
                                                "Error uploading: ",
                                                file.name,
                                                err,
                                              );
                                            }
                                          }
                                          if (uploadedUrls.length > 0) {
                                            const current = [
                                              ...(project.images || []),
                                            ];
                                            const updated = [
                                              ...current,
                                              ...uploadedUrls,
                                            ];
                                            handleArrayChange(
                                              "personalProjects",
                                              idx,
                                              "images",
                                              updated,
                                            );
                                            setProjectUploadStatus((prev) => ({
                                              ...prev,
                                              [key]: "성공적으로 추가됨!",
                                            }));
                                          } else {
                                            setProjectUploadStatus((prev) => ({
                                              ...prev,
                                              [key]: "업로드 실패",
                                            }));
                                          }
                                          setTimeout(() => {
                                            setProjectUploadStatus((prev) => {
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

                              {projectUploadStatus[
                                `personalProjects-${idx}-sub-multi`
                              ] && (
                                <div className="text-[10px] font-mono text-neutral-600 animate-pulse bg-neutral-100/80 px-2 py-1 rounded inline-block">
                                  {
                                    projectUploadStatus[
                                      `personalProjects-${idx}-sub-multi`
                                    ]
                                  }
                                </div>
                              )}

                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 pt-1">
                                {(project.images || []).map(
                                  (imgUrl: string, iIdx: number) => (
                                    <div
                                      key={iIdx}
                                      className="relative group bg-neutral-50 p-2 rounded-lg border border-neutral-200 hover:border-neutral-400 transition-all flex flex-col justify-between shadow-3xs"
                                    >
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
                                            <ImageIcon
                                              size={18}
                                              className="mb-1 opacity-60"
                                            />
                                            <span className="text-[9px] font-sans">
                                              이미지 없음
                                            </span>
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
                                                  const updated = [
                                                    ...(project.images || []),
                                                  ];
                                                  const temp = updated[iIdx];
                                                  updated[iIdx] =
                                                    updated[iIdx - 1];
                                                  updated[iIdx - 1] = temp;
                                                  handleArrayChange(
                                                    "personalProjects",
                                                    idx,
                                                    "images",
                                                    updated,
                                                  );
                                                }}
                                                className="px-1 py-0.5 bg-white hover:bg-neutral-100 text-neutral-700 hover:text-black rounded border border-neutral-200 text-[8px] font-bold"
                                                title="왼쪽으로 이동"
                                              >
                                                ◀
                                              </button>
                                            )}
                                            {/* Move right */}
                                            {iIdx <
                                              (project.images || []).length -
                                                1 && (
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  const updated = [
                                                    ...(project.images || []),
                                                  ];
                                                  const temp = updated[iIdx];
                                                  updated[iIdx] =
                                                    updated[iIdx + 1];
                                                  updated[iIdx + 1] = temp;
                                                  handleArrayChange(
                                                    "personalProjects",
                                                    idx,
                                                    "images",
                                                    updated,
                                                  );
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
                                                  if (
                                                    e.target.files &&
                                                    e.target.files[0]
                                                  ) {
                                                    const file =
                                                      e.target.files[0];
                                                    const key = `personalProjects-${idx}-sub-${iIdx}`;
                                                    setProjectUploadStatus(
                                                      (prev) => ({
                                                        ...prev,
                                                        [key]: "업로드 중...",
                                                      }),
                                                    );
                                                    try {
                                                      const base64Content =
                                                        await new Promise<string>(
                                                          (resolve, reject) => {
                                                            const r =
                                                              new FileReader();
                                                            r.onload = () =>
                                                              resolve(
                                                                r.result as string,
                                                              );
                                                            r.onerror = reject;
                                                            r.readAsDataURL(
                                                              file,
                                                            );
                                                          },
                                                        );
                                                      const res = await fetch(
                                                        "/api/upload",
                                                        {
                                                          method: "POST",
                                                          headers: {
                                                            "Content-Type":
                                                              "application/json",
                                                          },
                                                          body: JSON.stringify({
                                                            fileName: file.name,
                                                            fileContent:
                                                              base64Content,
                                                          }),
                                                        },
                                                      );
                                                      if (res.ok) {
                                                        const data =
                                                          await res.json();
                                                        const updated = [
                                                          ...(project.images ||
                                                            []),
                                                        ];
                                                        updated[iIdx] =
                                                          data.url;
                                                        handleArrayChange(
                                                          "personalProjects",
                                                          idx,
                                                          "images",
                                                          updated,
                                                        );
                                                        setProjectUploadStatus(
                                                          (prev) => ({
                                                            ...prev,
                                                            [key]: "완료",
                                                          }),
                                                        );
                                                      } else {
                                                        setProjectUploadStatus(
                                                          (prev) => ({
                                                            ...prev,
                                                            [key]: "실패",
                                                          }),
                                                        );
                                                      }
                                                    } catch (err) {
                                                      setProjectUploadStatus(
                                                        (prev) => ({
                                                          ...prev,
                                                          [key]: "에러",
                                                        }),
                                                      );
                                                    }
                                                    setTimeout(() => {
                                                      setProjectUploadStatus(
                                                        (prev) => {
                                                          const next = {
                                                            ...prev,
                                                          };
                                                          delete next[key];
                                                          return next;
                                                        },
                                                      );
                                                    }, 2000);
                                                  }
                                                }}
                                              />
                                            </label>

                                            {/* Remove button */}
                                            <button
                                              type="button"
                                              onClick={() => {
                                                const updated = [
                                                  ...(project.images || []),
                                                ];
                                                updated.splice(iIdx, 1);
                                                handleArrayChange(
                                                  "personalProjects",
                                                  idx,
                                                  "images",
                                                  updated,
                                                );
                                              }}
                                              className="px-1.5 py-0.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded text-[9px] font-bold"
                                            >
                                              제거
                                            </button>
                                          </div>
                                        </div>
                                        {projectUploadStatus[
                                          `personalProjects-${idx}-sub-${iIdx}`
                                        ] && (
                                          <span className="text-[8px] font-mono text-rose-600 block leading-none pt-0.5 text-center">
                                            {
                                              projectUploadStatus[
                                                `personalProjects-${idx}-sub-${iIdx}`
                                              ]
                                            }
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  ),
                                )}
                                {(project.images || []).length === 0 && (
                                  <div className="col-span-full py-10 text-center border border-dashed border-neutral-200 rounded-lg bg-neutral-50/50 flex flex-col justify-center items-center gap-1.5 text-neutral-400 font-sans">
                                    <ImageIcon
                                      size={20}
                                      className="stroke-1.5 text-neutral-350"
                                    />
                                    <span className="text-[11px] font-medium text-neutral-500">
                                      슬라이드 사진이 지정되지 않았습니다.
                                    </span>
                                    <span className="text-[9px] text-neutral-400">
                                      상단의 '사진 다중 추가' 버튼으로 로컬
                                      파일을 업로드하거나 '직접 링크 추가'를
                                      누르세요.
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Role subform */}
                            <div className="space-y-3 border-t border-neutral-200 pt-4">
                              <span className="text-[10px] font-mono text-neutral-550 block uppercase font-semibold">
                                역할 및 크레딧 (Primary Role)
                              </span>
                              <div className="space-y-2 p-3 bg-white rounded border border-neutral-200 shadow-3xs">
                                <div className="w-1/2">
                                  <span className="text-[8px] font-mono text-neutral-500 font-semibold">
                                    역할 대표명 (예: 담당 업무)
                                  </span>
                                  <input
                                    type="text"
                                    value={project.role?.title || ""}
                                    onChange={(e) => {
                                      const role = {
                                        ...(project.role || {}),
                                        title: e.target.value,
                                      };
                                      handleArrayChange(
                                        "personalProjects",
                                        idx,
                                        "role",
                                        role,
                                      );
                                    }}
                                    className="w-full bg-white border border-neutral-205 rounded px-2 py-1 text-xs font-bold text-neutral-900 focus:outline-none focus:border-neutral-400 font-sans"
                                  />
                                </div>

                                <div className="space-y-1.5 pt-2">
                                  <div className="flex justify-between items-center text-[8px] font-mono text-neutral-500">
                                    <span>세부 역할 기여항목</span>
                                    <button
                                      onClick={() => {
                                        const roleItems = [
                                          ...(project.role?.items || []),
                                          "",
                                        ];
                                        const role = {
                                          ...(project.role || {}),
                                          items: roleItems,
                                        };
                                        handleArrayChange(
                                          "personalProjects",
                                          idx,
                                          "role",
                                          role,
                                        );
                                      }}
                                      className="text-neutral-700 hover:text-black hover:underline"
                                    >
                                      + 항목 상세 추가
                                    </button>
                                  </div>
                                  {(project.role?.items || []).map(
                                    (roleBullet: string, rIdx: number) => (
                                      <div
                                        key={rIdx}
                                        className="flex items-center gap-2"
                                      >
                                        <span className="text-neutral-400 text-xs font-bold">
                                          •
                                        </span>
                                        <input
                                          type="text"
                                          value={roleBullet}
                                          onChange={(e) => {
                                            const roleItems = [
                                              ...(project.role?.items || []),
                                            ];
                                            roleItems[rIdx] = e.target.value;
                                            const role = {
                                              ...(project.role || {}),
                                              items: roleItems,
                                            };
                                            handleArrayChange(
                                              "personalProjects",
                                              idx,
                                              "role",
                                              role,
                                            );
                                          }}
                                          className="w-full bg-white border border-neutral-205 rounded px-2 py-1 text-xs text-neutral-850 focus:outline-none focus:border-neutral-400 font-sans"
                                        />
                                        <button
                                          onClick={() => {
                                            const roleItems = [
                                              ...(project.role?.items || []),
                                            ];
                                            roleItems.splice(rIdx, 1);
                                            const role = {
                                              ...(project.role || {}),
                                              items: roleItems,
                                            };
                                            handleArrayChange(
                                              "personalProjects",
                                              idx,
                                              "role",
                                              role,
                                            );
                                          }}
                                          className="text-neutral-400 hover:text-red-500 font-bold shrink-0 text-sm"
                                        >
                                          ×
                                        </button>
                                      </div>
                                    ),
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Performance Achievements (수행 성과) */}
                            <div className="space-y-2 border-t border-neutral-200 pt-4">
                              <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500">
                                <span>
                                  지표 결과 및 달성 기여 (Results &
                                  Achievements)
                                </span>
                                <button
                                  onClick={() => {
                                    const updated = [
                                      ...(project.results || []),
                                      "",
                                    ];
                                    handleArrayChange(
                                      "personalProjects",
                                      idx,
                                      "results",
                                      updated,
                                    );
                                  }}
                                  className="text-neutral-700 hover:text-black hover:underline"
                                >
                                  + 성과 항목 추가
                                </button>
                              </div>
                              <div className="space-y-2">
                                {(project.results || []).map(
                                  (resBullet: string, rIdx: number) => (
                                    <div
                                      key={rIdx}
                                      className="flex items-center gap-2"
                                    >
                                      <span className="text-neutral-400 font-mono text-xs">
                                        ✓
                                      </span>
                                      <input
                                        type="text"
                                        value={resBullet}
                                        onChange={(e) => {
                                          const updated = [
                                            ...(project.results || []),
                                          ];
                                          updated[rIdx] = e.target.value;
                                          handleArrayChange(
                                            "personalProjects",
                                            idx,
                                            "results",
                                            updated,
                                          );
                                        }}
                                        className="w-full bg-white border border-neutral-205 rounded px-2 py-1.5 text-xs text-neutral-800 font-sans focus:outline-none focus:border-neutral-400"
                                      />
                                      <button
                                        onClick={() => {
                                          const updated = [
                                            ...(project.results || []),
                                          ];
                                          updated.splice(rIdx, 1);
                                          handleArrayChange(
                                            "personalProjects",
                                            idx,
                                            "results",
                                            updated,
                                          );
                                        }}
                                        className="text-neutral-400 hover:text-red-500 font-bold"
                                      >
                                        ×
                                      </button>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: MEDIA ASSETS UPLOAD DECK */}
            {activeTab === "media" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold tracking-tight mb-1 text-neutral-900 flex items-center gap-2 flex-wrap">
                    드래그 앤 드롭 미디어 업로더 (Media Uplink Deck)
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-sans font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      실시간 즉시 영구 저장됨 (저장 버튼 불필요)
                    </span>
                  </h2>
                  <p className="text-xs text-neutral-500">
                    깃허브에 번거롭게 이미지를 올리지 마세요! 로컬 컴퓨터의
                    사진이나 가이드 자료를 드래그하거나 선택하여 업로드하는
                    순간,{" "}
                    <strong className="text-neutral-800">
                      서버의 영구 저장소(/data/uploads)에 안전하게 즉각 저장
                    </strong>
                    되어 라이브 URL이 생성됩니다.{" "}
                    <strong>
                      별도의 저장 버튼을 누르실 필요가 없습니다! 😊
                    </strong>
                  </p>
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
                    multiple
                    onChange={(e) =>
                      e.target.files &&
                      handleMultipleFilesUpload(e.target.files)
                    }
                    className="hidden"
                  />

                  <div className="w-14 h-14 bg-neutral-100 rounded-full flex items-center justify-center mx-auto group-hover/drop:scale-105 transition-transform border border-neutral-200">
                    <Upload
                      className="text-neutral-500 group-hover/drop:text-neutral-950 transition-colors animate-bounce"
                      size={22}
                    />
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-bold text-neutral-800">
                      여기에 파일을 드래그하여 옮겨놓거나 클릭하여 찾아보기
                    </p>
                    <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest font-semibold">
                      Supports PNG, JPG, JPEG, GIF, PDF
                    </p>
                  </div>

                  {uploadStatus && (
                    <div className="text-xs text-neutral-600 font-bold font-mono pl-2 animate-pulse">
                      STATUS: {uploadStatus}
                    </div>
                  )}
                </div>

                {/* Uplink tables lists */}
                <div className="space-y-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                    업로드 완료된 자산 라이브러리 목록 (Assets List)
                  </h3>

                  <div className="space-y-2.5">
                    {uploadedFiles.map((file, idx) => (
                      <div
                        key={idx}
                        className="p-4 border border-neutral-200 bg-neutral-50/30 rounded-sm flex items-center justify-between gap-4 shadow-3xs"
                      >
                        <div className="flex items-center gap-3">
                          <ImageIcon
                            className="text-neutral-500 shrink-0"
                            size={18}
                          />
                          <div>
                            <p className="text-xs font-bold leading-none mb-1 text-neutral-800 font-mono">
                              {file.name}
                            </p>
                            <p className="text-[10px] text-neutral-450 font-mono break-all">
                              {file.url}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <img
                            src={file.url}
                            alt="thumbnail"
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 object-cover border border-neutral-200 rounded"
                          />
                          <button
                            onClick={() => copyUrl(file.url, idx)}
                            className="p-2 border border-neutral-300 hover:border-neutral-500 rounded bg-white text-neutral-600 hover:text-black transition-all outline-none focus:ring-0 shadow-3xs"
                            title="이미지 주소 복사"
                          >
                            {copiedIndex === idx ? (
                              <Check
                                className="text-emerald-600 animate-scale"
                                size={14}
                              />
                            ) : (
                              <Copy size={13} />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}

                    {uploadedFiles.length === 0 && (
                      <div className="py-20 text-center border border-neutral-200 bg-neutral-50/50 rounded-sm">
                        <p className="text-xs text-neutral-400 font-mono italic">
                          라이브러리가 비어 있습니다. 사진을 올려 주소를
                          빌드하세요.
                        </p>
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
