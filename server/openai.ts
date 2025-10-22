import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface ResumeRewriteRequest {
  summary: string;
  headline: string;
  jobDescription: string;
}

export interface ResumeRewriteResponse {
  rewrittenSummary: string;
  rewrittenHeadline: string;
}

export class ResumeRewriteError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string
  ) {
    super(message);
    this.name = "ResumeRewriteError";
  }
}

export async function rewriteResume(
  request: ResumeRewriteRequest
): Promise<ResumeRewriteResponse> {
  const { summary, headline, jobDescription } = request;

  const prompt = `You are a professional resume writer and career coach. Rewrite the following resume summary and headline to match the tone, language, and requirements of the provided job description.

Current Resume Summary:
${summary}

Current Resume Headline:
${headline}

Job Description:
${jobDescription}

Instructions:
- Keep the summary under 120 words
- Keep the headline under 15 words
- Use keywords and phrases from the job description naturally
- Maintain a professional, recruiter-friendly tone
- Emphasize relevant skills and experience that match the job requirements
- Make it compelling and achievement-focused

Please provide your response in the following format:

REWRITTEN SUMMARY:
[Your rewritten summary here]

REWRITTEN HEADLINE:
[Your rewritten headline here]`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content:
            "You are an expert resume writer who helps candidates optimize their resumes for specific job applications. You understand ATS systems and recruiter preferences.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_completion_tokens: 2048,
    });

    console.log("Full OpenAI response:", JSON.stringify(response, null, 2));
    console.log("Response choices:", response.choices);
    console.log("First choice:", response.choices[0]);
    console.log("Message:", response.choices[0]?.message);
    
    const contentString = response.choices[0].message.content;
    console.log("OpenAI raw response content:", contentString);
    
    if (!contentString) {
      throw new Error("Empty response from OpenAI");
    }

    // Parse the response by extracting sections
    const summaryMatch = contentString.match(/REWRITTEN SUMMARY:\s*\n([\s\S]*?)(?=\n\nREWRITTEN HEADLINE:|$)/i);
    const headlineMatch = contentString.match(/REWRITTEN HEADLINE:\s*\n([\s\S]*?)$/i);

    if (!summaryMatch || !headlineMatch) {
      console.error("Could not parse response. Content:", contentString);
      throw new Error("Could not parse OpenAI response format");
    }

    const rewrittenSummary = summaryMatch[1].trim();
    const rewrittenHeadline = headlineMatch[1].trim();

    if (!rewrittenSummary || !rewrittenHeadline) {
      throw new Error("Missing summary or headline in OpenAI response");
    }

    console.log("Successfully parsed:", { rewrittenSummary, rewrittenHeadline });

    return {
      rewrittenSummary,
      rewrittenHeadline,
    };
  } catch (error: any) {
    console.error("OpenAI API error:", error);
    
    // Handle specific OpenAI errors with appropriate status codes
    if (error?.status === 429) {
      throw new ResumeRewriteError(
        "OpenAI API quota exceeded. Please add credits to your OpenAI account at https://platform.openai.com/account/billing",
        429,
        "quota_exceeded"
      );
    }
    
    if (error?.status === 401) {
      throw new ResumeRewriteError(
        "Invalid OpenAI API key. Please check your API key configuration.",
        401,
        "invalid_api_key"
      );
    }
    
    if (error?.status === 503) {
      throw new ResumeRewriteError(
        "OpenAI service is temporarily unavailable. Please try again in a moment.",
        503,
        "service_unavailable"
      );
    }
    
    // Generic error
    throw new ResumeRewriteError(
      `Failed to rewrite resume: ${error instanceof Error ? error.message : "Unknown error"}`,
      500,
      "internal_error"
    );
  }
}
