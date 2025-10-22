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

Respond with JSON in this exact format:
{
  "rewrittenSummary": "the rewritten summary here",
  "rewrittenHeadline": "the rewritten headline here"
}`;

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
      response_format: { type: "json_object" },
      max_completion_tokens: 2048,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");

    if (!result.rewrittenSummary || !result.rewrittenHeadline) {
      throw new Error("Invalid response format from OpenAI");
    }

    return {
      rewrittenSummary: result.rewrittenSummary,
      rewrittenHeadline: result.rewrittenHeadline,
    };
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error(
      `Failed to rewrite resume: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}
