import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

interface ResultFeedbackProps {
  isCorrect: boolean;
  matchCount?: number;
  expectedCount?: number;
  onNextPuzzle: () => void;
}

const ResultFeedback: React.FC<ResultFeedbackProps> = ({ 
  isCorrect, 
  matchCount = 0,
  expectedCount = 0,
  onNextPuzzle 
}) => {
  if (isCorrect) {
    return (
      <div className="bg-[#4C9A2A]/10 border border-[#4C9A2A]/30 rounded-md p-4 mb-6">
        <div className="flex items-start">
          <CheckCircle className="h-6 w-6 text-[#4C9A2A] mr-2 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-[#4C9A2A]">Correct!</h3>
            <p className="text-sm mt-1">Your regex pattern correctly matched all expected items. Well done!</p>
            <Button 
              className="mt-3 bg-[#4C9A2A] text-white hover:bg-[#4C9A2A]/90 px-3 py-1 h-auto text-sm"
              onClick={onNextPuzzle}
            >
              Next Puzzle
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-[#B33A3A]/10 border border-[#B33A3A]/30 rounded-md p-4 mb-6">
      <div className="flex items-start">
        <XCircle className="h-6 w-6 text-[#B33A3A] mr-2 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-[#B33A3A]">Not quite right</h3>
          <p className="text-sm mt-1">Your pattern didn't match all the expected elements. Try again!</p>
          {matchCount !== undefined && expectedCount !== undefined && (
            <div className="mt-2 text-sm">
              <p className="font-medium">
                Matches found: <span className="font-code">{matchCount}</span> 
                (Expected: <span className="font-code">{expectedCount}</span>)
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultFeedback;
