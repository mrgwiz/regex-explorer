interface Puzzle {
  id: number;
  difficulty: 'easy' | 'medium' | 'hard';
  instructions: string;
  text: string;
  solution: string;
  hint: string;
  order: number;
}

// This file serves as a reference for puzzle structure
// The actual puzzles are stored in server-side storage

export const SAMPLE_PUZZLES: Puzzle[] = [
  {
    id: 1,
    difficulty: 'easy',
    instructions: 'Write a regex pattern that matches all email addresses in the text below.',
    text: 'Contact us at support@regexexplorer.com or send an email to help@regex.dev for assistance. For billing inquiries, reach out to billing@regexexplorer.com. Please do not contact personal@gmail example or fake@@address.',
    solution: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
    hint: 'Look for text that has an @ symbol followed by a domain name with at least one dot.',
    order: 1
  },
  {
    id: 2,
    difficulty: 'easy',
    instructions: 'Match all phone numbers in the format (123) 456-7890.',
    text: 'You can reach us at (555) 123-4567 during business hours or leave a message at (888) 555-1234. Don\'t call 5551234567 or 555-123-4567 as those aren\'t monitored.',
    solution: '\\(\\d{3}\\)\\s\\d{3}-\\d{4}',
    hint: 'Look for numbers in parentheses followed by more numbers separated by a hyphen.',
    order: 2
  },
  // Additional puzzles would be defined here
];

export const getDifficultyLabel = (difficulty: string): string => {
  switch (difficulty) {
    case 'easy':
      return 'Easy';
    case 'medium':
      return 'Medium';
    case 'hard':
      return 'Hard';
    default:
      return difficulty;
  }
};
