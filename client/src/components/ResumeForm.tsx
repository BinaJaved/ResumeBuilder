import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface ResumeFormProps {
  onSubmit: (data: {
    summary: string;
    headline: string;
    jobDescription: string;
  }) => void;
  isLoading: boolean;
}

export function ResumeForm({ onSubmit, isLoading }: ResumeFormProps) {
  const [summary, setSummary] = useState("");
  const [headline, setHeadline] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ summary, headline, jobDescription });
  };

  const isValid = summary.trim() && headline.trim() && jobDescription.trim();

  return (
    <Card className="p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="summary" className="text-sm font-medium">
            Current Resume Summary <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="summary"
            placeholder="Enter your current resume summary..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="min-h-32 resize-y"
            disabled={isLoading}
            data-testid="input-summary"
            required
          />
          <p className="text-sm text-muted-foreground">
            Paste your existing professional summary
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="headline" className="text-sm font-medium">
            Current Resume Headline <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="headline"
            placeholder="Enter your current resume headline..."
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className="min-h-20 resize-y"
            disabled={isLoading}
            data-testid="input-headline"
            required
          />
          <p className="text-sm text-muted-foreground">
            Your current professional headline or title
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="jobDescription" className="text-sm font-medium">
            Job Description <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="jobDescription"
            placeholder="Paste the job description you're targeting..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="min-h-32 resize-y"
            disabled={isLoading}
            data-testid="input-job-description"
            required
          />
          <p className="text-sm text-muted-foreground">
            The job posting you want to tailor your resume for
          </p>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={!isValid || isLoading}
          data-testid="button-submit"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Rewriting with AI...
            </>
          ) : (
            "Rewrite Resume"
          )}
        </Button>
      </form>
    </Card>
  );
}
