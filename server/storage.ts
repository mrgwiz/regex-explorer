import { puzzles, type Puzzle, type InsertPuzzle } from "@shared/schema";
import { progress, type Progress, type InsertProgress } from "@shared/schema";

import easyPuzzles from './data/easy-puzzles.json';
import mediumPuzzles from './data/medium-puzzles.json';
import hardPuzzles from './data/hard-puzzles.json';

// Interface for storage operations
export interface IStorage {
  // Puzzle operations
  getPuzzles(difficulty?: string): Promise<Puzzle[]>;
  getPuzzleById(id: number): Promise<Puzzle | undefined>;
  createPuzzle(puzzle: InsertPuzzle): Promise<Puzzle>;
  
  // Progress operations
  getProgressBySessionId(sessionId: string): Promise<Progress[]>;
  createProgress(progress: InsertProgress): Promise<Progress>;
  updateProgress(id: number, completed: boolean): Promise<Progress | undefined>;
}q

// Memory storage implementation
export class MemStorage implements IStorage {
  private puzzles: Map<number, Puzzle>;
  private progress: Map<number, Progress>;
  private puzzleIdCounter: number;
  private progressIdCounter: number;

  constructor() {
    this.puzzles = new Map();
    this.progress = new Map();
    this.puzzleIdCounter = 1;
    this.progressIdCounter = 1;
    
    // Initialize with default puzzles
    this.initializePuzzles();
  }

  // Puzzle methods
  async getPuzzles(difficulty?: string): Promise<Puzzle[]> {
    const allPuzzles = Array.from(this.puzzles.values());
    if (difficulty) {
      return allPuzzles.filter(puzzle => puzzle.difficulty === difficulty)
        .sort((a, b) => a.order - b.order);
    }
    return allPuzzles.sort((a, b) => a.order - b.order);
  }

  async getPuzzleById(id: number): Promise<Puzzle | undefined> {
    return this.puzzles.get(id);
  }

  async createPuzzle(insertPuzzle: InsertPuzzle): Promise<Puzzle> {
    const id = this.puzzleIdCounter++;
    const puzzle: Puzzle = { ...insertPuzzle, id };
    this.puzzles.set(id, puzzle);
    return puzzle;
  }

  // Progress methods
  async getProgressBySessionId(sessionId: string): Promise<Progress[]> {
    return Array.from(this.progress.values())
      .filter(p => p.sessionId === sessionId);
  }

  async createProgress(insertProgress: InsertProgress): Promise<Progress> {
    const id = this.progressIdCounter++;
    // Ensure the Progress object has all required fields, including userId as null if not provided
    const progress: Progress = { 
      ...insertProgress, 
      id,
      userId: insertProgress.userId ?? null,
      completed: insertProgress.completed ?? false
    };
    this.progress.set(id, progress);
    return progress;
  }

  async updateProgress(id: number, completed: boolean): Promise<Progress | undefined> {
    const progress = this.progress.get(id);
    if (!progress) return undefined;
    
    const updatedProgress: Progress = { ...progress, completed };
    this.progress.set(id, updatedProgress);
    return updatedProgress;
  }

  // Initialize puzzles with default data
  private initializePuzzles() {
    try {
      // Load puzzles from JSON files
      // Initialize puzzles from each difficulty level
      [...easyPuzzles, ...mediumPuzzles, ...hardPuzzles].forEach(puzzle => {
        this.createPuzzle(puzzle);
      });

      console.log(`Loaded ${easyPuzzles.length} easy puzzles, ${mediumPuzzles.length} medium puzzles, and ${hardPuzzles.length} hard puzzles`);
    } catch (error) {
      console.error('Error loading puzzles from JSON files:', error);
      console.warn('Puzzle data files might be missing or corrupt. No puzzles were loaded.');
    }
  }
}

// Export the storage instance
export const storage = new MemStorage();
