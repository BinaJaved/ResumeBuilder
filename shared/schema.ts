import { z } from "zod";

// Resume rewrite request schema
export const resumeRewriteRequestSchema = z.object({
  summary: z.string().min(10, "Summary must be at least 10 characters"),
  headline: z.string().min(5, "Headline must be at least 5 characters"),
  jobDescription: z.string().min(20, "Job description must be at least 20 characters"),
});

export type ResumeRewriteRequest = z.infer<typeof resumeRewriteRequestSchema>;

// Resume rewrite response schema
export const resumeRewriteResponseSchema = z.object({
  rewrittenSummary: z.string(),
  rewrittenHeadline: z.string(),
});

export type ResumeRewriteResponse = z.infer<typeof resumeRewriteResponseSchema>;
