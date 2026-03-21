"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const SPRING = { type: "spring" as const, stiffness: 260, damping: 28 };

export default function VideoPopupIsland({
  project,
  onClose,
}: {
  project: any;
  onClose: () => void;
}) {
  const [infoVisible, setInfoVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    // Reveal info panel after morph settles
    const t = setTimeout(() => setInfoVisible(true), 220);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [onClose]);

  const isH = !!project.horizontal;
  const isBrand = project.desc?.toLowerCase().startsWith("brand");
  const tagColor = isBrand ? "#7B61FF" : "#00C97A";
  const tagBg = isBrand ? "rgba(123,97,255,0.14)" : "rgba(0,201,122,0.14)";

  // Final popup dimensions
  const finalW = isH ? 800 : 740;
  const finalH = isH ? 560 : 500;

  const sw = typeof window !== "undefined" ? window.innerWidth : 1440;
  const sh = typeof window !== "undefined" ? window.innerHeight : 900;
  const finalL = (sw - finalW) / 2;
  const finalT = (sh - finalH) / 2;

  // Starting rect — where the card was on screen
  const from = project._rect ?? {
    left: sw / 2 - 120,
    top: sh / 2 - 170,
    width: 240,
    height: 340,
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-[90]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
        onClick={onClose}
      />

      {/* Morphing island */}
      <motion.div
        className="fixed z-[100] overflow-hidden bg-[#0e0e0e]"
        style={{ border: "1px solid rgba(255,255,255,0.07)" }}
        initial={{
          left: from.left,
          top: from.top,
          width: from.width,
          height: from.height,
          borderRadius: 22,
          boxShadow: `0 0 0 0 ${project.color}`,
        }}
        animate={{
          left: finalL,
          top: finalT,
          width: finalW,
          height: finalH,
          borderRadius: 28,
          boxShadow: `0 32px 80px -16px ${project.color}, 0 0 0 1px rgba(255,255,255,0.06)`,
        }}
        exit={{
          left: from.left,
          top: from.top,
          width: from.width,
          height: from.height,
          borderRadius: 22,
          opacity: 0,
          boxShadow: `0 0 0 0 ${project.color}`,
        }}
        transition={SPRING}
      >
        {isH ? (
          /* ── Landscape layout: video top, info bottom ── */
          <div className="w-full h-full flex flex-col">
            <div className="w-full shrink-0 bg-black" style={{ height: "62%" }}>
              <video
                src={project.video}
                autoPlay controls loop playsInline
                className="w-full h-full object-contain bg-black"
              />
            </div>
            <motion.div
              className="flex-1 flex flex-col sm:flex-row gap-6 px-7 py-5 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: infoVisible ? 1 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full w-fit mb-3 text-[11px] font-semibold tracking-widest uppercase"
                  style={{ background: tagBg, color: tagColor }}
                >
                  <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: tagColor }} />
                  {project.category}
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight leading-tight mb-1">
                  {project.headline}
                </h2>
                <p className="text-[#777] text-sm leading-relaxed">{project.summary}</p>
              </div>
              <div className="sm:w-[220px] shrink-0 flex flex-col justify-center">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-3">What's featured</p>
                <ul className="flex flex-col gap-2">
                  {(project.bullets ?? []).map((b: string, i: number) => (
                    <li key={i} className="flex items-center gap-2.5 text-white/65 text-[13px]">
                      <span className="w-1 h-1 rounded-full shrink-0" style={{ background: tagColor }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        ) : (
          /* ── Portrait layout: video left, info right ── */
          <div className="w-full h-full flex flex-row">
            <div className="shrink-0 bg-black" style={{ width: "36%", height: "100%" }}>
              <video
                src={project.video}
                autoPlay controls loop playsInline
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div
              className="flex-1 flex flex-col justify-center px-8 py-8 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: infoVisible ? 1 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full w-fit mb-5 text-[11px] font-semibold tracking-widest uppercase"
                style={{ background: tagBg, color: tagColor }}
              >
                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: tagColor }} />
                {project.category}
              </div>
              <h2 className="text-[2rem] font-bold text-white tracking-tight leading-tight mb-3">
                {project.headline}
              </h2>
              <p className="text-[#777] text-[15px] leading-relaxed mb-8">{project.summary}</p>
              <div className="w-full h-px bg-white/[0.07] mb-7" />
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-4">What's featured</p>
              <ul className="flex flex-col gap-3">
                {(project.bullets ?? []).map((b: string, i: number) => (
                  <li key={i} className="flex items-center gap-3 text-white/70 text-[14px]">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: tagColor }} />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        )}

        {/* Close button — fades in with info */}
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-white/35 hover:text-white transition-colors z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: infoVisible ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <X size={16} strokeWidth={2} />
        </motion.button>
      </motion.div>
    </>
  );
}
