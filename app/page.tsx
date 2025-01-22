"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
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
  const terminalRef = useRef<HTMLDivElement>(null);

  const handleBannerComplete = () => {
    setShowContent(true);
  };

  useEffect(() => {
    if (terminalRef.current) {
      setTerminalHeight(terminalRef.current.offsetHeight);
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#10151D] xl:px-44 lg:flex lg:flex-col lg:items-center lg:justify-center">
      <Layout>
        <Navbar terminalHeight={terminalHeight} />
        <div className="h-full w-full flex flex-col items-center justify-center overflow-x-auto overflow-y-hidden">
          <div ref={terminalRef}>
            <Terminal onBannerComplete={handleBannerComplete} />
          </div>
          <AnimatePresence>
            {showContent && (
              <motion.div
                initial={{ y: 20, display: "none" }}
                animate={{ y: 0, display: "block" }}
                exit={{ y: 20, display: "none" }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="w-full h-auto lg:px-24"
              >
                <FloatingButton />
                <div className="max-w-4xl mx-auto">
                  <FloatingButton />
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
                <div>
                  <Footer />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Layout>
    </main>
  );
}
