import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DocumentationSidebar = () => {
  const [activeTab, setActiveTab] = useState("basics");

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-[#2D5A27] text-white p-4">
        <h2 className="text-lg font-semibold">RegEx Documentation</h2>
        <p className="text-sm text-white/80 mt-1">Reference guides to help you solve puzzles</p>
      </div>
      
      <div className="border-b border-gray-200">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-transparent border-b rounded-none w-full justify-start">
            <TabsTrigger 
              value="basics"
              className={`px-4 py-2 text-sm ${activeTab === 'basics' ? 'text-[#2D5A27] border-b-2 border-[#2D5A27]' : 'text-gray-500 hover:text-[#2D5A27]'}`}
            >
              Basics
            </TabsTrigger>
            <TabsTrigger 
              value="characters"
              className={`px-4 py-2 text-sm ${activeTab === 'characters' ? 'text-[#2D5A27] border-b-2 border-[#2D5A27]' : 'text-gray-500 hover:text-[#2D5A27]'}`}
            >
              Characters
            </TabsTrigger>
            <TabsTrigger 
              value="quantifiers"
              className={`px-4 py-2 text-sm ${activeTab === 'quantifiers' ? 'text-[#2D5A27] border-b-2 border-[#2D5A27]' : 'text-gray-500 hover:text-[#2D5A27]'}`}
            >
              Quantifiers
            </TabsTrigger>
            <TabsTrigger 
              value="groups"
              className={`px-4 py-2 text-sm ${activeTab === 'groups' ? 'text-[#2D5A27] border-b-2 border-[#2D5A27]' : 'text-gray-500 hover:text-[#2D5A27]'}`}
            >
              Groups
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="p-4 max-h-[500px] overflow-y-auto">
        <Tabs>
        <TabsContent value="basics" className={activeTab === "basics" ? "block" : "hidden"}>
          <h3 className="font-medium text-lg mb-3">Regular Expression Basics</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-1">What is a RegEx?</h4>
              <p className="text-sm">Regular expressions (regex) are patterns used to match character combinations in strings.</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Basic Syntax</h4>
              <div className="bg-gray-100 p-3 rounded-md">
                <p className="font-code text-sm mb-2"><span className="text-[#2D5A27]">/pattern/flags</span></p>
                <ul className="text-sm space-y-1">
                  <li><span className="font-code text-[#2D5A27]">pattern</span>: The regex pattern to match</li>
                  <li><span className="font-code text-[#2D5A27]">flags</span>: Optional modifiers (g, i, m, etc.)</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Common Characters</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-3 text-left">Pattern</th>
                      <th className="py-2 px-3 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-200">
                      <td className="py-2 px-3 font-code">\d</td>
                      <td>Any digit (0-9)</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="py-2 px-3 font-code">\w</td>
                      <td>Any word character (a-z, A-Z, 0-9, _)</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="py-2 px-3 font-code">\s</td>
                      <td>Any whitespace character</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="py-2 px-3 font-code">.</td>
                      <td>Any character except newline</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Email Regex Example</h4>
              <div className="bg-gray-100 p-3 rounded-md">
                <p className="font-code text-sm break-all"><span className="text-[#2D5A27]">/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]&#123;2,&#125;/g</span></p>
                <p className="text-xs mt-2">This pattern matches most common email formats.</p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="characters" className={activeTab === "characters" ? "block" : "hidden"}>
          <h3 className="font-medium text-lg mb-3">Character Classes</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-3 text-left">Pattern</th>
                  <th className="py-2 px-3 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200">
                  <td className="py-2 px-3 font-code">[abc]</td>
                  <td>Any character in the brackets</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="py-2 px-3 font-code">[^abc]</td>
                  <td>Any character NOT in the brackets</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="py-2 px-3 font-code">\d</td>
                  <td>Any digit (same as [0-9])</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="py-2 px-3 font-code">\D</td>
                  <td>Any non-digit (same as [^0-9])</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="py-2 px-3 font-code">\w</td>
                  <td>Any word character (same as [a-zA-Z0-9_])</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="py-2 px-3 font-code">\W</td>
                  <td>Any non-word character</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="py-2 px-3 font-code">\s</td>
                  <td>Any whitespace character</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="py-2 px-3 font-code">\S</td>
                  <td>Any non-whitespace character</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="py-2 px-3 font-code">.</td>
                  <td>Any character except newline</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>
        
        <TabsContent value="quantifiers" className={activeTab === "quantifiers" ? "block" : "hidden"}>
          <h3 className="font-medium text-lg mb-3">Quantifiers</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-3 text-left">Pattern</th>
                  <th className="py-2 px-3 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200">
                  <td className="py-2 px-3 font-code">*</td>
                  <td>0 or more times</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="py-2 px-3 font-code">+</td>
                  <td>1 or more times</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="py-2 px-3 font-code">?</td>
                  <td>0 or 1 time (optional)</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="py-2 px-3 font-code">{"{n}"}</td>
                  <td>Exactly n times</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="py-2 px-3 font-code">{"{n,}"}</td>
                  <td>n or more times</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="py-2 px-3 font-code">{"{n,m}"}</td>
                  <td>Between n and m times</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-4">
            <h4 className="font-medium mb-1">Examples</h4>
            <ul className="text-sm space-y-2">
              <li><span className="font-code text-[#2D5A27]">\d+</span> - One or more digits</li>
              <li><span className="font-code text-[#2D5A27]">\w&#123;3&#125;</span> - Exactly 3 word characters</li>
              <li><span className="font-code text-[#2D5A27]">colou?r</span> - Matches "color" or "colour"</li>
              <li><span className="font-code text-[#2D5A27]">ab*c</span> - Matches "ac", "abc", "abbc", etc.</li>
            </ul>
          </div>
        </TabsContent>
        
        <TabsContent value="groups" className={activeTab === "groups" ? "block" : "hidden"}>
          <h3 className="font-medium text-lg mb-3">Groups & Backreferences</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-1">Capturing Groups</h4>
              <p className="text-sm">Use parentheses to create groups that can be referenced later.</p>
              <div className="bg-gray-100 p-3 rounded-md mt-2">
                <p className="font-code text-sm"><span className="text-[#2D5A27]">(abc)</span></p>
                <p className="text-xs mt-1">Groups the pattern "abc" for later reference.</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Backreferences</h4>
              <p className="text-sm">Use \1, \2, etc. to refer back to captured groups.</p>
              <div className="bg-gray-100 p-3 rounded-md mt-2">
                <p className="font-code text-sm"><span className="text-[#2D5A27]">(\w+) \1</span></p>
                <p className="text-xs mt-1">Matches repeated words like "hello hello".</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Non-Capturing Groups</h4>
              <p className="text-sm">Use (?:pattern) when you need grouping but don't need to capture.</p>
              <div className="bg-gray-100 p-3 rounded-md mt-2">
                <p className="font-code text-sm"><span className="text-[#2D5A27]">(?:https?|ftp)://</span></p>
                <p className="text-xs mt-1">Groups the protocol options without capturing them.</p>
              </div>
            </div>
          </div>
        </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DocumentationSidebar;
