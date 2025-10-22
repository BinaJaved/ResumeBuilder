import type { Express } from "express";
import { createServer, type Server } from "http";
import { resumeRewriteRequestSchema } from "@shared/schema";
import { rewriteResume, ResumeRewriteError } from "./openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Resume rewrite endpoint
  app.post("/api/resume/rewrite", async (req, res) => {
    try {
      // Validate request body
      const validationResult = resumeRewriteRequestSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({
          error: "validation_error",
          message: "Invalid request data",
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
      
      // Handle custom ResumeRewriteError with proper status codes
      if (error instanceof ResumeRewriteError) {
        return res.status(error.statusCode).json({
          error: error.code || "error",
          message: error.message,
        });
      }
      
      // Handle unexpected errors
      return res.status(500).json({
        error: "internal_error",
        message: error instanceof Error ? error.message : "An unexpected error occurred",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
