import { projects as projectItem } from "@/app/data/projects";
import type { Projects } from "@/app/data/projects";
import { useEffect, useState, useCallback, useRef } from "react";
import { HiOutlineBeaker, HiOutlineExternalLink } from "react-icons/hi";
import { motion } from "framer-motion";

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

const TetrisAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [gridSize] = useState({ rows: 8, cols: 12 });
  const [blockSize, setBlockSize] = useState(0);
  const [grid, setGrid] = useState<string[][]>(
    Array.from({ length: 16 }, () => Array(10).fill(""))
  );
  const [currentPiece, setCurrentPiece] = useState<{
    shape: number[][];
    color: string;
    x: number;
    y: number;
  } | null>(null);
  const [gameOver, setGameOver] = useState(false);

  // Calculate block size based on container
  const calculateBlockSize = useCallback(() => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    setBlockSize(Math.min(width / 10, height / 16));
  }, []);

  useEffect(() => {
    const updateSizes = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const gap = 1;
        const { width, height } = container.getBoundingClientRect();

        const widthAfterGaps = width - (gridSize.cols - 1) * gap;
        const heightAfterGaps = height - (gridSize.rows - 1) * gap;

        const newBlockSize = Math.min(
          widthAfterGaps / gridSize.cols,
          heightAfterGaps / gridSize.rows
        );

        setBlockSize(newBlockSize); // Remove Math.floor for precise sizing
      }
    };

    updateSizes();
    const resizeObserver = new ResizeObserver(updateSizes);
    containerRef.current && resizeObserver.observe(containerRef.current);

    return () => {
      containerRef.current && resizeObserver.unobserve(containerRef.current);
    };
  }, [gridSize]);

  const createNewPiece = useCallback(() => {
    const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    return {
      shape,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      x: Math.floor((10 - shape[0].length) / 2),
      y: 0,
    };
  }, []);

  const checkCollision = (
    piece: typeof currentPiece,
    newX: number,
    newY: number
  ) => {
    if (!piece) return true;

    return piece.shape.some((row, dy) =>
      row.some((cell, dx) => {
        if (!cell) return false;
        const nextX = newX + dx;
        const nextY = newY + dy;
        return (
          nextX < 0 ||
          nextX >= 10 ||
          nextY >= 16 ||
          (nextY >= 0 && grid[nextY][nextX])
        );
      })
    );
  };

  const mergePiece = () => {
    if (!currentPiece) return;

    const newGrid = grid.map((row) => [...row]);
    currentPiece.shape.forEach((row, dy) => {
      row.forEach((cell, dx) => {
        if (cell) {
          const y = currentPiece.y + dy;
          const x = currentPiece.x + dx;
          if (y >= 0) newGrid[y][x] = currentPiece.color;
        }
      });
    });
    setGrid(newGrid);
  };

  const clearLines = () => {
    const newGrid = grid.filter((row) => !row.every((cell) => cell));
    const linesCleared = grid.length - newGrid.length;
    const emptyRows = Array.from({ length: linesCleared }, () =>
      Array(10).fill("")
    );
    setGrid([...emptyRows, ...newGrid]);
    return linesCleared > 0;
  };

  const gameLoop = useCallback(() => {
    if (gameOver) return;

    setCurrentPiece((prev) => {
      if (!prev) return createNewPiece();

      // Try to move down
      if (!checkCollision(prev, prev.x, prev.y + 1)) {
        return { ...prev, y: prev.y + 1 };
      }

      // Merge piece with grid
      mergePiece();

      // Check for game over
      if (prev.y <= 1) {
        setGameOver(true);
        return null;
      }

      // Clear completed lines
      clearLines();

      // Create new piece
      return createNewPiece();
    });
  }, [gameOver, grid, createNewPiece]);

  useEffect(() => {
    const interval = setInterval(gameLoop, 500);
    return () => clearInterval(interval);
  }, [gameLoop]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-gray-800 relative overflow-hidden"
    >
      <div
        className="absolute top-0 left-0"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize.cols}, ${blockSize}px)`,
          gridTemplateRows: `repeat(${gridSize.rows}, ${blockSize}px)`,
          gap: "1px",
          width: `${gridSize.cols * blockSize + (gridSize.cols - 1)}px`,
          height: `${gridSize.rows * blockSize + (gridSize.rows - 1)}px`,
        }}
      >
        {grid.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className="box-border border border-gray-700"
              style={{
                width: blockSize,
                height: blockSize,
                backgroundColor: cell || "transparent",
              }}
            />
          ))
        )}
      </div>

      {/* Current piece */}
      {currentPiece && (
        <motion.div
          className="absolute"
          style={{
            left: currentPiece.x * blockSize,
            top: currentPiece.y * blockSize,
          }}
        >
          {currentPiece.shape.map((row, dy) => (
            <div key={dy} className="flex">
              {row.map((cell, dx) =>
                cell ? (
                  <motion.div
                    key={dx}
                    className="box-border border-2 border-gray-800"
                    style={{
                      width: blockSize,
                      height: blockSize,
                      backgroundColor: currentPiece.color,
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  />
                ) : (
                  <div
                    key={dx}
                    style={{ width: blockSize, height: blockSize }}
                  />
                )
              )}
            </div>
          ))}
        </motion.div>
      )}

      {/* Game Over Overlay */}
      {gameOver && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <span className="text-white text-xl font-bold">Game Over</span>
        </div>
      )}
    </div>
  );
};

const ProjectItem = ({
  project,
  onOpenModal,
}: {
  project: Projects;
  onOpenModal: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative h-64 bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all"
      onClick={onOpenModal}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex h-full">
        <div className="w-1/2 p-6 bg-gradient-to-br from-gray-800 to-gray-900">
          <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-gray-400 line-clamp-3">{project.description}</p>
        </div>
        <div className="w-1/2 relative">
          <TetrisAnimation />
          {isHovered && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <HiOutlineExternalLink className="text-white text-4xl animate-pulse" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  const [projects, setProjects] = useState<Projects[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setProjects(projectItem);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFA23E]"></div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center mb-8 space-x-3">
        <HiOutlineBeaker className="text-[#FFA23E] text-3xl" />
        <h1 className="text-3xl font-bold text-white">Projects</h1>
      </div>

      <p className="text-lg text-gray-400 mb-12">
        Here are some projects I've built. Hover to see interactive previews.
      </p>

      <div className="grid grid-cols-1 gap-6">
        {projects.map((project) => (
          <ProjectItem
            key={project.id}
            project={project}
            onOpenModal={() => console.log("Open modal for:", project.id)}
          />
        ))}
      </div>
    </div>
  );
}
