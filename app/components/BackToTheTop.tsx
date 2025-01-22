// BackToTheTop.tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTheTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <Button
            onClick={scrollToTop}
            className="rounded-full p-2 bg-[#131821]/50 backdrop-blur-lg border-[2px] border-[#273344]/50 text-slate-200"
            variant="outline"
          >
            <ArrowUp className="h-6 w-6" />
            <span className="sr-only">Back to Top</span>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
