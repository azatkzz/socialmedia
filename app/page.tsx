"use client";

import DynamicNotch from "./components/DynamicNotch";
import VideoArc from "./components/VideoArc";

export default function Home() {
  return (
    <main className="relative w-full h-full bg-[#080808] flex flex-col items-center overflow-hidden">
      <DynamicNotch />
      <VideoArc />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00C97A]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
    </main>
  );
}
