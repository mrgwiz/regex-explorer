import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Documentation from "@/pages/Documentation";
import About from "@/pages/About";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/documentation" component={Documentation} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [sessionId, setSessionId] = useState<string>("");

  // Initialize session ID on first load
  useEffect(() => {
    const existingSessionId = localStorage.getItem("regexExplorerSessionId");
    if (existingSessionId) {
      setSessionId(existingSessionId);
    } else {
      const newSessionId = nanoid();
      localStorage.setItem("regexExplorerSessionId", newSessionId);
      setSessionId(newSessionId);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen bg-[#F4F1DE]">
        <Header />
        <div className="flex-grow">
          {sessionId && <Router />}
        </div>
        <Footer />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
