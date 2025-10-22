import { ResultsDisplay } from '../ResultsDisplay'
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";

export default function ResultsDisplayExample() {
  return (
    <TooltipProvider>
      <div className="p-6 max-w-3xl mx-auto">
        <ResultsDisplay
          rewrittenSummary="Experienced software engineer with 5+ years developing scalable web applications using React, Node.js, and cloud technologies. Proven track record of leading cross-functional teams to deliver high-quality products on time. Passionate about clean code, user experience, and continuous learning."
          rewrittenHeadline="Senior Full-Stack Engineer | React & Node.js Specialist"
        />
      </div>
      <Toaster />
    </TooltipProvider>
  )
}
