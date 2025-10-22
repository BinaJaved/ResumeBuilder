import { useState } from "react";
import { Header } from "@/components/Header";
import { ResumeForm } from "@/components/ResumeForm";
import { ResultsDisplay } from "@/components/ResultsDisplay";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    summary: string;
    headline: string;
  } | null>(null);

  const handleSubmit = async (data: {
    summary: string;
    headline: string;
    jobDescription: string;
  }) => {
    setIsLoading(true);
    
    // TODO: remove mock functionality - Replace with actual API call
    setTimeout(() => {
      setResults({
        summary: "Results-driven software engineer with 5+ years of experience building scalable web applications using React, TypeScript, and Node.js. Proven expertise in cloud architecture, CI/CD pipelines, and agile development. Demonstrated success leading cross-functional teams to deliver high-impact products that improve user engagement by 40%+. Passionate about writing clean, maintainable code and mentoring junior developers.",
        headline: "Senior Full-Stack Engineer | React & Cloud Architecture Specialist",
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-5xl mx-auto px-6 py-12">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-semibold tracking-tight">
              Optimize Your Resume with AI
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Rewrite your resume summary and headline to perfectly match any job description.
              Get professional, recruiter-friendly content with relevant keywords.
            </p>
          </div>

          <ResumeForm onSubmit={handleSubmit} isLoading={isLoading} />

          {results && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <ResultsDisplay
                rewrittenSummary={results.summary}
                rewrittenHeadline={results.headline}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
