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
        
        // Provide specific guidance based on error code
        let description = error.message || "Failed to rewrite resume. Please try again.";
        let title = "Error";
        
        if (error.error === "quota_exceeded") {
          title = "API Quota Exceeded";
        } else if (error.error === "invalid_api_key") {
          title = "Configuration Error";
        } else if (error.error === "service_unavailable") {
          title = "Service Unavailable";
        }
        
        throw new Error(JSON.stringify({ title, description }));
      }

      const result = await response.json();
      setResults({
        summary: result.rewrittenSummary,
        headline: result.rewrittenHeadline,
      });
    } catch (error) {
      console.error("Error rewriting resume:", error);
      
      let title = "Error";
      let description = "Failed to rewrite resume. Please try again.";
      
      if (error instanceof Error) {
        try {
          const parsed = JSON.parse(error.message);
          title = parsed.title;
          description = parsed.description;
        } catch {
          description = error.message;
        }
      }
      
      toast({
        title,
        description,
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
          {results ? (
            <>
              <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                <ResultsDisplay
                  rewrittenSummary={results.summary}
                  rewrittenHeadline={results.headline}
                />
              </div>

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
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </main>
    </div>
  );
}
