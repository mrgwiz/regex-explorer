import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Documentation = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#2D5A27] mb-6">RegEx Documentation</h1>
      
      <Tabs defaultValue="basics" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="basics">Basics</TabsTrigger>
          <TabsTrigger value="characters">Characters</TabsTrigger>
          <TabsTrigger value="quantifiers">Quantifiers</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
          <TabsTrigger value="assertions">Assertions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basics">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Regular Expression Basics</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium mb-2">What is a RegEx?</h3>
                  <p>Regular expressions (regex) are patterns used to match character combinations in strings. They are a powerful tool for text processing and are supported in most programming languages.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">Basic Syntax</h3>
                  <div className="bg-gray-100 p-4 rounded-md">
                    <code className="font-code text-[#2D5A27] font-semibold">/pattern/flags</code>
                    <ul className="mt-3 space-y-2">
                      <li><code className="font-code text-[#2D5A27]">pattern</code>: The actual regex pattern to match</li>
                      <li><code className="font-code text-[#2D5A27]">flags</code>: Optional modifiers that change how the pattern is interpreted</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">Common Flags</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="py-2 px-4 text-left">Flag</th>
                          <th className="py-2 px-4 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t">
                          <td className="py-2 px-4 font-code">g</td>
                          <td>Global - find all matches (not just the first one)</td>
                        </tr>
                        <tr className="border-t">
                          <td className="py-2 px-4 font-code">i</td>
                          <td>Case-insensitive matching</td>
                        </tr>
                        <tr className="border-t">
                          <td className="py-2 px-4 font-code">m</td>
                          <td>Multi-line - ^ and $ match start/end of each line</td>
                        </tr>
                        <tr className="border-t">
                          <td className="py-2 px-4 font-code">s</td>
                          <td>Dot (.) matches newline characters too</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">Example</h3>
                  <div className="bg-gray-100 p-4 rounded-md">
                    <code className="font-code text-[#2D5A27] font-semibold">/hello/gi</code>
                    <p className="mt-2">This regex will match all occurrences of "hello" in a string, regardless of case (so it will match "Hello", "HELLO", etc.).</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="characters">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Character Classes</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 text-left">Pattern</th>
                      <th className="py-2 px-4 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="py-2 px-4 font-code">\d</td>
                      <td>Any digit (0-9)</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-2 px-4 font-code">\w</td>
                      <td>Any word character (a-z, A-Z, 0-9, _)</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-2 px-4 font-code">\s</td>
                      <td>Any whitespace character</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-2 px-4 font-code">.</td>
                      <td>Any character except newline</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-2 px-4 font-code">[abc]</td>
                      <td>Any character in the brackets</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-2 px-4 font-code">[^abc]</td>
                      <td>Any character NOT in the brackets</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="quantifiers">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Quantifiers</h2>
              <p className="mb-4">Quantifiers specify how many instances of a character or group must be present.</p>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 text-left">Pattern</th>
                      <th className="py-2 px-4 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="py-2 px-4 font-code">*</td>
                      <td>0 or more times</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-2 px-4 font-code">+</td>
                      <td>1 or more times</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-2 px-4 font-code">?</td>
                      <td>0 or 1 time (optional)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="groups">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Groups and Backreferences</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium mb-2">Capturing Groups</h3>
                  <p>Grouping parts of a regex allows you to apply quantifiers to the entire group and extract the matched value.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">Backreferences</h3>
                  <p>Backreferences allow you to refer to previously captured groups in your pattern.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="assertions">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Assertions and Boundaries</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 text-left">Pattern</th>
                      <th className="py-2 px-4 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="py-2 px-4 font-code">^</td>
                      <td>Start of line/string</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-2 px-4 font-code">$</td>
                      <td>End of line/string</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-2 px-4 font-code">\b</td>
                      <td>Word boundary</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Documentation;