import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all puzzles with optional difficulty filter
  app.get("/api/puzzles", async (req, res) => {
    try {
      const difficulty = req.query.difficulty as string | undefined;
      const puzzles = await storage.getPuzzles(difficulty);
      res.json(puzzles);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch puzzles" });
    }
  });

  // Get a specific puzzle by ID
  app.get("/api/puzzles/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid puzzle ID" });
      }

      const puzzle = await storage.getPuzzleById(id);
      if (!puzzle) {
        return res.status(404).json({ error: "Puzzle not found" });
      }

      res.json(puzzle);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch puzzle" });
    }
  });

  // Get user progress by session ID
  app.get("/api/progress/:sessionId", async (req, res) => {
    try {
      const sessionId = req.params.sessionId;
      const progress = await storage.getProgressBySessionId(sessionId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch progress" });
    }
  });

  // Create or update progress
  app.post("/api/progress", async (req, res) => {
    try {
      const schema = z.object({
        puzzleId: z.number(),
        sessionId: z.string(),
        completed: z.boolean().default(false)
      });

      const validatedData = schema.parse(req.body);
      
      // Check if progress already exists for this session and puzzle
      const existingProgress = await storage.getProgressBySessionId(validatedData.sessionId);
      const matching = existingProgress.find(p => p.puzzleId === validatedData.puzzleId);
      
      if (matching) {
        // Update existing progress
        const updated = await storage.updateProgress(matching.id, validatedData.completed);
        if (!updated) {
          return res.status(404).json({ error: "Progress not found" });
        }
        res.json(updated);
      } else {
        // Create new progress
        const newProgress = await storage.createProgress({
          puzzleId: validatedData.puzzleId,
          sessionId: validatedData.sessionId,
          completed: validatedData.completed,
          userId: null  // We're not using user authentication in this app
        });
        res.status(201).json(newProgress);
      }
    } catch (error) {
      console.error(error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to update progress" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
