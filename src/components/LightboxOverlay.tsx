import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface LightboxOverlayProps {
  images?: string[] | null;
  image?: string | null;
  initialIndex?: number;
  onClose: () => void;
}

export const LightboxOverlay: React.FC<LightboxOverlayProps> = ({
  images,
  image,
  initialIndex = 0,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // images나 initialIndex가 바뀔 때 초기화 (팝업이 열릴 때)
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, images, image]);

  // 키보드 방향키 이벤트 핸들링 (팝업 내부에서만 상태 변경)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC 처리는 부모(ProjectModal)에서도 하지만, 여기서도 닫기 호출
      if (e.key === "Escape") {
        onClose();
      }
      if (images && images.length > 1) {
        if (e.key === "ArrowLeft") {
          setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
        } else if (e.key === "ArrowRight") {
          setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images, onClose]);

  // 1. 단일 이미지 렌더링
  if (image) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-neutral-950/50 backdrop-blur-xs z-[9999] flex items-center justify-center p-4 sm:p-6 cursor-zoom-out"
          onClick={onClose}
        >
          <div
            className="relative bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-neutral-200/80 p-5 md:p-6 max-w-3xl w-full max-h-[85vh] flex flex-col items-center justify-center select-none cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 text-neutral-450 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 p-2 rounded-full transition-all duration-200 cursor-pointer shadow-3xs"
              aria-label="Close Lightbox"
            >
              <X size={16} />
            </button>
            <div className="w-full flex items-center justify-center overflow-hidden rounded-lg mt-4 mb-2">
              <img
                loading="lazy"
                src={image}
                alt="Lightbox View"
                className="max-w-full max-h-[65vh] object-contain rounded-lg border border-neutral-100 shadow-3xs"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="mt-2 text-neutral-400 text-[11px] font-sans tracking-wide text-center">
              클릭 또는 우측 상단 X 버튼을 누르면 닫힙니다.
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // 2. 다중 이미지(갤러리) 슬라이더 렌더링
  if (images && images.length > 0) {
    return (
      <div
        onClick={onClose}
        className="fixed inset-0 bg-neutral-950/50 backdrop-blur-xs z-[9999] flex items-center justify-center p-4 sm:p-6 cursor-zoom-out"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-neutral-200/80 p-5 md:p-6 max-w-3xl w-full max-h-[85vh] flex flex-col items-center justify-center select-none cursor-default"
        >
          {/* Close Button inside Modal */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-neutral-450 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 p-2 rounded-full transition-all duration-200 cursor-pointer shadow-3xs z-20"
            title="Close (ESC)"
          >
            <X size={16} />
          </button>

          {/* Core Image Framer with Navigation */}
          <div className="relative flex items-center justify-center mt-4 mb-2 gap-[30px] w-full px-4 sm:px-8">
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
                }}
                className="shrink-0 z-10 bg-neutral-100/90 hover:bg-neutral-250 text-neutral-800 hover:text-neutral-950 p-2 rounded-full transition-all duration-200 cursor-pointer shadow-3xs hover:scale-105 border border-neutral-200/40"
                title="이전 사진 (Left Arrow)"
              >
                <ChevronLeft size={20} />
              </button>
            )}

            {/* Image Display Panel */}
            <div className="flex items-center justify-center overflow-hidden rounded-lg min-w-0">
              <img
                loading="lazy"
                src={images[currentIndex]}
                alt={`Expanded Screen ${currentIndex + 1}`}
                className="max-w-full max-h-[65vh] object-contain rounded-lg border border-neutral-100 shadow-3xs animate-fade-in"
                referrerPolicy="no-referrer"
              />
            </div>

            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
                }}
                className="shrink-0 z-10 bg-neutral-100/90 hover:bg-neutral-250 text-neutral-800 hover:text-neutral-950 p-2 rounded-full transition-all duration-200 cursor-pointer shadow-3xs hover:scale-105 border border-neutral-200/40"
                title="다음 사진 (Right Arrow)"
              >
                <ChevronRight size={20} />
              </button>
            )}
          </div>

          {/* Bottom Info Panel */}
          <div className="mt-3 flex flex-col items-center">
            <span className="bg-neutral-100 text-neutral-600 px-3.5 py-1 rounded-full text-[11px] font-mono font-medium border border-neutral-200/50">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
