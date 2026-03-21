"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Mail, Send } from "lucide-react";

const springConfig = {
  type: "spring" as const,
  stiffness: 300,
  damping: 25,
};

export default function DynamicNotch() {
  const [isHovered, setIsHovered] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center justify-start origin-top"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        layout
        initial={false}
        transition={springConfig}
        className="bg-[#0a0a0a] border border-white/8 rounded-full overflow-hidden flex flex-col relative shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
        style={{
          width: isHovered ? 380 : 280,
          height: isHovered ? 120 : 56,
          borderRadius: isHovered ? 32 : 28,
        }}
      >
        {/* TOP ROW / DEFAULT STATE */}
        <motion.div layout className="flex items-center justify-between px-2 h-[56px] w-full shrink-0">
          <div className="flex items-center gap-3 pl-1">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 shrink-0">
              {/* Avatar placeholder */}
              <img src="/avatar.png" alt="Azat Samat" className="w-full h-full object-cover" />
            </div>
            <motion.div layout className="flex flex-col justify-center items-start">
              <span className="text-white text-sm font-medium leading-tight">Azat Samat</span>
              <span className="text-[#888] text-[11px] leading-tight">Marketing Manager</span>
            </motion.div>
          </div>
          
          <motion.div layout className="pr-3 text-[#888] text-xs font-medium">
            {time}
          </motion.div>
        </motion.div>

        {/* BOTTOM ROW / EXPANDED STATE */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ ...springConfig, delay: 0.05 }}
              className="flex items-center justify-between px-6 pt-2 pb-4 w-full h-[64px] shrink-0"
            >
              <div className="flex items-center gap-4">
                <a href="https://www.linkedin.com/in/azat-samatuly/" target="_blank" rel="noopener noreferrer" className="text-[#555] hover:text-white transition-colors duration-200">
                  <Linkedin size={20} strokeWidth={2} />
                </a>
                <a href="https://t.me/azattqz" target="_blank" rel="noopener noreferrer" className="text-[#555] hover:text-white transition-colors duration-200">
                  <Send size={20} strokeWidth={2} />
                </a>
                <a href="mailto:azat.samatuly@uni.minerva.edu" className="text-[#555] hover:text-white transition-colors duration-200">
                  <Mail size={20} strokeWidth={2} />
                </a>
              </div>
              
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00C97A] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00C97A]"></span>
                </span>
                <span className="text-xs text-white/90 font-medium whitespace-nowrap">Available for work</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
