"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const PROJECTS = [
  { id: 1, title: "Biohacking & Longevity", desc: "Personal Blog", category: "Personal Blog · Talking Head", headline: "Morning Routine for Longevity", summary: "Sharing my personal research on biohacking, morning routines, and longevity science — made practical for everyday people.", bullets: ["Biohacking morning protocol", "Longevity science breakdown", "Habit-stacking strategies"], color: "rgba(0,201,122,0.45)", video: "/1_pb_th_bio.mp4" },
  { id: 2, title: "Cluely · CEO Insights", desc: "Brand · Cluely", category: "Brand · Talking Head", headline: "Cluely", summary: "Founder-led talking head featuring Cluely's CEO sharing candid life lessons and the mindset behind taking bold risks.", bullets: ["Founder / CEO interview format", "Risk-taking philosophy", "Authentic personal storytelling"], color: "rgba(123,97,255,0.45)", video: "/2_biz_th_cluely.mp4" },
  { id: 3, title: "Your First Try", desc: "Personal Blog", category: "Personal Blog · Cinematic Edit", headline: "You Can't Skip Your First 100", summary: "A kinetic edit about the truth every creator ignores: your first attempt will be bad — and that's exactly the point.", bullets: ["Motivational edit format", "Raw, unpolished energy", "Built for organic reach"], color: "rgba(255,140,0,0.45)", video: "/3_pb_edit_motiv.mp4" },
  { id: 4, title: "Hyphii · Brand Edit", desc: "Brand · Hyphii", category: "Brand · Cinematic Edit", headline: "Hyphii", summary: "High-energy promotional edit for Hyphii, a San Francisco-based wellness and fitness SaaS startup.", bullets: ["Wellness brand aesthetics", "SaaS product positioning", "San Francisco market"], color: "rgba(0,200,122,0.45)", video: "/4_biz_edit_hyphii.mp4" },
  { id: 5, title: "Hormones & Health", desc: "Personal Blog", category: "Personal Blog · Talking Head", headline: "Health Optimization", summary: "Deep dive into hormone optimization, sleep science, and biohacking protocols for peak daily performance.", bullets: ["Hormone optimization", "Sleep science and recovery", "Evidence-based biohacking"], color: "rgba(0,180,255,0.45)", video: "/5_pb_th_bio.mp4" },
  { id: 6, title: "FinTech · Kazakhstan", desc: "Brand · FinTech", category: "Brand · Talking Head", headline: "Financial Literacy", summary: "Educational content series for a Kazakhstan-based FinTech company, making financial knowledge accessible to a new generation.", bullets: ["Financial literacy series", "Youth-focused messaging", "Kazakhstan fintech market"], color: "rgba(255,200,0,0.45)", video: "/6_biz_th_fintech.mp4" },
  { id: 7, title: "The AI Shift", desc: "Personal Blog", category: "Personal Blog · Text Trend", headline: "Adapting to AI", summary: "A trending text-on-screen format exploring the AI landscape and what it actually means for regular people.", bullets: ["Viral text-format style", "AI trends and hot takes", "High-engagement format"], color: "rgba(123,97,255,0.45)", video: "/7_pb_text_AI.mp4" },
  { id: 8, title: "Hyphii · Product", desc: "Brand · Hyphii", category: "Brand · Product Demo", headline: "Hyphii", summary: "Product showcase video for Hyphii's wellness app, highlighting core features and the overall user experience.", bullets: ["App feature showcase", "Product-market fit story", "Clean, minimal aesthetic"], color: "rgba(0,200,122,0.45)", video: "/8_biz_hyphii_product.mp4" },
  { id: 9, title: "Career Advice", desc: "Personal Blog", category: "Personal Blog · Text Format", headline: "How to Actually Grow", summary: "A high-performing text-format video delivering blunt, actionable career advice. One of my top-performing posts.", bullets: ["Text-heavy viral format", "Career growth framework", "Top-performing content"], color: "rgba(255,60,0,0.45)", video: "/9_pb_text_career.mp4" },
  { id: 10, title: "Day in Life · Gym", desc: "Personal Blog", category: "Personal Blog · Day in Life", headline: "Training & Movement", summary: "A vlog-style day-in-the-life centered around gym culture, training routines, and the discipline of consistency.", bullets: ["Gym & training lifestyle", "Vlog-style storytelling", "Authentic daily routine"], color: "rgba(255,140,0,0.45)", video: "/10_pb_dil_gym.mp4", horizontal: true },
  { id: 11, title: "Productivity Systems", desc: "Personal Blog", category: "Personal Blog · Talking Head", headline: "How I Stay Productive", summary: "Breaking down my personal productivity stack — systems, tools, and mental models that actually move the needle.", bullets: ["Productivity frameworks", "Tool and system breakdown", "Actionable takeaways"], color: "rgba(0,220,255,0.45)", video: "/11_pb_th_productivity.mp4" },
  { id: 12, title: "Minerva University", desc: "Brand · Minerva", category: "Brand · Day in Life", headline: "Minerva University", summary: "An immersive day-in-the-life content piece for Minerva University, produced as part of their brand and marketing campaign.", bullets: ["University brand storytelling", "Day-in-life format", "Global education market"], color: "rgba(123,97,255,0.45)", video: "/12_biz_dil_minervauni.mp4", horizontal: true },
  { id: 13, title: "Growth Mentality", desc: "Personal Blog", category: "Personal Blog · Talking Head", headline: "How to Grow Fast", summary: "Honest advice for young professionals on how to build leverage, adopt the right mindset, and grow faster than peers.", bullets: ["Professional growth advice", "Mentality and mindset", "Gen-Z audience focus"], color: "rgba(0,200,122,0.45)", video: "/13_pb_th_mentality.mp4" },
  { id: 14, title: "Be Cringe", desc: "Personal Blog", category: "Personal Blog · Talking Head", headline: "Cringe Is the Cost of Change", summary: "A raw, unfiltered take on why being cringe is inevitable when you're truly changing — and why that's the point.", bullets: ["Change and growth mindset", "Counter-intuitive life advice", "Deeply personal storytelling"], color: "rgba(255,0,150,0.45)", video: "/14_pb_th_cringe.mp4" },
  { id: 15, title: "On Friendship", desc: "Personal Blog", category: "Personal Blog · Cinematic Edit", headline: "Real Friendship", summary: "A visually-driven edit exploring what genuine friendship looks like — candid, unscripted, and emotionally honest.", bullets: ["Friendship and relationships", "Cinematic edit style", "Emotionally resonant format"], color: "rgba(255,140,0,0.45)", video: "/15_pb_edit_friends.mp4", horizontal: true },
  { id: 16, title: "Stay Motivated", desc: "Personal Blog", category: "Personal Blog · Talking Head", headline: "Raw Motivation", summary: "A direct-to-camera motivational talk about discipline, purpose, and why most people quit right before the breakthrough.", bullets: ["Motivational monologue format", "Discipline over motivation thesis", "High emotional pull"], color: "rgba(255,60,0,0.45)", video: "/16_pb_th_motivaiton.mp4" },
];

