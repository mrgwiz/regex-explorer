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
    // -------------- EASY PUZZLES --------------
    // Original easy puzzles
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
    
    // New easy puzzles
    this.createPuzzle({
      difficulty: "easy",
      instructions: "Match all words ending with 'ing'.",
      text: "I enjoy running, swimming, and cycling in the morning. Singing and dancing are also fun evening activities.",
      solution: "\\b\\w+ing\\b",
      hint: "Use word boundaries (\\b) and match words that end with 'ing'.",
      order: 6
    });
    
    this.createPuzzle({
      difficulty: "easy",
      instructions: "Match all numbers between 1 and 100.",
      text: "The store has items priced at $5, $25, $99, and $120. The temperature today is between 75 and 80 degrees.",
      solution: "\\b([1-9]|[1-9][0-9]|100)\\b",
      hint: "Break this down into three parts: single digits, double digits, and the number 100.",
      order: 7
    });
    
    this.createPuzzle({
      difficulty: "easy",
      instructions: "Match all capitalized words.",
      text: "The United States of America is a country. John works at Google in California. He uses Python and JavaScript.",
      solution: "\\b[A-Z][a-zA-Z]*\\b",
      hint: "Look for words that start with an uppercase letter followed by any letters.",
      order: 8
    });
    
    this.createPuzzle({
      difficulty: "easy",
      instructions: "Match all words containing the letter 'z'.",
      text: "The lazy zebra amazed the zoo visitors by zigzagging through the puzzle maze with pizzazz.",
      solution: "\\b\\w*z\\w*\\b",
      hint: "Find words that have the letter 'z' anywhere within them.",
      order: 9
    });
    
    this.createPuzzle({
      difficulty: "easy",
      instructions: "Match all 3-letter words.",
      text: "The big dog and the fat cat ran far away but the fox did not see the owl fly by.",
      solution: "\\b[a-zA-Z]{3}\\b",
      hint: "Use word boundaries and match exactly 3 alphabetical characters.",
      order: 10
    });
    
    this.createPuzzle({
      difficulty: "easy",
      instructions: "Match all words starting with a vowel (a, e, i, o, u).",
      text: "Every apple is unique in appearance and aroma. Often, oranges are easier to identify than unusual exotic fruits.",
      solution: "\\b[aeiouAEIOU]\\w*\\b",
      hint: "Use word boundaries and start with any vowel (uppercase or lowercase).",
      order: 11
    });
    
    this.createPuzzle({
      difficulty: "easy",
      instructions: "Match all hashtags (words starting with #).",
      text: "Check out our new product #awesome #product #launch. But don't forget the part#number isn't a hashtag.",
      solution: "#\\w+",
      hint: "Look for # followed by one or more word characters.",
      order: 12
    });
    
    this.createPuzzle({
      difficulty: "easy",
      instructions: "Match all quoted text inside double quotes.",
      text: 'He said "hello world" and then "goodbye" to everyone. The sign reads "Do not enter" in bold letters.',
      solution: '"[^"]*"',
      hint: 'Look for content between a pair of double quotes, where the content is anything except another double quote.',
      order: 13
    });
    
    this.createPuzzle({
      difficulty: "easy",
      instructions: "Match all digits (numbers 0-9).",
      text: "My phone number is 555-123-4567 and my zip code is 90210. I was born in 1985.",
      solution: "\\d",
      hint: "Use the shorthand character class for digits.",
      order: 14
    });
    
    this.createPuzzle({
      difficulty: "easy",
      instructions: "Match all words containing both 'a' and 'e' in that order.",
      text: "Please make a statement about the latest changes to the database. Jane said the cake tastes great.",
      solution: "\\b\\w*a\\w*e\\w*\\b",
      hint: "Find words that have the letter 'a' followed by the letter 'e' with any characters in between.",
      order: 15
    });
    
    this.createPuzzle({
      difficulty: "easy",
      instructions: "Match all words starting with 'pro'.",
      text: "The project produced professional-quality products promoting progress and prosperity in the program.",
      solution: "\\bpro\\w*\\b",
      hint: "Use word boundaries and match words that start with 'pro'.",
      order: 16
    });
    
    this.createPuzzle({
      difficulty: "easy",
      instructions: "Match all time expressions in the format HH:MM (24-hour time).",
      text: "The train departs at 08:45 and arrives at 11:30. The meeting starts at 14:15 and ends at 15:45. Please avoid time like 25:70.",
      solution: "([01]\\d|2[0-3]):[0-5]\\d",
      hint: "First part should be hours (00-23), followed by colon, then minutes (00-59).",
      order: 17
    });
    
    this.createPuzzle({
      difficulty: "easy",
      instructions: "Match all words exactly 4 letters long.",
      text: "This task will help zero guys find code that runs well when they test time-based text data.",
      solution: "\\b[a-zA-Z]{4}\\b",
      hint: "Use word boundaries and match exactly 4 alphabetical characters.",
      order: 18
    });
    
    this.createPuzzle({
      difficulty: "easy",
      instructions: "Match all file names with a .jpg extension.",
      text: "Download vacation.jpg, profile.png, and document.pdf. Don't forget screenshot.jpg and logo.svg.",
      solution: "\\w+\\.jpg\\b",
      hint: "Look for words followed by the literal text '.jpg'.",
      order: 19
    });
    
    this.createPuzzle({
      difficulty: "easy",
      instructions: "Match all words containing consecutive double vowels (aa, ee, ii, oo, uu).",
      text: "The committee agreed to meet at noon. The employees need feedback about the bookkeeping. Look at that cool balloon!",
      solution: "\\b\\w*(?:aa|ee|ii|oo|uu)\\w*\\b",
      hint: "Use a non-capturing group with alternation to find any double vowels within words.",
      order: 20
    });

    // -------------- MEDIUM PUZZLES --------------
    // Original medium puzzles
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
    
    // New medium puzzles
    this.createPuzzle({
      difficulty: "medium",
      instructions: "Match all words starting and ending with the same letter.",
      text: "Level up your stats when you recognize how pop culture can entertain and enlighten people without effort.",
      solution: "\\b(\\w)\\w*\\1\\b",
      hint: "Use a capturing group for the first letter, then match it again at the end with a backreference.",
      order: 6
    });
    
    this.createPuzzle({
      difficulty: "medium",
      instructions: "Match phone numbers in multiple formats: (xxx) xxx-xxxx, xxx-xxx-xxxx, or xxxxxxxxxx.",
      text: "Contact us at (555) 123-4567, 888-555-1234, or 9998887777. Don't dial 55-555-5555 or (123) 45-6789.",
      solution: "(?:\\(\\d{3}\\)\\s?|\\d{3}-)\\d{3}-\\d{4}|\\b\\d{10}\\b",
      hint: "Use alternation to match the different formats. Each format should have the correct number of digits.",
      order: 7
    });
    
    this.createPuzzle({
      difficulty: "medium",
      instructions: "Match all words containing at least 3 consecutive vowels (a, e, i, o, u).",
      text: "The beautiful queue outside caused a riot. The audience waited patiently and quietly. Hawaiian beaches are gorgeous.",
      solution: "\\b\\w*[aeiou]{3,}\\w*\\b",
      hint: "Look for words containing 3 or more consecutive vowels.",
      order: 8
    });
    
    this.createPuzzle({
      difficulty: "medium",
      instructions: "Match all money amounts in the format $X.XX or $XX.XX or $XXX.XX.",
      text: "Items on sale: Coffee $3.99, Sandwich $12.50, Salad $8.75, Headphones $199.99, Pencil $0.75.",
      solution: "\\$\\d{1,3}\\.\\d{2}",
      hint: "Match a dollar sign, followed by 1-3 digits, a decimal point, and exactly 2 more digits.",
      order: 9
    });
    
    this.createPuzzle({
      difficulty: "medium",
      instructions: "Match all repeated words (immediately repeated, like 'the the').",
      text: "She said that that report was was clearly not not properly checked. The the mistakes are obvious when when you look.",
      solution: "\\b(\\w+)\\s+\\1\\b",
      hint: "Capture a word in a group, then match the same word again using a backreference.",
      order: 10
    });
    
    this.createPuzzle({
      difficulty: "medium",
      instructions: "Match all words with internal camel case (like 'camelCase' or 'iPhone').",
      text: "JavaScript and TypeScript are popular languages. Many products like iPhone, MacBook, and PowerPoint use camelCase or Pascal case.",
      solution: "\\b[a-z]+[A-Z][a-zA-Z]*\\b",
      hint: "Match words that start with lowercase letters, then have an uppercase letter, followed by any letters.",
      order: 11
    });
    
    this.createPuzzle({
      difficulty: "medium",
      instructions: "Match social security numbers in the format XXX-XX-XXXX, but only if they're valid format (i.e., don't start with 000, 666, or 900-999).",
      text: "Valid SSNs: 123-45-6789, 234-56-7890. Invalid formats: 000-12-3456, 666-78-9012, 999-88-7777.",
      solution: "(?!000|666|9\\d{2})\\d{3}-\\d{2}-\\d{4}",
      hint: "Use a negative lookahead to exclude invalid starting sequences, then match the standard SSN format.",
      order: 12
    });
    
    this.createPuzzle({
      difficulty: "medium",
      instructions: "Match all sentences ending with a question mark.",
      text: "Is this the correct way? I think it is. What about this sentence? And this one too? Yes, that's right.",
      solution: "[^.!?]+\\?",
      hint: "Match any characters that aren't sentence endings, followed by a question mark.",
      order: 13
    });
    
    this.createPuzzle({
      difficulty: "medium",
      instructions: "Match valid US zip codes (5 digits, or 5 digits plus hyphen plus 4 digits).",
      text: "Ship to 90210, 12345-6789, or 60601. Don't use 1234 or 123456 or 12345-67890 as these are invalid formats.",
      solution: "\\b\\d{5}(?:-\\d{4})?\\b",
      hint: "Match exactly 5 digits, then optionally match a hyphen followed by exactly 4 more digits.",
      order: 14
    });
    
    this.createPuzzle({
      difficulty: "medium",
      instructions: "Match all strings formatted as JSON key-value pairs with double-quoted strings (like \"key\": \"value\").",
      text: "Config file: \"name\": \"John\", \"age\": 30, \"city\": \"New York\", max_size: 100, 'title': 'Dev'",
      solution: '"[^"]+": "[^"]+"',
      hint: "Match a double-quoted string, a colon with optional space, and another double-quoted string.",
      order: 15
    });
    
    this.createPuzzle({
      difficulty: "medium",
      instructions: "Match all words that are anagrams of 'team' (same letters in any order).",
      text: "The mate took his time to tame the meat served at the buffet. He ate the meal with the meta data sheet.",
      solution: "\\b(?=\\w*t)(?=\\w*e)(?=\\w*a)(?=\\w*m)\\w{4}\\b",
      hint: "Use lookaheads to check for each required letter, then match exactly 4 characters.",
      order: 16
    });
    
    this.createPuzzle({
      difficulty: "medium",
      instructions: "Match image file extensions (.jpg, .png, .gif, or .webp).",
      text: "Download profile.jpg, banner.png, animation.gif, and icon.webp. Don't download archive.zip or document.pdf.",
      solution: "\\.(?:jpg|png|gif|webp)\\b",
      hint: "Use a non-capturing group with alternation for the different file extensions.",
      order: 17
    });
    
    this.createPuzzle({
      difficulty: "medium",
      instructions: "Match all valid Twitter handles (starts with @, followed by 1-15 alphanumeric characters or underscores).",
      text: "Follow us @regex_master, @john123, and @dev_tools. Don't follow @invalid-handle or @waytoolongusernamehere.",
      solution: "@[a-zA-Z0-9_]{1,15}\\b",
      hint: "Match @ followed by 1 to 15 allowed characters (letters, numbers, underscore).",
      order: 18
    });
    
    this.createPuzzle({
      difficulty: "medium",
      instructions: "Match all dates in the format YYYY-MM-DD where the month is valid (01-12).",
      text: "Event dates: 2023-01-15, 2023-06-30, 2023-12-25. Invalid dates: 2023-13-01, 2023-00-15, 2023-8-5.",
      solution: "\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])",
      hint: "First match 4 digits for the year, then a valid month (01-12), then a valid day (01-31).",
      order: 19
    });
    
    this.createPuzzle({
      difficulty: "medium",
      instructions: "Match all C-style variable declarations (like 'int x = 5;' or 'char name[10];').",
      text: "Code snippet: int count = 10; float pi = 3.14; char letter = 'A'; void* pointer; string invalid = \"test\";",
      solution: "(?:int|char|float|double|void\\*|long)\\s+\\w+(?:\\[\\d+\\])?(?:\\s*=\\s*[^;]+)?;",
      hint: "Match a C data type, followed by a variable name, with optional array size or initialization.",
      order: 20
    });

    // -------------- HARD PUZZLES --------------
    // Original hard puzzles
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
    
    // New hard puzzles
    this.createPuzzle({
      difficulty: "hard",
      instructions: "Match all valid email addresses that use Gmail, Yahoo, or Outlook domains.",
      text: "Contact us at john.doe@gmail.com, jane_smith@yahoo.com, or support@outlook.com. Don't use invalid@gmailcom, user@yahoo, or @outlook.com.",
      solution: "[a-zA-Z0-9._%+-]+@(?:gmail|yahoo|outlook)\\.com\\b",
      hint: "Match the username part, then @ symbol, then specifically gmail.com, yahoo.com, or outlook.com domains.",
      order: 6
    });
    
    this.createPuzzle({
      difficulty: "hard",
      instructions: "Match all valid credit card numbers (16 digits, optionally separated in groups of 4 by spaces or hyphens).",
      text: "Payment methods: 4111 1111 1111 1111, 5555-5555-5555-4444, 378282246310005, 41111111-1111-1111.",
      solution: "\\b(?:\\d{4}[- ]?){3}\\d{4}\\b|\\b\\d{16}\\b",
      hint: "Match either 16 consecutive digits, or 4 groups of 4 digits separated by an optional space or hyphen.",
      order: 7
    });
    
    this.createPuzzle({
      difficulty: "hard",
      instructions: "Match all valid HTML image tags with src attribute (like <img src=\"image.jpg\">).",
      text: "<img src=\"logo.png\"> <img alt=\"Photo\" src='profile.jpg'> <image source=\"icon.svg\"> <img alt=\"Invalid\">",
      solution: "<img\\s+[^>]*?src=['\"][^'\"]+['\"][^>]*>",
      hint: "Match img tag opening, any attributes, the src attribute with a value in quotes, and the closing bracket.",
      order: 8
    });
    
    this.createPuzzle({
      difficulty: "hard",
      instructions: "Match all URLs containing query parameters (e.g., ?param=value).",
      text: "Visit https://example.com/search?q=regex&page=1, http://api.site.com?key=123, https://domain.org/path, and https://test.co/path?",
      solution: "https?://[\\w.-]+(?:/[\\w.-]+)*\\?(?:[\\w%]+=?[\\w%]*(?:&[\\w%]+=?[\\w%]*)*)",
      hint: "Match the protocol, domain, path, then a question mark followed by one or more parameter=value pairs.",
      order: 9
    });
    
    this.createPuzzle({
      difficulty: "hard",
      instructions: "Match all valid passwords according to these rules: at least 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*).",
      text: "Password examples: StrongPwd1!, Weak123, NoSpecial1A, short!, ALL_UPPERCASE_123!, @ValidPass2023",
      solution: "(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}",
      hint: "Use lookaheads to enforce each rule (uppercase, lowercase, digit, special char), then match 8+ valid characters.",
      order: 10
    });
    
    this.createPuzzle({
      difficulty: "hard",
      instructions: "Match all strings that have exactly balanced opening and closing square brackets with content inside.",
      text: "Examples: [balanced], [also [nested] balanced], [[empty content]], [unbalanced, ][separate]",
      solution: "\\[[^\\[\\]]*(?:\\[[^\\[\\]]*\\][^\\[\\]]*)*\\]",
      hint: "Similar to the balanced parentheses problem, but with square brackets.",
      order: 11
    });
    
    this.createPuzzle({
      difficulty: "hard",
      instructions: "Match all valid ISBN-10 numbers (10 digits or 9 digits followed by 'X', with optional hyphens between groups).",
      text: "Books: ISBN 0-306-40615-2, 0306406152, 1-234-56789-X, 123456789X, 0-9752298-0-X, 0975229-80X, a9912342!4X",
      solution: "\\b(?:\\d[- ]?){9}[\\dX]\\b",
      hint: "Match 9 digits with optional separators, followed by a digit or X.",
      order: 12
    });
    
    this.createPuzzle({
      difficulty: "hard",
      instructions: "Match all strings where a word is repeated in reverse within the same sentence (like 'level level').",
      text: "Words and their reversals: level level, part trap, name eman, dear read, step pets, live evil, time emit.",
      solution: "\\b(\\w+)\\b[^.!?]*\\b(\\1|\\w*(?:(?<=(.)(.*))\\3\\2\\1))\\b",
      hint: "Capturing a word and then either matching it exactly or its reverse using a complex backreference pattern.",
      order: 13
    });
    
    this.createPuzzle({
      difficulty: "hard",
      instructions: "Match all valid US phone numbers with area codes, but only if they have a valid area code (not 000, 911, etc.).",
      text: "Call us at (555) 123-4567 or 888-555-1234. Don't call (000) 123-4567, (911) 123-4567, or (555) 000-0000.",
      solution: "(?:\\((?!000|911)\\d{3}\\)|(?!000|911)\\d{3})[-. ]\\d{3}[-. ](?!0000)\\d{4}",
      hint: "Use negative lookaheads to exclude invalid area codes and central office codes.",
      order: 14
    });
    
    this.createPuzzle({
      difficulty: "hard",
      instructions: "Match all words that are anagrams of each other in the text.",
      text: "Words like listen and silent are anagrams. So are earth and heart, night and thing, secure and rescue.",
      solution: "\\b(?:(\\w+)(?=.*\\b(?!(\\1))(?=(?:\\w*(?:(?:(?<=[a-z])([a-z]))\\3)*){0})\\w+\\b))+\\b",
      hint: "This requires an advanced technique using lookaheads and character counting to identify words with the same letters.",
      order: 15
    });
    
    this.createPuzzle({
      difficulty: "hard",
      instructions: "Match all valid base64 encoded strings (consisting of alphanumeric characters, '+', '/', and ending with 0-2 '=' characters).",
      text: "Encoded data: SGVsbG8gV29ybGQ=, Q29tcHV0ZXI=, Invalid=Base64, Valid/+Base64String, bm90dmFsaWQh@, dGhpcyBpcyB2YWxpZA==",
      solution: "\\b[A-Za-z0-9+\\/]+={0,2}\\b",
      hint: "Match one or more valid base64 characters, followed by 0-2 equals signs for padding.",
      order: 16
    });
    
    this.createPuzzle({
      difficulty: "hard",
      instructions: "Match all valid hexadecimal numbers with an optional 0x prefix (like 0x1A or 1A5F).",
      text: "Values: 0x1A3F, 0x0, FF00, 0x123ABC, 0xG123, 1234ZZ, 0x, 0x123!",
      solution: "\\b(?:0x)?[0-9A-Fa-f]+\\b(?![0-9A-Za-z])",
      hint: "Match an optional 0x prefix, followed by one or more hex digits, with a word boundary after.",
      order: 17
    });
    
    this.createPuzzle({
      difficulty: "hard",
      instructions: "Match all valid RGB color values in the format rgb(0-255, 0-255, 0-255).",
      text: "Colors: rgb(255, 0, 0), rgb(0,255,0), rgb(0, 0, 255), rgb(300, 0, 0), rgb(255, 300, 0), rgb(255)",
      solution: "rgb\\(\\s*(?:25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]\\d|\\d)\\s*,\\s*(?:25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]\\d|\\d)\\s*,\\s*(?:25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]\\d|\\d)\\s*\\)",
      hint: "Match 'rgb(' followed by three numbers between 0-255 separated by commas, with optional whitespace.",
      order: 18
    });
    
    this.createPuzzle({
      difficulty: "hard",
      instructions: "Match all strings that contain a prime number between 2 and 100.",
      text: "Numbers: 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101",
      solution: "\\b(?:2|3|5|7|11|13|17|19|23|29|31|37|41|43|47|53|59|61|67|71|73|79|83|89|97)\\b",
      hint: "Create an alternation of all prime numbers in the specified range.",
      order: 19
    });
    
    this.createPuzzle({
      difficulty: "hard",
      instructions: "Match all valid URL paths with query parameters and fragments (e.g., /path?query=value#fragment).",
      text: "URLs: /home, /products/123, /search?q=test, /user?id=456#profile, /invalid?=empty, /bad#",
      solution: "/(?:[\\w-]+/?)+(?:\\?[\\w-]+=\\w+(?:&[\\w-]+=\\w+)*)?(?:#[\\w-]+)?\\b",
      hint: "Match the path segments, optional query parameters with key-value pairs, and optional fragment identifier.",
      order: 20
    });
  }
}

// Export the storage instance
export const storage = new MemStorage();
