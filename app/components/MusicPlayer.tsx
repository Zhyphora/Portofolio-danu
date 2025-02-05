// MusicPlayer.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export default function MusicPlayer() {
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => setIsMuted(!isMuted);

  return (
    <Button
      onClick={toggleMute}
      className={`rounded-full p-2 bg-[#131821]/50 backdrop-blur-lg border-[2px] border-[#273344]/50 text-slate-200 transition-all duration-300 hover:border-[#273344] ${
        isMuted ? "text-[#F43F5E] border-[#F43F5E]/50" : ""
      }`}
      variant="outline"
    >
      {isMuted ? (
        <VolumeX className="h-6 w-6" />
      ) : (
        <Volume2 className="h-6 w-6" />
      )}
      <span className="sr-only">Toggle Sound</span>
    </Button>
  );
}
