import { puzzles, type Puzzle, type InsertPuzzle } from "@shared/schema";
import { progress, type Progress, type InsertProgress } from "@shared/schema";

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
}

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
    // Easy puzzles
    this.createPuzzle({
      difficulty: "easy",
      instructions: "Write a regex pattern that matches all email addresses in the text below.",
      text: "Contact us at support@regexexplorer.com or send an email to help@regex.dev for assistance. For billing inquiries, reach out to billing@regexexplorer.com. Please do not contact personal@gmail example or fake@@address.",
      solution: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
      hint: "Look for text that has an @ symbol followed by a domain name with at least one dot.",
      order: 1
    });
    
    this.createPuzzle({
      difficulty: "easy",
      instructions: "Match all phone numbers in the format (123) 456-7890.",
      text: "You can reach us at (555) 123-4567 during business hours or leave a message at (888) 555-1234. Don't call 5551234567 or 555-123-4567 as those aren't monitored.",
      solution: "\\(\\d{3}\\)\\s\\d{3}-\\d{4}",
      hint: "Look for numbers in parentheses followed by more numbers separated by a hyphen.",
      order: 2
    });
    
    this.createPuzzle({
      difficulty: "easy",
      instructions: "Match all words that start with 'a' or 'A'.",
      text: "An apple a day keeps the doctor away. Always remember that apples are a great source of fiber and antioxidants.",
      solution: "\\b[aA][a-zA-Z]*\\b",
      hint: "Use word boundaries (\\b) and match words beginning with either 'a' or 'A'.",
      order: 3
    });
    
    this.createPuzzle({
      difficulty: "easy",
      instructions: "Match all dates in the format MM/DD/YYYY.",
      text: "Important dates: 12/25/2023 is Christmas, 01/01/2024 is New Year's Day, and 07/04/2023 is Independence Day. Mark 2023-12-25 on your calendar too.",
      solution: "\\d{2}/\\d{2}/\\d{4}",
      hint: "Look for two digits, followed by a slash, two more digits, another slash, and four digits.",
      order: 4
    });
    
    this.createPuzzle({
      difficulty: "easy",
      instructions: "Match all HTML tags in the text.",
      text: "Here's some simple HTML: <h1>Title</h1> followed by <p>A paragraph</p> and a <a href='link.html'>link</a>.",
      solution: "<[^>]+>",
      hint: "Look for text that starts with < and ends with >, with any characters in between that aren't >.",
      order: 5
    });
    
    // Medium puzzles
    this.createPuzzle({
      difficulty: "medium",
      instructions: "Match all words that contain a double letter (like 'book' or 'letter').",
      text: "The wood floor needs to be swept. The cool pool water is blue. I need to cook some food for dinner.",
      solution: "\\b\\w*([a-zA-Z])\\1\\w*\\b",
      hint: "Use capturing groups and backreferences to find repeated letters within word boundaries.",
      order: 1
    });
    
    this.createPuzzle({
      difficulty: "medium",
      instructions: "Match valid URLs that start with http:// or https://",
      text: "Visit our site at https://regex-explorer.com or http://www.regex.dev. Don't go to ftp://invalid.com or just www.invalid-url.com",
      solution: "https?:\\/\\/[\\w\\.-]+\\.[a-zA-Z]{2,}[\\/\\w\\.-]*",
      hint: "Start with http or https followed by ://, then the domain name with at least one dot.",
      order: 2
    });
    
    this.createPuzzle({
      difficulty: "medium",
      instructions: "Match all numbers (integers and decimals) in the text.",
      text: "The product costs $19.99, weighs 3.5 lbs, and we have 42 in stock. The dimensions are 10x12x5.25 inches.",
      solution: "\\b\\d+(?:\\.\\d+)?\\b",
      hint: "Look for one or more digits, optionally followed by a decimal point and more digits.",
      order: 3
    });
    
    this.createPuzzle({
      difficulty: "medium",
      instructions: "Match all hexadecimal color codes (like #FFF or #FF00AA).",
      text: "Our brand colors are #2D5A27 (forest green), #8B4513 (cedar brown), #A8C090 (sage), and #F4F1DE (cream). Some designers also use shorthand like #000 for black.",
      solution: "#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})\\b",
      hint: "Look for # followed by either exactly 3 or exactly 6 hexadecimal characters (0-9, a-f, A-F).",
      order: 4
    });
    
    this.createPuzzle({
      difficulty: "medium",
      instructions: "Match all words that are exactly 5 characters long.",
      text: "The quick brown fox jumps over the lazy dogs while they sleep peacefully.",
      solution: "\\b[a-zA-Z]{5}\\b",
      hint: "Use word boundaries and match exactly 5 alphabetical characters.",
      order: 5
    });
    
    // Hard puzzles
    this.createPuzzle({
      difficulty: "hard",
      instructions: "Match all valid IPv4 addresses in the text.",
      text: "Server IP addresses: 192.168.1.1, 10.0.0.1, and 172.16.254.1. Invalid IPs: 256.0.0.1, 192.168.1, 192.168.1.y",
      solution: "\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b",
      hint: "Each octet must be a number between 0-255, separated by dots, with 4 octets total.",
      order: 1
    });
    
    this.createPuzzle({
      difficulty: "hard",
      instructions: "Match all words that are palindromes (read the same forward and backward) in the text.",
      text: "Mom and Dad took their racecar to the civic center. Wow! They saw a radar system and a level playing field. Do geese see God?",
      solution: "\\b(\\w)(\\w)?(\\w)?(\\w)?(\\w)?\\4?\\3?\\2?\\1\\b",
      hint: "Use capturing groups to match characters, then backreferences to match the same characters in reverse order.",
      order: 2
    });
    
    this.createPuzzle({
      difficulty: "hard",
      instructions: "Match all strings that have balanced parentheses with content inside.",
      text: "Examples: (balanced), (also balanced), ((nested balanced)), (unbalanced, )(separate), ()",
      solution: "\\([^()]*(?:\\([^()]*\\)[^()]*)*\\)",
      hint: "This is a complex pattern. Start by matching simple parentheses, then build up to nested ones.",
      order: 3
    });
    
    this.createPuzzle({
      difficulty: "hard",
      instructions: "Match all words that contain all the vowels (a, e, i, o, u) in any order.",
      text: "The adventitious facetious abstemious person epizootic sequoia required adequate education.",
      solution: "\\b(?=\\w*a)(?=\\w*e)(?=\\w*i)(?=\\w*o)(?=\\w*u)\\w+\\b",
      hint: "Use positive lookaheads to ensure a word contains each vowel, without specifying their order.",
      order: 4
    });
    
    this.createPuzzle({
      difficulty: "hard",
      instructions: "Match all valid dates in ISO format (YYYY-MM-DD) where the date could actually exist.",
      text: "Meeting dates: 2023-01-15, 2022-12-31, 2024-02-29, 2023-04-31, 2023-13-01, 2023-00-00",
      solution: "\\b(?:19|20)\\d{2}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])\\b",
      hint: "Match years, then months 01-12, then days 01-31. Full validation would need more complex logic for month length.",
      order: 5
    });
  }
}

// Export the storage instance
export const storage = new MemStorage();
