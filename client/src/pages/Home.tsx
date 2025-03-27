import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DifficultySelector from "@/components/DifficultySelector";
import PuzzleCard from "@/components/PuzzleCard";
import ProgressTracker from "@/components/ProgressTracker";
import DocumentationSidebar from "@/components/DocumentationSidebar";
import HintCard from "@/components/HintCard";
import { type Puzzle } from "@shared/schema";

const Home = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("easy");
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState<number>(0);

  // Fetch puzzles based on selected difficulty
  const { data: puzzles, isLoading } = useQuery<Puzzle[]>({
    queryKey: ['/api/puzzles', selectedDifficulty],
    queryFn: async () => {
      const res = await fetch(`/api/puzzles?difficulty=${selectedDifficulty}`);
      if (!res.ok) throw new Error('Failed to fetch puzzles');
      return res.json();
    },
  });

  // Fetch user progress
  const { data: progressData } = useQuery({
    queryKey: ['/api/progress', localStorage.getItem('regexExplorerSessionId')],
    queryFn: async () => {
      const sessionId = localStorage.getItem('regexExplorerSessionId');
      if (!sessionId) return [];
      const res = await fetch(`/api/progress/${sessionId}`);
      if (!res.ok) throw new Error('Failed to fetch progress');
      return res.json();
    },
  });

  // Handler for difficulty change
  const handleDifficultyChange = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
    setCurrentPuzzleIndex(0);
  };

  // Handler for moving to the next puzzle
  const handleNextPuzzle = () => {
    if (puzzles && currentPuzzleIndex < puzzles.length - 1) {
      setCurrentPuzzleIndex(currentPuzzleIndex + 1);
    }
  };

  // Get current puzzle
  const currentPuzzle = puzzles?.[currentPuzzleIndex];

  return (
    <main className="container mx-auto p-4 flex flex-col lg:flex-row gap-6 mt-4">
      <section className="lg:w-2/3 space-y-6">
        <DifficultySelector 
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={handleDifficultyChange}
        />
        
        {isLoading ? (
          <div className="bg-white rounded-lg shadow-md p-6 h-80 flex items-center justify-center">
            <p>Loading puzzles...</p>
          </div>
        ) : (
          <>
            {currentPuzzle && (
              <PuzzleCard 
                puzzle={currentPuzzle}
                onNextPuzzle={handleNextPuzzle}
                puzzleNumber={currentPuzzleIndex + 1}
                totalPuzzles={puzzles?.length || 0}
              />
            )}
            
            <ProgressTracker 
              puzzles={puzzles || []}
              progressData={progressData || []}
              currentIndex={currentPuzzleIndex}
            />
          </>
        )}
      </section>
      
      <aside className="lg:w-1/3 space-y-6">
        <DocumentationSidebar />
        {currentPuzzle && <HintCard hint={currentPuzzle.hint} />}
      </aside>
    </main>
  );
};

export default Home;
