import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Define puzzles schema
export const puzzles = pgTable("puzzles", {
  id: serial("id").primaryKey(),
  difficulty: text("difficulty").notNull(), // 'easy', 'medium', 'hard'
  instructions: text("instructions").notNull(),
  text: text("text").notNull(),
  solution: text("solution").notNull(),
  hint: text("hint").notNull(),
  order: integer("order").notNull(),
});

export const insertPuzzleSchema = createInsertSchema(puzzles).omit({ 
  id: true 
});

export type Puzzle = typeof puzzles.$inferSelect;
export type InsertPuzzle = z.infer<typeof insertPuzzleSchema>;

// Define progress schema
export const progress = pgTable("progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  puzzleId: integer("puzzle_id").notNull(),
  completed: boolean("completed").notNull().default(false),
  sessionId: text("session_id").notNull(),
});

export const insertProgressSchema = createInsertSchema(progress).omit({ 
  id: true 
});

export type Progress = typeof progress.$inferSelect;
export type InsertProgress = z.infer<typeof insertProgressSchema>;
