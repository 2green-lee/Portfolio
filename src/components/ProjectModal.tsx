import React, { useState, useEffect, useRef } from "react";
import BookMockup1 from "../../img/Greenery_Album Book_Mockup_1.png";
import BookMockup2 from "../../img/Greenery_Album Book_Mockup_2.png";
import BookMockup3 from "../../img/Greenery_Album Book_Mockup_3.png";
import BookMockup4 from "../../img/Greenery_Album Book_Mockup_4.png";
import { motion, AnimatePresence } from "framer-motion";
import {
  DEFAULT_PORTFOLIO_DATA,
  PortfolioData,
  DEFAULT_FESTIVAL_TICKET,
  DEFAULT_FESTIVAL_FNB,
  DEFAULT_FESTIVAL_STORAGE,
} from "../default_data";
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

import { LightboxOverlay } from "./LightboxOverlay";


import { COUNTRY_LIST, FLOWER_PLANET_CONTENT_1_IMAGES, FLOWER_PLANET_CONTENT_2_IMAGES, Project, SECTIONS, FESTIVAL_POSTERS, MUSICAL_POSTERS, CONCERT_POSTERS, CREATIVE_CONCERT_POSTERS, MIXED_POSTERS, formatCategory, AutoFitTitle, convertGithubUrl, getEndDateFromPeriod, OptimizedImage, ModalCarousel, staggerItem, ProjectCard } from "../types_constants";

export const ProjectModal: React.FC<{
  project: Project | null;
  onClose: () => void;
}> = ({ project, onClose }) => {
  const [slidePage, setSlidePage] = useState(1);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxImages, setLightboxImages] = useState<string[] | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

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
      // 사진 확대 팝업이 열려있을 경우, 메인 모달의 단축키(좌우/ESC) 동작을 중지합니다.
      if (lightboxImages || lightboxImage) {
        // 단일 이미지 팝업 상태일 때 ESC 누르면 단일 이미지 팝업만 닫기
        if (lightboxImage && e.key === "Escape") {
          setLightboxImage(null);
        }
        return;
      }

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
  }, [project, onClose, maxPages, lightboxImages, lightboxImage]);

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
                                EP [GREENERY] 발매와 함께 기획·제작한 북 형태의 피지컬 음반입니다.
                              </p>
                              <p>
                                단순한 소장품으로 소비되기 쉬운 기존 플라스틱 CD 패키지의 한계를 보완하고, 음악과 시각적 경험을 하나의 매체로 확장하고자 기획했습니다.
                                <br />
                                아티스트 스토리와 가사를 한 권에 담아 음악에 담긴 의도와 세계관을 한 권의 책으로 구현했습니다.
                              </p>
                            </div>

                            {/* Images Grid for Content 1 */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-1">
                              {[
                                BookMockup1,
                                BookMockup2,
                                BookMockup3,
                                BookMockup4,
                              ].map((img, i) => (
                                <div
                                  key={i}
                                  onClick={() => {
                                    setLightboxImages([
                                      BookMockup1,
                                      BookMockup2,
                                      BookMockup3,
                                      BookMockup4,
                                    ]);
                                    setLightboxIndex(i);
                                  }}
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
                              ].map((img, i, arr) => (
                                <div
                                  key={i}
                                  onClick={() => { setLightboxImages(arr); setLightboxIndex(i); }}
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
                                  (img, i, arr) => (
                                    <div
                                      key={i}
                                      onClick={() => { setLightboxImages(arr); setLightboxIndex(i); }}
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
                                  (img, i, arr) => (
                                    <div
                                      key={i}
                                      onClick={() => { setLightboxImages(arr); setLightboxIndex(i); }}
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
                                  {project.images.slice(0, 4).map((img, i, arr) => (
                                    <div
                                      key={i}
                                      onClick={() => { setLightboxImages(arr); setLightboxIndex(i); }}
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
                                  {project.images.slice(4, 8).map((img, i, arr) => (
                                    <div
                                      key={i}
                                      onClick={() => { setLightboxImages(arr); setLightboxIndex(i); }}
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
                                      onClick={() => { setLightboxImages(project.images || []); setLightboxIndex(project.images?.indexOf(img) || 0); }}
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
                                      onClick={() => { setLightboxImages(project.images || []); setLightboxIndex(project.images?.indexOf(img) || 0); }}
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
                                      onClick={() => { setLightboxImages(project.images || []); setLightboxIndex(project.images?.indexOf(img) || 0); }}
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
                                      onClick={() => { setLightboxImages(project.images || []); setLightboxIndex(project.images?.indexOf(img) || 0); }}
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
          <LightboxOverlay
            image={lightboxImage}
            images={lightboxImages}
            initialIndex={lightboxIndex}
            onClose={() => {
              setLightboxImage(null);
              setLightboxImages(null);
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
};

export const ActivityModal: React.FC<{
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
                      <img loading="lazy" src={convertGithubUrl(img)}
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
                            <img loading="lazy" src={art.thumbnail}
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
                  <img loading="lazy" src={lightboxImage}
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

export const roundTranslate = (_: any, generated: string) => {
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


