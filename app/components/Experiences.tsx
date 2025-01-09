//react functions
import { useState } from "react";

//lucide react components
import { CalendarDays, Briefcase, GraduationCap } from "lucide-react";

//react icons
import { HiOutlineOfficeBuilding } from "react-icons/hi";

type Experience = {
  id: number;
  title: string;
  company: string;
  date: string;
  description: string;
  skills?: { id: number; title: string }[];
  type: "work" | "education";
};

const experiences: Experience[] = [
  {
    id: 1,
    title: "IT Internship",
    company: "PT Karya Solusi Prima Sejahtera",
    date: "Sept 2024 - Present",
    description:
      "Developing scalable web applications using React and Node.js.",
    skills: [
      {
        id: 1,
        title: "PHP",
      },
      {
        id: 2,
        title: "Laravel",
      },
      {
        id: 3,
        title: "Docker",
      },
    ],
    type: "work",
  },
  {
    id: 2,
    title: "Remote AI Trainer for Indonesian writers",
    company: "Outlier",
    date: "Sept 2024 - Present",
    description:
      "Developing scalable web applications using React and Node.js.",
    skills: [
      {
        id: 1,
        title: "Prompt Engineering",
      },
    ],
    type: "work",
  },
  {
    id: 3,
    title: "Techincal Consultant",
    company: "PT Global Information Technology",
    date: "Jan - July 2024",
    description: "Worked on frontend development using React and Redux.",
    skills: [
      {
        id: 1,
        title: "Splunk",
      },
      {
        id: 2,
        title: "IT Operation",
      },
      {
        id: 3,
        title: "IT Security",
      },
      {
        id: 4,
        title: "NextJS",
      },
      {
        id: 5,
        title: "META Development",
      },
    ],
    type: "work",
  },
  {
    id: 4,
    title: "Informatics Degree",
    company: "Universitas Multimedia Nusantara",
    date: "Aug 2021 - Present",
    description:
      "Studied algorithms, data structures, and software engineering principles.",
    type: "education",
  },
];

const ExperienceItem = ({
  experience,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}: {
  experience: Experience;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => {
  const Icon = experience.type === "work" ? Briefcase : GraduationCap;

  return (
    <div
      className="relative pl-10 pb-8 pt-2"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Vertical Line */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 transition-colors duration-300 border-2 border-[#273344] ${
          isHovered ? "bg-gray-200" : "bg-primary"
        }`}
      ></div>

      {/* Circular Icon */}
      <div
        className={`absolute left-0 top-0 -translate-x-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full shadow-md transition-colors border-2 border-[#273344] duration-300 ${
          isHovered ? "bg-gray-800" : "bg-primary"
        }`}
      >
        <Icon className="w-4 h-4 text-white" />
      </div>

      {/* Content Box */}
      <div
        className={`rounded-lg shadow-md p-5 transition-colors duration-300 border-2 border-[#273344] ${
          isHovered ? "border-gray-200 bg-gray-800" : "bg-primary/5"
        }`}
      >
        {/* Date */}
        <div className="flex items-center mb-3">
          <CalendarDays className="w-4 h-4 text-slate-500 mr-2" />
          <p className="text-xs text-slate-500">{experience.date}</p>
        </div>

        {/* Title and Company */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">{experience.title}</h3>
        </div>
        <h4 className="text-sm font-semibold text-slate-200">
          {experience.company}
        </h4>

        {/* Description */}
        <p className="text-sm text-slate-300 mt-2">{experience.description}</p>

        {experience.skills && experience.skills.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {experience.skills.map((skill) => (
              <span
                key={skill.id}
                className="px-2 py-1 text-xs font-semibold rounded-md bg-gray-700 text-gray-200"
              >
                {skill.title}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function Experiences() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <>
      <div className="w-full h-auto mt-12 mb-4 lg:ml-[-1.25em] flex justify-start items-center space-x-2 text-white text-3xl">
        <div className={"text-[#F43F5E]"}>
          <HiOutlineOfficeBuilding />
        </div>
        <div>Experiences</div>
      </div>
      <div className="w-full h-auto text-slate-300">
        <div className="text-lg mt-4">Here are some works I've done.</div>
      </div>
      <div className="relative p-4">
        {experiences.map((exp) => (
          <ExperienceItem
            key={exp.id}
            experience={exp}
            isHovered={hoveredId === exp.id}
            onMouseEnter={() => setHoveredId(exp.id)}
            onMouseLeave={() => setHoveredId(null)}
          />
        ))}
      </div>
    </>
  );
}
