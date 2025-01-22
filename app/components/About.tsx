// About.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { HiSparkles } from "react-icons/hi2";
import { FaRegCommentDots } from "react-icons/fa"; // Icons for the hover effects
import { aboutData } from "@/app/data/about";
import type { About } from "@/app/data/about"; // Change to type-only import

export default function About() {
  const [aboutMe, setAboutMe] = useState<About[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching data from an API
  useEffect(() => {
    const fetchData = async () => {
      // Simulate a delay for API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Set the data (simulating API response)
      setAboutMe(aboutData);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-auto mt-12 mb-4 lg:ml-[-1.25em] flex justify-start items-center space-x-2 text-white text-3xl">
        <div className={"text-[#10B981]"}>
          <HiOutlineExclamationCircle />
        </div>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full h-auto mt-12 mb-4 lg:ml-[-1.25em] flex justify-start items-center space-x-2 text-white text-3xl">
        <div className={"text-[#10B981]"}>
          <HiOutlineExclamationCircle />
        </div>
        <div>About</div>
      </div>
      <div className="w-full h-auto text-slate-300">
        <div>
          {aboutMe.map((item) => (
            <div key={item.id}>
              <div className="text-4xl">{item.heading}</div>
              <div className="text-lg mt-4 whitespace-pre-line">
                {item.description}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full h-auto flex items-center space-x-4 mt-4">
          {/* "Say hi!" Button */}
          <div className="relative">
            <Button
              asChild
              className="rounded-full bg-[#10B981]/50 font-semibold relative overflow-hidden group"
            >
              <Link href="#">
                <span className="relative z-10">Say hi!</span>
              </Link>
            </Button>
          </div>

          {/* "Download CV" Button */}
          <div className="relative">
            <Button
              asChild
              className="rounded-full bg-[#10B981]/50 font-semibold relative overflow-hidden group"
            >
              <Link href="#">
                <span className="relative z-10">Download CV</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
