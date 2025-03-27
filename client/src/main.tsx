import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add custom CSS for fonts that aren't part of Tailwind
const style = document.createElement('style');
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;600&family=Inter:wght@400;500;700&display=swap');
  
  .font-code {
    font-family: 'Source Code Pro', monospace;
  }
  
  .match-highlight {
    background-color: rgba(168, 192, 144, 0.4);
    border-radius: 2px;
  }
`;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(<App />);
