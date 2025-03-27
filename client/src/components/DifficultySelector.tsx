import { Button } from "@/components/ui/button";

interface DifficultySelectorProps {
  selectedDifficulty: string;
  onDifficultyChange: (difficulty: string) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  selectedDifficulty,
  onDifficultyChange
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-3 text-[#2D5A27]">Choose Difficulty</h2>
      <div className="flex flex-wrap gap-3">
        <Button
          variant={selectedDifficulty === "easy" ? "default" : "outline"}
          onClick={() => onDifficultyChange("easy")}
          className={selectedDifficulty === "easy" 
            ? "bg-[#2D5A27] text-white hover:bg-[#2D5A27]/90" 
            : "border-[#2D5A27] text-[#2D5A27] hover:bg-[#A8C090]/20"
          }
        >
          Easy
        </Button>
        <Button
          variant={selectedDifficulty === "medium" ? "default" : "outline"}
          onClick={() => onDifficultyChange("medium")}
          className={selectedDifficulty === "medium" 
            ? "bg-[#2D5A27] text-white hover:bg-[#2D5A27]/90" 
            : "border-[#2D5A27] text-[#2D5A27] hover:bg-[#A8C090]/20"
          }
        >
          Medium
        </Button>
        <Button
          variant={selectedDifficulty === "hard" ? "default" : "outline"}
          onClick={() => onDifficultyChange("hard")}
          className={selectedDifficulty === "hard" 
            ? "bg-[#2D5A27] text-white hover:bg-[#2D5A27]/90" 
            : "border-[#2D5A27] text-[#2D5A27] hover:bg-[#A8C090]/20"
          }
        >
          Hard
        </Button>
      </div>
    </div>
  );
};

export default DifficultySelector;
