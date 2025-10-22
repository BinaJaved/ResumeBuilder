import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ResultsDisplayProps {
  rewrittenSummary: string;
  rewrittenHeadline: string;
}

export function ResultsDisplay({
  rewrittenSummary,
  rewrittenHeadline,
}: ResultsDisplayProps) {
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [copiedHeadline, setCopiedHeadline] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async (text: string, type: "summary" | "headline") => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "summary") {
        setCopiedSummary(true);
        setTimeout(() => setCopiedSummary(false), 2000);
      } else {
        setCopiedHeadline(true);
        setTimeout(() => setCopiedHeadline(false), 2000);
      }
      toast({
        title: "Copied!",
        description: `${type === "summary" ? "Summary" : "Headline"} copied to clipboard`,
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-8 space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-4" data-testid="text-results-title">
          AI-Rewritten Content
        </h2>
        <p className="text-sm text-muted-foreground">
          Your resume has been optimized with relevant keywords from the job description
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Rewritten Summary</Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(rewrittenSummary, "summary")}
              data-testid="button-copy-summary"
            >
              {copiedSummary ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </>
              )}
            </Button>
          </div>
          <div
            className="p-4 bg-muted/50 rounded-md border"
            data-testid="text-rewritten-summary"
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {rewrittenSummary}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Rewritten Headline</Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(rewrittenHeadline, "headline")}
              data-testid="button-copy-headline"
            >
              {copiedHeadline ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </>
              )}
            </Button>
          </div>
          <div
            className="p-4 bg-muted/50 rounded-md border"
            data-testid="text-rewritten-headline"
          >
            <p className="text-sm font-medium">{rewrittenHeadline}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}
