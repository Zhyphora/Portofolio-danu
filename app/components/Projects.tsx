// Projects.tsx
import { useEffect, useState } from "react";
import { HiOutlineBeaker, HiOutlineExternalLink } from "react-icons/hi";
import Image from "next/image";
import { projects as projectItem } from "@/app/data/projects";
import type { Projects } from "@/app/data/projects";

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
  const [projectsData, setProjectsData] = useState<Projects[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from an API
    setTimeout(() => {
      setProjectsData(projectItem); // Fix variable name
      setLoading(false);
    }, 1000); // Simulate a 1-second delay
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
      <div className="px-4 py-8 mt-2">
        {" "}
        {/* Add margin-top to avoid overlap */}
        <div className="grid grid-cols-1 gap-4">
          {projectsData.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </div>
      </div>
    </>
  );
}
