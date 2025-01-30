import { useEffect, useState } from "react";
import { HiOutlineBeaker, HiOutlineExternalLink } from "react-icons/hi";
import Image from "next/image";
import { projects as projectItem } from "@/app/data/projects";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Projects } from "@/app/data/projects";

// Array of brand colors
const COLORS = ["#F43F5E", "#10B981", "#FFA23E"];

const ProjectItem = ({
  project,
  index,
  onOpenModal,
}: {
  project: Projects;
  index: number;
  onOpenModal: (project: Projects) => void;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLanded, setHasLanded] = useState(false);

  // Randomly select a color from the array
  const backgroundColor = COLORS[Math.floor(Math.random() * COLORS.length)];

  useEffect(() => {
    // Stagger the animation start based on index
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, index * 200);

    // Simulate landing after falling animation
    const landTimeout = setTimeout(() => {
      setHasLanded(true);
    }, index * 200 + 500);

    return () => {
      clearTimeout(timeout);
      clearTimeout(landTimeout);
    };
  }, [index]);

  return (
    <div
      className={`transform transition-all duration-500 cursor-pointer
        ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }
        ${hasLanded ? "scale-100" : "scale-95"}
      `}
      style={{
        backgroundColor,
        transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
      onClick={() => onOpenModal(project)}
    >
      <div className="relative h-64 w-full overflow-hidden">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-all duration-300 group-hover:shadow-lg"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-white">No Image Available</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute top-4 right-4">
          <HiOutlineExternalLink className="text-white" />
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-semibold text-white">{project.title}</h3>
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  const [projectsData, setProjectsData] = useState<Projects[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Projects | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setProjectsData(projectItem);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="w-full h-auto mt-12 mb-4 lg:ml-[-1.25em] flex justify-start items-center space-x-2 text-white text-3xl">
        <div className="text-[#FFA23E]">
          <HiOutlineBeaker />
        </div>
        <div>Projects</div>
      </div>
      <div className="w-full h-auto text-slate-300">
        <div className="text-lg mt-4">Here are some projects I've built.</div>
      </div>
      <div className="px-4 py-8 mt-2">
        <div className="grid grid-cols-1 gap-4">
          {projectsData.map((project, index) => (
            <ProjectItem
              key={project.id}
              project={project}
              index={index}
              onOpenModal={setSelectedProject}
            />
          ))}
        </div>
      </div>

      <Dialog
        open={!!selectedProject}
        onOpenChange={() => setSelectedProject(null)}
      >
        {selectedProject && (
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedProject.title}</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              {selectedProject.imageUrl && (
                <div className="relative h-48 w-full mb-4">
                  <Image
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              )}
              <div className="space-y-4">
                <p className="text-gray-600">{selectedProject.description}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies?.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
                >
                  Visit Project <HiOutlineExternalLink />
                </a>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
