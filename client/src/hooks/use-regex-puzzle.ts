import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Puzzle } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export interface UseRegexPuzzleResult {
  regexInput: string;
  setRegexInput: (value: string) => void;
  matchPreview: string;
  hasMatches: boolean;
  isCorrect: boolean | null;
  errorMessage: string | null;
  matchCount: number;
  expectedCount: number;
  checkAnswer: (e: React.FormEvent) => Promise<void>;
  handleGiveUp: () => void;
  handleNextPuzzle: () => void;
}

interface UseRegexPuzzleProps {
  puzzle: Puzzle;
  onNextPuzzle: () => void;
}

export const useRegexPuzzle = ({ puzzle, onNextPuzzle }: UseRegexPuzzleProps): UseRegexPuzzleResult => {
  const [regexInput, setRegexInput] = useState("");
  const [matchPreview, setMatchPreview] = useState<string>(puzzle.text);
  const [hasMatches, setHasMatches] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [matchCount, setMatchCount] = useState<number>(0);
  const [expectedCount, setExpectedCount] = useState<number>(0);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Reset state when puzzle changes
  useEffect(() => {
    setRegexInput("");
    setMatchPreview(puzzle.text);
    setHasMatches(false);
    setIsCorrect(null);
    setErrorMessage(null);
  }, [puzzle]);
  
  // Update preview when regex input changes
  useEffect(() => {
    if (!regexInput.trim()) {
      setMatchPreview(puzzle.text);
      setHasMatches(false);
      return;
    }
    
    try {
      const regex = new RegExp(regexInput, 'g');
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
  }, [regexInput, puzzle.text]);
  
  // Mutation for updating progress
  const updateProgressMutation = useMutation({
    mutationFn: async (data: { puzzleId: number; sessionId: string; completed: boolean }) => {
      return await apiRequest('POST', '/api/progress', data);
    },
    onSuccess: () => {
      // Invalidate progress cache to refresh UI
      const sessionId = localStorage.getItem('regexExplorerSessionId');
      if (sessionId) {
        queryClient.invalidateQueries({ queryKey: ['/api/progress', sessionId] });
      }
    }
  });
  
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
          updateProgressMutation.mutate({
            puzzleId: puzzle.id,
            sessionId,
            completed: true
          });
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
    
    toast({
      title: "Solution Revealed",
      description: "You can submit this answer to move to the next puzzle."
    });
  };
  
  // Handle next puzzle
  const handleNextPuzzle = () => {
    onNextPuzzle();
  };
  
  return {
    regexInput,
    setRegexInput,
    matchPreview,
    hasMatches,
    isCorrect,
    errorMessage,
    matchCount,
    expectedCount,
    checkAnswer,
    handleGiveUp,
    handleNextPuzzle
  };
};
