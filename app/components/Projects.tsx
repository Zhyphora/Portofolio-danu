import { HiOutlineBeaker, HiOutlineExternalLink } from "react-icons/hi";
import Image from "next/image";

type Projects = {
  id: number;
  title: string;
  company: string;
  date: string;
  description: string;
  skills?: { id: number; title: string }[];
  type: "paid" | "personal";
  link: string;
  imageUrl: string;
};

const projects: Projects[] = [
  {
    id: 1,
    title: "GMLS",
    company: "",
    date: "2023-01-01",
    description: "This is a description for Project 1.",
    skills: [
      { id: 1, title: "NextJs" },
      { id: 2, title: "NodeJS" },
    ],
    type: "paid",
    link: "https://gmls.org",
    imageUrl: "",
  },
  {
    id: 2,
    title: "KejarTugas",
    company: "",
    date: "2023-01-01",
    description: "This is a description for Project 1.",
    skills: [
      { id: 1, title: "NextJs" },
      { id: 2, title: "NodeJS" },
    ],
    type: "paid",
    link: "https://kejartugas.com",
    imageUrl: "",
  },
  {
    id: 3,
    title: "KidsHub",
    company: "",
    date: "2023-02-01",
    description: "This is a description for Project 2.",
    skills: [{ id: 1, title: "Kotlin" }],
    type: "personal",
    link: "https://github.com/Universitas-Multimedia-Nusantara/kidshub-app",
    imageUrl: "",
  },
];

const ProjectItem = ({ project }: { project: Projects }) => {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block w-full overflow-hidden transition-transform duration-300 hover:scale-105"
    >
      <div className="relative h-64 w-full">
        {/* Image or Fallback Div */}
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-all duration-300 group-hover:shadow-lg"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200 transition-all duration-300 group-hover:shadow-lg">
            <span className="text-gray-500">No Image Available</span>
          </div>
        )}

        {/* Overlay (Hidden by default, visible on hover) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* External Link Icon (Hidden by default, visible on hover) */}
        <div className="absolute top-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <HiOutlineExternalLink
            aria-label="Open project"
            className="text-white"
          />
        </div>

        {/* Title (Hidden by default, visible on hover) */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <h3 className="text-xl font-semibold text-white">{project.title}</h3>
        </div>
      </div>
    </a>
  );
};

export default function Projects() {
  return (
    <>
      <div className="w-full h-auto mt-12 mb-4 lg:ml-[-1.25em] flex justify-start items-center space-x-2 text-white text-3xl">
        <div className={"text-[#FFA23E]"}>
          <HiOutlineBeaker />
        </div>
        <div>Projects</div>
      </div>
      <div className="w-full h-auto text-slate-300">
        <div className="text-lg mt-4">Here are some projects I've built.</div>
      </div>
      <div className="px-4 py-8">
        <div className="grid grid-cols-1 gap-4">
          {projects.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </div>
      </div>
    </>
  );
}
