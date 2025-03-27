import type { Puzzle, Progress } from "@shared/schema";

interface ProgressTrackerProps {
  puzzles: Puzzle[];
  progressData: Progress[];
  currentIndex: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ 
  puzzles, 
  progressData,
  currentIndex
}) => {
  // Create map of completed puzzles
  const completedMap = new Map<number, boolean>();
  progressData.forEach(p => {
    if (p.completed) {
      completedMap.set(p.puzzleId, true);
    }
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-3 text-[#2D5A27]">Your Progress</h2>
      <div className="flex gap-2 mb-3 flex-wrap">
        {puzzles.map((puzzle, index) => (
          <div 
            key={puzzle.id}
            className={`
              w-8 h-8 rounded-full flex items-center justify-center text-xs border-2
              ${completedMap.has(puzzle.id) 
                ? 'border-[#A8C090] bg-[#A8C090] text-white' 
                : index === currentIndex
                  ? 'border-[#2D5A27] text-[#2D5A27]'
                  : 'border-gray-300'
              }
            `}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <p className="text-sm text-[#2C3639]/70">
        Complete all puzzles in this difficulty level to unlock new challenges!
      </p>
    </div>
  );
};

export default ProgressTracker;
