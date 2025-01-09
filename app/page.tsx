"use client";

import { useState } from "react";

//nextjs components
import Link from "next/link";

//local components
import Layout from "@/app/components/Layout";
import Terminal from "@/app/components/Terminal/Terminal";
import FloatingButton from "@/app/components/FloatingButton";
import About from "@/app/components/About";
import Experiences from "@/app/components/Experiences";
import Projects from "@/app/components/Projects";
import Footer from "@/app/components/Footer";

//framer motion components
import { motion, AnimatePresence } from "framer-motion";

//shadcnui components

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  const handleBannerComplete = () => {
    setShowContent(true);
  };

  return (
    <main className="min-h-screen bg-[#10151D] xl:px-44 lg:flex lg:flex-col lg:items-center lg:justify-center">
      <Layout>
        <div className="h-full w-full flex flex-col items-center justify-center overflow-x-auto overflow-y-hidden">
          <Terminal onBannerComplete={handleBannerComplete} />
          <FloatingButton />
          <AnimatePresence>
            {showContent && (
              <motion.div
                initial={{ y: 20, display: "none" }}
                animate={{ y: 0, display: "block" }}
                exit={{ y: 20, display: "none" }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="w-full h-auto lg:px-24"
              >
                <div className="max-w-4xl mx-auto">
                  <div>
                    <About />
                  </div>
                  <div>
                    <Experiences />
                  </div>
                  <div>
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
