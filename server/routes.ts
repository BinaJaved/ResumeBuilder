import type { Express } from "express";
import { createServer, type Server } from "http";
import { resumeRewriteRequestSchema } from "@shared/schema";
import { rewriteResume } from "./openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Resume rewrite endpoint
  app.post("/api/resume/rewrite", async (req, res) => {
    try {
      // Validate request body
      const validationResult = resumeRewriteRequestSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({
          error: "Invalid request",
          details: validationResult.error.errors,
        });
      }

      const { summary, headline, jobDescription } = validationResult.data;

      // Call OpenAI to rewrite resume
      const result = await rewriteResume({
        summary,
        headline,
        jobDescription,
      });

      return res.json(result);
    } catch (error) {
      console.error("Resume rewrite error:", error);
      return res.status(500).json({
        error: "Failed to rewrite resume",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
