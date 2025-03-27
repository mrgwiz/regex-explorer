import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import type { Puzzle } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import ResultFeedback from "./ResultFeedback";
import { useToast } from "@/hooks/use-toast";

interface PuzzleCardProps {
  puzzle: Puzzle;
  onNextPuzzle: () => void;
  puzzleNumber: number;
  totalPuzzles: number;
}

const PuzzleCard: React.FC<PuzzleCardProps> = ({
  puzzle,
  onNextPuzzle,
  puzzleNumber,
  totalPuzzles
}) => {
  const [regexInput, setRegexInput] = useState("");
  const [matchPreview, setMatchPreview] = useState<string>(puzzle.text);
  const [hasMatches, setHasMatches] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [matchCount, setMatchCount] = useState<number>(0);
  const [expectedCount, setExpectedCount] = useState<number>(0);
  const { toast } = useToast();

  // Reset state when puzzle changes
  useEffect(() => {
    setRegexInput("");
    setMatchPreview(puzzle.text);
    setHasMatches(false);
    setIsCorrect(null);
    setErrorMessage(null);
  }, [puzzle]);

  // Handle regex input change
  const handleRegexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRegexInput(value);
    
    if (!value.trim()) {
      setMatchPreview(puzzle.text);
      setHasMatches(false);
      return;
    }
    
    try {
      const regex = new RegExp(value, 'g');
      const text = puzzle.text;
      const matches = text.match(regex) || [];
      setMatchCount(matches.length);
      
      // Highlight matches in the text
      const highlightedText = text.replace(regex, (match) => {
        return `<span class="match-highlight">${match}</span>`;
      });
      
      setMatchPreview(highlightedText);
      setHasMatches(matches.length > 0);
      setErrorMessage(null);
    } catch (e) {
      setErrorMessage("Invalid regex pattern. Please check your syntax.");
      setHasMatches(false);
    }
  };

  // Check the answer against solution
  const checkAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!regexInput.trim()) {
      toast({
        title: "Empty Pattern",
        description: "Please enter a regex pattern first.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Get matches from user regex
      const userRegex = new RegExp(regexInput, 'g');
      const userMatches = puzzle.text.match(userRegex) || [];
      
      // Get matches from solution regex
      const solutionRegex = new RegExp(puzzle.solution, 'g');
      const solutionMatches = puzzle.text.match(solutionRegex) || [];
      
      // Calculate expected count for the error message
      setExpectedCount(solutionMatches.length);
      
      // Check if the matches are the same
      const isMatchCorrect = 
        userMatches.length === solutionMatches.length && 
        userMatches.every(match => solutionMatches.includes(match)) &&
        solutionMatches.every(match => userMatches.includes(match));
      
      setIsCorrect(isMatchCorrect);
      
      // If correct, update progress
      if (isMatchCorrect) {
        const sessionId = localStorage.getItem('regexExplorerSessionId');
        if (sessionId) {
          await apiRequest('POST', '/api/progress', {
            puzzleId: puzzle.id,
            sessionId,
            completed: true
          });
          
          // Invalidate progress cache to refresh UI
          queryClient.invalidateQueries({ queryKey: ['/api/progress', sessionId] });
        }
      }
    } catch (e) {
      setErrorMessage("Error checking your answer. Please try again.");
      setIsCorrect(false);
    }
  };

  // Give up and show solution
  const handleGiveUp = () => {
    setRegexInput(puzzle.solution);
    
    // Update preview with solution regex
    try {
      const solutionRegex = new RegExp(puzzle.solution, 'g');
      const text = puzzle.text;
      const matches = text.match(solutionRegex) || [];
      setMatchCount(matches.length);
      
      const highlightedText = text.replace(solutionRegex, (match) => {
        return `<span class="match-highlight">${match}</span>`;
      });
      
      setMatchPreview(highlightedText);
      setHasMatches(matches.length > 0);
      
      toast({
        title: "Solution Revealed",
        description: "You can submit this answer to move to the next puzzle."
      });
    } catch (e) {
      setErrorMessage("Error showing solution. Please try again.");
    }
  };

  // Handle next puzzle
  const handleNextPuzzle = () => {
    onNextPuzzle();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6" id="current-puzzle">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold text-[#2D5A27]">
          Puzzle #{puzzleNumber} 
          <span className="text-sm bg-[#A8C090]/30 px-2 py-1 rounded text-[#2D5A27] ml-2">
            {puzzle.difficulty.charAt(0).toUpperCase() + puzzle.difficulty.slice(1)}
          </span>
        </h2>
        <div className="text-sm text-[#2C3639]/70">
          {puzzleNumber}/{totalPuzzles}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Instructions:</h3>
        <p className="text-[#2C3639]/90">{puzzle.instructions}</p>
      </div>

      <div className="mb-8 p-4 bg-[#F4F1DE] rounded-md">
        <pre className="font-code text-sm whitespace-pre-wrap leading-relaxed">
          {puzzle.text}
        </pre>
      </div>

      <form onSubmit={checkAnswer} className="mb-6">
        <label htmlFor="regex-input" className="block font-medium mb-2">Your RegEx Solution:</label>
        <div className="flex">
          <div className="bg-gray-100 text-gray-800 px-2 py-2 rounded-l-md font-code border border-r-0 border-gray-300">/</div>
          <input 
            type="text" 
            id="regex-input" 
            value={regexInput}
            onChange={handleRegexInputChange}
            className="flex-1 px-3 py-2 border border-gray-300 font-code focus:outline-none focus:ring-2 focus:ring-[#2D5A27]/50" 
            placeholder="Enter your regex pattern..." 
          />
          <div className="bg-gray-100 text-gray-800 px-2 py-2 rounded-r-md font-code border border-l-0 border-gray-300">/g</div>
        </div>
        <div className="flex mt-4 gap-3 flex-wrap">
          <Button 
            type="submit" 
            className="bg-[#2D5A27] text-white hover:bg-[#2D5A27]/90"
          >
            Check Answer
          </Button>
          <Button 
            type="button" 
            className="bg-[#8B4513] text-white hover:bg-[#8B4513]/90"
            onClick={handleGiveUp}
          >
            Give Up
          </Button>
          <Button 
            type="button" 
            variant="outline"
            className="border-[#2D5A27] text-[#2D5A27] hover:bg-[#A8C090]/20"
            onClick={handleNextPuzzle}
          >
            Skip Puzzle
          </Button>
        </div>
      </form>

      {isCorrect !== null && (
        <ResultFeedback 
          isCorrect={isCorrect}
          matchCount={matchCount}
          expectedCount={expectedCount}
          onNextPuzzle={handleNextPuzzle}
        />
      )}

      <div className="border-t border-gray-200 pt-4 mt-4">
        <h3 className="font-medium mb-2">Match Preview:</h3>
        {!hasMatches && !errorMessage && (
          <p className="text-sm italic text-[#2C3639]/70">
            Type a regex pattern to see matched elements highlighted.
          </p>
        )}
        {errorMessage && (
          <p className="text-sm italic text-red-500">{errorMessage}</p>
        )}
        {hasMatches && (
          <div 
            className="font-code text-sm whitespace-pre-wrap leading-relaxed"
            dangerouslySetInnerHTML={{ __html: matchPreview }}
          />
        )}
      </div>
    </div>
  );
};

export default PuzzleCard;
