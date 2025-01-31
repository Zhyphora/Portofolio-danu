import { projects as projectItem } from "@/app/data/projects";
import type { Projects } from "@/app/data/projects";
import { useEffect, useState, useCallback, useRef } from "react";
import { HiOutlineBeaker, HiOutlineExternalLink } from "react-icons/hi";
import { motion } from "framer-motion";

// Tetris Animation Component
const COLORS = ["#F43F5E", "#10B981", "#FFA23E", "#3B82F6", "#8B5CF6"];
const SHAPES = [
  [
    [1, 1],
    [1, 1],
  ], // Square
  [[1, 1, 1, 1]], // Line
  [
    [1, 1, 1],
    [0, 1, 0],
  ], // T
  [
    [1, 1, 0],
    [0, 1, 1],
  ], // Z
  [
    [0, 1, 1],
    [1, 1, 0],
  ], // S
];

const GRID_HEIGHT = 8;
const GRID_WIDTH = 12;

const TetrisAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [gridSize, setGridSize] = useState({ rows: 8, cols: 12 });
  const [grid, setGrid] = useState<string[][]>(
    Array(gridSize.rows)
      .fill(null)
      .map(() => Array(gridSize.cols).fill(""))
  );
  const [currentPiece, setCurrentPiece] = useState<{
    shape: number[][];
    color: string;
    x: number;
    y: number;
  } | null>(null);

  // Dynamically calculate grid size based on container
  useEffect(() => {
    const updateGridSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        const blockSize = Math.min(
          Math.floor(width / 12),
          Math.floor(height / 8)
        );
        const cols = Math.floor(width / blockSize);
        const rows = Math.floor(height / blockSize);

        setGridSize({ rows, cols });
        setGrid(
          Array(rows)
            .fill(null)
            .map(() => Array(cols).fill(""))
        );
      }
    };

    updateGridSize();
    window.addEventListener("resize", updateGridSize);
    return () => window.removeEventListener("resize", updateGridSize);
  }, []);

  const createNewPiece = useCallback(() => {
    const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    return {
      shape,
      color,
      x: Math.floor(Math.random() * (gridSize.cols - shape[0].length + 1)),
      y: 0,
    };
  }, [gridSize]);

  const isValidMove = useCallback(
    (piece: typeof currentPiece, newX: number, newY: number) => {
      if (!piece) return false;
      for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
          if (piece.shape[y][x]) {
            const nextX = newX + x;
            const nextY = newY + y;
            if (
              nextX < 0 ||
              nextX >= gridSize.cols ||
              nextY >= gridSize.rows ||
              (nextY >= 0 && grid[nextY][nextX])
            ) {
              return false;
            }
          }
        }
      }
      return true;
    },
    [grid, gridSize]
  );

  const placePiece = useCallback(
    (piece: NonNullable<typeof currentPiece>) => {
      const newGrid = grid.map((row) => [...row]);
      for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
          if (piece.shape[y][x]) {
            newGrid[piece.y + y][piece.x + x] = piece.color;
          }
        }
      }

      // Check for complete lines and clear them
      const filledLines = newGrid.reduce((lines, row, index) => {
        if (row.every((cell) => cell !== "")) {
          lines.push(index);
        }
        return lines;
      }, [] as number[]);

      // Remove complete lines and add empty rows at the top
      if (filledLines.length > 0) {
        const filteredGrid = newGrid.filter(
          (_, index) => !filledLines.includes(index)
        );
        const emptyRows = Array(filledLines.length)
          .fill(null)
          .map(() => Array(gridSize.cols).fill(""));

        setGrid([...emptyRows, ...filteredGrid]);
      } else {
        setGrid(newGrid);
      }
    },
    [grid, gridSize]
  );

  useEffect(() => {
    if (!currentPiece) {
      setCurrentPiece(createNewPiece());
      return;
    }

    const interval = setInterval(() => {
      if (isValidMove(currentPiece, currentPiece.x, currentPiece.y + 1)) {
        setCurrentPiece((prev) => (prev ? { ...prev, y: prev.y + 1 } : null));
      } else {
        // Check if piece is at the top of the grid
        if (currentPiece.y === 0) {
          // Reset the entire grid
          setGrid(
            Array(gridSize.rows)
              .fill(null)
              .map(() => Array(gridSize.cols).fill(""))
          );
        } else {
          placePiece(currentPiece);
        }
        setCurrentPiece(createNewPiece());
      }
    }, 500);

    return () => clearInterval(interval);
  }, [currentPiece, createNewPiece, isValidMove, placePiece, gridSize]);

  // Calculate block size dynamically
  const blockSize = containerRef.current
    ? Math.min(
        Math.floor(containerRef.current.offsetWidth / gridSize.cols),
        Math.floor(containerRef.current.offsetHeight / gridSize.rows)
      )
    : 0;

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-gray-800 relative overflow-hidden"
    >
      {grid.map((row, y) => (
        <div key={y} className="flex">
          {row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className="border border-gray-700"
              style={{
                width: `${blockSize}px`,
                height: `${blockSize}px`,
                backgroundColor: cell || "transparent",
              }}
            />
          ))}
        </div>
      ))}
      {currentPiece && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            left: `${currentPiece.x * blockSize}px`,
            top: `${currentPiece.y * blockSize}px`,
          }}
        >
          {currentPiece.shape.map((row, rowIndex) => (
            <div key={rowIndex} className="flex">
              {row.map((cell, cellIndex) =>
                cell ? (
                  <motion.div
                    key={cellIndex}
                    style={{
                      width: `${blockSize}px`,
                      height: `${blockSize}px`,
                      backgroundColor: currentPiece.color,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.2,
                      delay: (rowIndex + cellIndex) * 0.05,
                    }}
                  />
                ) : (
                  <div
                    key={cellIndex}
                    style={{
                      width: `${blockSize}px`,
                      height: `${blockSize}px`,
                    }}
                  />
                )
              )}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};
// ProjectItem Component
const ProjectItem = ({
  project,
  index,
  onOpenModal,
}: {
  project: Projects;
  index: number;
  onOpenModal: (project: Projects) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="transform cursor-pointer shadow-md transition-all duration-300 border-2 border-[#273344] hover:scale-105"
      onClick={() => onOpenModal(project)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64 w-full overflow-hidden">
        <div className="flex h-full">
          <div className="w-1/2 h-full p-5 bg-gray-600">
            <h3 className="text-xl h-full font-semibold text-white">
              {project.title}
            </h3>
          </div>
          <div className="flex w-1/2 h-full justify-end bg-gray-800">
            <TetrisAnimation />
          </div>
          {isHovered && (
            <div className="absolute top-4 right-4">
              <HiOutlineExternalLink className="text-white text-2xl" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Projects Component
export default function Projects() {
  const [projects, setProjects] = useState<Projects[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Projects | null>(null);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setProjects(projectItem);
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
          {projects.map((project, index) => (
            <ProjectItem
              key={project.id}
              project={project}
              index={index}
              onOpenModal={setSelectedProject}
            />
          ))}
        </div>
      </div>
    </>
  );
}
