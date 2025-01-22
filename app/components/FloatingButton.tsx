// FloatingButton.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import MusicPlayer from "./MusicPlayer";
import BackToTheTop from "./BackToTheTop";
import ChatBot from "./ChatBot";

export default function FloatingButton() {
  const [isMusicOpen, setIsMusicOpen] = useState(false);

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <>
      {/* Left Floating Button (Music Player) */}
      <div className="fixed bottom-4 left-4 flex flex-col items-start space-y-2 z-50">
        {" "}
        {/* Add z-50 */}
        <AnimatePresence>
          {isMusicOpen && (
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <MusicPlayer />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          initial="visible"
          animate="visible"
          variants={buttonVariants}
        >
          <Button
            onClick={() => setIsMusicOpen(!isMusicOpen)}
            className={`rounded-full p-2 bg-[#131821]/50 backdrop-blur-lg border-[2px] border-[#273344]/50 text-slate-200 ${
              isMusicOpen ? "bg-[#1c2736]" : ""
            }`}
            variant={isMusicOpen ? "default" : "outline"}
          >
            <Music className="h-6 w-6" />
            <span className="sr-only">Music Player</span>
          </Button>
        </motion.div>
      </div>

      {/* Right Floating Buttons (Chat and Back to Top) */}
      <div className="fixed bottom-4 right-4 flex flex-col items-end space-y-2 z-50">
        {" "}
        {/* Add z-50 */}
        <BackToTheTop />
        <ChatBot />
      </div>
    </>
  );
}
