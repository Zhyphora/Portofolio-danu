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
  const [terminalWidth, setTerminalWidth] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);

  const handleBannerComplete = () => {
    setShowContent(true);
  };

  useEffect(() => {
    const updateTerminalDimensions = () => {
      if (terminalRef.current) {
        setTerminalHeight(terminalRef.current.offsetHeight);
        setTerminalWidth(terminalRef.current.offsetWidth);
      }
    };

    updateTerminalDimensions();
    window.addEventListener("resize", updateTerminalDimensions);

    return () => {
      window.removeEventListener("resize", updateTerminalDimensions);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#10151D]">
      <Layout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <Navbar terminalHeight={terminalHeight} />
          <div className="w-full">
            <div ref={terminalRef} className="mx-auto w-full">
              <Terminal onBannerComplete={handleBannerComplete} />
            </div>
            <AnimatePresence>
              {showContent && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="w-full h-auto mt-8"
                >
                  <FloatingButton terminalWidth={terminalWidth} />
                  <div className="space-y-16">
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
        </div>
      </Layout>
    </main>
  );
}
