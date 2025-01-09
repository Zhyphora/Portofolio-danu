import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { HiSparkles } from "react-icons/hi2";
import { FaRegCommentDots } from "react-icons/fa"; // Icons for the hover effects

type AboutMe = {
  id: number;
  heading: any;
  description: string;
};

const aboutMe: AboutMe[] = [
  {
    id: 1,
    heading: (
      <>
        Howdy! <span className="font-bold text-white">Naufal Syarif</span> here.
      </>
    ),
    description:
      "I'm currently a third-year Informatics student at Multimedia Nusantara University. Lately, I've been focusing on my studies while also offering website-building services on platforms like Fiverr. \n\nUpon graduation, I aim to start my own business within the tech field, combining my passion for software development and entrepreneurship.\n\nI'm always open to connecting and collaborating, so feel free to reach out! 🙌",
  },
];

export default function About() {
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
