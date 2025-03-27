import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold text-[#2D5A27] mb-6">About RegEx Explorer</h1>
      
      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="mb-4">
            RegEx Explorer was created to make learning regular expressions fun and interactive. 
            Regular expressions are a powerful tool for text processing, but they can be intimidating 
            for beginners. We believe that the best way to learn is by doing, which is why we've 
            created a series of interactive puzzles to help you master regex patterns.
          </p>
          <p>
            Whether you're a complete beginner or looking to refine your skills, our platform 
            provides challenges at various difficulty levels to keep you engaged and learning.
          </p>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong>Choose a difficulty level</strong> - Start with easy puzzles if you're new 
              to regular expressions, or challenge yourself with our medium and hard levels.
            </li>
            <li>
              <strong>Read the instructions</strong> - Each puzzle has a specific goal for what 
              your regex pattern should match.
            </li>
            <li>
              <strong>Write your pattern</strong> - Type your regex in the input field and see 
              matches highlighted in real time.
            </li>
            <li>
              <strong>Check your answer</strong> - Submit your solution to see if it matches 
              exactly what was required.
            </li>
            <li>
              <strong>Learn and improve</strong> - If you get stuck, you can use hints or 
              reveal the solution to learn from it.
            </li>
          </ol>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Why Learn Regular Expressions?</h2>
          <p className="mb-4">
            Regular expressions are used in many different fields:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Software Development</strong> - For validating user input, parsing text, and search functionality
            </li>
            <li>
              <strong>Data Analysis</strong> - To extract patterns and insights from text data
            </li>
            <li>
              <strong>System Administration</strong> - For log analysis and text processing in scripts
            </li>
            <li>
              <strong>Content Management</strong> - To find and replace text in documents
            </li>
            <li>
              <strong>Search and Filtering</strong> - For creating advanced search functionality
            </li>
          </ul>
          <p className="mt-4">
            By mastering regular expressions, you'll add a powerful and versatile tool to your toolkit.
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">About the Creator</h2>
          <p>
            RegEx Explorer was developed by a team of educators and developers who are passionate 
            about making technical concepts more accessible. We believe that learning should be 
            engaging, interactive, and fun.
          </p>
          <p className="mt-4">
            Have feedback or suggestions? We'd love to hear from you! Contact us at 
            <a href="mailto:feedback@regexexplorer.com" className="text-[#2D5A27] font-medium ml-1">
              feedback@regexexplorer.com
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