// ── Arc geometry ──
const CARD_W = 240;
const CARD_H = 340;
const ANGLE_STEP = 15;
const PIVOT = 1000;
const VISIBLE_HALF = 60;
const CYCLE_MS = 45000;
const PX_PER_DEG = 18;
const CLICK_THRESHOLD = 6;

const ALL_CARDS = [...PROJECTS, ...PROJECTS, ...PROJECTS];
const PERIOD = PROJECTS.length * ANGLE_STEP;
const TOTAL_SPAN = ALL_CARDS.length * ANGLE_STEP;
const DEG_PER_MS = PERIOD / CYCLE_MS;

function scaleForAngle(angle: number): number {
  return Math.max(0.8, 1.0 - Math.abs(angle) * 0.0035);
}

export default function VideoArc() {
  const [selected, setSelected] = useState<{ project: any; idx: number } | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [winH, setWinH] = useState(800);

  // Responsive layout values derived from viewport height
  const arcBottomPx   = Math.round(Math.max(36, winH * 0.08));
  const effectiveCardH = Math.round(Math.min(CARD_H, Math.max(210, winH * 0.42)));
  const infoPanelBottom = arcBottomPx + Math.round(effectiveCardH * 1.26);
  const headingTop     = Math.round(Math.min(192, winH * 0.22));

  useEffect(() => {
    const update = () => setWinH(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const arcRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const hoveredRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);
  const rafRef = useRef(0);
  const tyArr = useRef(new Float32Array(ALL_CARDS.length));

  // Selection animation
  const selectedRef = useRef<{ idx: number; targetOffset: number } | null>(null);
  const selectT = useRef(0); // 0 = normal, 1 = fully focused

  // Drags
  const barDragging = useRef(false);
  const barStartX = useRef(0);
  const barStartOff = useRef(0);
  const arcDragging = useRef(false);
  const arcStartX = useRef(0);
  const arcDist = useRef(0);
  const anyDrag = () => barDragging.current || arcDragging.current;

  useEffect(() => { hoveredRef.current = hoveredIdx; }, [hoveredIdx]);

  // ── Select / Deselect ──
  const handleSelect = (project: any, i: number) => {
    if (selected) return;
    const raw = i * ANGLE_STEP - offsetRef.current;
    const half = TOTAL_SPAN / 2;
    const angle = ((raw % TOTAL_SPAN) + TOTAL_SPAN + half) % TOTAL_SPAN - half;
    const target = offsetRef.current + angle;
    selectedRef.current = { idx: i, targetOffset: target };
    setHoveredIdx(null);
    setSelected({ project, idx: i });
  };

  const handleDeselect = () => {
    selectedRef.current = null;
    offsetRef.current = ((offsetRef.current % PERIOD) + PERIOD) % PERIOD;
    setSelected(null);
  };

  // ── RAF loop ──
  useEffect(() => {
    lastTimeRef.current = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(now - lastTimeRef.current, 50);
      lastTimeRef.current = now;

      // Animate selectT toward target
      const tTarget = selectedRef.current ? 1 : 0;
      selectT.current += (tTarget - selectT.current) * 0.14;
      if (Math.abs(selectT.current - tTarget) < 0.003) selectT.current = tTarget;
      const t = selectT.current;

      if (selectedRef.current) {
        const target = selectedRef.current.targetOffset;
        offsetRef.current += (target - offsetRef.current) * 0.14;
      } else if (hoveredRef.current === null && !anyDrag()) {
        offsetRef.current = (offsetRef.current + DEG_PER_MS * dt) % PERIOD;
        offsetRef.current = ((offsetRef.current % PERIOD) + PERIOD) % PERIOD;
      }

      const container = arcRef.current;
      if (container) {
        const halfTotal = TOTAL_SPAN / 2;
        for (let i = 0; i < container.children.length; i++) {
          const outer = container.children[i] as HTMLElement;
          const inner = outer.firstElementChild as HTMLElement;
          if (!inner) continue;

          const raw = i * ANGLE_STEP - offsetRef.current;
          let angle = ((raw % TOTAL_SPAN) + TOTAL_SPAN + halfTotal) % TOTAL_SPAN - halfTotal;
          const inView = Math.abs(angle) <= VISIBLE_HALF + 15;

          const isSel = selectedRef.current?.idx === i;

          // Spread non-selected cards apart when focused
          if (!isSel && t > 0.01) {
            angle = angle * (1 + t * 0.9);
          }

          outer.style.transform = `rotate(${angle}deg)`;
          outer.style.visibility = inView ? "visible" : "hidden";
          outer.style.pointerEvents = inView ? "auto" : "none";
          outer.style.zIndex = isSel ? "200" : hoveredRef.current === i ? "150" : String(Math.round(100 - Math.abs(angle)));

          // Scale
          let s: number;
          if (isSel) {
            s = 1 + t * 0.22;
          } else {
            s = scaleForAngle(angle) * (1 - t * 0.15);
          }

          // Hover lift (only when not in selected mode)
          const targetTy = (t < 0.1 && hoveredRef.current === i) ? -14 : 0;
          tyArr.current[i] += (targetTy - tyArr.current[i]) * 0.15;
          if (Math.abs(tyArr.current[i] - targetTy) < 0.3) tyArr.current[i] = targetTy;

          inner.style.transform = `scale(${s}) translateY(${tyArr.current[i]}px)`;

          // Blur + dim non-selected cards
          if (!isSel && t > 0.01) {
            const blur = t * 10;
            const bright = 1 - t * 0.65;
            inner.style.filter = `blur(${blur}px) brightness(${bright})`;
          } else {
            inner.style.filter = "none";
          }
        }
      }

      // Progress bar
      if (thumbRef.current) {
        const normOff = ((offsetRef.current % PERIOD) + PERIOD) % PERIOD;
        thumbRef.current.style.transform = `translateX(${(normOff / PERIOD) * 240}px)`;
        thumbRef.current.parentElement!.style.opacity = t > 0.5 ? "0" : "1";
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // ── Drag handlers ──
  const onBarDown = (e: React.PointerEvent) => {
    if (selected) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    barDragging.current = true;
    barStartX.current = e.clientX;
    barStartOff.current = offsetRef.current;
  };
  const onBarMove = (e: React.PointerEvent) => {
    if (!barDragging.current) return;
    const ratio = (e.clientX - barStartX.current) / 240;
    offsetRef.current = ((barStartOff.current + ratio * PERIOD) % PERIOD + PERIOD) % PERIOD;
  };
  const onBarUp = (e: React.PointerEvent) => {
    barDragging.current = false;
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const onArcDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (selected) return;
    arcDragging.current = true;
    arcStartX.current = e.clientX;
    arcDist.current = 0;

    const onDocMove = (ev: PointerEvent) => {
      if (!arcDragging.current) return;
      const delta = ev.clientX - arcStartX.current;
      arcDist.current += Math.abs(delta);
      offsetRef.current = ((offsetRef.current - delta / PX_PER_DEG) % PERIOD + PERIOD) % PERIOD;
      arcStartX.current = ev.clientX;
    };
    const onDocUp = () => {
      arcDragging.current = false;
      document.removeEventListener("pointermove", onDocMove);
      document.removeEventListener("pointerup", onDocUp);
    };
    document.addEventListener("pointermove", onDocMove);
    document.addEventListener("pointerup", onDocUp);
  };

  // ── Unmute selected video, mute all others ──
  useEffect(() => {
    if (!arcRef.current) return;
    const children = arcRef.current.children;
    for (let i = 0; i < children.length; i++) {
      const video = children[i]?.querySelector("video") as HTMLVideoElement | null;
      if (!video) continue;
      if (selected && selected.idx === i) {
        video.muted = false;
        video.controls = true;
        video.style.objectFit = ALL_CARDS[i].horizontal ? "contain" : "cover";
        video.play().catch(() => {});
      } else {
        video.muted = true;
        video.controls = false;
        video.style.objectFit = "cover";
      }
    }
  }, [selected]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Heading — hides when focused */}
      <AnimatePresence>
        {!selected && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 z-10 select-none pointer-events-none"
            style={{ top: headingTop }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            <h1
              className="text-center leading-none whitespace-nowrap"
              style={{
                fontFamily: "var(--font-instrument), 'Instrument Serif', serif",
                fontWeight: 400, fontStyle: "italic",
                fontSize: "clamp(1.6rem, 3.5vw, 3.2rem)",
                color: "rgba(255,255,255,0.85)",
              }}
            >
              Content Marketing Portfolio
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Info panel — fills space between notch and card top ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="info"
            className="absolute left-0 right-0 z-30 select-none pointer-events-none flex items-center justify-center"
            style={{ top: 88, bottom: infoPanelBottom }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <motion.div
              className="flex flex-col items-center text-center px-8"
              style={{ maxWidth: 460 }}
              initial={{ y: 14 }}
              animate={{ y: 0 }}
              exit={{ y: 8 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
            >
              <p className="text-white font-semibold tracking-tight"
                style={{ fontSize: "clamp(15px, 2vw, 20px)", lineHeight: 1.3 }}>
                {selected.project.headline}
              </p>
              <p style={{ fontSize: "clamp(11px, 1.3vw, 13px)", color: "rgba(255,255,255,0.55)", marginTop: 6 }}>
                {selected.project.desc}
              </p>
              <p style={{ fontSize: "clamp(11px, 1.3vw, 13px)", color: "rgba(255,255,255,0.45)", lineHeight: 1.6, marginTop: 10 }}>
                {selected.project.summary}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Desktop Arc ── */}
      <div
        className="hidden sm:block absolute inset-0 pointer-events-auto z-[25]"
        style={{ cursor: selected ? "default" : "grab", touchAction: "none" }}
        onPointerDown={onArcDown}
        onClick={() => { if (selected) handleDeselect(); }}
      >
        <div
          ref={arcRef}
          className="absolute left-1/2 -translate-x-1/2"
          style={{ bottom: arcBottomPx }}
        >
          {ALL_CARDS.map((project, i) => (
            <div
              key={`arc-${i}`}
              className="absolute"
              style={{
                width: CARD_W, height: effectiveCardH,
                left: -(CARD_W / 2), bottom: 0,
                transformOrigin: `50% ${PIVOT}px`,
                willChange: "transform",
              }}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  if (arcDist.current > CLICK_THRESHOLD) return;
                  if (selected) {
                    if (selected.idx === i) handleDeselect();
                    else handleDeselect();
                    return;
                  }
                  handleSelect(project, i);
                }}
                onMouseEnter={() => { if (!selected) setHoveredIdx(i); }}
                onMouseLeave={() => { if (!selected) setHoveredIdx(null); }}
                className="cursor-play"
                style={{
                  width: CARD_W, height: effectiveCardH,
                  borderRadius: 22, overflow: "hidden",
                  transformOrigin: "50% 100%",
                  willChange: "transform",
                  boxShadow: hoveredIdx === i && !selected
                    ? `0 16px 40px -8px ${project.color}, 0 0 0 1px rgba(255,255,255,0.12)`
                    : selected?.idx === i
                    ? `0 24px 60px -8px ${project.color}, 0 0 0 1px rgba(255,255,255,0.15)`
                    : "0 6px 20px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.07)",
                  transition: "box-shadow 0.35s ease",
                }}
              >
                <CardContent project={project} isSelected={!!(selected && selected.idx === i)} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress bar — hidden when focused */}
      <div
        className="hidden sm:block absolute bottom-9 left-1/2 -translate-x-1/2 w-[300px] h-[2px] bg-white/[0.08] rounded-full z-50 pointer-events-auto"
        style={{ touchAction: "none", transition: "opacity 0.3s" }}
      >
        <div
          ref={thumbRef}
          onPointerDown={onBarDown}
          onPointerMove={onBarMove}
          onPointerUp={onBarUp}
          onPointerCancel={onBarUp}
          className="absolute top-1/2 -translate-y-1/2 left-0 h-[2px] w-[60px] rounded-full cursor-grab active:cursor-grabbing"
          style={{ background: "rgba(255,255,255,0.4)", touchAction: "none", transition: "background 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.7)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.4)")}
        />
      </div>

      {/* Mobile Grid */}
      <div className="sm:hidden absolute bottom-0 left-0 right-0 h-full flex flex-col items-center gap-6 px-6 pb-24 pt-[120px] overflow-y-auto pointer-events-auto">
        {PROJECTS.map((project, i) => (
          <div
            key={project.id}
            onClick={() => handleSelect(project, i)}
            className="relative w-full max-w-[280px] rounded-[22px] overflow-hidden cursor-play shrink-0"
            style={{ aspectRatio: "3 / 4", boxShadow: "0 8px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.07)" }}
          >
            <CardContent project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}

function CardContent({ project, isSelected }: { project: any; isSelected?: boolean }) {
  return (
    <div className="w-full h-full relative bg-black">
      <video
        src={project.video}
        autoPlay loop muted playsInline preload="auto"
        draggable={false}
        className="absolute inset-0 w-full h-full"
        style={{
          objectFit: "cover",
          pointerEvents: isSelected ? "auto" : "none",
        }}
      />
      {/* Title + type label — fades out when selected so controls show */}
      <div
        className="absolute bottom-0 left-0 right-0 flex flex-col justify-end px-4 pb-4"
        style={{
          height: "38%",
          background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)",
          pointerEvents: "none",
          opacity: isSelected ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      >
        <p style={{ fontSize: 13, fontWeight: 600, color: "#fff", lineHeight: 1.3, letterSpacing: "-0.01em" }}>
          {project.title}
        </p>
        <p style={{ fontSize: 11, fontWeight: 400, color: "rgba(255,255,255,0.4)", marginTop: 2, lineHeight: 1.3 }}>
          {project.desc}
        </p>
      </div>
    </div>
  );
}
