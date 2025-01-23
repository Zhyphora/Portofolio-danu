"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Layout from "@/app/components/Layout";
import Terminal from "@/app/components/Terminal/Terminal";
import FloatingButton from "@/app/components/FloatingButton";
import About from "@/app/components/About";
import Experiences from "@/app/components/Experiences";
import Projects from "@/app/components/Projects";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [terminalHeight, setTerminalHeight] = useState(0);
  const [terminalWidth, setTerminalWidth] = useState(0); // Add state for terminal width
  const terminalRef = useRef<HTMLDivElement>(null);

  const handleBannerComplete = () => {
    setShowContent(true);
  };

  useEffect(() => {
    if (terminalRef.current) {
      setTerminalHeight(terminalRef.current.offsetHeight);
      setTerminalWidth(terminalRef.current.offsetWidth); // Set terminal width
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#10151D] xl:px-44 2xl:px-64">
      <Layout>
        <Navbar terminalHeight={terminalHeight} />
        <div className="h-full w-full">
          {/* Terminal Container with Responsive Constraints */}
          <div
            ref={terminalRef}
            className="mx-auto w-full max-w-[95vw] md:max-w-[47.5rem] lg:max-w-[55rem] 2xl:max-w-[65rem]"
          >
            <Terminal onBannerComplete={handleBannerComplete} />
          </div>
          <AnimatePresence>
            {showContent && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="w-full h-auto lg:px-24 2xl:px-32"
              >
                {/* Pass terminalWidth to FloatingButton */}
                <FloatingButton terminalWidth={terminalWidth} />
                <div className="max-w-4xl mx-auto space-y-16 2xl:max-w-6xl">
                  <div id="about">
                    <About />
                  </div>
                  <div id="experiences">
                    <Experiences />
                  </div>
                  <div id="projects">
                    <Projects />
                  </div>
                </div>
                <Footer />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Layout>
    </main>
  );
}
