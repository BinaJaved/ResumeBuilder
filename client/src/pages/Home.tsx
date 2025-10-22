import { useState } from "react";
import { Header } from "@/components/Header";
import { ResumeForm } from "@/components/ResumeForm";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    summary: string;
    headline: string;
  } | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (data: {
    summary: string;
    headline: string;
    jobDescription: string;
  }) => {
    setIsLoading(true);
    setResults(null);
    
    try {
      const response = await fetch("/api/resume/rewrite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to rewrite resume");
      }

      const result = await response.json();
      setResults({
        summary: result.rewrittenSummary,
        headline: result.rewrittenHeadline,
      });
    } catch (error) {
      console.error("Error rewriting resume:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to rewrite resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
